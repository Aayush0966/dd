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
  const setAttributeNode_DD = og => function setAttributeNode_DD(at) {
    const res = og.call(this, at);
    onElement(at);
    return res;
  }
  const removeAttribute_DD = og => function removeAttribute_DD(name) {
    const at = this.getAttributeNode(name);
    const res = og.call(this, name);
    at && offElement(at);
    return res;
  }
  const removeAttributeNode_DD = og => function removeAttributeNode_DD(at) {
    const res = og.call(this, at);
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
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "setAttributeNode");
  Object.defineProperty(Element.prototype, "setAttributeNode", { value: setAttributeNode_DD(OG.value) });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute");
  Object.defineProperty(Element.prototype, "removeAttribute", { value: removeAttribute_DD(OG.value) });
  OG = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttributeNode");
  Object.defineProperty(Element.prototype, "removeAttributeNode", { value: removeAttributeNode_DD(OG.value) });

  //deprecate the namespace versions since they are not supported by DoubleDots and only add complexity to the implementation
  const setAttributeNodeNS_DD = () => { throw new Error("setAttributeNodeNS is not supported by DoubleDots."); }
  const setAttributeNS_DD = () => { throw new Error("setAttributeNS is not supported by DoubleDots."); }
  const hasAttributeNS = () => { throw new Error("hasAttributeNS is not supported by DoubleDots."); }
  const hasAttributeNodeNS = () => { throw new Error("hasAttributeNodeNS is not supported by DoubleDots."); }
  const removeAttributeNS = () => { throw new Error("removeAttributeNS is not supported by DoubleDots."); }
  const removeAttributeNodeNS = () => { throw new Error("removeAttributeNodeNS is not supported by DoubleDots."); }
  Object.defineProperty(Element.prototype, "setAttributeNodeNS", { value: setAttributeNodeNS_DD });
  Object.defineProperty(Element.prototype, "setAttributeNS", { value: setAttributeNS_DD });
  Object.defineProperty(Element.prototype, "hasAttributeNS", { value: hasAttributeNS });
  Object.defineProperty(Element.prototype, "hasAttributeNodeNS", { value: hasAttributeNodeNS });
  Object.defineProperty(Element.prototype, "removeAttributeNS", { value: removeAttributeNS });
  Object.defineProperty(Element.prototype, "removeAttributeNodeNS", { value: removeAttributeNodeNS });
}

function domAttributes() {
  const attrs = [];
  for (let el of document.getElementsByTagName('*'))
    for (let at of el.attributes)
      attrs.push(at);
  if (document.readyState !== 'loading')
    return { attrs };
  Object.freeze(attrs);
  const promise = new Promise(resolver => document.addEventListener('DOMContentLoaded', () => {
    const attrs2 = [];
    for (let el of document.getElementsByTagName('*'))
      for (let at of el.attributes)
        if (!attrs.includes(at))
          attrs2.push(at);
    resolver(attrs2);
  }, { once: true }));
  return { attrs, promiseOfFutureAttrs: promise };
}


const OBSERVERS = new Map();
let CBS;
let ATTRS = [];

function onCreateAttribute(at) {
  if (ATTRS.length)
    return ATTRS.push(at);
  ATTRS.push(at);
  queueMicrotask(_ => {
    Object.freeze(ATTRS);
    for (let cb of CBS)
      cb(ATTRS);
    ATTRS = [];
  });
}

monkeyPatchHtmlMutations(onCreateAttribute);

export class AttributeObserver {

  observe({ filter, cb }) {
    OBSERVERS.set(this, cb);
    CBS = new Set(OBSERVERS.values());
  }

  disconnect() {
    OBSERVERS.delete(this);
    CBS = new Set(OBSERVERS.values());
  }
}


