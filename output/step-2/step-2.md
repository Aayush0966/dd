# Step 2 — DD Attribute Syntax Fragments

Each use case from `output/step-1/step-1.md` converted to a DoubleDots attribute fragment: a trigger portal followed by colon-separated reactions. Built-in reactions (`toggle_`, `class_`, `text`, `html`, `style_`, `value`, `val`, `focus`, `blur`, `wait_`, `log`, `prevent`, `copy`, `fetch`, and portal names re-dispatching events) are used where they genuinely fit; everything else is named as a camelCase custom reaction with a `<!-- custom: ... -->` note. `(cross-element)` and `(seen in: ...)` tags are preserved verbatim.

# 1. Click & pointer interactions

> A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.

`click:toggle_open`

```html
<tr click:toggle_open>
  <td>ACME Corp</td><td>$1,240.00</td>
</tr>
```

> A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted.

`dblclick:enterCellEditMode`

```html
<td dblclick:enterCellEditMode>128.00</td>
```

<!-- custom: enterCellEditMode — swaps the cell into an editable input with its current value selected -->

> A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions.

`contextmenu:prevent:openFileContextMenu`

```html
<li contextmenu:prevent:openFileContextMenu>report.pdf</li>
```

<!-- custom: openFileContextMenu — positions and opens the file action menu at the pointer coordinates -->

> A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it.

`click:closeMenuOnOutsideClick`

```html
<nav id="profile-menu" click:closeMenuOnOutsideClick open>...</nav>
```

<!-- custom: closeMenuOnOutsideClick — closes the menu when the click lands outside it and returns focus to the opener -->

> A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it.

`click:closeDrawerOnOutsideClick`

```html
<aside id="cart-drawer" click:closeDrawerOnOutsideClick open>...</aside>
```

<!-- custom: closeDrawerOnOutsideClick — slides the drawer closed on an outside click, preserving cart state -->

> A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together.

`pointerdown:wait_500:enterMultiSelectMode`

```html
<li pointerdown:wait_500:enterMultiSelectMode>Family group</li>
```

<!-- custom: enterMultiSelectMode — puts the list into multi-select mode after a sustained press (cancelled if the pointer lifts early) -->

> A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection.

`click:class_favorited:saveToFavorites`

```html
<button click:class_favorited:saveToFavorites aria-label="Save listing">&#9825;</button>
```

<!-- custom: saveToFavorites — persists the listing to the user's favorites collection -->

> A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.

`click:fetch:appendLots`

```html
<button click:fetch:appendLots="/api/watchlist/lots?page=2">Load more</button>
```

<!-- custom: appendLots — renders the fetched lot batch (with current bids) onto the end of the list -->

> A single click on a track in a music queue selects it, while a double click starts playing it immediately.

`click:selectTrack` and `dblclick:playTrackNow`

```html
<li click:selectTrack dblclick:playTrackNow>03 — Solar Winds</li>
```

<!-- custom: selectTrack — marks the track as the current selection -->
<!-- custom: playTrackNow — starts playback of the track immediately -->

> A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element)

`click:swapMainPhoto`

```html
<img click:swapMainPhoto src="thumb-2.jpg" alt="Pool terrace" data-caption="Pool terrace at dusk">
```

<!-- custom: swapMainPhoto — sets the main gallery image and caption from this thumbnail (cross-element) -->

> A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element)

`click:closePanelsOnCanvasClick`

```html
<main id="design-root" click:closePanelsOnCanvasClick>
  <canvas id="canvas"></canvas>
</main>
```

<!-- custom: closePanelsOnCanvasClick — closes all floating panels when the click target is the bare canvas (cross-element) -->

> A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element)

`click:showPropertyCard`

```html
<button class="map-pin" click:showPropertyCard data-property="481516">&#128205;</button>
```

<!-- custom: showPropertyCard — pops up the property card anchored to the tapped pin (cross-element) -->

> A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element)

`contextmenu:prevent:showReactionPicker`

```html
<div class="message" contextmenu:prevent:showReactionPicker>See you at 7?</div>
```

<!-- custom: showReactionPicker — anchors the emoji reaction row above the message bubble (cross-element) -->

> A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls.

`click:toggle_on` and `pointerdown:wait_500:expandLightControls`

```html
<div class="light-tile" click:toggle_on pointerdown:wait_500:expandLightControls>Kitchen light</div>
```

<!-- custom: expandLightControls — expands the tile into brightness and color controls after a sustained press -->

> An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction.

`click:sortByColumn`

```html
<th click:sortByColumn data-column="timestamp">Timestamp</th>
```

<!-- custom: sortByColumn — re-sorts the rows by this column and shows the direction arrow -->

> A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element)

`click:toggle_selected:updateBookingSummary`

```html
<button class="seat" click:toggle_selected:updateBookingSummary data-price="189">14A</button>
```

<!-- custom: updateBookingSummary — writes the selected seat's price into the booking summary panel (cross-element) -->

> A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood.

`dblclick:zoomToNodeNeighborhood`

```html
<g class="node" dblclick:zoomToNodeNeighborhood data-node="core-switch">...</g>
```

<!-- custom: zoomToNodeNeighborhood — smoothly zooms the canvas into this node's neighborhood -->

> A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.

`click:copy:text_copied`

```html
<button click:copy:text_copied="https://team.example/invite/abc123">Copy invite link</button>
```

> A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.

`click:toggle_open`

```html
<button click:toggle_open aria-expanded="true">Can I deduct home office costs?</button>
```

> A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves.

`click:toggleMagnifierLens`

```html
<figure click:toggleMagnifierLens>
  <img src="boot-large.jpg" alt="Hiking boot">
</figure>
```

<!-- custom: toggleMagnifierLens — attaches a pointer-following magnifier lens until the pointer leaves the image -->

> A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises.

`dblclick:burstHeart:incrementLikeCount`

```html
<img dblclick:burstHeart:incrementLikeCount src="photo.jpg" alt="Sunset hike">
```

<!-- custom: burstHeart — plays the large heart burst overlay animation -->
<!-- custom: incrementLikeCount — raises the post's like count -->

> A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history.

`contextmenu:prevent:showLineActionsMenu`

```html
<tr class="diff-line" contextmenu:prevent:showLineActionsMenu data-line="42">+ return total;</tr>
```

<!-- custom: showLineActionsMenu — opens the line menu with copy-link and history actions -->

> A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange.

`click:incrementScore:class_upvoted_add`

```html
<button click:incrementScore:class_upvoted_add aria-label="Upvote">&#9650;</button>
```

<!-- custom: incrementScore — raises the answer's score immediately -->

> A middle click on a terminal tab in a developer tool closes that session along with its running process.

`auxclick:closeTerminalSession`

```html
<li class="tab" auxclick:closeTerminalSession>zsh — server</li>
```

<!-- custom: closeTerminalSession — closes the tab and terminates its running process (auxclick covers the middle button) -->

> A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.

`click:toggle_open`

```html
<div class="fraud-banner" click:toggle_open role="alert">Suspicious activity detected</div>
```

> A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct.

`click:class_selected_add:revealAnswerVerdict`

```html
<li click:class_selected_add:revealAnswerVerdict data-correct="true">B — Mitochondria</li>
```

<!-- custom: revealAnswerVerdict — shows whether the selected choice was correct -->

> A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element)

`click:class_selected_add:fillCheckInField`

```html
<td click:class_selected_add:fillCheckInField data-date="2026-09-14">14</td>
```

<!-- custom: fillCheckInField — writes the clicked date into the check-in field (cross-element) -->

> A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element)

`click:absorbBackdropClick`

```html
<div class="modal-backdrop" click:absorbBackdropClick></div>
```

<!-- custom: absorbBackdropClick — swallows backdrop clicks (stopPropagation) so the modal stays open (cross-element) -->

> A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue)

`click:submitOrderOnce`

```html
<button click:submitOrderOnce>Pay $58.20</button>
```

<!-- custom: submitOrderOnce — processes the first click and ignores every subsequent click -->

# 2. Keyboard interaction

> A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it.

`keydown_escape:closeModalAndRestoreFocus`

```html
<div class="modal" keydown_escape:closeModalAndRestoreFocus open role="dialog">...</div>
```

<!-- custom: closeModalAndRestoreFocus — closes the modal and returns focus to its opener -->

> A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element)

`keydown_ctrl_k:prevent:openCommandPalette`

```html
<body keydown_ctrl_k:prevent:openCommandPalette>...</body>
```

<!-- custom: openCommandPalette — opens the palette and focuses its search field (cross-element) -->

> Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.

`keydown_enter:prevent:sendMessage` and `keydown_shift_enter:insertNewline`

```html
<textarea keydown_enter:prevent:sendMessage keydown_shift_enter:insertNewline></textarea>
```

