# Step 1 — English Use Cases

Real-world interaction use cases for a declarative HTML attribute framework, grouped by trigger category. Each entry describes what starts the behavior and what should happen as a result.

# 1. Click & pointer interactions

- A user clicks a row in a banking transaction list and the row expands inline to reveal merchant details and the full payment reference.
- A user double-clicks a cell in a budgeting spreadsheet and the cell switches into edit mode with its current value highlighted.
- A user right-clicks a file in a cloud storage manager and a custom menu opens at the pointer with rename, share, and delete actions.
- A user clicks anywhere outside an open profile menu and the menu closes while focus returns to the avatar button that opened it.
- A shopper clicks outside an open cart drawer in a marketplace and the drawer slides closed without losing the items inside it.
- A long press on a conversation row in a mobile messaging app enters multi-select mode so several chats can be archived together.
- A home buyer clicks the heart on a property card and the heart fills in while the listing is saved to their favorites collection.
- A collector clicks the load more button under an auction watchlist and the next batch of lots appends with their current bids.
- A single click on a track in a music queue selects it, while a double click starts playing it immediately.
- A visitor clicks a thumbnail in a hotel gallery and the main photo swaps to that shot with its caption updated. (cross-element)
- A document-level click listener in a design tool closes every open floating panel when the click lands on the bare canvas. (cross-element)
- A traveler taps a map pin on a booking site and a card pops up showing the property name, nightly price, and rating. (cross-element)
- A user right-clicks a chat message and a row of reaction emoji appears anchored just above the message bubble. (cross-element)
- A quick tap on a smart home light tile toggles the light, while a long press expands the tile into brightness and color controls.
- An auditor clicks a column header in an audit-log table and the rows re-sort with an arrow showing the new sort direction.
- A passenger clicks a seat on an airline seat map and it highlights while its price appears in the booking summary panel. (cross-element)
- A user double-clicks a node in a network topology diagram and the canvas zooms smoothly into that node's neighborhood.
- A user clicks a copy invite link button in a team admin page and the label briefly reads copied as confirmation feedback.
- A user clicks the header of an already open accordion section in a tax FAQ and the section collapses again.
- A shopper clicks zoom on a product photo and a magnifier lens follows the pointer across the image until the pointer leaves.
- A user double taps a photo in a social feed and a large heart bursts over the image while its like count rises.
- A reviewer right-clicks a line in a code diff viewer and a menu offers to copy the line link or view its history.
- A user clicks the upvote arrow on a forum answer and the score increments instantly while the arrow turns orange.
- A middle click on a terminal tab in a developer tool closes that session along with its running process.
- A user clicks a fraud alert banner in a banking app and it expands to explain exactly which transaction was flagged and why.
- A student taps an answer option in a quiz and it marks itself selected before revealing whether the choice was correct.
- A guest clicks a date cell in a booking calendar and the cell gets a selected ring while the check-in field fills in. (cross-element)
- A document-wide listener behind a payment modal absorbs stray clicks on the dimmed background so the modal cannot close accidentally. (cross-element)
- A payment button processes the first click and ignores all further clicks so an order is never submitted twice. (seen in: Vue)

# 2. Keyboard interaction

