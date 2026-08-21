# Step 2.5 — Single-Element vs Multi-Element Classification

Every converted line from `output/step-2/step-2.md` classified by the ordered rules: (1) leading `_` global trigger → B; (2) `state_*` trigger → B; (3) any position-navigation segment (`-p`, `-c`, `-n`, `-m`, `-t`, `--.<selector>` descendant query) → B; (4) otherwise → A. Data-origin operators (`:-`, `:-.`, `:-..`) and self-attribute reads (`--data-x`) do not by themselves make a line multi-element.


# 1. Click & pointer interactions


### A. Single-element

click:.toggle-attribute_open   # original: A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.
dblclick:.toggle-attribute_editing   # original: A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted. (highlighting via the editing class)
click:.toggle-class_favorited:.save-favorite   # original: A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection. (.save-favorite is a custom element method)
click:.add-class_selected   # original: A single click on a track in a music queue selects it, while a double click starts playing it immediately. (companion attribute on the same row: dblclick:.play)
click:.toggle-sort   # original: An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction. (.toggle-sort custom method on the header cell)
dblclick:.zoom-into   # original: A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood. (.zoom-into custom method)
click:.toggle-attribute_zoomed   # original: A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves. (companion chain on the same element: mousemove:.track-lens, a custom method)
dblclick:.like   # original: A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises. (.like custom method; dblclick also fires for double-tap on touchscreens)
click:.upvote   # original: A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange. (.upvote custom method handles both)
auxclick:.remove   # original: A middle click on a terminal tab in a developer tool closes that session along with its running process. (auxclick is the middle-click event; process teardown on element disconnect)
click:.toggle-attribute_expanded   # original: A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.
click:.select-answer   # original: A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct. (.select-answer custom method)
click:   # original: A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element; empty reaction list is legal per doc/c_syntax.md — the listener itself absorbs the click; the attribute sits on the modal's backdrop)
click:.set-attribute_disabled_true   # original: A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue) (disabling itself after the first click is the idiomatic .once equivalent)


### B. Multi-element

contextmenu:prevent:-p--.file-list:--.context-menu:.open-at_e   # original: A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions. (prevent suppresses the native menu; .open-at(e) custom menu method positions at the pointer)
click:-n:.remove-attribute_open   # original: A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it. (idiomatic outside-click: the trigger sits on the full-viewport backdrop element behind the menu; the menu is its next sibling)
click:-p--body:--.cart-drawer:.remove-class_open   # original: A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it. (same backdrop interpretation)
click:-m:.load-more   # original: A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids. (.load-more custom method on the lot list, the button's previous sibling)
click:.src:-p--.gallery:--.main-photo:.set-attribute_src_oi   # original: A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element; .src getter reads the thumbnail's own URL, oi substitutes it into setAttribute)
click:-p--body:--.panel:.remove-attribute_open   # original: A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element; the canvas element is the document-level surface, so a scoped click trigger suffices)
click:-p--.map-widget:--.pin-card:.show-for-pin   # original: A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element; custom pin-card method)
contextmenu:prevent:--.reaction-row:.toggle-attribute_open   # original: A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element; row is a descendant of the message)
click:.toggle-class_selected:-p--.seat-booking:--.price-summary:.update-price   # original: A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element; .update-price custom method)
click:-p:.toggle-attribute_open   # original: A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again. (header toggles its parent details element)
contextmenu:prevent:--.line-menu:.toggle-attribute_open   # original: A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history. (cross-element; menu is a descendant of the line)
click:.add-class_selected:--data-date:.value:-p--.booking:--.check-in:.value_oi   # original: A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element; --data-date attribute query reads the cell's own data attribute, then .value_oi sets the field)


# 2. Keyboard interaction


### A. Single-element

