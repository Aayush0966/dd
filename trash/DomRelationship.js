const { addRelationship, removeRelationship } = (() => {
  const RELATIONS = new Set();
  let active = false;
  function triggerTask() {
    if (active) return;
    active = true;
    queueMicrotask(() => {
      active = false;
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
  }

  const MO = new MutationObserver(triggerTask);
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
  return { addRelationship, removeRelationship };
})();

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
    a.isConnected && triggerTask();
  }

  checkB(a) {
    let newB = null;
    try {
      newB = this.aToB(a);
    } catch (e) {
      //framework error handling
    }
    const b = this.b?.deref();
    if (b === newB) return false;
    if (newB == null) return this.b = null;
    if (newB instanceof Node) { this.b = new WeakRef(newB); return newB; }
    throw new Error(`Invalid Node DomRelationship: aToB() must return a Node or null.`);
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
          if (b[i++].deref() !== x) {
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
      //framework error handling
    }
  }
}