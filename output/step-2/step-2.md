# Step 2 — Classify use cases

Every use case from Step 1 is classified as `single` (every reaction acts only on the element carrying the attribute) or `multi` (the chain must mutate a different element or dispatch a portal call to another element's chain). Global triggers (document keydown, window scroll/resize, navigation, store changes) are classified by where the mutation lands, not by listener scope.

# 1. Click & pointer interactions

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference. | single | The transaction row itself expands inline; the merchant details render within the same row element. |
| 2 | A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted. | single | The same spreadsheet cell switches into edit mode and highlights its own value. |
| 3 | A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions. | multi | The context menu is a separate floating element that must be opened outside the right-clicked file row. |
| 4 | A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it. | multi | The menu closes, but focus must also be written back to the separate avatar button element. |
| 5 | A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it. | single | Only the cart drawer element mutates; it slides itself closed. |
| 6 | A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together. | single | The long-pressed conversation row itself enters multi-select mode. |
| 7 | A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection. | single | The heart fills in on the clicked card element; saving to favorites is a data write, not a DOM mutation. |
| 8 | A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids. | multi | The new lots are appended to the watchlist list element, not to the load-more button that was clicked. |
| 9 | A single click on a track in a music queue selects it, while a double click starts playing it immediately. | single | The selected state and the playing state both land on the clicked track element itself. |
| 10 | A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element) | multi | The main photo and its caption are separate elements from the clicked thumbnail. |
| 11 | A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element) | multi | The canvas listener must close every open floating panel, each a separate element. |
| 12 | A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element) | multi | The popup card is a separate element from the tapped map pin. |
| 13 | A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element) | multi | The emoji row is a separate element anchored above the message bubble, not the message itself. |
| 14 | A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls. | single | Both the toggle state and the expanded controls mutate the light tile itself. |
| 15 | An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction. | multi | Clicking the header cell must re-order the table's row elements, which are distinct from the header. |
| 16 | A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element) | multi | The price is written into the booking summary panel, a separate element from the clicked seat. |
| 17 | A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood. | multi | The zoom transform is applied to the canvas viewport element, not to the double-clicked node. |
| 18 | A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback. | single | Only the button's own label text changes to read copied. |
| 19 | A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again. | single | The accordion section carrying the header collapses its own content. |
| 20 | A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves. | single | The magnifier lens is the product photo's own overlay within the same viewer element. |
| 21 | A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises. | multi | The like count that rises is a separate element from the double-tapped photo. |
| 22 | A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history. | multi | The context menu is a separate floating element from the right-clicked diff line. |
| 23 | A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange. | multi | The score text lives on a separate element beside the arrow, so both it and the arrow mutate. |
| 24 | A middle click on a terminal tab in a developer tool closes that session along with its running process. | single | The middle-clicked terminal tab removes itself; killing the process is not a DOM mutation. |
| 25 | A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why. | single | The fraud alert banner expands its own content. |
| 26 | A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct. | single | The answer option marks itself selected and reveals the correctness on itself. |
| 27 | A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element) | multi | The check-in field that fills in is a different element from the clicked calendar cell. |
| 28 | A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element) | single | The listener only swallows clicks on the dimmed backdrop element itself; nothing is written to the modal or any other node. |
| 29 | A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue) | single | The payment button mutates only itself by ignoring further clicks on itself. |

