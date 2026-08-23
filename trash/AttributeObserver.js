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
        onElement.add(at);
    for (let el of root.getElementsByTagName("*"))
      for (let at of el.attributes)
        onElement.add(at);
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
    onElement.add(at);
    return res;
  }
  const removeAttribute_DD = og => function removeAttribute_DD(name) {
    const at = this.getAttributeNode(name);
    const res = og.call(this, name);
    at && offElement.add(at);
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
const OnElements = new IterableWeakSet();
for (let el of document.getElementsByTagName('*'))
  for (let at of el.attributes)
    OnElements.add(at);

const OffElements = new IterableWeakSet();

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
  return { attrs, coming: promise };
}

const PortalNames = new WeakMap();
function getPortalName(at) {
  let n = PortalNames.get(at);
  if (!n) PortalNames.set(at, n = at.name.split(/[_.:]/)[0]);
  return n;
}

class MicroTaskScheduler {
  constructor() {
    this.OnElements = new Set();
    this.OffElements = new Set();
    this.active = false;

    this.seen = new WeakSet();
    this.portalNames = new WeakMap();


    const { attrs, coming } = domAttributes();
    for (let at of attrs)
      globalOnElement(at);
    coming?.then(attrs2 => {
      for (let at of attrs2)
        globalOnElement(at);
    });

  }

  setUpTask() {
    this.active = true;
    queueMicrotask(_ => {
      try {
        this.bigCb?.(this.OnElements, this.OffElements);
      } catch (e) {
        console.error("Observer Error in big callback:", e);
      }
      this.OnElements.clear();
      this.OffElements.clear();
      this.active = false;
    });
  }

  onElementQueue(at) {
    this.active || this.setUpTask();
    this.OnElements.add(at);
  }
  offElementQueue(at) {
    this.active || this.setUpTask();
    this.OffElements.add(at);
  }
}



const Attribs = {};
const onElementCallbacks = {};
const offElementCallbacks = {};
const seen = new WeakSet();

function globalOnElement(at, portalName = getPortalName(at)) {
  if (seen.has(at)) return;
  seen.add(at);
  (Attribs[portalName] ??= new IterableWeakSet()).add(at);
  return onElementCallbacks[portalName]?.(at);
}


function globalOffElement(at, portalName = getPortalName(at)) {
  return offElementCallbacks[portalName]?.(at);
}

class AttributeObserver {
  observe(Def) {
    const { portal, onElement, offElement, onElementAgain } = Def;
    if (!portal.matches(/^[a-zA-Z][a-zA-Z0-9]*$/))
      throw new Error(`Invalid portal name: ${portal}`);
    if (!onElement)
      throw new Error(`Missing onElement callback for portal: ${portal}`);
    if (typeof onElement !== "function")
      throw new Error(`Invalid onElement callback for portal: ${portal}`);
    if (offElement && typeof offElement !== "function")
      throw new Error(`Invalid offElement callback for portal: ${portal}`);
    if (onElementAgain && typeof onElementAgain !== "function")
      throw new Error(`Invalid onElementAgain callback for portal: ${portal}`);
    onElementCallbacks[portal] = onElement;
    offElementCallbacks[portal] = offElement;
    onElementAgainCallbacks[portal] = onElementAgain;
    const attribs = Attribs[portal];
    if (attribs)
      for (let at of attribs)
        globalOnElement(at, portal);
  }
}

monkeyPatchHtmlMutations(globalOnElement, globalOffElement, globalOnElementPossiblyAgain);

const OBSERVERS = new Map();
let CBS;

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