<!-- custom: sendMessage — sends the composed message -->
<!-- custom: insertNewline — inserts a plain newline without sending -->

> A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse.

`keydown_arrowdown:highlightNextSuggestion`

```html
<input keydown_arrowdown:highlightNextSuggestion keydown_arrowup:highlightPreviousSuggestion role="combobox">
```

<!-- custom: highlightNextSuggestion — moves the highlight to the next suggestion in the open list -->

> Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back.

`keydown_tab:prevent:moveActiveCellRight` and `keydown_shift_tab:prevent:moveActiveCellLeft`

```html
<table keydown_tab:prevent:moveActiveCellRight keydown_shift_tab:prevent:moveActiveCellLeft>...</table>
```

<!-- custom: moveActiveCellRight — advances the active cell one column -->
<!-- custom: moveActiveCellLeft — moves the active cell one column back -->

> A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element)

`keydown_j:jumpToNextUnread` and `keydown_k:jumpToPreviousUnread`

```html
<main keydown_j:jumpToNextUnread keydown_k:jumpToPreviousUnread>...</main>
```

<!-- custom: jumpToNextUnread — scrolls to and focuses the next unread article (cross-element) -->
<!-- custom: jumpToPreviousUnread — scrolls back to the previous unread article (cross-element) -->

> A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element)

`keydown_slash:prevent:focusFileSearch`

```html
<body keydown_slash:prevent:focusFileSearch>...</body>
```

<!-- custom: focusFileSearch — moves focus into the file search box (cross-element) -->

> Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time.

`keydown_shift_arrow:extendSelection`

```html
<div keydown_shift_arrow:extendSelection contenteditable="true">Draft text…</div>
```

<!-- custom: extendSelection — grows the selection by one character or line per keypress -->

> A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse.

`keydown_ctrl_enter:prevent:submit`

```html
<textarea keydown_ctrl_enter:prevent:submit name="reply"></textarea>
```

(`submit` as a reaction re-dispatches submit on the owning form via `requestSubmit()`.)

> Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column.

`keydown_escape:cancelDragMove`

```html
<ul class="board" keydown_escape:cancelDragMove>...</ul>
```

<!-- custom: cancelDragMove — aborts the in-progress drag and snaps the card back to its origin -->

> A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it.

`keydown_ctrl_z:prevent:undoCanvasAction` and `keydown_ctrl_shift_z:prevent:redoCanvasAction`

```html
<canvas keydown_ctrl_z:prevent:undoCanvasAction keydown_ctrl_shift_z:prevent:redoCanvasAction></canvas>
```

<!-- custom: undoCanvasAction — reverts the last canvas action -->
<!-- custom: redoCanvasAction — reapplies the last undone canvas action -->

> Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last.

`keydown_arrowleft:previousSlide`, `keydown_arrowright:nextSlide`, `keydown_home:firstSlide`, `keydown_end:lastSlide`

```html
<div class="carousel" keydown_arrowleft:previousSlide keydown_arrowright:nextSlide keydown_home:firstSlide keydown_end:lastSlide tabindex="0">...</div>
```

<!-- custom: previousSlide — moves the carousel back one slide -->
<!-- custom: nextSlide — advances the carousel one slide -->
<!-- custom: firstSlide — jumps to the first slide -->
<!-- custom: lastSlide — jumps to the last slide -->

> A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause.

`keydown_space:prevent:togglePlayback`

```html
<video keydown_space:prevent:togglePlayback src="consult.mp4" tabindex="0"></video>
```

<!-- custom: togglePlayback — toggles the video between play and pause -->

> A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element)

`keydown_questionmark:openShortcutCheatsheet`

```html
<body keydown_questionmark:openShortcutCheatsheet>...</body>
```

<!-- custom: openShortcutCheatsheet — opens the keyboard shortcut overlay (cross-element) -->

> A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening.

`keydown_ctrl_s:prevent:saveDraftLocally`

```html
<form keydown_ctrl_s:prevent:saveDraftLocally>...</form>
```

<!-- custom: saveDraftLocally — persists the draft to local storage instead of the browser dialog -->

> Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action.

`keydown_delete:moveSelectedToTrash`

```html
<ul class="mail-list" keydown_delete:moveSelectedToTrash>...</ul>
```

<!-- custom: moveSelectedToTrash — trashes every selected email in one action -->

> A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element)

`keydown_m:toggleMicrophone`

```html
<body keydown_m:toggleMicrophone>...</body>
```

<!-- custom: toggleMicrophone — toggles the mic and updates the mic icon (cross-element) -->

> Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it.

`keydown_tab:trapFocusWithinModal`

```html
<div class="modal" keydown_tab:trapFocusWithinModal role="dialog" open>...</div>
```

<!-- custom: trapFocusWithinModal — wraps Tab/Shift+Tab around the modal's own focusable controls -->

> A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly.

`keydown_digit:pickSeverityRating`

```html
<fieldset keydown_digit:pickSeverityRating>Pain level 1–9</fieldset>
```

<!-- custom: pickSeverityRating — maps the pressed digit key to the matching severity option -->

> A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes.

`keydown_enter:activateHighlightedItem`

```html
<ul role="menu" keydown_enter:activateHighlightedItem>...</ul>
```

<!-- custom: activateHighlightedItem — fires the highlighted item's action, then lets the menu close -->

> A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise.

`keydown_ctrl_c:copySelectionOrInterrupt`

```html
<div class="terminal" keydown_ctrl_c:copySelectionOrInterrupt tabindex="0">...</div>
```

<!-- custom: copySelectionOrInterrupt — copies when text is selected, otherwise sends SIGINT -->

> A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte)

`keydown_enter:startMatchmaking`

```html
<body keydown_enter:startMatchmaking>...</body>
```

<!-- custom: startMatchmaking — begins matchmaking regardless of the current focus target -->

> In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks.

`keydown_ctrl_arrow:moveCursorBetweenBeats` and `keydown_arrow:moveCursorBetweenTracks`

```html
<div class="sequencer" keydown_ctrl_arrow:moveCursorBetweenBeats keydown_arrow:moveCursorBetweenTracks tabindex="0">...</div>
```

<!-- custom: moveCursorBetweenBeats — steps the note cursor across beats -->
<!-- custom: moveCursorBetweenTracks — steps the cursor across tracks -->

# 3. Form & input

> As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field.

`input:wait_300:checkUsernameAvailability`

```html
<input input:wait_300:checkUsernameAvailability name="username" autocomplete="off">
```

<!-- custom: checkUsernameAvailability — queries the server for the typed name and shows a tick or taken warning -->

> A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js)

`input:wait_300:searchPatients`

```html
<input input:wait_300:searchPatients type="search" placeholder="Search patients">
```

<!-- custom: searchPatients — runs the debounced patient search and renders the filtered results -->

> When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.

`blur:validateEmailFormat`

```html
<input blur:validateEmailFormat type="email" name="email">
```

<!-- custom: validateEmailFormat — checks the address format and toggles the inline error message -->

> Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element)

`change:swapRegionField`

```html
<select change:swapRegionField name="country">
  <option value="CA">Canada</option>
</select>
```

<!-- custom: swapRegionField — replaces the region input with a province dropdown for the chosen country (cross-element) -->

> As a user types a new password, a strength meter under the field updates and lists which requirements are still missing.

`input:updateStrengthMeter`

```html
<input input:updateStrengthMeter type="password" name="new-password">
```

<!-- custom: updateStrengthMeter — recomputes the strength meter and the missing-requirements list -->

> Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element)

`change:toggleOtherDetails`

```html
<select change:toggleOtherDetails name="reason">
  <option value="other">Other</option>
</select>
```

<!-- custom: toggleOtherDetails — reveals the details textarea and marks it required when "other" is chosen (cross-element) -->

> A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically.

`paste:formatCardNumber`

```html
<input paste:formatCardNumber inputmode="numeric" name="card-number">
```

<!-- custom: formatCardNumber — rewrites the pasted digits into spaced four-digit groups -->

> Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element)

`input:wait_300:publishTypingIndicator`

```html
<textarea input:wait_300:publishTypingIndicator placeholder="Message…"></textarea>
```

<!-- custom: publishTypingIndicator — broadcasts a typing status to the other participant's header (cross-element) -->

> Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element)

`input:recalculateBudget`

```html
<td input:recalculateBudget contenteditable="true">450</td>
```

<!-- custom: recalculateBudget — recomputes the monthly total and redraws the spending chart (cross-element) -->

> Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element)

`change:toggleGuardianConsent`

```html
<input change:toggleGuardianConsent type="date" name="birth-date">
```

<!-- custom: toggleGuardianConsent — shows and requires the guardian consent section for minors (cross-element) -->

> Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element)

`reset:restoreDefaultsAndRefreshResults`

