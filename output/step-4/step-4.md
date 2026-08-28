# Step 4 — DD Attribute Syntax (Pilot Subset)

Mechanical translation of every native HTML + vanilla JS demo in `output/step-3/step-3.html`
into DoubleDots (DD) attribute chains. Same 16-case scaffold, zero live `<script>` blocks
(originals are commented out), every portal/reaction name drawn from the current source
(`1_PortalMap.js`, `OnOffAttr.js`, `PortalDomEvents.js`, `PortalWindowDocumentEvents.js`,
`PortalObservers.js`, `PortalState.js`, `PortalReactions.js`). Cases whose native behavior has
no DD equivalent are marked inline with `<!-- GAP: … -->` and collected under **Known DD gaps** below.

## Conversion summary

| ID | Classification | DD chain (short) | Gaps? |
|----|----------------|-------------------|-------|
| 1.5 | single | `click:class_open_toggle` on wrapper | Yes — containment guard / outside-click portal |
| 1.8 | multi | btn `click:text_Loading…:toggle_disabled:state_loadmore`; list `state_loadmore:fetch_…:html` | Yes — append/iteration, dynamic URL, fetch-settled reset, flag compute |
| 1.18 | single | `click:copy_https://team.example.com/invite/abc123:text_Copied!:wait_2000:text_Copy invite link` | Yes (minor) — copy has no try/catch wrapper |
| 1.19 | single | `click:class_open_toggle` on section | No |
| 1.29 | single | `click:text_Processing…:toggle_disabled:fetch_https://example.com/api/orders:log` | Yes — URL options/POST, once-guard, success/failure feedback |
| 2.2 | single | `keydown:class_open_add` on wrapper | Yes — modifier-key filter, Escape-close/reopen, focus into input |
| 2.3 | single | `keydown:log` on composer | Yes — key/Shift filter + multi-mutation send pipeline |
| 3.1 | single | `input:wait_500:fetch_https://example.com/api/username-availability?u=:log` | Yes — debounce reset, value-composed URL, cross-element indicator writes |
| 3.3 | single | `blur:class_invalid_add` on field | Yes — regex validator/condition, error-class write to companion element, input re-clear |
| 3.20 | multi | checkbox `change:state_terms`; button `state_terms:toggle_disabled` | Yes — boolean-compute reaction (checked→disabled negation) |
| 5.13 | multi | composer `paste:fetch_https://example.com/api/link-preview:log` | Yes — clipboard-text read, URL validation, preview-area writes, custom-event payload handoff |
| 7.12 | single | `intersection:fetch_https://example.com/api/comments?thread=42:log` | Yes — rootMargin option,, once/disconnect guard,, render fetched list into body |
| 9.1 | single | `resize:class_narrow_toggle` | Yes — window/viewport resize portal, breakpoint condition,, initial apply |
| 9.12 | single | `resize:text_🔔` | Yes — width getter + threshold/conditional two-branch text swap |
| 10.1 | single | `scroll:log` | Yes — scroll-metric getters (scrollTop/scrollHeight/clientHeight) + arithmetic + proportional style write |
| 10.2 | multi | terms `scroll:log` (enable is a cross-element latch — unmappable) | Yes — end-of-scroll arithmetic condition,, one-way latch write onto separate button |

---

## Per-case DD breakdown

### 1.5 — single

**DD attribute(s):**
```html
<div id="demo-1-5" click:class_open_toggle>…</div>
```

**Reaction chain walkthrough:**
1. `click` fires on any bubbled click within the demo wrapper — the trigger element is the wrapper carrying the attribute.
2. `class_open_toggle` toggles the wrapper's own `open` class. Since a click on the open button is just a bubbled click, it also toggles — this is the approximation, not the doc-level outside-only close.

**Cross-element coordination (multi only):** n/a.