keydown_enter:prevent:.send-message   # original: Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead. (.send-message custom method; keydown_shift_enter simply has no attribute, so the native newline proceeds)
keydown_arrowdown:prevent:.highlight-next   # original: A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse. (.highlight-next custom method)
keydown_tab:prevent:.move-right   # original: Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back. (.move-right custom method; companion attribute keydown_shift_tab:prevent:.move-left)
keydown_shift_arrowright:.extend-selection   # original: Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time. (.extend-selection custom method; the other three arrows follow the same pattern)
keydown_arrowright:.next-slide   # original: Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last. (.next-slide custom method; companions keydown_arrowleft / keydown_home / keydown_end)
keydown_space:prevent:.toggle-play   # original: A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause. (scoped to the focused video; .toggle-play custom method)
keydown_delete:.trash-selected   # original: Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action. (scoped to the mail list; .trash-selected custom method)
keydown_tab:.trap-focus   # original: Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it. (.trap-focus custom method on the modal)
keydown_1:.set-severity_1   # original: A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly. (.set-severity("1") via KebabReflection; keys 1 to 9 repeat the pattern)
keydown_enter:.activate-highlighted   # original: A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes. (.activate-highlighted custom method on the dropdown)
keydown_ctrl_c:.copy-or-interrupt   # original: A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise. (.copy-or-interrupt custom method on the terminal component)
keydown_ctrl_arrowup:.move-beat   # original: In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks. (.move-beat custom method; companion plain-arrow attribute keydown_arrowup:.move-track)


### B. Multi-element

_keydown_escape:.close   # original: A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it. (global trigger on the dialog element itself; native .close() restores focus)
_keydown_ctrl_k:prevent:.toggle-attribute_open:-c0:.focus   # original: A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element; global trigger sits on the palette element, -c0 is its search field)
_keydown_j:.next-unread   # original: A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element; global since focus may be anywhere; companion _keydown_k:.previous-unread)
_keydown_slash:prevent:-p--body:--.file-search:.focus   # original: A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element; global trigger)
keydown_ctrl_enter:prevent:-p--form:.request-submit   # original: A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse. (native requestSubmit on the ancestor form)
_keydown_escape:.cancel-drag   # original: Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column. (global, since focus is unpredictable mid-drag; .cancel-drag custom method on the board)
_keydown_ctrl_z:prevent:.undo   # original: A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it. (global; companion _keydown_ctrl_shift_z:prevent:.redo)
_keydown_shift_slash:-p--body:--.shortcut-sheet:.toggle-attribute_open   # original: A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element; "?" is shift+slash)
_keydown_ctrl_s:prevent:.save-draft   # original: A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening. (global; prevent blocks the browser save dialog; .save-draft custom method)
_keydown_m:-p--.call-ui:--.mic-button:.toggle-attribute_muted   # original: A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element; explicitly document-level, so the trigger gets the _ prefix)
_keydown_enter:.start-matchmaking   # original: A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte) (explicitly global wording, hence the _ prefix)


# 3. Form & input


### A. Single-element

blur:.report-validity   # original: When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field. (native reportValidity shows the inline error)
input:.format-card-number   # original: A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically. (.format-card-number custom method)
input:.publish-typing   # original: Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element; .publish-typing custom method — the short delay lives inside it, since no debounce reaction exists in source)
reset:.refresh-results   # original: Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element; reset fires on the form itself, .refresh-results custom method)
input:.over-stock:.:.add-class_error   # original: Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning. (.over-stock custom filter method; the error class renders the inline warning)
blur:.report-validity   # original: Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives. (native validity clears automatically once input is valid)
input:.filter-airports   # original: Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities. (.filter-airports custom method)
input:.validate-promo   # original: Typing a promo code validates it on the fly and shows the applied discount inline beside the field. (.validate-promo custom method)
change:.oversized:.:.show-size-error   # original: Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error. (.oversized custom filter method; .show-size-error custom method)
input:.format-ssn   # original: A tax form formats a social security number into dashed digit groups as the user types each number. (.format-ssn custom method)
input:.suggest-tags   # original: Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues. (.suggest-tags custom method)


### B. Multi-element

