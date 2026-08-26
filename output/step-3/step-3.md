# Step 3 — Native HTML/JS Prototypes (Pilot Subset)

This pilot takes 16 representative use cases from Step 2 and implements each as a
self-contained native HTML + vanilla JS demo (see `step-3.html`). No DD syntax is
used anywhere in this step — the goal is a concrete, working reference that Step 4
can translate mechanically into DD attribute chains.

## Selected use cases

| ID | Category | Classification | Use case (short) | Selected via | Selection reason |
|----|----------|----------------|------------------|--------------|-------------------|
| 1.5 | Click & pointer interactions | single | Click outside cart drawer closes it | Pass B | Toggle/show-hide pattern (hide on outside click) |
| 1.8 | Click & pointer interactions | multi | Load more appends auction lots | Pass B, Pass C | Async fetch + append to a separate list element; counts toward multi minimum |
| 1.18 | Click & pointer interactions | single | Copy invite link button | Pass A | Most common click + transient feedback pattern |
| 1.19 | Click & pointer interactions | single | Accordion header collapses open section | Pass A, Pass B | Clearest toggle/show-hide example; also a Pass A category pick |
| 1.29 | Click & pointer interactions | single | Payment button ignores repeat clicks | Pass A | Click-guard / idempotency pattern (state flag on the trigger element) |
| 2.2 | Keyboard interaction | single | Ctrl+K opens command palette | Pass B | Toggle/show-hide via a global key trigger + self-focus |
| 2.3 | Keyboard interaction | single | Enter sends, Shift+Enter inserts newline in chat composer | Pass A | Modifier-key discrimination on an element-scoped keydown; second keyboard pick |
| 3.1 | Form & input | single | Username availability check after a pause | Pass A, Pass B | `input` trigger + debounce + async check; also covers the async pattern |
| 3.3 | Form & input | single | Email validated on blur with inline error | Pass A | `blur`/`input` triggers + inline validation feedback |
| 3.20 | Form & input | multi | Terms checkbox enables submit button | Pass A, Pass C | Checkbox `change` → separate button's `disabled`; counts toward multi minimum |
| 5.13 | Drag & drop / clipboard | multi | Pasted URL fetches a link preview card | Pass B, Pass C | Paste → fetch → card attached below the draft (cross-element) |
| 7.12 | Visibility & intersection | single | Comments load as section nears viewport | Pass B | IntersectionObserver trigger + background fetch into self |
| 9.1 | Resize & viewport | single | Chart grid reflows below tablet width | Pass A | Window `resize` trigger + own layout class mutation |
| 9.12 | Resize & viewport | single | Badge swaps label for icon when narrow | Pass A | Element-level resize (ResizeObserver) mutating only itself |
| 10.1 | Scroll | single | Reading progress bar fills with depth | Pass A | Scroll trigger + proportional local mutation |
| 10.2 | Scroll | multi | Scrolling to end of terms enables accept button | Pass A, Pass C | Scroll trigger mutating a separate button; counts toward multi minimum |

**Totals:** 16 use cases — 12 `single`, 4 `multi` (1.8, 3.20, 5.13, 10.2). The
Pass C minimum of 2 multi-element cases is already satisfied by the Pass A/B
picks, so no extra top-up was needed. No category exceeds 5 picks (Click &
pointer has the most, at 5), and every Pass A category has at least 2 picks.

---

## Per-case breakdown

### 1.5 — single

**Use case:** A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it.

**Behavioral breakdown (native):**
1. `click` on the open button -> `classList.add('open')` on the drawer (slides in via CSS transform).
2. `click` on the document -> if the drawer is open and the click landed neither inside the drawer nor on the open button, `classList.remove('open')` on the drawer.

**Key native constructs used:**
- `document.addEventListener('click', ...)` (global listener, mutation lands on the drawer only)
- `element.classList.add/remove('open')`
- `Node.contains(...)` containment check
- CSS `transform` + `transition` for the slide

**Grounding note for Step 4:**
> The native version makes clear that the drawer never loses its children — closing is purely a class flip on the drawer itself, and the document-level listener is scoped by a containment check, not by targeting other elements.