- A user presses Escape while a modal is open in a patient portal and the modal closes with focus restored to the button that opened it.
- A user presses Ctrl and K anywhere on a documentation site and a command palette opens with its search field already focused. (cross-element)
- Pressing Enter in a chat composer sends the message, while Shift and Enter together insert a plain newline instead.
- A user presses the down arrow while an autocomplete list is open and the highlight moves to the next suggestion without the mouse.
- Pressing Tab in a spreadsheet moves the active cell one column to the right, while Shift and Tab move it back.
- A reader presses J in a feed reader to jump to the next unread article and K to return to the previous one. (cross-element)
- A user presses the slash key on a repository page in a code hosting site and focus jumps straight into the file search box. (cross-element)
- Holding Shift while pressing arrow keys in a rich text editor extends the selection one character or one line at a time.
- A user presses Ctrl and Enter inside a support ticket reply and the reply submits without anyone reaching for the mouse.
- Pressing Escape mid-drag on a kanban board cancels the move and the card snaps back to its original column.
- A designer presses Ctrl and Z to undo the last canvas action, and Ctrl Shift and Z together to redo it.
- Arrow keys move a photo carousel to the previous or next slide, while Home and End jump straight to the first or last.
- A user presses the spacebar while a telehealth video has focus and playback toggles between play and pause.
- A user presses the question mark key on an analytics dashboard and a shortcut cheat sheet overlay opens over the page. (cross-element)
- A user presses Ctrl and S while editing a permit application and a draft saves locally instead of the browser save dialog opening.
- Pressing Delete with several emails selected in a mail client moves all of them to the trash in one action.
- A document-level key listener in a video call toggles the microphone when M is pressed and updates the mic icon accordingly. (cross-element)
- Pressing Tab inside a modal cycles focus through only its own controls so focus never escapes to the page behind it.
- A patient answers an intake questionnaire by pressing number keys one through nine to pick a severity rating quickly.
- A user presses Enter while a dropdown item is highlighted and the item's action fires before the menu closes.
- A terminal in a developer tool treats Ctrl and C as copy only when text is selected, and as an interrupt signal otherwise.
- A global keydown listener in a game lobby starts matchmaking when Enter is pressed, no matter which element currently has focus. (seen in: Svelte)
- In a music step sequencer, Ctrl plus arrow keys moves the note cursor between beats while plain arrows move between tracks.

# 3. Form & input

- As a shopper types a username during signup, an availability check runs after each short pause and shows a tick or a taken warning beside the field.
- A nurse typing in a patient search box sees results filter only after typing pauses briefly, so the server is not hit on every keystroke. (seen in: Alpine.js)
- When the email field loses focus in a checkout form, its format is validated and an inline error appears beneath the field.
- Changing the country select in a shipping form swaps the region field from free text into a dropdown of provinces. (cross-element)
- As a user types a new password, a strength meter under the field updates and lists which requirements are still missing.
- Selecting other in a complaint-reason dropdown on a government form reveals a details textarea that becomes required. (cross-element)
- A user pastes a sixteen digit card number into a payment field and it is reformatted with spaces every four digits automatically.
- Typing in a chat composer publishes a typing indicator to the other participant's conversation header after a short delay. (cross-element)
- Editing a budget cell in a personal finance spreadsheet recalculates the monthly total and redraws the spending chart instantly. (cross-element)
- Entering a birth date under eighteen on a patient intake form reveals a guardian consent section that must be completed. (cross-element)
- Pressing reset on a property search panel returns every filter control to its default and refreshes the results list. (cross-element)
- Submitting a login form disables the button and shows a spinner so a second tap cannot send the credentials twice.
- Typing a quantity above available stock in a wholesale order form turns the field border red and shows an inline stock warning.
- Blurring a required field that was left empty shows a gentle inline error that clears itself once valid input arrives.
- Each keystroke in a flight search city field filters its own dropdown of matching airports with codes and cities.
- Ticking the billing same as shipping checkbox collapses the billing fields and keeps their values synced behind the scenes. (cross-element)
- Typing a promo code validates it on the fly and shows the applied discount inline beside the field.
- Picking a start date in a booking form pushes the end date picker's minimum allowed date to the following day. (cross-element)
- A character counter under a social post composer counts down while typing and turns red in the final stretch.
- Ticking the terms checkbox in a loan application enables the previously disabled submit button immediately. (cross-element)
- Dragging the down payment slider in a mortgage tool updates the monthly payment estimate and total interest figures live. (cross-element)
- Editing a field in a pipeline config form marks it dirty and adds an unsaved changes dot beside its label.
- Selecting an oversized file in a medical records upload immediately replaces the chosen file name with a size limit error.
- A tax form formats a social security number into dashed digit groups as the user types each number.
- Toggling the select all checkbox in an admin bulk actions table checks or clears every visible row checkbox at once. (cross-element)
- Typing a hash character in a caption field opens its own tag suggestion list that filters as typing continues.
- Changing the device type select in a smart home pairing form swaps the instruction panel to steps for that device. (cross-element)
- A slider and a number input in a photo filter tool stay perfectly in sync because both write to the same underlying value. (seen in: Vue)
- Every control in an enterprise permissions form validates as one group so the save button stays disabled until all rules pass. (seen in: Angular)