change:.value:-p--.address:--.region-field:.set-provinces_oi   # original: Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element; .set-provinces(country) custom method on the region field)
input:.value:-n--.strength-meter:.update_oi   # original: As a user types a new password, a strength meter under the field updates and lists which requirements are still missing. (.update(value) custom method on the meter sibling)
change:.value:.is-other:.:-p--form:--.details-field:.remove-attribute_hidden:.set-attribute_required_true   # original: Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element; .is-other custom filter method, :. passes only when truthy)
input:-p--.budget-sheet:.recalculate   # original: Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element; .recalculate custom method on the sheet)
change:.is-minor:.:-p--form:--.guardian-section:.remove-attribute_hidden   # original: Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element; .is-minor custom filter method)
submit:--.submit-btn:.set-attribute_disabled_true:.add-class_spinning   # original: Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.
change:-p--.checkout:--.billing-fields:.toggle-attribute_collapsed:.sync-from-shipping   # original: Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element; .sync-from-shipping custom method)
change:.value:-p--form:--.end-date:.set-min-after_oi   # original: Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element; .set-min-after(value) custom method)
input:.value:-n--.counter:.count-down_oi   # original: A character counter under a social post composer counts down while typing and turns red in the final stretch. (.count-down(value) custom method computes remaining and the red state)
change:-p--form:--button_type__submit:.toggle-attribute_disabled   # original: Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element; toggling disabled mirrors the checkbox)
input:-p--.mortgage-tool:.recalculate   # original: Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element; .recalculate custom method)
input:-p--.field-shell:.add-class_dirty   # original: Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label. (the dot renders from the dirty class on the field wrapper)
change:-p--table:.toggle-all-rows   # original: Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element; .toggle-all-rows custom method on the table)
change:.value:-p--.pairing-form:--.instructions:.show-for_oi   # original: Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element; .show-for(device) custom method)
input:.value:-m0:.value_oi   # original: A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue) (getter .value then setter .value_oi on the sibling input; the reverse attribute lives on the number input)
input:-p--form:.revalidate-group   # original: Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular) (.revalidate-group custom method on the form)


# 4. Media playback


### A. Single-element

pause:.bookmark-position:.show-resume-prompt   # original: When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards. (two custom methods on the player element)
waiting:.add-class_buffering   # original: As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes. (companion attribute on the same player: playing:.remove-class_buffering)
timeupdate:.near-end:.:.show-rating-prompt   # original: When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner. (.near-end custom filter method; .show-rating-prompt custom method)
ended:.play-next   # original: When a story video finishes in a social app, the player advances itself to the next friend's story. (.play-next custom method)
seeking:.show-scrub-preview   # original: While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer. (.show-scrub-preview custom method)


### B. Multi-element

ended:-p--.course:--.next-lesson:.add-class_pulse:-p--.course:--.progress-bar:.advance   # original: When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element; two static dashes, .advance custom method)
play:-p--body:--.mini-player:.update-now-playing   # original: A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element; custom method)
input:.value:-n--.speaker-icon:.set-level_oi   # original: A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately. (.set-level(value) custom method on the icon sibling)
timeupdate:.at-checkpoint:.:.pause:-p--.module:--.quiz-overlay:.toggle-attribute_open   # original: When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element; .at-checkpoint custom filter method, native .pause())
ended:-p--.audio-guide:.advance-highlight   # original: When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element; .advance-highlight custom method)
timeupdate:.current-time:-p--.karaoke:--.lyrics:.sync_oi   # original: A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line. (.current-time getter produces oi, .sync(seconds) custom method on the lyrics element)
pause:-n:.toggle-attribute_open   # original: When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature. (chapter list is the video's next sibling)
stalled:-p--.auction:--.reconnect-banner:.toggle-attribute_visible:-p--.auction:--.bid-button:.set-attribute_disabled_true   # original: When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element; two static dashes)
play:-p--body:.add-class_dimmed   # original: Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)
ended:-n:.remove-attribute_disabled   # original: When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element; button is the audio element's next sibling)


# 5. Drag & drop / clipboard


### A. Single-element