```html
<form reset:restoreDefaultsAndRefreshResults>
  <button type="reset">Clear filters</button>
</form>
```

<!-- custom: restoreDefaultsAndRefreshResults — resets every filter control and re-runs the search (cross-element) -->

> Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.

`submit:prevent:lockSubmitAndSpin`

```html
<form submit:prevent:lockSubmitAndSpin action="/login" method="post">...</form>
```

<!-- custom: lockSubmitAndSpin — disables the submit button, shows its spinner, then sends the credentials once -->

> Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning.

`input:validateStockLevel`

```html
<input input:validateStockLevel type="number" name="quantity" data-in-stock="240">
```

<!-- custom: validateStockLevel — flags the field red with an inline warning when quantity exceeds stock -->

> Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives.

`blur:validateRequired`

```html
<input blur:validateRequired required name="full-name">
```

<!-- custom: validateRequired — shows the inline error when empty and clears it once valid input arrives -->

> Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities.

`input:filterAirportOptions`

```html
<input input:filterAirportOptions list="airports" placeholder="Departure city">
```

<!-- custom: filterAirportOptions — narrows the field's own dropdown to matching airports as you type -->

> Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element)

`change:collapseBillingAndSyncValues`

```html
<label><input change:collapseBillingAndSyncValues type="checkbox" name="same-as-shipping"> Same as shipping</label>
```

<!-- custom: collapseBillingAndSyncValues — collapses the billing section and mirrors shipping values into it (cross-element) -->

> Typing a promo code validates it on the fly and shows the applied discount inline beside the field.

`input:wait_300:validatePromoCode`

```html
<input input:wait_300:validatePromoCode name="promo" placeholder="Promo code">
```

<!-- custom: validatePromoCode — checks the code server-side and renders the applied discount inline -->

> Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element)

`change:updateEndDateMinimum`

```html
<input change:updateEndDateMinimum type="date" name="start-date">
```

<!-- custom: updateEndDateMinimum — sets the end date picker's min attribute to the day after the start date (cross-element) -->

> A character counter under a social post composer counts down while typing and turns red in the final stretch.

`input:updateCharCounter`

```html
<textarea input:updateCharCounter maxlength="280"></textarea>
```

<!-- custom: updateCharCounter — counts down remaining characters and turns red near the limit -->

> Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element)

`change:toggleSubmitEnabled`

```html
<label><input change:toggleSubmitEnabled type="checkbox" name="terms"> I accept the terms</label>
```

<!-- custom: toggleSubmitEnabled — enables or disables the submit button with the checkbox state (cross-element) -->

> Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element)

`input:updateMortgageEstimate`

```html
<input input:updateMortgageEstimate type="range" name="down-payment" min="0" max="90">
```

<!-- custom: updateMortgageEstimate — recomputes the monthly payment and total interest displays (cross-element) -->

> Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label.

`input:class_dirty_add`

```html
<input input:class_dirty_add name="retries" value="3">
```

> Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error.

`change:validateFileSize`

```html
<input change:validateFileSize type="file" name="records" data-max-mb="25">
```

<!-- custom: validateFileSize — swaps the chosen file name for a size-limit error when the file is too large -->

> A tax form formats a social security number into dashed digit groups as the user types each number.

`input:formatSsn`

```html
<input input:formatSsn inputmode="numeric" name="ssn" placeholder="123-45-6789">
```

<!-- custom: formatSsn — inserts dashes between digit groups as the number is typed -->

> Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element)

`change:toggleAllRowCheckboxes`

```html
<th><input change:toggleAllRowCheckboxes type="checkbox" aria-label="Select all"></th>
```

<!-- custom: toggleAllRowCheckboxes — checks or clears every visible row checkbox (cross-element) -->

> Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues.

`input:filterTagSuggestions`

```html
<input input:filterTagSuggestions name="caption" placeholder="Add a caption #…">
```

<!-- custom: filterTagSuggestions — opens the tag suggestion list on "#" and filters it as typing continues -->

> Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element)

`change:swapInstructionPanel`

```html
<select change:swapInstructionPanel name="device-type">
  <option value="thermostat">Thermostat</option>
</select>
```

<!-- custom: swapInstructionPanel — swaps the pairing instruction panel for the chosen device type (cross-element) -->

> A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue)

`input:syncPairedValue`

```html
<input input:syncPairedValue type="range" name="contrast" min="0" max="100" data-pair="contrast-number">
<input input:syncPairedValue type="number" id="contrast-number" min="0" max="100">
```

<!-- custom: syncPairedValue — writes the value to the shared model so the paired control mirrors it -->

> Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular)

`input:validateFormGroup`

```html
<form input:validateFormGroup change:validateFormGroup>...</form>
```

<!-- custom: validateFormGroup — validates all controls together and keeps save disabled until every rule passes -->

# 4. Media playback

> When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element)

`ended:advanceCourseProgress`

```html
<video ended:advanceCourseProgress src="lesson-4.mp4"></video>
```

<!-- custom: advanceCourseProgress — pulses the next-lesson button and advances the progress bar (cross-element) -->

> A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element)

`play:updateMiniPlayer`

```html
<button class="play-episode" play:updateMiniPlayer data-title="Ep. 12 — Deep Sea" data-art="ep12.jpg">&#9654;</button>
```

<!-- custom: updateMiniPlayer — fills the mini player with the episode title and artwork (cross-element) -->

> When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards.

`pause:rememberPositionAndPromptResume`

```html
<audio pause:rememberPositionAndPromptResume src="track.mp3"></audio>
```

<!-- custom: rememberPositionAndPromptResume — stores the position and shows a resume prompt after an interruption -->

> As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes.

`waiting:class_buffering_add` and `playing:class_buffering_remove`

```html
<video waiting:class_buffering_add playing:class_buffering_remove src="consult.mp4"></video>
```

> When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner.

`timeupdate:promptRatingNearEnd`

```html
<video timeupdate:promptRatingNearEnd src="hiit-30.mp4"></video>
```

<!-- custom: promptRatingNearEnd — slides up the rating prompt once playback enters the final ten percent -->

> A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately.

`input:syncVolumeUI`

```html
<input input:syncVolumeUI type="range" name="volume" min="0" max="100">
```

<!-- custom: syncVolumeUI — sets the audio volume and updates the slider fill and speaker glyph -->

> When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element)

`timeupdate:pauseAtQuizCheckpoint`

```html
<video timeupdate:pauseAtQuizCheckpoint src="module-2.mp4" data-checkpoints="120,360"></video>
```

<!-- custom: pauseAtQuizCheckpoint — pauses at the checkpoint timestamp and shows the question overlay (cross-element) -->

> When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element)

`ended:highlightNextExhibit`

```html
<audio ended:highlightNextExhibit src="exhibit-7.mp3"></audio>
```

<!-- custom: highlightNextExhibit — highlights the next exhibit's card (cross-element) -->

> A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line.

`timeupdate:highlightCurrentLyricLine`

```html
<audio timeupdate:highlightCurrentLyricLine src="song.mp3" data-lyrics="lyrics.json"></audio>
```

<!-- custom: highlightCurrentLyricLine — highlights the lyric line matching the current playback time -->

> When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature.

`pause:showChapterList`

```html
<video pause:showChapterList src="demo.mp4"></video>
```

<!-- custom: showChapterList — reveals the chapter list overlay while paused -->

> When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element)

`stalled:handleStreamStall`

```html
<video stalled:handleStreamStall src="live-auction.m3u8"></video>
```

<!-- custom: handleStreamStall — shows the reconnecting banner and disables bid buttons until recovery (cross-element) -->

> When a story video finishes in a social app, the player advances itself to the next friend's story.

`ended:advanceToNextStory`

```html
<video ended:advanceToNextStory src="story-a.mp4"></video>
```

<!-- custom: advanceToNextStory — loads and plays the next friend's story -->

> Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)

`play:dimAppBackground`

```html
<audio play:dimAppBackground src="rainfall.mp3"></audio>
```

<!-- custom: dimAppBackground — gradually dims the app background toward the calm theme (cross-element) -->

> While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer.

`seeking:showSeekThumbnail`

```html
<video seeking:showSeekThumbnail src="webinar.mp4" data-thumbs="sprites.jpg"></video>
```

<!-- custom: showSeekThumbnail — renders the frame preview that follows the pointer while scrubbing -->

> When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element)

`ended:enableRecordingButton`

```html
<audio ended:enableRecordingButton src="phrase-fr-12.mp3"></audio>
```

<!-- custom: enableRecordingButton — enables the record-your-voice button (cross-element) -->

# 5. Drag & drop / clipboard

> A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop.

`dragover:prevent` and `drop:prevent:saveCardStatus`

```html
<ul class="column" dragover:prevent drop:prevent:saveCardStatus data-status="in-progress">...</ul>
```