---

### 1.8 — multi

**Use case:** A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.

**Behavioral breakdown (native):**
1. `click` on the load-more button -> button disables itself and its label changes to a loading state (self-mutation).
2. `fetch('https://example.com/api/auction/lots?after=…')` resolves -> one new `<li>` per returned lot is appended to the **separate** watchlist `<ul>` (cross-element mutation).
3. Fetch settles (`.then`/`.catch`) -> button re-enables itself and restores its label.

**Key native constructs used:**
- `addEventListener('click', ...)` on `<button>`
- `button.disabled = true/false` and `button.textContent = ...` (loading-state boolean)
- `fetch('https://example.com/api/auction/lots?after=…')` with `.then(res => res.json())` and a `.catch()` so a dead endpoint never throws unhandled
- `document.createElement('li')` + `list.appendChild(...)` on a different element

**Cross-element coordination (multi only):**
> The button's click handler holds a direct reference to the list element (`getElementById('lots-1-8')`) and appends into it after the async fetch resolves — the handler owns both the local loading state and the remote mutation, sequenced inside one callback.

**Grounding note for Step 4:**
> The native version makes clear that the loading flag lives on the button while the append lands on the list, and that the fetch must resolve before the append — three distinct phases that prose alone blurs into one sentence.

---

### 1.18 — single

**Use case:** A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.

**Behavioral breakdown (native):**
1. `click` on the button -> `navigator.clipboard.writeText(...)` copies the invite URL.
2. Immediately -> `button.textContent = 'Copied!'` (self-mutation).
3. `setTimeout(..., 2000)` -> the label reverts to the original text (self-mutation, timed).

**Key native constructs used:**
- `addEventListener('click', ...)` on `<button>`
- `navigator.clipboard.writeText(...)` (with a `catch` so the demo never throws on insecure contexts)
- `element.textContent = ...`
- `setTimeout(..., 2000)` for the revert

**Grounding note for Step 4:**
> The native version makes clear that the confirmation is a timed, self-contained label swap on the trigger element — the clipboard write is a side effect, not a DOM mutation, so the whole visible chain is `click -> set text -> wait 2000ms -> restore text`.

---

### 1.19 — single

**Use case:** A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.

**Behavioral breakdown (native):**
1. `click` on the section header -> `classList.toggle('open')` on the accordion section (self-mutation).
2. CSS shows/hides the body purely from the presence of the `open` class.

**Key native constructs used:**
- `addEventListener('click', ...)` on the header `<button>`
- `element.classList.toggle('open')`
- CSS descendant selector (`.accordion.open .acc-body`) doing the show/hide

**Grounding note for Step 4:**
> The native version makes clear that open/closed is a single boolean class on the section — there is no separate "is it open?" check in JS, so the DD chain is a pure `toggle_class`, not a conditional add/remove.

---

### 1.29 — single

**Use case:** A payment button processes the first click and ignores all further clicks so an order is never submitted twice.

**Behavioral breakdown (native):**
1. `click` on the button -> a `processed` boolean guard returns early on any repeat click.
2. First click -> button label becomes `Processing…` and a real `fetch('https://example.com/api/orders', { method: 'POST', … })` submits the order.
3. Submit resolves -> label becomes `Order submitted ✓` and a status line updates; on rejection a `.catch()` writes a failure note instead.

**Key native constructs used:**
- `addEventListener('click', ...)` on `<button>`
- A closure-scoped boolean flag (`let processed = false`) as the idempotency guard
- `element.textContent = ...`
- `fetch(..., { method: 'POST', body: JSON.stringify(...) })` with `.then()` / `.catch()`

**Grounding note for Step 4:**
> The native version makes clear that the "ignore further clicks" behavior is a persistent state flag on the element itself, not a one-off `disabled` flip — the guard must survive across clicks, which maps to element state rather than a simple attribute toggle.

---

### 2.2 — single

**Use case:** A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused.

