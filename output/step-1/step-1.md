# 1. Click & pointer interactions
- Clicking a primary submit button triggers a form submission sequence and disables the button.
- Clicking a toggle button switches its icon from a play symbol to a pause symbol.
- Double-clicking an image in a gallery zooms the image to its full native resolution.
- Hovering over a pricing card slightly elevates it with a larger drop shadow to indicate interactivity.
- Clicking a text input instantly highlights all the pre-existing text inside it.
- Holding down a microphone icon button begins capturing voice audio until the user releases the pointer.
- Clicking on a hamburger menu icon expands the hidden side navigation panel (cross-element).
- Clicking anywhere outside an active custom dropdown menu causes the dropdown to close itself (cross-element).
- Right-clicking a row in a data table opens a custom context menu at the pointer coordinates (cross-element).

# 2. Keyboard interaction
- Pressing the Escape key while a modal dialog is open closes the modal itself.
- Pressing the down arrow key inside a search autocomplete dropdown moves focus to the next suggested item.
- Pressing Ctrl+S on the document body saves the current draft of the blog post being written.
- Pressing the spacebar while a custom checkbox element has focus toggles its checked state visually.
- Holding the Shift key while drawing a rectangle on a canvas constrains the shape to a perfect square.
- Pressing Ctrl+B while typing in a rich text editor toggles bold formatting for new text.
- Pressing the Enter key while focused on a search input submits the search query to the results view (cross-element).
- Hitting the Tab key while at the end of a spreadsheet row moves focus to the first cell of the next row (cross-element).

# 3. Form & input
- Blurring a username input field after typing triggers an API check to see if the name is available.
- Entering a valid email format into an input removes the red error border and hides the validation message.
- Focusing on a search input stretches it to become wider to accommodate longer queries.
- Modifying a color picker input instantly changes its own background color to match the selected hex value.
- Typing into a password field updates the visual strength meter indicator below it as the length increases (cross-element).
- Changing a select dropdown's value to a specific option makes it display a previously hidden nested select field (cross-element).
- Resetting a complex filter form reverts all individual filter inputs back to their default empty states (cross-element).

# 4. Media playback
- Scrubbing through a video timeline displays a small thumbnail preview of the video frame at that timestamp.
- A video buffering event displays a spinning loading indicator over the center of the video player.
- Changing the playback speed of a podcast player visually highlights the newly selected speed multiplier button.
- Pausing a custom video player component overlays a large play button directly on itself.
- Dragging the volume slider to zero updates the speaker icon to a muted state (cross-element).
- Reaching the end of a podcast audio track auto-plays the next track in the queue (cross-element).
- Clicking play on an embedded video pauses all other active media players currently playing on the page (cross-element).

# 5. Drag & drop / clipboard
- Dragging a task card slightly tilts the card to show it has been picked up.
- Dropping an image file onto a dashed upload area begins the file upload process and shows a progress bar.
- Pasting a comma-separated list of emails into a single recipient input converts them into individual pill-shaped tags.
- Dragging an item outside of an allowed drop zone visually turns the item red to indicate an invalid drop.
- Clicking a "copy code" button copies the contents of the adjacent code block to the user's clipboard (cross-element).
- Cutting text from a rich text editor removes the text and disables the cut button in the toolbar (cross-element).

# 6. Focus & selection
- When a text input loses focus, a trailing whitespace trimming function cleans up the user's entry.
- Focusing on a pricing tier card slightly enlarges it and gives it a glowing border for emphasis.
- When focus leaves a group of radio buttons, the group is validated to ensure an option was chosen.
- Moving focus to a hidden skip-to-content link at the top of the page makes it visible to keyboard users.
- Selecting a paragraph of text in an article makes a floating highlighter toolbar pop up nearby (cross-element).
- Highlighting code within a snippet block updates the character count displayed in the bottom right corner (cross-element).

# 7. Visibility & intersection
- An image entering the viewport triggers the loading of its high-resolution source file to replace the placeholder.
- An ad banner that remains visible on screen for more than three seconds fires a viewability tracking event.
- As a section header approaches the top of the viewport, it pins itself to the top of the screen.
- When a specific chart element enters the viewport, its bars smoothly animate up from zero.
- If a promotional modal becomes partially obscured by the viewport edge, it adjusts its position to stay fully visible.
- When the bottom of a list container becomes visible, it fetches and appends the next page of results (cross-element).
- Scrolling a hero section out of view causes the transparent fixed header to turn a solid color (cross-element).

# 8. Attribute & DOM mutation
- When an element's aria-invalid attribute is set to true, it shakes and turns red to indicate an error.
- Changing the disabled attribute on a form field visually fades it out and removes it from the tab order.
- If an element's class list receives a loading class, it displays a spinning progress indicator.
- Modifying a data-status attribute on a badge element automatically changes its background color to match the status.
- Adding a new child element to a masonry grid container triggers the container to recalculate its layout.
- When a user's theme preference attribute changes to dark, the code editor component swaps its syntax highlighting stylesheet.
- When a data attribute containing a user's unread message count updates, the notification badge text changes to match (cross-element).

