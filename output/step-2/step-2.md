# Step 2 — Converted DDT Syntax Use Cases

# 1. Click & pointer interactions

click:.toggle-attribute_expanded   # original: A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.
dblclick:.toggle-attribute_editing   # original: A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted.
contextmenu:prevent:.toggle-attribute_open   # original: A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions.
click:.toggle-attribute_favorited:state_favorites_item   # original: A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection.
click:state_watchlist_page   # original: A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.
click:.toggle-attribute_selected:dblclick:.play   # original: A single click on a track in a music queue selects it, while a double click starts playing it immediately.
click::-p--gallery:--main-photo:.set-attribute_src   # original: A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element)
click::--panel:.remove-attribute_open   # original: A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element)
click::-n--card:.toggle-attribute_open   # original: A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element)
contextmenu:prevent::-c--emoji-menu:.toggle-attribute_open   # original: A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element)
click:state_audit_sort   # original: An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction.
click:.toggle-attribute_selected:state_booking_price   # original: A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element)
dblclick:.zoom   # original: A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood.
click:.copy:.set-attribute_label_copied   # original: A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.
click:.toggle-attribute_open   # original: A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.
click:.toggle-attribute_zoom   # original: A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves.
contextmenu:prevent::-c--menu:.toggle-attribute_open   # original: A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history.
click:.toggle-attribute_active:state_forum_score   # original: A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange.
auxclick:.close   # original: A middle click on a terminal tab in a developer tool closes that session along with its running process.
click:.toggle-attribute_expanded   # original: A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.
click:.set-attribute_selected_true:.toggle-attribute_revealed   # original: A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct.
click:.toggle-attribute_selected::-p--form:--input_name__check-in:.value   # original: A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element)
click:prevent   # original: A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element)
click:.set-attribute_disabled_true:.submit   # original: A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue)

# 2. Keyboard interaction

keydown_escape:.remove-attribute_open   # original: A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it.
keydown_ctrl-k::-p--body:--.command-palette:.toggle-attribute_open:--input:.focus   # original: A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element)
keydown_enter:prevent:.submit   # original: Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.
keydown_arrow-down:prevent::-c--.suggestion:.focus   # original: A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse.
keydown_tab:prevent::-n:.focus   # original: Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back.
keydown_j::-n--article:.focus   # original: A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element)
keydown_slash:prevent::-p--body:--input_name__search:.focus   # original: A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element)
keydown_shift-arrow-down:.extend-selection   # original: Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time.
keydown_ctrl-enter:prevent:.submit   # original: A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse.
keydown_escape:.cancel   # original: Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column.
keydown_ctrl-z:.undo   # original: A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it.
keydown_arrow-right::-n--.slide:.focus   # original: Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last.
keydown_space:prevent:.toggle-play   # original: A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause.
keydown_question-mark::-p--body:--.cheat-sheet:.toggle-attribute_open   # original: A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element)
keydown_ctrl-s:prevent:state_draft_save   # original: A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening.
keydown_delete:state_emails_delete   # original: Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action.
keydown_m:state_call_mic-muted   # original: A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element)
keydown_tab:.trap-focus   # original: Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it.
keydown_1:state_intake_rating   # original: A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly.
keydown_enter:.click::-p--menu:.remove-attribute_open   # original: A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes.
keydown_ctrl-c:.copy   # original: A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise.
keydown_enter:state_lobby_matchmaking   # original: A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte)
keydown_ctrl-arrow-right:.move-beat   # original: In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks.

# 3. Form & input

blur:.check-validity::-n--.error:.toggle-attribute_hidden   # original: When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.
change::-p--form:--.region-field:.toggle-attribute_hidden   # original: Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element)
input:state_password_strength   # original: As a user types a new password, a strength meter under the field updates and lists which requirements are still missing.
change::-p--form:--textarea_name__details:.toggle-attribute_required   # original: Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element)
paste:.format-card   # original: A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically.
input:state_chat_typing   # original: Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element)
input:state_budget_value   # original: Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element)
change::-p--form:--.guardian-section:.toggle-attribute_hidden   # original: Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element)
reset:state_search_filters   # original: Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element)
submit::-c--button:.set-attribute_disabled_true   # original: Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.
input:.check-validity::-n--.stock-warning:.toggle-attribute_hidden   # original: Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning.
blur:.check-validity::-n--.error:.toggle-attribute_hidden   # original: Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives.
input:state_airport_query   # original: Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities.
change::-p--form:--.billing-fields:.toggle-attribute_hidden   # original: Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element)
input:state_promo_code   # original: Typing a promo code validates it on the fly and shows the applied discount inline beside the field.
change::-p--form:--input_name__end-date:.set-attribute_min   # original: Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element)
input:state_post_length   # original: A character counter under a social post composer counts down while typing and turns red in the final stretch.
change::-p--form:--button_type__submit:.remove-attribute_disabled   # original: Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element)
input:state_mortgage_downpayment   # original: Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element)
input:.set-attribute_dirty_true   # original: Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label.
change:.check-validity   # original: Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error.
input:.format-ssn   # original: A tax form formats a social security number into dashed digit groups as the user types each number.
change::-p--table:--input_type__checkbox:.toggle-attribute_checked   # original: Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element)
input:state_tag_query   # original: Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues.
change:state_device_type   # original: Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element)
input:state_filter_value   # original: A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue)
input:.check-validity   # original: Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular)