# 4. Media playback

- When a lecture video in an online course ends, the next lesson button pulses and the course progress bar advances. (cross-element)
- A user presses play on a podcast episode and the mini player at the bottom updates with the episode title and artwork. (cross-element)
- When a music track pauses because a phone call arrives, the player remembers the position and shows a resume prompt afterwards.
- As a video buffers during a telehealth session, a spinner overlay appears on the player and disappears once playback resumes.
- When a workout video reaches its last ten percent, a rate-this-workout prompt slides up over the player corner.
- A user drags the volume slider in a streaming radio app and its fill and speaker glyph reflect the new level immediately.
- When playback time passes a quiz checkpoint in an e-learning module, the video pauses itself and a question overlay appears. (cross-element)
- When an audio guide clip finishes in a museum web app, the card for the next exhibit highlights on the page. (cross-element)
- A karaoke-style lyric line highlights in sync as the song's playback time passes each timestamped line.
- When the user pauses a product demo video, a chapter list appears so they can jump to a specific feature.
- When a live auction's video stream stalls, a reconnecting banner shows and the bid buttons temporarily disable. (cross-element)
- When a story video finishes in a social app, the player advances itself to the next friend's story.
- Starting playback of a meditation track gradually dims the whole app background toward a calm dark theme. (cross-element)
- While the user scrubs the seek bar of a recorded webinar, a thumbnail preview of the target frame follows the pointer.
- When a language-learning audio clip ends, the record-your-voice button enables for the pronunciation exercise. (cross-element)

# 5. Drag & drop / clipboard

- A user drags a task card from backlog to in progress on a kanban board and the card's new status saves on drop.
- A user drags an image file over the avatar area on a profile page and a dashed highlight border signals the drop target is active.
- When a user drops a PDF onto a tax document upload zone, a progress bar fills inside the zone until the upload completes.
- A user reorders songs in a playlist by dragging a row to a new position and the track numbers update instantly.
- Dragging a widget in a smart home dashboard shows ghost placeholders where it can land, and the grid reflows on drop.
- A user copies an API key from a developer settings page and a toast confirms the key is now on the clipboard. (cross-element)
- When a user pastes a list of email addresses into an invite field, they are split into individual removable chips.
- When a user drags a patient from a waitlist onto an open appointment slot, the slot fills and an undo option appears. (cross-element)
- Dragging a product image into a comparison tray increments the tray badge and adds the item thumbnail. (cross-element)
- A user copies a code block from documentation using its copy button and the button shows a brief checkmark as feedback.
- When a dragged file leaves the browser window without dropping, the full-page drop overlay hides itself again. (cross-element)
- A user drags a layer in a design tool's layer panel and the canvas re-renders with the new stacking order. (cross-element)
- When a user pastes a URL into a chat composer, a link preview card is fetched and attached below the draft. (cross-element)
- A user drags a stop in a route planner list to reorder it and the itinerary distances recalculate immediately.
- A user pastes a one-time code into a six box verification input and each digit lands in its own box.
- A user cuts text in a note-taking app and the formatting toolbar's paste option becomes enabled. (cross-element)

# 6. Focus & selection