# 9. Resize & viewport
- If the viewport height becomes too short, the sticky footer becomes static to prevent covering content.
- Resizing a text area manually causes it to adjust its internal scrollbar to match the new dimensions.
- Rotating a mobile device to landscape mode stretches the image viewer to fill the entire horizontal space.
- Resizing the browser window below a mobile breakpoint shrinks a large headline font to a more readable size.
- When a chart container's width changes due to a panel opening, the internal SVG redraws to fit the new dimensions.
- When a split-pane container's middle divider is dragged, the left and right child panels adjust their percentage widths (cross-element).

# 10. Scroll
- Scrolling a horizontal carousel snaps the next product card perfectly into the center of the view.
- When the window scroll position reaches a certain threshold, the sidebar navigation sticks to the screen edge.
- Scrolling down rapidly causes a reading-progress indicator bar to fill up horizontally.
- As a user scrolls down a long article, a progress bar at the top of the page fills up proportionally (cross-element).
- Reaching the end of a scrollable terms of service text box enables the previously disabled agreement button (cross-element).
- Scrolling down past the hero image makes a back to top button appear in the bottom corner (cross-element).

# 11. Animation & transition
- When a success toast notification finishes its fade-out transition, it completely removes itself from the DOM.
- Canceling a drawer's opening transition halfway through causes it to snap immediately back to its closed state.
- When a pulsating button's animation iterates, it subtly shifts its drop shadow to create a glowing effect.
- When a collapsible accordion finishes its height transition, it updates its aria-expanded state to true.
- The end of a loading spinner's rotation animation triggers the reveal of the loaded content below it (cross-element).
- The start of a page transition animation fades out the current main content area before the new route loads (cross-element).

# 12. Navigation & history
- When the URL changes to match a navigation link's href, the link gives itself an active styling class.
- Pressing the browser back button while a custom modal is open closes the modal itself.
- A search input component reads new query parameters from the URL and updates its own text value.
- When the page is hidden because the user switched tabs, an active polling component pauses its own timer.
- Changing the URL hash opens the corresponding accordion section on the FAQ page (cross-element).
- Navigating to a new route in a single page application scrolls the window back to the top automatically (cross-element).

# 13. Window/document lifecycle
- When the document finishes parsing, a complex data grid component initializes its internal layout engine.
- A network status indicator component turns gray and shows a disconnected icon when the browser goes offline.
- A chat component resubmits its own pending messages when the device regains internet connectivity.
- An analytics script fires an initial pageview event as soon as the page finishes loading completely.
- A video player component pauses its own playback when the tab visibility changes to hidden.
- If the user's device loses network connection, a red offline banner drops down from the top (cross-element).

# 14. Fullscreen
- Entering fullscreen mode on a presentation slide expands it to hide the browser UI and desktop.
- Exiting fullscreen on a document viewer restores its own side toolbars and menus that were hidden.
- Attempting to enter fullscreen on a device that doesn't support it shows a polite fallback message inside the component.
- When a video player enters fullscreen, it reveals a larger set of control buttons designed for big screens.
- Exiting fullscreen mode via the escape key shrinks the image gallery component back to its default grid layout.

# 15. State store reactivity
- When the dark mode state flag is toggled to true, a text paragraph updates its own color to white.
- A checkout button disables itself when the global shopping cart count state reaches zero.
- Changing the selected language state translates a localized welcome message component instantly.
- When an authentication state store registers a logout, the user profile widget clears its own data.
- Toggling a show advanced options state flag reveals additional configuration fields within the same form component.

# 16. Element connect
- When a new chat message element is appended to the message list, it automatically scrolls itself into view.
- As soon as a date picker input is inserted into the DOM, it initializes its own calendar popup widget.
- When a custom tooltip element connects to the document, it calculates its exact screen position relative to the viewport.
- Inserting a markdown preview block into the page immediately parses its own raw text into styled HTML.
- When a heavy 3D viewer component mounts, it preemptively starts downloading its own necessary texture assets.
- As an analytics tracking pixel element connects to the DOM, it immediately fires its own initial tracking event.

# 17. Other Framework Patterns
- Typing in a search box automatically debounces the input by a set duration before firing a search request (seen in: Alpine.js).
- Pressing a button triggers a function but prevents the default form submission behavior simultaneously (seen in: Vue).
- Clicking a link stops the click event from bubbling up to parent elements that also have click listeners (seen in: React).
- Updating a local component state variable reactively updates only the specific paragraph displaying that variable (seen in: Svelte).
- When a component is destroyed, a cleanup function runs to remove an attached window scroll listener (seen in: React).
- Clicking a toggle button only runs its action once and then automatically removes its own event listener (seen in: Angular).