# 2. Keyboard interaction

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it. | multi | The modal closes, but focus must also be restored to the separate button element that opened it. |
| 2 | A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element) | single | Global Ctrl+K trigger, but the palette only reveals itself and focuses its own search field. |
| 3 | Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead. | single | Both Enter behaviors mutate only the chat composer's own content and state. |
| 4 | A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse. | single | The highlight moves among suggestion items inside the autocomplete's own list. |
| 5 | Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back. | single | The active-cell highlight moves between cells inside the spreadsheet grid itself. |
| 6 | A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element) | multi | The current-article highlight and scroll position move from one article element to a different article element. |
| 7 | A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element) | single | Global slash-key trigger with the mutation (focus) landing on the file search box itself. |
| 8 | Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time. | single | The selection extends within the rich text editor element itself. |
| 9 | A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse. | single | The reply form submits itself; no other element is mutated. |
| 10 | Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column. | single | The dragged card snaps itself back to its original column position. |
| 11 | A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it. | single | Undo and redo restore the canvas element's own drawing state. |
| 12 | Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last. | single | The carousel shifts its own track between its own slides. |
| 13 | A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause. | single | The video element toggles its own playback state. |
| 14 | A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element) | single | Global question-mark trigger; the cheat-sheet overlay only shows itself. |
| 15 | A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening. | single | The form saves its own draft locally; no other element is mutated. |
| 16 | Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action. | single | The mail list removes its own selected rows; moving to trash is a data operation. |
| 17 | A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element) | single | Document-level keydown, but the mic state toggle and icon swap both land on the mic button itself. |
| 18 | Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it. | single | Focus cycles only among the modal's own controls, never leaving the modal element. |
| 19 | A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly. | single | The pressed number sets the questionnaire item's own rating control. |
| 20 | A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes. | single | The dropdown fires the highlighted item's action and closes its own menu. |
| 21 | A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise. | single | The terminal element handles Ctrl+C internally as copy or interrupt; no other element mutates. |
| 22 | A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte) | single | Global Enter trigger starts matchmaking; the reaction is a state change, not a mutation of another element. |
| 23 | In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks. | single | The note cursor moves among beat and track cells inside the one sequencer element. |

# 3. Form & input

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field. | single | The tick or taken warning is the username field's own inline validation indicator. |
| 2 | A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js) | single | The filtered results are the search box's own results list within the same search widget. |
| 3 | When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field. | single | The inline error appears as part of the email field's own component. |
| 4 | Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element) | multi | The region field being swapped is a different element from the country select. |
| 5 | As a user types a new password, a strength meter under the field updates and lists which requirements are still missing. | single | The strength meter is the password field's own companion display. |
| 6 | Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element) | multi | The details textarea revealed is a separate element from the complaint-reason dropdown. |
| 7 | A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically. | single | The payment field reformats its own pasted value. |
| 8 | Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element) | multi | The typing indicator is written to the other participant's conversation header, a different element entirely. |
| 9 | Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element) | multi | The monthly total and the spending chart are separate elements from the edited budget cell. |
| 10 | Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element) | multi | The guardian consent section revealed is a separate element from the birth-date field. |
| 11 | Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element) | multi | The reset mutates each filter control and the separate results list, none of which is the reset button itself. |
| 12 | Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice. | single | The login form disables its own submit button and shows its own spinner. |
| 13 | Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning. | single | The quantity field turns its own border red and shows its own inline warning. |
| 14 | Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives. | single | The inline error belongs to the blurred field itself. |
| 15 | Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities. | single | The city field filters its own airport dropdown. |
| 16 | Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element) | multi | The billing fields that collapse are separate elements from the same-as-shipping checkbox. |
| 17 | Typing a promo code validates it on the fly and shows the applied discount inline beside the field. | single | The applied discount renders inline as part of the promo field's own component. |
| 18 | Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element) | multi | The end date picker whose minimum changes is a different element from the start date field. |
| 19 | A character counter under a social post composer counts down while typing and turns red in the final stretch. | single | The character counter is the composer's own display. |
| 20 | Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element) | multi | The submit button being enabled is a different element from the terms checkbox. |
| 21 | Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element) | multi | The monthly payment and interest figures are separate elements from the down-payment slider. |
| 22 | Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label. | single | The unsaved dot appears on the edited field's own label. |
| 23 | Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error. | single | The upload field replaces its own file-name text with the size error. |
| 24 | A tax form formats a social security number into dashed digit groups as the user types each number. | single | The tax form field reformats its own value as the user types. |
| 25 | Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element) | multi | Every row checkbox mutated is a different element from the select-all checkbox. |
| 26 | Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues. | single | The caption field opens and filters its own tag suggestion list. |
| 27 | Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element) | multi | The instruction panel swapped is a separate element from the device-type select. |
| 28 | A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue) | multi | Moving the slider must write the value into the separate number input element, and vice versa. |
| 29 | Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular) | multi | Group validity must be read from every control element and reflected on the separate save button. |