**Behavioral breakdown (native):**
1. `keydown` on the document -> if `Ctrl`/`Cmd` + `K`, `preventDefault()`, add the `open` class to the palette, and call `focus()` on its own search input.
2. `keydown` -> `Escape` removes the `open` class, hiding the palette.

**Key native constructs used:**
- `document.addEventListener('keydown', ...)` (global key trigger)
- `e.ctrlKey || e.metaKey` modifier check + `e.preventDefault()`
- `element.classList.add/remove('open')`
- `input.focus()` on the palette's own field

**Grounding note for Step 4:**
> The native version makes clear that the trigger is global (`keydown` at document scope with a modifier guard) while every mutation — reveal and focus — lands inside the palette element itself, which is exactly why Step 2 classified it `single` despite the `(cross-element)`-looking trigger.

---

### 2.3 — single

**Use case:** Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.

**Behavioral breakdown (native):**
1. `keydown` on the composer textarea -> if the key is not `Enter`, or `Shift` is held, do nothing and let the browser insert a plain newline.
2. Plain `Enter` -> `preventDefault()` (suppress the newline), read and trim the composer's own value, bail out if empty.
3. -> append the message as a new `<p>` inside the composer's own message log, clear the textarea, and fire a real `fetch('https://example.com/api/messages', { method: 'POST', … })` to send it (optimistic append; a `.catch()` swallows the dead-endpoint failure).

**Key native constructs used:**
- `addEventListener('keydown', ...)` on `<textarea>` (element-scoped key trigger, not document-level)
- `e.key === 'Enter'` + `e.shiftKey` modifier discrimination
- `e.preventDefault()` to suppress the default newline
- `fetch(..., { method: 'POST', body: JSON.stringify(...) })` with `.catch()`
- `document.createElement('p')` + `log.appendChild(...)` + `composer.value = ''` — all inside the composer widget itself

**Grounding note for Step 4:**
> The native version makes clear that "send" vs "newline" is a single `keydown` trigger gated on one modifier boolean, and that the send path is three ordered mutations on the composer widget (append to own log, clear own value, POST) — the optimistic append happens before the network call resolves, which prose never states.

---

### 3.1 — single

**Use case:** As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field.

**Behavioral breakdown (native):**
1. `input` on the field -> cancel the pending timer; if the value is empty, clear the indicator; otherwise show a `checking…` state.
2. `setTimeout(..., 500)` (debounce) fires after typing pauses -> a real `fetch('https://example.com/api/username-availability?u=…')` runs. (The timer is the debounce gate, not a stand-in for the network call.)
3. Lookup resolves -> the indicator span shows `✓ available` or `✗ taken` (from `data.available`) and gets a matching color class; a `.catch()` covers the dead-endpoint case.

**Key native constructs used:**
- `addEventListener('input', ...)` on `<input>`
- `clearTimeout` / `setTimeout` debounce (a `wait_500`-style gate before the request)
- `fetch('https://example.com/api/username-availability?u=…')` with `.then(res => res.json())` / `.catch()`
- `element.textContent = ...` + `element.className = ...` on the field's own indicator

**Grounding note for Step 4:**
> The native version makes clear there are three indicator states (empty / checking / verdict), that the debounce timer must be cancelled on every keystroke, and that the "fetch" happens strictly after the pause — sequencing that prose only implies with "after each short pause".

---

### 3.3 — single

**Use case:** When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.

**Behavioral breakdown (native):**
1. `blur` on the email field -> regex-validate the trimmed value; if invalid (and non-empty), show the inline error and add an `invalid` class to the field.
2. `input` on the field -> as soon as the value becomes valid, hide the error and remove the class (error clears itself once valid input arrives).

**Key native constructs used:**
- `addEventListener('blur', ...)` and `addEventListener('input', ...)` on the same `<input>`
- Regex format check
- `classList.toggle('show', bool)` on the error node / `classList.toggle('invalid', bool)` on the field

**Grounding note for Step 4:**
> The native version makes clear that validation fires on `blur` but recovery fires on `input` — two different triggers feeding the same two class mutations — and that an empty field is deliberately not flagged on blur.

---

### 3.20 — multi

