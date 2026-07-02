import { IterableWeakSet } from "./OnOffAttr.js";
import { parseAttributeName } from "./PortalNameParser.js";

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null)
    return false;
  if (obj1.constructor !== obj2.constructor)
    return false;
  if (Array.isArray(obj1)) {
    const len = obj1.length;
    if (len !== obj2.length)
      return false;
    for (let i = 0; i < len; i++)
      if (!deepEqual(obj1[i], obj2[i]))
        return false;
    return true;
  }
  const keys1 = Object.keys(obj1);
  const len = keys1.length;
  if (len !== Object.keys(obj2).length)
    return false;
  for (let i = 0; i < len; i++)
    if (!Object.hasOwn(obj2, keys1[i]))
      return false;
  for (let i = 0; i < len; i++) {
    const key = keys1[i];
    if (!deepEqual(obj1[key], obj2[key]))
      return false;
  }
  return true;
}

class Store {
  static Stores = Object.create(null);
  static getStore(NAME) {
    return Store.Stores[NAME] ??= new Store(NAME);
  }

  constructor(NAME) {
    this.NAME = NAME;
    this.State = Object.create(null);
    this.keysInitiated = new Set();
    this.statePortals = new IterableWeakSet();
    this.keys = new WeakMap();
  }

  add(at, props) {
    this.statePortals.add(at);
    this.keys.set(at, props);
    if (props.every(p => this.keysInitiated.has(p)))
      eventLoopCube.dispatch(this.State, at);
  }
  delete(at) {
    this.statePortals.delete(at);
    this.keys.delete(at);
  }
  updateState(key, value) {
    if (deepEqual(this.State[key], value)) return;
    this.State[key] = value;
    this.keysInitiated.add(key);
    const res = [];
    for (const at of this.statePortals) {
      const props = this.keys.get(at);
      if (props.includes(key) && props.every(p => this.keysInitiated.has(p)))
        res.push(at);
    }
    if (res.length)
      eventLoopCube.dispatchBatch(this.State, res);
  }
}

class StatePortal {

  on() {
    const { portal, values: props } = parseAttributeName(this.name).trigger;
    this.store = Store.getStore(portal);
    this.store.add(this, props);
  }
  off() {
    this.store.delete(this);
  }
  reaction(FullName, parts) {
    const [prop] = parts.values;
    const store = Store.getStore(parts.portal);
    if (!prop) throw new TypeError(`StatePortal ${parts.portal} has no property specified in reaction ${FullName}.`);
    return function (value) { store.updateState(prop, value); }
  }
}

const Portals = Object.create(null);
Portals.state = StatePortal;
export { Portals };