drop:.save-card-status   # original: A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop. (.save-card-status custom method on the column; companion dragover:prevent makes the column a valid drop target)
dragenter:.add-class_drop-target   # original: A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active. (companions dragleave:.remove-class_drop-target and dragover:prevent)
drop:prevent:.upload-files   # original: When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes. (.upload-files custom method renders the progress bar internally)
drop:.renumber   # original: A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly. (.renumber custom method on the playlist)
drop:.reflow   # original: Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop. (.reflow custom method on the grid; companion dragover:prevent:.show-placeholder)
paste:.split-into-chips   # original: When a user pastes a list of email addresses into an invite field, they are split into individual removable chips. (.split-into-chips custom method reads the clipboard data)
drop:.book-appointment   # original: When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element; .book-appointment custom method on the slot, undo affordance included)
drop:.add-to-comparison   # original: Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element; custom method on the tray)
dragleave:.remove-class_active   # original: When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element; trigger sits on the overlay element)
paste:.attach-link-preview   # original: When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element; custom method on the composer)
drop:.recalculate-route   # original: A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately. (.recalculate-route custom method)


### B. Multi-element

copy:-p--.settings:--.toast:.add-class_shown   # original: A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element; the copy event fires on the key field itself)
drop:-p--.design-tool:--canvas:.restack   # original: A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element; .restack custom method on the canvas)
paste:-.:.clipboard-data:-..:.get-data_text:-p--.otp-input:.distribute_oi   # original: A user pastes a one-time code into a six box verification input and each digit lands in its own box. (origin moves event -> clipboardData -> .getData("text"), then .distribute(text) custom method on the otp wrapper)
cut:-p--.editor-shell:--.paste-btn:.remove-attribute_disabled   # original: A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)


# 6. Focus & selection


### A. Single-element

focus:.announce-controls   # original: When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it. (.announce-controls custom method writes to an internal live region)
blur:.normalize-value   # original: When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs. (.normalize-value custom method)
focus:.add-class_focused   # original: When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card. (companion blur:.remove-class_focused)
focus:.announce-length   # original: When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers. (.announce-length custom method)
focus:.keyboard-modality:.:.add-class_focus-ring   # original: A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular) (.keyboard-modality custom filter method)


### B. Multi-element

focus:-n:.toggle-attribute_open   # original: When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element; panel is the input's next sibling)
focus:-n:.open-and-focus-first   # original: When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element; custom method opens the panel and focuses its first link)
_selectionchange:-p--body:--.selection-toolbar:.update-for-selection   # original: When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element; selection is document-wide, hence the global trigger)
selectionchange:-p--.sheet:--.status-bar:.update-stats   # original: When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element; grid range selection modeled through selectionchange; .update-stats custom method)
focus:-p--.translator:--.on-screen-keyboard:.match-input-language   # original: When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element; custom method)
selectionchange:-p--.podcast-editor:--.cut-button:.remove-attribute_disabled   # original: When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element; trigger scoped to the waveform region)
selectionchange:-p--.editor-shell:--.format-dropdown:.reset-to-paragraph   # original: When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element; custom method)
blur:-p--.field:.add-class_unsaved   # original: When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label. (the dot renders from the unsaved class on the field wrapper)
blur:-p--.address-group:.validate-group   # original: When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element; .validate-group custom method)


# 7. Visibility & intersection


### A. Single-element

intersection:.count-up   # original: When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values. (each counter carries the attribute; .count-up custom method)
intersection:.muted_true:.play   # original: When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves. (companion attribute intersection_off:.pause; the half-visible threshold is configured on the observer-backed component)
intersection:.track-impression   # original: When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing. (.track-impression custom method; the threshold and one-second dwell are configured inside it)
intersection:.start-live-feed   # original: When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle. (.start-live-feed custom method)
intersection:.load-reviews   # original: When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast. (.load-reviews custom method)
intersection:.preload-comments   # original: When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background. (.preload-comments custom method; the "about to" margin is configured inside it)
intersection:.log-impression   # original: When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking. (.log-impression custom method; dwell time configured inside it)
intersection:.reveal-labels   # original: When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one. (.reveal-labels custom method staggers the labels)
intersection:.play-once   # original: When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once. (.play-once custom method)
intersection:.add-class_entered   # original: A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte) (the entered class persists, so the animation naturally runs once)
intersection:.load-images   # original: When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch. (.load-images custom method)


### B. Multi-element