**Use case:** Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately.

**Behavioral breakdown (native):**
1. `change` on the terms checkbox -> read `checkbox.checked`.
2. -> write `submit.disabled = !checkbox.checked` on the **separate** submit button (cross-element mutation).

**Key native constructs used:**
- `addEventListener('change', ...)` on `<input type="checkbox">`
- `checkbox.checked` as the `val`-style getter
- `button.disabled = ...` written onto a different element

**Cross-element coordination (multi only):**
> The checkbox handler holds a direct reference to the submit button and mirrors the checkbox state onto the button's `disabled` property on every change — a one-directional state mirror between two elements.

**Grounding note for Step 4:**
> The native version makes clear the value flows from a property read (`checked`) on the trigger element to a property write (`disabled`) on the target, and that the relationship must stay in sync on every change, not just the first.

---

### 5.13 — multi

**Use case:** When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft.

**Behavioral breakdown (native):**
1. `paste` on the composer input -> read the clipboard text; bail out unless it matches `^https?://`.
2. -> the preview area (a **separate** element below the composer) shows a `Fetching link preview…` placeholder.
3. `fetch('https://example.com/api/link-preview?url=…')` resolves -> the composer dispatches a bubbling `CustomEvent('link-preview', { detail })` carrying the fetched title/description.
4. The demo container listens for `link-preview` and renders the preview card into the preview area; a `.catch()` writes a failure note into the preview area instead.

**Key native constructs used:**
- `addEventListener('paste', ...)` + `e.clipboardData.getData('text')`
- URL shape check with a regex
- `fetch('https://example.com/api/link-preview?url=…')` with `.then(res => res.json())` / `.catch()`
- `dispatchEvent(new CustomEvent(..., { bubbles: true, detail }))` and a listener on the shared ancestor
- `innerHTML` render into the preview area

**Cross-element coordination (multi only):**
> The composer and the preview area never touch each other directly: the composer dispatches a bubbling custom event carrying the fetched payload, and the shared container element listens for it and writes the card into the preview area — a producer/consumer handoff through a custom event.

**Grounding note for Step 4:**
> The native version makes clear that the paste trigger, the fetch, and the card render are three separate links, and that the composer-to-preview handoff is an event with a payload — exactly the shape DD's cross-element portal call will need to express.

---

### 7.12 — single

**Use case:** When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.

**Behavioral breakdown (native):**
1. `IntersectionObserver` (with `rootMargin: 150px`) fires when the comments section is *about* to enter the viewport -> observer disconnects (load exactly once).
2. -> the section's body shows a `Loading comments…` placeholder.
3. `fetch('https://example.com/api/comments?thread=42')` resolves -> the comment list renders into the section itself; a `.catch()` writes a failure note instead.

**Key native constructs used:**
- `new IntersectionObserver(callback, { rootMargin })` + `observer.observe(section)` / `observer.disconnect()`
- `fetch('https://example.com/api/comments?thread=…')` with `.then(res => res.json())` / `.catch()`
- `innerHTML` render into the section's own body

**Grounding note for Step 4:**
> The native version makes clear that "about to enter" is a `rootMargin` on the observer (not scroll math), and that `disconnect()` encodes the load-exactly-once semantics that prose leaves implicit.

---

### 9.1 — single

**Use case:** When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.

**Behavioral breakdown (native):**
1. `resize` on the window -> compare `window.innerWidth` against the 700px breakpoint.
2. -> `classList.toggle('narrow', ...)` on the grid, which switches its own `grid-template-columns` from 3 to 1.
3. The check also runs once on load so the initial layout matches the viewport.

**Key native constructs used:**
- `window.addEventListener('resize', ...)` (global trigger)
- `window.innerWidth < 700` threshold read
- `element.classList.toggle('narrow', condition)` on the grid itself

**Grounding note for Step 4:**
> The native version makes clear that the trigger is global but the only mutation is a conditional class toggle on the grid, and that the same evaluation must run once at startup — an initial-apply step that prose never mentions.

---

### 9.12 — single

**Use case:** A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out.

