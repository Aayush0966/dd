

class WeakWeakMap {
  constructor() {
    this.signToObj = new Map();
    this.objToSign = new WeakMap();
    this.finale = new FinalizationRegistry(signStr => this.signToObj.delete(signStr));
  }

  setObj(signStr, obj) {
    this.signToObj.set(signStr, new WeakRef(obj));
    this.objToSign.set(obj, signStr);
    this.finale.register(obj, signStr);
    return obj;
  }

  getObj(signStr) {
    const wr = this.signToObj.get(signStr);
    if (wr === undefined)
      return undefined;
    const obj = wr.deref();
    if (obj === undefined)
      this.signToObj.delete(signStr);
    return obj;
  }

  getSign(obj) {
    return this.objToSign.get(obj);
  }
}

const CACHE = new WeakWeakMap();
const DIRTY = Symbol("BAIL");

//Heavy at construction time, fast to check existing objects.
//Recursive deep search: all branches that can be made into a composite will be made into a composite. From the root of the given object.
//If an object a non-plain Object or Array or frozen Object, contains a non-composite property, the object is not a composite. But all composite branches inside the will not be a composite, but 
//1. sparse arrays are supported.
//2. properties with symbol keys or non-Composite values are ignored.
//3. all properties with primitive keys and Composite values are checked and turned into a composite.
//4. If any property is ignored, the object/array is not a composite.
//5. This means that composite properties will be updated, even if the entire object is not a composite.
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

  let id = isArray ? `A${obj.length}|` : "O|";
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
    if (!dirty) {
      const t = typeof v;
      id += k.length + "$" + k + "=" +
        (t === 'string' ? v.length + "$" + v :
          t === 'bigint' ? v + "n" :
            (v && t === 'object') ? CACHE.getSign(v) :
              "" + v) +
        ",";
    }
  }
  seen.delete(obj);
  return dirty ? DIRTY :
    CACHE.update(id, Object.freeze(obj));
}

Composite.isComposite = function isComposite(v) {
  return v == null || typeof v === 'string' ||
    typeof v === 'number' || typeof v === 'boolean' ||
    typeof v === 'bigint' || !!CACHE.getSign(v);
}