# 4. Media playback

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element) | multi | The next-lesson button and the course progress bar are separate elements from the ended video. |
| 2 | A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element) | multi | The mini player at the bottom is a different element from the episode's play control. |
| 3 | When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards. | single | The player remembers its own position and shows its own resume prompt. |
| 4 | As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes. | single | The spinner overlay appears on the buffering player element itself. |
| 5 | When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner. | single | The rating prompt slides up as part of the workout player element itself. |
| 6 | A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately. | single | The fill and speaker glyph are the volume control's own parts. |
| 7 | When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element) | multi | The question overlay is a separate quiz element from the video that pauses itself. |
| 8 | When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element) | multi | The next exhibit's card is a different element from the finished audio clip. |
| 9 | A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line. | multi | The playback-time trigger lives on the audio element while the highlight lands on separate lyric line elements. |
| 10 | When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature. | single | The chapter list is the demo player's own panel. |
| 11 | When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element) | multi | The bid buttons disabled are separate elements from the stalled video stream. |
| 12 | When a story video finishes in a social app, the player advances itself to the next friend's story. | single | The story player advances itself to the next story. |
| 13 | Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element) | multi | The app background that dims is a different element from the meditation player. |
| 14 | While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer. | single | The thumbnail preview is the seek bar's own pointer-following affordance. |
| 15 | When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element) | multi | The record-your-voice button enabled is a different element from the ended audio clip. |

# 5. Drag & drop / clipboard

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop. | single | The dragged card itself moves column and saves its own new status. |
| 2 | A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active. | single | The dashed highlight border is drawn on the avatar drop area itself. |
| 3 | When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes. | single | The progress bar fills inside the upload zone element itself. |
| 4 | A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly. | single | The playlist reorders and renumbers its own rows. |
| 5 | Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop. | single | The dashboard grid shows its own ghost placeholders and reflows its own children. |
| 6 | A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element) | multi | The confirmation toast is a separate element from the copied API key's page element. |
| 7 | When a user pastes a list of email addresses into an invite field, they are split into individual removable chips. | single | The invite field splits the pasted text into chips inside its own chip list. |
| 8 | When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element) | multi | The appointment slot filled and the undo option are different elements from the dragged waitlist entry. |
| 9 | Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element) | multi | The comparison tray badge and thumbnail are different elements from the dragged product image. |
| 10 | A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback. | single | The copy button shows the brief checkmark on itself. |
| 11 | When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element) | single | The full-page overlay hides itself on the window-level dragleave; the mutation lands on the overlay alone. |
| 12 | A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element) | multi | The canvas that re-renders is a different element from the dragged layer-panel item. |
| 13 | When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element) | multi | The link preview card is a new element attached below the draft, not the composer field itself. |
| 14 | A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately. | single | The route list reorders its own stops and rewrites its own distance labels. |
| 15 | A user pastes a one-time code into a six box verification input and each digit lands in its own box. | single | The six boxes are cells of the one verification-input widget that received the paste. |
| 16 | A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element) | multi | The toolbar's paste option is a different element from the note text that was cut. |

# 6. Focus & selection

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element) | multi | The suggested-articles panel is a separate element from the search input. |
| 2 | When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element) | multi | The megamenu panel that opens is a different element from the trigger receiving focus. |
| 3 | When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element) | multi | The floating toolbar is a separate element from the selected article text. |
| 4 | When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it. | single | The date picker announces its own controls through its own accessible text. |
| 5 | When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element) | multi | The status bar showing the sum is a different element from the selected cells. |
| 6 | When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element) | multi | The on-screen keyboard whose layout switches is a different element from the text field. |
| 7 | When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs. | single | The coupon field trims and uppercases its own value. |
| 8 | When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card. | single | The focus ring and quick actions render on the focused card itself. |
| 9 | When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element) | multi | The cut and fade buttons enabled are separate elements from the waveform being selected. |
| 10 | When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element) | multi | The block format dropdown reset is a different element from the editor's selection. |
| 11 | When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers. | single | The one-time-code input announces its own expected code length. |
| 12 | When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label. | single | The unsaved dot appears on the settings field's own label. |
| 13 | A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular) | single | The focus-ring class is toggled on the focused element itself. |
| 14 | When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element) | multi | Validation reads the other address-group fields and the shipping options load into a separate element. |