- When a search input gains focus in a help center, a panel of suggested articles expands beneath it. (cross-element)
- When focus moves into a megamenu trigger in a government services header, the panel opens with its first link ready for arrow keys. (cross-element)
- When a user selects text in a news article, a floating toolbar appears offering highlight, copy, and share actions. (cross-element)
- When a screen reader user tabs into a date picker, the picker announces the keyboard controls available inside it.
- When the user selects a range of cells in a spreadsheet, the status bar shows the sum and average of the selection. (cross-element)
- When a text field in a translation tool gains focus, the on-screen keyboard layout switches to the target language. (cross-element)
- When a user blurs out of a coupon field, the value is trimmed and uppercased before validation runs.
- When keyboard focus enters a card in a property listings grid, a visible focus ring and quick actions appear on the card.
- When a user selects a portion of a waveform in a podcast editor, the cut and fade buttons become enabled. (cross-element)
- When the selection in a rich text editor collapses to a caret, the block format dropdown resets to the current paragraph style. (cross-element)
- When the first box of a one-time code input gains focus, the input announces the expected code length to screen readers.
- When a user tabs away from an edited settings field without saving, an unsaved changes dot appears on the field's label.
- A focus ring class is added only when focus arrives via keyboard, so mouse clicks skip the ring entirely. (seen in: Angular)
- When focus leaves the last field of an address group in a checkout form, the whole group validates together before shipping options load. (cross-element)

# 7. Visibility & intersection

- When a product image card scrolls into view on a marketplace page, its real image swaps in to replace the lightweight placeholder.
- When the sentinel row near the bottom of an order history list becomes visible, the list container fetches and appends the next page. (cross-element)
- When a statistics section of a nonprofit landing page scrolls into view, its counters animate from zero to their final values.
- When a section of a long-form article reaches the middle of the viewport, the matching entry in the table of contents highlights. (cross-element)
- When a video in a social feed scrolls at least halfway into view it autoplays muted, and pauses again when it leaves.
- When an ad slot in a news page has been at least half visible for one second, an impression is recorded for viewability billing.
- When a chart in a health vitals dashboard enters the viewport, it fetches live sensor data and starts its refresh cycle.
- When a step in an onboarding walkthrough becomes visible on a small screen, its dot in the progress rail activates. (cross-element)
- When a property card scrolls into the visible area of a map-and-list view, its matching map pin enlarges. (cross-element)
- When a review section becomes visible on a hotel booking page, review scores lazy-load so the initial page stays fast.
- When the last slide of a pricing comparison becomes fully visible, its best value badge animates into place.
- When a comments section is about to enter the viewport on a forum thread, its content starts loading in the background.
- When a hero banner scrolls more than halfway out of view, a compact sticky version of it appears at the top of the page. (cross-element)
- When a job listing card stays visible for a few seconds in search results, it is logged as a seen impression for ranking.
- When the end of a consent document becomes visible inside its scroll box, the accept button outside the box enables. (cross-element)
- When the unread divider scrolls into view in a chat history, the messages below it are marked read on the server. (cross-element)
- When a building floor plan scrolls into view on a venue page, its entrance labels fade in one by one.
- When a donor impact section enters the viewport on a charity site, its animated infographic plays exactly once.
- A card fades and slides up the first time it enters the viewport, then never animates again on later passes. (seen in: Svelte)
- When a seller's other listings strip enters the viewport on a marketplace page, its images lazy-load in a single batch.
- When the player at the bottom of a long recipe page leaves the viewport, a mini player docks itself in the corner. (cross-element)

# 8. Attribute & DOM mutation

