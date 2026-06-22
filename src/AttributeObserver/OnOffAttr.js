const errorHandler = (...args) => console.error(...args); //framework error handling

export class IterableWeakSet {
  #wrToItem = new Set();
  #itemToWr = new WeakMap();
  #finalRegistry = new FinalizationRegistry(wr => this.#wrToItem.delete(wr));

  add(item) {
    if (this.#itemToWr.has(item))
      return this;
    const wr = new WeakRef(item);
    this.#wrToItem.add(wr);
    this.#itemToWr.set(item, wr);
    this.#finalRegistry.register(item, wr, wr);
    return this;
  }

  delete(item) {
    const wr = this.#itemToWr.get(item);
    if (!wr)
      return false;
    this.#itemToWr.delete(item);
    this.#finalRegistry.unregister(wr);
    return this.#wrToItem.delete(wr);
  }

  *[Symbol.iterator]() {
    for (let wr of this.#wrToItem) {
      const item = wr.deref();
      if (item === undefined)
        this.#wrToItem.delete(wr);
      else
        yield item;
    }
  }

  cleanup() {
    for (let wr of this.#wrToItem)
      if (wr.deref() === undefined)
        this.#wrToItem.delete(wr);
    return this;
  }

  get size() { return this.cleanup().#wrToItem.size; }
  get roughSize() { return this.#wrToItem.size; }
}

// 1. when an attribute is added to an element, if the attribute has an ON reaction, run it.
// 2. when an attribute is removed from an element, if the attribute has an OFF reaction, run it.
// 3. you can't setAttributeNode on an element. This means that an attribute can never be moved from one element to another.
function monkeyPatchHtmlMutations(onElement, offElement) {

  function onCreateRoot(root) {
    if (root instanceof Element)
      for (let at of root.attributes)
        onElement(at);
    for (let el of root.getElementsByTagName("*"))
      for (let at of el.attributes)
        onElement(at);
  }

  const innerHTMLsetter = og => function innerHTMLsetter(...args) {
    const res = og.call(this, ...args);
    for (let el of this.children)
      onCreateRoot(el);
    return res;
  }
  const outerHTMLsetter = og => function outerHTMLsetter(...args) {
    const parent = this.parentNode;
    const sibs = new Set(parent.children);
    const res = og.call(this, ...args);
    for (let el of parent.children)
      if (!sibs.has(el))
        onCreateRoot(el);
    return res;
  }
  const insertAdjacentHTML_DD = og => function insertAdjacentHTML_DD(position, ...args) {
    position = typeof position === "string" ? position.toLowerCase() : position;
    if (position === "afterbegin") {
      const count = this.children.length;
      const res = og.call(this, position, ...args);
      const added = this.children.length - count;
      for (let i = 0; i < added; i++)
        onCreateRoot(this.children[i]);
      return res;
    }
    else if (position === "beforeend") {
      const count = this.children.length;
      const res = og.call(this, position, ...args);
      const added = this.children.length - count;
      for (let i = 0; i < added; i++)
        onCreateRoot(this.children[count + i]);
      return res;
    }
    else if (position === "beforebegin" && this.parentNode) {
      const prevSib = this.previousElementSibling;
      const res = og.call(this, position, ...args);
      let x = prevSib?.nextElementSibling ?? this.parentNode.firstElementChild;
      for (; x !== this; x = x.nextElementSibling)
        onCreateRoot(x);
      return res;
    }
    else if (position === "afterend" && this.parentNode) {
      let nextSib = this.nextElementSibling;
      const res = og.call(this, position, ...args);
      for (let el = this.nextElementSibling; el && el !== nextSib; el = el.nextElementSibling)
        onCreateRoot(el);
      return res;
    }
    return og.call(this, position, ...args); //let the og fail in its own way
  }
  const cloneNode_DD = og => function cloneNode_DD(...args) {
    const res = og.call(this, ...args);
    onCreateRoot(res);
    return res;
  }
  const setAttribute_DD = og => function setAttribute_DD(name, value) {
    const res = og.call(this, name, value);
    const at = this.getAttributeNode(name);
    onElement(at);
    return res;
  }
  const removeAttribute_DD = og => function removeAttribute_DD(name) {
    const at = this.getAttributeNode(name);
    const res = og.call(this, name);
    at && offElement(at);
    return res;
  }
  const toggleAttribute_DD = og => function toggleAttribute_DD(name, force) {
    const old = this.getAttributeNode(name);
    const res = og.call(this, name, force);
    const now = this.getAttributeNode(name);
    if (!old && now) onElement(now);
    if (old && !now) offElement(old);
    return res;
  }
  const reflectingProperty_DD = (og, attr) => function wrapSet(value) {
    const old = this.getAttributeNode(attr);
    const res = og.call(this, value);
    const now = this.getAttributeNode(attr);
    if (!old && now) onElement(now);
    if (old && !now) offElement(old);
    return res;
  }

  const Methods = [
    [Element.prototype, "insertAdjacentHTML", insertAdjacentHTML_DD],
    [Node.prototype, "cloneNode", cloneNode_DD],
    [Element.prototype, "setAttribute", setAttribute_DD],
    [Element.prototype, "removeAttribute", removeAttribute_DD],
    [Element.prototype, "toggleAttribute", toggleAttribute_DD],
  ];
  const Setters = [
    [Element.prototype, "innerHTML", innerHTMLsetter],
    [globalThis.ShadowRoot?.prototype, "innerHTML", innerHTMLsetter],
    [Element.prototype, "outerHTML", outerHTMLsetter],
  ];
  const ReflectingProps = [
    //boolean reflecting attributes
    [Element.prototype, "hidden"],
    [HTMLInputElement.prototype, "disabled"],
    [HTMLInputElement.prototype, "readonly"],
    [HTMLInputElement.prototype, "required"],
    [HTMLButtonElement.prototype, "disabled"],
    [HTMLSelectElement.prototype, "disabled"],
    [HTMLSelectElement.prototype, "required"],
    [HTMLSelectElement.prototype, "multiple"],
    [HTMLSelectElement.prototype, "size"],
    [HTMLTextAreaElement.prototype, "disabled"],
    [HTMLTextAreaElement.prototype, "readonly"],
    [HTMLTextAreaElement.prototype, "required"],
    [HTMLDetailsElement.prototype, "open"],
    [globalThis.HTMLDialogElement?.prototype, "open"],
    //string reflecting attributes
    [Element.prototype, "id"],
    [Element.prototype, "className", "class"],
    [HTMLImageElement.prototype, "src"],
    [HTMLIFrameElement.prototype, "src"],
    [HTMLAnchorElement.prototype, "href"],
    [HTMLFormElement.prototype, "method"],
    [HTMLFormElement.prototype, "action"],
    [HTMLTextAreaElement.prototype, "value"],
    [HTMLSelectElement.prototype, "value"],
  ];

  for (let [obj, method, wrapper] of Methods) {
    const OG = Object.getOwnPropertyDescriptor(obj, method);
    OG && Object.defineProperty(obj, method, { ...OG, value: wrapper(OG.value) });
  }
  for (let [obj, prop, wrapper] of Setters) {
    const OG = Object.getOwnPropertyDescriptor(obj, prop);
    OG && Object.defineProperty(obj, prop, { ...OG, set: wrapper(OG.set) });
  }
  for (let [obj, prop, attr = prop] of ReflectingProps) {
    const OG = Object.getOwnPropertyDescriptor(obj, prop);
    OG && Object.defineProperty(obj, prop, { ...OG, set: reflectingProperty_DD(OG.set, attr) });
  }

  Object.defineProperties(Element.prototype, {
    setAttributeNode: { value: () => { throw new Error("setAttributeNode is deprecated in DoubleDots."); } },
    hasAttributeNode: { value: () => { throw new Error("hasAttributeNode is deprecated in DoubleDots."); } },
    removeAttributeNode: { value: () => { throw new Error("removeAttributeNode is deprecated in DoubleDots."); } },
    setAttributeNS: { value: () => { throw new Error("setAttributeNS is deprecated in DoubleDots."); } },
    hasAttributeNS: { value: () => { throw new Error("hasAttributeNS is deprecated in DoubleDots."); } },
    removeAttributeNS: { value: () => { throw new Error("removeAttributeNS is deprecated in DoubleDots."); } },
    setAttributeNodeNS: { value: () => { throw new Error("setAttributeNodeNS is deprecated in DoubleDots."); } },
    hasAttributeNodeNS: { value: () => { throw new Error("hasAttributeNodeNS is deprecated in DoubleDots."); } },
    removeAttributeNodeNS: { value: () => { throw new Error("removeAttributeNodeNS is deprecated in DoubleDots."); } },
  });
}

export class AttrOnOff {

  static ON = Symbol("on");
  static OFF = Symbol("off");
  static PORTAL = Symbol("portal");
  static #singleton;
  onTasks = new Set();
  offTasks = new Set();
  noOn = new IterableWeakSet();
  Defs = Object.create(null);

  constructor(...defs) {
    if (AttrOnOff.#singleton)
      throw new Error("AttrOnOff is a singleton class. You can only create one once.");
    AttrOnOff.#singleton = this;
    for (let { name, on, off } of defs)
      this.observe({ name, on, off });
    monkeyPatchHtmlMutations(at => this.on(at), at => this.off(at));
    for (let el of document.getElementsByTagName("*"))
      for (let at of el.attributes)
        this.on(at);
    if (document.readyState !== "loading")
      return;
    document.addEventListener("DOMContentLoaded", () => {
      for (let el of document.getElementsByTagName("*")) {
        if (AttrOnOff.PORTAL in el.attributes[0])
          continue;
        for (let at of el.attributes)
          this.on(at);
      }
    }, { once: true });
  }

  on(at) {
    if (!at[AttrOnOff.PORTAL]) {
      const portal = at.name.substring(0, at.name.search(/[_.:$]/));
      Object.assign(at, { [AttrOnOff.PORTAL]: portal }, this.Defs[portal]);
    }
    if (!at[AttrOnOff.ON])
      return this.noOn.add(at);
    this.onTasks.add(at);
    if (this.onTasks.size > 1)
      return;
    queueMicrotask(_ => {
      const tasks = new Set(this.onTasks);
      for (let at of tasks)
        try {
          at[AttrOnOff.ON]();
        } catch (e) {
          errorHandler(at, "ON", e);
        }
      this.onTasks.clear();
    });
  }

  off(at) {
    this.noOn.delete(at);
    if (!at[AttrOnOff.OFF])
      return;
    this.offTasks.add(at);
    if (this.offTasks.size > 1)
      return;
    queueMicrotask(_ => {
      for (let at of this.offTasks)
        try {
          at[AttrOnOff.OFF]();
        } catch (e) {
          errorHandler(at, "OFF", e);
        }
      this.offTasks.clear();
    });
  }

  observe({ name, on, off }) {
    if (!/^[a-z][a-z0-9]*$/.test(name))
      throw new Error(`Invalid portal name: ${name}`);
    if (!on)
      throw new Error(`Missing on() for portal: ${name}`);
    if (typeof on !== "function")
      throw new Error(`Invalid on() for portal: ${name}`);
    if (off && typeof off !== "function")
      throw new Error(`Invalid off() for portal: ${name}`);
    const Def = this.Defs[name] = { [AttrOnOff.ON]: on, [AttrOnOff.OFF]: off };
    for (let at of this.noOn)
      if (at[AttrOnOff.PORTAL] === name) {
        Object.assign(at, Def);
        this.noOn.delete(at);
        this.on(at);
      };
  }
}

//// DomRelationship (weak)!////
//// element a => function that defines a location  => element b (or a list of element bs) ////
const RELATIONS = new Set();
const MO = new MutationObserver(function task() {
  for (const rel of RELATIONS) {
    const a = rel.a.deref();
    if (a === undefined) {
      removeRelationship(rel);
      continue;
    }
    if (!a.isConnected)
      continue;
    const newB = rel.checkB(a);
    if (newB === false)
      continue;
    rel.callback(newB);
  }
});

function addRelationship(rel) {
  RELATIONS.add(rel);
  if (RELATIONS.size === 1)
    MO.observe(document, { childList: true, subtree: true });
}
function removeRelationship(rel) {
  RELATIONS.delete(rel);
  if (RELATIONS.size === 0)
    MO.disconnect();
}

const BUS = document.createTextNode("");
MO.observe(BUS, { characterData: true });

export class DomRelationship {
  constructor(a, aToB, callback) {
    if (!(a instanceof Element)) throw new Error("The first argument must be a DOM element.");
    if (typeof aToB !== "function") throw new Error("The second argument must be a function that takes an element and returns an element or an iterable of elements.");
    if (typeof callback !== "function") throw new Error("The third argument must be a function that takes two arguments: the new value(s) and the old value(s).");
    this.a = new WeakRef(a);
    this.aToB = aToB;
    this.callback = callback;
    this.b = null;
    addRelationship(this);
    if (a.isConnected)
      BUS.data = BUS.data === "1" ? "0" : "1";
  }

  checkB(a) {
    let newB = null;
    try {
      newB = this.aToB(a);
    } catch (e) {
      errorHandler(e);
    }
    const b = this.b?.deref();
    if (b === newB) return false;
    if (newB == null) return this.b = null;
    if (newB instanceof Node) { this.b = new WeakRef(newB); return newB; }
    errorHandler(new Error(`Invalid Node DomRelationship: aToB() must return a Node or null.`));
  }

  abort() {
    removeRelationship(this);
  }
}

export class ArrayDomRelationship extends DomRelationship {

  checkB(a) {
    let newB = null;
    try {
      newB = this.aToB(a);
      const b = this.b;
      if (b === newB) return false;
      if (newB == null) return this.b = null;
      if (!b && newB) {
        newB = Array.from(newB);
        this.b = newB.map(n => new WeakRef(n));
        return newB;
      }
      if (newB && b) {
        let i = 0;
        for (const x of newB)
          if (b[i++]?.deref() !== x) {
            newB = Array.from(newB);
            this.b = newB.map(n => new WeakRef(n));
            return newB;
          }
        if (i !== b.length) {
          newB = Array.from(newB);
          this.b = newB.map(n => new WeakRef(n));
          return newB;
        }
        return false;
      }
      throw new Error("Invalid iterable DomRelationship: aToB() must return an iterable or nullish.");
    } catch (e) {
      errorHandler(e);
    }
  }
}