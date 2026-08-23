const prevent = {
  reaction: NAME => function (...inputs) {
    inputs.at(-1)?.preventDefault?.();
  }
};


const log = {
  reaction: NAME => function (...inputs) {
    console.log(NAME, this, ...inputs);
  }
};

const toggle = {
  reaction: NAME => {
    const attrName = NAME.split("_")[1];
    if (!attrName)
      throw `toggle reaction missing attribute name, e.g. toggle_open`;
    return function () {
      this.ownerElement.toggleAttribute(attrName);
    };
  }
};

const text = {
  reaction: NAME => {
    const literal = NAME.includes("_") ? NAME.slice(NAME.indexOf("_") + 1) : undefined;
    return function (...inputs) {
      const content = literal !== undefined ? literal : inputs[0];
      if (content !== undefined)
        this.ownerElement.textContent = content;
      return content;
    };
  }
};

const html = {
  reaction: NAME => {
    const literal = NAME.includes("_") ? NAME.slice(NAME.indexOf("_") + 1) : undefined;
    return function (...inputs) {
      const content = literal !== undefined ? literal : inputs[0];
      if (content !== undefined)
        this.ownerElement.innerHTML = content;
      return content;
    };
  }
};

const wait = {
  reaction: NAME => {
    const ms = parseInt(NAME.split("_")[1], 10) || 1000;
    return function (...inputs) {
      return new Promise(resolve => setTimeout(() => resolve(inputs[0]), ms));
    };
  }
};

const fetchPortal = {
  reaction: NAME => {
    const url = NAME.split("_")[1] ?? null;
    return async function (...inputs) {
      const target = url ?? inputs[0];
      if (!target)
        throw new TypeError(`fetch: no URL provided (pass as fetch_/path or pipe a string)`);
      const res = await fetch(target);
      const ct = res.headers.get("content-type") ?? "";
      return ct.includes("json") ? res.json() : res.text();
    };
  }
};

const value = {
  reaction: NAME => {
    const literal = NAME.includes("_") ? NAME.split("_")[1] : undefined;
    return function (...inputs) {
      const next = literal !== undefined ? literal : inputs[0] ?? "";
      this.ownerElement.value = next;
      return this.ownerElement.value;
    };
  }
};

const val = {
  reaction: NAME => function () {
    return this.ownerElement.value;
  }
};

const classPortal = {
  reaction: NAME => {
    const parts = NAME.split("_");
    const cls = parts[1];
    const modifier = parts[2]?.toLowerCase();
    if (!cls)
      throw `class reaction missing class name, e.g. class_active`;
    return function (...inputs) {
      if (modifier === "true" || modifier === "add") {
        this.ownerElement.classList.add(cls);
      } else if (modifier === "false" || modifier === "remove") {
        this.ownerElement.classList.remove(cls);
      } else if (modifier === "toggle") {
        this.ownerElement.classList.toggle(cls);
      } else {
        const force = typeof inputs[0] === "boolean" ? inputs[0] : undefined;
        force !== undefined
          ? this.ownerElement.classList.toggle(cls, force)
          : this.ownerElement.classList.toggle(cls);
      }
    };
  }
};


const focus = {
  reaction: NAME => function () {
    this.ownerElement.focus();
  }
};

const blur = {
  reaction: NAME => function () {
    this.ownerElement.blur();
  }
};

const style = {
  reaction: NAME => {
    const parts = NAME.split("_");
    const prop = parts[1];
    const staticVal = parts[2] ?? null;
    if (!prop)
      throw `style reaction missing property name, e.g. style_color or style_--my-var`;
    return function (...inputs) {
      const val = staticVal ?? String(inputs[0] ?? "");
      prop.startsWith("--")
        ? this.ownerElement.style.setProperty(prop, val)
        : (this.ownerElement.style[prop] = val);
    };
  }
};


const copy = {
  reaction: NAME => {
    const staticText = NAME.includes("_") ? NAME.slice(NAME.indexOf("_") + 1) : undefined;
    return async function (...inputs) {
      const content = staticText ?? (typeof inputs[0] === "string" ? inputs[0] : this.ownerElement.textContent);
      if (content && navigator.clipboard) {
        await navigator.clipboard.writeText(content);
      }
      return content;
    };
  }
};

export {
  prevent,
  log,
  toggle,
  text,
  html,
  wait,
  fetchPortal as fetch,
  value,
  val,
  classPortal as class,
  focus,
  blur,
  style,
  copy
};