<!-- custom: saveCardStatus — persists the dropped card's new status -->

> A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active.

`dragover:prevent:class_drop-target_add` and `dragleave:class_drop-target_remove`

```html
<div class="avatar-drop" dragover:prevent:class_drop-target_add dragleave:class_drop-target_remove drop:prevent:uploadAvatar>&#128247;</div>
```

> When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes.

`dragover:prevent` and `drop:prevent:uploadWithProgress`

```html
<div class="upload-zone" dragover:prevent drop:prevent:uploadWithProgress>Drop PDF here</div>
```

<!-- custom: uploadWithProgress — uploads the dropped file while filling the in-zone progress bar -->

> A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly.

`dragstart:markDraggedRow` and `drop:prevent:reorderTracks`

```html
<ol class="playlist" dragstart:markDraggedRow dragover:prevent drop:prevent:reorderTracks>...</ol>
```

<!-- custom: markDraggedRow — tags the row being dragged for the drop handler -->
<!-- custom: reorderTracks — splices the row into its new position and rewrites track numbers -->

> Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop.

`dragstart:showGhostPlaceholders` and `drop:prevent:reflowDashboardGrid`

```html
<section class="dashboard" dragstart:showGhostPlaceholders dragover:prevent drop:prevent:reflowDashboardGrid>...</section>
```

<!-- custom: showGhostPlaceholders — renders ghost slots at every valid landing position -->
<!-- custom: reflowDashboardGrid — commits the widget to its slot and reflows the grid -->

> A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element)

`copy:showCopiedToast`

```html
<code copy:showCopiedToast>sk-live-9f27…</code>
```

<!-- custom: showCopiedToast — pops a confirmation toast after the copy succeeds (cross-element) -->

> When a user pastes a list of email addresses into an invite field, they are split into individual removable chips.

`paste:splitEmailsIntoChips`

```html
<input paste:splitEmailsIntoChips name="invitees" placeholder="Paste emails">
```

<!-- custom: splitEmailsIntoChips — parses the pasted list into individual removable chips -->

> When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element)

`dragover:prevent` and `drop:prevent:fillAppointmentSlot`

```html
<li class="slot" dragover:prevent drop:prevent:fillAppointmentSlot data-slot="10:30">10:30 — open</li>
```

<!-- custom: fillAppointmentSlot — books the dropped patient into the slot and offers undo (cross-element) -->

> Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element)

`dragover:prevent` and `drop:prevent:addToComparisonTray`

```html
<div class="comparison-tray" dragover:prevent drop:prevent:addToComparisonTray>Compare (0)</div>
```

<!-- custom: addToComparisonTray — bumps the tray badge and appends the item thumbnail (cross-element) -->

> A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback.

`click:copy:class_copied_add:wait_1500:class_copied_remove`

```html
<button click:copy:class_copied_add:wait_1500:class_copied_remove>Copy</button>
```

> When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element)

`dragleave:hideDropOverlayWhenLeavingWindow`

```html
<body dragleave:hideDropOverlayWhenLeavingWindow>...</body>
```

<!-- custom: hideDropOverlayWhenLeavingWindow — hides the drop overlay once the drag exits the window (cross-element) -->

> A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element)

`drop:prevent:updateStackingOrder`

```html
<ol class="layers" dragover:prevent drop:prevent:updateStackingOrder>...</ol>
```

<!-- custom: updateStackingOrder — reorders the layer and re-renders the canvas stacking (cross-element) -->

> When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element)

`paste:fetchLinkPreview`

```html
<textarea paste:fetchLinkPreview placeholder="Message…"></textarea>
```

<!-- custom: fetchLinkPreview — fetches the pasted URL's preview card and attaches it below the draft (cross-element) -->

> A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately.

`drop:prevent:reorderStopAndRecalculate`

```html
<ol class="route-stops" dragover:prevent drop:prevent:reorderStopAndRecalculate>...</ol>
```

<!-- custom: reorderStopAndRecalculate — moves the stop and recalculates all itinerary distances -->

> A user pastes a one-time code into a six box verification input and each digit lands in its own box.

`paste:distributeOtpDigits`

```html
<div class="otp" paste:distributeOtpDigits>
  <input maxlength="1"><input maxlength="1"><input maxlength="1">
</div>
```

<!-- custom: distributeOtpDigits — spreads the pasted digits one per box across the verification inputs -->

> A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)

`cut:enablePasteOption`

```html
<div cut:enablePasteOption contenteditable="true">Meeting notes…</div>
```

<!-- custom: enablePasteOption — enables the toolbar's paste action once the clipboard has content (cross-element) -->

# 6. Focus & selection

> When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element)

`focus:expandSuggestionsPanel`

```html
<input focus:expandSuggestionsPanel type="search" placeholder="Search help">
```

<!-- custom: expandSuggestionsPanel — expands the suggested-articles panel beneath the field (cross-element) -->

> When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element)

`focus:openMegamenuPanel`

```html
<button focus:openMegamenuPanel aria-haspopup="true">Services</button>
```

<!-- custom: openMegamenuPanel — opens the panel and readies its first link for arrow-key navigation (cross-element) -->

> When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element)

`selectionchange:showSelectionToolbar`

```html
<article selectionchange:showSelectionToolbar>...</article>
```

<!-- custom: showSelectionToolbar — floats the highlight/copy/share toolbar above the current selection (cross-element) -->

> When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it.

`focus:announceKeyboardControls`

```html
<div focus:announceKeyboardControls role="grid" aria-label="Date picker">...</div>
```

<!-- custom: announceKeyboardControls — speaks the available keyboard controls via the live region -->

> When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element)

`selectionchange:updateSelectionStats`

```html
<table selectionchange:updateSelectionStats>...</table>
```

<!-- custom: updateSelectionStats — computes the sum and average of the selected range into the status bar (cross-element) -->

> When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element)

`focus:switchKeyboardLayout`

```html
<textarea focus:switchKeyboardLayout lang="fr"></textarea>
```

<!-- custom: switchKeyboardLayout — switches the on-screen keyboard to the target language layout (cross-element) -->

> When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs.

`blur:normalizeCouponCode:validateCoupon`

```html
<input blur:normalizeCouponCode:validateCoupon name="coupon">
```

<!-- custom: normalizeCouponCode — trims and uppercases the value in place -->
<!-- custom: validateCoupon — validates the normalized code -->

> When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card.

`focus:class_focused_add` and `blur:class_focused_remove`

```html
<article class="listing-card" focus:class_focused_add blur:class_focused_remove tabindex="0">...</article>
```

> When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element)

`selectionchange:enableWaveformEditButtons`

```html
<div class="waveform" selectionchange:enableWaveformEditButtons>...</div>
```

<!-- custom: enableWaveformEditButtons — enables cut and fade once a waveform range is selected (cross-element) -->

> When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element)

`selectionchange:resetBlockFormatDropdown`

```html
<div selectionchange:resetBlockFormatDropdown contenteditable="true">...</div>
```

<!-- custom: resetBlockFormatDropdown — resets the format dropdown to the caret's paragraph style (cross-element) -->

> When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers.

`focus:announceCodeLength`

```html
<input focus:announceCodeLength maxlength="1" aria-label="Digit 1 of 6" data-code-length="6">
```

<!-- custom: announceCodeLength — announces the expected code length through the live region -->

> When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label.

`blur:class_unsaved_add`

```html
<input blur:class_unsaved_add name="display-name">
```

> A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular)

`focus:ringOnKeyboardFocusOnly`

```html
<button focus:ringOnKeyboardFocusOnly>Save</button>
```

<!-- custom: ringOnKeyboardFocusOnly — adds the ring class only when the focus came from the keyboard -->

> When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element)

`blur:validateAddressGroup`

```html
<input blur:validateAddressGroup name="zip" data-group="address">
```

<!-- custom: validateAddressGroup — validates the whole address group, then lets shipping options load (cross-element) -->

# 7. Visibility & intersection

> When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder.

`intersection:loadRealImage`

```html
<img intersection:loadRealImage src="placeholder.jpg" data-src="product-full.jpg" alt="Lamp">
```

<!-- custom: loadRealImage — swaps the placeholder for the real image once visible -->

> When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element)

`intersection:loadNextPage`

```html
<li class="sentinel" intersection:loadNextPage aria-hidden="true"></li>
```

<!-- custom: loadNextPage — fetches the next history page and appends it to the list (cross-element) -->

> When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values.

`intersection:animateCounters`

```html
<section class="stats" intersection:animateCounters>
  <span data-target="12000">0</span>
</section>
```

<!-- custom: animateCounters — animates each counter from zero to its data-target value -->

> When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element)

`intersection:highlightTocEntry`

