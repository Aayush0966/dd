import { AttrOnOff } from "./OnOffAttr.js";

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

function verifyPortalDefinition({ on, off, reaction }) {
  // const src = typeof Portal === "function" ? Portal.prototype : Portal;
  // if (!(src instanceof Object))
  //   throw `not an object or class, but a ` + typeof Portal;
  // const { on, off, reaction } = src;
  if (!on && !reaction)
    throw `missing both .on and .reaction`;
  if (off && !on)
    throw `missing .on, but defining .off`;
  for (let [k, v] of Object.entries({ on, off }))
    if (v &&= (v = checkFunction(v)))
      throw `.${k} is ${v}`;
  if (reaction && typeof reaction !== "function")
    throw `.reaction is not a function, but a ` + typeof reaction;
  return Object.freeze({ on, off, reaction });
}

export class PortalsMap {

  #attrOnOff = new AttrOnOff();
  #portals = Object.create(null);
  #portalUnresolved = Object.create(null); //portals and portals promises encountered
  #reactionRequests = Object.create(null);
  #reactionCache = Object.create(null);

  constructor(Portals) {
    for (const name in Portals)
      this.define(name, Portals[name]);
  }

  define(name, Portal) {
    if (!/^[a-z][a-z0-9]*[$_-]/i.test(name))
      throw new SyntaxError(`Portal definition names must be CamelCase: '${name}'.`);
    name = name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
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
    const portalName = reactionName.substring(0, reactionName.search(/[_.:]|$/));
    const Def = this.#portals[portalName];
    if (Def)
      return this.#makeReaction(Def, reactionName, portalName);
    const request = this.#reactionRequests[portalName] ??= PromiseResolver();
    return request.then(Def =>
      this.#reactionCache[reactionName] = this.#makeReaction(Def, reactionName, portalName));
  }

  #makeReaction(Def, reactionName, portalName) {
    if (Def instanceof Error)
      return Def;
    const factory = Def.reaction;
    if (!factory)
      return new TypeError(`Portal '${portalName}': Reaction '${reactionName}': no reaction defined.`);
    try {
      const reaction = factory.call(Def, reactionName);
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