- When a menu button's expanded-state attribute flips to true, the chevron icon inside it rotates to point upward.
- When the root element's theme attribute switches to dark, every chart on the analytics page re-renders with dark colors. (cross-element)
- When a badge's text content changes to a new unread count, the badge briefly pulses to catch the user's eye.
- When a third-party chat widget injects its launcher button into the page, the site's own help link hides to avoid overlap. (cross-element)
- When a screen-reader live region gains new text, the region announces it without moving keyboard focus anywhere.
- When the disabled attribute is removed from a submit button after validation passes, the button animates to its enabled color.
- When a video player's state attribute changes to buffering anywhere in a course page, a global spinner appears. (cross-element)
- When an error class is added to any field in a long form, a summary banner lists every field that needs attention. (cross-element)
- When the language attribute on the page changes, date pickers and number formats re-render using the new locale rules. (cross-element)
- When a row's selected-state attribute becomes true in a permission matrix table, the row background highlights to match.
- When the content of a stock ticker cell changes, the cell flashes green or red depending on the direction of the change.
- When a browser extension injects a node into a reading app, the app's layout observer nudges content so nothing overlaps. (cross-element)
- When a step indicator's current-step attribute moves in a government form, the page heading announces the new step name. (cross-element)
- When a carousel slide gains the active class, its caption text fades in while the previous caption hides.
- When an ad blocker strips the creative from an ad container, the container collapses itself so no empty gap remains in the article.
- When the root element's breakpoint attribute changes from mobile to desktop, the navigation swaps between drawer and menubar. (cross-element)
- When a moderation system adds a hidden class to a flagged comment, the comment collapses into a small removed-content notice.
- When a sorting library reorders table rows in the DOM, the row numbers rewrite themselves to match the new order.
- When an A/B testing script sets an experiment attribute on the hero element, the hero swaps to the matching variant.
- When a password field's type attribute toggles between password and text, its visibility icon swaps between open and closed eye.
- When a lazy-loaded image element gains its real source attribute, it fades in once the file actually finishes loading.
- When a third-party script finishes and sets a ready attribute on the page, queued UI enhancements initialize in order. (cross-element)

# 9. Resize & viewport

- When the browser window narrows below tablet width in a trading dashboard, the chart grid reflows from three columns to one.
- When a phone rotates from portrait to landscape during a video lesson, the player expands to fill the new orientation. (cross-element)
- When the sidebar in a developer console is dragged wider, the code editor shrinks and its minimap hides below a threshold.
- When a chart container in a vitals dashboard is resized by a layout change, the chart redraws to fit its new dimensions.
- When a user resizes the window during a game lobby, the canvas scales so the playfield keeps its aspect ratio letterboxed.
- When a feedback textarea is manually dragged taller, its character counter repositions to stay tucked beneath it. (cross-element)
- When an image gallery's container grows wider, extra columns appear so thumbnails keep a comfortable minimum size.
- When the viewport height shrinks with an on-screen keyboard open, the sticky submit button in a mobile form stays visible. (cross-element)
- When an embedded store locator map is resized, the map recenters so the selected store stays in view. (cross-element)
- When the divider in a document-and-comments split view is dragged, each side stops at a sensible minimum width.
- When a museum check-in kiosk rotates to portrait, its layout switches to a stacked single-column flow.
- A badge reads its own width as it changes and swaps its full label text for a compact icon when space runs out. (seen in: Svelte)

# 10. Scroll

- As a user scrolls a long article, a progress bar at the top of the page fills in proportion to reading depth. (cross-element)
- When a user scrolls to the end of a terms document in an account opening flow, the accept button becomes enabled. (cross-element)
- When the page scrolls past the hero in a real estate listing, a compact book-a-tour bar pins to the top of the screen. (cross-element)
- When a user scrolls quickly upward in a social feed, a back-to-top pill appears and hides again near the top. (cross-element)
- When a chat window scrolls to its oldest loaded message, earlier history is fetched and prepended without the position jumping.
- When a user scrolls a spreadsheet horizontally, the first column stays frozen so row labels remain visible.
- When scrolling pauses on a product carousel row, the scroll position snaps to center the nearest product card.
- When a user scrolls a lyrics page during a song, auto-follow pauses until a jump-to-current-line button is pressed. (cross-element)
- When the user scrolls down a news site, the top navigation collapses to a slim bar and expands again on upward scroll.
- When a tutorial's code panel scrolls, the matching explanation pane scrolls in sync to the relevant section. (cross-element)
- While a user scrolls inside a modal in a banking app, the page behind it stays locked and does not scroll. (cross-element)
- When the scroll position passes each chapter heading in an annual report, the chapter label in the corner updates. (cross-element)