# 4. Media playback

ended::-p--body:--.next-button:.add-class_pulse   # original: When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element)
play:state_player_episode   # original: A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element)
pause:.set-attribute_paused_true   # original: When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards.
waiting::-c--.spinner:.remove-attribute_hidden   # original: As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes.
timeupdate:state_video_progress   # original: When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner.
input:state_radio_volume   # original: A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately.
timeupdate:.pause::-p--body:--.quiz-overlay:.toggle-attribute_open   # original: When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element)
ended::-p--body:--.next-card:.add-class_highlight   # original: When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element)
timeupdate:state_lyrics_time   # original: A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line.
pause::-n--.chapter-list:.remove-attribute_hidden   # original: When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature.
stalled::-p--body:--.reconnecting-banner:.remove-attribute_hidden   # original: When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element)
ended:state_story_next   # original: When a story video finishes in a social app, the player advances itself to the next friend's story.
play::-p--body:.set-attribute_theme_dark   # original: Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)
input:state_seek_frame   # original: While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer.
ended::-p--body:--button_name__record:.remove-attribute_disabled   # original: When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element)

# 5. Drag & drop / clipboard

drop:prevent:state_kanban_status   # original: A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop.
dragover:prevent:.add-class_active   # original: A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active.
drop:prevent:state_upload_file   # original: When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes.
drop:prevent:state_playlist_order   # original: A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly.
drop:prevent:state_dashboard_layout   # original: Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop.
copy::-p--body:--.toast:.toggle-attribute_open   # original: A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element)
paste:state_invite_emails   # original: When a user pastes a list of email addresses into an invite field, they are split into individual removable chips.
drop:prevent:state_appointment_slot   # original: When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element)
drop:prevent:state_comparison_tray   # original: Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element)
click:copy:.add-class_copied   # original: A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback.
dragleave::-p--body:--.drop-overlay:.set-attribute_hidden_true   # original: When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element)
drop:prevent:state_canvas_layers   # original: A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element)
paste:state_chat_link   # original: When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element)
drop:prevent:state_route_order   # original: A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately.
paste:state_verification_code   # original: A user pastes a one-time code into a six box verification input and each digit lands in its own box.
cut::-p--body:--button_name__paste:.remove-attribute_disabled   # original: A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)

# 6. Focus & selection

focus::-n--.suggestions-panel:.set-attribute_open_true   # original: When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element)
focus::-n--.megamenu:.set-attribute_open_true   # original: When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element)
selectionchange::-p--body:--.toolbar:.remove-attribute_hidden   # original: When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element)
focus:.announce   # original: When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it.
selectionchange:state_spreadsheet_selection   # original: When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element)
focus:state_keyboard_layout   # original: When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element)
blur:.check-validity   # original: When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs.
focus:.add-class_focused   # original: When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card.
select::-p--body:--.editor-actions:.remove-attribute_disabled   # original: When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element)
selectionchange:state_editor_style   # original: When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element)
focus:.announce   # original: When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers.
blur::-m--label:.add-class_unsaved   # original: When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label.
focus:.add-class_focus-ring   # original: A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular)
blur::-p--form:.check-validity   # original: When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element)

# 7. Visibility & intersection

