# 1. Click & pointer interactions

A user clicks the "Add to Cart" button on an e-commerce product page to trigger a confetti animation confirming the action.

Clicking the overlay behind a modal dialog dismisses the modal and returns the user to the underlying dashboard (cross-element).

Clicking a table header in a financial data grid toggles the sorting direction of the rows below (cross-element).

Double-clicking a cell in a spreadsheet application transforms the static text into an editable text input field.

Right-clicking a message in a chat application opens a context menu with options to reply, copy, or delete.

Clicking anywhere outside a custom dropdown menu in a navigation bar causes the dropdown to close (cross-element) (seen in: Alpine.js).

Touching and holding an image in a mobile-optimized gallery reveals a tooltip showing the photographer's details.

A click on a global document listener tracking user activity resets the idle timeout counter for a banking session (cross-element).

A user clicks a specific star icon in a five-star rating component to set the review score to that value.

Hovering a mouse pointer over a data point on a line chart displays a floating tooltip with the exact metric value (cross-element).

Tapping a toggle switch in a settings panel immediately updates the user's preference for dark mode.

A long-press on a map pin in a ride-sharing app brings up a detailed card about the driver's location.

# 2. Keyboard interaction

Pressing the Escape key while a lightbox gallery is open closes the lightbox and returns focus to the thumbnail (cross-element).

Pressing the Enter key while focused on a password input field submits the login form (cross-element).

Holding down the Shift key and clicking multiple emails in an inbox selects a contiguous range of messages.

Pressing Command and K simultaneously opens a global command palette overlay over the current documentation page (cross-element).

Using the Up and Down arrow keys navigates through the suggested options in an autocomplete dropdown.

Pressing the Spacebar while a video player is focused toggles the playback state between play and pause.

Pressing Tab repeatedly moves the focus outline sequentially through all the interactive buttons in a checkout wizard.

Typing any alphabetical key while viewing a long contact list immediately jumps the viewport to names starting with that letter (cross-element).

Pressing the Delete key removes the currently selected geometric shape from a vector design canvas.

A document-level listener intercepts the Control and S shortcut to save the current text document instead of opening the browser save dialog (cross-element).

Hitting the slash key immediately focuses the main search input field on a crowded e-commerce site (cross-element) (seen in: React).

# 3. Form & input

Typing into a search input immediately filters a list of displayed products below it without requiring a submit button click (cross-element).

As a user types into a username registration field, a debounced check verifies availability against a backend database (seen in: Alpine.js).

Clearing the text from a required email field immediately displays a red validation error message below the input (cross-element).

Selecting a new country from a shipping address dropdown populates the adjacent state dropdown with relevant regions (cross-element).

Submitting a contact form replaces the input fields with a friendly success message thanking the user.

Ticking a "billing same as shipping" checkbox copies all text from the shipping fields into the disabled billing fields (cross-element).

Blurring an input field after entering an invalid date format automatically highlights the input border in red.

Moving the slider on a price range filter dynamically updates the total count of matching hotel results on the page (cross-element).

Clicking the reset button on a complex mortgage calculator clears all numeric inputs and returns charts to their default state (cross-element).

Choosing a specific radio button for a subscription tier dynamically updates the displayed total price summary (cross-element).

Modifying a color picker input instantly changes the background color of a live preview card (cross-element).

Focusing a rich text editor area reveals a previously hidden toolbar containing text formatting options (cross-element).

# 4. Media playback

Starting a promotional video automatically mutes the background audio track playing elsewhere on the page (cross-element).

Pausing a podcast episode reveals a transcript panel synced to the exact timestamp where the audio stopped (cross-element).

Changing the volume slider on a music player updates the corresponding volume icon to reflect the new level.

As a video progresses, a visual progress bar fills up to indicate the percentage of the video watched (cross-element).

A buffering event on a streaming movie triggers a spinning loading icon over the center of the video player (cross-element).

Reaching the end of an educational video automatically unlocks the quiz button in the sidebar (cross-element).

# 5. Drag & drop / clipboard

Dragging a task card over a new column in a Kanban board highlights the column to indicate a valid drop target (cross-element).

Dropping a profile picture onto a designated upload area triggers an immediate image compression and upload sequence.

Copying a discount code from a promotional banner briefly changes the text to "Copied!" for visual confirmation.

Pasting a block of text into a code editor automatically formats the indentation to match the surrounding code.

Dragging a file out of the browser window cancels the current upload preparation sequence.

Dropping a reorderable list item into a new position updates the internal index ranking of all items in the list (cross-element).

# 6. Focus & selection

When a user focuses a credit card input, an illustrative icon flips to show where the security code is located (cross-element).

Highlighting a paragraph of text in a blogging platform pops up a small toolbar for highlighting or leaving comments (cross-element).

When a complex nested menu loses focus entirely, it collapses back to its top-level links.

Selecting a specific word in an e-reader application opens a dictionary definition panel at the bottom of the screen (cross-element).

Tabbing away from an incomplete form section dims the section and brightens the newly focused area to guide attention (cross-element).

Highlighting a specific range of cells in a spreadsheet displays their sum and average in the bottom status bar (cross-element).

# 7. Visibility & intersection

A heavy image in a gallery lazy-loads its high-resolution source only when it comes within a few pixels of the viewport.

As a user scrolls down a social media feed, reaching the bottom container triggers a fetch for older posts (cross-element).