intersection:--.lazy-img:.load   # original: When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder. (.load custom method on the lazy-img element, a descendant of the card)
intersection:-p:.load-more   # original: When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element; trigger element and reactor differ: -p targets the list container, .load-more custom method)
intersection:.id:-p--.article:--.toc:.highlight_oi   # original: When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element; .id getter feeds .highlight(id) on the toc)
intersection:-p--.walkthrough:--.progress-rail:.sync   # original: When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element; .sync custom method)
intersection:.id:-p--.map-list-view:--.map-canvas:.enlarge-pin_oi   # original: When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element; .enlarge-pin(id) custom method)
intersection:--.badge:.add-class_pop   # original: When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place. (trigger on the slide, badge is a descendant)
intersection_off:-p--body:--.sticky-hero:.add-class_visible   # original: When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element; the intersection off variant fires on the way out)
intersection:-p--.consent-form:--.accept-button:.remove-attribute_disabled   # original: When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element; trigger sits on an end-marker element inside the scroll box)
intersection:-p--.chat-window:.mark-read   # original: When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element; .mark-read custom method)
intersection_off:-p--body:--.mini-player:.add-class_docked   # original: When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element; off variant fires when the player leaves)


# 8. Attribute & DOM mutation


### A. Single-element

attr_disabled:.enabled-now:.:.add-class_enabled-flash   # original: When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color. (.enabled-now custom filter checks the attribute is actually gone)
attr_aria-selected:.toggle-class_row-selected   # original: When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match. (toggling mirrors each flip)
attr_class:.is-hidden:.:.collapse-into-notice   # original: When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice. (.is-hidden custom filter; .collapse-into-notice custom method)
attr_data-experiment:.apply-variant   # original: When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant. (.apply-variant custom method)
load:.add-class_faded-in   # original: When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading. (choice: the fade keys off the img load event, which only fires after the real src finishes loading)
attr_ready:.init-enhancements   # original: When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element; .init-enhancements custom method on the root element)


### B. Multi-element

attr_aria-expanded:-c0:.toggle-class_flipped   # original: When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward. (-c0 is the chevron child; toggling mirrors each flip)
attr_data-theme:--.dashboard-charts:.apply-theme   # original: When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element; trigger on the root element, .apply-theme custom method on the charts container)
attr_data-state:.is-buffering:.:-p--.course-page:--.spinner:.toggle-attribute_visible   # original: When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element; .is-buffering custom filter method)
attr_class:-p--form:--.error-summary:.refresh   # original: When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element; .refresh custom method, no-ops until an error class exists)
attr_lang:--.date-picker:.relocale   # original: When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element; trigger on the html element, .relocale custom method)
attr_aria-current:-p--.step-form:--.step-heading:.announce-step   # original: When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element; .announce-step custom method)
attr_class:.has-active:.:-c0:.add-class_visible   # original: When a carousel slide gains the active class, its caption text fades in while the previous caption hides. (.has-active custom filter; -c0 is the caption child; the previous caption hides via the same class CSS)
attr_data-breakpoint:--.site-nav:.swap-mode   # original: When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element; .swap-mode custom method)
attr_type:-n:.toggle-class_showing   # original: When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye. (the eye icon is the field's next sibling)


# 9. Resize & viewport


### A. Single-element

viewport-resize:.reflow-columns   # original: When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one. (viewport-resize is already window-scoped, so no _ prefix needed; .reflow-columns custom method)
orientation_landscape:.add-class_fullbleed   # original: When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element; orientation portal from src/1d with the landscape argument)
resize:.redraw   # original: When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions. (resize observer trigger; .redraw custom method)
resize:.reflow-columns   # original: When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size. (.reflow-columns custom method)
resize:.recenter   # original: When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element; .recenter custom method on the map component)
resize:.clamp-widths   # original: When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width. (.clamp-widths custom method on each pane)
orientation_portrait:.add-class_stacked   # original: When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.
resize:.compact-if-narrow   # original: A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte) (.compact-if-narrow custom method reads its own content-box width)


### B. Multi-element

resize:-n:.update-minimap   # original: When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold. (resize observer on the sidebar; the editor is its next sibling; .update-minimap custom method)
viewport-resize:-p--.lobby:--canvas:.fit-letterbox   # original: When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed. (.fit-letterbox custom method)
resize:-n:.reposition   # original: When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element; counter is the textarea's next sibling)
viewport-resize:-p--.form-shell:--.submit-bar:.add-class_docked   # original: When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)


