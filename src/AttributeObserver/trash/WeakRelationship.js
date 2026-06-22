function monkeyPatchJsMutations(onPotentialChange) {
  let cb;
  const wrapper = og =>
    function triggerMutationWrapper() {
      cb ||= !queueMicrotask(() => { cb = 0; onPotentialChange(); });
      return og.apply(this, arguments);
    };

  const ValueMethods = [
    [Element.prototype, "appendChild"],
    [Node.prototype, "insertBefore"],
    [Node.prototype, "replaceChild"],
    [Range.prototype, "insertNode"],
    [Element.prototype, "removeChild"],
    [Node.prototype, "removeChild"],
    [Element.prototype, "append"],
    [Element.prototype, "prepend"],
    [Element.prototype, "before"],
    [Element.prototype, "after"],
    [Element.prototype, "replaceWith"],
    [Element.prototype, "replaceChildren"],
    [Document.prototype, "replaceChildren"],
    [DocumentFragment.prototype, "replaceChildren"],
    [Range.prototype, "surroundContents"],
    [Element.prototype, "insertAdjacentElement"],
    [Element.prototype, "remove"],
    [Element.prototype, "insertAdjacentHTML"],
  ];
  const SetMethods = [
    [Element.prototype, "innerHTML"],
    [Element.prototype, "outerHTML"],
    [globalThis.ShadowRoot?.prototype, "innerHTML"],
    [HTMLElement.prototype, "innerText"],
    [Node.prototype, "textContent"],
  ]
  for (let [obj, method] of ValueMethods) {
    const OG = Object.getOwnPropertyDescriptor(obj, method);
    OG && Object.defineProperty(obj, method, { ...OG, value: wrapper(OG.value) });
  }
  for (let [obj, method] of SetMethods) {
    const OG = Object.getOwnPropertyDescriptor(obj, method);
    OG && Object.defineProperty(obj, method, { ...OG, set: wrapper(OG.set) });
  }
}

export class WeakRelationship {

  static relationships = new Set();
  static #isPatched;

  constructor(a, aToB, callback) {
    if (!(a instanceof Element)) throw new Error("The first argument must be a DOM element.");
    if (typeof aToB !== "function") throw new Error("The second argument must be a function that takes an element and returns an element or an iterable of elements.");
    if (typeof callback !== "function") throw new Error("The third argument must be a function that takes two arguments: the new value(s) and the old value(s).");
    this.aToB = aToB;
    this.callback = callback;
    this.a = new WeakRef(a);
    this.b = aToB(a);
    if (this.b?.[Symbol.iterator] instanceof Function && typeof this.b !== "string")
      this.b = Object.freeze(Array.from(this.b));
    if (!WeakRelationship.#isPatched)
      monkeyPatchJsMutations(WeakRelationship.checkAndRun), WeakRelationship.#isPatched = true;
    WeakRelationship.relationships.add(this);
  }

  static identicalIterables(ar, iter) {
    if (!Array.isArray(ar) || !(iter?.[Symbol.iterator] instanceof Function))
      return false;
    let i = 0;
    for (const item of iter)
      if (ar[i++] !== item)
        return false;
    return i === ar.length;
  }

  static _safeExecute(relation) {
    try {
      let { a, b, aToB, callback } = relation;
      a = a.deref();
      if (a === undefined) 
        return true;
      let newB = aToB(a);
      if (b === newB || WeakRelationship.identicalIterables(b, newB)) 
        return;
      if (newB?.[Symbol.iterator] instanceof Function && typeof newB !== "string") 
        newB = Object.freeze(Array.from(newB));
      callback(relation.b = newB, b);
    } catch (e) {
      console.error("Observer Error in WeakRelationship:", e);
    }
  }

  static checkAndRun() {
    for (const rel of WeakRelationship.relationships)
      if (!WeakRelationship._safeExecute(rel))
        WeakRelationship.relationships.delete(rel);
  }
}