A promotional banner animates sliding into view only when the user scrolls past the main hero section.

An analytics script fires an impression tracking event exactly when an advertisement has been visible on screen for three seconds.

A sticky "Buy Now" button fades in at the top of the screen when the original inline button scrolls out of view (cross-element).

As a specific text section enters the viewport, the corresponding link in a fixed table of contents becomes highlighted (cross-element).

# 8. Attribute & DOM mutation

When a data attribute on a shopping cart icon changes from zero to one, a red notification badge appears.

Adding a specific CSS class to a layout container triggers a recalculation of a masonry grid layout.

When new chat messages are appended to a conversation list, the container automatically scrolls to keep the newest message visible.

Changing the "disabled" attribute on a submit button causes its opacity to lower and its cursor to change.

A mutation observer detects a third-party ad script injecting an iframe and applies a custom styling wrapper around it.

When a localized translation swaps the text content of a heading, a function runs to ensure the font size still fits.

# 9. Resize & viewport

Resizing the browser window past a specific breakpoint collapses a horizontal navigation bar into a hamburger menu icon.

Rotating a tablet from portrait to landscape orientation rearranges a dashboard from a single column to a two-column layout (cross-element).

When a side panel opens, the main content area detects its reduced width and adjusts its internal chart dimensions.

Expanding a collapsible accordion changes the height of its parent container, pushing subsequent page content downward (cross-element).

When a user resizes a split-pane layout divider, the adjacent code editor adjusts its line-wrapping to fit the new width (cross-element).

# 10. Scroll

Scrolling down past the hero image of a landing page adds a subtle drop shadow to the fixed navigation bar (cross-element).

Snapping to a new section in a full-page scroll presentation triggers the entrance animations for that specific slide's content.

Reaching the absolute bottom of a terms of service document enables the previously disabled "I Agree" button (cross-element).

Scrolling horizontally through a carousel of product cards updates the active dot indicator below it (cross-element).

A parallax background image shifts its vertical position at a slower rate than the user's scroll speed.

# 11. Animation & transition

When a success checkmark animation finishes playing, the modal containing it automatically closes (cross-element).

The start of a page transition animation triggers a loading spinner to appear in the center of the screen (cross-element).

If a user clicks away during a slow slide-out animation, the transition is cancelled and the element immediately snaps hidden.

Each iteration of a pulsing notification bell animation subtly changes the color of the bell icon.

When a drag-and-drop item snaps back to its original place, the end of that transition removes its elevated drop shadow.

# 12. Navigation & history

Clicking the browser's back button intercepts the navigation to show a "save your unsaved changes" warning modal (cross-element).

A change in the URL hash automatically opens the corresponding tab panel without reloading the page.

When a user navigates to a new client-side route, the main content area fades out and fades in the new component.

Hiding the page by switching browser tabs pauses an actively playing background video to save resources.

Returning to a previously visited page restores the user's exact scroll position within a long list of articles.

# 13. Window/document lifecycle

When the page finishes loading all external fonts and images, a full-screen loading skeleton fades away to reveal the content.

Switching to a different application dims the browser tab and temporarily throttles live websocket data updates.

If the user's device loses internet connection, an offline warning banner drops down from the top of the window (cross-element).

Reconnecting to the network automatically triggers a silent refresh of the user's email inbox in the background (cross-element).

Before the window unloads, an event fires to save the user's current draft text to local storage.

# 14. Fullscreen

Entering fullscreen mode on a video player hides the browser UI and displays custom playback controls.

Exiting fullscreen from an interactive data visualization restores the sidebar navigation that was previously hidden (cross-element).

Attempting to launch a presentation into fullscreen prompts the user for necessary permissions if they haven't granted them yet.

While a document is in fullscreen mode, a subtle overlay instruction reminds the user they can press Escape to exit.

# 15. State store reactivity

When the global shopping cart count reaches a multiple of five, a congratulatory tooltip appears offering a discount code (cross-element).

Toggling a boolean "edit mode" flag in the app state transforms all static profile text fields into editable inputs (cross-element).

When a user's subscription status updates from free to premium in the store, all locked feature icons disappear (cross-element).

A change in the selected theme variable immediately applies a new set of CSS custom properties to the document root (cross-element).

When the remaining time variable in an auction timer hits zero, the bidding button is disabled and greyed out (cross-element).

Updating the currently selected user in a sidebar list fetches and displays their detailed history in the main panel (cross-element) (seen in: Svelte).

When a background sync process sets an "isSyncing" state to true, a small spinning indicator appears in the footer (cross-element).

Changing the system language preference state immediately swaps out all text content strings across the entire user interface (cross-element).

When a toast notification array gains a new item, a new toast component renders and slides in from the screen edge (cross-element).

Setting a "sidebar open" state to false triggers a slide-out animation and removes the dark overlay from the main content (cross-element).

# 16. Element connect

When a complex chart component mounts onto the page, it immediately initializes a third-party charting library to render its canvas (seen in: React).

A tooltip element calculates its absolute positioning coordinates relative to its parent exactly when it is inserted into the DOM.

When a live chat widget is added to the page, it connects to a websocket to listen for incoming support messages.

An alert banner starts a five-second countdown timer the moment it appears on the screen, dismissing itself when finished.

When a modal element is created, it captures the current active element so it can restore focus when destroyed (seen in: Vue).
