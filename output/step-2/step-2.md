# Step 2 — DD Framework Syntax Conversion

Each Step 1 use case converted to a DD-syntax fragment. One entry per use case, grouped under the original category headers, with the original English preserved exactly.

## Conventions and global notes (read first)

- Fragment shape: `trigger:reaction:reaction...` — the attribute name splits on `:` into dots; the first dot is the trigger, each later dot is a reaction resolved through `document.portals.getReaction()`. `_` suffixes parameterize a dot (e.g. `toggle_open`, `class_active_add`, `wait_2000`, `attr_data-dirty_true`), matching the current source.
- Built-in reactions used here come from the current source only: `prevent`, `log`, `toggle_<attr>`, `text_<literal>`/`text`, `html`, `wait_<ms>`, `fetch_<url>`/`fetch`, `value`/`val`, `class_<name>_add|remove|toggle`, `focus`, `blur`, `style_<prop>_<val>`, `copy_<text>`/`copy`, `attr_<name>_<val>` (set) / `attr_<name>` (get), `state_<store>_<prop>` (store write), plus the DOM-event portals' default reactions (e.g. `:click` calls `.click()`, `:submit` calls `requestSubmit()` on the owner element).
- camelCase reaction segments (e.g. `renderResults`, `saveDraft`) are app-defined portals registered via `PortalMap.define(name, { on, off, reaction })` — the framework's intended extension point. They are not individually flagged; only entries where the needed behavior is unclear from the current source carry a Notes flag.
- Attribute placement: where trigger and reaction targets live in the same component subtree, the attribute may sit on a common ancestor (bubbling/composed events propagate up the DD propagation path). Mutations inside the attribute's own subtree are treated as local. Element labels in fragments (e.g. `<html>`, `#cart-drawer`) only document placement — they are not selector syntax.
- Cross-element behavior uses the `state` store portal, the only cross-element portal mechanism in the current source: the source element writes `state_<store>_<prop>` (a sync portal call into the store, which then dispatches to subscribed attributes through the eventLoopCube), and each target element carries a `state_<store>_<prop>` trigger. `||` separates the different elements' attributes within one fragment. The current source has no dedicated element-to-element call/post portal; where the state-store mapping feels forced, the entry is flagged in Notes.
- The `state` store-write reaction stores the piped input value; where a specific literal is implied (e.g. "closed"), an app-defined reaction is assumed to shape the value before the store write.
- Keyboard key/modifier suffixes (e.g. `keydown_Escape`, `keydown_ctrl_k`) follow the trigger-suffix pattern already present in the source (`_passive`, `attr_<filter>`, `state_<store>_<props>`), but the current DomEvents portal does not yet parse key filters — all keyboard-suffix entries are flagged for manual review (global flag, not repeated per entry).
- Gesture triggers (`longpress`, `doubletap`, `pinch`, `swipe`) are used as native trigger names per the pipeline rules, but no gesture portals exist in the current source — all gesture entries are flagged for manual review (global flag, not repeated per entry).
- No query-selection or attribute-selection selector syntax (deprecated double-dash-p style patterns) is used anywhere in this file; it does not exist in the current source.

# 1. Click & pointer interactions

[Trigger: click]
[English: A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.]
[DD syntax: click:toggle_expanded]
[Notes: ]

[Trigger: dblclick]
[English: A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted.]
[DD syntax: dblclick:attr_contenteditable_true:focus]
[Notes: Highlighting the current value on entering edit mode is app-defined (e.g. a selectAll reaction); not a built-in.]

