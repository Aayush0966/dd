# Step 1 Prompt — Generate English Use Cases (category-driven, full coverage)


## Repo access


You have access to the GitHub repo for this pipeline. Write your output as a file inside:


```
output/step-1/step-1.md
```




---


## Context


You are working on a data pipeline for **DoubleDots (DD)**, a declarative HTML attribute framework. In DD, a custom HTML attribute names a **trigger** — a DOM event, an observer (mutation/resize/intersection), a viewport/navigation change, or an internal state-store change — and chains one or more **reactions** that fire when that trigger happens. You don't need the exact attribute syntax for this step — that comes later. Right now we only care about **what real-world interactions and behaviors** this kind of framework needs to support.


**Do not invent or reference specific DD trigger names or syntax in your output.** Write everything in plain English, as a person describing a UI behavior would.


---


## Your job


For each category below, generate as many realistic use cases as you can actually justify — plain English sentences, roughly 10–30 words each. A use case should describe:
- what interaction or condition starts it (a click, a key combo, an element becoming visible, a value changing, etc.)
- what should happen as a result, and on which element (the same element, or — occasionally — a different one)


**We want real, concrete use cases — not generic textbook ones.** Don't just write "an element changes when clicked." Think about actual products and actual UI patterns you know of, and ground each use case in something that would genuinely ship, not a made-up minimal example.


**Think across a wide range of real-world domains, not just the obvious ones.** It's easy to default to generic e-commerce, dashboards, and basic SaaS forms — don't stop there. Deliberately pull use cases from across domains like:


- Healthcare / patient portals (appointment scheduling, vitals dashboards, intake forms)
- Banking / fintech (checkout, but also trading interfaces, budgeting apps, fraud alerts)
- Gaming / interactive entertainment (inventory grids, leaderboards, in-game HUDs)
- Education / e-learning (course progress, quiz interfaces, video lecture players)
- Travel & hospitality (flight search, seat maps, booking calendars)
- Real estate (property listings, map/list toggles, mortgage tools)
- Social media & messaging (feeds, reactions, typing indicators, stories/ephemeral content)
- Developer tools (IDEs, terminals, diff viewers, CI/CD dashboards)
- Enterprise / admin & internal tools (permission tables, audit logs, bulk actions)
- IoT / smart home dashboards (device status, live sensor readouts)
- Accessibility-specific tooling (screen-reader-only announcements, focus traps, reduced-motion toggles)
- Government / civic tech (multi-step public forms, document verification flows)
- Music / streaming platforms, e-commerce beyond generic carts (marketplaces, auctions), spreadsheets/productivity tools, design/creative tools


Every category should show this domain spread — not just one or two industries repeated everywhere.


**Do not cap yourself and do not pad.** There's no target count — go as deep as real use cases actually exist for a category, and stop when you'd genuinely be repeating yourself, not when you hit a round number. Categories will NOT have equal depth — some genuinely have far more real-world surface area than others, and your output should reflect that unevenness. **Click & pointer interactions, Keyboard interaction, Form & input, State store reactivity, Visibility & intersection, and Attribute & DOM mutation** should all end up noticeably longer than something like Fullscreen, which realistically runs out of distinct real cases fast. If every category lands in a similar tight range (e.g. 5–9 each), that's a sign you stopped early out of habit rather than because the category was actually exhausted — go back and push further on the categories that clearly have more depth before finalizing.


Push for **variety within each category**, not just the obvious cases. Categories are deliberately broad — don't wait for us to name the exact trigger. If a category makes you think of a less-common variant (e.g. a click that's specifically *outside* an element, or a click that's global/document-level, or a key combo with a modifier), include it. That kind of variant-finding is the actual point of this step.


---


## Categories


1. **Click & pointer interactions** — clicks, double-clicks, right-click/context menu, pointer/touch events, and variants like "outside click" (closing a dropdown/modal) or a document-wide/global click listener.
2. **Keyboard interaction** — key presses, key combos with modifiers (ctrl/shift/alt + key), specific keys like Escape/Enter/Tab/arrows, and where the listener needs to be (element-scoped vs. document-scoped).
3. **Form & input** — typing, value changes, validation state, submit, reset, focus/blur on form fields.
4. **Media playback** — play, pause, volume change, time/progress updates, buffering, end of playback.
5. **Drag & drop / clipboard** — dragging elements, drop targets, copy/cut/paste behavior.
6. **Focus & selection** — focus entering/leaving an element, text selection changes, selection within a specific region.
7. **Visibility & intersection** — an element entering/leaving the viewport or another element's bounds (lazy loading, infinite scroll, animate-on-scroll, impression tracking, scroll-spy navigation, viewability tracking, sticky/pinning behavior). Note explicitly when the trigger element and the element that reacts are different (e.g. a list item near the bottom becoming visible causes the *list container* to load more items).
8. **Attribute & DOM mutation** — watching an element's attribute, class, or content change and reacting to that change (on itself or elsewhere), including things like `aria-*` state mirroring, data-attribute-driven theming, and mutation-observer-driven UI sync.
9. **Resize & viewport** — an element or the window/viewport changing size, orientation changing.
10. **Scroll** — scroll position changes, scroll snapping, reaching the end of a scrollable area.
11. **Animation & transition** — CSS animation/transition start, iteration, end, or cancellation.
12. **Navigation & history** — URL/route changes, browser back/forward, page show/hide.
13. **Window/document lifecycle** — page finished loading, visibility of the tab changing, going online/offline.
14. **Fullscreen** — entering/exiting fullscreen for an element or the document.
15. **State store reactivity** — a piece of app state changing (e.g. a cart count, an "open" flag) and something on the page reacting to that change.
16. **Element connect** — something that should happen once, right when an element is first inserted into the page.


---


## Also look outside the framework


Think about how other frontend frameworks and libraries (React, Svelte, Alpine.js, Angular) handle custom attribute-based or directive-based interactivity. If you know of an established pattern they support that isn't obviously covered by the categories above, describe it as an English use case anyway, and note in one short parenthetical which framework/pattern inspired it.


**Do not put these in a separate category.** Fold each one into whichever of the 16 categories above it actually belongs to — a debounced search input is a Form & input case, an event-listener cleanup-on-destroy is an Element connect case, and so on. There should be no 17th "other frameworks" section in the output; the `(seen in: <framework>)` tag is how these stay identifiable within their real category.


---


## Cross-element cases


Most reactions should affect the same element that triggered them. When a use case genuinely needs the reaction to happen on a **different** element, that's fine — but call it out explicitly with `(cross-element)` rather than leaving it implicit, so it's easy to find these later. Keep cross-element cases a minority of the total — if you find yourself writing many of them for one category, double check they're not just single-element cases described awkwardly.


---


## Output rules


1. Plain English sentences only — no DDT syntax, no colons, no code.
2. Roughly 10–30 words per use case.
3. Group output under `# N. Category Name` headers matching the 16 categories above, in order.
4. No fixed count per category — depth over hitting a number, and no padding with near-duplicates.
5. No duplicate or near-duplicate use cases within a category.
6. Every use case should be traceable to a real, concrete product pattern — not a generic placeholder — and should reflect a spread of real-world domains, not just e-commerce/dashboards/SaaS.
7. Where a use case is cross-element, end the sentence with `(cross-element)`.
8. Where a use case is inspired by looking at another framework, end the sentence with `(seen in: <framework>)`.


---


Output file: `output/step-1/step-1.md` 