intersection:.swap-src   # original: When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder.
intersection:state_history_page   # original: When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element)
intersection:.animate   # original: When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values.
intersection:state_toc_active   # original: When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element)
intersection:.play   # original: When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves.
intersection:state_ad_impression   # original: When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing.
intersection:state_vitals_stream   # original: When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle.
intersection:state_onboarding_step   # original: When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element)
intersection:state_map_highlight   # original: When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element)
intersection:state_reviews_load   # original: When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast.
intersection::-c--.badge:.add-class_animate   # original: When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place.
intersection:state_comments_load   # original: When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.
intersection::-p--body:--.sticky-bar:.set-attribute_open_true   # original: When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element)
intersection:state_job_impression   # original: When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking.
intersection::-p--form:--button_name__accept:.remove-attribute_disabled   # original: When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element)
intersection:state_chat_read   # original: When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element)
intersection:.add-class_fade-in   # original: When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one.
intersection:.play   # original: When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once.
intersection:.add-class_slide-up   # original: A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte)
intersection:state_listings_batch   # original: When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch.
intersection::-p--body:--.mini-player:.set-attribute_docked_true   # original: When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element)

# 8. Attribute & DOM mutation

attr_expanded::-c--.chevron:.add-class_rotate   # original: When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward.
attr_theme:state_charts_theme   # original: When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element)
attr_count:.add-class_pulse   # original: When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye.
i::-p--body:--.help-link:.set-attribute_hidden_true   # original: When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element)
attr:.announce   # original: When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere.
attr_disabled:.add-class_animate   # original: When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color.
attr_state::-p--body:--.global-spinner:.remove-attribute_hidden   # original: When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element)
attr_class::-p--form:--.summary-banner:.toggle-attribute_open   # original: When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element)
attr_lang:state_app_locale   # original: When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element)
attr_selected:.add-class_highlight   # original: When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match.
attr_value:.add-class_flash   # original: When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change.
i:.adjust-layout   # original: When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element)
attr_current-step::-p--form:--h1:.announce   # original: When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element)
attr_class::-c--.caption:.add-class_fade-in   # original: When a carousel slide gains the active class, its caption text fades in while the previous caption hides.
attr:.set-attribute_hidden_true   # original: When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article.
attr_breakpoint:state_nav_layout   # original: When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element)
attr_class:.add-class_collapsed   # original: When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice.
attr:.update-numbers   # original: When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order.
attr_experiment:state_hero_variant   # original: When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant.
attr_type::-n--.eye-icon:.toggle-attribute_open   # original: When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye.
attr_src:.add-class_fade-in   # original: When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading.
attr_ready:state_app_init   # original: When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element)

# 9. Resize & viewport

viewport-resize:state_grid_columns   # original: When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.
orientation:state_player_fullscreen   # original: When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element)
resize:state_sidebar_width   # original: When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold.
resize:.redraw   # original: When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions.
resize:.scale   # original: When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed.
resize::-n--.counter:.adjust-position   # original: When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element)
resize:state_gallery_columns   # original: When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size.
viewport-resize::-p--form:--button_type__submit:.adjust-position   # original: When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)
resize:.recenter   # original: When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element)
resize:.clamp-width   # original: When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width.
orientation:state_kiosk_layout   # original: When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.
resize:.toggle-attribute_compact   # original: A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte)

# 10. Scroll

scroll:state_reading_progress   # original: As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element)
scrollend::-p--form:--button_name__accept:.remove-attribute_disabled   # original: When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element)
scroll::-p--body:--.tour-bar:.set-attribute_pinned_true   # original: When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element)
scroll::-p--body:--.back-to-top:.toggle-attribute_open   # original: When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element)
scroll:state_chat_history   # original: When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping.
scroll::-c--.first-col:.freeze   # original: When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible.
scrollend:.snap   # original: When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card.
scroll:state_autofollow_disabled   # original: When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element)
scroll::-p--body:--header:.toggle-attribute_slim   # original: When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll.
scroll::-p--body:--.explanation-pane:.sync-scroll   # original: When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element)
scroll:prevent   # original: While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element)
scroll:state_current_chapter   # original: When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element)

# 11. Animation & transition

animationend:.dismiss   # original: When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds.
transitionend:.remove   # original: When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.
animationiteration:state_content_swap   # original: When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element)
animationend::-p--body:--.share-buttons:.remove-attribute_hidden   # original: When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element)
transitionend::-c--a:.focus   # original: When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element)
animationend:state_error_show   # original: When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space.
animationend:.remove   # original: When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.
animationend:.remove-class_flash   # original: When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.
animationiteration:.remove-class_pulse   # original: When a badge's pulse animation completes three iterations, it stops so it does not distract from reading.
transitionend::-c--input:.focus   # original: When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element)
transitionend:.remove   # original: When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)

# 12. Navigation & history