```html
<section intersection:highlightTocEntry id="chapter-3"><h2>Chapter 3</h2>...</section>
```

<!-- custom: highlightTocEntry — highlights the table-of-contents entry matching the visible section (cross-element) -->

> When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves.

`intersection:toggleAutoplayMuted`

```html
<video intersection:toggleAutoplayMuted src="clip.mp4" muted playsinline></video>
```

<!-- custom: toggleAutoplayMuted — plays muted at half visibility and pauses when the video leaves -->

> When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing.

`intersection:wait_1000:recordImpression`

```html
<div class="ad-slot" intersection:wait_1000:recordImpression data-ad-id="A-2201"></div>
```

<!-- custom: recordImpression — logs the viewable impression for billing -->

> When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle.

`intersection:startLiveDataRefresh`

```html
<div class="chart" intersection:startLiveDataRefresh data-feed="/api/vitals"></div>
```

<!-- custom: startLiveDataRefresh — fetches live sensor data and starts the chart's refresh cycle -->

> When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element)

`intersection:activateProgressDot`

```html
<section class="walkthrough-step" intersection:activateProgressDot data-step="2">...</section>
```

<!-- custom: activateProgressDot — activates the matching dot in the progress rail (cross-element) -->

> When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element)

`intersection:enlargeMapPin`

```html
<article class="property-card" intersection:enlargeMapPin data-pin="p-114">...</article>
```

<!-- custom: enlargeMapPin — enlarges the map pin matching the visible card (cross-element) -->

> When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast.

`intersection:lazyLoadReviews`

```html
<section intersection:lazyLoadReviews data-endpoint="/api/hotels/44/reviews"><h2>Reviews</h2></section>
```

<!-- custom: lazyLoadReviews — fetches and renders review scores on first visibility -->

> When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place.

`intersection:class_in-view_add`

```html
<div class="slide" intersection:class_in-view_add>Pro plan <span class="badge">Best value</span></div>
```

> When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.

`intersection:preloadComments`

```html
<section intersection:preloadComments data-thread="t-903"><h2>Comments</h2></section>
```

<!-- custom: preloadComments — starts loading comments just before the section scrolls in -->

> When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element)

`intersection:toggleStickyHero`

```html
<header class="hero" intersection:toggleStickyHero>...</header>
```

<!-- custom: toggleStickyHero — shows the compact sticky banner once the hero is mostly out of view (cross-element) -->

> When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking.

`intersection:wait_2000:logSeenImpression`

```html
<article class="job-card" intersection:wait_2000:logSeenImpression data-job="j-5817">...</article>
```

<!-- custom: logSeenImpression — logs the card as a seen impression for ranking -->

> When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element)

`intersection:enableAcceptButton`

```html
<div class="scroll-box">
  <p>…terms…</p>
  <span intersection:enableAcceptButton class="doc-end"></span>
</div>
```

<!-- custom: enableAcceptButton — enables the accept button once the document end is visible (cross-element) -->

> When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element)

`intersection:markMessagesRead`

```html
<hr intersection:markMessagesRead class="unread-divider" data-from="msg-881">
```

<!-- custom: markMessagesRead — marks everything below the divider as read on the server (cross-element) -->

> When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one.

`intersection:fadeInEntranceLabels`

```html
<figure intersection:fadeInEntranceLabels>
  <img src="floor-plan.svg" alt="Floor plan">
</figure>
```

<!-- custom: fadeInEntranceLabels — staggers the entrance labels fading in one by one -->

> When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once.

`intersection:playInfographicOnce`

```html
<section intersection:playInfographicOnce class="impact">...</section>
```

<!-- custom: playInfographicOnce — plays the infographic animation a single time only -->

> A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte)

`intersection:animateInOnce`

```html
<article intersection:animateInOnce class="card">...</article>
```

<!-- custom: animateInOnce — runs the fade-and-slide entrance once, then never again -->

> When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch.

`intersection:batchLoadImages`

```html
<section intersection:batchLoadImages class="seller-strip">...</section>
```

<!-- custom: batchLoadImages — lazy-loads every image in the strip in one batch -->

> When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element)

`intersection:dockMiniPlayerWhenOutOfView`

```html
<div class="recipe-player" intersection:dockMiniPlayerWhenOutOfView>...</div>
```

<!-- custom: dockMiniPlayerWhenOutOfView — docks the mini player when the main player scrolls away (cross-element) -->

# 8. Attribute & DOM mutation

> When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward.

`attr_aria-expanded:rotateChevron`

```html
<button attr_aria-expanded:rotateChevron aria-expanded="false">Menu &#9662;</button>
```

<!-- custom: rotateChevron — rotates the chevron to match the expanded state -->

> When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element)

`attr_data-theme:rerenderChartsDark`

```html
<html attr_data-theme:rerenderChartsDark data-theme="light">
```

<!-- custom: rerenderChartsDark — re-renders every chart with the dark palette (cross-element) -->

> When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye.

`attr:pulseBadge`

```html
<span class="badge" attr:pulseBadge>3</span>
```

<!-- custom: pulseBadge — pulses the badge when its text content changes (needs characterData observation) -->

> When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element)

`attr:hideHelpLinkOnWidgetInject`

```html
<body attr:hideHelpLinkOnWidgetInject>...</body>
```

<!-- custom: hideHelpLinkOnWidgetInject — hides the native help link when the widget node appears (needs childList observation; cross-element) -->

> When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere.

`attr:announceLiveRegion`

```html
<div attr:announceLiveRegion role="status" aria-live="polite"></div>
```

<!-- custom: announceLiveRegion — announces the new text without moving focus (needs characterData observation) -->

> When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color.

`attr_disabled:animateEnabledColor`

```html
<button attr_disabled:animateEnabledColor disabled>Place order</button>
```

<!-- custom: animateEnabledColor — animates the button to its enabled color once disabled is removed -->

> When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element)

`attr_data-state:toggleGlobalSpinner`

```html
<video attr_data-state:toggleGlobalSpinner data-state="playing" src="lesson.mp4"></video>
```

<!-- custom: toggleGlobalSpinner — shows the global spinner while state is buffering (cross-element) -->

> When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element)

`attr_class:updateErrorSummary`

```html
<form attr_class:updateErrorSummary>...</form>
```

<!-- custom: updateErrorSummary — rebuilds the summary banner from all error-marked fields (cross-element) -->

> When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element)

`attr_lang:rerenderLocalizedFormats`

```html
<html attr_lang:rerenderLocalizedFormats lang="en">
```

<!-- custom: rerenderLocalizedFormats — re-renders date pickers and number formats for the new locale (cross-element) -->

> When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match.

`attr_aria-selected:highlightRow`

```html
<tr attr_aria-selected:highlightRow aria-selected="false">...</tr>
```

<!-- custom: highlightRow — highlights the row background while its selected state is true -->

> When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change.

`attr:flashPriceDirection`

```html
<td attr:flashPriceDirection class="ticker-cell">182.40</td>
```

<!-- custom: flashPriceDirection — flashes green or red based on the direction of the change (needs characterData observation) -->

> When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element)

`attr:nudgeLayoutForInjectedNodes`

```html
<body attr:nudgeLayoutForInjectedNodes>...</body>
```

<!-- custom: nudgeLayoutForInjectedNodes — shifts layout so injected nodes never overlap content (needs childList observation; cross-element) -->

> When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element)

`attr_data-current-step:announceStepName`

```html
<ol attr_data-current-step:announceStepName class="step-indicator" data-current-step="2">...</ol>
```

<!-- custom: announceStepName — announces the new step name in the page heading (cross-element) -->

> When a carousel slide gains the active class, its caption text fades in while the previous caption hides.

`attr_class:fadeCaptionOnActive`

```html
<div attr_class:fadeCaptionOnActive class="slide">
  <img src="slide-2.jpg" alt="">
  <p class="caption">Second caption</p>
</div>
```

<!-- custom: fadeCaptionOnActive — fades in the new active caption and hides the previous one -->

> When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article.

`attr:collapseWhenEmpty`

```html
<div attr:collapseWhenEmpty class="ad-container">...</div>
```

<!-- custom: collapseWhenEmpty — collapses the container once its creative is stripped (needs childList observation) -->

> When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element)

`attr_data-breakpoint:swapNavigationMode`

```html
<html attr_data-breakpoint:swapNavigationMode data-breakpoint="mobile">
```

<!-- custom: swapNavigationMode — swaps the navigation between drawer and menubar modes (cross-element) -->

> When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice.

`attr_class:collapseFlaggedComment`

```html
<li attr_class:collapseFlaggedComment class="comment">...</li>
```

<!-- custom: collapseFlaggedComment — collapses the comment into a removed-content notice when hidden is added -->

> When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order.

`attr:renumberRows`