# 11. Animation & transition

- When a toast notification's slide-in animation ends, a timer starts that will dismiss it after a few seconds.
- When a modal's fade-out transition completes in a photo gallery, the modal element is removed from the page entirely.
- When a skeleton shimmer's animation completes another iteration after data arrived, the real content swaps in. (cross-element)
- When a confetti animation celebrating a completed course ends, the share-your-certificate buttons fade in. (cross-element)
- When a drawer menu's slide-open transition finishes, focus moves to the first link inside it for keyboard users. (cross-element)
- When a spinner's animation is cancelled because a request failed, an error card replaces it in the same space.
- When a heart burst animation on a liked post ends, the overlay element cleans itself up so taps pass through again.
- When a price change flash animation finishes in a trading app, the row settles back to its neutral background color.
- When a badge's pulse animation completes three iterations, it stops so it does not distract from reading.
- When the transition between steps in an application form ends, the new step's first field receives focus. (cross-element)
- When an element's exit transition finishes in a list, its data is finally removed and the list item disappears. (seen in: Svelte)

# 12. Navigation & history

- When the route changes to a new lesson in a course app, the previous video stops and the outline scrolls to the new item. (cross-element)
- When a user presses the browser back button with filters applied in a property search, the previous filter state is restored from history.
- When the URL hash changes to a section id on a documentation page, that heading briefly highlights so the user spots it. (cross-element)
- When a user tries to navigate away from an unsaved intake form, a confirm dialog warns that entered patient data will be lost.
- When a music app changes from album view to artist view, the page title and social preview metadata update. (cross-element)
- When a user returns to a trading page through the back-forward cache, its prices refresh immediately to current values.
- When a deep link opens a specific settings tab in an admin console, that tab activates and its content loads.
- When the route changes to the confirmation page after checkout, the cart badge in the header resets to zero. (cross-element)
- When history state changes in a multi-step booking flow, the step indicator updates to match the step named in the URL. (cross-element)
- When a back navigation targets a lightbox photo, the lightbox closes instead of navigating the whole page. (cross-element)
- When a user opens the site through a locale prefix in the URL, all date and currency formats switch to that locale. (cross-element)

# 13. Window/document lifecycle

- When the page finishes loading on a news site, above-the-fold images get priority and the deferred comments module starts loading. (cross-element)
- When the user switches to another tab during a video call, the local preview pauses and the tile shows an away indicator. (cross-element)
- When the tab becomes visible again in a live scores app, the scores refresh immediately instead of waiting for the next poll.
- When the browser goes offline during form entry in a field inspection app, a banner appears and submissions queue locally. (cross-element)
- When the connection returns in a chat app, queued messages send in order and the offline banner slides away. (cross-element)
- When the page is about to unload with an unsaved document open in an editor, a native prompt asks the user to stay or leave.
- When a page restored from the back-forward cache shows a stale cart count, the count re-syncs from the server. (cross-element)
- When the tab is hidden in a browser game, the game loop pauses so timers and physics stop running in the background.
- When a kiosk page has been idle and visible for hours, a scheduled overnight reload refreshes its content.
- When document fonts finish loading in a typography-heavy magazine layout, headlines re-measure to avoid clipped text.

# 14. Fullscreen

- When a user clicks the fullscreen button on a lecture video, the player fills the screen and an exit hint appears briefly.
- When the user exits fullscreen in a photo slideshow, the thumbnail strip and captions return beneath the image. (cross-element)
- When a presentation deck enters fullscreen, its slide navigation hints hide after a few seconds of pointer inactivity.
- When fullscreen is denied by the browser for an embedded map, the expand button falls back to opening a larger modal instead.
- When any element on the page enters fullscreen, the site header hides so it cannot overlap the immersive view. (cross-element)
- When a mobile user exits fullscreen video by rotating the phone upright, the player returns to its inline position in the article. (cross-element)
- When a game canvas enters fullscreen, its on-screen control hints resize for the larger display area. (cross-element)

