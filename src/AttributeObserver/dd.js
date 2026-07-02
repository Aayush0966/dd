import { EventLoopCube } from "./2_EventLoopCube.js";
import { AttrOnOff } from "./OnOffAttr.js";
import { PortalsMap } from "./PortalsMap.js";
import { Portals as DomEvents } from "./PortalDomEvents.js";
import { Portals as WindowDocumentEvents } from "./PortalWindowDocumentEvents.js";
import { Portals as Observers } from "./PortalObservers.js";
import { Portals as State } from "./PortalState.js";

function init() {
  window.EventLoopCube = EventLoopCube;
  window.AttrOnOff = AttrOnOff;   // PortalDomEvents reads AttrOnOff.PORTAL as a global
  window.eventLoopCube = new EventLoopCube();

  // PortalsMap owns the portals + reaction resolution, and creates the
  // AttrOnOff watcher internally, delegating on()/off() to it.
  document.portals = new PortalsMap(DomEvents, WindowDocumentEvents, Observers, State);
}

document.readyState !== "loading" ? init() : document.addEventListener("DOMContentLoaded", init);
