//normal dom events
const clickSymbol = Symbol('click');
class Click {
  on() {
    this[clickSymbol] = e => eventLoop.dispatch(this, e);
    this.ownerElement.addEventListener('click', this[clickSymbol]);
  }
  off() {
    this.ownerElement.removeEventListener('click', this[clickSymbol]);
    delete this[clickSymbol];
  }
  reaction() {
    this.ownerElement.click();
  }
}

const dblclickSymbol = Symbol('dblclick');
class DblClick {
  on() {
    this[dblclickSymbol] = e => eventLoop.dispatch(this, e);
    this.ownerElement.addEventListener('dblclick', this[dblclickSymbol]);
  }
  off() {
    this.ownerElement.removeEventListener('dblclick', this[dblclickSymbol]);
    delete this[dblclickSymbol];
  }
  reaction() {
    this.ownerElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  }
}

//observer
const resizeSymbol = Symbol('resize');
class Resize {
  on() {
    this[resizeSymbol] = new ResizeObserver(entries => {
      for (const entry of entries) {
        eventLoop.dispatch(this, entry);
      }
    });
    this[resizeSymbol].observe(this.ownerElement);
  }
  off() {
    this[resizeSymbol].disconnect();
    delete this[resizeSymbol];
  }
  reaction(block, inline) {
    // ResizeObserver doesn't have a way to trigger it manually, so we can only trigger it by changing the size of the element.
    const originalWidth = this.ownerElement.style.width;
    this.ownerElement.style.width = `${this.ownerElement.offsetWidth + 1}px`;
    this.ownerElement.style.width = originalWidth;
  }
}

//click:...