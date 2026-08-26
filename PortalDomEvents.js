const DomEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'beforexrselect', 'abort', 'beforeinput', 'beforematch', 'beforetoggle',
  'blur', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contentvisibilityautostatechange', 'contextlost', 'contextmenu',
  'contextrestored', 'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange',
  'emptied', 'ended', 'error', 'focus', 'formdata', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata',
  'loadstart', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'pause', 'play', 'playing',
  'progress', 'ratechange', 'reset', 'resize', 'scroll', 'securitypolicyviolation', 'seeked', 'seeking', 'select', 'slotchange', 'stalled',
  'submit', 'suspend', 'timeupdate', 'toggle', 'volumechange', 'waiting', 'webkitanimationend', 'webkitanimationiteration', 'webkitanimationstart',
  'webkittransitionend', 'wheel', 'auxclick', 'gotpointercapture', 'lostpointercapture', 'pointerdown', 'pointermove', 'pointerrawupdate',
  'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'selectstart', 'selectionchange', 'animationend',
  'animationiteration', 'animationstart', 'transitionrun', 'transitionstart', 'transitionend', 'transitioncancel', 'copy', 'cut', 'paste', 'command',
  'scrollend', 'scrollsnapchange', 'scrollsnapchanging', 'beforecopy', 'beforecut', 'beforepaste', 'search', 'fullscreenchange', 'fullscreenerror',
  'webkitfullscreenchange', 'webkitfullscreenerror'];
const NonBubblingEvents = new Set(['focus', 'blur', 'load', 'unload', 'error', 'abort', 'mouseenter', 'mouseleave',
  'scroll', 'scrollend', 'scrollsnapchange', 'scrollsnapchanging']);
const ComposedEvents = new Set(['click', 'auxclick', 'dblclick', 'mousedown', 'mouseup', 'focus', 'blur',
  'pointerdown', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave']);
const PassiveEvents = new Set(["wheel", "mousewheel", "touchstart", "touchmove"]);

const propagationPath = nextElement => (type, el) => {
  let attrs;
  for (; el; el = nextElement(el))
    for (let at of el.attributes)
      if (at.trigger === type)
        (attrs ??= []).push(at);
  return attrs;
}

const composedBubble = propagationPath(el => el.assignedSlot ?? el.parentElement ?? el.parentNode.host);
const composedTarget = propagationPath(el => el.assignedSlot ?? el.getRootNode()?.host);
const bubble = propagationPath(el => el.parentElement);
const target = propagationPath(() => null);

function getSettings(type) {
  const passive = PassiveEvents.has(type);
  const bubbles = !NonBubblingEvents.has(type);
  const composed = ComposedEvents.has(type);
  const propagationPath =
    (bubbles && composed) ? composedBubble :
      composed ? composedTarget :
        bubbles ? bubble :
          target;
  return { passive, bubbles, composed, propagationPath };
}

function Portal(TYPE, reaction) {
  const className = TYPE[0].toUpperCase() + TYPE.slice(1) + "Portal";
  const { passive, bubbles, composed, propagationPath } = getSettings(TYPE);
  const LISTENER = function (e) {
    e.stopImmediatePropagation();
    eventLoopCube.dispatchBatch(e, propagationPath(TYPE, e.currentTarget));
  };

  return { [className]: class {
    on() {
      this.ownerElement.addEventListener(TYPE, LISTENER, { passive: passive || this.name.includes("_passive") });
    }
    off() {
      this.ownerElement.removeEventListener(TYPE, LISTENER, { passive: passive || this.name.includes("_passive") });
    }
    reaction(NAME) {
      return reaction ?? function () {
        this.ownerElement.dispatchEvent(new Event(TYPE, { bubbles, composed, cancelable: !passive }));
      };
    }
  } }[className];
}
const Portals = Object.create(null);
Portals.click = Portal("click", function () { this.ownerElement.click() });
Portals.submit = Portal("submit", function () { this.ownerElement.requestSubmit() });

for (let type of DomEvents)
  Portals[type] ??= Portal(type);

export { Portals };