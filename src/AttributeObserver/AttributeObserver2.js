class IterableWeakSet {
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

  let OG = Object.getOwnPropertyDescriptor(Element.prototype, "insertAdjacentHTML");
  Object.defineProperty(Element.prototype, "insertAdjacentHTML", { value: insertAdjacentHTML_DD(OG.value) });
  OG = Object.getOwnPropertyDescriptor(Node.prototype, "cloneNode");
  Object.defineProperty(Node.prototype, "cloneNode", { value: cloneNode_DD(OG.value) });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
  Object.defineProperty(Element.prototype, "innerHTML", { set: innerHTMLsetter(OG.set), get: OG.get });
  OG = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, "innerHTML");
  Object.defineProperty(ShadowRoot.prototype, "innerHTML", { set: innerHTMLsetter(OG.set), get: OG.get });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML");
  Object.defineProperty(Element.prototype, "outerHTML", { set: outerHTMLsetter(OG.set), get: OG.get });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "setAttribute");
  Object.defineProperty(Element.prototype, "setAttribute", { value: setAttribute_DD(OG.value) });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute");
  Object.defineProperty(Element.prototype, "removeAttribute", { value: removeAttribute_DD(OG.value) });

  //deprecate the namespace versions since they are not supported by DoubleDots and only add complexity to the implementation
  const setAttributeNode_DD = () => { throw new Error("setAttributeNode is not supported by DoubleDots."); }
  const hasAttributeNode = () => { throw new Error("hasAttributeNode is not supported by DoubleDots."); }
  const removeAttributeNode = () => { throw new Error("removeAttributeNode is not supported by DoubleDots."); }
  const setAttributeNS_DD = () => { throw new Error("setAttributeNS is not supported by DoubleDots."); }
  const hasAttributeNS = () => { throw new Error("hasAttributeNS is not supported by DoubleDots."); }
  const removeAttributeNS = () => { throw new Error("removeAttributeNS is not supported by DoubleDots."); }
  const setAttributeNodeNS_DD = () => { throw new Error("setAttributeNodeNS is not supported by DoubleDots."); }
  const hasAttributeNodeNS = () => { throw new Error("hasAttributeNodeNS is not supported by DoubleDots."); }
  const removeAttributeNodeNS = () => { throw new Error("removeAttributeNodeNS is not supported by DoubleDots."); }
  Object.defineProperty(Element.prototype, "setAttributeNode", { value: setAttributeNode_DD });
  Object.defineProperty(Element.prototype, "hasAttributeNode", { value: hasAttributeNode });
  Object.defineProperty(Element.prototype, "removeAttributeNode", { value: removeAttributeNode });
  Object.defineProperty(Element.prototype, "setAttributeNS", { value: setAttributeNS_DD });
  Object.defineProperty(Element.prototype, "hasAttributeNS", { value: hasAttributeNS });
  Object.defineProperty(Element.prototype, "removeAttributeNS", { value: removeAttributeNS });
  Object.defineProperty(Element.prototype, "setAttributeNodeNS", { value: setAttributeNodeNS_DD });
  Object.defineProperty(Element.prototype, "hasAttributeNodeNS", { value: hasAttributeNodeNS });
  Object.defineProperty(Element.prototype, "removeAttributeNodeNS", { value: removeAttributeNodeNS });
}

class OnOffAttrObserver {

  static ON = Symbol("on");
  static OFF = Symbol("off");
  static PORTAL = Symbol("portal");
  static singleton;
  onTasks = new Set();
  offTasks = new Set();
  noOn = new IterableWeakSet();
  Defs = Object.create(null);


  constructor(...defs) {
    if (OnOffAttrObserver.singleton)
      throw new Error("OnOffAttrObserver is a singleton class. Use OnOffAttrObserver.singleton to access the instance.");
    OnOffAttrObserver.singleton = this;
    for (let { name, on, off } of defs)
      this.observe({ name, on, off });
    monkeyPatchHtmlMutations(this.on.bind(this), this.off.bind(this));
    for (let el of document.getElementsByTagName("*"))
      for (let attr of el.attributes)
        this.on(attr);
    document.readyState === "loading" && document.addEventListener("DOMContentLoaded", () => {
      for (let el of document.getElementsByTagName("*"))
        for (let attr of el.attributes)
          this.on(attr);
    });
  }

  on(at) {
    if (!at[OnOffAttrObserver.PORTAL]) {
      const portal = at.name.substring(0, at.name.search(/[_.:]/));
      Object.assign(at, { [OnOffAttrObserver.PORTAL]: portal }, this.Defs[portal]);
    }
    if (!at[OnOffAttrObserver.ON])
      return this.noOn.add(at);
    this.onTasks.add(at);
    if (this.onTasks.size > 1)
      return;
    queueMicrotask(_ => {
      const tasks = new Set(this.onTasks);
      for (let at of tasks)
        try {
          at[OnOffAttrObserver.ON]();
        } catch (e) {
          errorHandler(at, "ON", e);
        }
      this.onTasks.clear();
    });
  }

  off(at) {
    this.noOn.delete(at);
    if (!at[OnOffAttrObserver.OFF])
      return;
    this.offTasks.add(at);
    if (this.offTasks.size > 1)
      return;
    queueMicrotask(_ => {
      for (let at of this.offTasks)
        try {
          at[OnOffAttrObserver.OFF]();
        } catch (e) {
          errorHandler(at, "OFF", e);
        }
      this.offTasks.clear();
    });
  }

  observe({ name, on, off }) {
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name))
      throw new Error(`Invalid portal name: ${name}`);
    if (!on)
      throw new Error(`Missing on() for portal: ${name}`);
    if (typeof on !== "function")
      throw new Error(`Invalid on() for portal: ${name}`);
    if (off && typeof off !== "function")
      throw new Error(`Invalid off() for portal: ${name}`);
    const Def = this.Defs[name] = { [OnOffAttrObserver.ON]: on, [OnOffAttrObserver.OFF]: off };
    for (let at of this.noOn)
      if (at[OnOffAttrObserver.PORTAL] === name) {
        Object.assign(at, Def);
        this.noOn.delete(at);
        this.on(at);
      };
  }
}