# 7. Visibility & intersection

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder. | single | The product card swaps in its own real image. |
| 2 | When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element) | multi | The list container that fetches and appends is a different element from the sentinel row. |
| 3 | When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values. | single | The counters animated are inside the statistics section itself. |
| 4 | When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element) | multi | The table-of-contents entry highlighted is a different element from the article section. |
| 5 | When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves. | single | The video plays and pauses itself based on its own visibility. |
| 6 | When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing. | single | Recording an impression is an analytics write; no other element is mutated. |
| 7 | When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle. | single | The chart fetches live data and refreshes its own canvas. |
| 8 | When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element) | multi | The progress-rail dot activated is a different element from the onboarding step. |
| 9 | When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element) | multi | The map pin enlarged is a different element from the property card. |
| 10 | When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast. | single | The review section lazy-loads its own scores. |
| 11 | When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place. | single | The best-value badge animates within the last slide itself. |
| 12 | When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background. | single | The comments section loads its own content. |
| 13 | When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element) | multi | The compact sticky bar that appears is a separate element from the hero banner. |
| 14 | When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking. | single | Logging a seen impression is an analytics write; no other element is mutated. |
| 15 | When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element) | multi | The accept button enabled sits outside the consent scroll box, a different element. |
| 16 | When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element) | multi | The chain must identify and mark the other message elements below the divider as read. |
| 17 | When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one. | single | The entrance labels fading in are part of the floor plan element itself. |
| 18 | When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once. | single | The infographic plays within the donor impact section itself. |
| 19 | A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte) | single | The card animates itself the first time it intersects the viewport. |
| 20 | When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch. | single | The listings strip lazy-loads its own images. |
| 21 | When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element) | multi | The mini player docking in the corner is a separate element from the page player that left view. |

# 8. Attribute & DOM mutation

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward. | single | The chevron that rotates is inside the menu button itself. |
| 2 | When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element) | multi | Every chart on the analytics page is a different element from the root carrying the theme attribute. |
| 3 | When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye. | single | The badge pulses itself when its own text changes. |
| 4 | When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element) | multi | The site's help link that hides is a different element from the injected chat launcher. |
| 5 | When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere. | single | The live region announces its own new text. |
| 6 | When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color. | single | The submit button animates its own color when its disabled attribute is removed. |
| 7 | When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element) | multi | The global spinner is a separate element from the video player whose state attribute changed. |
| 8 | When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element) | multi | The summary banner is a separate element that must also read every errored field. |
| 9 | When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element) | multi | The date pickers and number formats are different elements from the page element carrying the language attribute. |
| 10 | When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match. | single | The row highlights its own background. |
| 11 | When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change. | single | The ticker cell flashes its own background. |
| 12 | When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element) | multi | The layout nudge mutates content elements elsewhere in the app, not the injected node. |
| 13 | When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element) | multi | The page heading announced is a different element from the step indicator. |
| 14 | When a carousel slide gains the active class, its caption text fades in while the previous caption hides. | multi | Hiding the previous caption mutates the previous slide's element, not the newly active slide. |
| 15 | When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article. | single | The ad container collapses itself so no gap remains. |
| 16 | When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element) | multi | The navigation components swapped are different elements from the root carrying the breakpoint attribute. |
| 17 | When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice. | single | The flagged comment collapses itself into the removed-content notice. |
| 18 | When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order. | single | The table rewrites the numbers of its own rows after its own rows are reordered. |
| 19 | When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant. | single | The hero element swaps to its own matching variant. |
| 20 | When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye. | single | The eye icon is the password field's own visibility toggle. |
| 21 | When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading. | single | The image fades itself in once its own source finishes loading. |
| 22 | When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element) | multi | The queued enhancements initialize on various UI elements across the page, not on the element carrying the ready attribute. |

# 9. Resize & viewport

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one. | single | The chart grid reflows its own columns on the window resize trigger. |
| 2 | When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element) | single | The player expands itself on the global orientation trigger. |
| 3 | When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold. | multi | The code editor and its minimap are different elements from the dragged sidebar. |
| 4 | When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions. | single | The chart redraws its own canvas when its own container resizes. |
| 5 | When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed. | single | The game canvas scales itself on the window resize trigger. |
| 6 | When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element) | multi | The character counter repositioned is a separate element tracked beneath the textarea. |
| 7 | When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size. | single | The gallery container adds columns within its own layout. |
| 8 | When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element) | single | The sticky submit button keeps itself visible on the viewport resize trigger. |
| 9 | When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element) | single | The map recenters its own view when its own element is resized. |
| 10 | When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width. | single | The split view constrains the widths of its own two panes. |
| 11 | When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow. | single | The kiosk layout switches its own flow on the orientation trigger. |
| 12 | A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte) | single | The badge swaps its own label for an icon based on its own width. |

