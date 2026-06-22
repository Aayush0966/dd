import { WeakDictionaryOfSets } from "./1_PortalMap.js";

const prevent = {
  reaction: NAME => (...args) => (args.at(-1).preventDefault(), EventLoopCube.Void),
}

const log = {
  reaction: NAME => function (...args) { console.log(this, ...args); },
}

const StateTriggers = new WeakDictionaryOfSets();
const OldStates = Object.create(null);
const Props = Symbol("props");

const state = {
  onFirstConnect: function () {
    const [portal, ...props] = this.dots[0].split("_");
    OldStates[portal] ??= Object.create(null);
    if (props.length)
      this[Props] = props;
    StateTriggers.put(portal, this, _ => OldStates[portal] = undefined);
  },
  reaction: NAME => {
    const [portal, ...props] = NAME.split("_");
    return function (...args) {
      const oldState = OldStates[portal];
      let newState, changed;
      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const arg = args[i];
        if (oldState[prop] !== arg) {
          newState = Object.assign(newState ?? Object.create(null), oldState, { [prop]: arg });
          (changed ??= []).push(prop)
        }
      }
      if (!newState) return;
      OldStates[portal] = Object.freeze(newState);
      let res;
      for (const trigger of StateTriggers.get(portal))
        if (!trigger[Props] || (trigger[Props].some(p => changed.includes(p)) && trigger[Props].every(p => p in newState)))
          (res ??= []).push(trigger);
      if (res)
        eventLoopCube.dispatchBatch(newState, res);
    }
  }
}

export {
  prevent,
  state,
  log,
};