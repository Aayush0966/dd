import { parseAttributeName } from "./PortalNameParser.js";

Object.defineProperties(Attr.prototype, {
  portalParts: { get: function () { return parseAttributeName(this.name); } },
  dots: { get: function () { return this.portalParts.rawSteps; } },
  trigger: { get: function () { return this.portalParts.trigger.portal; } },
});

class MicroFrame {
  #inputs = [];
  #i = 0;
  #end;

  constructor(at, portals = at.ownerElement.getRootNode()?.portals) {
    this.at = at;
    this.portals = portals;
  }

  getState() {
    return { at: this.at, inputs: this.#inputs, i: this.#i, end: this.#end };
  }

  next(input) {
    if (input instanceof Error) return this.#end = input;
    if (input !== undefined) this.#inputs.unshift(input);
    this.#i++;
    return this.run();
  }

  run() {
    for (; this.#i < this.at.dots.length; this.#i++) {
      let res = this.portals.getReaction(this.at.dots[this.#i]);
      if (res instanceof Promise)
        return res.finally(_ => this.run());
      if (res instanceof Function) {
        try {
          res = res.apply(this.at, this.#inputs);
          if (res instanceof Promise)
            return res.then(r => this.next(r), e => this.next(e));
        } catch (err) {
          res = err;
        }
      }
      if (res instanceof Error) return this.#end = res;
      if (res !== undefined) this.#inputs.unshift(res);
    }
    return this.#end = true;
  }

  static make(at) { return new MicroFrame(at); }
}

export class EventLoopCube {

  #cube; //[...events : [...microFrames]]  //todo in a more efficient world, this would be a single flat array.
  #I = 0;
  #J = 0;
  #active = false;
  constructor() {
    this.#cube = [];
  }

  get state() { return this.#cube.map(row => row.getState?.() || row.map(mf => mf.getState())); }

  #loop(newRow) {
    this.#cube.push(newRow);
    if (this.#active)
      return;
    this.#active = true;
    for (; this.#I < this.#cube.length; this.#I++) {
      const row = this.#cube[this.#I];
      const event = row[0];
      for (this.#J = 1; this.#J < row.length; this.#J++)
        row[this.#J].next?.(event);
    }
    this.#active = false;
    return;
  }

  dispatch(e, at) {
    this.#loop([e, MicroFrame.make(at)]);
  }
  dispatchBatch(e, attrs) {
    this.#loop([e, ...attrs.map(MicroFrame.make)]);
  }

  async cleanup(filter = EventLoopCube.defaultCleanupFilter) {
    const keeps = this.#cube.slice(0, this.#I).filter(filter);
    this.#cube = [...keeps, ...this.#cube.slice(this.#I)];
    this.#I = keeps.length;
  }


  static Cancel = new Error("EventLoopCube.Cancel");
  static PORTAL = Symbol("portals");
  static MOVEABLES = Symbol("moveables");
  static RECONNECTABLES = Symbol("reconnectables");
}