```html
<tbody attr:renumberRows>...</tbody>
```

<!-- custom: renumberRows — rewrites row numbers after any child order change (needs childList observation) -->

> When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant.

`attr_data-experiment:swapHeroVariant`

```html
<section attr_data-experiment:swapHeroVariant class="hero">...</section>
```

<!-- custom: swapHeroVariant — swaps the hero content to the variant named in the attribute -->

> When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye.

`attr_type:swapVisibilityIcon`

```html
<span class="password-wrap">
  <input attr_type:swapVisibilityIcon type="password" name="pw">
</span>
```

<!-- custom: swapVisibilityIcon — swaps the eye icon to match the field's type -->

> When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading.

`attr_src:fadeInWhenLoaded`

```html
<img attr_src:fadeInWhenLoaded alt="Team photo">
```

<!-- custom: fadeInWhenLoaded — waits for the new src to finish loading, then fades the image in -->

> When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element)

`attr_data-ready:initializeEnhancements`

```html
<body attr_data-ready:initializeEnhancements>...</body>
```

<!-- custom: initializeEnhancements — runs the queued UI enhancements in order once ready is set (cross-element) -->

# 9. Resize & viewport

> When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.

`resize:reflowChartGrid`

```html
<div class="chart-grid" resize:reflowChartGrid>...</div>
```

<!-- custom: reflowChartGrid — reflows the grid from three columns to one below tablet width -->

> When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element)

`resize:expandPlayerToOrientation`

```html
<div class="lesson-layout" resize:expandPlayerToOrientation>...</div>
```

<!-- custom: expandPlayerToOrientation — expands the player to fill the new orientation (cross-element) -->

> When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold.

`resize:shrinkEditorAndHideMinimap`

```html
<aside class="sidebar" resize:shrinkEditorAndHideMinimap>...</aside>
```

<!-- custom: shrinkEditorAndHideMinimap — shrinks the editor and hides its minimap below the width threshold -->

> When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions.

`resize:redrawChart`

```html
<div class="chart-container" resize:redrawChart>
  <canvas></canvas>
</div>
```

<!-- custom: redrawChart — redraws the chart to fit the container's new dimensions -->

> When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed.

`resize:scaleCanvasLetterboxed`

```html
<canvas resize:scaleCanvasLetterboxed width="1280" height="720"></canvas>
```

<!-- custom: scaleCanvasLetterboxed — scales the canvas while letterboxing to preserve aspect ratio -->

> When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element)

`resize:repositionCharCounter`

```html
<textarea resize:repositionCharCounter maxlength="500"></textarea>
```

<!-- custom: repositionCharCounter — keeps the counter tucked beneath the resized textarea (cross-element) -->

> When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size.

`resize:adjustGalleryColumns`

```html
<div class="gallery" resize:adjustGalleryColumns>...</div>
```

<!-- custom: adjustGalleryColumns — adds or removes columns to keep thumbnails at a comfortable size -->

> When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)

`resize:keepSubmitVisible`

```html
<form resize:keepSubmitVisible>...</form>
```

<!-- custom: keepSubmitVisible — keeps the sticky submit button in view when the viewport shrinks (cross-element) -->

> When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element)

`resize:recenterMap`

```html
<div class="store-map" resize:recenterMap>...</div>
```

<!-- custom: recenterMap — recenters the map so the selected store stays visible (cross-element) -->

> When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width.

`resize:enforceMinimumPaneWidth`

```html
<div class="split-view" resize:enforceMinimumPaneWidth data-min-width="240">...</div>
```

<!-- custom: enforceMinimumPaneWidth — clamps each pane at its minimum width while the divider moves -->

> When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.

`resize:switchToStackedLayout`

```html
<main class="kiosk" resize:switchToStackedLayout>...</main>
```

<!-- custom: switchToStackedLayout — switches to the single-column flow in portrait orientation -->

> A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte)

`resize:swapLabelForIcon`

```html
<span class="badge" resize:swapLabelForIcon>Notifications</span>
```

<!-- custom: swapLabelForIcon — swaps the full label for a compact icon when the badge gets too narrow -->

# 10. Scroll

> As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element)

`scroll:updateReadingProgress`

```html
<article scroll:updateReadingProgress>...</article>
```

<!-- custom: updateReadingProgress — fills the top progress bar in proportion to reading depth (cross-element) -->

> When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element)

`scroll:enableAcceptAtEnd`

```html
<div class="terms-box" scroll:enableAcceptAtEnd>...</div>
```

<!-- custom: enableAcceptAtEnd — enables the accept button once the document is scrolled to the end (cross-element) -->

> When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element)

`scroll:pinBookTourBarPastHero`

```html
<main scroll:pinBookTourBarPastHero>...</main>
```

<!-- custom: pinBookTourBarPastHero — pins the compact book-a-tour bar once the hero scrolls past (cross-element) -->

> When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element)

`scroll:toggleBackToTopPill`

```html
<main class="feed" scroll:toggleBackToTopPill>...</main>
```

<!-- custom: toggleBackToTopPill — shows the pill on fast upward scroll and hides it near the top (cross-element) -->

> When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping.

`scroll:prependEarlierHistory`

```html
<div class="chat-window" scroll:prependEarlierHistory>...</div>
```

<!-- custom: prependEarlierHistory — fetches and prepends older messages while preserving scroll position -->

> When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible.

`scroll:freezeFirstColumn`

```html
<div class="sheet-scroll" scroll:freezeFirstColumn>
  <table>...</table>
</div>
```

<!-- custom: freezeFirstColumn — keeps the first column pinned during horizontal scroll -->

> When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card.

`scrollend:snapToNearestCard`

```html
<div class="carousel-row" scrollend:snapToNearestCard>...</div>
```

<!-- custom: snapToNearestCard — snaps the scroll position to center the nearest card -->

> When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element)

`scroll:pauseAutoFollow`

```html
<div class="lyrics" scroll:pauseAutoFollow>...</div>
```

<!-- custom: pauseAutoFollow — pauses lyric auto-follow until the jump-to-current-line button is pressed (cross-element) -->

> When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll.

`scroll:collapseNavOnScrollDirection`

```html
<header class="top-nav" scroll:collapseNavOnScrollDirection>...</header>
```

<!-- custom: collapseNavOnScrollDirection — collapses the nav on downward scroll and expands it on upward scroll -->

> When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element)

`scroll:syncExplanationPane`

```html
<div class="code-panel" scroll:syncExplanationPane>...</div>
```

<!-- custom: syncExplanationPane — scrolls the explanation pane to the matching section (cross-element) -->

> While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element)

`scroll:lockBackgroundScroll`

```html
<div class="modal-body" scroll:lockBackgroundScroll>...</div>
```

<!-- custom: lockBackgroundScroll — keeps the page behind the modal scroll-locked (cross-element) -->

> When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element)

`scroll:updateChapterLabel`

```html
<main class="annual-report" scroll:updateChapterLabel>...</main>
```

<!-- custom: updateChapterLabel — updates the corner chapter label as headings scroll past (cross-element) -->

# 11. Animation & transition

> When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds.

`animationend:wait_3000:dismissToast`

```html
<div class="toast" animationend:wait_3000:dismissToast>Payment received</div>
```

<!-- custom: dismissToast — dismisses the toast once the delay elapses -->

> When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.

`transitionend:removeFromDom`

```html
<div class="modal closing" transitionend:removeFromDom>...</div>
```

<!-- custom: removeFromDom — removes the element from the DOM after its exit transition -->

> When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element)

`animationiteration:swapInRealContent`

```html
<div class="skeleton" animationiteration:swapInRealContent>...</div>
```

<!-- custom: swapInRealContent — swaps the skeleton for real content at the end of an iteration (cross-element) -->

> When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element)

`animationend:fadeInShareButtons`

```html
<div class="confetti" animationend:fadeInShareButtons>&#127881;</div>
```

<!-- custom: fadeInShareButtons — fades in the share-your-certificate buttons (cross-element) -->

> When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element)

`transitionend:focusFirstLink`

```html
<nav class="drawer" transitionend:focusFirstLink>...</nav>
```

<!-- custom: focusFirstLink — moves focus to the drawer's first link after it opens (cross-element) -->

> When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space.

`animationcancel:showErrorCard`

```html
<div class="spinner" animationcancel:showErrorCard></div>
```

<!-- custom: showErrorCard — replaces the spinner with an error card when its animation is cancelled -->

> When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.

`animationend:removeOverlay`

```html
<div class="heart-burst" animationend:removeOverlay>&#10084;</div>
```

<!-- custom: removeOverlay — removes the overlay element so taps pass through again -->

> When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.

`animationend:class_flash_remove`

```html
<tr class="flash" animationend:class_flash_remove>...</tr>
```