# 10. Scroll


### A. Single-element

scroll_passive:.at-top:.:.load-earlier   # original: When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping. (.at-top custom filter; .load-earlier custom method preserves scroll position internally)
scroll_passive:.pin-first-column   # original: When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible. (.pin-first-column custom method)
scrollend:.snap-to-nearest   # original: When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card. (scrollend fires when scrolling pauses; .snap-to-nearest custom method)
scroll_passive:.pause-auto-follow   # original: When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element; resume via companion attribute click:.resume-follow on the jump button)
wheel:.at-scroll-boundary:.:prevent   # original: While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element; .at-scroll-boundary custom filter only prevents default at the modal's scroll edges, which stops scroll chaining to the page behind)


### B. Multi-element

scroll_passive:-p--body:--.progress-bar:.update   # original: As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element; _passive variant documented in src/1b_DomEvents.js; .update custom method)
scrollend:.at-end:.:-p--.account-form:--.accept-button:.remove-attribute_disabled   # original: When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element; .at-end custom filter checks the scroll position)
intersection_off:-p--body:--.book-tour-bar:.toggle-attribute_pinned   # original: When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element; choice: hero-leaves-viewport via intersection is more idiomatic than scroll-position math)
scroll_passive:.fast-upward:.:-p--body:--.back-to-top:.add-class_visible   # original: When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element; .fast-upward custom filter on scroll velocity and direction)
scroll_passive:-p--body:--.top-nav:.update-condensed   # original: When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll. (.update-condensed custom method tracks scroll direction)
scroll_passive:-p--.tutorial:--.explanation-pane:.sync-scroll   # original: When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element; .sync-scroll custom method)
intersection:.text-content:-p--.report:--.chapter-label:.text-content_oi   # original: When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element; choice: heading-enters-viewport via intersection; the heading's own textContent becomes the label text)


# 11. Animation & transition


### A. Single-element

animationend:.schedule-dismiss   # original: When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds. (.schedule-dismiss custom method owns the timer, since no timer trigger exists in source)
transitionend:.remove   # original: When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.
animationiteration:.swap-in-content   # original: When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element; .swap-in-content custom method checks data readiness internally)
animationend:.remove   # original: When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.
animationend:.remove-class_flash   # original: When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.
animationiteration:.stop-after-three   # original: When a badge's pulse animation completes three iterations, it stops so it does not distract from reading. (.stop-after-three custom method counts iterations)
transitionend:.remove   # original: When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)


### B. Multi-element

animationend:-n:.add-class_visible   # original: When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element; buttons are the confetti element's next sibling)
transitionend:--a:.focus   # original: When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element; --a finds the first descendant link)
transitionend:--input:.focus   # original: When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element; --input finds the first descendant field of the step panel)


# 12. Navigation & history


### A. Single-element

popstate:.restore-filters   # original: When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history. (.restore-filters custom method)
hashchange:.highlight-hash-target   # original: When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element; .highlight-hash-target custom method on the docs root)
beforeunload:prevent   # original: When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost. (preventDefault on beforeunload triggers the native stay-or-leave prompt)
navigate:.update-metadata   # original: When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element; .update-metadata custom method on the app root)
pageshow_persisted:.refresh-prices   # original: When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values. (persisted argument matches event.persisted; .refresh-prices custom method)
navigate:.activate-deep-tab   # original: When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads. (.activate-deep-tab custom method reads the destination)
navigate:.extract-locale:state_locale   # original: When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element; .extract-locale custom reaction reads the destination URL, then the state_locale reaction writes the store prop)


### B. Multi-element

navigate:-p--.course-app:--video:.pause:-p--.course-app:--.outline:.scroll-to-active   # original: When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element; two static dashes; .scroll-to-active custom method)
navigate:-p--body:--.cart-badge:.text-content_0   # original: When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element; .text-content_0 setter)
navigate:-p--.booking-flow:--.step-indicator:.sync-to-url   # original: When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element; .sync-to-url custom method)
popstate:-p--body:--.lightbox:.close   # original: When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element; native .close() on the dialog)


