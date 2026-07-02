import { AttrOnOff } from "./OnOffAttr.js";
import { parsePortalStep } from "./PortalNameParser.js";

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

function verifyPortalDefinition(Portal) {
  const src = typeof Portal === "function" ? Portal.prototype : Portal;
  if (!(src instanceof Object))
    throw `not an object or class, but a ` + typeof Portal;
  const { on, off, reaction } = src;
  if (!on && !reaction)
    throw `missing both .on and .reaction`;
  if (off && !on)
    throw `missing .on, but defining .off`;
  for (let [k, v] of Object.entries({ on, off }))
    if (v &&= checkFunction(v))
      throw `.${k} is ${v}`;
  if (reaction && typeof reaction !== "function")
    throw `.reaction is not a function, but a ` + typeof reaction;
  return Object.freeze({ on, off, reaction });
}

export class PortalsMap {

  #attrOnOff;
  #portals = Object.create(null);       
  #portalUnresolved = Object.create(null);
  #reactionRequests = Object.create(null);
  #reactionCache = Object.create(null);   

  constructor(...maps) {
    this.#attrOnOff = new AttrOnOff();
    for (const [name, Portal] of Object.entries(Object.assign(Object.create(null), ...maps)))
      this.define(name, Portal);
  }

  define(name, Portal) {
    if (!/^[a-z][a-z0-9-]*$/.test(name)) 
      throw new SyntaxError(`Illegal portal name: '${name}'.`);
    if (name in this.#portalUnresolved)
      throw new ReferenceError(`Trying to define portal twice: ${name}.`);
    this.#portalUnresolved[name] = Portal;
    try {
      const Def = this.#portals[name] = verifyPortalDefinition(Portal);
      Def.on && this.#attrOnOff.define(name, Def.on, Def.off);
    } catch (cause) {
      this.#portals[name] = new TypeError(`Portal '${name}': ${cause.message ?? cause}`, { cause });
    } finally {
      const request = this.#reactionRequests[name];
      delete this.#reactionRequests[name];
      request?.[Resolver](this.#portals[name]);
    }
  }

 
  getReaction(reactionName) {
    return this.#reactionCache[reactionName] ??= this.#resolveReaction(reactionName);
  }

  #resolveReaction(reactionName) {
    const reactionParts = parsePortalStep(reactionName);
    const portalName = reactionParts.portal;
    const Def = this.#portals[portalName];
    if (Def)
      return this.#makeReaction(Def, reactionName, portalName, reactionParts);
    const request = this.#reactionRequests[portalName] ??= PromiseResolver();
    return request.then(Def =>
      this.#reactionCache[reactionName] = this.#makeReaction(Def, reactionName, portalName, reactionParts));
  }

  #makeReaction(Def, reactionName, portalName, reactionParts) {
    if (Def instanceof Error)
      return Def;
    const factory = Def.reaction;
    if (!factory)
      return new TypeError(`Portal '${portalName}': Reaction '${reactionName}': no reaction defined.`);
    try {
      const reaction = factory.call(Def, reactionName, reactionParts);
      return reaction instanceof Promise ?
        reaction.then(r => r, cause =>
          new TypeError(`Portal '${portalName}': Reaction '${reactionName}': ${cause.message}`, { cause })) :
        reaction;
    } catch (cause) {
      return new TypeError(`Portal '${portalName}': Reaction '${reactionName}': ${cause.message}`, { cause });
    }
  }

  get(portalName) {
    return this.#portals[portalName];
  }
}