# 10. Scroll

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element) | single | The progress bar fills itself from document scroll metrics, with the attribute living on the bar itself. |
| 2 | When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element) | multi | The accept button enabled is a different element from the scrolled terms document. |
| 3 | When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element) | multi | The book-a-tour bar is a separate element, and the chain must read the hero element's position. |
| 4 | When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element) | single | The back-to-top pill shows and hides itself from the window scroll position. |
| 5 | When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping. | single | The chat window prepends earlier history into itself and holds its own scroll position. |
| 6 | When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible. | single | The spreadsheet freezes its own first column during its own horizontal scroll. |
| 7 | When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card. | single | The carousel row snaps its own scroll position to center its own nearest card. |
| 8 | When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element) | multi | The jump-to-current-line button is a separate element from the lyrics scroller. |
| 9 | When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll. | single | The top navigation collapses and expands itself on the window scroll trigger. |
| 10 | When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element) | multi | The explanation pane scrolled in sync is a different element from the code panel. |
| 11 | While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element) | multi | Locking scroll writes to the page body behind the modal, a different element. |
| 12 | When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element) | multi | The corner label must read the chapter headings, which are different elements, to update itself. |

# 11. Animation & transition

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds. | single | The toast starts its own dismiss timer when its own slide-in ends. |
| 2 | When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely. | single | The modal removes itself once its own fade-out completes. |
| 3 | When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element) | multi | The real content swapped in is a separate element from the skeleton shimmer. |
| 4 | When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element) | multi | The share-your-certificate buttons are separate elements from the confetti element. |
| 5 | When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element) | single | Focus moves to the drawer's own first link after the drawer's own transition ends. |
| 6 | When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space. | single | The spinner's own slot swaps to the error card in place. |
| 7 | When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again. | single | The heart-burst overlay removes itself. |
| 8 | When a price change flash animation finishes in a trading app, the row settles back to its neutral background color. | single | The trading row settles its own background back to neutral. |
| 9 | When a badge's pulse animation completes three iterations, it stops so it does not distract from reading. | single | The badge stops its own pulse animation. |
| 10 | When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element) | single | Focus moves to the incoming step's own first field after the step's own transition ends. |
| 11 | When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte) | single | The list item removes itself when its own exit transition finishes. |

# 12. Navigation & history

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element) | multi | The previous video and the outline are different elements from the view handling the route change. |
| 2 | When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history. | single | The search panel restores its own filter controls from history state. |
| 3 | When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element) | single | The heading matching the hash highlights itself on the global hashchange trigger. |
| 4 | When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost. | single | The stay-or-leave prompt is a native dialog, not another DOM element. |
| 5 | When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element) | multi | The page title and social meta tags are different elements from the changed view content. |
| 6 | When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values. | single | Each price display on the trading page refreshes itself on the pageshow trigger. |
| 7 | When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads. | single | The deep-linked settings tab activates itself and loads its own content. |
| 8 | When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element) | multi | The cart badge reset is a separate header element from the confirmation page content. |
| 9 | When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element) | single | The step indicator updates itself to match the URL on the history trigger. |
| 10 | When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element) | single | The lightbox closes itself on the back-navigation trigger. |
| 11 | When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element) | multi | Every date and currency display across the page is a different element from the locale source in the URL. |

# 13. Window/document lifecycle

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element) | multi | The above-the-fold images and the deferred comments module are multiple separate elements. |
| 2 | When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element) | multi | The paused preview and the away indicator land on different elements, the preview video and the tile. |
| 3 | When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll. | single | The score displays refresh themselves on the visibilitychange trigger. |
| 4 | When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element) | multi | The offline banner is a separate element from the form being filled. |
| 5 | When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element) | multi | The offline banner dismissed is a separate element; sending queued messages is a network action. |
| 6 | When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave. | single | The stay-or-leave prompt is a native browser dialog, not another DOM element. |
| 7 | When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element) | single | The cart count element re-syncs its own text from the server. |
| 8 | When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background. | single | Pausing the game loop is a state change within the game element itself. |
| 9 | When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content. | single | The kiosk page reloads its own content. |
| 10 | When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text. | single | Each headline re-measures itself on the global font-load trigger. |