navigate:state_lesson_route   # original: When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element)
popstate:state_filters_restore   # original: When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history.
hashchange:.add-class_highlight   # original: When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element)
beforeunload:prevent   # original: When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost.
navigate:state_view_metadata   # original: When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element)
pageshow:state_prices_refresh   # original: When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values.
hashchange:state_tab_active   # original: When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads.
navigate:state_cart_reset   # original: When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element)
popstate:state_step_update   # original: When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element)
popstate::-p--body:--.lightbox:.remove-attribute_open   # original: When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element)
navigate:state_app_locale   # original: When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element)

# 13. Window/document lifecycle

dcl:state_deferred_modules   # original: When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element)
visibilitychange_hidden:state_video_away   # original: When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element)
visibilitychange:state_scores_refresh   # original: When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll.
offline::-p--body:--.offline-banner:.remove-attribute_hidden   # original: When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element)
online::-p--body:--.offline-banner:.set-attribute_hidden_true   # original: When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element)
beforeunload:prevent   # original: When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave.
pageshow:state_cart_sync   # original: When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element)
visibilitychange_hidden:.pause   # original: When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background.
dcl:.remeasure   # original: When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text.

# 14. Fullscreen

click:.request-fullscreen   # original: When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly.
fullscreenchange::-p--body:--.thumbnails:.remove-attribute_hidden   # original: When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element)
fullscreenchange::-c--.nav-hints:.set-attribute_hidden_true   # original: When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity.
fullscreenerror::-p--body:--.modal:.set-attribute_open_true   # original: When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead.
fullscreenchange::-p--body:--header:.set-attribute_hidden_true   # original: When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element)
orientation:.exit-fullscreen   # original: When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element)
fullscreenchange::-c--.controls:.resize   # original: When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element)

# 15. State store reactivity

state_cart_count:.add-class_bump   # original: When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation.
state_auth_logged-in:.toggle-attribute_open   # original: When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu.
state_app_currency:.update   # original: When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted.
state_notifications_unread:.remove-class_active   # original: When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter.
state_stock_price:.add-class_flash   # original: When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates.
state_sidebar_collapsed:.toggle-attribute_collapsed   # original: When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it.
state_patient_checked-in:.remove   # original: When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically.
state_player_track:.update   # original: When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork.
state_filters_list:.update   # original: When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element)
state_app_online:.set-attribute_disabled_true   # original: When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note.
state_storage_quota:.remove-attribute_hidden   # original: When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager.
state_admin_workspace:.reload   # original: When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element)
state_quiz_score:.remove-attribute_disabled   # original: When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen.
state_document_title:.update-title   # original: When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document.
state_app_theme:.set-attribute_theme   # original: When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors.
state_settings_muted:.update   # original: When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately.
state_form_completed:.remove-attribute_disabled   # original: When every step completion flag in a multi-step application reads true, the review and submit section enables.
state_auction_bid:.update   # original: When a bid raises the store's current highest bid, all watching clients see the price and countdown change together.
state_device_status:.add-class_offline   # original: When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it.
state_mail_drafts:.update   # original: When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it.
state_user_name:.update   # original: A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue)
state_modal_open:.toggle-attribute_open   # original: A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element)
state_app_locale:.update   # original: When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React)
state_clock_time:.update   # original: A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte)

# 16. Element connect

i:state_ad_fetch   # original: When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned.
i:.swap-src   # original: When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading.
i:.highlight   # original: When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element)
i:.format-relative   # original: When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates.
i:.draw-chart   # original: When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in.
i::-n--.tooltip:.set-attribute_aria-describedby   # original: When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element)
i:.load-map   # original: When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element)
i:.restore-progress   # original: When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress.
i:.remove-attribute_cloak   # original: When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)
i:.render-stars   # original: When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars.
i:.open-socket   # original: When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React)
i:.load-editor   # original: When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance.
i:.count-up   # original: When a counter element with a target value is inserted, it reads the target and starts counting up toward it.
i:.check-consent   # original: When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen.
i:.animate-ring   # original: When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value.

## Unmapped

- A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it. (missing trigger portal: clickoutside)
- A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it. (missing trigger portal: clickoutside)
- A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together. (missing trigger portal: longpress)
- A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls. (missing trigger portal: longpress)
- A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises. (missing trigger portal: doubletap)
- As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field. (missing trigger portal modifier: input debouncing/pause)
- A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js) (missing trigger portal modifier: input debouncing/pause)
- When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content. (missing trigger portal: idle timer)