**Gaps:**
> No "click-outside-element" portal and no containment guard — `class_open_toggle` treats every click on the wrapper (open button,, drawer,, or backdrop( the same, whereas the native doc-level listener only closes when the click lands outside the open drawer and never touches the drawer's children. The `open` class lands on the wrapper by DD's owner-element rule,, so the CSS slides the inner drawer via the descendant rule `#demo-1-5.open .drawer`. A containment guard or an `outside` trigger would close this gap.

---

### 1.8 — multi

**DD attributes:**
```html
<button id="load-more-1-8" click:text_Loading…:toggle_disabled:state_loadmore>Load more</button>
<ul id="lots-1-8" state_loadmore:fetch_https://example.com/api/auction/lots:html>…</ul>
```

**Reaction chain walkthrough:**
1. `click` fires on the load-more button.
2. `text_Loading…` sets the button's own label to the loading state.
3. `toggle_disabled` flips the button's `disabled` attribute (batches repeat clicks during the fetch).
4. `state_loadmore` writes the fired event intothe `state_loadmore` state store (a state-store reaction, not a DOM mutation).
5. The lot list's `state_loadmore` portal fires on each store update → `fetch_…` GETs the auction endpoint → `html` replaces the list's innerHTML with the response body.



**Cross-element coordination (multi only):**
> The button writes to a shared state store; the separate list element watches that store via its own `state_loadmore` portal chain. The fetch replaces the list contents, since no reaction can append one `<li>` per item.



**Gaps:**
> (1) no append/iteration reaction — `html` replaces the entire list instead of appending one `<li>` per lot; (2) the fetch URL is static — the native `?after=<last-lot-id>` argument needs a computed value,, and no reaction can inject one; (3) no fetch-settled reset reaction — the button stays disabled and reads Loading… forever (native re-enables in `.then/.catch`); (4) the `state_` store holds the raw `ClickEvent` (no flag/boolean-compute reaction), so each click is a distinct update.

---

### 1.18 — single

**DD attribute(s):**
```html
<button id="copy-1-18" click:copy_https://team.example.com/invite/abc123:text_Copied!:wait_2000:text_Copy invite link>Copy invite link</button>
```

**Reaction chain walkthrough:**
1. `click` fires on the copy button.
2. `copy_https://team.example.com/invite/abc123` writes the invite URL to the clipboard (side effect).
3. `text_Copied!` sets the button's own label often confirmation.

4. `wait_2000` delays the chain.
5. `text_Copy invite link` restores the original label.



**Gaps:**
> (minor) `copy` writes without a try/catch wrapper — on an insecure context the native demo caught the error and still showed feedback; here the chain would end on the rejection.



---

### 1.19 — single

**DD attribute(s):**
```html
<section class="accordion open" id="acc-1-19" click:class_open_toggle>…</section>
```

**Reaction chain walkthrough:**
1. `click` bubbles up from the header button to the section (owner element of the attribute).
2. `class_open_toggle` flips the section's own `open` class; CSS hides/shows the body from the class alone — pure toggle, no condition needed.



**Gaps:** none . The native header listener and the DD chain perform the same single class flip on the section.



---

### 1.29 — single

**DD attribute(s):**
```html
<button id="pay-1-29" click:text_Processing…:toggle_disabled:fetch_https://example.com/api/orders:log>Pay $59.00</button>
```

**Reaction chain walkthrough:**
1. `click` fires on the payment button.
2. `text_Processing…` sets the button label (first-click visual).
3. `toggle_disabled` disables the button — approximates the native persistent `processed` once-guard (browser blocks further clicks at the element level).
4. `fetch_https://example.com/api/orders` GETs the orders endpoint (native was a POST with JSON body — see gaps).
5. `log` logs the response (no success/failure reaction exists to rewrite the label or the status line).



**Gaps:**
> (1) no URL-options reaction — the native POST (`method:'POST', body: JSON.stringify`) cannot be expressed,, only a no-arg GET `fetch_<url>` exists; (2) the once-guard is approximated by disabling the button on first click (native stayed enabled-looking but ignored further clicks; (3) no success/failure reaction rewrites the label or the status line.



---

### 2.2 — single

**DD attribute(s):**
```html
<div id="demo-2-2" tabindex="0" keydown:class_open_add>…</div>
```

**Reaction chain walkthrough:**
1. `keydown` fires on any key press inside the focused wrapper (the native listener was on `document`; DD's `keydown` portal is element-scoped and bubbles, so the attribute lives on this wrapping container — `tabindex="0"` keeps it focusable).
2. `class_open_add` adds the `open` class to the wrapper — ANY key adds it (no Ctrl/Meta+K filter, no Escape-close). The `open` class lands on the wrapper by DD's owner-element rule,, so the CSS reveals the palette via `#demo-2-2.open .palette`.



**Gaps:**
> No modifier-key filter (Ctrl/Meta+K only) and no Escape-close/reopen; no reaction can drive focus into the palette's own input (`focus` targets the owner element). `class_open_add` fires on any keydown — this is a partial that can never equal the native Ctrl+K global shortcut.



---

### 2.3 — single

**DD attribute(s):**
```html
<textarea id="composer-2-3" rows="2" placeholder="Type a message — Enter sends, Shift+Enter adds a newline" keydown:log>…</textarea>
```

**Reaction chain walkthrough:**
1. `keydown` fires on every keystroke in the composer.
2. `log` logs the event — nothing else can be scoped without breaking normal text entry (no key/modifier filter exists, so any Enter-scoped chain would also block plain typing).



**Gaps:**
> The native handler discriminates Enter(no-Shift) from everything else and prefixes a three-step send (preventDefault → append message to own log → clear value → POST). DD has no key/Shift filter reaction;; `log` is the only honest partial — the keydown vocabulary just cannot scope conditions without a condition reaction (e.g. a `key_is_` / `mods_` filter) or a value-aware send reaction.



---

### 3.1 — single

**DD attribute(s):**
```html
<input type="text" id="username-3-1" autocomplete="off" input:wait_500:fetch_https://example.com/api/username-availability?u=:log>
```

**Reaction chain walkthrough:**
1. `input` fires on every keystroke.
2. `wait_500` delays the chain by 500ms — a plain delay,, not a resetting debounce (see gaps).
3. `fetch_https://…username-availability?u=` GETs the availability endpoint with a static URL (no value interpolation).
4. `log` logs the response — the companion indicator span cannot be written from this chain (mutations land on the owner element only).



**Gaps:**
> (1) no debounce reaction exists — `wait_500` delays the chain but does not reset on repeated fires,, so the check runs 500ms after *every* keystroke instead of after the last one; (2) the native `${value}` can't be interpolated into the fetch URL — no value-composition reaction; (3) no reaction writes intothe companion indicator span and no conditional skip-empty/color logic exists — the check fires even on an empty field.



---

### 3.3 — single

**DD attribute(s):**
```html
<input type="text" id="email-3-3" placeholder="you@example.com" blur:class_invalid_add>
```

**Reaction chain walkthrough:**
1. `blur` fires when the email field loses focus.
2. `class_invalid_add` adds the `invalid` class to the field on *every* blur — even empty/valid ones (the native regex-validated first). The companion `.error` element cannot be shown (cross-element write unavailable).



**Gaps:**
> No conditional/validator reaction exists — DD cannot test the email format,, skip empty values,, or toggle the error state based on a regex. `class_invalid_add` marks the field invalid on every blur,, and there is no reaction that can write the `show` class ontothe companion `.error` element (mutations land on the owner element only). The `input` re-clear half of the native behavior is likewise unmappable (no remove-on-valid-input reaction).

---

### 3.20 — multi

**DD attributes:**
```html
<input type="checkbox" id="terms-3-20" change:state_terms>
<button id="submit-3-20" disabled state_terms:toggle_disabled>Submit application</button>
```

**Reaction chain walkthrough:**
1. `change` fires on the terms checkbox.
2. `state_terms` writes the fired event intothe `state_terms` state store (a state-store reaction, not a DOM mutation).
3. The submit button's `state_terms` portal fires on each store update → `toggle_disabled` flips its own `disabled` attribute.



**Cross-element coordination (multi only):**
> The checkbox writes to a shared state store and the separate submit button watches that store via its own `state_terms` portal chain — a one-directional store mirror between the two elements. The store holds the raw change event (no boolean-compute reaction), so the `disabled` flip direction is either-or depending on click cadence rather than a strict `!checked` mirror.



**Gaps:**
> No boolean-compute reaction — native reads `checkbox.checked` and writes `submit.disabled = !checked`; the state store can only propagate an event,, so a fresh checkbox change always counts as an update and the flipped direction is not a true state negation.



---

### 5.13 — multi

**DD attribute(s):**
```html
<input type="text" id="composer-5-13" placeholder="Message… paste a URL here" paste:fetch_https://example.com/api/link-preview:log>
```

**Reaction chain walkthrough:**
1. `paste` fires when the user pastes into the composer field.
2. `fetch_https://example.com/api/link-preview` GETs the preview endpoint (static URL , no pasted-text argument).
3. `log` logs the response — the preview area is a separate element and cannot be written from this chain (mutations land on the owner element only).



**Cross-element coordination (multi only):**
> There is effectively no DD handoff:the composer-to-preview custom event (`link-preview` with a `detail` payload) has no DD equivalent (default reaction names re-dispatch a *native* event type only, no payload), so the card never renders into the sibling preview area.



**Gaps:**
> (1) no clipboard-text reaction exposes `clipboardData.getData('text')`, so the pasted URL can't be read or tested against a URL regex; (2) no reaction can write the loading placeholder or the card intothe sibling preview area; (3) the native custom-event handoff has no DD equivalent (a payload-carrying custom-event reaction, or a portal call that passes values, would close this gap). The best partial is a static fetch that simply logs.



---

### 7.12 — single

**DD attribute(s):**
```html
<section id="comments-7-12" style="margin-top:1rem;background:#fff;border:1px solid #ccc;border-radius:4px;padding:.75rem;" intersection:fetch_https://example.com/api/comments?thread=42:log>
  <strong>Comments</strong>
  <div id="comments-body-7-12"><p style="color:#888;">Not loaded yet.</p></div>
</section>
```

**Reaction chain walkthrough:**
1. `intersection` fires when the section intersects the viewport (default rootMargin — the native `150px` "about to enter" window cannot be expressed).
2. `fetch_https://example.com/api/comments?thread=42` GETs the comments endpoint.

3. `log` logs the response — the fetched comment list cannot render intothe section body (mutations land on the owner element only, no map/append reaction). Every re-intersection re-runs the chain (no once/disconnect guard).



**Gaps:**
> (1) the intersection portal is hard-coded to the default rootMargin (none), so the native `rootMargin: '150px'` "about to enter" window cannot be expressed; (2) no once/disconnect guard — the native loaded exactly once via `observer.disconnect()`, here every re-intersection re-fetches; (3) no reaction renders the fetched comment list intothe comments body — `log` is the only honest tail for the fetch. A `rootMargin` option portal (e.g. `intersection_150px`) or a once-latch reaction, would close (1)(2).

---

### 9.1 — single

**DD attribute(s):**
```html
<div class="grid" id="grid-9-1" resize:class_narrow_toggle>
  <div class="cell">Chart A</div>
  <div class="cell">Chart B</div>
  <div class="cell">Chart C</div>
</div>
```

**Reaction chain walkthrough:**
1. `resize` fires when the grid's own box size changes (ResizeObserver portal — triggered by a window resize since the grid tracks the page width).
2. `class_narrow_toggle` flips its own `narrow` class on *every* size change — no 700px threshold read,, no initial apply (native ran the same check once on load).



**Gaps:**
> (1) there is no viewport/window resize portal (the window-only portal list has no `resize`; here the element `resize` (ResizeObserver) portal is used,, which fires when the grid's own box changes size — legitimately triggered by a window resize since the grid tracks the page width;; (2) the breakpoint threshold (`window.innerWidth < 700`) and the once-on-load initial apply have no DD equivalent — `class_narrow_toggle` flips on *every* size change with no condition,, so it can flap during a continuous drag. A viewport-width getter + comparison reaction (or a `matchMedia`-style portal) would close this gap.





---

### 9.12 — single

**DD attribute(s):**
```html
<span class="badge" id="badge-9-12" resize:text_🔔>Notifications</span>
```

**Reaction chain walkthrough:**
1. `resize` fires whenever the badge's content-box width changes (ResizeObserver on the badge itself).
2. `text_🔔` swaps the label to the icon on the first resize (any size) — it never restores the full label, since there is no width getter/compare nor a two-branch conditional.



**Gaps:**
> The native behavior compares `entry.contentRect.width` against `110px` and conditionally swaps the label back and forth. DD has no width getter/compare reaction and no two-branch conditional — `resize:text_🔔` swaps to the icon on the first resize (any size)and never restores the full label. A `resize` reaction seeded with a threshold + condition (or a style/text comparator) would close this gap.



---

### 10.1 — single

**DD attribute(s):**
```html
<div class="article" id="article-10-1" scroll:log>
  <p><strong>The Long Article.</strong> Scroll inside this box and watch the bar fill.</p>
  …
</div>
```

**Reaction chain walkthrough:**
1. `scroll` fires on the article container (the actual scrolling element — `scroll` is a non-bubbling event, so the attribute must live there).
2. `log` logs each scroll event — the proportional `style.width` write ontothe progress bar cannot be expressed (no scroll-metric getters, no arithmetic).



**Gaps:**
> Reading depth is `scrollTop / (scrollHeight - clientHeight)` — a ratio of three scroll metrics. DD has no scroll-metric getter reactions and no arithmetic/comparison reaction,, so the proportional `style.width` write cannot be expressed. `scroll:log` is the only honest partial — the bar (width 0) stays empty. A getter trio (scrollTop,, scrollHeight,, clientHeight) plus a divide/percent reaction,, or a dedicated `progress` readout reaction,, would close this gap.



---

### 10.2 — multi

**DD attribute(s):**
```html
<div class="terms" id="terms-10-2" scroll:log>
  …
</div>
<button id="accept-10-2" disabled>Accept terms</button>
```

**Reaction chain walkthrough:**
1. `scroll` fires on the terms box (the actual scrolling element).
2. `log` logs each scroll event — the end-of-scroll test and the cross-element enable cannot be expressed (see gaps).



**Cross-element coordination (multi only):**
> The native scroll handler holds a direct reference to the separate accept button and flips its `disabled` property once the end condition holds — a one-way latch write across the two elements. DD has no way to target a second element from this chain (mutations land on the owner element only), so the button attributes stay as-is and the coordination is effectively lost; `scroll:log` is the only honest partial.



**Gaps:**
> (1) "reached the end" is the arithmetic condition `scrollTop + clientHeight >= scrollHeight - 2` — no scroll-metric getter reactions and no comparison reaction exist,, so the condition cannot be expressed; (2) the enable is a one-way latch write ontothe separate accept button (cross-element),and no reaction can target or re-enable another element from this chain. The only honest partial preserves the trigger — `scroll:log` (every scroll logs the scroll event).

---

## Known DD gaps

| Gap | Affected cases | What's missing | Suggested reaction/portal signature (sketch) |
|------|--------------|------------------|----------------------------------------|
| Outside-click / containment guard | 1.5 | A trigger that only fires on clicks outside a given element (the inverse of a containment test); today the chain ignores the "don't close when clicking drawer/buttons" guard | `outside` portal (e.g. `outside` on the drawer) or a `contains`/`not-contains` gate reaction |
| Modifier-key / key-value filter | 2.2,, 2.3 | A reaction that filters keydown events by `e.key` and modifier flags (`ctrlKey`, `shiftKey`, `metaKey`) before subsequent reactions run; prevents the approximated all-keys firing | `key_is_<key>` / `mods_<mods>` gate reaction returning a boolean or cancel/continue |
| Debounce with reset | 3.1 | A reaction that delays a chain and cancels any pending delay on each new trigger (true debounce, not `wait_500`'s fixed delay) | `debounce_<ms>` reaction (cancel pending chain on retrigger) |
| Value-composed URL / interpolation | 1.8,, 3.1,, 5.13 | A reaction that builds a string from piped values (e.g. `${value}`, `?after=<last-id>``, `?url=<pasted-text>``) so fetch targets are dynamic, plus a way to read another element's value | `url_<template>` / `template_<fmt>` reaction feeding a following `fetch`; a `val_<id>` cross-element getter to seed it |
| Keyboard/scroll/element-metric getters + arithmetic | 7.12,, 9.1,, 9.12,, 10.1,, 10.2 | Getter reactions for `contentRect.width`, `scrollTop`, `scrollHeight`, `clientHeight`, `window.innerWidth` and a compare/percent/divide reaction so thresholds and labels can be computed (e.g. progress fill, badge swap,, grid reflow,, bottom-of-terms latch) | `width` / `scrollTop` / `scrollHeight` / `clientHeight` / `vw` getter reactions + `lt_<n>` / `percent` conditional reactions |
| No once / one-shot latch | 7.12,, 1.29 | A reaction that fires only the first time a portal fires (then silently no-ops or disconnects the observer), replacing the disabled-button approximation and the native observer.disconnect() once-guard | `once` guard reaction (sets a latched flag on the owner element;; subsequent fires cancel the chain) / a `disconnect` reaction on observer portals |
| Fetch request options (method/body/headers) |1.29 | An options form for the `fetch` reaction so POST-ness, JSON body, and auth headers are expressible (today only `GET`,` fetch_<url>`) | `fetch` options suffix (e.g. `fetch_<url>__post`) or a `fetch_json` variant |
| Fetch-settled feedback |1.8,, 1.29 | A reaction that runs only when a piped promise resolves/rejects (rewriting a label, re-enabling a button, or showing a failure line) | `then`/ `catch_<reaction>` reactions chained after `fetch` |
| Cross-element DOM writes / append-to-other |1.8,, 3.3,, 5.13,, 7.12,, 10.2 | A reaction that can mutate a different element than the owner (append a node, write innerHTML/text, or toggle a class/attr elsewhere) or run a chain on another portal | `ref_<id>` / `to_<id>` target prefix so any reaction lands on a named element; oa `portal_<id>_<chain>` call reaction |
| Append / iteration / map reaction |1.8,, 7.12 | A reaction that appends one child node per piped datum (e.g. one `<li>` per lot, one comment row per comment), closing the innerHTML-replace fallback | `append_<tag>` / `each_<tpl>` reaction (state-store or fetch payload in, DOM nodes out) |
| Boolean-compute / state negation |1.8,, 3.20 | A reaction that converts a piped event/value into a boolean (e.g. `el.checked`) or negates it,, so state-store consumers can mirror state exactly (e.g. `disabled = !checked`) | `flag_<prop>` getter-cum-negation reaction feeding a `state_` store or a `toggle_<attr>` consumer |
| Clipboard text payload |5..13 | A reaction that reads `clipboardData.getData('text')` from a paste event and pipes the text into the chain (for URL validation + dynamic fetch) | `clipboard` getter reaction (paste portal in, text out) |
| Payload-carrying custom events |5..13 | A reaction that dispatches a custom event with a payload (detail) that another element's portal can consume — the native `CustomEvent('link-preview', { detail })` handoff | `emit_<name>` reaction (payload in,, custom-event out,) + matching named portal |
| Error-tolerance / try-catch wrapper |1.18 | A reaction that catches a thrown promise rejection and continues the chain (insecure-context clipboard write, dead endpoints) | `safe` / `catch` guard reaction before/after fallible reactions |
| URL regex / format validator |3.3,, 5.13 | A conditional reaction that tests a piped string against a pattern (email format, `^https?://`) and only continues when the test passes — closing the every-blur and un-gated-paste approximations | `if_match_<pattern>` / `matches_<pattern>` gate reaction |
| Viewport/window resize portal |9..1 | A portal exposing `window.addEventListener('resize')` with a `window.innerWidth`-style readout (distinct from the element-level ResizeObserver `resize` portal) | `viewportResize` / `windowResize` portal (window event in,, viewport-size state out) |