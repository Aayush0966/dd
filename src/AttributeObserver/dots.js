import { EventLoopCube } from "./2_EventLoopCube.js";
import { PortalsMap } from "./PortalsMap.js";
import { Portals as DomEvents } from "./PortalDomEvents.js";
import { Portals as WindowDocumentEvents } from "./PortalWindowDocumentEvents.js";
import { Portals as Observers } from "./PortalObservers.js";
import { Portals as State } from "./PortalState.js";

function init() {
  window.EventLoopCube = EventLoopCube;
  window.eventLoopCube = new EventLoopCube();
  document.portals = new PortalsMap({...DomEvents, ...WindowDocumentEvents, ...Observers, ...State});
}

document.readyState !== "loading" ? init() : document.addEventListener("DOMContentLoaded", init);