> When a badge's pulse animation completes three iterations, it stops so it does not distract from reading.

`animationiteration:stopAfterThreePulses`

```html
<span class="badge pulsing" animationiteration:stopAfterThreePulses>New</span>
```

<!-- custom: stopAfterThreePulses — halts the pulse animation after three iterations -->

> When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element)

`transitionend:focusFirstField`

```html
<section class="form-step" transitionend:focusFirstField>...</section>
```

<!-- custom: focusFirstField — focuses the new step's first field after the transition (cross-element) -->

> When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)

`transitionend:removeListItem`

```html
<li class="leaving" transitionend:removeListItem>...</li>
```

<!-- custom: removeListItem — deletes the item's data and removes the element after its exit transition -->

# 12. Navigation & history

> When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element)

`popstate:syncLessonRoute`

```html
<main class="course-app" popstate:syncLessonRoute>...</main>
```

<!-- custom: syncLessonRoute — stops the previous video and scrolls the outline to the new lesson (cross-element) -->

> When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history.

`popstate:restoreFilterState`

```html
<form class="search-filters" popstate:restoreFilterState>...</form>
```

<!-- custom: restoreFilterState — reapplies the filter state stored in the history entry -->

> When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element)

`hashchange:highlightTargetHeading`

```html
<article class="docs" hashchange:highlightTargetHeading>...</article>
```

<!-- custom: highlightTargetHeading — briefly highlights the heading matching the new hash (cross-element) -->

> When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost.

`beforeunload:warnUnsavedPatientData`

```html
<form class="intake-form" beforeunload:warnUnsavedPatientData>...</form>
```

<!-- custom: warnUnsavedPatientData — triggers the native stay-or-leave confirmation while unsaved -->

> When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element)

`popstate:updatePageMetadata`

```html
<main class="music-app" popstate:updatePageMetadata>...</main>
```

<!-- custom: updatePageMetadata — updates the page title and social preview metadata for the new view (cross-element) -->

> When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values.

`pageshow:refreshPrices`

```html
<main class="trading-page" pageshow:refreshPrices>...</main>
```

<!-- custom: refreshPrices — re-fetches current prices when the page is restored from the bfcache -->

> When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads.

`load:activateDeepLinkedTab`

```html
<main class="admin-console" load:activateDeepLinkedTab>...</main>
```

<!-- custom: activateDeepLinkedTab — activates the tab named in the URL and loads its content -->

> When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element)

`popstate:resetCartBadgeOnConfirmation`

```html
<main class="shop" popstate:resetCartBadgeOnConfirmation>...</main>
```

<!-- custom: resetCartBadgeOnConfirmation — zeroes the header cart badge on the confirmation route (cross-element) -->

> When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element)

`popstate:syncStepIndicator`

```html
<main class="booking-flow" popstate:syncStepIndicator>...</main>
```

<!-- custom: syncStepIndicator — moves the step indicator to the step named in the URL (cross-element) -->

> When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element)

`popstate:closeLightboxOnBack`

```html
<div class="lightbox" popstate:closeLightboxOnBack open>...</div>
```

<!-- custom: closeLightboxOnBack — closes the lightbox and swallows the back navigation (cross-element) -->

> When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element)

`load:applyLocaleFromUrl`

```html
<body load:applyLocaleFromUrl>...</body>
```

<!-- custom: applyLocaleFromUrl — switches all date and currency formats to the URL's locale prefix (cross-element) -->

# 13. Window/document lifecycle

> When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element)

`load:prioritizeFoldAndLoadComments`

```html
<body load:prioritizeFoldAndLoadComments>...</body>
```

<!-- custom: prioritizeFoldAndLoadComments — boosts above-the-fold images and starts the deferred comments module (cross-element) -->

> When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element)

`visibilitychange:pausePreviewWhenHidden`

```html
<div class="call-tile" visibilitychange:pausePreviewWhenHidden>...</div>
```

<!-- custom: pausePreviewWhenHidden — pauses the local preview and shows the away indicator while hidden (cross-element) -->

> When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll.

`visibilitychange:refreshScoresOnVisible`

```html
<main class="scores-app" visibilitychange:refreshScoresOnVisible>...</main>
```

<!-- custom: refreshScoresOnVisible — refreshes scores immediately when the tab becomes visible -->

> When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element)

`offline:showOfflineBannerAndQueue`

```html
<body offline:showOfflineBannerAndQueue>...</body>
```

<!-- custom: showOfflineBannerAndQueue — shows the offline banner and queues submissions locally (cross-element) -->

> When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element)

`online:flushMessageQueue`

```html
<body online:flushMessageQueue>...</body>
```

<!-- custom: flushMessageQueue — sends queued messages in order and slides the offline banner away (cross-element) -->

> When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave.

`beforeunload:promptStayOrLeave`

```html
<body beforeunload:promptStayOrLeave>...</body>
```

<!-- custom: promptStayOrLeave — raises the native stay-or-leave prompt while the document is unsaved -->

> When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element)

`pageshow:resyncCartCount`

```html
<body pageshow:resyncCartCount>...</body>
```

<!-- custom: resyncCartCount — re-syncs the cart count from the server after a bfcache restore (cross-element) -->

> When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background.

`visibilitychange:pauseGameLoopWhenHidden`

```html
<canvas visibilitychange:pauseGameLoopWhenHidden id="game"></canvas>
```

<!-- custom: pauseGameLoopWhenHidden — pauses the game loop while the tab is hidden and resumes on return -->

> When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content.

`load:scheduleOvernightReload`

```html
<body load:scheduleOvernightReload data-reload-at="03:00">...</body>
```

<!-- custom: scheduleOvernightReload — schedules the nightly content reload for the kiosk -->

> When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text.

`dcl:remeasureHeadlinesAfterFonts`

```html
<body dcl:remeasureHeadlinesAfterFonts>...</body>
```

<!-- custom: remeasureHeadlinesAfterFonts — waits for document.fonts.ready, then re-measures headlines -->

# 14. Fullscreen

> When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly.

`click:requestFullscreen:showExitHintBriefly`

```html
<button click:requestFullscreen:showExitHintBriefly aria-label="Fullscreen">&#x26F6;</button>
```

<!-- custom: requestFullscreen — requests fullscreen on the player element -->
<!-- custom: showExitHintBriefly — flashes the exit hint for a few seconds -->

> When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element)

`fullscreenchange:restoreThumbnailsOnExit`

```html
<div class="slideshow" fullscreenchange:restoreThumbnailsOnExit>...</div>
```

<!-- custom: restoreThumbnailsOnExit — brings back the thumbnail strip and captions after exit (cross-element) -->

> When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity.

`fullscreenchange:autoHideNavigationHints`

```html
<div class="deck" fullscreenchange:autoHideNavigationHints>...</div>
```

<!-- custom: autoHideNavigationHints — hides the navigation hints after a few idle seconds in fullscreen -->

> When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead.

`fullscreenerror:openModalFallback`

```html
<div class="map-embed" fullscreenerror:openModalFallback>...</div>
```

<!-- custom: openModalFallback — opens the larger modal when the fullscreen request is denied -->

> When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element)

`fullscreenchange:toggleSiteHeader`

```html
<body fullscreenchange:toggleSiteHeader>...</body>
```

<!-- custom: toggleSiteHeader — hides the site header during fullscreen and restores it after (cross-element) -->

> When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element)

`fullscreenchange:returnPlayerInline`

```html
<video fullscreenchange:returnPlayerInline src="interview.mp4"></video>
```

<!-- custom: returnPlayerInline — docks the player back into its inline article position (cross-element) -->

> When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element)

`fullscreenchange:resizeControlHints`

```html
<canvas fullscreenchange:resizeControlHints id="game"></canvas>
```

<!-- custom: resizeControlHints — rescales the on-screen control hints for the fullscreen area (cross-element) -->

# 15. State store reactivity

> When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation.

`state_cartCount:bumpCartBadge`

```html
<span class="cart-icon" state_cartCount:bumpCartBadge>&#128722;</span>
```

<!-- custom: bumpCartBadge — plays the badge bump animation with the new count -->

> When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu.

`state_loggedIn:renderAuthHeader`

```html
<header state_loggedIn:renderAuthHeader>...</header>
```

<!-- custom: renderAuthHeader — swaps the sign-in link for the avatar menu based on the flag -->

> When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted.

`state_currency:convertAllPrices`

```html
<body state_currency:convertAllPrices>...</body>
```

<!-- custom: convertAllPrices — re-renders every price converted and formatted in the new currency -->

> When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter.

`state_unreadCount:syncNotificationUI`

```html
<span class="bell" state_unreadCount:syncNotificationUI>&#128276;</span>
```

<!-- custom: syncNotificationUI — hides the bell dot and clears the tab-title counter at zero -->