[Trigger: contextmenu]
[English: A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions.]
[DD syntax: contextmenu:prevent:toggle_menuopen]
[Notes: Assumes menu markup lives in the file row's own subtree; pointer-anchored positioning is app-defined. If the menu is a shared separate element, remodel via the state portal.]

[Trigger: click]
[English: A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it.]
[DD syntax: <html> click:state_ui_profileMenu || #avatar-btn state_ui_profileMenu:focus]
[Notes: No dedicated outside-click trigger exists in the current source; outside-click filtering is assumed inside the store-writing reaction. Focus return to the avatar is expressed via the state portal. Flagged for manual review.]

[Trigger: click]
[English: A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it.]
[DD syntax: <html> click:state_cart_drawer || #cart-drawer state_cart_drawer:class_open_remove]
[Notes: Outside-click filtering is app-defined (no native outside-click trigger in the current source). Items persist because the drawer stays in the DOM.]

[Trigger: longpress]
[English: A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together.]
[DD syntax: longpress:toggle_multiselect]
[Notes: No gesture portals (longpress) exist in the current source; written as a native gesture trigger per pipeline rules. Flagged for manual review.]

[Trigger: click]
[English: A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection.]
[DD syntax: click:toggle_liked:saveFavorite]
[Notes: ]

[Trigger: click]
[English: A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.]
[DD syntax: click:fetch_/api/lots/next:appendLots]
[Notes: appendLots is app-defined (built-in html reaction replaces rather than appends).]

[Trigger: click, dblclick]
[English: A single click on a track in a music queue selects it, while a double click starts playing it immediately.]
[DD syntax: click:class_selected_add + dblclick:playTrack]
[Notes: Two attributes on the same element. playTrack is app-defined (the default play-event reaction dispatches an event; it does not start playback).]

[Trigger: click]
[English: A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element)]
[DD syntax: click:state_gallery_photo || #main-photo state_gallery_photo:renderPhoto]
[Notes: renderPhoto (image + caption) is app-defined.]

[Trigger: click]
[English: A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element)]
[DD syntax: <html> click:state_ui_panels || .floating-panel state_ui_panels:class_open_remove]
[Notes: "Landed on bare canvas" filtering is app-defined; every panel subscribes to the same store key.]

[Trigger: click]
[English: A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element)]
[DD syntax: click:state_map_selectedPin || #pin-card state_map_selectedPin:renderCard]
[Notes: ]

[Trigger: contextmenu]
[English: A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element)]
[DD syntax: contextmenu:prevent:state_chat_reactionBar || #reaction-bar state_chat_reactionBar:class_open_add]
[Notes: Anchoring the bar above the bubble is app-defined.]

[Trigger: click, longpress]
[English: A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls.]
[DD syntax: click:toggle_on + longpress:toggle_expanded]
[Notes: Two attributes on the same tile. longpress has no portal in the current source — flagged for manual review.]

[Trigger: click]
[English: An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction.]
[DD syntax: click:toggle_sortasc:sortRows]
[Notes: sortRows is app-defined; row reordering stays inside the table's own subtree.]

[Trigger: click]
[English: A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element)]
[DD syntax: click:class_selected_add:state_booking_seat || #summary-panel state_booking_seat:renderPrice]
[Notes: renderPrice is app-defined.]

[Trigger: dblclick]
[English: A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood.]
[DD syntax: <canvas> dblclick:zoomToNeighborhood]
[Notes: Attribute sits on the canvas element; node double-clicks reach it via bubbling. zoomToNeighborhood is app-defined.]

[Trigger: click]
[English: A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.]
[DD syntax: click:copy:text_copied:wait_2000:text_copy]
[Notes: The invite URL source for copy is assumed piped/app-defined (default copies the element's own text).]

[Trigger: click]
[English: A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.]
[DD syntax: <section> click:toggle_open]
[Notes: Attribute on the accordion section; header clicks bubble up.]

[Trigger: click]
[English: A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves.]
[DD syntax: click:toggle_zoom + mousemove:moveLens + mouseleave:class_zoom_remove]
[Notes: moveLens is app-defined; the lens lives in the photo container's subtree.]

[Trigger: doubletap]
[English: A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises.]
[DD syntax: doubletap:burstHeart:incrementLikes]
[Notes: No gesture portals (doubletap) exist in the current source — flagged for manual review. burstHeart/incrementLikes are app-defined within the post subtree.]

[Trigger: contextmenu]
[English: A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history.]
[DD syntax: contextmenu:prevent:toggle_linemenu]
[Notes: Assumes menu markup in the diff line's subtree; see the cloud-storage context-menu entry.]

[Trigger: click]
[English: A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange.]
[DD syntax: <article> click:incrementScore:class_upvoted_add]
[Notes: Attribute on the answer container; arrow clicks bubble up and the arrow is styled via the container's class. incrementScore is app-defined.]

[Trigger: auxclick]
[English: A middle click on a terminal tab in a developer tool closes that session along with its running process.]
[DD syntax: auxclick:closeSession]
[Notes: Middle click arrives as auxclick. closeSession is app-defined.]

[Trigger: click]
[English: A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.]
[DD syntax: click:toggle_expanded]
[Notes: ]

[Trigger: click]
[English: A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct.]
[DD syntax: click:class_selected_add:revealResult]
[Notes: revealResult is app-defined within the option's subtree.]

[Trigger: click]
[English: A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element)]
[DD syntax: click:class_selected_add:state_booking_checkin || #checkin-field state_booking_checkin:value]
[Notes: ]

[Trigger: click]
[English: A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element)]
[DD syntax: <div id=modal-backdrop> click:prevent:absorbClick]
[Notes: No stopPropagation reaction exists in the current source; absorbClick is app-defined. Although tagged cross-element, the behavior is local to the backdrop element.]

[Trigger: click]
[English: A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue)]
[DD syntax: click:attr_disabled_true:processOrder]
[Notes: processOrder is app-defined.]

# 2. Keyboard interaction

[Trigger: keydown]
[English: A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it.]
[DD syntax: <div id=modal> keydown_Escape:toggle_open:state_ui_modal || #modal-trigger state_ui_modal:focus]
[Notes: Key-suffix filtering not parsed by the current source (global flag). Focus restore expressed via the state portal.]

[Trigger: keydown]
[English: A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element)]
[DD syntax: <html> keydown_ctrl_k:prevent:state_ui_palette || #palette-search state_ui_palette:focus]
[Notes: Global trigger; palette opening itself can be CSS/state-driven on the palette element.]

[Trigger: keydown]
[English: Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.]
[DD syntax: keydown_Enter:prevent:sendMessage]
[Notes: The Shift+Enter variant is left untouched so the native newline occurs; modifier discrimination is app-defined pending key-filter support.]

[Trigger: keydown]
[English: A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse.]
[DD syntax: keydown_Down:highlightNext]
[Notes: highlightNext is app-defined within the autocomplete subtree.]

[Trigger: keydown]
[English: Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back.]
[DD syntax: keydown_Tab:prevent:moveCellRight + keydown_shiftTab:prevent:moveCellLeft]
[Notes: Two attributes on the spreadsheet grid; movement is app-defined within its subtree.]

[Trigger: keydown]
[English: A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element)]
[DD syntax: <html> keydown_j:state_feed_nav + <html> keydown_k:state_feed_navBack || .article state_feed_nav:reveal]
[Notes: Resolving which article is next/previous-unread is app-defined. Flagged for manual review.]

[Trigger: keydown]
[English: A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element)]
[DD syntax: <html> keydown_slash:prevent:state_ui_searchFocus || #file-search state_ui_searchFocus:focus]
[Notes: ]

[Trigger: keydown]
[English: Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time.]
[DD syntax: keydown_shiftArrow:extendSelection]
[Notes: Selection extension is app-defined (and largely native editor behavior).]

[Trigger: keydown]
[English: A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse.]
[DD syntax: <form> keydown_ctrlEnter:prevent:submit]
[Notes: Attribute on the form; keydown bubbles from the textarea. The built-in submit reaction calls requestSubmit().]

[Trigger: keydown]
[English: Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column.]
[DD syntax: keydown_Escape:cancelDrag]
[Notes: cancelDrag is app-defined within the board subtree.]

[Trigger: keydown]
[English: A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it.]
[DD syntax: <html> keydown_ctrl_z:prevent:undo + <html> keydown_ctrl_shift_z:prevent:redo]
[Notes: Global triggers with local (app-level) reactions; undo/redo are app-defined.]

[Trigger: keydown]
[English: Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last.]
[DD syntax: keydown_Left:prevSlide + keydown_Right:nextSlide + keydown_Home:firstSlide + keydown_End:lastSlide]
[Notes: Slide navigation is app-defined within the carousel subtree.]

[Trigger: keydown]
[English: A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause.]
[DD syntax: keydown_Space:prevent:togglePlay]
[Notes: No built-in media-control reaction exists; togglePlay is app-defined.]

[Trigger: keydown]
[English: A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element)]
[DD syntax: <html> keydown_question:state_ui_shortcuts || #shortcut-overlay state_ui_shortcuts:class_open_add]
[Notes: ]

[Trigger: keydown]
[English: A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening.]
[DD syntax: keydown_ctrl_s:prevent:saveDraft]
[Notes: saveDraft is app-defined.]

[Trigger: keydown]
[English: Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action.]
[DD syntax: keydown_Delete:trashSelected]
[Notes: trashSelected is app-defined; affected rows stay within the mail list subtree.]

[Trigger: keydown]
[English: A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element)]
[DD syntax: <html> keydown_m:state_call_muted || #mic-icon state_call_muted:class_muted_toggle]
[Notes: Actual mute/unmute of the track is app-defined alongside the store write.]

[Trigger: keydown]
[English: Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it.]
[DD syntax: <div id=modal> keydown_Tab:trapFocus]
[Notes: Focus-trap logic is app-defined.]

[Trigger: keydown]
[English: A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly.]
[DD syntax: keydown_digit:pickSeverity]
[Notes: Digit discrimination is app-defined pending key-filter support.]

[Trigger: keydown]
[English: A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes.]
[DD syntax: keydown_Enter:activateHighlighted]
[Notes: activateHighlighted is app-defined within the dropdown subtree.]

[Trigger: keydown]
[English: A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise.]
[DD syntax: keydown_ctrl_c:copyOrInterrupt]
[Notes: Conditional copy-vs-interrupt logic is app-defined.]

[Trigger: keydown]
[English: A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte)]
[DD syntax: <html> keydown_Enter:startMatchmaking]
[Notes: Global trigger with a local (app-level) reaction — single-element per the locality rule.]

[Trigger: keydown]
[English: In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks.]
[DD syntax: keydown_ctrlArrow:moveBeat + keydown_Arrow:moveTrack]
[Notes: Cursor movement is app-defined within the sequencer subtree.]

# 3. Form & input

[Trigger: input]
[English: As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field.]
[DD syntax: input:wait_500:checkAvailability]
[Notes: wait_<ms> is a fixed delay, not a true debounce (every keystroke chains its own wait) — flagged for manual review. checkAvailability is app-defined.]

[Trigger: input]
[English: A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js)]
[DD syntax: input:wait_300:searchPatients]
[Notes: Same debounce caveat as above — flagged. Attribute may sit on the search component root since input bubbles.]

[Trigger: blur]
[English: When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.]
[DD syntax: blur:validateEmail]
[Notes: validateEmail is app-defined; the inline error lives in the field's subtree.]

[Trigger: change]
[English: Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element)]
[DD syntax: change:state_address_country || #region-field state_address_country:swapRegionInput]
[Notes: swapRegionInput is app-defined.]

[Trigger: input]
[English: As a user types a new password, a strength meter under the field updates and lists which requirements are still missing.]
[DD syntax: input:updateStrengthMeter]
[Notes: App-defined; meter lives in the field's subtree.]

[Trigger: change]
[English: Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element)]
[DD syntax: change:state_complaint_reason || #details-textarea state_complaint_reason:class_hidden_remove:attr_required_true]
[Notes: ]

[Trigger: paste]
[English: A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically.]
[DD syntax: paste:formatCardNumber]
[Notes: formatCardNumber is app-defined.]

[Trigger: input]
[English: Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element)]
[DD syntax: input:wait_400:state_chat_typing || #convo-header state_chat_typing:class_typing_add]
[Notes: Delay uses wait_<ms>; see debounce caveat.]

[Trigger: input]
[English: Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element)]
[DD syntax: input:state_budget_cells || #monthly-total state_budget_cells:recalcTotal || #spending-chart state_budget_cells:redraw]
[Notes: recalcTotal/redraw are app-defined.]

[Trigger: change]
[English: Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element)]
[DD syntax: change:state_intake_minor || #guardian-consent state_intake_minor:class_hidden_remove:attr_required_true]
[Notes: Age calculation before the store write is app-defined.]

[Trigger: reset]
[English: Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element)]
[DD syntax: reset:state_search_filters || #results-list state_search_filters:fetch_/api/listings:html]
[Notes: Native reset restores the controls; the store write refreshes the results.]

[Trigger: submit]
[English: Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.]
[DD syntax: submit:prevent:class_submitting_add]
[Notes: Button disable/spinner driven by the form's class (CSS) or an app-defined reaction; attribute on the form.]

[Trigger: input]
[English: Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning.]
[DD syntax: input:validateStock]
[Notes: validateStock is app-defined; warning lives in the field's subtree.]

[Trigger: blur, input]
[English: Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives.]
[DD syntax: blur:validateRequired + input:class_invalid_remove]
[Notes: Two attributes on the field.]

[Trigger: input]
[English: Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities.]
[DD syntax: input:filterAirports]
[Notes: filterAirports is app-defined within the field's subtree.]

[Trigger: change]
[English: Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element)]
[DD syntax: change:state_checkout_billingSame || #billing-fields state_checkout_billingSame:class_collapsed_add:syncValues]
[Notes: syncValues is app-defined.]

[Trigger: input]
[English: Typing a promo code validates it on the fly and shows the applied discount inline beside the field.]
[DD syntax: input:wait_400:validatePromo]
[Notes: Debounce caveat; validatePromo is app-defined.]

[Trigger: change]
[English: Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element)]
[DD syntax: change:state_booking_start || #end-date state_booking_start:setMinDate]
[Notes: setMinDate is app-defined (the attr reaction only sets static literals).]

[Trigger: input]
[English: A character counter under a social post composer counts down while typing and turns red in the final stretch.]
[DD syntax: input:updateCounter]
[Notes: updateCounter is app-defined; counter lives in the composer subtree.]

[Trigger: change]
[English: Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element)]
[DD syntax: change:state_loan_terms || #submit-btn state_loan_terms:toggle_disabled]
[Notes: toggle_disabled flips blindly; a value-driven enable/disable sync reaction would be more correct — flagged for manual review.]

[Trigger: input]
[English: Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element)]
[DD syntax: input:state_mortgage_downpayment || #monthly-payment state_mortgage_downpayment:recalcPayment || #total-interest state_mortgage_downpayment:recalcInterest]
[Notes: Recalculations are app-defined.]

[Trigger: input]
[English: Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label.]
[DD syntax: input:attr_data-dirty_true]
[Notes: Dot rendered via CSS on the field's data-dirty attribute.]

[Trigger: change]
[English: Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error.]
[DD syntax: change:validateFileSize]
[Notes: validateFileSize is app-defined.]

[Trigger: input]
[English: A tax form formats a social security number into dashed digit groups as the user types each number.]
[DD syntax: input:formatSSN]
[Notes: formatSSN is app-defined.]

[Trigger: change]
[English: Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element)]
[DD syntax: change:state_admin_selectAll || .row-checkbox state_admin_selectAll:syncChecked]
[Notes: syncChecked is app-defined (value-driven).]

[Trigger: input]
[English: Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues.]
[DD syntax: input:filterTagSuggestions]
[Notes: filterTagSuggestions is app-defined within the field's subtree.]

[Trigger: change]
[English: Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element)]
[DD syntax: change:state_pairing_deviceType || #instruction-panel state_pairing_deviceType:renderInstructions]
[Notes: renderInstructions is app-defined.]

[Trigger: input]
[English: A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue)]
[DD syntax: input:state_filter_intensity (on both controls) + state_filter_intensity:value (on both controls)]
[Notes: Canonical state-store two-way binding; both controls write and both subscribe.]

[Trigger: input]
[English: Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular)]
[DD syntax: <form> input:validateGroup:state_perms_formValid || #save-btn state_perms_formValid:toggle_disabled]
[Notes: validateGroup is app-defined; toggle caveat as in the loan-terms entry.]

# 4. Media playback

[Trigger: ended]
[English: When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element)]
[DD syntax: ended:state_course_lessonDone || #next-lesson state_course_lessonDone:class_pulse_add || #progress-bar state_course_lessonDone:advance]
[Notes: advance is app-defined.]

[Trigger: play]
[English: A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element)]
[DD syntax: play:state_player_nowPlaying || #mini-player state_player_nowPlaying:renderNowPlaying]
[Notes: renderNowPlaying is app-defined.]

[Trigger: pause]
[English: When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards.]
[DD syntax: pause:savePosition:showResumePrompt]
[Notes: savePosition/showResumePrompt are app-defined within the player subtree.]

[Trigger: waiting, playing]
[English: As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes.]
[DD syntax: waiting:class_buffering_add + playing:class_buffering_remove]
[Notes: Two attributes on the player; overlay lives in its subtree.]

[Trigger: timeupdate]
[English: When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner.]
[DD syntax: timeupdate:maybeShowRatePrompt]
[Notes: Conditional (last-ten-percent) logic is app-defined; prompt lives in the player subtree.]

[Trigger: input]
[English: A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately.]
[DD syntax: input:val:style_--volume]
[Notes: Fill/glyph render off the --volume CSS var on the slider; purely built-in reactions.]

[Trigger: timeupdate]
[English: When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element)]
[DD syntax: timeupdate:maybePauseAtCheckpoint:state_lesson_checkpoint || #quiz-overlay state_lesson_checkpoint:class_open_add]
[Notes: Checkpoint detection and self-pause are app-defined.]

[Trigger: ended]
[English: When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element)]
[DD syntax: ended:state_museum_nextExhibit || #exhibit-cards state_museum_nextExhibit:highlightNext]
[Notes: highlightNext is app-defined.]

[Trigger: timeupdate]
[English: A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line.]
[DD syntax: timeupdate:highlightLyricLine]
[Notes: highlightLyricLine is app-defined within the lyrics subtree.]

[Trigger: pause]
[English: When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature.]
[DD syntax: pause:class_showchapters_add]
[Notes: Chapter list lives in the player subtree.]

[Trigger: stalled]
[English: When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element)]
[DD syntax: stalled:state_auction_stream || #reconnect-banner state_auction_stream:class_visible_add || #bid-controls state_auction_stream:class_disabled_add]
[Notes: Re-enable on recovery would subscribe to a recovery store write (e.g. from playing).]

[Trigger: ended]
[English: When a story video finishes in a social app, the player advances itself to the next friend's story.]
[DD syntax: ended:nextStory]
[Notes: nextStory is app-defined; the player advances itself, so this stays local.]

[Trigger: play]
[English: Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)]
[DD syntax: play:state_ui_calm || <body> state_ui_calm:class_calm_add]
[Notes: Gradual dimming handled by CSS transition on the body class.]

[Trigger: seeking]
[English: While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer.]
[DD syntax: seeking:toggle_preview + mousemove:movePreview]
[Notes: Preview rendering/tracking is app-defined within the player subtree.]

[Trigger: ended]
[English: When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element)]
[DD syntax: ended:state_lesson_clipDone || #record-btn state_lesson_clipDone:toggle_disabled]
[Notes: Toggle caveat — blind flip rather than value-driven enable; flagged for manual review.]

# 5. Drag & drop / clipboard

[Trigger: drop]
[English: A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop.]
[DD syntax: <li class=column> drop:prevent:moveCardHere:saveStatus]
[Notes: Attribute on the drop-target column; card identity comes from DataTransfer in the app-defined reaction.]

[Trigger: dragover, dragleave]
[English: A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active.]
[DD syntax: dragover:prevent:class_dropactive_add + dragleave:class_dropactive_remove]
[Notes: dragover must be prevented for drop to fire.]

[Trigger: drop]
[English: When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes.]
[DD syntax: drop:prevent:uploadFile]
[Notes: uploadFile (with progress bar in the zone's subtree) is app-defined.]

[Trigger: drop]
[English: A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly.]
[DD syntax: drop:prevent:reorderRows:renumberTracks]
[Notes: Reordering/renumbering stays inside the playlist subtree.]

[Trigger: dragstart, drop]
[English: Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop.]
[DD syntax: dragstart:class_dragging_add + drop:prevent:reflowGrid]
[Notes: Ghost placeholders/reflow are app-defined within the grid subtree.]

[Trigger: click]
[English: A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element)]
[DD syntax: click:copy:state_ui_toast || #toast state_ui_toast:showToast]
[Notes: The key value for copy is assumed piped/app-defined; showToast is app-defined.]

[Trigger: paste]
[English: When a user pastes a list of email addresses into an invite field, they are split into individual removable chips.]
[DD syntax: paste:splitIntoChips]
[Notes: splitIntoChips is app-defined within the invite field's subtree.]

[Trigger: drop]
[English: When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element)]
[DD syntax: <li class=slot> drop:prevent:fillSlot:state_clinic_undo || #undo-bar state_clinic_undo:class_visible_add]
[Notes: fillSlot is app-defined and local to the slot; the undo bar reacts via the store.]

[Trigger: drop]
[English: Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element)]
[DD syntax: drop:prevent:state_compare_items || #compare-tray state_compare_items:renderTray]
[Notes: renderTray (badge + thumbnail) is app-defined.]

[Trigger: click]
[English: A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback.]
[DD syntax: click:copy:class_copied_add:wait_1500:class_copied_remove]
[Notes: Purely built-in reactions; copied text sourced app-side.]

[Trigger: dragleave]
[English: When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element)]
[DD syntax: <html> dragleave:state_ui_dropOverlay || #drop-overlay state_ui_dropOverlay:class_visible_remove]
[Notes: Detecting "left the window" (null relatedTarget) is app-defined before the store write.]

[Trigger: drop]
[English: A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element)]
[DD syntax: drop:prevent:state_design_layers || #canvas state_design_layers:renderCanvas]
[Notes: renderCanvas is app-defined.]

[Trigger: paste]
[English: When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element)]
[DD syntax: paste:state_chat_linkPreview || #link-preview state_chat_linkPreview:fetchPreview]
[Notes: fetchPreview is app-defined.]

[Trigger: drop]
[English: A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately.]
[DD syntax: drop:prevent:reorderStops:recalcDistances]
[Notes: Stays inside the route planner subtree.]

[Trigger: paste]
[English: A user pastes a one-time code into a six box verification input and each digit lands in its own box.]
[DD syntax: paste:distributeDigits]
[Notes: distributeDigits is app-defined within the input group's subtree.]

[Trigger: cut]
[English: A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)]
[DD syntax: cut:state_editor_clipboard || #paste-option state_editor_clipboard:toggle_disabled]
[Notes: Toggle caveat — blind flip; flagged for manual review.]

# 6. Focus & selection

[Trigger: focus]
[English: When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element)]
[DD syntax: focus:state_help_searchFocus || #suggest-panel state_help_searchFocus:class_open_add]
[Notes: ]

[Trigger: focus]
[English: When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element)]
[DD syntax: focus:state_nav_megamenu || #megamenu-panel state_nav_megamenu:class_open_add]
[Notes: Making the first link arrow-key ready (tabindex management) is app-defined.]

[Trigger: selectionchange]
[English: When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element)]
[DD syntax: <html> selectionchange:state_article_selection || #text-toolbar state_article_selection:showAtSelection]
[Notes: selectionchange fires on the document; attribute placement on the root element is assumed — flagged for manual review. showAtSelection is app-defined.]

[Trigger: focus]
[English: When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it.]
[DD syntax: focus:announceControls]
[Notes: announceControls (e.g. via an aria-live region in the picker subtree) is app-defined.]

[Trigger: selectionchange]
[English: When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element)]
[DD syntax: selectionchange:state_sheet_selection || #status-bar state_sheet_selection:renderSummary]
[Notes: Spreadsheet cell selection may be app-managed rather than DOM selection; renderSummary is app-defined. Flagged for manual review.]

[Trigger: focus]
[English: When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element)]
[DD syntax: focus:state_osk_layout || #onscreen-keyboard state_osk_layout:setLayout]
[Notes: setLayout is app-defined.]

[Trigger: blur]
[English: When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs.]
[DD syntax: blur:normalizeCoupon:validateCoupon]
[Notes: normalizeCoupon/validateCoupon are app-defined.]

[Trigger: focus]
[English: When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card.]
[DD syntax: focus:class_focused_add]
[Notes: Ring and quick actions render off the card's class (CSS/subtree).]

[Trigger: selectionchange]
[English: When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element)]
[DD syntax: selectionchange:state_audio_selection || #edit-controls state_audio_selection:syncEnabled]
[Notes: Waveform region selection is app-managed; syncEnabled is app-defined (value-driven).]

[Trigger: selectionchange]
[English: When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element)]
[DD syntax: selectionchange:state_editor_selection || #format-dropdown state_editor_selection:syncFormat]
[Notes: syncFormat is app-defined.]

[Trigger: focus]
[English: When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers.]
[DD syntax: focus:announceCodeLength]
[Notes: announceCodeLength is app-defined.]

[Trigger: blur]
[English: When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label.]
[DD syntax: blur:class_unsaved_add]
[Notes: Dot rendered via CSS from the field's class; "edited" check is app-defined if needed.]

[Trigger: focus]
[English: A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular)]
[DD syntax: focus:applyFocusVisible]
[Notes: Keyboard-vs-mouse discrimination (:focus-visible semantics) is app-defined — flagged for manual review.]

[Trigger: blur]
[English: When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element)]
[DD syntax: blur:state_checkout_addressGroup || #address-group state_checkout_addressGroup:validateGroup]
[Notes: validateGroup is app-defined.]

# 7. Visibility & intersection

[Trigger: intersection]
[English: When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder.]
[DD syntax: intersection:lazyLoadImage]
[Notes: lazyLoadImage (src swap from a data attribute) is app-defined.]

[Trigger: intersection]
[English: When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element)]
[DD syntax: intersection:state_orders_nextPage || #order-list state_orders_nextPage:loadNextPage]
[Notes: loadNextPage is app-defined. The intersectionPrevious portal also exists in the current source as an alternative — flagged for manual review of which fits best.]

[Trigger: intersection]
[English: When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values.]
[DD syntax: intersection:animateCounters]
[Notes: animateCounters is app-defined within the section subtree.]

[Trigger: intersection]
[English: When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element)]
[DD syntax: intersection:state_article_section || #toc state_article_section:highlightCurrent]
[Notes: "Middle of viewport" requires rootMargin/threshold options the current IntersectionPortal does not expose — flagged for manual review.]

[Trigger: intersection]
[English: When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves.]
[DD syntax: intersection:toggleAutoplay]
[Notes: Halfway threshold config not exposed in the current IntersectionPortal — flagged. Autoplay/pause media control is app-defined.]

[Trigger: intersection]
[English: When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing.]
[DD syntax: intersection:wait_1000:recordImpression]
[Notes: Threshold config not exposed in the current source; the one-second viewability dwell uses wait_1000 but does not re-check visibility after the delay — flagged for manual review.]

[Trigger: intersection]
[English: When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle.]
[DD syntax: intersection:startLiveData]
[Notes: startLiveData is app-defined.]

[Trigger: intersection]
[English: When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element)]
[DD syntax: intersection:state_onboard_step || #progress-rail state_onboard_step:activateDot]
[Notes: activateDot is app-defined.]

[Trigger: intersection]
[English: When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element)]
[DD syntax: intersection:state_map_visibleCard || #map state_map_visibleCard:enlargePin]
[Notes: enlargePin is app-defined.]

[Trigger: intersection]
[English: When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast.]
[DD syntax: intersection:fetch_/api/reviews:renderReviews]
[Notes: renderReviews is app-defined.]

[Trigger: intersection]
[English: When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place.]
[DD syntax: intersection:class_animate_add]
[Notes: "Fully visible" threshold config not exposed in the current source — flagged.]

[Trigger: intersection]
[English: When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.]
[DD syntax: intersection:prefetchComments]
[Notes: "About to enter" (rootMargin) config not exposed in the current source — flagged. prefetchComments is app-defined.]

[Trigger: intersection]
[English: When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element)]
[DD syntax: intersection:state_ui_heroOut || #sticky-hero state_ui_heroOut:class_visible_add]
[Notes: Halfway-out threshold config not exposed in the current source — flagged.]

[Trigger: intersection]
[English: When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking.]
[DD syntax: intersection:wait_2000:logImpression]
[Notes: Same visibility-after-delay caveat as the ad viewability entry — flagged.]

[Trigger: intersection]
[English: When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element)]
[DD syntax: intersection:state_consent_scrolledEnd || #accept-btn state_consent_scrolledEnd:toggle_disabled]
[Notes: Observing within a scroll box (root option) not exposed in the current source; toggle caveat — flagged for manual review.]

[Trigger: intersection]
[English: When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element)]
[DD syntax: intersection:state_chat_readMark || #chat-history state_chat_readMark:markRead]
[Notes: markRead (server call) is app-defined.]

[Trigger: intersection]
[English: When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one.]
[DD syntax: intersection:fadeInLabels]
[Notes: fadeInLabels (staggered) is app-defined within the floor-plan subtree.]

[Trigger: intersection]
[English: When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once.]
[DD syntax: intersection:playOnce]
[Notes: The exactly-once guard is app-defined.]

[Trigger: intersection]
[English: A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte)]
[DD syntax: intersection:class_revealed_add]
[Notes: Once-only falls out naturally — the class stays added, so later intersections change nothing.]

[Trigger: intersection]
[English: When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch.]
[DD syntax: intersection:lazyLoadBatch]
[Notes: lazyLoadBatch is app-defined within the strip subtree.]

[Trigger: intersection]
[English: When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element)]
[DD syntax: intersection:state_ui_playerDocked || #mini-player state_ui_playerDocked:class_docked_add]
[Notes: Leave-vs-enter direction derived from the intersection entry in the app-defined store write.]

# 8. Attribute & DOM mutation

[Trigger: attr]
[English: When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward.]
[DD syntax: attr_aria-expanded:syncExpanded]
[Notes: syncExpanded is app-defined (value-driven); the chevron rotates via CSS off the button's own state.]

[Trigger: attr]
[English: When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element)]
[DD syntax: <html> attr_data-theme:state_theme_mode || .chart state_theme_mode:recolor]
[Notes: recolor is app-defined.]

[Trigger: attr]
[English: When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye.]
[DD syntax: attr:pulse]
[Notes: The current AttrPortal observes attributes only — characterData/text-content observation is not implemented. Flagged for manual review. pulse is app-defined.]

[Trigger: attr]
[English: When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element)]
[DD syntax: <body> attr:state_ui_chatWidget || #help-link state_ui_chatWidget:class_hidden_add]
[Notes: childList (node injection) observation is not implemented in the current AttrPortal — flagged for manual review.]

[Trigger: attr]
[English: When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere.]
[DD syntax: attr:announce]
[Notes: characterData observation not implemented in the current source — flagged. Announcement itself is native aria-live behavior; announce is app-defined.]

[Trigger: attr]
[English: When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color.]
[DD syntax: attr_disabled:syncEnabled]
[Notes: syncEnabled is app-defined (value-driven, handles attribute removal).]

[Trigger: attr]
[English: When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element)]
[DD syntax: attr_data-state:state_ui_buffering || #global-spinner state_ui_buffering:class_visible_add]
[Notes: ]

[Trigger: attr]
[English: When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element)]
[DD syntax: <form> attr_class:state_form_errors || #error-summary state_form_errors:renderSummary]
[Notes: The current AttrPortal observes only its owner element, not a subtree — watching "any field" needs per-field attributes or subtree support. Flagged for manual review.]

[Trigger: attr]
[English: When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element)]
[DD syntax: <html> attr_lang:state_i18n_locale || .locale-aware state_i18n_locale:rerender]
[Notes: rerender is app-defined.]

[Trigger: attr]
[English: When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match.]
[DD syntax: attr_aria-selected:syncSelected]
[Notes: syncSelected is app-defined (value-driven); background via CSS off the row's own state.]

[Trigger: attr]
[English: When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change.]
[DD syntax: attr:flashChange]
[Notes: characterData observation not implemented in the current source — flagged. Direction detection is app-defined.]

[Trigger: attr]
[English: When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element)]
[DD syntax: <body> attr:state_layout_injected || #main-content state_layout_injected:nudgeLayout]
[Notes: childList observation not implemented in the current source — flagged. nudgeLayout is app-defined.]

[Trigger: attr]
[English: When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element)]
[DD syntax: attr_data-step:state_form_step || #page-heading state_form_step:announceStep]
[Notes: announceStep is app-defined.]

[Trigger: attr]
[English: When a carousel slide gains the active class, its caption text fades in while the previous caption hides.]
[DD syntax: attr_class:syncActiveCaption]
[Notes: syncActiveCaption is app-defined within the carousel subtree.]

[Trigger: attr]
[English: When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article.]
[DD syntax: attr:collapseIfEmpty]
[Notes: childList observation not implemented in the current source — flagged. collapseIfEmpty is app-defined.]

[Trigger: attr]
[English: When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element)]
[DD syntax: <html> attr_data-breakpoint:state_ui_breakpoint || #main-nav state_ui_breakpoint:swapNavMode]
[Notes: swapNavMode is app-defined.]

[Trigger: attr]
[English: When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice.]
[DD syntax: attr_class:syncModeration]
[Notes: syncModeration is app-defined within the comment subtree.]

[Trigger: attr]
[English: When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order.]
[DD syntax: <tbody> attr:renumberRows]
[Notes: childList observation not implemented in the current source — flagged. renumberRows is app-defined.]

[Trigger: attr]
[English: When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant.]
[DD syntax: attr_data-experiment:syncVariant]
[Notes: syncVariant is app-defined.]

[Trigger: attr]
[English: When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye.]
[DD syntax: attr_type:syncVisibilityIcon]
[Notes: syncVisibilityIcon is app-defined; icon lives in the field wrapper's subtree.]

[Trigger: attr, load]
[English: When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading.]
[DD syntax: attr_src:class_fading_add + load:class_loaded_add]
[Notes: Two attributes on the image; the fade completes on the load event.]

[Trigger: attr]
[English: When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element)]
[DD syntax: <html> attr_data-ready:state_app_ready || .enhanceable state_app_ready:initialize]
[Notes: initialize (in-order queue) is app-defined.]

# 9. Resize & viewport

[Trigger: resize]
[English: When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.]
[DD syntax: <html> resize:reflowColumns]
[Notes: Attribute on the root element as a window-size proxy (ResizeObserver observes elements); breakpoint logic is app-defined.]

[Trigger: resize]
[English: When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element)]
[DD syntax: <html> resize:state_ui_orientation || #video-player state_ui_orientation:expandToOrientation]
[Notes: No orientationchange trigger exists in the current source (deviceorientation is the sensor API, not screen orientation) — root resize used as a proxy. Flagged for manual review.]

[Trigger: resize]
[English: When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold.]
[DD syntax: resize:state_ide_sidebarWidth || #code-editor state_ide_sidebarWidth:syncMinimap]
[Notes: Editor shrink is handled by layout (flex); minimap hide is app-defined via the store.]

[Trigger: resize]
[English: When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions.]
[DD syntax: resize:redrawChart]
[Notes: redrawChart is app-defined.]

[Trigger: resize]
[English: When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed.]
[DD syntax: resize:scaleCanvas]
[Notes: Attribute on the canvas container; scaleCanvas is app-defined.]

[Trigger: resize]
[English: When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element)]
[DD syntax: resize:state_ui_textareaHeight || #char-counter state_ui_textareaHeight:reposition]
[Notes: reposition is app-defined; likely CSS-solvable in practice, state used per the cross-element rule.]

[Trigger: resize]
[English: When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size.]
[DD syntax: resize:syncColumns]
[Notes: syncColumns is app-defined.]

[Trigger: resize]
[English: When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)]
[DD syntax: <html> resize:state_ui_viewportH || #submit-btn state_ui_viewportH:class_stuck_add]
[Notes: ]

[Trigger: resize]
[English: When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element)]
[DD syntax: resize:recenterMap]
[Notes: Tagged cross-element in Step 1, but the reaction applies to the same (map) element — kept local per the element-locality rule. recenterMap is app-defined.]

[Trigger: resize]
[English: When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width.]
[DD syntax: resize:clampMinWidth]
[Notes: clampMinWidth is app-defined within the split-view subtree.]

[Trigger: resize]
[English: When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.]
[DD syntax: resize:syncOrientation]
[Notes: No orientationchange trigger in the current source — resize used as a proxy; flagged. syncOrientation is app-defined.]

[Trigger: resize]
[English: A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte)]
[DD syntax: resize:syncCompactLabel]
[Notes: syncCompactLabel is app-defined.]

# 10. Scroll

[Trigger: scroll]
[English: As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element)]
[DD syntax: <article> scroll:state_ui_readProgress || #read-progress state_ui_readProgress:style_--progress]
[Notes: Depth computation before the store write is app-defined; the bar renders off the --progress CSS var.]

[Trigger: scroll]
[English: When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element)]
[DD syntax: scroll:state_legal_termsEnd || #accept-btn state_legal_termsEnd:toggle_disabled]
[Notes: End-of-scroll detection is app-defined; toggle caveat — flagged for manual review.]

[Trigger: scroll]
[English: When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element)]
[DD syntax: <html> scroll:state_ui_pastHero || #tour-bar state_ui_pastHero:class_pinned_add]
[Notes: Window-level scroll assumed via the root element; past-hero detection is app-defined.]

[Trigger: scroll]
[English: When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element)]
[DD syntax: <html> scroll:state_ui_scrollUp || #back-to-top state_ui_scrollUp:class_visible_add]
[Notes: Direction/velocity detection is app-defined.]

[Trigger: scroll]
[English: When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping.]
[DD syntax: scroll:loadEarlierHistory]
[Notes: loadEarlierHistory (top detection, fetch, position preservation) is app-defined; the chat window is the scroller, so this stays local.]

[Trigger: scroll]
[English: When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible.]
[DD syntax: scroll:syncFrozenColumn]
[Notes: syncFrozenColumn is app-defined; often pure CSS position:sticky in practice.]

[Trigger: scrollend]
[English: When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card.]
[DD syntax: scrollend:snapToNearest]
[Notes: snapToNearest is app-defined; the native scrollsnapchange trigger also exists in the current source as an alternative.]

[Trigger: scroll]
[English: When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element)]
[DD syntax: scroll:state_lyrics_autoFollow || #jump-to-line state_lyrics_autoFollow:class_visible_add]
[Notes: Pausing auto-follow is app-defined alongside the store write.]

[Trigger: scroll]
[English: When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll.]
[DD syntax: <html> scroll:syncSlimNav]
[Notes: Tagged neither global nor cross-element in Step 1; attribute on the root element, nav styled via its own class — syncSlimNav is app-defined (direction-aware).]

[Trigger: scroll]
[English: When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element)]
[DD syntax: scroll:state_tutorial_scroll || #explanation-pane state_tutorial_scroll:syncScroll]
[Notes: syncScroll is app-defined.]

[Trigger: scroll]
[English: While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element)]
[DD syntax: <div id=modal> scroll:prevent:lockBackground]
[Notes: Scroll chaining/overscroll containment is app-defined (often overscroll-behavior in CSS); lockBackground mutates the body — flagged for manual review.]

[Trigger: scroll]
[English: When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element)]
[DD syntax: <html> scroll:state_report_chapter || #chapter-label state_report_chapter:syncLabel]
[Notes: Heading-passing detection is app-defined; an intersection-based model would also fit — flagged for manual review.]

# 11. Animation & transition

[Trigger: animationend]
[English: When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds.]
[DD syntax: animationend:wait_4000:class_visible_remove]
[Notes: Purely built-in reactions.]

[Trigger: transitionend]
[English: When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.]
[DD syntax: transitionend:removeSelf]
[Notes: No element-removal reaction exists in the current source; removeSelf is app-defined.]

[Trigger: animationiteration]
[English: When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element)]
[DD syntax: animationiteration:swapIfReady:state_ui_loaded || #content state_ui_loaded:renderContent]
[Notes: "After data arrived" condition is app-defined.]

[Trigger: animationend]
[English: When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element)]
[DD syntax: animationend:state_ui_confettiDone || #share-buttons state_ui_confettiDone:class_visible_add]
[Notes: ]

[Trigger: transitionend]
[English: When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element)]
[DD syntax: transitionend:state_ui_drawerOpen || #drawer-first-link state_ui_drawerOpen:focus]
[Notes: ]

[Trigger: animationcancel]
[English: When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space.]
[DD syntax: animationcancel:swapToError]
[Notes: animationcancel is NOT in the current DomEvents list (only animationstart/iteration/end) — flagged for manual review. swapToError is app-defined within the same subtree.]

[Trigger: animationend]
[English: When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.]
[DD syntax: animationend:removeSelf]
[Notes: removeSelf is app-defined.]

[Trigger: animationend]
[English: When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.]
[DD syntax: animationend:class_flash_remove]
[Notes: ]

[Trigger: animationiteration]
[English: When a badge's pulse animation completes three iterations, it stops so it does not distract from reading.]
[DD syntax: animationiteration:stopAfterThree]
[Notes: Iteration counting is app-defined.]

[Trigger: transitionend]
[English: When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element)]
[DD syntax: transitionend:state_form_stepShown || #step-first-field state_form_stepShown:focus]
[Notes: ]

[Trigger: transitionend]
[English: When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)]
[DD syntax: transitionend:finalizeRemoval]
[Notes: finalizeRemoval (data cleanup + element removal) is app-defined.]

# 12. Navigation & history

[Trigger: popstate]
[English: When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element)]
[DD syntax: popstate:state_course_route || #lesson-video state_course_route:stopPlayback || #course-outline state_course_route:scrollToCurrent]
[Notes: SPA pushState navigation does not fire popstate — a hashchange or app-level route write may be needed. Flagged for manual review. stopPlayback/scrollToCurrent are app-defined.]

[Trigger: popstate]
[English: When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history.]
[DD syntax: popstate:restoreFilters]
[Notes: restoreFilters (reading history.state) is app-defined.]

[Trigger: hashchange]
[English: When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element)]
[DD syntax: hashchange:state_doc_hash || .doc-heading state_doc_hash:syncHighlight]
[Notes: Matching the hash to the right heading is app-defined.]

[Trigger: beforeunload]
[English: When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost.]
[DD syntax: beforeunload:prevent]
[Notes: The native stay/leave prompt requires returnValue semantics; prevent approximates it and the unsaved-data check is app-defined — flagged for manual review.]

[Trigger: popstate]
[English: When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element)]
[DD syntax: popstate:state_music_view || <head> state_music_view:syncMetadata]
[Notes: syncMetadata (title + meta tags) is app-defined; SPA route caveat as above.]

[Trigger: pageshow]
[English: When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values.]
[DD syntax: pageshow:refreshPrices]
[Notes: persisted-flag discrimination is app-defined; refreshPrices is app-defined.]

[Trigger: dcl, hashchange]
[English: When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads.]
[DD syntax: dcl:syncTabFromUrl + hashchange:syncTabFromUrl]
[Notes: syncTabFromUrl is app-defined within the settings component subtree.]

[Trigger: popstate]
[English: When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element)]
[DD syntax: popstate:ifConfirmation:state_cart_reset || #cart-badge state_cart_reset:text_0]
[Notes: Route matching (ifConfirmation) is app-defined; SPA route caveat as above.]

[Trigger: popstate]
[English: When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element)]
[DD syntax: popstate:state_booking_step || #step-indicator state_booking_step:syncStep]
[Notes: syncStep is app-defined.]

[Trigger: popstate]
[English: When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element)]
[DD syntax: popstate:state_ui_lightbox || #lightbox state_ui_lightbox:class_open_remove]
[Notes: Intercepting the navigation itself is app-defined — flagged for manual review.]

[Trigger: popstate]
[English: When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element)]
[DD syntax: popstate:state_i18n_locale || .locale-aware state_i18n_locale:rerender]
[Notes: Initial-load locale also needs a dcl attribute; rerender is app-defined.]

# 13. Window/document lifecycle

[Trigger: dcl]
[English: When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element)]
[DD syntax: dcl:state_app_loaded || .hero-img state_app_loaded:attr_fetchpriority_high || #comments-module state_app_loaded:loadComments]
[Notes: loadComments is app-defined.]

[Trigger: visibilitychange]
[English: When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element)]
[DD syntax: visibilitychange:state_call_away || #local-preview state_call_away:pausePreview || #my-tile state_call_away:class_away_add]
[Notes: pausePreview is app-defined.]

[Trigger: visibilitychange]
[English: When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll.]
[DD syntax: visibilitychange:refreshScores]
[Notes: refreshScores (with visible-check) is app-defined; global trigger with a local reaction stays single-element.]

[Trigger: offline]
[English: When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element)]
[DD syntax: offline:state_net_status || #offline-banner state_net_status:class_visible_add || #intake-form state_net_status:queueSubmissions]
[Notes: queueSubmissions is app-defined.]

[Trigger: online]
[English: When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element)]
[DD syntax: online:state_net_status || #chat-outbox state_net_status:flushQueue || #offline-banner state_net_status:class_visible_remove]
[Notes: flushQueue is app-defined.]

[Trigger: beforeunload]
[English: When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave.]
[DD syntax: beforeunload:prevent]
[Notes: returnValue semantics caveat as in the intake-form entry — flagged for manual review.]

[Trigger: pageshow]
[English: When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element)]
[DD syntax: pageshow:state_cart_resync || #cart-count state_cart_resync:syncCount]
[Notes: persisted-flag discrimination and syncCount are app-defined.]

[Trigger: visibilitychange]
[English: When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background.]
[DD syntax: visibilitychange:pauseGameLoop]
[Notes: pauseGameLoop is app-defined.]

[Trigger: dcl]
[English: When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content.]
[DD syntax: dcl:scheduleOvernightReload]
[Notes: No timer/idle trigger exists in the current source; scheduling is app-defined — flagged for manual review.]

[Trigger: dcl]
[English: When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text.]
[DD syntax: dcl:remeasureOnFontsReady]
[Notes: No document.fonts.ready trigger exists in the current source; remeasureOnFontsReady is app-defined — flagged for manual review.]

# 14. Fullscreen

[Trigger: click, fullscreenchange]
[English: When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly.]
[DD syntax: click:requestFullscreen + fullscreenchange:class_hintvisible_add:wait_3000:class_hintvisible_remove]
[Notes: No requestFullscreen reaction exists in the current source; requestFullscreen is app-defined.]

[Trigger: fullscreenchange]
[English: When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element)]
[DD syntax: fullscreenchange:state_ui_fullscreen || #thumb-strip state_ui_fullscreen:syncVisible]
[Notes: syncVisible (strip + captions) is app-defined.]

[Trigger: fullscreenchange]
[English: When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity.]
[DD syntax: fullscreenchange:autoHideHints]
[Notes: Pointer-inactivity timing is app-defined.]

[Trigger: fullscreenerror]
[English: When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead.]
[DD syntax: fullscreenerror:state_ui_mapModal || #map-modal state_ui_mapModal:class_open_add]
[Notes: ]

[Trigger: fullscreenchange]
[English: When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element)]
[DD syntax: <html> fullscreenchange:state_ui_fullscreen || #site-header state_ui_fullscreen:syncHidden]
[Notes: Attribute on the root catches fullscreenchange from any element; syncHidden is app-defined (value-driven).]

[Trigger: fullscreenchange]
[English: When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element)]
[DD syntax: fullscreenchange:state_ui_fullscreen || #video-player state_ui_fullscreen:class_inline_add]
[Notes: Rotation-driven exit arrives as fullscreenchange; no orientation trigger in the current source — flagged.]

[Trigger: fullscreenchange]
[English: When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element)]
[DD syntax: fullscreenchange:state_ui_fullscreen || #control-hints state_ui_fullscreen:resizeHints]
[Notes: resizeHints is app-defined.]

# 15. State store reactivity

[Trigger: state]
[English: When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation.]
[DD syntax: state_cart_count:renderBadge]
[Notes: renderBadge (count text + bump animation) is app-defined.]

[Trigger: state]
[English: When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu.]
[DD syntax: state_auth_loggedIn:renderAuthState]
[Notes: renderAuthState is app-defined within the header subtree.]

[Trigger: state]
[English: When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted.]
[DD syntax: state_shop_currency:convertPrice]
[Notes: Attribute on each price element; convertPrice is app-defined.]

[Trigger: state]
[English: When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter.]
[DD syntax: state_notif_unread:syncBellDot || <title> state_notif_unread:syncTitle]
[Notes: syncBellDot/syncTitle are app-defined (value-driven).]

[Trigger: state]
[English: When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates.]
[DD syntax: state_market_prices:flashRow || #portfolio-total state_market_prices:recalc]
[Notes: flashRow/recalc are app-defined.]

[Trigger: state]
[English: When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it.]
[DD syntax: state_ui_sidebarCollapsed:class_wide_toggle || .chart state_ui_sidebarCollapsed:resize]
[Notes: Attribute for the class toggle sits on the main content element; resize is app-defined.]

[Trigger: state]
[English: When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically.]
[DD syntax: state_clinic_checkedIn:removeFromBoard]
[Notes: removeFromBoard is app-defined within the board subtree.]

[Trigger: state]
[English: When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork.]
[DD syntax: state_player_track:renderNowPlaying]
[Notes: renderNowPlaying is app-defined.]

[Trigger: state]
[English: When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element)]
[DD syntax: state_search_filters:refreshResults || #result-count state_search_filters:syncCount]
[Notes: refreshResults/syncCount are app-defined.]

[Trigger: state]
[English: When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note.]
[DD syntax: state_net_online:syncSubmitState]
[Notes: Attribute on each form; syncSubmitState is app-defined.]

[Trigger: state]
[English: When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager.]
[DD syntax: state_storage_quota:maybeShowUpgrade]
[Notes: Threshold check is app-defined.]

[Trigger: state]
[English: When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element)]
[DD syntax: state_admin_workspace:reloadTable]
[Notes: Attribute on each table; reloadTable is app-defined.]

[Trigger: state]
[English: When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen.]
[DD syntax: state_quiz_score:syncCertificateLock]
[Notes: syncCertificateLock is app-defined (value-driven).]

[Trigger: state]
[English: When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document.]
[DD syntax: <title> state_doc_title:syncTabTitle]
[Notes: syncTabTitle is app-defined.]

[Trigger: state]
[English: When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors.]
[DD syntax: <html> state_ui_theme:syncThemeAttr || .chart state_ui_theme:recolor]
[Notes: syncThemeAttr/recolor are app-defined.]

[Trigger: state]
[English: When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately.]
[DD syntax: <html> state_game_muted:syncMuted]
[Notes: Sound playback is not element-based; syncMuted is app-defined on the root element — flagged for manual review.]

[Trigger: state]
[English: When every step completion flag in a multi-step application reads true, the review and submit section enables.]
[DD syntax: state_wizard_personal_address_payment:syncReviewEnabled]
[Notes: Multi-prop trigger — the state portal fires only once all listed props are initiated, matching the current source. syncReviewEnabled is app-defined.]

[Trigger: state]
[English: When a bid raises the store's current highest bid, all watching clients see the price and countdown change together.]
[DD syntax: state_auction_topBid:syncPrice || #countdown state_auction_topBid:syncCountdown]
[Notes: syncPrice/syncCountdown are app-defined.]

[Trigger: state]
[English: When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it.]
[DD syntax: state_home_devices:syncTile]
[Notes: syncTile is app-defined within the tile subtree.]

[Trigger: state]
[English: When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it.]
[DD syntax: state_mail_drafts:syncBadge]
[Notes: syncBadge is app-defined.]

[Trigger: state]
[English: A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue)]
[DD syntax: state_user_firstName_lastName:renderGreeting]
[Notes: Multi-prop trigger (both names), matching the current source's props list. renderGreeting is app-defined.]

[Trigger: click, state]
[English: A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element)]
[DD syntax: <button> click:state_ui_modal || #modal state_ui_modal:syncOpen]
[Notes: syncOpen is app-defined (value-driven open/close).]

[Trigger: state]
[English: When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React)]
[DD syntax: state_app_locale:rerenderDate]
[Notes: Attribute on each date element; rerenderDate is app-defined.]

[Trigger: state]
[English: A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte)]
[DD syntax: state_clock_now:renderTime]
[Notes: The one-second ticker that writes the store is app-level; teardown when the widget leaves the screen has no trigger in the current source — flagged for manual review.]

# 16. Element connect

[Trigger: i]
[English: When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned.]
[DD syntax: i:fetch_/api/ad-creative:renderAd]
[Notes: Exactly-once follows from the i portal's connect semantics; renderAd is app-defined.]

[Trigger: i]
[English: When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading.]
[DD syntax: i:upgradeToPhoto]
[Notes: upgradeToPhoto (swap on image load) is app-defined.]

[Trigger: i]
[English: When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element)]
[DD syntax: i:highlightSyntax:addCopyButton]
[Notes: The copy button is appended into the code block's own subtree — kept local per the subtree convention despite the Step 1 tag. Both reactions app-defined.]

[Trigger: i]
[English: When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates.]
[DD syntax: i:renderRelative:scheduleUpdates]
[Notes: renderRelative/scheduleUpdates are app-defined.]

[Trigger: i]
[English: When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in.]
[DD syntax: i:measure:drawInitialFrame]
[Notes: measure/drawInitialFrame are app-defined.]

[Trigger: i]
[English: When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element)]
[DD syntax: i:wireAriaDescription]
[Notes: wireAriaDescription (aria-describedby wiring) is app-defined.]

[Trigger: i]
[English: When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element)]
[DD syntax: i:loadMapScript]
[Notes: loadMapScript (script injection) is app-defined.]

[Trigger: i]
[English: When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress.]
[DD syntax: i:restorePosition]
[Notes: restorePosition is app-defined.]

[Trigger: i]
[English: When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)]
[DD syntax: i:uncloak]
[Notes: No attribute-removal reaction exists in the current source; uncloak is app-defined.]

[Trigger: i]
[English: When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars.]
[DD syntax: i:renderStars]
[Notes: renderStars is app-defined.]

[Trigger: i]
[English: When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React)]
[DD syntax: i:openSocket]
[Notes: No disconnect/removal trigger exists in the current source for the teardown half — flagged for manual review.]

[Trigger: i]
[English: When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance.]
[DD syntax: i:loadEditorLib]
[Notes: loadEditorLib is app-defined.]

[Trigger: i]
[English: When a counter element with a target value is inserted, it reads the target and starts counting up toward it.]
[DD syntax: i:countUp]
[Notes: countUp is app-defined.]

[Trigger: i]
[English: When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen.]
[DD syntax: i:removeSelfIfConsented]
[Notes: removeSelfIfConsented is app-defined.]

[Trigger: i]
[English: When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value.]
[DD syntax: i:animateArc]
[Notes: animateArc (reads its own data-percent) is app-defined.]