**Behavioral breakdown (native):**
1. `ResizeObserver` on the badge fires whenever its own width changes (the badge fills a user-resizable box).
2. -> if `contentRect.width < 110`, `badge.textContent = '🔔'`; otherwise restore the full `Notifications` label.

**Key native constructs used:**
- `new ResizeObserver(...).observe(badge)` (element-level resize trigger, not window resize)
- `entry.contentRect.width` read of the element's own box
- `element.textContent = ...` conditional swap
- CSS `width: 100%` on the badge so its width tracks the resizable container (avoids feedback loops)

**Grounding note for Step 4:**
> The native version makes clear this is an element-size trigger (ResizeObserver), not a viewport trigger — the badge must measure itself, and the threshold is a single numeric comparison driving a text swap on the same element.

---

### 10.1 — single

**Use case:** As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth.

**Behavioral breakdown (native):**
1. `scroll` on the article container -> compute `scrollTop / (scrollHeight - clientHeight)`.
2. -> set `bar.style.width = pct + '%'` on the progress bar (self-mutation within the same reader widget).

**Key native constructs used:**
- `addEventListener('scroll', ...)` on the scroll container
- `scrollTop`, `scrollHeight`, `clientHeight` metrics read
- `element.style.width = ...` proportional write

**Grounding note for Step 4:**
> The native version makes clear that reading depth is a computed ratio of three scroll metrics (not a raw scroll position), and that the bar width is a continuous mapping from that ratio — a getter-to-style pipeline, not a threshold toggle.

---

### 10.2 — multi

**Use case:** When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled.

**Behavioral breakdown (native):**
1. `scroll` on the terms box -> test `scrollTop + clientHeight >= scrollHeight - 2` (bottom reached).
2. -> set `accept.disabled = false` on the **separate** accept button (cross-element mutation, one-way latch).

**Key native constructs used:**
- `addEventListener('scroll', ...)` on the scrollable terms `<div>`
- Bottom-of-scroll arithmetic with a small epsilon
- `button.disabled = false` written onto a different element

**Cross-element coordination (multi only):**
> The scroll handler on the terms box holds a direct reference to the accept button and flips its `disabled` property once the end condition holds — a one-way, latch-style write (never re-disabled) across the two elements.

**Grounding note for Step 4:**
> The native version makes clear that "scrolls to the end" is an arithmetic condition with a tolerance, not an event the browser gives you, and that the enable is a one-way latch — the button never becomes disabled again on scroll-up.

---

## Known trigger-vocabulary gaps

> Selected use cases whose native trigger doesn't map cleanly onto a DD portal listed in the Step 3→4 trigger table, so Step 4 isn't surprised by them:

- **2.2 (Ctrl+K palette)** — the listener is `document.addEventListener('keydown', …)`. DD's `keydown` portal is element-scoped (it attaches to the element carrying the attribute), and `keydown` is not among the document/window-only portals. Step 4 will likely need to place the attribute on a top-level container and rely on event bubbling, or treat this as a global-trigger special case.
- **1.5 (outside-click drawer)** — same shape: a `document`-level `click` listener with a containment check. There is no "click outside this element" portal; Step 4 must encode the negative-containment guard explicitly.
- **9.1 (window resize reflow)** — the trigger is `window.addEventListener('resize', …)`. The DD `resize` portal is `ResizeObserver`-based (element size), and `resize` does not appear in the window-only event portal list — viewport resize has no clean portal. (9.12, by contrast, is a true element-size trigger and maps directly onto the resize/ResizeObserver portal.)
- **7.12 (comments near viewport)** — `IntersectionObserver` maps onto the intersection portal, but two details may not be expressible: the `rootMargin: '150px'` option ("about to enter", not "is intersecting") and the `disconnect()` after first fire (load-exactly-once semantics).
- **10.1 / 10.2 (scroll)** — `scroll` is a non-bubbling event, so the attribute must live on the actual scrolling element; that works for these two demos (the article box / terms box scroll themselves), but any future pick phrased as "the page scrolls" (window scroll) has the same gap as window `resize`.