> When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates.

`state_stockPrice:flashRowAndRecalculate`

```html
<tr state_stockPrice:flashRowAndRecalculate data-symbol="ACME">...</tr>
```

<!-- custom: flashRowAndRecalculate — flashes the row and recomputes the portfolio total -->

> When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it.

`state_sidebarCollapsed:resizeMainContent`

```html
<main state_sidebarCollapsed:resizeMainContent>...</main>
```

<!-- custom: resizeMainContent — widens the content area and resizes its charts to fill it -->

> When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically.

`state_checkedIn:removeFromWaitingBoard`

```html
<ul class="waiting-board" state_checkedIn:removeFromWaitingBoard>...</ul>
```

<!-- custom: removeFromWaitingBoard — removes the checked-in patient's initials from the board -->

> When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork.

`state_currentTrack:updateNowPlayingBar`

```html
<footer class="now-playing" state_currentTrack:updateNowPlayingBar>...</footer>
```

<!-- custom: updateNowPlayingBar — updates the title, artist, and artwork in the now-playing bar -->

> When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element)

`state_activeFilters:refetchResultsGrid`

```html
<div class="filter-chips" state_activeFilters:refetchResultsGrid>...</div>
```

<!-- custom: refetchResultsGrid — re-fetches the results grid and updates its count (cross-element) -->

> When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note.

`state_online:toggleSubmitAvailability`

```html
<body state_online:toggleSubmitAvailability>...</body>
```

<!-- custom: toggleSubmitAvailability — disables every submit button with a reconnecting note while offline -->

> When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager.

`state_storageQuota:toggleUpgradeBanner`

```html
<main class="file-manager" state_storageQuota:toggleUpgradeBanner>...</main>
```

<!-- custom: toggleUpgradeBanner — shows the upgrade banner when the quota drops below ten percent -->

> When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element)

`state_activeWorkspace:reloadWorkspaceTables`

```html
<main class="admin" state_activeWorkspace:reloadWorkspaceTables>...</main>
```

<!-- custom: reloadWorkspaceTables — reloads every table with the new workspace's permissions and data (cross-element) -->

> When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen.

`state_quizScore:unlockCertificateButton`

```html
<section class="quiz-summary" state_quizScore:unlockCertificateButton>...</section>
```

<!-- custom: unlockCertificateButton — unlocks the certificate button once the score passes the threshold -->

> When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document.

`state_documentTitle:syncTabTitle`

```html
<body state_documentTitle:syncTabTitle>...</body>
```

<!-- custom: syncTabTitle — writes the shared document title into the browser tab title -->

> When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors.

`state_theme:applyTheme`

```html
<body state_theme:applyTheme>...</body>
```

<!-- custom: applyTheme — flips the root theme attribute and recolors every chart -->

> When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately.

`state_audioMuted:applyAudioMute`

```html
<body state_audioMuted:applyAudioMute>...</body>
```

<!-- custom: applyAudioMute — mutes or unmutes every sound effect in the session immediately -->

> When every step completion flag in a multi-step application reads true, the review and submit section enables.

`state_step1Complete_step2Complete_step3Complete:enableReviewSubmit`

```html
<section state_step1Complete_step2Complete_step3Complete:enableReviewSubmit class="review-submit">...</section>
```

<!-- custom: enableReviewSubmit — enables the review and submit section once all step flags are set -->

> When a bid raises the store's current highest bid, all watching clients see the price and countdown change together.

`state_highestBid:syncAuctionDisplay`

```html
<section class="auction" state_highestBid:syncAuctionDisplay>...</section>
```

<!-- custom: syncAuctionDisplay — updates the price and countdown in step with the highest bid -->

> When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it.

`state_deviceStatus:dimOfflineTile`

```html
<div class="device-tile" state_deviceStatus:dimOfflineTile data-device="hall-thermostat">...</div>
```

<!-- custom: dimOfflineTile — dims the tile and shows the reconnect option while the device is offline -->

> When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it.

`state_draftsCount:syncDraftsBadge`

```html
<li class="folder" state_draftsCount:syncDraftsBadge>Drafts <span class="badge">2</span></li>
```

<!-- custom: syncDraftsBadge — syncs the sidebar drafts badge to the store count -->

> A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue)

`state_firstName_lastName:renderGreeting`

```html
<p state_firstName_lastName:renderGreeting>Hello, Ada Lovelace</p>
```

<!-- custom: renderGreeting — re-renders the greeting whenever first or last name changes -->

> A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element)

`state_modalOpen:syncModalOpen`

```html
<div class="modal" state_modalOpen:syncModalOpen role="dialog">...</div>
```

<!-- custom: syncModalOpen — opens or closes the modal to match the global open-state property (cross-element) -->

> When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React)

`state_locale:rerenderFormattedDates`

```html
<body state_locale:rerenderFormattedDates>...</body>
```

<!-- custom: rerenderFormattedDates — re-renders every formatted date for the new locale -->

> A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte)

`state_clockTick:updateClockLabel`

```html
<span state_clockTick:updateClockLabel>10:24:07</span>
```

<!-- custom: updateClockLabel — writes the latest tick into the label; the store ticks once per second while the widget is connected -->

# 16. Element connect

> When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned.

`i:requestAdCreative`

```html
<div class="ad-slot" i:requestAdCreative data-slot="sidebar-1"></div>
```

<!-- custom: requestAdCreative — requests the creative once; `i` fires a single time on first connect -->

> When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading.

`i:upgradeAvatarImage`

```html
<span class="avatar" i:upgradeAvatarImage data-photo="u-42.jpg">AL</span>
```

<!-- custom: upgradeAvatarImage — loads the photo and swaps it in for the initials placeholder -->

> When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element)

`i:highlightSyntaxAndAddCopyButton`

```html
<pre i:highlightSyntaxAndAddCopyButton><code>const x = 1;</code></pre>
```

<!-- custom: highlightSyntaxAndAddCopyButton — registers highlighting and appends the copy button (cross-element) -->

> When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates.

`i:renderRelativeTime`

```html
<time i:renderRelativeTime datetime="2026-08-23T17:40:00Z">2026-08-23</time>
```

<!-- custom: renderRelativeTime — renders the relative label and schedules its own refresh -->

> When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in.

`i:measureAndDrawInitialFrame`

```html
<div class="chart" i:measureAndDrawInitialFrame data-feed="/api/metrics"></div>
```

<!-- custom: measureAndDrawInitialFrame — measures the container and draws the first frame -->

> When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element)

`i:wireAccessibleDescription`

```html
<button i:wireAccessibleDescription data-tip="Saves your draft">&#128190;</button>
```

<!-- custom: wireAccessibleDescription — connects aria-describedby to the tooltip node (cross-element) -->

> When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element)

`i:lazyLoadMapScript`

```html
<div class="map" i:lazyLoadMapScript data-api="/vendor/map.js"></div>
```

<!-- custom: lazyLoadMapScript — loads the map library on mount and initializes the map (cross-element) -->

> When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress.

`i:restorePlaybackPosition`

```html
<video i:restorePlaybackPosition src="lesson-5.mp4" data-lesson="5"></video>
```

<!-- custom: restorePlaybackPosition — seeks to the saved playback position for this lesson -->

> When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)

`i:toggle_cloak`

```html
<div i:toggle_cloak cloak>Welcome back, Ada</div>
```

> When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars.

`i:renderStars`

```html
<star-rating i:renderStars data-rating="4" data-max="5"></star-rating>
```

<!-- custom: renderStars — reads the data attributes and renders the filled stars -->

> When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React)

`i:openPollSocket`

```html
<div class="poll-widget" i:openPollSocket data-poll="p-77"></div>
```

<!-- custom: openPollSocket — opens the socket on connect and tears it down on disconnect -->

> When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance.

`i:lazyLoadEditorLibrary`

```html
<div class="editor" i:lazyLoadEditorLibrary data-lib="/vendor/editor.js"></div>
```

<!-- custom: lazyLoadEditorLibrary — loads the editor library on demand for this instance -->

> When a counter element with a target value is inserted, it reads the target and starts counting up toward it.

`i:countUpToTarget`

```html
<span class="counter" i:countUpToTarget data-target="12500">0</span>
```

<!-- custom: countUpToTarget — reads the target value and animates the count upward -->

> When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen.

`i:removeIfConsentStored`

```html
<div class="consent-banner" i:removeIfConsentStored>...</div>
```

<!-- custom: removeIfConsentStored — removes the banner at connect when a stored decision exists -->

> When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value.

`i:animateProgressArc`

```html
<svg class="progress-ring" i:animateProgressArc data-percent="72">...</svg>
```

<!-- custom: animateProgressArc — reads the percentage and animates the arc out to it -->
