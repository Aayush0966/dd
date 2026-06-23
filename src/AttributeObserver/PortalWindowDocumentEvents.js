import { IterableWeakSet } from "./OnOffAttr.js";

function Portal(type, root) {
  const className = type[0].toUpperCase() + type.slice(1) + "Portal";
  const Attrs = new IterableWeakSet();
  function Listener(e) {
    Attrs.cleanup();
    Attrs.size ?
      eventLoop.dispatchBatch(e, Attrs) :
      root.removeEventListener(type, Listener);
  };
  return {
    [className]: class {
      on() { Attrs.add(this); root.addEventListener(type, Listener); }
      off() { Attrs.delete(this); }
      reaction() { NAME => () => Listener(new Event(type, { bubbles: true })); }
    }
  }[className];
}

const DocumentOnlyEvents =
  ['readystatechange', 'pointerlockchange', 'pointerlockerror', 'freeze', 'prerenderingchange', 'resume', 'visibilitychange'];
const WindowOnlyEvents = ['appinstalled', 'beforeinstallprompt', 'afterprint', 'beforeprint', 'beforeunload', 'hashchange', 'languagechange',
  'message', 'messageerror', 'offline', 'online', 'pagehide', 'pageshow', 'popstate', 'rejectionhandled', 'storage', 'unhandledrejection', 'unload',
  'devicemotion', 'deviceorientation', 'deviceorientationabsolute', 'pageswap', 'pagereveal'];

const Portals = Object.create(null);
Portals.dcl = Portal("DOMContentLoaded", document);
Portals.youtubeiframeapiready = Portal("YouTubeIframeAPIReady", window);
for (let type of DocumentOnlyEvents)
  Portals[type] = Portal(type, document);
for (let type of WindowOnlyEvents)
  Portals[type] = Portal(type, window);

export { Portals };