# 13. Window/document lifecycle


### A. Single-element

readystatechange_complete:.prioritize-hero-images:.load-comments   # original: When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element; document-only event, so no _ prefix needed; two custom methods)
visibilitychange_hidden:.pause-preview:.show-away   # original: When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element; hidden argument variant; two custom methods on the call tile)
visibilitychange_visible:.refresh-scores   # original: When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll. (.refresh-scores custom method)
offline:.add-class_offline:.queue-submissions   # original: When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element; window-level portal; .queue-submissions custom method)
online:.flush-queue:.remove-class_offline   # original: When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element; .flush-queue custom method)
beforeunload:prevent   # original: When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave. (preventDefault produces the native prompt)
pageshow_persisted:.sync-cart-count   # original: When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element; .sync-cart-count custom method)
visibilitychange_hidden:.pause-loop   # original: When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background. (.pause-loop custom method on the game root)


### B. Multi-element

(none)


# 14. Fullscreen


### A. Single-element

fullscreenchange:.remove-class_fullscreen   # original: When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element; the strip returns via CSS once the fullscreen class drops)
fullscreenchange:.add-class_immersive   # original: When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity. (the inactivity fade is CSS on the immersive class)
fullscreenchange:.remove-class_fullscreen   # original: When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element; choice: the rotation causes a fullscreenchange, which is the supported trigger; the inline layout returns via CSS)
fullscreenchange:.resize-hints   # original: When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element; .resize-hints custom method)


### B. Multi-element

click:-p--.player:.request-fullscreen   # original: When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly. (button requests fullscreen on its parent player; the brief exit hint renders from CSS on the fullscreen state)
fullscreenerror:-p--body:--.map-modal:.show-modal   # original: When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead. (fullscreenerror trigger; native showModal on the fallback dialog)
_fullscreenchange:-p--body:--.site-header:.add-class_hidden   # original: When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element; "any element" means document-level listening, hence the _ prefix)


# 15. State store reactivity


### A. Single-element

(none)


### B. Multi-element

state_cart_count:-p--header:--.cart-icon:.bump_oi   # original: When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation. (.bump(state) custom method on the icon)
state_auth_loggedin:-p--header:--.account-area:.swap-to-avatar_oi   # original: When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu. (.swap-to-avatar(state) custom method)
state_prefs_currency:-p--body:.re-render-prices_oi   # original: When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted. (.re-render-prices(state) custom method)
state_notifications_unread:-p--header:--.bell-icon:.sync-dot_oi   # original: When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter. (.sync-dot(state) custom method also clears the tab title)
state_watchlist_price:-p--.portfolio:.flash-row_oi:.recalculate-total   # original: When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates. (two custom methods on the portfolio)
state_ui_sidebar:-p--body:--.main-area:.refit_oi   # original: When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it. (.refit(state) custom method)
state_checkin_patient:-p--body:--.waiting-board:.remove-initials_oi   # original: When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically. (.remove-initials(state) custom method)
state_player_track:-p--body:--.now-playing:.render-track_oi   # original: When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork. (.render-track(state) custom method)
state_search_filters:-p--.catalog:--.results-grid:.refetch_oi   # original: When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element; .refetch(state) custom method)
state_net_online:-p--body:.disable-submits_oi   # original: When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note. (.disable-submits(state) custom method)
state_storage_quota:-p--.file-manager:--.upgrade-banner:.maybe-show_oi   # original: When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager. (.maybe-show(state) custom method applies the threshold)
state_admin_workspace:-p--.admin-console:.reload-tables_oi   # original: When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element; .reload-tables(state) custom method)
state_quiz_score:-p--.summary:--.certificate-button:.maybe-unlock_oi   # original: When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen. (.maybe-unlock(state) custom method applies the threshold)
state_doc_title:-p--body:.sync-tab-title_oi   # original: When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document. (.sync-tab-title(state) custom method writes document.title)
state_prefs_theme:-..:.theme:-p--html:.set-attribute_data-theme_oi   # original: When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors. (extracts the theme prop from the State object via :-.. and .theme, then setAttribute("data-theme", oi); chart recoloring is the companion attr_data-theme chain from category 8)
state_audio_muted:-p--.game-root:.apply-mute_oi   # original: When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately. (.apply-mute(state) custom method)
state_steps:-p--.application:--.review-submit:.unlock-when-complete_oi   # original: When every step completion flag in a multi-step application reads true, the review and submit section enables. (.unlock-when-complete(state) custom method checks all step flags)
state_auction_bid:-p--.auction-room:.render-bid_oi   # original: When a bid raises the store's current highest bid, all watching clients see the price and countdown change together. (.render-bid(state) custom method)
state_devices:-p--.smart-home:.sync-tile_oi   # original: When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it. (.sync-tile(state) custom method)
state_mail_drafts:-p--.sidebar:--.drafts-badge:.sync_oi   # original: When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it. (.sync(state) custom method)
state_firstname_lastname:-p--.profile:--.greeting:.render-name_oi   # original: A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue) (multi-prop trigger: fires when either prop changes once both are initiated, per src/AttributeObserver/PortalState.js)
state_modal_open:-p--body:--.modal:.sync-open_oi   # original: A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element; .sync-open(state) custom method; the write side is any button chain ending in the state_modal reaction)
state_i18n_locale:-p--body:.re-render-dates_oi   # original: When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React) (.re-render-dates(state) custom method)


