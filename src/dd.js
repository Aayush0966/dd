import { PortalMap } from "./1_PortalMap.js";
import { Portals as GlobalEvents } from "./1c_WindowDocumentEvents.js";
import { Portals as ExtraEvents } from "./1d_navigationViewport.js";
import { Portals as DomEvents } from "./1b_DomEvents.js";
import { EventLoopCube } from "./2_EventLoopCube.js";
// import { AttrOnOff } from "./AttributeObserver/OnOffAttr.js";
// import { monkeyPatchAppendElements } from "./3_monkeyPatchAppendElements.js";

function init() {
  window.EventLoopCube = EventLoopCube;
  window.eventLoopCube = new EventLoopCube();
  document.portals = new PortalMap();
  for (let [k, v] of Object.entries({ ...GlobalEvents, ...DomEvents, ...ExtraEvents }))
    document.portals.define(k, v);
  // attOnOff around here
  // const cube = EventLoopCube.init(window, document.documentElement);
  // monkeyPatchAppendElements((...args) => cube.connectBranch(...args));
}

document.readyState !== "loading" ? init() : document.addEventListener("DOMContentLoaded", init);
