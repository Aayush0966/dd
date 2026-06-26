const f64 = new Float64Array(1);
const u32 = new Uint32Array(f64.buffer);
const HASHTAGS = {
  string: 1,
  number: 2,
  bigint: 3,
  true: 4,
  false: 5,
  object: 6,
  null: 7,
  undefined: 8,
  array: 9,
  objectLiteral: 10,
  property: 11,
};

function hashString(hash, str) {
  for (let i = 0; i < str.length; i++)
    hash = Math.imul(hash ^ str.charCodeAt(i), 0x01000193);
  return hash;
}

function hashPrimitive(hash, v) {
  if (v === null) return Math.imul(hash ^ HASHTAGS.null, 0x01000193);
  if (v === undefined) return Math.imul(hash ^ HASHTAGS.undefined, 0x01000193);
  if (v === true) return Math.imul(hash ^ HASHTAGS.true, 0x01000193);
  if (v === false) return Math.imul(hash ^ HASHTAGS.false, 0x01000193);

  const t = typeof v;
  hash = Math.imul(hash ^ (HASHTAGS[t] || 8), 0x01000193);
  if (t === 'string')
    return hashString(hash, v);
  if (t === 'bigint')
    return hashString(hash, v.toString());
  if (t === 'number' && Number.isInteger(v) && v >= 0 && v <= 0xFFFFFFFF)
    return Math.imul(hash ^ v, 0x01000193);
  if (t === 'number') {
    f64[0] = v;
    hash = Math.imul(hash ^ u32[0], 0x01000193);
    return Math.imul(hash ^ u32[1], 0x01000193);
  }
  throw new TypeError("Unsupported type for hashing: " + t + " with value: " + v);
}

class WeakWeakHashMap {
  constructor() {
    this.simpleHashToObj = new Map();
    this.objToHash = new WeakMap();
    this.multiHashToObjArray = new Map();
    this.finale = new FinalizationRegistry(hash => this.delete(hash));
  }
  #sameSame(a, b) {
    if (a === b)
      return true;
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length)
      return false;
    for (let i = 0; i < ak.length; i++)
      if (ak[i] !== bk[i] || (a[ak[i]] !== b[bk[i]] && !isNaN(a[ak[i]]) && !isNaN(b[bk[i]])))//identical props inside Composite objects must be the same objects.
        return false;
    return Array.isArray(a) !== Array.isArray(b) ? false : true;
  }
  add(hash, obj) {
    const old = this.simpleHashToObj.get(hash)?.deref();
    if (!old) {
      Object.freeze(obj);
      this.simpleHashToObj.set(hash, new WeakRef(obj));
      this.objToHash.set(obj, hash);
      this.finale.register(obj, hash);
      return obj;
    }
    if (this.#sameSame(old, obj))
      return old;
    let ar = this.multiHashToObjArray.get(hash);
    if (!ar) this.multiHashToObjArray.set(hash, ar = []);
    for (let i = 0, o; i < ar.length; i++)
      if (this.#sameSame(o = ar[i].deref(), obj))
        return o;
    Object.freeze(obj);
    ar.push(new WeakRef(obj));
    this.objToHash.set(obj, hash);
    this.finale.register(obj, hash);
    return obj;
  }
  getHash(obj) {
    return this.objToHash.get(obj);
  }
  getObj(hash) {
    const single = this.simpleHashToObj.get(hash)?.deref();
    if (!this.multiHashToObjArray.has(hash))
      return [single];
    return [single, ...this.multiHashToObjArray.get(hash).map(wr => wr.deref()).filter(Boolean)];
  }
  delete(hash) {
    const single = this.simpleHashToObj.get(hash)?.deref();
    if (!single)
      this.simpleHashToObj.delete(hash);
    const ar = this.multiHashToObjArray.get(hash);
    if (!ar) return;
    const ar2 = ar.filter(wr => wr.deref());
    if (!this.simpleHashToObj.has(hash) && ar2.length)
      this.simpleHashToObj.set(hash, ar2.shift());
    if (!ar2.length)
      this.multiHashToObjArray.delete(hash);
    else
      this.multiHashToObjArray.set(hash, ar2);
  }
}

const CACHE = new WeakWeakHashMap();
const DIRTY = Symbol("dirty");

function Composite(obj) {
  const res = CompositeImpl(obj, new WeakSet());
  return res === DIRTY ? obj : res;
}

function CompositeImpl(obj, seen) {
  if (Composite.isComposite(obj)) return obj;
  if (Object.isFrozen(obj)) return DIRTY;

  const proto = Object.getPrototypeOf(obj);
  const isArray = proto === Array.prototype;
  if (!isArray && proto !== Object.prototype && proto !== null) return DIRTY;
  if (Object.getOwnPropertySymbols(obj).length > 0) return DIRTY;
  if (seen.has(obj)) return DIRTY;
  seen.add(obj);

  let hash = isArray ?
    Math.imul(Math.imul(hash ^ HASHTAGS.array, 0x01000193) ^ obj.length, 0x01000193) :
    Math.imul(hash ^ HASHTAGS.objectLiteral, 0x01000193);
  let dirty = false;
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const o = obj[k];
    const v = CompositeImpl(o, seen);
    if (v === DIRTY) {
      dirty = true;
      continue;
    }
    obj[k] = v;
    if (dirty)
      continue;
    hash = Math.imul(hash ^ HASHTAGS.property, 0x01000193);
    hash = hashString(hash, k);
    const t = typeof v;
    hash = (v && t === 'object') ?
      Math.imul(hash ^ CACHE.getHash(v), 0x01000193) :
      hashPrimitive(hash, v);
  }

  seen.delete(obj);
  return dirty ? DIRTY : CACHE.add(hash, obj);
}

Composite.isComposite = function isComposite(v) {
  return v == null || typeof v === 'string' ||
    typeof v === 'number' || typeof v === 'boolean' ||
    typeof v === 'bigint' || CACHE.getHash(v) !== undefined;
}