# 15. State store reactivity

- When the cart count in the shared store increases, the cart icon in the header bumps with a badge animation.
- When the logged-in flag flips to true after an OAuth return, the header swaps the sign-in link for an avatar menu.
- When the selected currency changes in the store, every price on the storefront re-renders converted and re-formatted.
- When the unread notification count drops to zero, the bell icon's dot disappears and the tab title clears its counter.
- When a watchlisted stock's price updates in the store, its row flashes and the portfolio total recalculates.
- When the sidebar-collapsed flag toggles in the store, the main content area widens and its charts resize to fill it.
- When a patient is marked checked in at the front desk, the waiting room board removes their initials automatically.
- When the current track in a music player store changes, the now-playing bar updates its title, artist, and artwork.
- When a filter chip is removed and the store's active filter list shrinks, the results grid re-fetches and its count updates. (cross-element)
- When the store's online flag flips to false, every form on the page disables its submit button with a reconnecting note.
- When the remaining storage quota drops below ten percent, an upgrade banner appears across the file manager.
- When the active workspace switches in an enterprise admin, every table reloads with that workspace's permissions and data. (cross-element)
- When the quiz score in the store passes the passing threshold, the certificate button unlocks on the summary screen.
- When a teammate edits a shared document's title, the browser tab title updates for everyone viewing the document.
- When the theme preference in the store changes, the root element's theme attribute flips and every chart recolors.
- When the audio-muted preference toggles in a game settings store, every sound effect in the session respects it immediately.
- When every step completion flag in a multi-step application reads true, the review and submit section enables.
- When a bid raises the store's current highest bid, all watching clients see the price and countdown change together.
- When a device in a smart home store reports offline, its tile dims and a reconnect option appears on it.
- When the drafts count changes in an email client's store, the drafts folder badge in the sidebar syncs to it.
- A greeting that shows a full name updates everywhere it appears whenever the first or last name fields change. (seen in: Vue)
- A global open-state property drives a modal so any button anywhere in the app can open or close it. (seen in: Alpine.js) (cross-element)
- When the locale value changes at the top of the app tree, every formatted date across the dashboard re-renders. (seen in: React)
- A live clock label ticks once per second for exactly as long as its dashboard widget stays on screen. (seen in: Svelte)

# 16. Element connect

- When an ad slot element is first inserted into the page, it requests its creative exactly once even if it is later re-positioned.
- When an avatar element mounts, it upgrades its initials placeholder to the real photo once the image finishes loading.
- When a code block element appears in documentation, it registers for syntax highlighting and grows a copy button. (cross-element)
- When a timestamp element with a raw date mounts, it renders a relative label like five minutes ago and schedules its own updates.
- When a chart element is first inserted, it measures its container and draws an initial frame before live data streams in.
- When a tooltip trigger element mounts, it wires up its accessible description so screen readers announce the tip. (cross-element)
- When a map element mounts on a store locator page, it loads the heavy map script only now, keeping other pages light. (cross-element)
- When a video element is inserted into a lesson page, it restores the viewer's last playback position from saved progress.
- When a framework processes an element carrying a cloak attribute at startup, the cloak is removed and the content appears. (seen in: Alpine.js)
- When a star rating web component upgrades, it reads its data attributes and renders the right number of filled stars.
- When a live poll widget mounts in a stream overlay it opens its socket, and it tears the socket down when removed. (seen in: React)
- When an editor element mounts inside a comment form, it lazy-loads the heavy editor library only for that instance.
- When a counter element with a target value is inserted, it reads the target and starts counting up toward it.
- When a consent banner mounts and a stored decision already exists, it removes itself immediately without flashing on screen.
- When a progress ring element connects, it reads its percentage attribute and animates the arc out to that value.
