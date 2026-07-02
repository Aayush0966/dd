import { DomRelationship, IterableWeakSet } from "./OnOffAttr.js";

class IPortal {  
  //<div i:fetch:update_state="data.json">...</h1>  //runs at first startup
  // <div i_:fetch:update_state_i="data.json">...</h1>  //runs immediately when created, even if not connected to the DOM
  on() {
    if (this.ownerElement.isConnected || this.name === "i_")
      return eventLoopCube.dispatch(null, this);
    const rel = new DomRelationship(this.ownerElement, el => el, () => {
      this.off();
      return eventLoopCube.dispatch(null, this);
    });
    rel.start();
  }
  off() {
    this.IntersectionObserver.disconnect();
  }
}

class AttrPortal {
  on() {
    this.AttrObserver = new MutationObserver(mrs => eventLoop.dispatch(this, mrs));
    const varName = this.name.split("_")[1];
    const attributeFilter = varName ? [varName] : undefined;
    this.AttrObserver.observe(this.ownerElement, { attributes: true, attributeFilter, attributeOldValue: true });
  }
  off() {
    this.AttrObserver.disconnect();
  }
  reaction(NAME) {      //:attr_active_true is a setter,    :attr_active is a getter
    const [, varName, val] = this.name.split("_");
    return val ?
      function () { this.ownerElement.setAttribute(varName, val); } :
      function () { this.ownerElement.getAttribute(varName); };
  }
}

class ResizePortal {
  get box() { return "content-box"; }
  on() {
    this.ResizeObserver = new ResizeObserver(mrs => eventLoop.dispatch(this, mrs));
    this.ResizeObserver.observe(this.ownerElement, { box: this.box });
  }
  off() { this.ResizeObserver.disconnect(); }
}
class ResizePortalBorderBox extends ResizePortal { get box() { return "border-box"; } }
class ResizePortalDevicePixelContentBox extends ResizePortal { get box() { return "device-pixel-content-box"; } }

class IntersectionPortal {
  on() {
    this.IntersectionObserver = new IntersectionObserver(mrs => eventLoop.dispatch(this, mrs), { options });
    this.IntersectionObserver.observe(this.ownerElement);
  }
  off() {
    this.IntersectionObserver.disconnect();
  }
}

class IntersectionPortalPrevious {
  on() {
    this.IntersectionObserver = new IntersectionObserver(mrs => eventLoop.dispatch(this, mrs), { options });
    const rel = new DomRelationship(this.ownerElement, el => el.previousElementSibling, (now, old) => {
      old && this.IntersectionObserver.unobserve(old);
      now && this.IntersectionObserver.observe(now);
    });
    rel.start();
  }
  off() {
    this.IntersectionObserver.disconnect();
  }
}

const Portals = Object.create(null);
Portals.i = IPortal;
Portals.attr = AttrPortal;
Portals.resize = ResizePortal;
Portals["content-box"] = Portals.resize;
Portals["border-box"] = ResizePortalBorderBox;
Portals["device-pixel-content-box"] = ResizePortalDevicePixelContentBox;
Portals.intersection = IntersectionPortal;
Portals.intersection_previous = IntersectionPortalPrevious;

export { Portals };