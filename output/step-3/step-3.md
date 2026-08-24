# Step 3 — Convert use cases to DD reaction chains

Every use case from `output/step-2/step-2.md` is converted in three phases: (1) a behavioral breakdown preserving the full meaning of the English, (2) DD attribute chains — one chain for `single` cases, one chain per element with explicit `→ [handoff: …]` markers for `multi` cases, (3) verification that every breakdown action maps to a segment or a handoff. Triggers use only the portals defined in the framework source (`PortalDomEvents.js`, `PortalWindowDocumentEvents.js`, `PortalObservers.js`, `PortalState.js`); built-in reactions use the exact names from `PortalReactions.js`; anything else is a camelCase custom reaction. Coordination between elements (the `???` trigger on downstream elements) is deliberately deferred to Step 3.5.

# 1. Click & pointer interactions

### 1.1 — single

**Use case:** A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.

**Behavioral breakdown:**
1. User clicks the row → toggle the `open` attribute on the row itself
2. When `open` is set → the row's own inline detail area (merchant details, payment reference) becomes visible; when cleared it hides again

**Element A (transaction row):** `<tr>`
```html
<tr click:toggle_open>…</tr>
```
**Chain breakdown:**
- `click` — trigger: click event on the row (action #1)
- `toggle_open` — toggles the `open` attribute on the row, showing/hiding its own detail area (actions #1–2)

### 1.2 — single

**Use case:** A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted.

**Behavioral breakdown:**
1. User double-clicks the cell → switch the cell into edit mode, rendering an inline editor with the current value (on the cell)
2. After entering edit mode → highlight (select) the current value inside the cell's editor (on the cell)

**Element A (cell):** `<td>`
```html
<td dblclick:enterEditMode:selectCurrentValue>…</td>
```
**Chain breakdown:**
- `dblclick` — trigger: double-click on the cell (action #1)
- `enterEditMode` — custom: swaps the cell's display for an inline editor holding its current value (action #1)
- `selectCurrentValue` — custom: selects the value text inside the cell's editor (action #2)

### 1.3 — multi

**Use case:** A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions.

**Behavioral breakdown:**
1. User right-clicks the file row → prevent the browser's native context menu (on the row)
2. The right-click yields pointer coordinates and the file's available actions → this data must reach the context menu element → **handoff to Element B**
3. The context menu receives the position and actions → opens at the pointer showing rename, share, delete (on the menu)

**Element A (file row):** `<tr>`
```html
<tr contextmenu:prevent:getFileMenuData>…</tr>
```
**Chain breakdown:**
- `contextmenu` — trigger: right-click on the row (action #1)
- `prevent` — suppresses the native context menu (action #1)
- `getFileMenuData` — custom: collects pointer coordinates plus the file's action set (action #2)

→ [handoff: Element A's action #2 (pointer coordinates + file actions) must reach Element B to trigger action #3]

**Element B (context menu):** `<div class="context-menu">`
```html
<div class="context-menu" ???:openAtPointer>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the menu data
- `openAtPointer` — custom: positions the menu at the pointer coordinates and renders rename/share/delete items (action #3)

### 1.4 — multi

**Use case:** A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it.

**Behavioral breakdown:**
1. A click lands anywhere in the document → determine whether it fell outside the menu; if so, close the menu (on the menu)
2. After closing → keyboard focus must move back to the avatar button, a different element → **handoff to Element B**
3. The avatar button receives the signal → takes focus (on the avatar button)

**Element A (profile menu):** `<div class="profile-menu">`
```html
<div class="profile-menu" click:closeIfOutsideClick>…</div>
```
**Chain breakdown:**
- `click` — trigger: click event (trigger approximation: needs a document-level listener so clicks outside the menu are seen) (action #1)
- `closeIfOutsideClick` — custom: checks the click target is outside the menu, then closes it (action #1)

→ [handoff: Element A's action #1 (menu-closed signal) must reach Element B to trigger action #3]

**Element B (avatar button):** `<button class="avatar">`
```html
<button class="avatar" ???:focus>…</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A reports it closed
- `focus` — moves keyboard focus onto the avatar button (action #3)

### 1.5 — single

**Use case:** A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it.

**Behavioral breakdown:**
1. A click lands anywhere in the document → determine whether it fell outside the drawer (on the drawer)
2. If outside → slide the drawer closed, keeping its item state intact (on the drawer itself)

**Element A (cart drawer):** `<aside class="cart-drawer">`
```html
<aside class="cart-drawer" click:closeIfOutsideClick>…</aside>
```
**Chain breakdown:**
- `click` — trigger: click event (trigger approximation: document-level listener so outside clicks are seen) (action #1)
- `closeIfOutsideClick` — custom: closes the drawer when the click lands outside it; the drawer's contents are untouched (actions #1–2)

### 1.6 — single

**Use case:** A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together.

**Behavioral breakdown:**
1. User touches the conversation row and holds → detect that the press exceeded the long-press threshold (on the row)
2. On long press → add the `multi-select` class to the row, entering multi-select mode (on the row itself)

**Element A (conversation row):** `<li class="conversation">`
```html
<li class="conversation" touchstart:detectLongPress:class_multi-select_add>…</li>
```
**Chain breakdown:**
- `touchstart` — trigger: touch begins on the row (action #1)
- `detectLongPress` — custom: returns true only if the touch is still held after the threshold (action #1)
- `class_multi-select_add` — adds the `multi-select` class to the row, switching it into multi-select mode (action #2)

### 1.7 — single

**Use case:** A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection.

**Behavioral breakdown:**
1. User clicks the heart on the card → toggle the `filled` class on the heart (on the heart element)
2. On toggle → save the listing to the buyer's favorites collection (data side effect; no other DOM element mutates)

**Element A (heart button):** `<button class="heart">`
```html
<button class="heart" click:class_filled_toggle:saveToFavorites>♡</button>
```
**Chain breakdown:**
- `click` — trigger: click on the heart (action #1)
- `class_filled_toggle` — toggles the `filled` class on the heart itself (action #1)
- `saveToFavorites` — custom: writes the listing to the favorites collection store/server (action #2)

### 1.8 — multi

**Use case:** A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.

**Behavioral breakdown:**
1. User clicks the load-more button → request the next batch of lots with current bids (fetch initiated by the button)
2. The fetched batch must be rendered into the watchlist, a different element → **handoff to Element B**
3. The watchlist receives the batch → appends the new lot rows showing current bids (on the watchlist)

**Element A (load more button):** `<button class="load-more">`
```html
<button class="load-more" click:fetchNextLotBatch>Load more</button>
```
**Chain breakdown:**
- `click` — trigger: click on the button (action #1)
- `fetchNextLotBatch` — custom: fetches the next page of lots with their current bids (action #1)

→ [handoff: Element A's action #1 output (next lot batch data) must reach Element B to trigger action #3]

**Element B (watchlist):** `<ul class="watchlist">`
```html
<ul class="watchlist" ???:appendLots>…</ul>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the batch arrives from Element A
- `appendLots` — custom: renders and appends the new lot rows with current bids (action #3)

### 1.9 — single

**Use case:** A single click on a track in a music queue selects it, while a double click starts playing it immediately.

**Behavioral breakdown:**
1. User single-clicks the track → add the `selected` class to the track (on the track)
2. User double-clicks the track → start playback of this track (on the track's own playback state)

**Element A (track row):** `<li class="track">`
```html
<li class="track" click:class_selected_add dblclick:playTrack>…</li>
```
**Chain breakdown:**
- `click` — trigger: single click on the track (action #1)
- `class_selected_add` — adds the `selected` class to the track itself (action #1)
- `dblclick` — trigger: double click on the track (action #2)
- `playTrack` — custom: starts playback of this track (action #2)

### 1.10 — multi

**Use case:** A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element)

**Behavioral breakdown:**
1. User clicks a thumbnail → read the thumbnail's full-size photo URL and caption (on the thumbnail)
2. The photo URL and caption must reach the main photo viewer, a different element → **handoff to Element B**
3. The viewer receives the data → swaps the main photo and updates its caption text (on the viewer)

**Element A (thumbnail):** `<img class="thumbnail">`
```html
<img class="thumbnail" click:getPhotoData>…</img>
```
**Chain breakdown:**
- `click` — trigger: click on the thumbnail (action #1)
- `getPhotoData` — custom: reads the full-size URL and caption from the thumbnail's data attributes (action #1)

→ [handoff: Element A's action #1 output (photo URL + caption) must reach Element B to trigger action #3]

**Element B (main photo viewer):** `<figure class="main-photo">`
```html
<figure class="main-photo" ???:swapMainPhoto>…</figure>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off photo data
- `swapMainPhoto` — custom: swaps the main image source and rewrites the caption (action #3)

### 1.11 — multi

**Use case:** A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element)

**Behavioral breakdown:**
1. A click lands anywhere → determine whether the target is the bare canvas (on the canvas element)
2. If the canvas was clicked → a close signal must reach every open floating panel → **handoff to Element B (each open panel)**
3. Each open panel receives the signal → removes its `open` class and closes (on each panel)

**Element A (canvas):** `<div class="canvas">`
```html
<div class="canvas" click:closePanelsIfBareCanvas>…</div>
```
**Chain breakdown:**
- `click` — trigger: click on the canvas (action #1)
- `closePanelsIfBareCanvas` — custom: returns a close signal only when the click hit the bare canvas, not a panel or object (actions #1–2)

→ [handoff: Element A's action #2 (close signal) must reach every open floating panel to trigger action #3]

**Element B (floating panel):** `<div class="floating-panel">`
```html
<div class="floating-panel" ???:class_open_remove>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A broadcasts the close signal
- `class_open_remove` — removes the `open` class from the panel, closing it (action #3)

### 1.12 — multi

**Use case:** A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element)

**Behavioral breakdown:**
1. User taps the map pin → read the pin's property data (name, nightly price, rating) and its map position (on the pin)
2. The property data must reach the popup card, a different element → **handoff to Element B**
3. The card receives the data → pops up at the pin showing name, price, and rating (on the card)

**Element A (map pin):** `<div class="map-pin">`
```html
<div class="map-pin" click:getPropertyData>…</div>
```
**Chain breakdown:**
- `click` — trigger: tap/click on the pin (action #1)
- `getPropertyData` — custom: reads name, nightly price, rating, and anchor position from the pin (action #1)

→ [handoff: Element A's action #1 output (property data + position) must reach Element B to trigger action #3]

**Element B (property card):** `<div class="property-card">`
```html
<div class="property-card" ???:showPropertyCard>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off property data
- `showPropertyCard` — custom: renders name/price/rating and pops the card up at the pin (action #3)

### 1.13 — multi

**Use case:** A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element)

**Behavioral breakdown:**
1. User right-clicks the message → prevent the native context menu and compute the anchor point above the message bubble (on the message)
2. The anchor position must reach the reaction-emoji row, a different element → **handoff to Element B**
3. The emoji row receives the position → appears anchored just above the bubble (on the emoji row)

**Element A (chat message):** `<div class="message">`
```html
<div class="message" contextmenu:prevent:getAnchorPosition>…</div>
```
**Chain breakdown:**
- `contextmenu` — trigger: right-click on the message (action #1)
- `prevent` — suppresses the native context menu (action #1)
- `getAnchorPosition` — custom: computes the anchor rectangle above the message bubble (action #1)

→ [handoff: Element A's action #1 output (anchor position + target message id) must reach Element B to trigger action #3]

**Element B (emoji row):** `<div class="reaction-row">`
```html
<div class="reaction-row" ???:showReactionPicker>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the anchor position
- `showReactionPicker` — custom: positions and reveals the emoji row above the bubble (action #3)

### 1.14 — single

**Use case:** A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls.

**Behavioral breakdown:**
1. User quick-taps the tile → toggle the `on` attribute on the tile (on the tile)
2. User long-presses the tile → expand the tile into its brightness and color controls (on the tile itself)

**Element A (light tile):** `<div class="light-tile">`
```html
<div class="light-tile" click:toggle_on touchstart:detectLongPress:class_expanded_toggle>…</div>
```
**Chain breakdown:**
- `click` — trigger: quick tap on the tile (action #1)
- `toggle_on` — toggles the `on` attribute on the tile, flipping the light state (action #1)
- `touchstart` — trigger: touch begins on the tile (action #2)
- `detectLongPress` — custom: returns true only when the press passes the long-press threshold (action #2)
- `class_expanded_toggle` — expands the tile to reveal its own brightness/color controls (action #2)

### 1.15 — multi

**Use case:** An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction.

**Behavioral breakdown:**
1. User clicks the column header → compute the next sort direction for this column (on the header)
2. Show the sort-direction arrow on the header itself (on the header)
3. The column id and direction must reach the table body so its rows re-sort → **handoff to Element B**
4. The table body receives the sort spec → re-orders its row elements accordingly (on the table body)

**Element A (column header):** `<th>`
```html
<th click:nextSortDirection:updateSortArrow>…</th>
```
**Chain breakdown:**
- `click` — trigger: click on the header (action #1)
- `nextSortDirection` — custom: cycles ascending/descending and returns the column id plus direction (action #1)
- `updateSortArrow` — custom: renders the direction arrow on the header (action #2)

→ [handoff: Element A's action #1 output (column id + direction) must reach Element B to trigger action #4]

**Element B (table body):** `<tbody>`
```html
<tbody ???:sortRows>…</tbody>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the sort spec
- `sortRows` — custom: re-orders the table body's own rows by the given column and direction (action #4)

### 1.16 — multi

**Use case:** A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element)

**Behavioral breakdown:**
1. User clicks a seat element → toggle the `selected` class on the seat (on the seat element)
2. After selecting → read the seat's price data (on the seat element)
3. The seat's price data needs to reach the booking summary panel → **handoff to Element B**
4. The summary panel receives the seat price → renders the price into its display (on the summary panel)

**Element A (seat):** `<div class="seat">`
```html
<div class="seat" click:class_selected_toggle:getSeatPrice>…</div>
```
**Chain breakdown:**
- `click` — trigger (action #1)
- `class_selected_toggle` — toggles `selected` class on the seat (action #1)
- `getSeatPrice` — custom: reads the seat's price from its data attributes (action #2)

→ [handoff: Element A's action #2 output (seat price data) must reach Element B to trigger action #4]

**Element B (summary panel):** `<div class="booking-summary">`
```html
<div class="booking-summary" ???:renderSeatPrice>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when it receives the seat price data from Element A
- `renderSeatPrice` — custom: renders the selected seat's price into the summary panel (action #4)

### 1.17 — multi

**Use case:** A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood.

**Behavioral breakdown:**
1. User double-clicks a node → compute the bounding box of the node's neighborhood (on the node)
2. The neighborhood bounds must reach the canvas viewport, a different element → **handoff to Element B**
3. The canvas receives the bounds → animates a smooth zoom into that neighborhood (on the canvas)

**Element A (node):** `<g class="node">`
```html
<g class="node" dblclick:getNeighborhoodBounds>…</g>
```
**Chain breakdown:**
- `dblclick` — trigger: double-click on the node (action #1)
- `getNeighborhoodBounds` — custom: computes the bounding region of the node's immediate neighbors (action #1)

→ [handoff: Element A's action #1 output (neighborhood bounds) must reach Element B to trigger action #3]

**Element B (canvas viewport):** `<div class="topology-canvas">`
```html
<div class="topology-canvas" ???:zoomToNeighborhood>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the bounds
- `zoomToNeighborhood` — custom: smoothly zooms the canvas viewport to the given bounds (action #3)

### 1.18 — single

**Use case:** A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.

**Behavioral breakdown:**
1. User clicks the button → copies the button's textContent (the invite link) to the clipboard
2. After copying → set the button's text to "copied" (on the button itself)
3. After 2 seconds → set the button's text back to "copy" (on the button itself)

**Element A (button):** `<button>`
```html
<button click:copy:text_copied:wait_2000:text_copy>Copy invite link</button>
```
**Chain breakdown:**
- `click` — trigger: listens for the click event (action #1)
- `copy` — copies the element's textContent to clipboard (action #1)
- `text_copied` — sets the button text to "copied" (action #2)
- `wait_2000` — waits 2 seconds (action #3)
- `text_copy` — sets the button text back to "copy" (action #3)

### 1.19 — single

**Use case:** A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.

**Behavioral breakdown:**
1. User clicks the section header → the click bubbles up to the accordion section element (on the section)
2. The section receives the click → toggles its `open` attribute off, collapsing its own content (on the section)

**Element A (accordion section):** `<section class="accordion-section">`
```html
<section class="accordion-section" click:toggle_open>…</section>
```
**Chain breakdown:**
- `click` — trigger: the header's click bubbles to the section carrying this attribute (action #1)
- `toggle_open` — toggles the `open` attribute on the section, collapsing/expanding its own content (action #2)

### 1.20 — single

**Use case:** A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves.

**Behavioral breakdown:**
1. User clicks zoom on the photo viewer → enable the magnifier lens on the viewer (on the viewer)
2. Pointer moves over the image → reposition the lens to follow the pointer (on the viewer's own lens)
3. Pointer leaves the image → disable/remove the lens (on the viewer)

**Element A (photo viewer):** `<div class="photo-viewer">`
```html
<div class="photo-viewer" click:toggleMagnifier mousemove:positionLens mouseleave:stopMagnifier>…</div>
```
**Chain breakdown:**
- `click` — trigger: click on the viewer's zoom control (action #1)
- `toggleMagnifier` — custom: enables the viewer's own magnifier lens (action #1)
- `mousemove` — trigger: pointer movement over the viewer (action #2)
- `positionLens` — custom: moves the lens to track the pointer position (action #2)
- `mouseleave` — trigger: pointer leaves the viewer (action #3)
- `stopMagnifier` — custom: disables the lens (action #3)

### 1.21 — multi

**Use case:** A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises. (cross-element)

**Behavioral breakdown:**
1. User double-taps the photo → play the large heart burst animation on the photo's own overlay (on the photo)
2. The like must also be registered so the like count can rise → the like event must reach the like counter element → **handoff to Element B**
3. The like counter receives the event → increments its displayed count (on the counter)

**Element A (photo):** `<div class="feed-photo">`
```html
<div class="feed-photo" dblclick:burstHeart:registerLike>…</div>
```
**Chain breakdown:**
- `dblclick` — trigger: double tap on the photo (action #1)
- `burstHeart` — custom: plays the heart-burst animation on the photo's own overlay (action #1)
- `registerLike` — custom: records the like for this photo (action #2)

→ [handoff: Element A's action #2 (like event for this photo) must reach Element B to trigger action #3]

**Element B (like counter):** `<span class="like-count">`
```html
<span class="like-count" ???:incrementLikeCount>…</span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A registers the like
- `incrementLikeCount` — custom: increments and re-renders the counter's own number (action #3)

### 1.22 — multi

**Use case:** A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history.

**Behavioral breakdown:**
1. User right-clicks the diff line → prevent the native menu and read the line's link and history reference plus pointer position (on the line)
2. That line data must reach the context menu, a different element → **handoff to Element B**
3. The menu receives the data → opens offering "copy line link" and "view history" (on the menu)

**Element A (diff line):** `<div class="diff-line">`
```html
<div class="diff-line" contextmenu:prevent:getLineInfo>…</div>
```
**Chain breakdown:**
- `contextmenu` — trigger: right-click on the line (action #1)
- `prevent` — suppresses the native context menu (action #1)
- `getLineInfo` — custom: reads the line's permalink, history reference, and pointer coordinates (action #1)

→ [handoff: Element A's action #1 output (line link + history ref + position) must reach Element B to trigger action #3]

**Element B (context menu):** `<div class="diff-menu">`
```html
<div class="diff-menu" ???:showLineActions>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the line info
- `showLineActions` — custom: opens the menu with copy-link and view-history actions (action #3)

### 1.23 — multi

**Use case:** A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange.

**Behavioral breakdown:**
1. User clicks the upvote arrow → add the `voted` class so the arrow turns orange (on the arrow)
2. Cast the vote and compute the answer's new score (data operation initiated by the arrow)
3. The new score must reach the score element beside the arrow → **handoff to Element B**
4. The score element receives the value → renders the incremented score (on the score element)

**Element A (upvote arrow):** `<button class="upvote">`
```html
<button class="upvote" click:class_voted_add:castVote>▲</button>
```
**Chain breakdown:**
- `click` — trigger: click on the arrow (action #1)
- `class_voted_add` — adds the `voted` class, turning the arrow orange (action #1)
- `castVote` — custom: submits the vote and returns the answer's new score (action #2)

→ [handoff: Element A's action #2 output (new score) must reach Element B to trigger action #4]

**Element B (score):** `<span class="score">`
```html
<span class="score" ???:text>…</span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the new score
- `text` — writes the incoming score into the score element's own textContent (action #4)

### 1.24 — single

**Use case:** A middle click on a terminal tab in a developer tool closes that session along with its running process.

**Behavioral breakdown:**
1. User middle-clicks the tab → close this tab (on the tab itself)
2. On close → terminate the session's running process (non-DOM side effect belonging to the tab)

**Element A (terminal tab):** `<div class="terminal-tab">`
```html
<div class="terminal-tab" auxclick:closeSession>…</div>
```
**Chain breakdown:**
- `auxclick` — trigger: middle click on the tab (action #1)
- `closeSession` — custom: removes the tab and terminates its running process (actions #1–2)

### 1.25 — single

**Use case:** A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.

**Behavioral breakdown:**
1. User clicks the banner → toggle the `open` attribute on the banner (on the banner itself)
2. When open → the banner's own explanation (flagged transaction and reason) becomes visible

**Element A (fraud alert banner):** `<div class="fraud-banner">`
```html
<div class="fraud-banner" click:toggle_open>…</div>
```
**Chain breakdown:**
- `click` — trigger: click on the banner (action #1)
- `toggle_open` — toggles `open` on the banner, revealing its own explanation (actions #1–2)

### 1.26 — single

**Use case:** A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct.

**Behavioral breakdown:**
1. User taps the answer option → add the `selected` class to the option (on the option)
2. After marking → reveal on the option whether the choice was correct (on the option itself)

**Element A (answer option):** `<li class="answer-option">`
```html
<li class="answer-option" click:class_selected_add:revealCorrectness>…</li>
```
**Chain breakdown:**
- `click` — trigger: tap on the option (action #1)
- `class_selected_add` — marks the option selected (action #1)
- `revealCorrectness` — custom: shows the correct/incorrect indication on the option (action #2)

### 1.27 — multi

**Use case:** A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element)

**Behavioral breakdown:**
1. User clicks the date cell → add the `selected` class (selected ring) to the cell (on the cell)
2. Read the clicked date from the cell (on the cell)
3. The date value must reach the check-in field, a different element → **handoff to Element B**
4. The check-in field receives the date → fills in its value (on the check-in field)

**Element A (date cell):** `<td class="date-cell">`
```html
<td class="date-cell" click:class_selected_add:getSelectedDate>…</td>
```
**Chain breakdown:**
- `click` — trigger: click on the cell (action #1)
- `class_selected_add` — adds the selected ring to the cell (action #1)
- `getSelectedDate` — custom: reads the cell's date (action #2)

→ [handoff: Element A's action #2 output (selected date) must reach Element B to trigger action #4]

**Element B (check-in field):** `<input class="check-in">`
```html
<input class="check-in" ???:value>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the date
- `value` — writes the incoming date into the field's own value (action #4)

### 1.28 — single

**Use case:** A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element)

**Behavioral breakdown:**
1. A click lands on the dimmed backdrop → call preventDefault (on the backdrop)
2. The same click must be stopped from propagating so nothing else can interpret it as a close command — no element is mutated beyond absorbing the event (on the backdrop itself)

**Element A (modal backdrop):** `<div class="modal-backdrop">`
```html
<div class="modal-backdrop" click:prevent:swallowClick></div>
```
**Chain breakdown:**
- `click` — trigger: click landing on the backdrop (action #1)
- `prevent` — calls preventDefault on the event (action #1)
- `swallowClick` — custom: stops propagation so the click can never trigger an accidental close (action #2)

### 1.29 — single

**Use case:** A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue)

**Behavioral breakdown:**
1. User clicks the payment button → submit the order exactly once (side effect initiated by the button)
2. Immediately after the first click → set the `disabled` attribute on the button so every further click is ignored (on the button itself)

**Element A (payment button):** `<button class="pay">`
```html
<button class="pay" click:submitOrder:attr_disabled_true>Pay now</button>
```
**Chain breakdown:**
- `click` — trigger: the first click on the button (action #1)
- `submitOrder` — custom: submits the order exactly once (action #1)
- `attr_disabled_true` — sets `disabled` on the button, making all subsequent clicks inert (action #2)

# 2. Keyboard interaction

### 2.1 — multi

**Use case:** A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it.

**Behavioral breakdown:**
1. User presses Escape while focus is inside the modal → close the modal (on the modal)
2. After closing → keyboard focus must return to the button that opened the modal, a different element → **handoff to Element B**
3. The opener button receives the signal → takes focus (on the button)

**Element A (modal):** `<div class="modal" role="dialog">`
```html
<div class="modal" role="dialog" keydown:matchKey_Escape:closeModal>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key event inside the modal (action #1)
- `matchKey_Escape` — custom: passes through only when the pressed key is Escape (action #1)
- `closeModal` — custom: closes the modal itself (action #1)

→ [handoff: Element A's action #1 (modal-closed signal) must reach Element B to trigger action #3]

**Element B (opener button):** `<button class="open-modal">`
```html
<button class="open-modal" ???:focus>…</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A closes
- `focus` — moves keyboard focus onto the opener button (action #3)

### 2.2 — single

**Use case:** A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element)

**Behavioral breakdown:**
1. User presses Ctrl+K anywhere → detect the hotkey and prevent the browser default (global trigger, chain lives on the palette)
2. Open the command palette (on the palette itself)
3. Move focus into the palette's own search field (on the palette's own field)

**Element A (command palette):** `<div class="command-palette">`
```html
<div class="command-palette" keydown:matchKey_ctrl_k:prevent:toggle_open:focusSearchField>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key event (trigger approximation: needs a document-level listener to fire anywhere on the site) (action #1)
- `matchKey_ctrl_k` — custom: passes through only for Ctrl+K (action #1)
- `prevent` — stops the browser's default Ctrl+K behavior (action #1)
- `toggle_open` — opens the palette itself (action #2)
- `focusSearchField` — custom: focuses the palette's own search input (action #3)

### 2.3 — single

**Use case:** Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.

**Behavioral breakdown:**
1. User presses Enter in the composer → inspect the Shift modifier (on the composer)
2. Without Shift → send the message and clear the composer's draft (on the composer)
3. With Shift → insert a plain newline into the composer's own content (on the composer)

**Element A (chat composer):** `<textarea class="composer">`
```html
<textarea class="composer" keydown:handleEnterKey>…</textarea>
```
**Chain breakdown:**
- `keydown` — trigger: key press in the composer (action #1)
- `handleEnterKey` — custom: on Enter prevents default and sends the message (action #2); on Shift+Enter inserts a newline into the composer's own value (action #3)

### 2.4 — single

**Use case:** A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse.

**Behavioral breakdown:**
1. User presses the down arrow while the list is open → prevent the cursor from moving in the input (on the autocomplete)
2. Move the highlight to the next suggestion within the autocomplete's own list (on the autocomplete)

**Element A (autocomplete):** `<div class="autocomplete">`
```html
<div class="autocomplete" keydown:matchKey_ArrowDown:prevent:highlightNextSuggestion>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press within the autocomplete (action #1)
- `matchKey_ArrowDown` — custom: passes through only for ArrowDown (action #1)
- `prevent` — stops the caret from moving (action #1)
- `highlightNextSuggestion` — custom: moves the highlight among the autocomplete's own suggestion items (action #2)

### 2.5 — single

**Use case:** Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back.

**Behavioral breakdown:**
1. User presses Tab or Shift+Tab in the grid → prevent the browser's default focus move (on the grid)
2. Move the grid's own active-cell highlight one column right, or one left with Shift (on the grid)

**Element A (spreadsheet grid):** `<table class="sheet">`
```html
<table class="sheet" keydown:matchKey_Tab:prevent:moveActiveCell>…</table>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the grid (action #1)
- `matchKey_Tab` — custom: passes through only for Tab (action #1)
- `prevent` — stops default Tab focus traversal (action #1)
- `moveActiveCell` — custom: shifts the grid's own active cell right, or left when Shift is held (action #2)

### 2.6 — multi

**Use case:** A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element)

**Behavioral breakdown:**
1. User presses J or K → determine direction and find the target unread article (on the feed container)
2. The target article is a different element from the container → **handoff to Element B**
3. The target article receives the signal → scrolls itself into view and takes the `current` highlight (on the article)

**Element A (feed container):** `<main class="feed">`
```html
<main class="feed" keydown:matchKey_jk:findTargetArticle>…</main>
```
**Chain breakdown:**
- `keydown` — trigger: key press (trigger approximation: document-level listener so J/K work wherever focus is) (action #1)
- `matchKey_jk` — custom: passes through only for J (next) or K (previous), returning the direction (action #1)
- `findTargetArticle` — custom: resolves the next/previous unread article from the direction (action #1)

→ [handoff: Element A's action #1 output (target article identity) must reach Element B to trigger action #3]

**Element B (article):** `<article>`
```html
<article ???:scrollIntoViewAndMarkCurrent>…</article>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A identifies this article as the target
- `scrollIntoViewAndMarkCurrent` — custom: scrolls the article into view and adds its own `current` class (action #3)

### 2.7 — single

**Use case:** A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element)

**Behavioral breakdown:**
1. User presses `/` anywhere on the page → detect the key and prevent it typing elsewhere (global trigger, chain lives on the search box)
2. Move focus into the file search box itself (on the search box)

**Element A (file search box):** `<input class="file-search">`
```html
<input class="file-search" keydown:matchKey_slash:prevent:focus>
```
**Chain breakdown:**
- `keydown` — trigger: key press (trigger approximation: document-level listener so `/` works anywhere on the page) (action #1)
- `matchKey_slash` — custom: passes through only for the slash key (action #1)
- `prevent` — keeps the slash character out of any focused field (action #1)
- `focus` — focuses the search box itself (action #2)

### 2.8 — single

**Use case:** Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time.

**Behavioral breakdown:**
1. User holds Shift and presses an arrow key → detect the Shift+arrow combination (on the editor)
2. Extend the editor's own selection by one character or one line in the arrow direction (on the editor)

**Element A (rich text editor):** `<div class="editor" contenteditable>`
```html
<div class="editor" contenteditable keydown:matchKey_shift_arrows:extendSelection>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the editor (action #1)
- `matchKey_shift_arrows` — custom: passes through only for Shift+Arrow keys, returning the direction (action #1)
- `extendSelection` — custom: grows the editor's own selection by one character/line in that direction (action #2)

### 2.9 — single

**Use case:** A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse.

**Behavioral breakdown:**
1. User presses Ctrl+Enter inside the reply form → detect the hotkey (on the reply form)
2. Submit the reply form itself (on the form)

**Element A (reply form):** `<form class="ticket-reply">`
```html
<form class="ticket-reply" keydown:matchKey_ctrl_enter:submit>…</form>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the form (action #1)
- `matchKey_ctrl_enter` — custom: passes through only for Ctrl+Enter (action #1)
- `submit` — submits the form itself (requestSubmit) (action #2)

### 2.10 — single

**Use case:** Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column.

**Behavioral breakdown:**
1. User presses Escape while a drag is in progress → cancel the active drag operation (on the card being dragged)
2. The card snaps itself back to its original column position (on the card itself)

**Element A (kanban card):** `<div class="card" draggable>`
```html
<div class="card" draggable keydown:matchKey_Escape:cancelDragAndSnapBack>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press during the drag (action #1)
- `matchKey_Escape` — custom: passes through only for Escape (action #1)
- `cancelDragAndSnapBack` — custom: aborts the drag and animates the card back to its own origin column (actions #1–2)

### 2.11 — single

**Use case:** A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it.

**Behavioral breakdown:**
1. User presses Ctrl+Z → pop the canvas's own undo stack and restore the prior state (on the canvas)
2. User presses Ctrl+Shift+Z → pop the canvas's own redo stack and restore the next state (on the canvas)

**Element A (design canvas):** `<div class="canvas">`
```html
<div class="canvas" keydown:matchKey_ctrl_z:undoLastAction keydown:matchKey_ctrl_shift_z:redoLastAction>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press on the canvas (actions #1–2)
- `matchKey_ctrl_z` — custom: passes through only for Ctrl+Z (action #1)
- `undoLastAction` — custom: restores the canvas's own previous state (action #1)
- `matchKey_ctrl_shift_z` — custom: passes through only for Ctrl+Shift+Z (action #2)
- `redoLastAction` — custom: restores the canvas's own reverted state (action #2)

### 2.12 — single

**Use case:** Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last.

**Behavioral breakdown:**
1. User presses an arrow key, Home, or End while the carousel is focused → resolve the target slide (on the carousel)
2. Move the carousel's own track to the previous/next/first/last slide (on the carousel)

**Element A (carousel):** `<div class="carousel">`
```html
<div class="carousel" keydown:matchKey_arrows_home_end:goToSlide>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press on the carousel (action #1)
- `matchKey_arrows_home_end` — custom: passes through for ArrowLeft/ArrowRight/Home/End, returning the target (action #1)
- `goToSlide` — custom: shifts the carousel's own track to the resolved slide (action #2)

### 2.13 — single

**Use case:** A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause.

**Behavioral breakdown:**
1. User presses Space while the video is focused → prevent the page from scrolling (on the video)
2. Toggle the video's own playback between play and pause (on the video)

**Element A (video):** `<video>`
```html
<video keydown:matchKey_space:prevent:togglePlayback>…</video>
```
**Chain breakdown:**
- `keydown` — trigger: key press while the video has focus (action #1)
- `matchKey_space` — custom: passes through only for Space (action #1)
- `prevent` — stops default Space scrolling (action #1)
- `togglePlayback` — custom: toggles the video's own play/pause state (action #2)

### 2.14 — single

**Use case:** A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element)

**Behavioral breakdown:**
1. User presses `?` anywhere on the dashboard → detect the key (global trigger, chain lives on the overlay)
2. Open the cheat-sheet overlay itself (on the overlay)

**Element A (cheat sheet overlay):** `<div class="shortcut-overlay">`
```html
<div class="shortcut-overlay" keydown:matchKey_question:toggle_open>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press (trigger approximation: document-level listener so `?` works anywhere) (action #1)
- `matchKey_question` — custom: passes through only for the question-mark key (action #1)
- `toggle_open` — opens/closes the overlay itself (action #2)

### 2.15 — single

**Use case:** A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening.

**Behavioral breakdown:**
1. User presses Ctrl+S inside the application form → prevent the browser's save dialog (on the form)
2. Save the form's own current state as a local draft (on the form)

**Element A (permit form):** `<form class="permit-application">`
```html
<form class="permit-application" keydown:matchKey_ctrl_s:prevent:saveLocalDraft>…</form>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the form (action #1)
- `matchKey_ctrl_s` — custom: passes through only for Ctrl+S (action #1)
- `prevent` — suppresses the browser save dialog (action #1)
- `saveLocalDraft` — custom: persists the form's own values to local storage (action #2)

### 2.16 — single

**Use case:** Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action.

**Behavioral breakdown:**
1. User presses Delete while the mail list has selected rows → detect the key (on the mail list)
2. Remove the list's own selected rows and move their messages to the trash (on the mail list; the trash move is a data operation)

**Element A (mail list):** `<ul class="mail-list">`
```html
<ul class="mail-list" keydown:matchKey_delete:moveSelectedToTrash>…</ul>
```
**Chain breakdown:**
- `keydown` — trigger: key press while the list is focused (action #1)
- `matchKey_delete` — custom: passes through only for Delete (action #1)
- `moveSelectedToTrash` — custom: removes the list's own selected rows and trashes their messages (action #2)

### 2.17 — single

**Use case:** A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element)

**Behavioral breakdown:**
1. User presses M anywhere → detect the key (global trigger, chain lives on the mic button)
2. Toggle the microphone mute state owned by the mic button (on the mic button)
3. Update the mic button's own icon to reflect the new state (on the mic button)

**Element A (mic button):** `<button class="mic-toggle">`
```html
<button class="mic-toggle" keydown:matchKey_m:toggleMic:updateMicIcon>🎤</button>
```
**Chain breakdown:**
- `keydown` — trigger: key press (trigger approximation: document-level listener per the use case) (action #1)
- `matchKey_m` — custom: passes through only for M (action #1)
- `toggleMic` — custom: flips the microphone mute state (action #2)
- `updateMicIcon` — custom: swaps the button's own icon for the new mute state (action #3)

### 2.18 — single

**Use case:** Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it.

**Behavioral breakdown:**
1. User presses Tab or Shift+Tab inside the modal → detect the key and whether focus is about to leave the modal's own control set (on the modal)
2. Wrap focus back to the modal's own first/last control so it never escapes (on the modal)

**Element A (modal):** `<div class="modal" role="dialog">`
```html
<div class="modal" role="dialog" keydown:matchKey_Tab:trapFocusInside>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the modal (action #1)
- `matchKey_Tab` — custom: passes through only for Tab/Shift+Tab (action #1)
- `trapFocusInside` — custom: cycles focus within the modal's own controls, wrapping at the ends (action #2)

### 2.19 — single

**Use case:** A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly.

**Behavioral breakdown:**
1. User presses a number key 1–9 while a questionnaire item is focused → read the digit (on the item)
2. Set the item's own rating control to that digit (on the item)

**Element A (questionnaire item):** `<fieldset class="severity-item">`
```html
<fieldset class="severity-item" keydown:matchKey_1_9:setSeverityRating>…</fieldset>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the item (action #1)
- `matchKey_1_9` — custom: passes through only for digits 1–9, returning the digit (action #1)
- `setSeverityRating` — custom: sets the item's own severity rating to the digit (action #2)

### 2.20 — single

**Use case:** A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes.

**Behavioral breakdown:**
1. User presses Enter while an item is highlighted → fire the highlighted item's action (on the dropdown)
2. After firing → close the dropdown's own menu (on the dropdown)

**Element A (dropdown):** `<div class="dropdown">`
```html
<div class="dropdown" keydown:matchKey_Enter:fireHighlightedAction:closeMenu>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the dropdown (action #1)
- `matchKey_Enter` — custom: passes through only for Enter (action #1)
- `fireHighlightedAction` — custom: invokes the highlighted item's action (action #1)
- `closeMenu` — custom: closes the dropdown's own menu after the action fires (action #2)

### 2.21 — single

**Use case:** A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise.

**Behavioral breakdown:**
1. User presses Ctrl+C in the terminal → check whether the terminal has a text selection (on the terminal)
2. If text is selected → copy the selection to the clipboard (on the terminal)
3. If nothing is selected → send an interrupt signal to the terminal's own process (on the terminal)

**Element A (terminal):** `<div class="terminal">`
```html
<div class="terminal" keydown:matchKey_ctrl_c:copySelectionOrInterrupt>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press in the terminal (action #1)
- `matchKey_ctrl_c` — custom: passes through only for Ctrl+C (action #1)
- `copySelectionOrInterrupt` — custom: copies when the terminal has a selection (action #2), otherwise sends SIGINT to its own process (action #3)

### 2.22 — single

**Use case:** A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte)

**Behavioral breakdown:**
1. User presses Enter anywhere in the lobby → detect the key regardless of focus (global trigger, chain lives on the lobby element)
2. Start matchmaking — a state change owned by the lobby element; no other element mutates (on the lobby)

**Element A (game lobby):** `<div class="game-lobby">`
```html
<div class="game-lobby" keydown:matchKey_Enter:startMatchmaking>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press (trigger approximation: document-level listener so focus position does not matter) (action #1)
- `matchKey_Enter` — custom: passes through only for Enter (action #1)
- `startMatchmaking` — custom: begins matchmaking for the lobby's own session (action #2)

### 2.23 — single

**Use case:** In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks.

**Behavioral breakdown:**
1. User presses an arrow key with or without Ctrl → resolve axis: Ctrl+arrows move between beats, plain arrows between tracks (on the sequencer)
2. Move the sequencer's own note cursor within its grid accordingly (on the sequencer)

**Element A (step sequencer):** `<div class="step-sequencer">`
```html
<div class="step-sequencer" keydown:matchKey_arrows:moveNoteCursor>…</div>
```
**Chain breakdown:**
- `keydown` — trigger: key press inside the sequencer (action #1)
- `matchKey_arrows` — custom: passes through for arrow keys, returning direction plus whether Ctrl was held (action #1)
- `moveNoteCursor` — custom: moves the sequencer's own cursor between beats (Ctrl held) or between tracks (plain) (action #2)
# 3. Form & input

### 3.1 — single

**Use case:** As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field.

**Behavioral breakdown:**
1. User types in the username field → debounce keystrokes until a short pause (on the field)
2. After the pause → read the field's value and check availability against the server (data flows: value → availability result)
3. Show a tick or a taken warning in the field's own indicator area (on the field component itself)

**Element A (username field):** `<input class="username">`
```html
<input class="username" input:debounce_300:val:checkUsernameAvailable:showAvailabilityBadge>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the field (action #1)
- `debounce_300` — custom: holds the event until typing pauses for 300ms (action #1)
- `val` — reads the field's own current value (action #2)
- `checkUsernameAvailable` — custom: calls the availability API, returns available/taken (action #2)
- `showAvailabilityBadge` — custom: renders the tick or taken warning beside the field (action #3)

### 3.2 — single

**Use case:** A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js)

**Behavioral breakdown:**
1. User types in the patient search box → debounce until typing pauses (on the search box)
2. After the pause → read the query and fetch matching patients (data flows: query → results)
3. Render the filtered results inside the search box's own results list (on the search box component)

**Element A (patient search box):** `<div class="patient-search">`
```html
<div class="patient-search" input:debounce_300:val:searchPatients:renderResults>…</div>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the box (action #1)
- `debounce_300` — custom: waits for a 300ms pause so the server is not hit per keystroke (action #1)
- `val` — reads the box's own query value (action #2)
- `searchPatients` — custom: fetches matching patients, returns the result list (action #2)
- `renderResults` — custom: renders the filtered results into the component's own list (action #3)

### 3.3 — single

**Use case:** When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.

**Behavioral breakdown:**
1. The email field loses focus → validate its own value's format (on the field)
2. If invalid → show the inline error in the field's own error slot beneath it (on the field component)

**Element A (email field):** `<input class="email" type="email">`
```html
<input class="email" type="email" blur:validateEmailFormat:showInlineError>
```
**Chain breakdown:**
- `blur` — trigger: the field loses focus (action #1)
- `validateEmailFormat` — custom: checks the field's own value, returns an error message or empty (action #1)
- `showInlineError` — custom: renders the error in the field's own error slot (action #2)

### 3.4 — multi

**Use case:** Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element)

**Behavioral breakdown:**
1. User changes the country select → read the selected country and resolve its province list (on the select)
2. The province list must reach the region field, a different element → **handoff to Element B**
3. The region field receives the provinces → swaps itself from a free-text input into a dropdown of provinces (on the region field)

**Element A (country select):** `<select class="country">`
```html
<select class="country" change:val:getProvinces>…</select>
```
**Chain breakdown:**
- `change` — trigger: selection changes (action #1)
- `val` — reads the select's own chosen country (action #1)
- `getProvinces` — custom: resolves the province list for the country (action #1)

→ [handoff: Element A's action #1 output (province list) must reach Element B to trigger action #3]

**Element B (region field):** `<div class="region-field">`
```html
<div class="region-field" ???:swapToProvinceDropdown>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the province list
- `swapToProvinceDropdown` — custom: replaces its own free-text input with a dropdown of the given provinces (action #3)

### 3.5 — single

**Use case:** As a user types a new password, a strength meter under the field updates and lists which requirements are still missing.

**Behavioral breakdown:**
1. User types in the password field → read the current password (on the field component)
2. Evaluate strength and find unmet requirements (data flows: password → score + missing rules)
3. Update the component's own strength meter and missing-requirements list (on the field component)

**Element A (password field component):** `<div class="password-field">`
```html
<div class="password-field" input:val:assessPasswordStrength:updateStrengthMeter>…</div>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the password input (action #1)
- `val` — reads the component's own password value (action #1)
- `assessPasswordStrength` — custom: returns the score and missing requirements (action #2)
- `updateStrengthMeter` — custom: updates the component's own meter bar and missing-rules list (action #3)

### 3.6 — multi

**Use case:** Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element)

**Behavioral breakdown:**
1. User changes the complaint-reason dropdown → check whether "other" was selected (on the dropdown)
2. The reveal decision must reach the details textarea, a different element → **handoff to Element B**
3. The textarea receives the decision → reveals itself and becomes required (on the textarea)

**Element A (reason dropdown):** `<select class="complaint-reason">`
```html
<select class="complaint-reason" change:val:isOtherSelected>…</select>
```
**Chain breakdown:**
- `change` — trigger: selection changes (action #1)
- `val` — reads the dropdown's own selected value (action #1)
- `isOtherSelected` — custom: returns true only when the value is "other" (action #1)

→ [handoff: Element A's action #1 output (boolean: other selected) must reach Element B to trigger action #3]

**Element B (details textarea):** `<textarea class="details">`
```html
<textarea class="details" ???:revealAsRequired></textarea>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the decision
- `revealAsRequired` — custom: un-hides the textarea and sets its own `required` attribute (action #3)

### 3.7 — single

**Use case:** A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically.

**Behavioral breakdown:**
1. User pastes into the card field → read the pasted digits (on the field)
2. Reformat the digits into groups of four separated by spaces (data flows: raw → formatted)
3. Write the formatted string back into the field's own value (on the field)

**Element A (card field):** `<input class="card-number">`
```html
<input class="card-number" paste:val:reformatCardNumber:value>
```
**Chain breakdown:**
- `paste` — trigger: paste event on the field (action #1)
- `val` — reads the field's own pasted value (action #1)
- `reformatCardNumber` — custom: inserts a space every four digits, returns the formatted string (action #2)
- `value` — writes the formatted string back into the field itself (action #3)

### 3.8 — multi

**Use case:** Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element)

**Behavioral breakdown:**
1. User types in the composer → debounce to a short delay (on the composer)
2. A "typing" signal must reach the other participant's conversation header, an entirely different element → **handoff to Element B**
3. The header receives the signal → shows the typing indicator (on the header)

**Element A (chat composer):** `<textarea class="composer">`
```html
<textarea class="composer" input:debounce_500:emitTypingSignal>…</textarea>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the composer (action #1)
- `debounce_500` — custom: emits at most once per 500ms pause (action #1)
- `emitTypingSignal` — custom: produces the typing signal payload (user id, conversation id) (action #2)

→ [handoff: Element A's action #2 (typing signal) must reach Element B to trigger action #3]

**Element B (conversation header):** `<header class="conversation">`
```html
<header class="conversation" ???:showTypingIndicator>…</header>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the typing signal arrives from Element A
- `showTypingIndicator` — custom: displays the "typing…" indicator on the header (action #3)

### 3.9 — multi

**Use case:** Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element)

**Behavioral breakdown:**
1. User edits a budget cell → read the new cell value (on the cell)
2. The new value must reach the monthly total element, a different element → **handoff to Element B**
3. The monthly total receives the change → recalculates and re-renders itself (on the total element)
4. The new value must also reach the spending chart, another element → **handoff to Element C**
5. The chart receives the change → redraws itself (on the chart)

**Element A (budget cell):** `<td class="budget-cell">`
```html
<td class="budget-cell" change:val:broadcastBudgetChange>…</td>
```
**Chain breakdown:**
- `change` — trigger: cell edit commits (action #1)
- `val` — reads the cell's own new value (action #1)
- `broadcastBudgetChange` — custom: packages the change (row, value) for dependent elements (action #2)

→ [handoff: Element A's action #2 (budget change) must reach Element B to trigger action #3]
→ [handoff: Element A's action #2 (budget change) must reach Element C to trigger action #5]

**Element B (monthly total):** `<div class="monthly-total">`
```html
<div class="monthly-total" ???:recalculateTotal>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when a budget change arrives
- `recalculateTotal` — custom: recomputes and re-renders the total (action #3)

**Element C (spending chart):** `<canvas class="spending-chart">`
```html
<canvas class="spending-chart" ???:redrawChart>…</canvas>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when a budget change arrives
- `redrawChart` — custom: redraws the chart with the updated data (action #5)

### 3.10 — multi

**Use case:** Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element)

**Behavioral breakdown:**
1. User enters a birth date → compute whether the patient is under eighteen (on the date field)
2. The under-18 decision must reach the guardian consent section, a different element → **handoff to Element B**
3. The consent section receives the decision → reveals itself and marks its fields required (on the consent section)

**Element A (birth date field):** `<input class="birth-date" type="date">`
```html
<input class="birth-date" type="date" change:val:isUnderEighteen>
```
**Chain breakdown:**
- `change` — trigger: date entered (action #1)
- `val` — reads the field's own date value (action #1)
- `isUnderEighteen` — custom: returns true when the date implies age < 18 (action #1)

→ [handoff: Element A's action #1 output (boolean: under 18) must reach Element B to trigger action #3]

**Element B (guardian consent section):** `<fieldset class="guardian-consent">`
```html
<fieldset class="guardian-consent" ???:revealAsRequired>…</fieldset>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the decision
- `revealAsRequired` — custom: un-hides the section and marks its own fields required (action #3)

### 3.11 — multi

**Use case:** Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element)

**Behavioral breakdown:**
1. User presses reset on the search panel → restore the panel's own filter controls to defaults (on the panel's controls)
2. The reset must also reach the results list, a different element → **handoff to Element B**
3. The results list receives the reset → re-fetches and refreshes with default filters (on the results list)

**Element A (search panel):** `<form class="search-panel">`
```html
<form class="search-panel" reset:restoreFilterDefaults>…</form>
```
**Chain breakdown:**
- `reset` — trigger: the form's reset event (action #1)
- `restoreFilterDefaults` — custom: returns each of the panel's own filter controls to its default value (action #1)

→ [handoff: Element A's action #1 (reset signal + default filter set) must reach Element B to trigger action #3]

**Element B (results list):** `<div class="results-list">`
```html
<div class="results-list" ???:refreshResults>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A resets
- `refreshResults` — custom: re-fetches and re-renders results with the default filters (action #3)

### 3.12 — single

**Use case:** Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.

**Behavioral breakdown:**
1. User submits the login form → prevent duplicate submission processing (on the form)
2. Disable the form's own submit button and show its own spinner (on the form)

**Element A (login form):** `<form class="login">`
```html
<form class="login" submit:prevent:disableSubmitAndShowSpinner>…</form>
```
**Chain breakdown:**
- `submit` — trigger: form submission (action #1)
- `prevent` — prevents a double native submit/navigation while processing (action #1)
- `disableSubmitAndShowSpinner` — custom: disables the form's own button and reveals its own spinner (action #2)

### 3.13 — single

**Use case:** Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning.

**Behavioral breakdown:**
1. User types a quantity → read the field's value and compare with available stock (on the field)
2. If over stock → add the `invalid` class (red border) to the field itself (on the field)
3. Show the field's own inline stock warning (on the field component)

**Element A (quantity field):** `<input class="quantity" type="number">`
```html
<input class="quantity" type="number" input:val:checkAgainstStock:class_invalid:showStockWarning>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the field (action #1)
- `val` — reads the field's own quantity (action #1)
- `checkAgainstStock` — custom: returns true when the quantity exceeds available stock (action #1)
- `class_invalid` — toggles the red-border class on the field from the boolean input (action #2)
- `showStockWarning` — custom: renders the field's own inline stock warning (action #3)

### 3.14 — single

**Use case:** Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives.

**Behavioral breakdown:**
1. The field loses focus → check whether its own value is empty (on the field)
2. If empty → show the field's own gentle inline error (on the field)
3. When valid input later arrives → the field clears its own error (on the field)

**Element A (required field):** `<input required>`
```html
<input required blur:showErrorIfEmpty input:clearErrorIfValid>
```
**Chain breakdown:**
- `blur` — trigger: the field loses focus (action #1)
- `showErrorIfEmpty` — custom: shows the field's own inline error when its value is empty (actions #1–2)
- `input` — trigger: subsequent typing in the field (action #3)
- `clearErrorIfValid` — custom: removes the field's own error once the value is valid (action #3)

### 3.15 — single

**Use case:** Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities.

**Behavioral breakdown:**
1. User types in the city field → read the query (on the field)
2. Filter the airport dataset against the query (data flows: query → matches)
3. Re-render the field's own dropdown with matching airports, codes and cities (on the field component)

**Element A (city field):** `<input class="city-search">`
```html
<input class="city-search" input:val:filterAirports:renderAirportDropdown>
```
**Chain breakdown:**
- `input` — trigger: each keystroke (action #1)
- `val` — reads the field's own query (action #1)
- `filterAirports` — custom: matches airports by code and city name (action #2)
- `renderAirportDropdown` — custom: re-renders the component's own dropdown with matches (action #3)

### 3.16 — multi

**Use case:** Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element)

**Behavioral breakdown:**
1. User ticks the checkbox → read its checked state (on the checkbox)
2. The checked state must reach the billing fields container, a different element → **handoff to Element B**
3. The billing container receives the state → collapses itself and syncs its fields' values from shipping behind the scenes (on the billing container)

**Element A (same-as checkbox):** `<input type="checkbox" class="same-as-shipping">`
```html
<input type="checkbox" class="same-as-shipping" change:getCheckedState>
```
**Chain breakdown:**
- `change` — trigger: checkbox toggled (action #1)
- `getCheckedState` — custom: returns the checkbox's own checked boolean (action #1)

→ [handoff: Element A's action #1 output (checked boolean) must reach Element B to trigger action #3]

**Element B (billing fields):** `<fieldset class="billing-fields">`
```html
<fieldset class="billing-fields" ???:collapseAndSyncFromShipping>…</fieldset>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the state
- `collapseAndSyncFromShipping` — custom: collapses the fieldset and keeps its own values synced from shipping (action #3)

### 3.17 — single

**Use case:** Typing a promo code validates it on the fly and shows the applied discount inline beside the field.

**Behavioral breakdown:**
1. User types a promo code → debounce and read the code (on the field)
2. Validate the code against the server (data flows: code → discount result)
3. Show the applied discount inline in the field's own companion area (on the field component)

**Element A (promo field):** `<input class="promo-code">`
```html
<input class="promo-code" input:debounce_300:val:validatePromoCode:showAppliedDiscount>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the field (action #1)
- `debounce_300` — custom: waits for a typing pause (action #1)
- `val` — reads the field's own code (action #1)
- `validatePromoCode` — custom: validates the code, returns the discount (action #2)
- `showAppliedDiscount` — custom: renders the discount beside the field (action #3)

### 3.18 — multi

**Use case:** Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element)

**Behavioral breakdown:**
1. User picks a start date → read the date and compute the following day (on the start field)
2. The minimum date must reach the end date picker, a different element → **handoff to Element B**
3. The end picker receives the date → sets its own minimum allowed date (on the end picker)

**Element A (start date field):** `<input class="start-date" type="date">`
```html
<input class="start-date" type="date" change:val:nextDay>
```
**Chain breakdown:**
- `change` — trigger: date picked (action #1)
- `val` — reads the field's own date (action #1)
- `nextDay` — custom: returns the following calendar day (action #1)

→ [handoff: Element A's action #1 output (minimum date) must reach Element B to trigger action #3]

**Element B (end date picker):** `<input class="end-date" type="date">`
```html
<input class="end-date" type="date" ???:attr_min>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the minimum date
- `attr_min` — writes the incoming date into the picker's own `min` attribute (action #3)

### 3.19 — single

**Use case:** A character counter under a social post composer counts down while typing and turns red in the final stretch.

**Behavioral breakdown:**
1. User types in the composer → read the current length and compute remaining characters (on the composer component)
2. Update the component's own counter text with the remaining count (on the counter)
3. When remaining drops into the final stretch → turn the counter red (on the counter itself)

**Element A (composer component):** `<div class="post-composer">`
```html
<div class="post-composer" input:val:remainingChars:updateCounter:class_near-limit>…</div>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the composer (action #1)
- `val` — reads the composer's own text (action #1)
- `remainingChars` — custom: returns the remaining character count (action #1)
- `updateCounter` — custom: writes the count into the component's own counter (action #2)
- `class_near-limit` — toggles the red `near-limit` class on the counter when the count is low (action #3)

### 3.20 — multi

**Use case:** Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element)

**Behavioral breakdown:**
1. User ticks the terms checkbox → read its checked state (on the checkbox)
2. The state must reach the submit button, a different element → **handoff to Element B**
3. The submit button receives the state → enables itself (on the submit button)

**Element A (terms checkbox):** `<input type="checkbox" class="terms">`
```html
<input type="checkbox" class="terms" change:getCheckedState>
```
**Chain breakdown:**
- `change` — trigger: checkbox toggled (action #1)
- `getCheckedState` — custom: returns the checkbox's own checked boolean (action #1)

→ [handoff: Element A's action #1 output (checked boolean) must reach Element B to trigger action #3]

**Element B (submit button):** `<button class="submit" disabled>`
```html
<button class="submit" disabled ???:setEnabled>Submit application</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the state
- `setEnabled` — custom: adds/removes the button's own `disabled` attribute from the boolean input (action #3)

### 3.21 — multi

**Use case:** Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element)

**Behavioral breakdown:**
1. User drags the down-payment slider → read the slider's value (on the slider)
2. Compute the monthly payment and total interest (data flows: down payment → figures)
3. The figures must reach the estimate display, a different element → **handoff to Element B**
4. The estimate display receives the figures → renders the monthly payment and total interest (on the estimate display)

**Element A (down payment slider):** `<input type="range" class="down-payment">`
```html
<input type="range" class="down-payment" input:val:computeMortgageFigures>
```
**Chain breakdown:**
- `input` — trigger: slider drag (action #1)
- `val` — reads the slider's own value (action #1)
- `computeMortgageFigures` — custom: returns monthly payment and total interest (action #2)

→ [handoff: Element A's action #2 output (figures) must reach Element B to trigger action #4]

**Element B (estimate display):** `<div class="mortgage-estimate">`
```html
<div class="mortgage-estimate" ???:renderFigures>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the figures
- `renderFigures` — custom: renders the monthly payment and total interest into itself (action #4)

### 3.22 — single

**Use case:** Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label.

**Behavioral breakdown:**
1. User edits the field → mark the field's own state as dirty (on the field)
2. Show the field's own unsaved-changes dot beside its label (on the field component)

**Element A (config field):** `<input class="config-field">`
```html
<input class="config-field" input:markDirty:class_unsaved_add>
```
**Chain breakdown:**
- `input` — trigger: edit in the field (action #1)
- `markDirty` — custom: flags the field's own dirty state (action #1)
- `class_unsaved_add` — adds the `unsaved` class showing the dot beside the field's own label (action #2)

### 3.23 — single

**Use case:** Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error.

**Behavioral breakdown:**
1. User selects a file → check the file's size against the limit (on the upload field)
2. If oversized → replace the field's own chosen-file-name display with the size limit error (on the field)

**Element A (file upload field):** `<input type="file" class="record-upload">`
```html
<input type="file" class="record-upload" change:getSelectedFileSize:showSizeErrorIfOversized>
```
**Chain breakdown:**
- `change` — trigger: file selected (action #1)
- `getSelectedFileSize` — custom: reads the chosen file's size (action #1)
- `showSizeErrorIfOversized` — custom: swaps the field's own file-name display for the size-limit error when over the limit (action #2)

### 3.24 — single

**Use case:** A tax form formats a social security number into dashed digit groups as the user types each number.

**Behavioral breakdown:**
1. User types in the SSN field → read the raw digits (on the field)
2. Format the digits into dashed groups (data flows: raw → formatted)
3. Write the formatted string back into the field's own value (on the field)

**Element A (SSN field):** `<input class="ssn">`
```html
<input class="ssn" input:val:formatSsn:value>
```
**Chain breakdown:**
- `input` — trigger: each keystroke (action #1)
- `val` — reads the field's own raw input (action #1)
- `formatSsn` — custom: inserts dashes into the digit groups, returns the formatted string (action #2)
- `value` — writes the formatted value back into the field (action #3)

### 3.25 — multi

**Use case:** Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element)

**Behavioral breakdown:**
1. User toggles the select-all checkbox → read its checked state (on the select-all checkbox)
2. The state must reach every visible row checkbox, each a different element → **handoff to Element B (each row checkbox)**
3. Each row checkbox receives the state → sets its own checked state (on each row checkbox)

**Element A (select-all checkbox):** `<input type="checkbox" class="select-all">`
```html
<input type="checkbox" class="select-all" change:getCheckedState>
```
**Chain breakdown:**
- `change` — trigger: checkbox toggled (action #1)
- `getCheckedState` — custom: returns the checkbox's own checked boolean (action #1)

→ [handoff: Element A's action #1 output (checked boolean) must reach every visible row checkbox to trigger action #3]

**Element B (row checkbox):** `<input type="checkbox" class="row-select">`
```html
<input type="checkbox" class="row-select" ???:setChecked>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A broadcasts the state
- `setChecked` — custom: sets the row checkbox's own checked property from the boolean input (action #3)

### 3.26 — single

**Use case:** Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues.

**Behavioral breakdown:**
1. User types a `#` in the caption field → open the field's own tag suggestion list (on the field component)
2. As typing continues → filter the component's own suggestion list by the text after the `#` (on the component)

**Element A (caption field):** `<input class="caption">`
```html
<input class="caption" input:val:handleTagSuggestions>
```
**Chain breakdown:**
- `input` — trigger: keystrokes in the field (action #1)
- `val` — reads the field's own text (action #1)
- `handleTagSuggestions` — custom: opens the component's own suggestion list on `#` and filters it as the tag query grows (actions #1–2)

### 3.27 — multi

**Use case:** Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element)

**Behavioral breakdown:**
1. User changes the device-type select → read the chosen device type (on the select)
2. The device type must reach the instruction panel, a different element → **handoff to Element B**
3. The instruction panel receives the type → swaps its own content to the steps for that device (on the panel)

**Element A (device type select):** `<select class="device-type">`
```html
<select class="device-type" change:val>…</select>
```
**Chain breakdown:**
- `change` — trigger: selection changes (action #1)
- `val` — reads the select's own chosen device type (action #1)

→ [handoff: Element A's action #1 output (device type) must reach Element B to trigger action #3]

**Element B (instruction panel):** `<div class="pairing-instructions">`
```html
<div class="pairing-instructions" ???:renderInstructionsFor>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the device type
- `renderInstructionsFor` — custom: swaps the panel's own steps to match the device (action #3)

### 3.28 — multi

**Use case:** A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue)

**Behavioral breakdown:**
1. User moves the slider → read the slider's value (on the slider)
2. The value must reach the number input, a different element → **handoff to Element B**
3. The number input receives the value → updates its own displayed value (on the number input)
4. User edits the number input → read the input's value (on the number input)
5. The value must reach the slider, a different element → **handoff to Element A**
6. The slider receives the value → updates its own position (on the slider)

**Element A (slider):** `<input type="range" class="filter-slider">`
```html
<input type="range" class="filter-slider" input:val ???:value>
```
**Chain breakdown:**
- `input` — trigger: slider moves (action #1)
- `val` — reads the slider's own value (action #1)
- `???` — trigger: **deferred to Step 3.5** — fires when Element B hands off a new value (action #6)
- `value` — writes the incoming value back into the slider itself (action #6)

→ [handoff: Element A's action #1 output (value) must reach Element B to trigger action #3]
→ [handoff: Element B's action #4 output (value) must reach Element A to trigger action #6]

**Element B (number input):** `<input type="number" class="filter-number">`
```html
<input type="number" class="filter-number" input:val ???:value>
```
**Chain breakdown:**
- `input` — trigger: number edited (action #4)
- `val` — reads the input's own value (action #4)
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off a new value (action #3)
- `value` — writes the incoming value into the number input itself (action #3)

### 3.29 — multi

**Use case:** Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular)

**Behavioral breakdown:**
1. Any control in the form changes → re-run the group validation across the form's own controls (on the form)
2. The group validity must reach the save button, a different element → **handoff to Element B**
3. The save button receives the validity → stays disabled until all rules pass (on the save button)

**Element A (permissions form):** `<form class="permissions">`
```html
<form class="permissions" input:validateFormGroup change:validateFormGroup>…</form>
```
**Chain breakdown:**
- `input` — trigger: any keystroke in the form's controls (action #1)
- `change` — trigger: any committed control change (action #1)
- `validateFormGroup` — custom: validates all of the form's own controls as one group, returns a validity boolean (action #1)

→ [handoff: Element A's action #1 output (group validity boolean) must reach Element B to trigger action #3]

**Element B (save button):** `<button class="save" disabled>`
```html
<button class="save" disabled ???:setEnabled>Save</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the validity
- `setEnabled` — custom: keeps the button's own `disabled` attribute until the boolean input is true (action #3)
# 4. Media playback

### 4.1 — multi

**Use case:** When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element)

**Behavioral breakdown:**
1. The lecture video fires `ended` → detect the video finished (on the video)
2. A pulse signal must reach the next-lesson button, a different element → **handoff to Element B**
3. The next-lesson button receives the signal → pulses (on the button)
4. A progress-advance signal must reach the course progress bar, another element → **handoff to Element C**
5. The progress bar receives the signal → advances itself (on the progress bar)

**Element A (lecture video):** `<video class="lecture">`
```html
<video class="lecture" ended:lessonFinished>…</video>
```
**Chain breakdown:**
- `ended` — trigger: the video reaches its end (action #1)
- `lessonFinished` — custom: produces the lesson-completion payload (lesson id) (action #1)

→ [handoff: Element A's action #1 (lesson finished) must reach Element B to trigger action #3]
→ [handoff: Element A's action #1 (lesson finished) must reach Element C to trigger action #5]

**Element B (next lesson button):** `<button class="next-lesson">`
```html
<button class="next-lesson" ???:class_pulse_add>Next lesson</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the lesson finishes
- `class_pulse_add` — adds the pulsing class to the button itself (action #3)

**Element C (course progress bar):** `<div class="course-progress">`
```html
<div class="course-progress" ???:advanceProgress>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the lesson finishes
- `advanceProgress` — custom: advances the bar's own fill to include the finished lesson (action #5)

### 4.2 — multi

**Use case:** A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element)

**Behavioral breakdown:**
1. User presses play on the episode → read the episode's title and artwork (on the play control)
2. The episode data must reach the mini player, a different element → **handoff to Element B**
3. The mini player receives the data → updates its own title and artwork (on the mini player)

**Element A (episode play button):** `<button class="play-episode">`
```html
<button class="play-episode" click:getEpisodeData>▶</button>
```
**Chain breakdown:**
- `click` — trigger: play pressed (action #1)
- `getEpisodeData` — custom: reads the episode title and artwork from the control's data (action #1)

→ [handoff: Element A's action #1 output (episode title + artwork) must reach Element B to trigger action #3]

**Element B (mini player):** `<div class="mini-player">`
```html
<div class="mini-player" ???:updateNowPlaying>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the episode data
- `updateNowPlaying` — custom: updates the mini player's own title and artwork (action #3)

### 4.3 — single

**Use case:** When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards.

**Behavioral breakdown:**
1. The track pauses due to an interruption → store the player's own current position (on the player)
2. After the interruption → show the player's own resume prompt (on the player)

**Element A (music player):** `<audio class="track">`
```html
<audio class="track" pause:rememberPosition:showResumePrompt>…</audio>
```
**Chain breakdown:**
- `pause` — trigger: playback pauses (action #1)
- `rememberPosition` — custom: stores the player's own currentTime (action #1)
- `showResumePrompt` — custom: reveals the player's own resume prompt (action #2)

### 4.4 — single

**Use case:** As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes.

**Behavioral breakdown:**
1. The video enters buffering (`waiting`) → show the spinner overlay on the player (on the player)
2. Playback resumes (`playing`) → hide the spinner overlay (on the player itself)

**Element A (video player):** `<video class="telehealth">`
```html
<video class="telehealth" waiting:class_buffering_add playing:class_buffering_remove>…</video>
```
**Chain breakdown:**
- `waiting` — trigger: the video stalls for buffering (action #1)
- `class_buffering_add` — shows the player's own spinner overlay (action #1)
- `playing` — trigger: playback resumes (action #2)
- `class_buffering_remove` — hides the player's own spinner overlay (action #2)

### 4.5 — single

**Use case:** When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner.

**Behavioral breakdown:**
1. The video's playback time advances → check whether the position entered the last ten percent (on the player)
2. When it does → slide up the player's own rate-this-workout prompt in the player corner (on the player)

**Element A (workout video):** `<video class="workout">`
```html
<video class="workout" timeupdate:isLastTenPercent:showRatingPrompt>…</video>
```
**Chain breakdown:**
- `timeupdate` — trigger: playback time advances (action #1)
- `isLastTenPercent` — custom: returns true once the position passes ninety percent (action #1)
- `showRatingPrompt` — custom: slides up the player's own rating prompt (action #2)

### 4.6 — single

**Use case:** A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately.

**Behavioral breakdown:**
1. User drags the volume slider → read the slider's new value (on the slider)
2. Update the slider's own fill width and speaker glyph to the new level (on the slider itself)

**Element A (volume slider):** `<input type="range" class="volume">`
```html
<input type="range" class="volume" input:val:updateVolumeDisplay>
```
**Chain breakdown:**
- `input` — trigger: slider drag (action #1)
- `val` — reads the slider's own new value (action #1)
- `updateVolumeDisplay` — custom: updates the slider's own fill and speaker glyph for the level (action #2)

### 4.7 — multi

**Use case:** When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element)

**Behavioral breakdown:**
1. The video's playback time advances → check whether a quiz checkpoint was passed (on the video)
2. When passed → pause the video itself (on the video)
3. The checkpoint's question must reach the question overlay, a different element → **handoff to Element B**
4. The overlay receives the question → appears with the question (on the overlay)

**Element A (course video):** `<video class="e-learning">`
```html
<video class="e-learning" timeupdate:checkQuizCheckpoint:pauseVideo:getCheckpointQuestion>…</video>
```
**Chain breakdown:**
- `timeupdate` — trigger: playback time advances (action #1)
- `checkQuizCheckpoint` — custom: passes through only when a checkpoint is crossed (action #1)
- `pauseVideo` — custom: pauses the video itself (action #2)
- `getCheckpointQuestion` — custom: returns the checkpoint's question data (action #3)

→ [handoff: Element A's action #3 output (question data) must reach Element B to trigger action #4]

**Element B (question overlay):** `<div class="quiz-overlay">`
```html
<div class="quiz-overlay" ???:showQuestion>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the question
- `showQuestion` — custom: renders and reveals the overlay's own question (action #4)

### 4.8 — multi

**Use case:** When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element)

**Behavioral breakdown:**
1. The audio clip finishes → resolve which exhibit comes next (on the audio element)
2. The next-exhibit identity must reach that exhibit's card, a different element → **handoff to Element B**
3. The next exhibit's card receives the signal → highlights itself (on the card)

**Element A (audio guide clip):** `<audio class="guide-clip">`
```html
<audio class="guide-clip" ended:getNextExhibit>…</audio>
```
**Chain breakdown:**
- `ended` — trigger: the clip finishes (action #1)
- `getNextExhibit` — custom: returns the next exhibit's identifier (action #1)

→ [handoff: Element A's action #1 output (next exhibit id) must reach Element B to trigger action #3]

**Element B (exhibit card):** `<div class="exhibit-card">`
```html
<div class="exhibit-card" ???:class_highlighted_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when this card is identified as next
- `class_highlighted_add` — adds the highlight class to the card itself (action #3)

### 4.9 — multi

**Use case:** A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line.

**Behavioral breakdown:**
1. The song's playback time advances → resolve the current timestamp (on the audio element)
2. The current timestamp must reach the timestamped lyric line elements, different elements → **handoff to Element B (each lyric line)**
3. The matching lyric line receives the timestamp → highlights itself (on the lyric line)

**Element A (audio element):** `<audio class="song">`
```html
<audio class="song" timeupdate:getPlaybackTime>…</audio>
```
**Chain breakdown:**
- `timeupdate` — trigger: song playback time advances (action #1)
- `getPlaybackTime` — custom: returns the current playback timestamp (action #1)

→ [handoff: Element A's action #1 output (current timestamp) must reach the matching Element B lyric line to trigger action #3]

**Element B (lyric line):** `<p class="lyric-line">`
```html
<p class="lyric-line" ???:class_current>…</p>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the playback time passes this line's timestamp
- `class_current` — toggles the line's own highlight based on whether the timestamp is within its range (action #3)

### 4.10 — single

**Use case:** When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature.

**Behavioral breakdown:**
1. User pauses the demo video → reveal the player's own chapter list (on the player)

**Element A (demo video player):** `<div class="demo-player">`
```html
<div class="demo-player" pause:showChapterList>…</div>
```
**Chain breakdown:**
- `pause` — trigger: the video pauses (action #1)
- `showChapterList` — custom: reveals the player's own chapter list panel (action #1)

### 4.11 — multi

**Use case:** When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element)

**Behavioral breakdown:**
1. The auction stream stalls → detect the stall (on the video element)
2. A show signal must reach the reconnecting banner, a different element → **handoff to Element B**
3. The banner receives the signal → shows itself (on the banner)
4. A disable signal must reach the bid buttons, different elements → **handoff to Element C**
5. The bid buttons receive the signal → temporarily disable themselves (on the bid buttons)

**Element A (auction stream):** `<video class="auction-stream">`
```html
<video class="auction-stream" stalled:streamStalled>…</video>
```
**Chain breakdown:**
- `stalled` — trigger: the stream stalls (action #1)
- `streamStalled` — custom: produces the stall signal (action #1)

→ [handoff: Element A's action #1 (stall signal) must reach Element B to trigger action #3]
→ [handoff: Element A's action #1 (stall signal) must reach Element C to trigger action #5]

**Element B (reconnecting banner):** `<div class="reconnect-banner">`
```html
<div class="reconnect-banner" ???:class_visible_add>Reconnecting…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires on the stall signal
- `class_visible_add` — reveals the banner itself (action #3)

**Element C (bid buttons):** `<button class="bid">`
```html
<button class="bid" ???:setDisabled>Place bid</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires on the stall signal
- `setDisabled` — custom: sets the button's own `disabled` attribute while the stall lasts (action #5)

### 4.12 — single

**Use case:** When a story video finishes in a social app, the player advances itself to the next friend's story.

**Behavioral breakdown:**
1. The story video finishes → load the next friend's story into the player itself (on the player)

**Element A (story player):** `<div class="story-player">`
```html
<div class="story-player" ended:advanceToNextStory>…</div>
```
**Chain breakdown:**
- `ended` — trigger: the story finishes (action #1)
- `advanceToNextStory` — custom: advances the player's own content to the next friend's story (action #1)

### 4.13 — multi

**Use case:** Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)

**Behavioral breakdown:**
1. The meditation track starts playing → detect playback start (on the player)
2. The dimming must land on the app background, a different element → **handoff to Element B**
3. The app background receives the signal → gradually darkens toward the calm theme (on the background/root element)

**Element A (meditation player):** `<audio class="meditation">`
```html
<audio class="meditation" play:meditationStarted>…</audio>
```
**Chain breakdown:**
- `play` — trigger: playback starts (action #1)
- `meditationStarted` — custom: produces the calm-theme signal (action #1)

→ [handoff: Element A's action #1 (calm-theme signal) must reach Element B to trigger action #3]

**Element B (app background/root):** `<body>`
```html
<body ???:class_calm_add>…</body>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires on the calm-theme signal
- `class_calm_add` — adds the calm class so the background dims itself (action #3)

### 4.14 — single

**Use case:** While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer.

**Behavioral breakdown:**
1. User scrubs the seek bar → read the target timestamp at the pointer position (on the seek bar)
2. Render the seek bar's own thumbnail preview of that frame at the pointer (on the seek bar)

**Element A (seek bar):** `<div class="seek-bar">`
```html
<div class="seek-bar" input:pointerTimestamp:showFramePreview>…</div>
```
**Chain breakdown:**
- `input` — trigger: scrubbing the seek bar (action #1)
- `pointerTimestamp` — custom: resolves the timestamp under the pointer (action #1)
- `showFramePreview` — custom: renders the seek bar's own thumbnail preview following the pointer (action #2)

### 4.15 — multi

**Use case:** When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element)

**Behavioral breakdown:**
1. The audio clip ends → detect completion (on the audio element)
2. An enable signal must reach the record-your-voice button, a different element → **handoff to Element B**
3. The record button receives the signal → enables itself (on the button)

**Element A (audio clip):** `<audio class="pronunciation-clip">`
```html
<audio class="pronunciation-clip" ended:clipFinished>…</audio>
```
**Chain breakdown:**
- `ended` — trigger: the clip finishes (action #1)
- `clipFinished` — custom: produces the enable signal (action #1)

→ [handoff: Element A's action #1 (enable signal) must reach Element B to trigger action #3]

**Element B (record button):** `<button class="record-voice" disabled>`
```html
<button class="record-voice" disabled ???:setEnabled>Record your voice</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the clip finishes
- `setEnabled` — custom: removes the button's own `disabled` attribute (action #3)

# 5. Drag & drop / clipboard

### 5.1 — single

**Use case:** A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop.

**Behavioral breakdown:**
1. User drags the task card → the card tracks its own drag (on the card)
2. User drops the card into the in-progress column → the card moves itself into the new column (on the card)
3. On drop → save the card's own new status (data write initiated by the card)

**Element A (task card):** `<div class="task-card" draggable>`
```html
<div class="task-card" draggable drop:moveToColumn:saveNewStatus>…</div>
```
**Chain breakdown:**
- `drop` — trigger: the card is dropped (action #2)
- `moveToColumn` — custom: moves the card itself into the target column (action #2)
- `saveNewStatus` — custom: persists the card's own new status (action #3)

### 5.2 — single

**Use case:** A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active.

**Behavioral breakdown:**
1. User drags a file over the avatar area → detect the dragover (on the avatar area)
2. While dragging over → add the dashed highlight border to the avatar area itself (on the avatar area)
3. When the drag leaves → remove the highlight (on the avatar area)

**Element A (avatar area):** `<div class="avatar-drop">`
```html
<div class="avatar-drop" dragover:prevent:class_drop-active_add dragleave:class_drop-active_remove>…</div>
```
**Chain breakdown:**
- `dragover` — trigger: file dragged over the area (action #1)
- `prevent` — allows the drop by canceling the default (action #1)
- `class_drop-active_add` — adds the dashed highlight border to the area itself (action #2)
- `dragleave` — trigger: the drag leaves the area (action #3)
- `class_drop-active_remove` — removes the highlight from the area itself (action #3)

### 5.3 — single

**Use case:** When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes.

**Behavioral breakdown:**
1. User drops a PDF onto the upload zone → accept the file (on the zone)
2. During upload → fill the zone's own progress bar with upload progress (on the zone)
3. On completion → mark the zone's own progress complete (on the zone)

**Element A (upload zone):** `<div class="upload-zone">`
```html
<div class="upload-zone" drop:prevent:uploadDroppedFile:fillOwnProgressBar>…</div>
```
**Chain breakdown:**
- `drop` — trigger: the PDF is dropped (action #1)
- `prevent` — cancels the browser's default file-open (action #1)
- `uploadDroppedFile` — custom: uploads the file, streaming progress events (action #2)
- `fillOwnProgressBar` — custom: fills the zone's own progress bar until the upload completes (actions #2–3)

### 5.4 — single

**Use case:** A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly.

**Behavioral breakdown:**
1. User drags a playlist row and drops it at a new position → the playlist reorders its own rows (on the playlist)
2. After reordering → rewrite the playlist's own track numbers to match (on the playlist)

**Element A (playlist):** `<ol class="playlist">`
```html
<ol class="playlist" drop:reorderDroppedRow:renumberTracks>…</ol>
```
**Chain breakdown:**
- `drop` — trigger: a row is dropped at its new position (action #1)
- `reorderDroppedRow` — custom: moves the row within the playlist's own children (action #1)
- `renumberTracks` — custom: rewrites the playlist's own track numbers (action #2)

### 5.5 — single

**Use case:** Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop.

**Behavioral breakdown:**
1. User drags a widget → show the dashboard grid's own ghost placeholders at legal drop slots (on the grid)
2. User drops the widget → the grid reflows its own children around the new position (on the grid)

**Element A (dashboard grid):** `<div class="dashboard-grid">`
```html
<div class="dashboard-grid" dragover:showGhostPlaceholders drop:reflowGrid>…</div>
```
**Chain breakdown:**
- `dragover` — trigger: widget dragged over the grid (action #1)
- `showGhostPlaceholders` — custom: renders the grid's own ghost placeholders (action #1)
- `drop` — trigger: the widget is dropped (action #2)
- `reflowGrid` — custom: reflows the grid's own children around the drop (action #2)

### 5.6 — multi

**Use case:** A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element)

**Behavioral breakdown:**
1. User clicks copy on the API key element → copy the key to the clipboard (on the key element)
2. A confirmation must reach the toast element, a different element → **handoff to Element B**
3. The toast receives the signal → appears confirming the copy (on the toast)

**Element A (API key element):** `<code class="api-key">`
```html
<code class="api-key" click:copy>sk-…</code>
```
**Chain breakdown:**
- `click` — trigger: the key element is clicked (action #1)
- `copy` — copies the element's own textContent (the key) to the clipboard (action #1)

→ [handoff: Element A's action #1 (copy-confirmed signal) must reach Element B to trigger action #3]

**Element B (toast):** `<div class="toast">`
```html
<div class="toast" ???:text_Key_copied_to_clipboard:class_visible_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A confirms the copy
- `text_Key_copied_to_clipboard` — sets the toast's own message (action #3)
- `class_visible_add` — reveals the toast itself (action #3)

### 5.7 — single

**Use case:** When a user pastes a list of email addresses into an invite field, they are split into individual removable chips.

**Behavioral breakdown:**
1. User pastes into the invite field → read the pasted text (on the field)
2. Split the text into individual addresses (data flows: pasted text → address list)
3. Render the addresses as removable chips inside the field's own chip list (on the field component)

**Element A (invite field):** `<div class="invite-field">`
```html
<div class="invite-field" paste:readPastedText:splitAddresses:renderChips>…</div>
```
**Chain breakdown:**
- `paste` — trigger: paste into the field (action #1)
- `readPastedText` — custom: extracts the pasted clipboard text (action #1)
- `splitAddresses` — custom: splits the text into individual email addresses (action #2)
- `renderChips` — custom: renders removable chips inside the component's own chip list (action #3)

### 5.8 — multi

**Use case:** When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element)

**Behavioral breakdown:**
1. User drags a patient entry from the waitlist → carry the patient data (on the waitlist entry)
2. The patient data must reach the appointment slot, a different element → **handoff to Element B**
3. The slot receives the patient → fills itself and reveals its own undo option (on the slot)

**Element A (waitlist entry):** `<li class="waitlist-entry" draggable>`
```html
<li class="waitlist-entry" draggable dragstart:setPatientDragData>…</li>
```
**Chain breakdown:**
- `dragstart` — trigger: the drag begins (action #1)
- `setPatientDragData` — custom: packs the patient id into the drag payload (action #1)

→ [handoff: Element A's action #1 (patient data in the drag payload) must reach Element B to trigger action #3]

**Element B (appointment slot):** `<div class="appointment-slot">`
```html
<div class="appointment-slot" ???:fillSlot:showUndoOption>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the patient lands on the slot
- `fillSlot` — custom: fills the slot itself with the patient (action #3)
- `showUndoOption` — custom: reveals the slot's own undo option (action #3)

### 5.9 — multi

**Use case:** Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element)

**Behavioral breakdown:**
1. User drags a product image → carry the product data (on the image)
2. The product data must reach the comparison tray, a different element → **handoff to Element B**
3. The tray receives the product → increments its own badge and adds the item thumbnail (on the tray)

**Element A (product image):** `<img class="product-img" draggable>`
```html
<img class="product-img" draggable dragstart:setProductDragData>…</img>
```
**Chain breakdown:**
- `dragstart` — trigger: the drag begins (action #1)
- `setProductDragData` — custom: packs the product id/thumbnail into the drag payload (action #1)

→ [handoff: Element A's action #1 (product data) must reach Element B to trigger action #3]

**Element B (comparison tray):** `<div class="comparison-tray">`
```html
<div class="comparison-tray" ???:addItemAndBumpBadge>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the product lands in the tray
- `addItemAndBumpBadge` — custom: increments the tray's own badge and appends its own thumbnail (action #3)

### 5.10 — single

**Use case:** A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback.

**Behavioral breakdown:**
1. User clicks the copy button on the code block → copy the block's code to the clipboard (on the code block component)
2. After copying → show a brief checkmark on the component's own button (on the component)
3. After a moment → restore the button's own normal icon (on the component)

**Element A (code block component):** `<div class="code-block">`
```html
<div class="code-block" click:copyOwnCode:showCheckmark:wait_1500:restoreCopyIcon>…</div>
```
**Chain breakdown:**
- `click` — trigger: the component's copy button is clicked (bubbles to the component) (action #1)
- `copyOwnCode` — custom: copies the component's own code text to the clipboard (action #1)
- `showCheckmark` — custom: swaps the component's own button icon to a checkmark (action #2)
- `wait_1500` — waits 1.5 seconds (action #3)
- `restoreCopyIcon` — custom: restores the component's own button icon (action #3)

### 5.11 — single

**Use case:** When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element)

**Behavioral breakdown:**
1. A dragged file leaves the window → detect the dragleave at the window edge (global trigger, chain lives on the overlay)
2. Hide the full-page drop overlay itself (on the overlay)

**Element A (drop overlay):** `<div class="drop-overlay">`
```html
<div class="drop-overlay" dragleave:hideIfLeavingWindow>…</div>
```
**Chain breakdown:**
- `dragleave` — trigger: the drag leaves the window (trigger approximation: listens at the document/window boundary) (action #1)
- `hideIfLeavingWindow` — custom: hides the overlay itself when the drag truly exited the window (action #2)

### 5.12 — multi

**Use case:** A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element)

**Behavioral breakdown:**
1. User drags a layer row to a new position → the layer panel reorders its own rows and computes the new stacking order (on the layer panel)
2. The new stacking order must reach the canvas, a different element → **handoff to Element B**
3. The canvas receives the order → re-renders itself with the new stacking (on the canvas)

**Element A (layer panel):** `<ul class="layer-panel">`
```html
<ul class="layer-panel" drop:reorderLayer:getStackingOrder>…</ul>
```
**Chain breakdown:**
- `drop` — trigger: the layer row is dropped at its new position (action #1)
- `reorderLayer` — custom: reorders the panel's own rows (action #1)
- `getStackingOrder` — custom: computes the new stacking order from the panel's rows (action #1)

→ [handoff: Element A's action #1 output (new stacking order) must reach Element B to trigger action #3]

**Element B (canvas):** `<canvas class="design-canvas">`
```html
<canvas class="design-canvas" ???:renderStackingOrder>…</canvas>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the order
- `renderStackingOrder` — custom: re-renders the canvas with the new stacking (action #3)

### 5.13 — multi

**Use case:** When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element)

**Behavioral breakdown:**
1. User pastes into the composer → detect the pasted URL (on the composer)
2. Fetch the URL's preview metadata (data flows: URL → preview data)
3. The preview card must be attached below the draft — a separate element → **handoff to Element B**
4. The preview card receives the metadata → renders and attaches itself below the draft (on the preview card)

**Element A (chat composer):** `<textarea class="composer">`
```html
<textarea class="composer" paste:readPastedText:extractUrl:fetchLinkPreview>…</textarea>
```
**Chain breakdown:**
- `paste` — trigger: paste into the composer (action #1)
- `readPastedText` — custom: extracts the pasted clipboard text (action #1)
- `extractUrl` — custom: passes through only when the text is a URL (action #1)
- `fetchLinkPreview` — custom: fetches the URL's preview metadata (action #2)

→ [handoff: Element A's action #2 output (preview metadata) must reach Element B to trigger action #4]

**Element B (link preview card):** `<div class="link-preview">`
```html
<div class="link-preview" ???:renderPreview>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the metadata
- `renderPreview` — custom: renders the preview card's own content and attaches below the draft (action #4)

### 5.14 — single

**Use case:** A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately.

**Behavioral breakdown:**
1. User drags a stop to a new position → the route list reorders its own stops (on the route list)
2. After reordering → recalculate and rewrite the list's own itinerary distances (on the route list)

**Element A (route list):** `<ol class="route-stops">`
```html
<ol class="route-stops" drop:reorderStop:recalculateDistances>…</ol>
```
**Chain breakdown:**
- `drop` — trigger: a stop is dropped at its new position (action #1)
- `reorderStop` — custom: reorders the list's own stops (action #1)
- `recalculateDistances` — custom: recomputes and rewrites the list's own leg distances (action #2)

### 5.15 — single

**Use case:** A user pastes a one-time code into a six box verification input and each digit lands in its own box.

**Behavioral breakdown:**
1. User pastes the code into the verification input → read the pasted digits (on the input component)
2. Distribute each digit into the component's own six boxes (on the component)

**Element A (verification input):** `<div class="otp-input">`
```html
<div class="otp-input" paste:readPastedText:splitDigits:distributeToBoxes>…</div>
```
**Chain breakdown:**
- `paste` — trigger: paste into the component (action #1)
- `readPastedText` — custom: extracts the pasted code (action #1)
- `splitDigits` — custom: splits the code into individual digits (action #1)
- `distributeToBoxes` — custom: places each digit into the component's own six boxes (action #2)

### 5.16 — multi

**Use case:** A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)

**Behavioral breakdown:**
1. User cuts text in the note editor → the cut puts content on the clipboard (on the editor)
2. An enable signal must reach the toolbar's paste option, a different element → **handoff to Element B**
3. The toolbar receives the signal → enables its own paste option (on the toolbar)

**Element A (note editor):** `<div class="note-editor" contenteditable>`
```html
<div class="note-editor" contenteditable cut:clipboardNowHasContent>…</div>
```
**Chain breakdown:**
- `cut` — trigger: the cut event on the editor (action #1)
- `clipboardNowHasContent` — custom: produces the "paste available" signal (action #1)

→ [handoff: Element A's action #1 (paste-available signal) must reach Element B to trigger action #3]

**Element B (formatting toolbar):** `<div class="toolbar">`
```html
<div class="toolbar" ???:enablePasteOption>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the clipboard gains content
- `enablePasteOption` — custom: enables the toolbar's own paste button (action #3)
# 6. Focus & selection

### 6.1 — multi

**Use case:** When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element)

**Behavioral breakdown:**
1. The search input gains focus → detect the focus (on the input)
2. An expand signal must reach the suggestions panel, a different element → **handoff to Element B**
3. The panel receives the signal → expands itself beneath the input (on the panel)

**Element A (search input):** `<input class="help-search">`
```html
<input class="help-search" focus:inputFocused>
```
**Chain breakdown:**
- `focus` — trigger: the input gains focus (action #1)
- `inputFocused` — custom: produces the expand signal (action #1)

→ [handoff: Element A's action #1 (focus signal) must reach Element B to trigger action #3]

**Element B (suggestions panel):** `<div class="suggested-articles">`
```html
<div class="suggested-articles" ???:class_expanded_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the input gains focus
- `class_expanded_add` — expands the panel itself (action #3)

### 6.2 — multi

**Use case:** When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element)

**Behavioral breakdown:**
1. Focus moves into the megamenu trigger → detect the focus (on the trigger)
2. An open signal must reach the megamenu panel, a different element → **handoff to Element B**
3. The panel receives the signal → opens and focuses its own first link for arrow-key navigation (on the panel)

**Element A (megamenu trigger):** `<button class="megamenu-trigger">`
```html
<button class="megamenu-trigger" focus:triggerFocused>Services</button>
```
**Chain breakdown:**
- `focus` — trigger: focus enters the trigger (action #1)
- `triggerFocused` — custom: produces the open signal (action #1)

→ [handoff: Element A's action #1 (open signal) must reach Element B to trigger action #3]

**Element B (megamenu panel):** `<div class="megamenu-panel">`
```html
<div class="megamenu-panel" ???:openAndFocusFirstLink>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the trigger gains focus
- `openAndFocusFirstLink` — custom: opens the panel and focuses its own first link (action #3)

### 6.3 — multi

**Use case:** When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element)

**Behavioral breakdown:**
1. User selects text in the article → detect a non-empty selection and its position (on the article)
2. The selection position must reach the floating toolbar, a different element → **handoff to Element B**
3. The toolbar receives the position → appears at the selection offering highlight/copy/share (on the toolbar)

**Element A (article):** `<article>`
```html
<article select:getSelectionRect>…</article>
```
**Chain breakdown:**
- `select` — trigger: text is selected within the article (action #1)
- `getSelectionRect` — custom: returns the selection's bounding position (action #1)

→ [handoff: Element A's action #1 output (selection position) must reach Element B to trigger action #3]

**Element B (floating toolbar):** `<div class="selection-toolbar">`
```html
<div class="selection-toolbar" ???:showAtPosition>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the position
- `showAtPosition` — custom: positions and reveals the toolbar with its highlight/copy/share actions (action #3)

### 6.4 — single

**Use case:** When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it.

**Behavioral breakdown:**
1. Focus enters the date picker → update the picker's own accessible announcement describing its keyboard controls (on the picker)

**Element A (date picker):** `<div class="date-picker">`
```html
<div class="date-picker" focus:announceKeyboardControls>…</div>
```
**Chain breakdown:**
- `focus` — trigger: focus enters the picker (action #1)
- `announceKeyboardControls` — custom: sets the picker's own live description announcing the available keys (action #1)

### 6.5 — multi

**Use case:** When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element)

**Behavioral breakdown:**
1. User selects a cell range → compute the sum and average of the selected cells (on the spreadsheet)
2. The computed stats must reach the status bar, a different element → **handoff to Element B**
3. The status bar receives the stats → displays the sum and average (on the status bar)

**Element A (spreadsheet):** `<table class="sheet">`
```html
<table class="sheet" select:computeRangeStats>…</table>
```
**Chain breakdown:**
- `select` — trigger: a cell range is selected (action #1)
- `computeRangeStats` — custom: computes sum and average of the selected range (action #1)

→ [handoff: Element A's action #1 output (sum + average) must reach Element B to trigger action #3]

**Element B (status bar):** `<div class="status-bar">`
```html
<div class="status-bar" ???:showRangeStats>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the stats
- `showRangeStats` — custom: renders the sum and average into the status bar itself (action #3)

### 6.6 — multi

**Use case:** When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element)

**Behavioral breakdown:**
1. The text field gains focus → read the field's target language (on the field)
2. The language must reach the on-screen keyboard, a different element → **handoff to Element B**
3. The keyboard receives the language → switches its own layout (on the keyboard)

**Element A (text field):** `<input class="translation-target">`
```html
<input class="translation-target" focus:getTargetLanguage>
```
**Chain breakdown:**
- `focus` — trigger: the field gains focus (action #1)
- `getTargetLanguage` — custom: reads the field's own target-language data (action #1)

→ [handoff: Element A's action #1 output (target language) must reach Element B to trigger action #3]

**Element B (on-screen keyboard):** `<div class="osk">`
```html
<div class="osk" ???:switchLayout>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the language
- `switchLayout` — custom: switches the keyboard's own layout to the given language (action #3)

### 6.7 — single

**Use case:** When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs.

**Behavioral breakdown:**
1. The coupon field loses focus → read its own value (on the field)
2. Trim and uppercase the value (data flows: raw → normalized)
3. Write the normalized value back into the field itself, then run validation (on the field)

**Element A (coupon field):** `<input class="coupon">`
```html
<input class="coupon" blur:val:trimUppercase:value:validateCoupon>
```
**Chain breakdown:**
- `blur` — trigger: the field loses focus (action #1)
- `val` — reads the field's own raw value (action #1)
- `trimUppercase` — custom: trims whitespace and uppercases (action #2)
- `value` — writes the normalized value back into the field (action #3)
- `validateCoupon` — custom: validates the normalized value (action #3)

### 6.8 — single

**Use case:** When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card.

**Behavioral breakdown:**
1. Keyboard focus enters the card → add the focus-ring class to the card itself (on the card)
2. Reveal the card's own quick actions (on the card)

**Element A (property card):** `<div class="property-card" tabindex="0">`
```html
<div class="property-card" tabindex="0" focus:class_focus-ring_add:showQuickActions>…</div>
```
**Chain breakdown:**
- `focus` — trigger: focus enters the card (action #1)
- `class_focus-ring_add` — shows the card's own focus ring (action #1)
- `showQuickActions` — custom: reveals the card's own quick-action buttons (action #2)

### 6.9 — multi

**Use case:** When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element)

**Behavioral breakdown:**
1. User selects a portion of the waveform → detect the non-empty selection (on the waveform)
2. An enable signal must reach the cut and fade buttons, different elements → **handoff to Element B**
3. The buttons receive the signal → enable themselves (on the buttons)

**Element A (waveform):** `<div class="waveform">`
```html
<div class="waveform" select:hasSelection>…</div>
```
**Chain breakdown:**
- `select` — trigger: a waveform portion is selected (action #1)
- `hasSelection` — custom: returns true when the selection is non-empty (action #1)

→ [handoff: Element A's action #1 output (selection-exists boolean) must reach Element B to trigger action #3]

**Element B (cut/fade buttons):** `<button class="cut">` / `<button class="fade">`
```html
<button class="cut" ???:setEnabled>Cut</button>
<button class="fade" ???:setEnabled>Fade</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when a selection exists
- `setEnabled` — custom: toggles each button's own `disabled` attribute from the boolean (action #3)

### 6.10 — multi

**Use case:** When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element)

**Behavioral breakdown:**
1. The editor's selection changes → detect that it collapsed to a caret and read the current paragraph style (on the editor)
2. The paragraph style must reach the block format dropdown, a different element → **handoff to Element B**
3. The dropdown receives the style → resets its own value to the current paragraph style (on the dropdown)

**Element A (rich text editor):** `<div class="editor" contenteditable>`
```html
<div class="editor" contenteditable selectionchange:ifCaretCollapsed:getParagraphStyle>…</div>
```
**Chain breakdown:**
- `selectionchange` — trigger: the selection changes within the editor (action #1)
- `ifCaretCollapsed` — custom: passes through only when the selection is a collapsed caret (action #1)
- `getParagraphStyle` — custom: reads the current block's paragraph style (action #1)

→ [handoff: Element A's action #1 output (paragraph style) must reach Element B to trigger action #3]

**Element B (block format dropdown):** `<select class="block-format">`
```html
<select class="block-format" ???:value>…</select>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A hands off the style
- `value` — sets the dropdown's own value to the incoming paragraph style (action #3)

### 6.11 — single

**Use case:** When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers.

**Behavioral breakdown:**
1. Focus enters the first box → update the component's own accessible announcement with the expected code length (on the input component)

**Element A (one-time code input):** `<div class="otp-input">`
```html
<div class="otp-input" focus:announceCodeLength>…</div>
```
**Chain breakdown:**
- `focus` — trigger: focus enters the component's first box (action #1)
- `announceCodeLength` — custom: sets the component's own live announcement of the expected length (action #1)

### 6.12 — single

**Use case:** When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label.

**Behavioral breakdown:**
1. The settings field loses focus → check whether its own value differs from the saved value (on the field)
2. If unsaved → show the field's own unsaved-changes dot beside its label (on the field component)

**Element A (settings field):** `<input class="settings-field">`
```html
<input class="settings-field" blur:showDotIfDirty>
```
**Chain breakdown:**
- `blur` — trigger: the field loses focus (action #1)
- `showDotIfDirty` — custom: compares the field's own value to its saved value and shows its own unsaved dot (actions #1–2)

### 6.13 — single

**Use case:** A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular)

**Behavioral breakdown:**
1. The element gains focus → detect whether focus arrived via keyboard or mouse (on the element)
2. Only for keyboard focus → add the focus-ring class to the element itself (on the element)

**Element A (focusable element):** `<button>`
```html
<button focus:ifKeyboardFocus:class_focus-ring_add>…</button>
```
**Chain breakdown:**
- `focus` — trigger: the element gains focus (action #1)
- `ifKeyboardFocus` — custom: passes through only when focus came from keyboard navigation (action #1)
- `class_focus-ring_add` — adds the focus-ring class to the element itself (action #2)

### 6.14 — multi

**Use case:** When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element)

**Behavioral breakdown:**
1. Focus leaves the last field of the address group → validate the form's own address group fields together (on the form)
2. If valid → the shipping options must load into the shipping element, a different element → **handoff to Element B**
3. The shipping element receives the go-ahead → loads and renders its own options (on the shipping element)

**Element A (address form):** `<form class="address-group">`
```html
<form class="address-group" blur:validateAddressGroupIfLastField>…</form>
```
**Chain breakdown:**
- `blur` — trigger: focus leaves a field (bubbles via focusout path to the form) (action #1)
- `validateAddressGroupIfLastField` — custom: when the blurred field was the group's last, validates the form's own address group and returns the validated address (action #1)

→ [handoff: Element A's action #1 output (validated address) must reach Element B to trigger action #3]

**Element B (shipping options):** `<div class="shipping-options">`
```html
<div class="shipping-options" ???:loadShippingOptions>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the address validates
- `loadShippingOptions` — custom: loads and renders the element's own shipping options (action #3)

# 7. Visibility & intersection

### 7.1 — single

**Use case:** When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder.

**Behavioral breakdown:**
1. The product card scrolls into view → detect the intersection (on the card)
2. Swap the card's own placeholder for its real image (on the card itself)

**Element A (product card):** `<div class="product-card">`
```html
<div class="product-card" intersection:loadRealImage>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the card enters the viewport (action #1)
- `loadRealImage` — custom: swaps the card's own placeholder image for the real one (action #2)

### 7.2 — multi

**Use case:** When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element)

**Behavioral breakdown:**
1. The sentinel row becomes visible → detect the intersection (on the sentinel)
2. A load-next-page signal must reach the list container, a different element → **handoff to Element B**
3. The list container receives the signal → fetches the next page and appends it to itself (on the list container)

**Element A (sentinel row):** `<div class="sentinel">`
```html
<div class="sentinel" intersection:sentinelVisible></div>
```
**Chain breakdown:**
- `intersection` — trigger: the sentinel becomes visible (action #1)
- `sentinelVisible` — custom: produces the load-more signal (action #1)

→ [handoff: Element A's action #1 (load-more signal) must reach Element B to trigger action #3]

**Element B (list container):** `<div class="order-history">`
```html
<div class="order-history" ???:fetchNextPage:appendPage>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the sentinel is visible
- `fetchNextPage` — custom: fetches the next page of orders (action #3)
- `appendPage` — custom: appends the new rows to the container itself (action #3)

### 7.3 — single

**Use case:** When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values.

**Behavioral breakdown:**
1. The statistics section scrolls into view → detect the intersection (on the section)
2. Animate the section's own counters from zero to their final values (on the section)

**Element A (statistics section):** `<section class="stats">`
```html
<section class="stats" intersection:animateCounters>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the section enters the viewport (action #1)
- `animateCounters` — custom: animates the section's own counters from zero to their targets (action #2)

### 7.4 — multi

**Use case:** When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element)

**Behavioral breakdown:**
1. An article section reaches the viewport middle → read the section's id (on the section)
2. The section id must reach the table-of-contents entry, a different element → **handoff to Element B**
3. The matching TOC entry receives the id → highlights itself (on the TOC entry)

**Element A (article section):** `<section class="article-section">`
```html
<section class="article-section" intersection:getSectionId>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the section crosses the viewport middle (action #1)
- `getSectionId` — custom: returns the section's own id (action #1)

→ [handoff: Element A's action #1 output (section id) must reach the matching Element B to trigger action #3]

**Element B (TOC entry):** `<li class="toc-entry">`
```html
<li class="toc-entry" ???:class_active_add>…</li>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when this entry's section reaches the middle
- `class_active_add` — highlights the TOC entry itself (action #3)

### 7.5 — single

**Use case:** When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves.

**Behavioral breakdown:**
1. The video crosses the fifty-percent visibility threshold → play it muted (on the video itself)
2. The video leaves the viewport → pause it (on the video itself)

**Element A (feed video):** `<video class="feed-video" muted>`
```html
<video class="feed-video" muted intersection:toggleAutoplayWhenHalfVisible>…</video>
```
**Chain breakdown:**
- `intersection` — trigger: the video crosses the visibility threshold (actions #1–2)
- `toggleAutoplayWhenHalfVisible` — custom: plays the video muted when at least half visible, pauses when it leaves (actions #1–2)

### 7.6 — single

**Use case:** When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing.

**Behavioral breakdown:**
1. The ad slot reaches fifty-percent visibility → start a one-second timer (on the ad slot)
2. After one second still visible → record the impression for billing (analytics write; no other element mutates)

**Element A (ad slot):** `<div class="ad-slot">`
```html
<div class="ad-slot" intersection:wait_1000:recordImpression>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the slot crosses the half-visible threshold (action #1)
- `wait_1000` — waits one second (action #1)
- `recordImpression` — custom: records the viewable impression for billing (action #2)

### 7.7 — single

**Use case:** When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle.

**Behavioral breakdown:**
1. The chart enters the viewport → detect the intersection (on the chart)
2. Fetch live sensor data and start the chart's own refresh cycle (on the chart itself)

**Element A (vitals chart):** `<div class="vitals-chart">`
```html
<div class="vitals-chart" intersection:startLiveRefreshCycle>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the chart enters the viewport (action #1)
- `startLiveRefreshCycle` — custom: fetches sensor data and runs the chart's own refresh loop (action #2)

### 7.8 — multi

**Use case:** When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element)

**Behavioral breakdown:**
1. An onboarding step becomes visible → read the step's index (on the step)
2. The index must reach the matching dot in the progress rail, a different element → **handoff to Element B**
3. The dot receives the index → activates itself (on the dot)

**Element A (onboarding step):** `<section class="onboarding-step">`
```html
<section class="onboarding-step" intersection:getStepIndex>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the step becomes visible (action #1)
- `getStepIndex` — custom: returns the step's own index (action #1)

→ [handoff: Element A's action #1 output (step index) must reach the matching Element B dot to trigger action #3]

**Element B (progress rail dot):** `<span class="progress-dot">`
```html
<span class="progress-dot" ???:class_active_add></span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when this dot's step is visible
- `class_active_add` — activates the dot itself (action #3)

### 7.9 — multi

**Use case:** When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element)

**Behavioral breakdown:**
1. The property card scrolls into view → read the card's property id (on the card)
2. The property id must reach the matching map pin, a different element → **handoff to Element B**
3. The pin receives the id → enlarges itself (on the pin)

**Element A (property card):** `<div class="property-card">`
```html
<div class="property-card" intersection:getPropertyId>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the card enters the visible area (action #1)
- `getPropertyId` — custom: returns the card's own property id (action #1)

→ [handoff: Element A's action #1 output (property id) must reach the matching Element B pin to trigger action #3]

**Element B (map pin):** `<div class="map-pin">`
```html
<div class="map-pin" ???:class_enlarged_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when this pin's card is visible
- `class_enlarged_add` — enlarges the pin itself (action #3)

### 7.10 — single

**Use case:** When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast.

**Behavioral breakdown:**
1. The review section becomes visible → fetch the review scores (on the section)
2. Render the scores into the section itself (on the section)

**Element A (review section):** `<section class="reviews">`
```html
<section class="reviews" intersection:fetch_/api/review-scores:renderScores>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the section becomes visible (action #1)
- `fetch_/api/review-scores` — fetches the review scores (action #1)
- `renderScores` — custom: renders the scores into the section itself (action #2)

### 7.11 — single

**Use case:** When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place.

**Behavioral breakdown:**
1. The last slide becomes fully visible → detect the full intersection (on the slide)
2. Animate the slide's own best-value badge into place (on the slide)

**Element A (last slide):** `<div class="slide last">`
```html
<div class="slide last" intersection:animateBestValueBadge>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the slide becomes fully visible (action #1)
- `animateBestValueBadge` — custom: animates the slide's own badge into place (action #2)

### 7.12 — single

**Use case:** When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.

**Behavioral breakdown:**
1. The comments section approaches the viewport → detect the near-intersection (on the section)
2. Start loading the section's own comments in the background (on the section)

**Element A (comments section):** `<section class="comments">`
```html
<section class="comments" intersection:prefetchComments>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the section approaches the viewport (action #1)
- `prefetchComments` — custom: starts loading the section's own comments in the background (action #2)

### 7.13 — multi

**Use case:** When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element)

**Behavioral breakdown:**
1. The hero banner scrolls more than halfway out of view → detect the threshold crossing (on the hero)
2. A show signal must reach the compact sticky bar, a different element → **handoff to Element B**
3. The sticky bar receives the signal → appears at the top of the page (on the sticky bar)

**Element A (hero banner):** `<header class="hero">`
```html
<header class="hero" intersection:mostlyOutOfView>…</header>
```
**Chain breakdown:**
- `intersection` — trigger: the hero crosses the half-out-of-view threshold (action #1)
- `mostlyOutOfView` — custom: passes through only when more than half is out of view (action #1)

→ [handoff: Element A's action #1 (hero-hidden signal) must reach Element B to trigger action #3]

**Element B (sticky bar):** `<div class="sticky-hero">`
```html
<div class="sticky-hero" ???:class_visible_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the hero scrolls away
- `class_visible_add` — reveals the sticky bar itself (action #3)

### 7.14 — single

**Use case:** When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking.

**Behavioral breakdown:**
1. The job card becomes visible → start a dwell timer (on the card)
2. After a few seconds still visible → log the card as a seen impression (analytics write; no other element mutates)

**Element A (job listing card):** `<div class="job-card">`
```html
<div class="job-card" intersection:wait_2000:logSeenImpression>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the card becomes visible (action #1)
- `wait_2000` — waits two seconds (action #1)
- `logSeenImpression` — custom: logs the seen impression for ranking (action #2)

### 7.15 — multi

**Use case:** When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element)

**Behavioral breakdown:**
1. The document's end marker becomes visible inside the scroll box → the user has scrolled to the end (on the end marker)
2. An enable signal must reach the accept button outside the box, a different element → **handoff to Element B**
3. The accept button receives the signal → enables itself (on the button)

**Element A (document end marker):** `<div class="doc-end">`
```html
<div class="doc-end" intersection:documentFullyRead></div>
```
**Chain breakdown:**
- `intersection` — trigger: the end marker becomes visible (action #1)
- `documentFullyRead` — custom: produces the enable signal (action #1)

→ [handoff: Element A's action #1 (document-read signal) must reach Element B to trigger action #3]

**Element B (accept button):** `<button class="accept" disabled>`
```html
<button class="accept" disabled ???:setEnabled>Accept</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the document is fully read
- `setEnabled` — custom: removes the button's own `disabled` attribute (action #3)

### 7.16 — multi

**Use case:** When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element)

**Behavioral breakdown:**
1. The unread divider scrolls into view → collect the messages below the divider (on the divider)
2. The read-marking must reach those message elements, different elements → **handoff to Element B (each message below)**
3. Each message receives the signal → marks itself read, and the app reports the reads to the server (on the messages)

**Element A (unread divider):** `<div class="unread-divider">`
```html
<div class="unread-divider" intersection:getMessagesBelow>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the divider scrolls into view (action #1)
- `getMessagesBelow` — custom: returns the identifiers of the messages below the divider (action #1)

→ [handoff: Element A's action #1 output (message ids) must reach each Element B message to trigger action #3]

**Element B (chat message):** `<div class="message unread">`
```html
<div class="message unread" ???:markRead>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the divider reports this message below it
- `markRead` — custom: removes the message's own `unread` class and reports the read to the server (action #3)

### 7.17 — single

**Use case:** When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one.

**Behavioral breakdown:**
1. The floor plan scrolls into view → detect the intersection (on the floor plan)
2. Fade in the floor plan's own entrance labels one by one (on the floor plan)

**Element A (floor plan):** `<div class="floor-plan">`
```html
<div class="floor-plan" intersection:fadeInEntranceLabels>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the floor plan enters the viewport (action #1)
- `fadeInEntranceLabels` — custom: fades in the floor plan's own entrance labels in sequence (action #2)

### 7.18 — single

**Use case:** When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once.

**Behavioral breakdown:**
1. The impact section enters the viewport → detect the first intersection (on the section)
2. Play the section's own animated infographic exactly once, never again on later passes (on the section)

**Element A (impact section):** `<section class="donor-impact">`
```html
<section class="donor-impact" intersection:playInfographicOnce>…</section>
```
**Chain breakdown:**
- `intersection` — trigger: the section enters the viewport (action #1)
- `playInfographicOnce` — custom: plays the section's own infographic once and never again (action #2)

### 7.19 — single

**Use case:** A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte)

**Behavioral breakdown:**
1. The card enters the viewport for the first time → add the entrance class so it fades and slides up (on the card)
2. On later viewport passes → the card does not re-animate (on the card itself)

**Element A (card):** `<div class="anim-card">`
```html
<div class="anim-card" intersection:animateInOnce>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the card enters the viewport (action #1)
- `animateInOnce` — custom: adds the card's own fade-slide entrance class on first intersection only (actions #1–2)

### 7.20 — single

**Use case:** When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch.

**Behavioral breakdown:**
1. The listings strip enters the viewport → detect the intersection (on the strip)
2. Lazy-load all of the strip's own images in one batch (on the strip)

**Element A (listings strip):** `<div class="listings-strip">`
```html
<div class="listings-strip" intersection:lazyLoadImagesBatch>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the strip enters the viewport (action #1)
- `lazyLoadImagesBatch` — custom: loads the strip's own images in a single batch (action #2)

### 7.21 — multi

**Use case:** When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element)

**Behavioral breakdown:**
1. The page player leaves the viewport → detect the exit (on the player)
2. A dock signal must reach the mini player, a different element → **handoff to Element B**
3. The mini player receives the signal → docks itself in the corner (on the mini player)

**Element A (page player):** `<div class="recipe-player">`
```html
<div class="recipe-player" intersection:leftViewport>…</div>
```
**Chain breakdown:**
- `intersection` — trigger: the player leaves the viewport (action #1)
- `leftViewport` — custom: passes through only when the player is no longer visible (action #1)

→ [handoff: Element A's action #1 (player-hidden signal) must reach Element B to trigger action #3]

**Element B (mini player):** `<div class="mini-player">`
```html
<div class="mini-player" ???:class_docked_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the page player leaves view
- `class_docked_add` — docks the mini player itself in the corner (action #3)
# 8. Attribute & DOM mutation

### 8.1 — single

**Use case:** When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward.

**Behavioral breakdown:**
1. The menu button's `aria-expanded` attribute flips to true → detect the attribute change (on the button)
2. Rotate the button's own chevron icon upward (on the button itself)

**Element A (menu button):** `<button class="menu-button">`
```html
<button class="menu-button" attr_aria-expanded:rotateChevronWhenExpanded>…</button>
```
**Chain breakdown:**
- `attr_aria-expanded` — trigger: MutationObserver on the button's `aria-expanded` attribute (action #1)
- `rotateChevronWhenExpanded` — custom: rotates the button's own chevron when the attribute reads true (action #2)

### 8.2 — multi

**Use case:** When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element)

**Behavioral breakdown:**
1. The root element's `data-theme` attribute switches to dark → read the new theme (on the root element)
2. The theme must reach every chart, each a different element → **handoff to Element B (each chart)**
3. Each chart receives the theme → re-renders itself with dark colors (on each chart)

**Element A (root element):** `<html data-theme="light">`
```html
<html data-theme="light" attr_data-theme:getThemeValue>…</html>
```
**Chain breakdown:**
- `attr_data-theme` — trigger: MutationObserver on the root's `data-theme` attribute (action #1)
- `getThemeValue` — custom: returns the new theme value (action #1)

→ [handoff: Element A's action #1 output (theme value) must reach every chart element to trigger action #3]

**Element B (chart):** `<div class="chart">`
```html
<div class="chart" ???:renderWithTheme>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the theme changes
- `renderWithTheme` — custom: re-renders the chart itself with the given theme colors (action #3)

### 8.3 — single

**Use case:** When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye.

**Behavioral breakdown:**
1. The badge's text content changes → detect the text mutation (on the badge)
2. Pulse the badge itself briefly (on the badge)

**Element A (badge):** `<span class="badge">`
```html
<span class="badge" attr:pulseOnTextChange>3</span>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the badge (trigger approximation: text changes require a characterData/childList observer, the closest observer portal is `attr`) (action #1)
- `pulseOnTextChange` — custom: plays the badge's own pulse animation when its count text changes (action #2)

### 8.4 — multi

**Use case:** When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element)

**Behavioral breakdown:**
1. The third-party launcher button appears in the page → detect the DOM insertion (on the observed container; trigger approximation: subtree childList observer)
2. A hide signal must reach the site's help link, a different element → **handoff to Element B**
3. The help link receives the signal → hides itself to avoid overlap (on the help link)

**Element A (page container being watched):** `<div id="page">`
```html
<div id="page" attr:detectChatWidgetInjection>…</div>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the page container (trigger approximation: detecting an injected node requires a childList subtree observer variant) (action #1)
- `detectChatWidgetInjection` — custom: passes through when the third-party launcher node appears (action #1)

→ [handoff: Element A's action #1 (widget-present signal) must reach Element B to trigger action #3]

**Element B (site help link):** `<a class="help-link">`
```html
<a class="help-link" ???:class_hidden_add>Help</a>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the widget is detected
- `class_hidden_add` — hides the help link itself (action #3)

### 8.5 — single

**Use case:** When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere.

**Behavioral breakdown:**
1. The live region's text content changes → detect the new text (on the region; trigger approximation: characterData observer)
2. Announce the new text via the region's own live-region semantics without touching focus (on the region itself)

**Element A (live region):** `<div class="live-region" aria-live="polite">`
```html
<div class="live-region" aria-live="polite" attr:announceNewText>…</div>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the region (trigger approximation: text changes require a characterData observer) (action #1)
- `announceNewText` — custom: announces the region's own new text without moving focus (action #2)

### 8.6 — single

**Use case:** When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color.

**Behavioral breakdown:**
1. The button's `disabled` attribute is removed → detect the attribute change (on the button)
2. Animate the button itself to its enabled color (on the button)

**Element A (submit button):** `<button class="submit">`
```html
<button class="submit" attr_disabled:animateWhenEnabled>Submit</button>
```
**Chain breakdown:**
- `attr_disabled` — trigger: MutationObserver on the button's `disabled` attribute (action #1)
- `animateWhenEnabled` — custom: animates the button's own color when `disabled` is gone (action #2)

### 8.7 — multi

**Use case:** When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element)

**Behavioral breakdown:**
1. A video player's `data-state` attribute changes to buffering → detect the change (on the video player)
2. A show signal must reach the global spinner, a different element → **handoff to Element B**
3. The spinner receives the signal → appears (on the spinner)

**Element A (video player):** `<div class="course-video" data-state="playing">`
```html
<div class="course-video" data-state="playing" attr_data-state:ifBuffering>…</div>
```
**Chain breakdown:**
- `attr_data-state` — trigger: MutationObserver on the player's `data-state` attribute (action #1)
- `ifBuffering` — custom: passes through only when the new state is "buffering" (action #1)

→ [handoff: Element A's action #1 (buffering signal) must reach Element B to trigger action #3]

**Element B (global spinner):** `<div class="global-spinner">`
```html
<div class="global-spinner" ???:class_visible_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when any player buffers
- `class_visible_add` — reveals the spinner itself (action #3)

### 8.8 — multi

**Use case:** When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element)

**Behavioral breakdown:**
1. An `error` class is added to any field → detect the class change and read which fields currently have errors (on the form watching its own fields; trigger approximation: subtree attribute observer)
2. The error list must reach the summary banner, a different element → **handoff to Element B**
3. The banner receives the list → lists every field needing attention (on the banner)

**Element A (form):** `<form class="long-form">`
```html
<form class="long-form" attr_class:collectErroredFields>…</form>
```
**Chain breakdown:**
- `attr_class` — trigger: MutationObserver for class changes (trigger approximation: watching any field requires a subtree observer rooted at the form) (action #1)
- `collectErroredFields` — custom: gathers the labels of all currently errored fields (action #1)

→ [handoff: Element A's action #1 output (errored field list) must reach Element B to trigger action #3]

**Element B (summary banner):** `<div class="error-summary">`
```html
<div class="error-summary" ???:renderErrorList>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the error set changes
- `renderErrorList` — custom: lists every field needing attention in the banner itself (action #3)

### 8.9 — multi

**Use case:** When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element)

**Behavioral breakdown:**
1. The page's `lang` attribute changes → read the new locale (on the root element)
2. The locale must reach every date picker and number format, each a different element → **handoff to Element B (each formatted element)**
3. Each date picker / number format receives the locale → re-renders itself with the new locale rules (on each element)

**Element A (page root):** `<html lang="en">`
```html
<html lang="en" attr_lang:getLocaleValue>…</html>
```
**Chain breakdown:**
- `attr_lang` — trigger: MutationObserver on the root's `lang` attribute (action #1)
- `getLocaleValue` — custom: returns the new locale string (action #1)

→ [handoff: Element A's action #1 output (locale) must reach every date picker and number format to trigger action #3]

**Element B (date picker / number format):** `<input class="date-picker">` / `<span class="number">`
```html
<input class="date-picker" ???:rerenderWithLocale>
<span class="number" ???:rerenderWithLocale>…</span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the locale changes
- `rerenderWithLocale` — custom: re-renders the element itself under the new locale rules (action #3)

### 8.10 — single

**Use case:** When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match.

**Behavioral breakdown:**
1. The row's `data-selected` attribute becomes true → detect the attribute change (on the row)
2. Highlight the row's own background (on the row itself)

**Element A (matrix row):** `<tr data-selected="false">`
```html
<tr data-selected="false" attr_data-selected:highlightWhenSelected>…</tr>
```
**Chain breakdown:**
- `attr_data-selected` — trigger: MutationObserver on the row's `data-selected` attribute (action #1)
- `highlightWhenSelected` — custom: highlights the row's own background when the attribute reads true (action #2)

### 8.11 — single

**Use case:** When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change.

**Behavioral breakdown:**
1. The ticker cell's content changes → compare the new value with the old (on the cell; trigger approximation: characterData observer)
2. Flash the cell itself green for an uptick, red for a downtick (on the cell)

**Element A (ticker cell):** `<td class="ticker-cell">`
```html
<td class="ticker-cell" attr:flashDirectionOnChange>…</td>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the cell (trigger approximation: content changes require a characterData/childList observer) (action #1)
- `flashDirectionOnChange` — custom: flashes the cell's own background green or red by comparing old and new values (action #2)

### 8.12 — multi

**Use case:** When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element)

**Behavioral breakdown:**
1. A browser extension injects a node → detect the DOM insertion (on the observed app container; trigger approximation: subtree childList observer)
2. A nudge signal must reach the app's content element, a different element → **handoff to Element B**
3. The content element receives the signal → nudges itself so nothing overlaps (on the content element)

**Element A (app container being watched):** `<div id="app">`
```html
<div id="app" attr:detectInjectedNode>…</div>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the app container (trigger approximation: subtree childList observation) (action #1)
- `detectInjectedNode` — custom: passes through when an external node is injected (action #1)

→ [handoff: Element A's action #1 (injection signal) must reach Element B to trigger action #3]

**Element B (content element):** `<main class="reader-content">`
```html
<main class="reader-content" ???:nudgeLayout>…</main>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when an injection is detected
- `nudgeLayout` — custom: shifts the content element's own layout to clear the overlap (action #3)

### 8.13 — multi

**Use case:** When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element)

**Behavioral breakdown:**
1. The step indicator's `data-current-step` attribute moves → read the new step name (on the step indicator)
2. The step name must reach the page heading, a different element → **handoff to Element B**
3. The heading receives the name → announces the new step (on the heading)

**Element A (step indicator):** `<div class="step-indicator" data-current-step="1">`
```html
<div class="step-indicator" data-current-step="1" attr_data-current-step:getCurrentStepName>…</div>
```
**Chain breakdown:**
- `attr_data-current-step` — trigger: MutationObserver on the indicator's `data-current-step` attribute (action #1)
- `getCurrentStepName` — custom: resolves the new step's human-readable name (action #1)

→ [handoff: Element A's action #1 output (step name) must reach Element B to trigger action #3]

**Element B (page heading):** `<h1 class="page-heading">`
```html
<h1 class="page-heading" ???:text>…</h1>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the step changes
- `text` — writes the incoming step name into the heading itself, announcing it (action #3)

### 8.14 — multi

**Use case:** When a carousel slide gains the active class, its caption text fades in while the previous caption hides.

**Behavioral breakdown:**
1. A slide gains the `active` class → fade in the slide's own caption (on the slide)
2. The previous slide's caption must hide — the previous slide is a different element → **handoff to Element B**
3. The previous slide receives the signal → hides its own caption (on the previous slide)

**Element A (newly active slide):** `<div class="slide">`
```html
<div class="slide" attr_class:fadeInCaptionWhenActive>…</div>
```
**Chain breakdown:**
- `attr_class` — trigger: MutationObserver on the slide's class (action #1)
- `fadeInCaptionWhenActive` — custom: when `active` was added, fades in the slide's own caption (action #1)

→ [handoff: Element A's action #1 (slide-activated signal) must reach the previously active Element B to trigger action #3]

**Element B (previous slide):** `<div class="slide">`
```html
<div class="slide" ???:hideCaption>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when another slide activates
- `hideCaption` — custom: hides this slide's own caption (action #3)

### 8.15 — single

**Use case:** When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article.

**Behavioral breakdown:**
1. The ad creative is removed from the container → detect the child removal (on the container; trigger approximation: childList observer)
2. Collapse the container itself so no empty gap remains (on the container)

**Element A (ad container):** `<div class="ad-container">`
```html
<div class="ad-container" attr:collapseIfEmpty>…</div>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the container (trigger approximation: child removal requires a childList observer) (action #1)
- `collapseIfEmpty` — custom: collapses the container itself when its creative is stripped (action #2)

### 8.16 — multi

**Use case:** When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element)

**Behavioral breakdown:**
1. The root element's `data-breakpoint` attribute changes → read the new breakpoint (on the root element)
2. The breakpoint must reach the navigation element, a different element → **handoff to Element B**
3. The navigation receives the breakpoint → swaps itself between drawer and menubar (on the navigation)

**Element A (root element):** `<html data-breakpoint="mobile">`
```html
<html data-breakpoint="mobile" attr_data-breakpoint:getBreakpoint>…</html>
```
**Chain breakdown:**
- `attr_data-breakpoint` — trigger: MutationObserver on the root's `data-breakpoint` attribute (action #1)
- `getBreakpoint` — custom: returns the new breakpoint value (action #1)

→ [handoff: Element A's action #1 output (breakpoint) must reach Element B to trigger action #3]

**Element B (navigation):** `<nav class="main-nav">`
```html
<nav class="main-nav" ???:swapNavigationMode>…</nav>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the breakpoint changes
- `swapNavigationMode` — custom: swaps the navigation itself between drawer and menubar (action #3)

### 8.17 — single

**Use case:** When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice.

**Behavioral breakdown:**
1. The `hidden` class is added to the comment → detect the class change (on the comment)
2. Collapse the comment itself into its own removed-content notice (on the comment)

**Element A (flagged comment):** `<div class="comment">`
```html
<div class="comment" attr_class:collapseWhenHidden>…</div>
```
**Chain breakdown:**
- `attr_class` — trigger: MutationObserver on the comment's class (action #1)
- `collapseWhenHidden` — custom: collapses the comment into its own removed-content notice when `hidden` appears (action #2)

### 8.18 — single

**Use case:** When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order.

**Behavioral breakdown:**
1. The table's rows are reordered in the DOM → detect the childList mutation (on the table body; trigger approximation: childList observer)
2. Rewrite the row numbers within the table body itself (on the table body)

**Element A (table body):** `<tbody>`
```html
<tbody attr:renumberRowsOnReorder>…</tbody>
```
**Chain breakdown:**
- `attr` — trigger: MutationObserver on the table body (trigger approximation: row reordering requires a childList observer) (action #1)
- `renumberRowsOnReorder` — custom: rewrites the table body's own row numbers to match the new order (action #2)

### 8.19 — single

**Use case:** When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant.

**Behavioral breakdown:**
1. The hero's `data-experiment` attribute is set → read the assigned variant (on the hero)
2. Swap the hero itself to the matching variant (on the hero)

**Element A (hero):** `<section class="hero">`
```html
<section class="hero" attr_data-experiment:swapToVariant>…</section>
```
**Chain breakdown:**
- `attr_data-experiment` — trigger: MutationObserver on the hero's `data-experiment` attribute (action #1)
- `swapToVariant` — custom: swaps the hero's own content to the matching variant (action #2)

### 8.20 — single

**Use case:** When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye.

**Behavioral breakdown:**
1. The field's `type` attribute toggles → detect the change and read the new type (on the field component)
2. Swap the component's own visibility icon between open and closed eye (on the field component)

**Element A (password field component):** `<div class="password-field">`
```html
<div class="password-field" attr_type:swapVisibilityIcon>…</div>
```
**Chain breakdown:**
- `attr_type` — trigger: MutationObserver for the `type` attribute within the component (action #1)
- `swapVisibilityIcon` — custom: swaps the component's own eye icon to match the type (action #2)

### 8.21 — single

**Use case:** When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading.

**Behavioral breakdown:**
1. The image's `src` attribute is set → start loading (on the image)
2. The image finishes loading (`load` event) → fade the image itself in (on the image)

**Element A (lazy image):** `<img class="lazy">`
```html
<img class="lazy" attr_src:markLoading load:class_loaded_add>…</img>
```
**Chain breakdown:**
- `attr_src` — trigger: MutationObserver on the image's `src` attribute (action #1)
- `markLoading` — custom: marks the image's own loading state (action #1)
- `load` — trigger: the file finishes loading (action #2)
- `class_loaded_add` — adds the fade-in class to the image itself (action #2)

### 8.22 — multi

**Use case:** When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element)

**Behavioral breakdown:**
1. The page element's `data-ready` attribute is set → detect readiness (on the page element)
2. An init signal must reach each queued UI enhancement target, different elements → **handoff to Element B (each enhancement target)**
3. Each target receives the signal → initializes its own enhancement, in order (on each target)

**Element A (page element):** `<body data-ready="">`
```html
<body data-ready="" attr_data-ready:pageReady>…</body>
```
**Chain breakdown:**
- `attr_data-ready` — trigger: MutationObserver on the page's `data-ready` attribute (action #1)
- `pageReady` — custom: produces the ordered init signal (action #1)

→ [handoff: Element A's action #1 (ready signal) must reach each queued enhancement target to trigger action #3, in order]

**Element B (enhancement target):** `<div class="enhance">`
```html
<div class="enhance" ???:initializeEnhancement>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the page signals ready
- `initializeEnhancement` — custom: initializes the target's own enhancement (action #3)
# 9. Resize & viewport

### 9.1 — single

**Use case:** When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.

**Behavioral breakdown:**
1. The window narrows below tablet width → detect the viewport crossing (global trigger, chain lives on the chart grid)
2. Reflow the chart grid itself from three columns to one (on the grid)

**Element A (chart grid):** `<div class="chart-grid">`
```html
<div class="chart-grid" resize:reflowColumnsForViewport>…</div>
```
**Chain breakdown:**
- `resize` — trigger: window resize (trigger approximation: window-level listener; the grid observes viewport width) (action #1)
- `reflowColumnsForViewport` — custom: reflows the grid's own columns to one when below tablet width (action #2)

### 9.2 — single

**Use case:** When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element)

**Behavioral breakdown:**
1. The phone rotates → detect the orientation/viewport change (global trigger, chain lives on the player)
2. Expand the player itself to fill the new orientation (on the player)

**Element A (video player):** `<div class="lesson-player">`
```html
<div class="lesson-player" resize:expandToOrientation>…</div>
```
**Chain breakdown:**
- `resize` — trigger: window resize caused by rotation (trigger approximation: the window resize event stands in for orientation change) (action #1)
- `expandToOrientation` — custom: expands the player itself to fill the new orientation (action #2)

### 9.3 — multi

**Use case:** When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold.

**Behavioral breakdown:**
1. User drags the sidebar wider → measure the sidebar's new width (on the sidebar)
2. The new width must reach the code editor, a different element → **handoff to Element B**
3. The editor receives the width → shrinks itself and hides its own minimap below the threshold (on the editor)

**Element A (sidebar):** `<aside class="console-sidebar">`
```html
<aside class="console-sidebar" resize:getWidth>…</aside>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the sidebar as it is dragged (action #1)
- `getWidth` — custom: returns the sidebar's own new width (action #1)

→ [handoff: Element A's action #1 output (sidebar width) must reach Element B to trigger action #3]

**Element B (code editor):** `<div class="code-editor">`
```html
<div class="code-editor" ???:shrinkAndMaybeHideMinimap>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the sidebar width changes
- `shrinkAndMaybeHideMinimap` — custom: shrinks the editor itself and hides its own minimap under the threshold (action #3)

### 9.4 — single

**Use case:** When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions.

**Behavioral breakdown:**
1. The chart container is resized → detect the new dimensions (on the container)
2. Redraw the container's own chart to fit (on the container itself)

**Element A (chart container):** `<div class="chart-container">`
```html
<div class="chart-container" resize:redrawChartToFit>…</div>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the container (action #1)
- `redrawChartToFit` — custom: redraws the container's own chart at the new dimensions (action #2)

### 9.5 — single

**Use case:** When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed.

**Behavioral breakdown:**
1. The window resizes → detect the new viewport size (global trigger, chain lives on the canvas)
2. Scale the canvas itself, letterboxing to keep its aspect ratio (on the canvas)

**Element A (game canvas):** `<canvas class="game-canvas">`
```html
<canvas class="game-canvas" resize:letterboxScale>…</canvas>
```
**Chain breakdown:**
- `resize` — trigger: window resize (trigger approximation: window-level listener) (action #1)
- `letterboxScale` — custom: scales the canvas itself, preserving aspect ratio with letterboxing (action #2)

### 9.6 — multi

**Use case:** When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element)

**Behavioral breakdown:**
1. The textarea is dragged taller → detect the new height (on the textarea)
2. The new height must reach the character counter, a different element → **handoff to Element B**
3. The counter receives the height → repositions itself beneath the textarea (on the counter)

**Element A (feedback textarea):** `<textarea class="feedback">`
```html
<textarea class="feedback" resize:getHeight>…</textarea>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the textarea (action #1)
- `getHeight` — custom: returns the textarea's own new height (action #1)

→ [handoff: Element A's action #1 output (textarea height) must reach Element B to trigger action #3]

**Element B (character counter):** `<div class="char-counter">`
```html
<div class="char-counter" ???:repositionBelow>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the textarea height changes
- `repositionBelow` — custom: repositions the counter itself beneath the textarea (action #3)

### 9.7 — single

**Use case:** When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size.

**Behavioral breakdown:**
1. The gallery container grows wider → detect the new width (on the container)
2. Add columns within the container's own layout so thumbnails keep their minimum size (on the container itself)

**Element A (gallery container):** `<div class="gallery">`
```html
<div class="gallery" resize:adjustColumnsToWidth>…</div>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the container (action #1)
- `adjustColumnsToWidth` — custom: adds/removes the container's own columns for comfortable thumbnails (action #2)

### 9.8 — single

**Use case:** When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)

**Behavioral breakdown:**
1. The viewport height shrinks (on-screen keyboard) → detect the viewport change (global trigger, chain lives on the button)
2. Keep the sticky button itself visible above the keyboard (on the button)

**Element A (sticky submit button):** `<button class="submit sticky">`
```html
<button class="submit sticky" resize:keepAboveKeyboard>Submit</button>
```
**Chain breakdown:**
- `resize` — trigger: window/viewport resize (trigger approximation: window-level listener; the visual viewport shrinks) (action #1)
- `keepAboveKeyboard` — custom: repositions the button itself so it stays visible (action #2)

### 9.9 — single

**Use case:** When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element)

**Behavioral breakdown:**
1. The map element is resized → detect the new dimensions (on the map)
2. Recenter the map itself so the selected store stays in view (on the map itself)

**Element A (locator map):** `<div class="locator-map">`
```html
<div class="locator-map" resize:recenterOnSelectedStore>…</div>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the map element (action #1)
- `recenterOnSelectedStore` — custom: recenters the map itself on the selected store (action #2)

### 9.10 — single

**Use case:** When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width.

**Behavioral breakdown:**
1. User drags the divider → compute the proposed pane widths (on the split view)
2. Clamp each of the split view's own panes to its minimum width (on the split view itself)

**Element A (split view):** `<div class="split-view">`
```html
<div class="split-view" drag:clampPaneWidths>…</div>
```
**Chain breakdown:**
- `drag` — trigger: the divider is dragged (action #1)
- `clampPaneWidths` — custom: resizes the split view's own panes, stopping each at its minimum width (action #2)

### 9.11 — single

**Use case:** When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.

**Behavioral breakdown:**
1. The kiosk rotates to portrait → detect the orientation/viewport change (global trigger, chain lives on the kiosk layout)
2. Switch the kiosk's own layout to stacked single-column (on the kiosk layout itself)

**Element A (kiosk layout):** `<div class="kiosk">`
```html
<div class="kiosk" resize:switchToStackedLayout>…</div>
```
**Chain breakdown:**
- `resize` — trigger: window resize from rotation (trigger approximation: window resize stands in for orientation change) (action #1)
- `switchToStackedLayout` — custom: switches the kiosk's own layout to single-column in portrait (action #2)

### 9.12 — single

**Use case:** A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte)

**Behavioral breakdown:**
1. The badge's width changes → read its own width (on the badge)
2. When space runs out → swap the badge's own full label for its compact icon (on the badge itself)

**Element A (badge):** `<span class="badge">`
```html
<span class="badge" resize:swapLabelForIcon>Label</span>
```
**Chain breakdown:**
- `resize` — trigger: ResizeObserver on the badge's own width (action #1)
- `swapLabelForIcon` — custom: swaps the badge's own full label for its compact icon when too narrow (action #2)
# 10. Scroll

### 10.1 — single

**Use case:** As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element)

**Behavioral breakdown:**
1. User scrolls the page → compute reading depth from document scroll metrics (global scroll trigger, chain lives on the progress bar)
2. Fill the progress bar itself in proportion to that depth (on the progress bar)

**Element A (progress bar):** `<div class="reading-progress">`
```html
<div class="reading-progress" scroll:computeReadingDepth:style_--progress>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: page scroll (trigger approximation: window-level scroll listener; the mutation still lands on the bar itself) (action #1)
- `computeReadingDepth` — custom: returns scroll fraction of the document (0–1) (action #1)
- `style_--progress` — sets the bar's own `--progress` custom property, filling itself (action #2)

### 10.2 — multi

**Use case:** When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element)

**Behavioral breakdown:**
1. User scrolls the terms document to its end → detect scroll-bottom (on the terms document)
2. An enable signal must reach the accept button, a different element → **handoff to Element B**
3. The accept button receives the signal → enables itself (on the button)

**Element A (terms document):** `<div class="terms-document">`
```html
<div class="terms-document" scroll:ifScrolledToEnd>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: scrolling inside the terms document (action #1)
- `ifScrolledToEnd` — custom: passes through only when scrollTop reaches the bottom (action #1)

→ [handoff: Element A's action #1 (scrolled-to-end signal) must reach Element B to trigger action #3]

**Element B (accept button):** `<button class="accept" disabled>`
```html
<button class="accept" disabled ???:setEnabled>Accept</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the terms are fully scrolled
- `setEnabled` — custom: removes the button's own `disabled` attribute (action #3)

### 10.3 — multi

**Use case:** When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element)

**Behavioral breakdown:**
1. User scrolls the page past the hero → detect that the hero's bottom has passed (global scroll trigger, chain reads the hero's position)
2. A pin signal must reach the book-a-tour bar, a different element → **handoff to Element B**
3. The bar receives the signal → pins itself to the top of the screen (on the bar)

**Element A (page scroll watcher):** `<div class="listing-page">`
```html
<div class="listing-page" scroll:ifPastHero>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: page scroll (action #1)
- `ifPastHero` — custom: passes through only when scroll position passes the hero's bottom edge (action #1)

→ [handoff: Element A's action #1 (past-hero signal) must reach Element B to trigger action #3]

**Element B (book-a-tour bar):** `<div class="book-tour-bar">`
```html
<div class="book-tour-bar" ???:class_pinned_add>Book a tour</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the hero scrolls past
- `class_pinned_add` — pins the bar itself to the top (action #3)

### 10.4 — single

**Use case:** When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element)

**Behavioral breakdown:**
1. User scrolls the feed → detect scroll direction and position (global scroll trigger, chain lives on the pill)
2. On fast upward scroll → show the pill itself; near the top → hide it again (on the pill)

**Element A (back-to-top pill):** `<button class="back-to-top">`
```html
<button class="back-to-top" scroll:toggleVisibilityByScroll>↑ Top</button>
```
**Chain breakdown:**
- `scroll` — trigger: page scroll (trigger approximation: window-level scroll listener) (action #1)
- `toggleVisibilityByScroll` — custom: shows the pill itself on fast upward scroll, hides it near the top (action #2)

### 10.5 — single

**Use case:** When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping.

**Behavioral breakdown:**
1. User scrolls the chat window to its oldest loaded message → detect scroll-top (on the chat window)
2. Fetch earlier history and prepend it inside the chat window itself, adjusting its own scroll position so the view does not jump (on the chat window)

**Element A (chat window):** `<div class="chat-window">`
```html
<div class="chat-window" scroll:ifAtOldestMessage:fetchAndPrependHistory>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: scrolling inside the chat window (action #1)
- `ifAtOldestMessage` — custom: passes through only at the oldest loaded message (action #1)
- `fetchAndPrependHistory` — custom: fetches earlier history, prepends it to the window itself, and holds the window's own scroll position steady (action #2)

### 10.6 — single

**Use case:** When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible.

**Behavioral breakdown:**
1. User scrolls the spreadsheet horizontally → detect the horizontal offset (on the spreadsheet)
2. Keep the spreadsheet's own first column frozen against its own scroll offset (on the spreadsheet)

**Element A (spreadsheet):** `<div class="sheet-scroll">`
```html
<div class="sheet-scroll" scroll:freezeFirstColumn>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: horizontal scrolling inside the spreadsheet (action #1)
- `freezeFirstColumn` — custom: offsets the spreadsheet's own first column so it stays visible (action #2)

### 10.7 — single

**Use case:** When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card.

**Behavioral breakdown:**
1. User scrolls the carousel row and stops → detect the scroll pause (on the carousel row)
2. Snap the row's own scroll position to center its own nearest product card (on the carousel row)

**Element A (carousel row):** `<div class="carousel-row">`
```html
<div class="carousel-row" scrollend:snapToNearestCard>…</div>
```
**Chain breakdown:**
- `scrollend` — trigger: scrolling pauses/ends on the row (action #1)
- `snapToNearestCard` — custom: adjusts the row's own scroll position to center its nearest card (action #2)

### 10.8 — multi

**Use case:** When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element)

**Behavioral breakdown:**
1. User scrolls the lyrics page → pause the page's own auto-follow behavior (on the lyrics page)
2. Resume requires the jump-to-current-line button, a different element → **handoff to Element B**
3. The button receives the paused state → shows itself as available (on the button); when pressed it hands a resume signal back → **return handoff to Element A**
4. The lyrics page receives the resume signal → resumes auto-follow (on the lyrics page)

**Element A (lyrics page):** `<div class="lyrics-page">`
```html
<div class="lyrics-page" scroll:pauseAutoFollow>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: user scrolls the lyrics page (action #1)
- `pauseAutoFollow` — custom: pauses the page's own auto-follow tracking (action #1)

→ [handoff: Element A's action #1 (auto-follow-paused state) must reach Element B to trigger action #3]
→ [handoff: Element B's press (resume signal) must reach Element A to trigger action #4 — e.g. a second chain `???:resumeAutoFollow` on Element A, deferred to Step 3.5]

**Element B (jump-to-current-line button):** `<button class="jump-to-line">`
```html
<button class="jump-to-line" ???:class_available_add>Jump to current line</button>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when auto-follow pauses
- `class_available_add` — reveals the button itself as available (action #3)

### 10.9 — single

**Use case:** When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll.

**Behavioral breakdown:**
1. User scrolls the page → detect scroll direction (on the navigation bar itself, using the global scroll event)
2. If scrolling down → add a `collapsed` class to the navigation bar (on the nav bar)
3. If scrolling up → remove the `collapsed` class from the navigation bar (on the nav bar)

**Element A (navigation bar):** `<nav>`
```html
<nav scroll:detectScrollDirection:class_collapsed>…</nav>
```
**Chain breakdown:**
- `scroll` — trigger: global scroll event, but the attribute lives on the nav element (action #1)
- `detectScrollDirection` — custom: compares current vs. previous scroll position, returns `true` (down) or `false` (up) (action #1)
- `class_collapsed` — toggles the `collapsed` class based on the boolean input (actions #2–3)

### 10.10 — multi

**Use case:** When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element)

**Behavioral breakdown:**
1. User scrolls the code panel → compute the current scroll ratio / section (on the code panel)
2. The scroll position must reach the explanation pane, a different element → **handoff to Element B**
3. The explanation pane receives the position → scrolls itself in sync to the relevant section (on the explanation pane)

**Element A (code panel):** `<div class="code-panel">`
```html
<div class="code-panel" scroll:getScrollRatio>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: scrolling inside the code panel (action #1)
- `getScrollRatio` — custom: returns the panel's own scroll ratio and active section (action #1)

→ [handoff: Element A's action #1 output (scroll ratio / section) must reach Element B to trigger action #3]

**Element B (explanation pane):** `<div class="explanation-pane">`
```html
<div class="explanation-pane" ???:syncScrollTo>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when Element A scrolls
- `syncScrollTo` — custom: scrolls the pane itself to the matching section (action #3)

### 10.11 — multi

**Use case:** While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element)

**Behavioral breakdown:**
1. User scrolls inside the modal → keep the modal's own scroll handling internal (on the modal)
2. A scroll-lock must reach the page body behind the modal, a different element → **handoff to Element B**
3. The body receives the lock → disables its own scrolling while the modal is open (on the body)

**Element A (modal):** `<div class="modal" role="dialog">`
```html
<div class="modal" role="dialog" scroll:containScroll>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: scrolling inside the modal (action #1)
- `containScroll` — custom: keeps the scroll gesture contained within the modal itself (action #1)

→ [handoff: Element A's action #1 (scroll-lock signal while open) must reach Element B to trigger action #3]

**Element B (page body):** `<body>`
```html
<body ???:style_overflow_hidden>…</body>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires while the modal is open
- `style_overflow_hidden` — sets `overflow: hidden` on the body itself, locking page scroll (action #3)

### 10.12 — multi

**Use case:** When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element)

**Behavioral breakdown:**
1. User scrolls the report → detect which chapter heading the position has passed (on the report scroller, reading its own headings)
2. The chapter name must reach the corner label, a different element → **handoff to Element B**
3. The corner label receives the name → updates its own text (on the label)

**Element A (report scroller):** `<div class="annual-report">`
```html
<div class="annual-report" scroll:getCurrentChapter>…</div>
```
**Chain breakdown:**
- `scroll` — trigger: scrolling inside the report (action #1)
- `getCurrentChapter` — custom: resolves which of the report's own chapter headings the scroll has passed (action #1)

→ [handoff: Element A's action #1 output (chapter name) must reach Element B to trigger action #3]

**Element B (corner label):** `<div class="chapter-label">`
```html
<div class="chapter-label" ???:text>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the chapter changes
- `text` — writes the incoming chapter name into the label itself (action #3)
# 11. Animation & transition

### 11.1 — single

**Use case:** When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds.

**Behavioral breakdown:**
1. The toast's slide-in animation ends → detect the animationend (on the toast)
2. Start the toast's own dismiss timer (on the toast)
3. After a few seconds → dismiss the toast itself (on the toast)

**Element A (toast):** `<div class="toast">`
```html
<div class="toast" animationend:wait_3000:dismissSelf>…</div>
```
**Chain breakdown:**
- `animationend` — trigger: the slide-in animation completes (action #1)
- `wait_3000` — the dismiss timer: waits three seconds (action #2)
- `dismissSelf` — custom: dismisses the toast itself (action #3)

### 11.2 — single

**Use case:** When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.

**Behavioral breakdown:**
1. The modal's fade-out transition completes → detect the transitionend (on the modal)
2. Remove the modal element itself from the DOM (on the modal)

**Element A (modal):** `<div class="modal">`
```html
<div class="modal" transitionend:removeSelf>…</div>
```
**Chain breakdown:**
- `transitionend` — trigger: the fade-out transition completes (action #1)
- `removeSelf` — custom: removes the modal element itself from the page (action #2)

### 11.3 — multi

**Use case:** When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element)

**Behavioral breakdown:**
1. The skeleton shimmer completes another iteration → check whether data has arrived (on the skeleton)
2. The real content is a different element from the skeleton → **handoff to Element B**
3. The real content element receives the signal → swaps itself in, replacing the skeleton's place (on the content element)

**Element A (skeleton shimmer):** `<div class="skeleton">`
```html
<div class="skeleton" animationiteration:ifDataArrived>…</div>
```
**Chain breakdown:**
- `animationiteration` — trigger: each shimmer iteration completes (action #1)
- `ifDataArrived` — custom: passes through only once the real data has arrived (action #1)

→ [handoff: Element A's action #1 (data-ready signal) must reach Element B to trigger action #3]

**Element B (real content):** `<div class="real-content">`
```html
<div class="real-content" ???:swapIn>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the skeleton reports data ready
- `swapIn` — custom: reveals the content element itself in place of the skeleton (action #3)

### 11.4 — multi

**Use case:** When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element)

**Behavioral breakdown:**
1. The confetti animation ends → detect the animationend (on the confetti element)
2. A fade-in signal must reach the share buttons, different elements → **handoff to Element B**
3. The buttons receive the signal → fade themselves in (on the buttons)

**Element A (confetti element):** `<div class="confetti">`
```html
<div class="confetti" animationend:celebrationDone>…</div>
```
**Chain breakdown:**
- `animationend` — trigger: the confetti animation completes (action #1)
- `celebrationDone` — custom: produces the fade-in signal (action #1)

→ [handoff: Element A's action #1 (celebration-done signal) must reach Element B to trigger action #3]

**Element B (share buttons):** `<div class="share-certificate">`
```html
<div class="share-certificate" ???:class_fade-in_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the confetti ends
- `class_fade-in_add` — fades the buttons themselves in (action #3)

### 11.5 — single

**Use case:** When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element)

**Behavioral breakdown:**
1. The drawer's slide-open transition finishes → detect the transitionend (on the drawer)
2. Move focus to the drawer's own first link — a child of the drawer, mutated through the drawer's own chain (on the drawer itself)

**Element A (drawer menu):** `<nav class="drawer">`
```html
<nav class="drawer" transitionend:focusFirstLink>…</nav>
```
**Chain breakdown:**
- `transitionend` — trigger: the slide-open transition completes (action #1)
- `focusFirstLink` — custom: focuses the drawer's own first link (action #2)

### 11.6 — single

**Use case:** When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space.

**Behavioral breakdown:**
1. The spinner's animation is cancelled (request failed) → detect the animationcancel (on the spinner slot)
2. Replace the slot's own spinner with its own error card in the same space (on the spinner slot itself)

**Element A (spinner slot):** `<div class="spinner-slot">`
```html
<div class="spinner-slot" animationcancel:swapToErrorCard>…</div>
```
**Chain breakdown:**
- `animationcancel` — trigger: the spinner's animation is cancelled (action #1)
- `swapToErrorCard` — custom: replaces the slot's own spinner with its own error card (action #2)

### 11.7 — single

**Use case:** When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.

**Behavioral breakdown:**
1. The heart burst animation ends → detect the animationend (on the overlay)
2. Clean up the overlay itself so taps pass through again (on the overlay itself)

**Element A (heart burst overlay):** `<div class="heart-overlay">`
```html
<div class="heart-overlay" animationend:cleanupSelf>…</div>
```
**Chain breakdown:**
- `animationend` — trigger: the burst animation completes (action #1)
- `cleanupSelf` — custom: removes/clears the overlay itself so it no longer blocks taps (action #2)

### 11.8 — single

**Use case:** When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.

**Behavioral breakdown:**
1. The flash animation finishes → detect the animationend (on the row)
2. Settle the row's own background back to neutral (on the row itself)

**Element A (trading row):** `<tr class="price-row">`
```html
<tr class="price-row" animationend:class_flash_remove>…</tr>
```
**Chain breakdown:**
- `animationend` — trigger: the flash animation finishes (action #1)
- `class_flash_remove` — removes the row's own flash class, restoring its neutral background (action #2)

### 11.9 — single

**Use case:** When a badge's pulse animation completes three iterations, it stops so it does not distract from reading.

**Behavioral breakdown:**
1. The badge's pulse animation completes an iteration → count the iteration (on the badge)
2. After three iterations → stop the badge's own pulse animation (on the badge itself)

**Element A (badge):** `<span class="badge">`
```html
<span class="badge" animationiteration:stopAfterThreeIterations>…</span>
```
**Chain breakdown:**
- `animationiteration` — trigger: each pulse iteration completes (action #1)
- `stopAfterThreeIterations` — custom: removes the badge's own pulse class on the third iteration (actions #1–2)

### 11.10 — single

**Use case:** When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element)

**Behavioral breakdown:**
1. The transition between steps ends → detect the transitionend (on the new step panel)
2. Move focus to the step panel's own first field — a child mutated through the panel's own chain (on the step panel itself)

**Element A (new step panel):** `<section class="form-step">`
```html
<section class="form-step" transitionend:focusFirstField>…</section>
```
**Chain breakdown:**
- `transitionend` — trigger: the step transition completes (action #1)
- `focusFirstField` — custom: focuses the panel's own first field (action #2)

### 11.11 — single

**Use case:** When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)

**Behavioral breakdown:**
1. The list item's exit transition finishes → detect the transitionend (on the list item)
2. Remove the item's own data and the item itself, so it disappears from the list (on the item itself)

**Element A (list item):** `<li class="removable">`
```html
<li class="removable" transitionend:removeSelf>…</li>
```
**Chain breakdown:**
- `transitionend` — trigger: the exit transition completes (action #1)
- `removeSelf` — custom: removes the item itself and its backing data (action #2)

# 12. Navigation & history

### 12.1 — multi

**Use case:** When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element)

**Behavioral breakdown:**
1. The route changes to a new lesson → detect the navigation (on the course shell)
2. The previous video player must stop — a different element → **handoff to Element B**
3. The video player receives the signal → stops its own playback (on the player)
4. The lesson outline must scroll to the new item — another element → **handoff to Element C**
5. The outline receives the lesson → scrolls itself to the matching item (on the outline)

**Element A (course shell):** `<div class="course-shell">`
```html
<div class="course-shell" popstate:getLessonFromRoute>…</div>
```
**Chain breakdown:**
- `popstate` — trigger: route change (action #1)
- `getLessonFromRoute` — custom: extracts the new lesson identity from the route (action #1)

→ [handoff: Element A's action #1 (lesson change) must reach Element B to trigger action #3]
→ [handoff: Element A's action #1 output (new lesson) must reach Element C to trigger action #5]

**Element B (video player):** `<video class="lesson-video">`
```html
<video class="lesson-video" ???:stopPlayback>…</video>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the route changes
- `stopPlayback` — custom: stops the player's own playback (action #3)

**Element C (lesson outline):** `<nav class="lesson-outline">`
```html
<nav class="lesson-outline" ???:scrollToLesson>…</nav>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires with the new lesson identity
- `scrollToLesson` — custom: scrolls the outline itself to the matching item (action #5)

### 12.2 — single

**Use case:** When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history.

**Behavioral breakdown:**
1. The user presses back (popstate) → detect the navigation (global trigger, chain lives on the search panel)
2. Read the previous filter state from history (data flows: history state → filter values)
3. Restore the search panel's own controls to that filter state (on the panel itself)

**Element A (search panel):** `<form class="property-search">`
```html
<form class="property-search" popstate:readHistoryState:restoreFilterState>…</form>
```
**Chain breakdown:**
- `popstate` — trigger: the back button fires popstate (action #1)
- `readHistoryState` — custom: extracts the previous filter state from history.state (action #2)
- `restoreFilterState` — custom: restores the panel's own controls to those values (action #3)

### 12.3 — single

**Use case:** When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element)

**Behavioral breakdown:**
1. The URL hash changes → detect it (global trigger, chain lives on the documentation container)
2. Highlight the container's own matching heading briefly (a child mutated through the container's own chain)

**Element A (documentation container):** `<article class="docs">`
```html
<article class="docs" popstate:highlightHashedHeading>…</article>
```
**Chain breakdown:**
- `popstate` — trigger: the hash change surfaces through popstate (trigger approximation: closest navigation portal) (action #1)
- `highlightHashedHeading` — custom: briefly highlights the container's own heading matching the hash (action #2)

### 12.4 — single

**Use case:** When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost.

**Behavioral breakdown:**
1. A navigation away is attempted while the form is dirty → detect it (global trigger, chain lives on the form)
2. Show the form's own confirm dialog warning about lost data (on the form itself)

**Element A (intake form):** `<form class="intake-form">`
```html
<form class="intake-form" popstate:confirmDiscardIfDirty>…</form>
```
**Chain breakdown:**
- `popstate` — trigger: attempted navigation away (action #1)
- `confirmDiscardIfDirty` — custom: shows the form's own confirmation dialog and holds the navigation when dirty (action #2)

### 12.5 — multi

**Use case:** When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element)

**Behavioral breakdown:**
1. The route changes from album view to artist view → extract the new view's metadata (on the app shell)
2. The page title and social preview metadata live in the document head, different elements → **handoff to Element B**
3. The head receives the metadata → updates the page title and preview tags (on the head element)

**Element A (app shell):** `<div class="music-app">`
```html
<div class="music-app" popstate:getViewMetadata>…</div>
```
**Chain breakdown:**
- `popstate` — trigger: view change via route (action #1)
- `getViewMetadata` — custom: resolves the new view's title and social preview metadata (action #1)

→ [handoff: Element A's action #1 output (metadata) must reach Element B to trigger action #3]

**Element B (document head):** `<head>`
```html
<head ???:updateTitleAndMeta>…</head>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the view metadata changes
- `updateTitleAndMeta` — custom: updates the head's own title and meta tags (action #3)

### 12.6 — single

**Use case:** When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values.

**Behavioral breakdown:**
1. The page is restored from the bfcache → detect pageshow with persisted=true (on the trading page element)
2. Refresh the page's own prices to current values (on the trading page itself)

**Element A (trading page):** `<main class="trading-page">`
```html
<main class="trading-page" pageshow:ifPersisted:refreshPrices>…</main>
```
**Chain breakdown:**
- `pageshow` — trigger: the page is shown, including bfcache restores (action #1)
- `ifPersisted` — custom: passes through only when restored from the back-forward cache (action #1)
- `refreshPrices` — custom: re-fetches and re-renders the page's own prices (action #2)

### 12.7 — single

**Use case:** When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads.

**Behavioral breakdown:**
1. The deep link arrives naming a settings tab → read the tab name (on the settings component watching the URL)
2. Activate the component's own matching tab and load its content (on the settings component itself)

**Element A (settings component):** `<div class="admin-settings">`
```html
<div class="admin-settings" popstate:getTabFromUrl:activateTab:loadTabContent>…</div>
```
**Chain breakdown:**
- `popstate` — trigger: the deep-link navigation arrives (action #1)
- `getTabFromUrl` — custom: extracts the named tab from the URL (action #1)
- `activateTab` — custom: activates the component's own matching tab (action #2)
- `loadTabContent` — custom: loads the component's own tab content (action #2)

### 12.8 — multi

**Use case:** When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element)

**Behavioral breakdown:**
1. The route changes to the confirmation page → detect the navigation (on the page shell)
2. The cart badge in the header is a different element → **handoff to Element B**
3. The badge receives the signal → resets its own count to zero (on the badge)

**Element A (page shell):** `<div class="shop-shell">`
```html
<div class="shop-shell" popstate:ifConfirmationRoute>…</div>
```
**Chain breakdown:**
- `popstate` — trigger: route change after checkout (action #1)
- `ifConfirmationRoute` — custom: passes through only when the new route is the confirmation page (action #1)

→ [handoff: Element A's action #1 (checkout-complete signal) must reach Element B to trigger action #3]

**Element B (cart badge):** `<span class="cart-badge">`
```html
<span class="cart-badge" ???:text_0>3</span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when checkout completes
- `text_0` — resets the badge's own count text to zero (action #3)

### 12.9 — single

**Use case:** When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element)

**Behavioral breakdown:**
1. History state changes → read the step named in the URL (on the step indicator; global trigger, chain lives on the indicator)
2. Update the indicator's own active step to match (on the step indicator itself)

**Element A (step indicator):** `<nav class="step-indicator">`
```html
<nav class="step-indicator" popstate:syncStepToUrl>…</nav>
```
**Chain breakdown:**
- `popstate` — trigger: history state change (action #1)
- `syncStepToUrl` — custom: moves the indicator's own active marker to the URL-named step (action #2)

### 12.10 — single

**Use case:** When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element)

**Behavioral breakdown:**
1. A back navigation arrives while the lightbox is open → detect the popstate (global trigger, chain lives on the lightbox)
2. Close the lightbox itself and consume the navigation so the page stays put (on the lightbox itself)

**Element A (lightbox):** `<div class="lightbox">`
```html
<div class="lightbox" popstate:closeIfOpen>…</div>
```
**Chain breakdown:**
- `popstate` — trigger: back navigation (action #1)
- `closeIfOpen` — custom: closes the lightbox itself instead of letting the page navigate (action #2)

### 12.11 — multi

**Use case:** When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element)

**Behavioral breakdown:**
1. The site loads with a locale prefix in the URL → extract the locale (on the app shell watching the URL)
2. The locale must reach every date/currency format element, each a different element → **handoff to Element B (each formatted element)**
3. Each formatted element receives the locale → re-renders itself under that locale (on each element)

**Element A (app shell):** `<div class="app-shell">`
```html
<div class="app-shell" connect:getLocaleFromUrl>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the shell mounts and reads the URL prefix (action #1)
- `getLocaleFromUrl` — custom: extracts the locale from the URL prefix (action #1)

→ [handoff: Element A's action #1 output (locale) must reach every formatted element to trigger action #3]

**Element B (date/currency format element):** `<span class="localized">`
```html
<span class="localized" ???:rerenderWithLocale>…</span>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the locale is known
- `rerenderWithLocale` — custom: re-renders the element itself under the new locale (action #3)

# 13. Window/document lifecycle

### 13.1 — multi

**Use case:** When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element)

**Behavioral breakdown:**
1. The page finishes loading → detect the load event (on the page shell)
2. The above-the-fold images and the comments module are different elements → **handoff to Element B and Element C**
3. The images receive the priority signal → bump their own loading priority (on the images)
4. The comments module receives the start signal → begins loading itself (on the comments module)

**Element A (page shell):** `<body class="news-page">`
```html
<body class="news-page" load:pageLoaded>…</body>
```
**Chain breakdown:**
- `load` — trigger: the page finishes loading (action #1)
- `pageLoaded` — custom: produces the page-ready signal (action #1)

→ [handoff: Element A's action #1 (page-ready signal) must reach Element B to trigger action #3]
→ [handoff: Element A's action #1 (page-ready signal) must reach Element C to trigger action #4]

**Element B (above-the-fold images):** `<img class="hero-image">`
```html
<img class="hero-image" ???:attr_fetchpriority_high>…</img>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the page finishes loading
- `attr_fetchpriority_high` — sets the image's own `fetchpriority` to high (action #3)

**Element C (comments module):** `<section class="comments-module">`
```html
<section class="comments-module" ???:startLoading>…</section>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the page finishes loading
- `startLoading` — custom: begins loading the module's own deferred content (action #4)

### 13.2 — multi

**Use case:** When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element)

**Behavioral breakdown:**
1. The user switches away → detect visibilitychange to hidden (on the call shell)
2. The local preview and the away indicator on the tile are different elements → **handoff to Element B and Element C**
3. The local preview receives the signal → pauses itself (on the preview)
4. The tile receives the signal → shows its own away indicator (on the tile)

**Element A (call shell):** `<div class="video-call">`
```html
<div class="video-call" visibilitychange:ifHidden>…</div>
```
**Chain breakdown:**
- `visibilitychange` — trigger: the tab hides/shows (action #1)
- `ifHidden` — custom: passes through only when the tab became hidden (action #1)

→ [handoff: Element A's action #1 (tab-hidden signal) must reach Element B to trigger action #3]
→ [handoff: Element A's action #1 (tab-hidden signal) must reach Element C to trigger action #4]

**Element B (local preview):** `<video class="local-preview">`
```html
<video class="local-preview" ???:pause>…</video>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the tab hides
- `pause` — pauses the preview's own playback (action #3)

**Element C (participant tile):** `<div class="participant-tile">`
```html
<div class="participant-tile" ???:class_away_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the tab hides
- `class_away_add` — shows the tile's own away indicator (action #4)

### 13.3 — single

**Use case:** When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll.

**Behavioral breakdown:**
1. The tab becomes visible again → detect visibilitychange to visible (on the scores element)
2. Refresh the element's own scores immediately, bypassing the poll schedule (on the scores element itself)

**Element A (scores element):** `<div class="live-scores">`
```html
<div class="live-scores" visibilitychange:ifVisible:refreshScoresNow>…</div>
```
**Chain breakdown:**
- `visibilitychange` — trigger: the tab becomes visible (action #1)
- `ifVisible` — custom: passes through only when visibilityState is "visible" (action #1)
- `refreshScoresNow` — custom: re-fetches and re-renders the element's own scores immediately (action #2)

### 13.4 — multi

**Use case:** When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element)

**Behavioral breakdown:**
1. The browser goes offline mid-entry → detect the offline event (on the inspection form)
2. Switch the form's own submission handling to a local queue (on the form)
3. A warning banner is a different element → **handoff to Element B**
4. The banner receives the signal → appears (on the banner)

**Element A (inspection form):** `<form class="inspection-form">`
```html
<form class="inspection-form" offline:queueSubmissionsLocally>…</form>
```
**Chain breakdown:**
- `offline` — trigger: the browser goes offline (action #1)
- `queueSubmissionsLocally` — custom: switches the form's own submissions to a local queue (action #2)

→ [handoff: Element A's action #1 (offline signal) must reach Element B to trigger action #4]

**Element B (offline banner):** `<div class="offline-banner">`
```html
<div class="offline-banner" ???:class_visible_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the browser goes offline
- `class_visible_add` — reveals the banner itself (action #4)

### 13.5 — multi

**Use case:** When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element)

**Behavioral breakdown:**
1. The connection returns → detect the online event (on the chat shell)
2. Flush the shell's own queued messages in order (on the chat shell; network sends)
3. The offline banner is a different element → **handoff to Element B**
4. The banner receives the signal → slides itself away (on the banner)

**Element A (chat shell):** `<div class="chat-shell">`
```html
<div class="chat-shell" online:flushQueuedMessages>…</div>
```
**Chain breakdown:**
- `online` — trigger: the connection returns (action #1)
- `flushQueuedMessages` — custom: sends the shell's own queued messages in order (action #2)

→ [handoff: Element A's action #1 (online signal) must reach Element B to trigger action #4]

**Element B (offline banner):** `<div class="offline-banner">`
```html
<div class="offline-banner" ???:class_visible_remove>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the connection returns
- `class_visible_remove` — slides the banner itself away (action #4)

### 13.6 — single

**Use case:** When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave.

**Behavioral breakdown:**
1. The page is about to unload with unsaved content → detect beforeunload (global trigger, chain lives on the editor)
2. Trigger the native stay-or-leave prompt on behalf of the editor's own dirty state (on the editor)

**Element A (editor):** `<form class="doc-editor">`
```html
<form class="doc-editor" beforeunload:promptIfUnsavedChanges>…</form>
```
**Chain breakdown:**
- `beforeunload` — trigger: the page is about to unload (action #1)
- `promptIfUnsavedChanges` — custom: fires the native prompt when the editor is dirty (action #2)

### 13.7 — single

**Use case:** When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element)

**Behavioral breakdown:**
1. The page is restored from the bfcache → detect pageshow with persisted=true (global trigger, chain lives on the cart badge)
2. Re-sync the badge's own count from the server (on the cart badge itself)

**Element A (cart badge):** `<span class="cart-badge">`
```html
<span class="cart-badge" pageshow:ifPersisted:resyncCountFromServer>3</span>
```
**Chain breakdown:**
- `pageshow` — trigger: the page is shown, including bfcache restores (action #1)
- `ifPersisted` — custom: passes through only on a bfcache restore (action #1)
- `resyncCountFromServer` — custom: re-fetches and rewrites the badge's own count (action #2)

### 13.8 — single

**Use case:** When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background.

**Behavioral breakdown:**
1. The tab is hidden → detect visibilitychange to hidden (on the game element)
2. Pause the game's own loop so its timers and physics stop (on the game element itself)

**Element A (game element):** `<div class="browser-game">`
```html
<div class="browser-game" visibilitychange:pauseLoopWhenHidden>…</div>
```
**Chain breakdown:**
- `visibilitychange` — trigger: the tab hides/shows (action #1)
- `pauseLoopWhenHidden` — custom: pauses the element's own game loop while hidden (action #2)

### 13.9 — single

**Use case:** When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content.

**Behavioral breakdown:**
1. The scheduled overnight time arrives while the page is idle and visible → fire the timed trigger (on the kiosk page)
2. Reload the kiosk page's own content (on the kiosk page itself)

**Element A (kiosk page):** `<body class="kiosk-page">`
```html
<body class="kiosk-page" timeout:reloadIfIdle>…</body>
```
**Chain breakdown:**
- `timeout` — trigger: the scheduled overnight timer fires (trigger approximation: a timer trigger stands in for the schedule) (action #1)
- `reloadIfIdle` — custom: reloads the page's own content when it has been idle (action #2)

### 13.10 — single

**Use case:** When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text.

**Behavioral breakdown:**
1. Document fonts finish loading → detect the font load event (global trigger, chain lives on the magazine layout)
2. Re-measure the layout's own headlines to avoid clipped text (on the magazine layout itself)

**Element A (magazine layout):** `<article class="magazine-layout">`
```html
<article class="magazine-layout" load:remeasureHeadlines>…</article>
```
**Chain breakdown:**
- `load` — trigger: document fonts finish loading (trigger approximation: the window load event stands in for document.fonts.ready) (action #1)
- `remeasureHeadlines` — custom: re-measures the layout's own headlines against the final fonts (action #2)

# 14. Fullscreen

### 14.1 — single

**Use case:** When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly.

**Behavioral breakdown:**
1. User clicks the player's fullscreen button → the player enters fullscreen (on the player)
2. The player's own exit hint appears briefly, then fades (on the player itself)

**Element A (lecture player):** `<div class="lecture-player">`
```html
<div class="lecture-player" click:enterFullscreen:showExitHint:wait_3000:hideExitHint>…</div>
```
**Chain breakdown:**
- `click` — trigger: the fullscreen button is clicked (bubbles to the player) (action #1)
- `enterFullscreen` — custom: requests fullscreen on the player itself (action #1)
- `showExitHint` — custom: reveals the player's own exit hint (action #2)
- `wait_3000` — waits three seconds (action #2)
- `hideExitHint` — custom: fades the player's own exit hint (action #2)

### 14.2 — multi

**Use case:** When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element)

**Behavioral breakdown:**
1. The user exits fullscreen → detect the fullscreenchange (on the slideshow)
2. The thumbnail strip is a different element → **handoff to Element B**
3. The strip receives the signal → returns beneath the image with its own captions (on the strip)

**Element A (slideshow):** `<div class="photo-slideshow">`
```html
<div class="photo-slideshow" fullscreenchange:ifExited>…</div>
```
**Chain breakdown:**
- `fullscreenchange` — trigger: fullscreen exits (action #1)
- `ifExited` — custom: passes through only when fullscreen was exited (action #1)

→ [handoff: Element A's action #1 (fullscreen-exited signal) must reach Element B to trigger action #3]

**Element B (thumbnail strip):** `<div class="thumbnail-strip">`
```html
<div class="thumbnail-strip" ???:class_visible_add>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when fullscreen exits
- `class_visible_add` — reveals the strip itself with its captions (action #3)

### 14.3 — single

**Use case:** When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity.

**Behavioral breakdown:**
1. The deck enters fullscreen → detect the fullscreenchange (on the deck)
2. After a few seconds of pointer inactivity → hide the deck's own navigation hints (on the deck)

**Element A (presentation deck):** `<div class="presentation-deck">`
```html
<div class="presentation-deck" fullscreenchange:autoHideNavHints>…</div>
```
**Chain breakdown:**
- `fullscreenchange` — trigger: the deck enters fullscreen (action #1)
- `autoHideNavHints` — custom: hides the deck's own nav hints after idle seconds (action #2)

### 14.4 — multi

**Use case:** When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead. (cross-element)

**Behavioral breakdown:**
1. The browser denies fullscreen → detect the fullscreenerror (on the map)
2. The larger modal is a different element → **handoff to Element B**
3. The modal receives the signal → opens itself as the fallback (on the modal)

**Element A (embedded map):** `<div class="embedded-map">`
```html
<div class="embedded-map" fullscreenerror:fullscreenDenied>…</div>
```
**Chain breakdown:**
- `fullscreenerror` — trigger: the fullscreen request is denied (action #1)
- `fullscreenDenied` — custom: produces the fallback signal (action #1)

→ [handoff: Element A's action #1 (denied signal) must reach Element B to trigger action #3]

**Element B (larger modal):** `<div class="map-modal">`
```html
<div class="map-modal" ???:toggle_open>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when fullscreen is denied
- `toggle_open` — opens the modal itself as the fallback (action #3)

### 14.5 — single

**Use case:** When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element)

**Behavioral breakdown:**
1. Any element enters fullscreen → detect the fullscreenchange (global trigger, chain lives on the site header)
2. Hide the site header itself so it cannot overlap (on the header itself)

**Element A (site header):** `<header class="site-header">`
```html
<header class="site-header" fullscreenchange:hideWhenAnyFullscreen>…</header>
```
**Chain breakdown:**
- `fullscreenchange` — trigger: any element enters fullscreen (global event; the mutation stays on the header) (action #1)
- `hideWhenAnyFullscreen` — custom: hides the header itself while any fullscreen is active (action #2)

### 14.6 — single

**Use case:** When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element)

**Behavioral breakdown:**
1. The phone rotates upright and fullscreen exits → detect the fullscreenchange (global trigger, chain lives on the player)
2. Return the player itself to its inline position in the article (on the player)

**Element A (inline player):** `<div class="inline-player">`
```html
<div class="inline-player" fullscreenchange:dockInlineIfExited>…</div>
```
**Chain breakdown:**
- `fullscreenchange` — trigger: fullscreen exits after rotation (action #1)
- `dockInlineIfExited` — custom: returns the player itself to its own inline slot (action #2)

### 14.7 — single

**Use case:** When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element)

**Behavioral breakdown:**
1. The game canvas enters fullscreen → detect the fullscreenchange (on the canvas)
2. Resize the canvas's own on-screen control hints for the larger area (on the canvas itself)

**Element A (game canvas):** `<div class="game-canvas">`
```html
<div class="game-canvas" fullscreenchange:resizeControlHints>…</div>
```
**Chain breakdown:**
- `fullscreenchange` — trigger: the canvas enters fullscreen (action #1)
- `resizeControlHints` — custom: resizes the canvas's own control hints for the larger display (action #2)

# 15. State store reactivity

### 15.1 — single

**Use case:** When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation.

**Behavioral breakdown:**
1. The store's cart count increases → detect the state change (on the cart icon)
2. Update the icon's own badge count (on the cart icon)
3. Play the icon's own bump animation (on the cart icon)

**Element A (cart icon):** `<button class="cart-icon">`
```html
<button class="cart-icon" state_cart_count:text_cart_count:class_bump_add:wait_400:class_bump_remove>🛒</button>
```
**Chain breakdown:**
- `state_cart_count` — trigger: the `cart` store's `count` key changes (action #1)
- `text_cart_count` — writes the incoming count into the icon's own badge text (action #2)
- `class_bump_add` — adds the icon's own bump animation class (action #3)
- `wait_400` — lets the animation play (action #3)
- `class_bump_remove` — removes the icon's own bump class (action #3)

### 15.2 — single

**Use case:** When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu.

**Behavioral breakdown:**
1. The store's logged-in flag flips to true → detect the state change (on the header auth slot)
2. Swap the slot's own content from the sign-in link to the avatar menu (on the header auth slot)

**Element A (header auth slot):** `<div class="auth-slot">`
```html
<div class="auth-slot" state_auth_loggedIn:swapAuthControl>…</div>
```
**Chain breakdown:**
- `state_auth_loggedIn` — trigger: the `auth` store's `loggedIn` key changes (action #1)
- `swapAuthControl` — custom: swaps the slot's own content between sign-in link and avatar menu (action #2)

### 15.3 — single

**Use case:** When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted.

**Behavioral breakdown:**
1. The store's currency changes → detect the state change (on each price element)
2. Convert and re-format the price element's own amount (on each price element itself)

**Element A (price element):** `<span class="price">`
```html
<span class="price" state_currency_selected:renderConvertedPrice>…</span>
```
**Chain breakdown:**
- `state_currency_selected` — trigger: the `currency` store's `selected` key changes (action #1)
- `renderConvertedPrice` — custom: converts and reformats the element's own price in the new currency (action #2)

### 15.4 — multi

**Use case:** When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter. (cross-element)

**Behavioral breakdown:**
1. The store's unread count drops to zero → hide the bell icon's own dot (on the bell icon)
2. The tab title is a different element (document.title) → **handoff to Element B**
3. The title receives the zero count → clears its own counter (on the tab title)

**Element A (bell icon):** `<button class="bell">`
```html
<button class="bell" state_notifications_unread:ifZero:class_dot_remove>🔔</button>
```
**Chain breakdown:**
- `state_notifications_unread` — trigger: the `notifications` store's `unread` key changes (action #1)
- `ifZero` — custom: passes through only when the count is zero (action #1)
- `class_dot_remove` — removes the bell's own dot (action #1)

→ [handoff: Element A's action #1 (zero-count signal) must reach Element B to trigger action #3]

**Element B (tab title):** `<title>`
```html
<title ???:clearCounter>…</title>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the unread count hits zero
- `clearCounter` — custom: removes the counter from the document title (action #3)

### 15.5 — multi

**Use case:** When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates. (cross-element)

**Behavioral breakdown:**
1. The store's stock price updates → flash the matching row itself (on the stock row)
2. The portfolio total is a different element → **handoff to Element B**
3. The total receives the price update → recalculates and re-renders itself (on the total)

**Element A (stock row):** `<tr class="stock-row">`
```html
<tr class="stock-row" state_watchlist_price:updateOwnPrice:class_flash_add:wait_400:class_flash_remove>…</tr>
```
**Chain breakdown:**
- `state_watchlist_price` — trigger: the `watchlist` store's `price` key for this stock changes (action #1)
- `updateOwnPrice` — custom: writes the new price into the row's own price cell (action #1)
- `class_flash_add` / `wait_400` / `class_flash_remove` — plays the row's own flash animation (action #1)

→ [handoff: Element A's action #1 (price update) must reach Element B to trigger action #3]

**Element B (portfolio total):** `<div class="portfolio-total">`
```html
<div class="portfolio-total" ???:recalculate>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when any watched price changes
- `recalculate` — custom: recomputes and re-renders the total itself (action #3)

### 15.6 — single

**Use case:** When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it.

**Behavioral breakdown:**
1. The store's sidebar-collapsed flag toggles → detect the change (on the main content area)
2. Widen the content area itself (on the content area)
3. Resize the content area's own charts to fill the new width (on the content area)

**Element A (main content area):** `<main class="content-area">`
```html
<main class="content-area" state_ui_sidebarCollapsed:class_expanded:resizeOwnCharts>…</main>
```
**Chain breakdown:**
- `state_ui_sidebarCollapsed` — trigger: the `ui` store's `sidebarCollapsed` key changes (action #1)
- `class_expanded` — widens the content area itself (action #2)
- `resizeOwnCharts` — custom: resizes the area's own charts to fill the new width (action #3)

### 15.7 — single

**Use case:** When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically.

**Behavioral breakdown:**
1. The store's checked-in list changes → detect the state change (on the waiting room board)
2. Remove the checked-in patient's initials from the board's own list (on the board itself)

**Element A (waiting room board):** `<div class="waiting-board">`
```html
<div class="waiting-board" state_waiting_list:removeCheckedInEntries>…</div>
```
**Chain breakdown:**
- `state_waiting_list` — trigger: the `waiting` store's `list` key changes (action #1)
- `removeCheckedInEntries` — custom: removes checked-in initials from the board's own entries (action #2)

### 15.8 — single

**Use case:** When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork.

**Behavioral breakdown:**
1. The store's current track changes → detect the state change (on the now-playing bar)
2. Update the bar's own title, artist, and artwork (on the bar itself)

**Element A (now-playing bar):** `<div class="now-playing">`
```html
<div class="now-playing" state_player_currentTrack:renderTrackInfo>…</div>
```
**Chain breakdown:**
- `state_player_currentTrack` — trigger: the `player` store's `currentTrack` key changes (action #1)
- `renderTrackInfo` — custom: updates the bar's own title, artist, and artwork (action #2)

### 15.9 — multi

**Use case:** When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element)

**Behavioral breakdown:**
1. A filter chip is removed → the chip removes itself from the chip bar (on the chip) and writes the shrunken filter list into the store (data write)
2. The results grid is a different element → **handoff to Element B**
3. The grid receives the filter list change → re-fetches and updates its own count (on the grid)

**Element A (filter chip):** `<button class="filter-chip">`
```html
<button class="filter-chip" click:removeSelf:state_filters_active>…</button>
```
**Chain breakdown:**
- `click` — trigger: the chip is clicked (action #1)
- `removeSelf` — custom: removes the chip itself from the chip bar (action #1)
- `state_filters_active` — reaction: writes the updated active filter list into the `filters` store (action #1)

→ [handoff: Element A's action #1 (store write) must reach Element B to trigger action #3]

**Element B (results grid):** `<div class="results-grid">`
```html
<div class="results-grid" state_filters_active:refetchResults:updateCount>…</div>
```
**Chain breakdown:**
- `state_filters_active` — trigger: the `filters` store's `active` key changes (action #3)
- `refetchResults` — custom: re-fetches results with the new filters (action #3)
- `updateCount` — custom: updates the grid's own result count (action #3)

### 15.10 — single

**Use case:** When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note.

**Behavioral breakdown:**
1. The store's online flag flips to false → detect the state change (on each form)
2. Disable the form's own submit button and show its own reconnecting note (on each form itself)

**Element A (form):** `<form>`
```html
<form state_net_online:disableSubmitIfOffline>…</form>
```
**Chain breakdown:**
- `state_net_online` — trigger: the `net` store's `online` key changes (action #1)
- `disableSubmitIfOffline` — custom: disables the form's own submit button and shows its own reconnecting note when offline (action #2)

### 15.11 — single

**Use case:** When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager.

**Behavioral breakdown:**
1. The store's storage quota drops below ten percent → detect the threshold crossing (on the upgrade banner)
2. Reveal the banner itself (on the banner)

**Element A (upgrade banner):** `<div class="upgrade-banner">`
```html
<div class="upgrade-banner" state_storage_quotaPercent:belowTenPercent:class_visible>…</div>
```
**Chain breakdown:**
- `state_storage_quotaPercent` — trigger: the `storage` store's `quotaPercent` key changes (action #1)
- `belowTenPercent` — custom: returns true when the quota drops below ten percent (action #1)
- `class_visible` — toggles the banner's own visibility from the boolean input (action #2)

### 15.12 — multi

**Use case:** When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element)

**Behavioral breakdown:**
1. The store's active workspace switches → detect the change (on the admin shell)
2. The workspace identity must reach every table, each a different element → **handoff to Element B (each table)**
3. Each table receives the workspace → reloads itself with that workspace's permissions and data (on each table)

**Element A (admin shell):** `<div class="admin-shell">`
```html
<div class="admin-shell" state_workspace_active:announceWorkspace>…</div>
```
**Chain breakdown:**
- `state_workspace_active` — trigger: the `workspace` store's `active` key changes (action #1)
- `announceWorkspace` — custom: produces the workspace switch payload (action #1)

→ [handoff: Element A's action #1 (workspace switch) must reach every table to trigger action #3]

**Element B (data table):** `<table class="data-table">`
```html
<table class="data-table" state_workspace_active:reloadWithWorkspace>…</table>
```
**Chain breakdown:**
- `state_workspace_active` — trigger: the same store key the shell watches (action #3)
- `reloadWithWorkspace` — custom: reloads the table's own rows under the new workspace's permissions (action #3)

### 15.13 — single

**Use case:** When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen.

**Behavioral breakdown:**
1. The store's quiz score crosses the passing threshold → detect the change (on the certificate button)
2. Unlock the certificate button itself (on the button)

**Element A (certificate button):** `<button class="certificate" disabled>`
```html
<button class="certificate" disabled state_quiz_score:unlockIfPassing>Get certificate</button>
```
**Chain breakdown:**
- `state_quiz_score` — trigger: the `quiz` store's `score` key changes (action #1)
- `unlockIfPassing` — custom: removes the button's own `disabled` attribute when the score passes (action #2)

### 15.14 — single

**Use case:** When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document.

**Behavioral breakdown:**
1. The store's document title changes (teammate edit) → detect the change (on the document view)
2. Update the view's own associated browser tab title (the view writes the document title; treated as the view's own presentation state)

**Element A (document view):** `<main class="doc-view">`
```html
<main class="doc-view" state_doc_title:updateTabTitle>…</main>
```
**Chain breakdown:**
- `state_doc_title` — trigger: the `doc` store's `title` key changes (action #1)
- `updateTabTitle` — custom: writes the new title into the browser tab title owned by this view (action #2)

### 15.15 — multi

**Use case:** When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors. (cross-element)

**Behavioral breakdown:**
1. The store's theme preference changes → flip the root element's theme attribute — the root is a different element from any single chart → **handoff to Element B**
2. The root element receives the theme → flips its own `data-theme` attribute (on the root)
3. The theme change must also reach every chart, each a different element → **handoff to Element C (each chart)**
4. Each chart receives the theme → recolors itself (on each chart)

**Element A (theme watcher):** `<div class="theme-controller">`
```html
<div class="theme-controller" state_prefs_theme:getThemeValue>…</div>
```
**Chain breakdown:**
- `state_prefs_theme` — trigger: the `prefs` store's `theme` key changes (action #1)
- `getThemeValue` — custom: returns the new theme value (action #1)

→ [handoff: Element A's action #1 output (theme) must reach Element B to trigger action #2]
→ [handoff: Element A's action #1 output (theme) must reach every Element C chart to trigger action #4]

**Element B (root element):** `<html>`
```html
<html ???:attr_data-theme>…</html>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the theme preference changes
- `attr_data-theme` — writes the incoming theme into the root's own `data-theme` attribute (action #2)

**Element C (chart):** `<div class="chart">`
```html
<div class="chart" ???:recolorWithTheme>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the theme changes
- `recolorWithTheme` — custom: recolors the chart itself (action #4)

### 15.16 — single

**Use case:** When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately.

**Behavioral breakdown:**
1. The store's audio-muted preference toggles → detect the change (on the game session element)
2. Apply the mute state to the session's own sound effects (on the game session itself)

**Element A (game session):** `<div class="game-session">`
```html
<div class="game-session" state_settings_audioMuted:applyMuteState>…</div>
```
**Chain breakdown:**
- `state_settings_audioMuted` — trigger: the `settings` store's `audioMuted` key changes (action #1)
- `applyMuteState` — custom: mutes/unmutes the session's own sound effects (action #2)

### 15.17 — single

**Use case:** When every step completion flag in a multi-step application reads true, the review and submit section enables.

**Behavioral breakdown:**
1. The store's step completion flags update → check whether every flag reads true (on the review section)
2. When all true → enable the review-and-submit section itself (on the section)

**Element A (review & submit section):** `<section class="review-submit">`
```html
<section class="review-submit" state_steps_completion:enableWhenAllComplete>…</section>
```
**Chain breakdown:**
- `state_steps_completion` — trigger: the `steps` store's `completion` key changes (action #1)
- `enableWhenAllComplete` — custom: enables the section itself when every step flag reads true (action #2)

### 15.18 — single

**Use case:** When a bid raises the store's current highest bid, all watching clients see the price and countdown change together.

**Behavioral breakdown:**
1. The store's highest bid changes → detect the change (on each client's bid panel)
2. Update the panel's own price display and countdown (on the panel itself)

**Element A (bid panel):** `<div class="bid-panel">`
```html
<div class="bid-panel" state_auction_highestBid:renderPriceAndCountdown>…</div>
```
**Chain breakdown:**
- `state_auction_highestBid` — trigger: the `auction` store's `highestBid` key changes (action #1)
- `renderPriceAndCountdown` — custom: updates the panel's own price and countdown display (action #2)

### 15.19 — single

**Use case:** When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it.

**Behavioral breakdown:**
1. The store's device status reports offline → detect the change (on the device tile)
2. Dim the tile itself (on the tile)
3. Reveal the tile's own reconnect option (on the tile)

**Element A (device tile):** `<div class="device-tile">`
```html
<div class="device-tile" state_devices_status:applyOfflineState>…</div>
```
**Chain breakdown:**
- `state_devices_status` — trigger: the `devices` store's `status` key for this device changes (action #1)
- `applyOfflineState` — custom: dims the tile itself and reveals its own reconnect option when offline (actions #2–3)

### 15.20 — single

**Use case:** When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it.

**Behavioral breakdown:**
1. The store's drafts count changes → detect the change (on the drafts folder badge)
2. Sync the badge's own count text to the new value (on the badge itself)

**Element A (drafts folder badge):** `<span class="drafts-badge">`
```html
<span class="drafts-badge" state_mail_draftsCount:text_draftsCount>…</span>
```
**Chain breakdown:**
- `state_mail_draftsCount` — trigger: the `mail` store's `draftsCount` key changes (action #1)
- `text_draftsCount` — writes the incoming count into the badge itself (action #2)

### 15.21 — multi

**Use case:** A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue)

**Behavioral breakdown:**
1. The first or last name field changes → write the changed name into the store (on each name field; data write)
2. Every greeting element showing the full name is a different element → **handoff to Element B (each greeting)**
3. Each greeting receives the store change → re-renders its own full-name text (on each greeting)

**Element A (name fields):** `<input class="first-name">` / `<input class="last-name">`
```html
<input class="first-name" input:val:state_name_first>
<input class="last-name" input:val:state_name_last>
```
**Chain breakdown:**
- `input` — trigger: typing in the field (action #1)
- `val` — reads the field's own value (action #1)
- `state_name_first` / `state_name_last` — reaction: writes the value into the `name` store (action #1)

→ [handoff: Element A's action #1 (store writes) must reach every greeting element to trigger action #3]

**Element B (greeting element):** `<span class="greeting">`
```html
<span class="greeting" state_name_first:renderFullName state_name_last:renderFullName>…</span>
```
**Chain breakdown:**
- `state_name_first` / `state_name_last` — trigger: either name key in the store changes (action #3)
- `renderFullName` — custom: re-renders the greeting's own full-name text from both store keys (action #3)

### 15.22 — multi

**Use case:** A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element)

**Behavioral breakdown:**
1. Any button anywhere is clicked → write the modal open-state into the store (on the button; data write)
2. The modal is a different element → **handoff to Element B**
3. The modal receives the open-state change → opens or closes itself (on the modal)

**Element A (any controlling button):** `<button>`
```html
<button click:state_modal_open>…</button>
```
**Chain breakdown:**
- `click` — trigger: the button is clicked (action #1)
- `state_modal_open` — reaction: writes the open-state value into the `modal` store (action #1)

→ [handoff: Element A's action #1 (store write) must reach Element B to trigger action #3]

**Element B (modal):** `<div class="modal">`
```html
<div class="modal" state_modal_open:toggle_open>…</div>
```
**Chain breakdown:**
- `state_modal_open` — trigger: the `modal` store's `open` key changes (action #3)
- `toggle_open` — opens or closes the modal itself (action #3)

### 15.23 — single

**Use case:** When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React)

**Behavioral breakdown:**
1. The store's locale value changes → detect the change (on each formatted date element)
2. Re-render the date element's own formatted text under the new locale (on each date element itself)

**Element A (formatted date):** `<span class="formatted-date">`
```html
<span class="formatted-date" state_app_locale:renderLocalizedDate>…</span>
```
**Chain breakdown:**
- `state_app_locale` — trigger: the `app` store's `locale` key changes (action #1)
- `renderLocalizedDate` — custom: reformats the element's own date under the new locale (action #2)

### 15.24 — single

**Use case:** A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte)

**Behavioral breakdown:**
1. The store's clock tick fires once per second → update the label's own time text (on the clock label)
2. The ticking runs only while the widget stays on screen — the chain lives and dies with the widget element itself (lifecycle of the attribute element)

**Element A (clock label):** `<span class="clock-label">`
```html
<span class="clock-label" state_clock_now:text_clock_now>…</span>
```
**Chain breakdown:**
- `state_clock_now` — trigger: the `clock` store's `now` key updates each second (action #1)
- `text_clock_now` — writes the current time into the label itself (action #1)

# 16. Element connect

### 16.1 — single

**Use case:** When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned.

**Behavioral breakdown:**
1. The ad slot element is first inserted → detect the connect (on the ad slot)
2. Request the slot's own creative exactly once, guarding against re-runs on later re-positioning (on the ad slot itself)

**Element A (ad slot):** `<div class="ad-slot">`
```html
<div class="ad-slot" connect:requestCreativeOnce>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the element is inserted into the DOM (action #1)
- `requestCreativeOnce` — custom: requests the slot's own creative, guarded so later re-positioning does not re-request (action #2)

### 16.2 — single

**Use case:** When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading.

**Behavioral breakdown:**
1. The avatar element mounts → detect the connect (on the avatar)
2. Load the real photo, and once it finishes, swap the avatar's own initials placeholder for the photo (on the avatar itself)

**Element A (avatar):** `<div class="avatar">`
```html
<div class="avatar" connect:upgradeToPhotoWhenLoaded>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the avatar mounts (action #1)
- `upgradeToPhotoWhenLoaded` — custom: loads the photo and swaps the avatar's own placeholder when ready (action #2)

### 16.3 — single

**Use case:** When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element)

**Behavioral breakdown:**
1. The code block element appears → detect the connect (on the code block)
2. Apply syntax highlighting to the block's own code (on the code block)
3. Grow the block's own copy button inside itself (on the code block itself)

**Element A (code block):** `<pre class="code-block">`
```html
<pre class="code-block" connect:highlightSyntax:addOwnCopyButton>…</pre>
```
**Chain breakdown:**
- `connect` — trigger: the code block appears (action #1)
- `highlightSyntax` — custom: registers and highlights the block's own code (action #2)
- `addOwnCopyButton` — custom: grows the block's own copy button (action #3)

### 16.4 — single

**Use case:** When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates.

**Behavioral breakdown:**
1. The timestamp element mounts → read its own raw date attribute (on the timestamp)
2. Render the element's own relative label (on the timestamp)
3. Schedule the element's own future label updates (on the timestamp itself)

**Element A (timestamp):** `<time data-date="…">`
```html
<time data-date="…" connect:renderRelativeLabel:scheduleOwnUpdates>…</time>
```
**Chain breakdown:**
- `connect` — trigger: the timestamp mounts (action #1)
- `renderRelativeLabel` — custom: renders the element's own "five minutes ago" label (action #2)
- `scheduleOwnUpdates` — custom: schedules the element's own periodic label refreshes (action #3)

### 16.5 — single

**Use case:** When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in.

**Behavioral breakdown:**
1. The chart element is first inserted → detect the connect (on the chart)
2. Measure the chart's own container and draw its own initial frame (on the chart itself)

**Element A (chart):** `<div class="chart">`
```html
<div class="chart" connect:measureContainer:drawInitialFrame>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the chart is inserted (action #1)
- `measureContainer` — custom: measures the chart's own container (action #2)
- `drawInitialFrame` — custom: draws the chart's own initial frame (action #2)

### 16.6 — multi

**Use case:** When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element)

**Behavioral breakdown:**
1. The tooltip trigger mounts → detect the connect (on the trigger)
2. The tooltip's description content lives in a different element (the tooltip body) → **handoff to Element B**
3. The trigger and tooltip wire their own `aria-describedby` link so screen readers announce the tip (mutations land on both elements)

**Element A (tooltip trigger):** `<button class="tip-trigger">`
```html
<button class="tip-trigger" connect:initAccessibleTip>?</button>
```
**Chain breakdown:**
- `connect` — trigger: the trigger mounts (action #1)
- `initAccessibleTip` — custom: prepares the trigger's own accessible wiring (action #1)

→ [handoff: Element A's action #1 (wiring request) must reach Element B to trigger action #3]

**Element B (tooltip body):** `<div class="tip-body" role="tooltip">`
```html
<div class="tip-body" role="tooltip" ???:linkDescription>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when the trigger mounts
- `linkDescription` — custom: sets the body's own id and links the trigger's `aria-describedby` to it (action #3)

### 16.7 — multi

**Use case:** When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element)

**Behavioral breakdown:**
1. The map element mounts → detect the connect (on the map element)
2. Load the heavy map script (a shared script element elsewhere in the document) → **handoff to Element B**
3. The script element receives the request → loads itself, and the map initializes (on the script element; the map then renders)

**Element A (map element):** `<div class="store-map">`
```html
<div class="store-map" connect:requestMapScript>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the map mounts (action #1)
- `requestMapScript` — custom: produces the script-load request (action #1)

→ [handoff: Element A's action #1 (script-load request) must reach Element B to trigger action #3]

**Element B (map script loader):** `<div class="map-script-loader">`
```html
<div class="map-script-loader" ???:loadScript>…</div>
```
**Chain breakdown:**
- `???` — trigger: **deferred to Step 3.5** — fires when any map requests the script
- `loadScript` — custom: injects/loads the script for the loader itself (action #3)

### 16.8 — single

**Use case:** When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress.

**Behavioral breakdown:**
1. The video element is inserted → detect the connect (on the video)
2. Read saved progress and restore the video's own playback position (on the video itself)

**Element A (lesson video):** `<video class="lesson-video">`
```html
<video class="lesson-video" connect:restorePlaybackPosition>…</video>
```
**Chain breakdown:**
- `connect` — trigger: the video is inserted (action #1)
- `restorePlaybackPosition` — custom: sets the video's own currentTime from saved progress (action #2)

### 16.9 — single

**Use case:** When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)

**Behavioral breakdown:**
1. The framework processes the cloaked element at startup → detect the connect (on the cloaked element)
2. Remove the element's own cloak attribute so its own content appears (on the element itself)

**Element A (cloaked element):** `<div data-cloak>`
```html
<div data-cloak connect:attr_data-cloak_remove>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the element is processed at startup (action #1)
- `attr_data-cloak_remove` — removes the element's own cloak attribute, revealing its content (action #2)

### 16.10 — single

**Use case:** When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars.

**Behavioral breakdown:**
1. The star rating component upgrades (connects) → read its own data attributes (on the component)
2. Render the component's own filled stars to match (on the component itself)

**Element A (star rating):** `<star-rating data-rating="4">`
```html
<star-rating data-rating="4" connect:readRatingAttr:renderStars></star-rating>
```
**Chain breakdown:**
- `connect` — trigger: the component upgrades (action #1)
- `readRatingAttr` — custom: reads the component's own rating data attribute (action #1)
- `renderStars` — custom: renders the component's own filled stars (action #2)

### 16.11 — single

**Use case:** When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React)

**Behavioral breakdown:**
1. The poll widget mounts → open its own socket connection (on the widget)
2. The widget is removed → tear its own socket down (on the widget itself)

**Element A (poll widget):** `<div class="poll-widget">`
```html
<div class="poll-widget" connect:openSocket disconnect:closeSocket>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the widget mounts (action #1)
- `openSocket` — custom: opens the widget's own socket connection (action #1)
- `disconnect` — trigger: the widget is removed from the DOM (action #2)
- `closeSocket` — custom: tears the widget's own socket down (action #2)

### 16.12 — single

**Use case:** When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance.

**Behavioral breakdown:**
1. The editor element mounts → detect the connect (on the editor element)
2. Lazy-load the heavy editor library and initialize it on the element's own editing surface (on the editor element itself)

**Element A (editor element):** `<div class="rich-editor">`
```html
<div class="rich-editor" connect:lazyLoadEditorLibrary>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the editor mounts (action #1)
- `lazyLoadEditorLibrary` — custom: loads the library and initializes the element's own editing surface (action #2)

### 16.13 — single

**Use case:** When a counter element with a target value is inserted, it reads the target and starts counting up toward it.

**Behavioral breakdown:**
1. The counter element is inserted → read its own target attribute (on the counter)
2. Animate the counter's own text counting up toward the target (on the counter itself)

**Element A (counter):** `<span class="counter" data-target="5000">`
```html
<span class="counter" data-target="5000" connect:readTarget:countUp>…</span>
```
**Chain breakdown:**
- `connect` — trigger: the counter is inserted (action #1)
- `readTarget` — custom: reads the counter's own `data-target` (action #1)
- `countUp` — custom: animates the counter's own text up to the target (action #2)

### 16.14 — single

**Use case:** When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen.

**Behavioral breakdown:**
1. The consent banner mounts → check for a stored decision (on the banner)
2. If a decision exists → remove the banner itself immediately, before any flash (on the banner itself)

**Element A (consent banner):** `<div class="consent-banner">`
```html
<div class="consent-banner" connect:removeSelfIfDecisionStored>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the banner mounts (action #1)
- `removeSelfIfDecisionStored` — custom: removes the banner itself when a stored decision exists (action #2)

### 16.15 — single

**Use case:** When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value.

**Behavioral breakdown:**
1. The progress ring connects → read its own percentage attribute (on the ring)
2. Animate the ring's own arc out to that value (on the ring itself)

**Element A (progress ring):** `<div class="progress-ring" data-percent="72">`
```html
<div class="progress-ring" data-percent="72" connect:readPercentAttr:animateArc>…</div>
```
**Chain breakdown:**
- `connect` — trigger: the ring connects (action #1)
- `readPercentAttr` — custom: reads the ring's own `data-percent` (action #1)
- `animateArc` — custom: animates the ring's own arc to the percentage (action #2)


## Summary

- Total use cases: 271
- Single-element: 172 (63%)
- Multi-element: 99 (37%)
- Deferred (`???`) downstream triggers awaiting Step 3.5 coordination design: present in every `multi` case