# 16. Element connect


### A. Single-element

i:.request-creative   # original: When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned. (.request-creative custom method; i fires on first connect)
i:.load-photo   # original: When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading. (.load-photo custom method)
i:.highlight   # original: When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element; .highlight custom method also appends the copy button)
i:.render-relative-time   # original: When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates. (.render-relative-time custom method owns its refresh schedule)
i:.draw   # original: When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in. (.draw custom method)
i:.set-attribute_aria-describedby_tip-1   # original: When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element; setAttribute("aria-describedby", "tip-1") via KebabReflection)
i:.load-map-script   # original: When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element; .load-map-script custom method)
i:.restore-position   # original: When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress. (.restore-position custom method)
i:.remove-attribute_x-cloak   # original: When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)
i:.render-stars   # original: When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars. (.render-stars custom method)
i:.connect-socket   # original: When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React) (.connect-socket custom method; teardown is the portal's off() on disconnect, not a trigger)
i:.load-editor   # original: When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance. (.load-editor custom method)
i:--data-target:.value:-:.count-up_oi   # original: When a counter element with a target value is inserted, it reads the target and starts counting up toward it. (--data-target attribute query reads the value, :- returns origin to the element, .count-up(value) custom method)
i:.remove-if-decided   # original: When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen. (.remove-if-decided custom method)
i:--data-percentage:.value:-:.animate-to_oi   # original: When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value. (.animate-to(value) custom method)


### B. Multi-element

(none)


## Summary

- Total classified: 254
- Single-element (A): 129
- Multi-element (B): 125
- Check: A + B = 254 (matches step-2.md converted total of 254, excluding Unmapped: yes)

The A/B split is nearly even overall (129 vs 125), but individual categories polarize sharply. Element connect (15/15) and Window/document lifecycle (8/8) are entirely single-element — connecting and lifecycle behaviors are intrinsically about an element initializing, pausing, or refreshing itself, and the window/document portals are already global by registration so they never needed the `_` prefix. Drag & drop (11 A / 4 B), Animation & transition (7 A / 3 B), and Resize & viewport (8 A / 4 B) also skew toward A, because drop effects, animation cleanup, and self-resizing are behaviors an element performs on its own body. At the other pole, State store reactivity is multi-element by construction (23/23 B, since the store is always a separate origin from any DOM element), and Form & input (16 B / 27), Media playback (10 B / 15), and Focus & selection (9 B / 14) skew multi-element because these behaviors are inherently relational — a field's value drives a sibling meter, a player's events ripple out to surrounding chrome, and focus in one control opens a panel elsewhere. The remaining categories (click, keyboard, visibility, mutation, scroll, fullscreen, navigation) sit close to even, showing that real interactions in those areas split about evenly between self-contained effects and effects that reach across the DOM.