# 14. Fullscreen

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly. | single | The player fills the screen and shows its own exit hint; the fullscreen button is part of the same player element. |
| 2 | When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element) | multi | The thumbnail strip and captions are separate elements from the fullscreened slideshow image. |
| 3 | When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity. | single | The deck hides its own slide navigation hints. |
| 4 | When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead. | multi | The fallback modal is a different element from the embedded map's expand button. |
| 5 | When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element) | single | The site header hides itself on the global fullscreenchange trigger. |
| 6 | When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element) | single | The player returns itself to its inline position on the orientation trigger. |
| 7 | When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element) | single | The control hints are the game canvas widget's own overlays. |

# 15. State store reactivity

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation. | single | The cart icon animates its own badge on the store trigger. |
| 2 | When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu. | single | The header swaps its own sign-in link for its own avatar menu. |
| 3 | When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted. | single | Each price element re-renders itself on the currency store trigger. |
| 4 | When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter. | multi | The bell icon's dot and the browser tab title are two different elements updated by one behavior. |
| 5 | When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates. | multi | The stock's row and the portfolio total are two different elements updated by one store change. |
| 6 | When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it. | single | The main content area widens itself and its own charts resize to fill it. |
| 7 | When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically. | single | The waiting room board removes the initials from its own content. |
| 8 | When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork. | single | The now-playing bar updates its own title, artist, and artwork. |
| 9 | When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element) | multi | The results grid and its count display are separate elements reacting to the removed filter chip's store change. |
| 10 | When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note. | single | Each form disables its own submit button on the online-flag store trigger. |
| 11 | When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager. | single | The upgrade banner reveals itself on the quota store trigger. |
| 12 | When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element) | multi | Every table across the admin must reload, spanning multiple distinct table components. |
| 13 | When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen. | single | The certificate button unlocks itself on the score store trigger. |
| 14 | When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document. | single | The browser tab title element updates its own text on the store trigger. |
| 15 | When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors. | multi | The root element's theme attribute flips and the separate chart elements recolor, two distinct mutation targets. |
| 16 | When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately. | single | Muting is an audio-state change, not a mutation of another DOM element. |
| 17 | When every step completion flag in a multi-step application reads true, the review and submit section enables. | single | The review-and-submit section enables itself on the store trigger. |
| 18 | When a bid raises the store's current highest bid, all watching clients see the price and countdown change together. | single | The bid panel updates its own price and countdown. |
| 19 | When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it. | single | The device tile dims itself and shows its own reconnect option. |
| 20 | When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it. | single | The drafts badge syncs its own count. |
| 21 | A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue) | multi | The greeting element must react to changes in the separate first-name and last-name field elements. |
| 22 | A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element) | multi | The buttons' chains must reach the modal element through the shared open state, coordinating across elements. |
| 23 | When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React) | single | Each formatted date re-renders itself on the locale store trigger. |
| 24 | A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte) | single | The clock label updates its own text once per second. |

# 16. Element connect

| # | Use case | Classification | Reason |
|---|----------|----------------|--------|
| 1 | When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned. | single | The ad slot requests and renders its own creative. |
| 2 | When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading. | single | The avatar upgrades its own placeholder to the photo. |
| 3 | When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element) | single | The code block highlights its own content and grows its own copy button. |
| 4 | When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates. | single | The timestamp renders and updates its own relative label. |
| 5 | When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in. | single | The chart measures its own box and draws its own initial frame. |
| 6 | When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element) | multi | The accessible description must be wired to the separate tooltip element referenced by the trigger. |
| 7 | When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element) | multi | Loading the map script inserts a script element outside the map element itself. |
| 8 | When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress. | single | The video restores its own playback position. |
| 9 | When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js) | single | The cloaked element removes its own cloak attribute. |
| 10 | When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars. | single | The star rating renders its own stars from its own data attributes. |
| 11 | When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React) | single | The poll widget opens and tears down its own socket; no other element mutates. |
| 12 | When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance. | single | The editor lazy-loads the library for its own instance. |
| 13 | When a counter element with a target value is inserted, it reads the target and starts counting up toward it. | single | The counter counts up its own displayed value. |
| 14 | When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen. | single | The consent banner removes itself. |
| 15 | When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value. | single | The progress ring animates its own arc. |

## Summary

- Total use cases: 271
- Single-element: 172 (63%)
- Multi-element: 99 (37%)
