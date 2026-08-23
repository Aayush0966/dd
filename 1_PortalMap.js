//I am not sure that we need a maxLimit on this one.. 
function memoizeAsync(fn, maxLimit = 10000) {
  let cache = Object.create(null);
  let size = 0;
  const keepCount = Math.floor(maxLimit / 2);
  return function (strArg) {
    const cached = cache[strArg];
    if (cached !== undefined)
      return cached;
    if (size > maxLimit) {
      const newCache = Object.create(null);
      let i = keepCount;
      for (const key in cache) {
        if (!i--) break;
        newCache[key] = cache[key];
      }
      cache = newCache;
      size = keepCount;
    }
    size++;
    let res = fn(strArg);
    if (res instanceof Promise)
      res = res.then(
        result => cache[strArg] = result,
        cause => cache[strArg] = new Error(fn.name + ": " + strArg, { cause })
      );
    return cache[strArg] = res;
  };
}

import { AttrOnOff } from "./AttributeObserver/OnOffAttr.js";

const Resolver = Symbol("resolver");
const PromiseResolver = r => Object.assign(new Promise(f => r = f), { [Resolver]: r });

function checkFunction(func) {
  if (typeof func !== "function")
    return `not a function, but a ` + typeof func;
  let txt = func.toString();
  if (!/^(async\s+|)(\(|[^([]+=)/.test(txt))
    return;
  txt = txt.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  txt = txt.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '');
  txt = txt.replace(/(`)(?:(?=(\\?))\2.)*?\1/g, '');
  if (/\bthis\b/.test(txt))
    return 'arrow function with "this"';
}

function verifyPortalDefinition(name, { on, off, reaction }) {
  if (!on && !reaction)
    throw `missing both .on and .reaction`;
  if (off && !on)
    throw `missing .on, but defining .off`;
  for (let [k, v] of Object.entries({ on, off }))
    if (v &&= (v = checkFunction(v)))
      throw `.${k} is ${v}`;
  if (reaction && typeof reaction !== "function")
    throw `.reaction is not a function, but a ` + typeof reaction;
  return Object.freeze({ name, on, off, reaction });
}

export class PortalMap {

  #attrOnOff = new AttrOnOff();
  #portals = Object.create(null);
  #portalUnresolved = Object.create(null); //portals and portals promises encountered
  #reactionRequests = Object.create(null);

  constructor(Portals) {
    for (const [name, Portal] of Object.entries(Portals))
      this.define(name, Portal?.prototype?.on ? Portal.prototype : Portal); //so we can pass in class def objects.
  }

  define(name, Portal) {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(name))
      throw new SyntaxError(`Portal definition names must be camelCase: '${name}'.`);
    name = name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    if (name in this.#portalUnresolved)
      throw new ReferenceError(`Trying to define portal twice: ${name}.`);
    this.#portalUnresolved[name] = Portal;
    this.#definePortal(name, Portal);
  }

  #definePortal(name, Portal) {
    if (Portal instanceof Promise)
      return Portal.err(e => e).then(P => this.#definePortal(name, P));
    try {
      Portal = this.#portals[name] = verifyPortalDefinition(name, Portal);
      Portal.on && this.#attrOnOff.observe(Portal); //runs the on() (ie. trigger) for all existing attributes with this portal name sync!
    } catch (cause) {
      this.#portals[name] = new TypeError(`Portal '${name}': ${cause.message ?? cause}`, { cause });
    } finally {
      const request = this.#reactionRequests[name];
      delete this.#reactionRequests[name];
      request?.[Resolver](this.#portals[name]); //runs all the microtasks awaiting the reaction.
    }
  }

  get(portalName) {
    return this.#portals[portalName];
  }

  getWithCallback(portalName) {
    return this.#portals[portalName] ?? (this.#reactionRequests[portalName] ??= PromiseResolver());
  }

  getReaction = memoizeAsync(reactionName => {
    const portalName = reactionName.split(/[._]/)[0];
    const portal = this.#portals[portalName] ?? (this.#reactionRequests[portalName] ??= PromiseResolver());
    return portal instanceof Promise ?
      portal.then(p => getReaction(p, reactionName, portalName)) :
      getReaction(portal, reactionName, portalName);
  });
}

function getReaction(portal, reactionName, portalName) {
  if (portal instanceof Error)
    return portal;
  if (!portal.reaction)
    return new TypeError(`Portal '${portalName}': Reaction '${reactionName}': No reaction defined.`);
  try {
    const reaction = portal.reaction(reactionName);
    return reaction instanceof Promise ?
      reaction.then(r => r, cause => new TypeError(`Portal '${portalName}': Reaction '${reactionName}': ${cause.message ?? cause}`, { cause })) :
      reaction;
  } catch (cause) {
    return new TypeError(`Portal '${portalName}': Reaction '${reactionName}': ${cause.message ?? cause}`, { cause });
  }
}

/**
 * TriggerReactionRaceCondition
 * -------------------------------------------------------------------------
 * Ensure that when a new portal is registered, that the triggers for that portal 
 * in the DOM always trigger *before* any .reaction requests.
 * -------------------------------------------------------------------------
 * 
 * If both a reaction and trigger awaits the same portal definition, then
 * the reaction is often registered first in the FIFO microtask queue.
 * However, portals always function reaction => triggers (not the other way round).
 * This means that we always want all the portal's triggers to be ready before we run any of the portal's reactions.
 */