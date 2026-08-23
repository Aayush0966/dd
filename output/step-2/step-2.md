# Step 2 — DD Attribute Syntax

# 1. Click & pointer interactions

click:toggle_open
dblclick:enterCellEditMode
contextmenu:prevent:openFileContextMenu
click:closeMenuOnOutsideClick
click:closeDrawerOnOutsideClick
pointerdown:wait_500:enterMultiSelectMode
click:class_favorited:saveToFavorites
click:fetch:appendLots
click:selectTrack dblclick:playTrackNow
click:swapMainPhoto (cross-element)
click:closePanelsOnCanvasClick (cross-element)
click:showPropertyCard (cross-element)
contextmenu:prevent:showReactionPicker (cross-element)
click:toggle_on pointerdown:wait_500:expandLightControls
click:sortByColumn
click:toggle_selected:updateBookingSummary (cross-element)
dblclick:zoomToNodeNeighborhood
click:copy:text_copied
click:toggle_open
click:toggleMagnifierLens
dblclick:burstHeart:incrementLikeCount
contextmenu:prevent:showLineActionsMenu
click:incrementScore:class_upvoted_add
auxclick:closeTerminalSession
click:toggle_open
click:class_selected_add:revealAnswerVerdict
click:class_selected_add:fillCheckInField (cross-element)
click:absorbBackdropClick (cross-element)
click:submitOrderOnce (seen in: Vue)

# 2. Keyboard interaction

keydown_escape:closeModalAndRestoreFocus
keydown_ctrl_k:prevent:openCommandPalette (cross-element)
keydown_enter:prevent:sendMessage keydown_shift_enter:insertNewline
keydown_arrowdown:highlightNextSuggestion
keydown_tab:prevent:moveActiveCellRight keydown_shift_tab:prevent:moveActiveCellLeft
keydown_j:jumpToNextUnread keydown_k:jumpToPreviousUnread (cross-element)
keydown_slash:prevent:focusFileSearch (cross-element)
keydown_shift_arrow:extendSelection
keydown_ctrl_enter:prevent:submit
keydown_escape:cancelDragMove
keydown_ctrl_z:prevent:undoCanvasAction keydown_ctrl_shift_z:prevent:redoCanvasAction
keydown_arrowleft:previousSlide keydown_arrowright:nextSlide keydown_home:firstSlide keydown_end:lastSlide
keydown_space:prevent:togglePlayback
keydown_questionmark:openShortcutCheatsheet (cross-element)
keydown_ctrl_s:prevent:saveDraftLocally
keydown_delete:moveSelectedToTrash
keydown_m:toggleMicrophone (cross-element)
keydown_tab:trapFocusWithinModal
keydown_digit:pickSeverityRating
keydown_enter:activateHighlightedItem
keydown_ctrl_c:copySelectionOrInterrupt
keydown_enter:startMatchmaking (seen in: Svelte)
keydown_ctrl_arrow:moveCursorBetweenBeats keydown_arrow:moveCursorBetweenTracks

# 3. Form & input

input:wait_300:checkUsernameAvailability
input:wait_300:searchPatients (seen in: Alpine.js)
blur:validateEmailFormat
change:swapRegionField (cross-element)
input:updateStrengthMeter
change:toggleOtherDetails (cross-element)
paste:formatCardNumber
input:wait_300:publishTypingIndicator (cross-element)
input:recalculateBudget (cross-element)
change:toggleGuardianConsent (cross-element)
reset:restoreDefaultsAndRefreshResults (cross-element)
submit:prevent:lockSubmitAndSpin
input:validateStockLevel
blur:validateRequired
input:filterAirportOptions
change:collapseBillingAndSyncValues (cross-element)
input:wait_300:validatePromoCode
change:updateEndDateMinimum (cross-element)
input:updateCharCounter
change:toggleSubmitEnabled (cross-element)
input:updateMortgageEstimate (cross-element)
input:class_dirty_add
change:validateFileSize
input:formatSsn
change:toggleAllRowCheckboxes (cross-element)
input:filterTagSuggestions
change:swapInstructionPanel (cross-element)
input:syncPairedValue (seen in: Vue)
input:validateFormGroup change:validateFormGroup (seen in: Angular)

# 4. Media playback

ended:advanceCourseProgress (cross-element)
play:updateMiniPlayer (cross-element)
pause:rememberPositionAndPromptResume
waiting:class_buffering_add playing:class_buffering_remove
timeupdate:promptRatingNearEnd
input:syncVolumeUI
timeupdate:pauseAtQuizCheckpoint (cross-element)
ended:highlightNextExhibit (cross-element)
timeupdate:highlightCurrentLyricLine
pause:showChapterList
stalled:handleStreamStall (cross-element)
ended:advanceToNextStory
play:dimAppBackground (cross-element)
seeking:showSeekThumbnail
ended:enableRecordingButton (cross-element)

# 5. Drag & drop / clipboard

dragover:prevent drop:prevent:saveCardStatus
dragover:prevent:class_drop-target_add dragleave:class_drop-target_remove
dragover:prevent drop:prevent:uploadWithProgress
dragstart:markDraggedRow dragover:prevent drop:prevent:reorderTracks
dragstart:showGhostPlaceholders dragover:prevent drop:prevent:reflowDashboardGrid
copy:showCopiedToast (cross-element)
paste:splitEmailsIntoChips
dragover:prevent drop:prevent:fillAppointmentSlot (cross-element)
dragover:prevent drop:prevent:addToComparisonTray (cross-element)
click:copy:class_copied_add:wait_1500:class_copied_remove
dragleave:hideDropOverlayWhenLeavingWindow (cross-element)
dragover:prevent drop:prevent:updateStackingOrder (cross-element)
paste:fetchLinkPreview (cross-element)
dragover:prevent drop:prevent:reorderStopAndRecalculate
paste:distributeOtpDigits
cut:enablePasteOption (cross-element)

# 6. Focus & selection

focus:expandSuggestionsPanel (cross-element)
focus:openMegamenuPanel (cross-element)
selectionchange:showSelectionToolbar (cross-element)
focus:announceKeyboardControls
selectionchange:updateSelectionStats (cross-element)
focus:switchKeyboardLayout (cross-element)
blur:normalizeCouponCode:validateCoupon
focus:class_focused_add blur:class_focused_remove
selectionchange:enableWaveformEditButtons (cross-element)
selectionchange:resetBlockFormatDropdown (cross-element)
focus:announceCodeLength
blur:class_unsaved_add
focus:ringOnKeyboardFocusOnly (seen in: Angular)
blur:validateAddressGroup (cross-element)

# 7. Visibility & intersection

intersection:loadRealImage
intersection:loadNextPage (cross-element)
intersection:animateCounters
intersection:highlightTocEntry (cross-element)
intersection:toggleAutoplayMuted
intersection:wait_1000:recordImpression
intersection:startLiveDataRefresh
intersection:activateProgressDot (cross-element)
intersection:enlargeMapPin (cross-element)
intersection:lazyLoadReviews
intersection:class_in-view_add
intersection:preloadComments
intersection:toggleStickyHero (cross-element)
intersection:wait_2000:logSeenImpression
intersection:enableAcceptButton (cross-element)
intersection:markMessagesRead (cross-element)
intersection:fadeInEntranceLabels
intersection:playInfographicOnce
intersection:animateInOnce (seen in: Svelte)
intersection:batchLoadImages
intersection:dockMiniPlayerWhenOutOfView (cross-element)

# 8. Attribute & DOM mutation

attr_aria-expanded:rotateChevron
attr_data-theme:rerenderChartsDark (cross-element)
attr:pulseBadge
attr:hideHelpLinkOnWidgetInject (cross-element)
attr:announceLiveRegion
attr_disabled:animateEnabledColor
attr_data-state:toggleGlobalSpinner (cross-element)
attr_class:updateErrorSummary (cross-element)
attr_lang:rerenderLocalizedFormats (cross-element)
attr_aria-selected:highlightRow
attr:flashPriceDirection
attr:nudgeLayoutForInjectedNodes (cross-element)
attr_data-current-step:announceStepName (cross-element)
attr_class:fadeCaptionOnActive
attr:collapseWhenEmpty
attr_data-breakpoint:swapNavigationMode (cross-element)
attr_class:collapseFlaggedComment
attr:renumberRows
attr_data-experiment:swapHeroVariant
attr_type:swapVisibilityIcon
attr_src:fadeInWhenLoaded
attr_data-ready:initializeEnhancements (cross-element)

# 9. Resize & viewport

resize:reflowChartGrid
resize:expandPlayerToOrientation (cross-element)
resize:shrinkEditorAndHideMinimap
resize:redrawChart
resize:scaleCanvasLetterboxed
resize:repositionCharCounter (cross-element)
resize:adjustGalleryColumns
resize:keepSubmitVisible (cross-element)
resize:recenterMap (cross-element)
resize:enforceMinimumPaneWidth
resize:switchToStackedLayout
resize:swapLabelForIcon (seen in: Svelte)

# 10. Scroll

scroll:updateReadingProgress (cross-element)
scroll:enableAcceptAtEnd (cross-element)
scroll:pinBookTourBarPastHero (cross-element)
scroll:toggleBackToTopPill (cross-element)
scroll:prependEarlierHistory
scroll:freezeFirstColumn
scrollend:snapToNearestCard
scroll:pauseAutoFollow (cross-element)
scroll:collapseNavOnScrollDirection
scroll:syncExplanationPane (cross-element)
scroll:lockBackgroundScroll (cross-element)
scroll:updateChapterLabel (cross-element)

# 11. Animation & transition

animationend:wait_3000:dismissToast
transitionend:removeFromDom
animationiteration:swapInRealContent (cross-element)
animationend:fadeInShareButtons (cross-element)
transitionend:focusFirstLink (cross-element)
animationcancel:showErrorCard
animationend:removeOverlay
animationend:class_flash_remove
animationiteration:stopAfterThreePulses
transitionend:focusFirstField (cross-element)
transitionend:removeListItem (seen in: Svelte)

# 12. Navigation & history

popstate:syncLessonRoute (cross-element)
popstate:restoreFilterState
hashchange:highlightTargetHeading (cross-element)
beforeunload:warnUnsavedPatientData
popstate:updatePageMetadata (cross-element)
pageshow:refreshPrices
load:activateDeepLinkedTab
popstate:resetCartBadgeOnConfirmation (cross-element)
popstate:syncStepIndicator (cross-element)
popstate:closeLightboxOnBack (cross-element)
load:applyLocaleFromUrl (cross-element)

# 13. Window/document lifecycle

load:prioritizeFoldAndLoadComments (cross-element)
visibilitychange:pausePreviewWhenHidden (cross-element)
visibilitychange:refreshScoresOnVisible
offline:showOfflineBannerAndQueue (cross-element)
online:flushMessageQueue (cross-element)
beforeunload:promptStayOrLeave
pageshow:resyncCartCount (cross-element)
visibilitychange:pauseGameLoopWhenHidden
load:scheduleOvernightReload
dcl:remeasureHeadlinesAfterFonts

# 14. Fullscreen

click:requestFullscreen:showExitHintBriefly
fullscreenchange:restoreThumbnailsOnExit (cross-element)
fullscreenchange:autoHideNavigationHints
fullscreenerror:openModalFallback
fullscreenchange:toggleSiteHeader (cross-element)
fullscreenchange:returnPlayerInline (cross-element)
fullscreenchange:resizeControlHints (cross-element)

# 15. State store reactivity

state_cartCount:bumpCartBadge
state_loggedIn:renderAuthHeader
state_currency:convertAllPrices
state_unreadCount:syncNotificationUI
state_stockPrice:flashRowAndRecalculate
state_sidebarCollapsed:resizeMainContent
state_checkedIn:removeFromWaitingBoard
state_currentTrack:updateNowPlayingBar
state_activeFilters:refetchResultsGrid (cross-element)
state_online:toggleSubmitAvailability
state_storageQuota:toggleUpgradeBanner
state_activeWorkspace:reloadWorkspaceTables (cross-element)
state_quizScore:unlockCertificateButton
state_documentTitle:syncTabTitle
state_theme:applyTheme
state_audioMuted:applyAudioMute
state_step1Complete_step2Complete_step3Complete:enableReviewSubmit
state_highestBid:syncAuctionDisplay
state_deviceStatus:dimOfflineTile
state_draftsCount:syncDraftsBadge
state_firstName_lastName:renderGreeting (seen in: Vue)
state_modalOpen:syncModalOpen (seen in: Alpine.js) (cross-element)
state_locale:rerenderFormattedDates (seen in: React)
state_clockTick:updateClockLabel (seen in: Svelte)

# 16. Element connect

i:requestAdCreative
i:upgradeAvatarImage
i:highlightSyntaxAndAddCopyButton (cross-element)
i:renderRelativeTime
i:measureAndDrawInitialFrame
i:wireAccessibleDescription (cross-element)
i:lazyLoadMapScript (cross-element)
i:restorePlaybackPosition
i:toggle_cloak (seen in: Alpine.js)
i:renderStars
i:openPollSocket (seen in: React)
i:lazyLoadEditorLibrary
i:countUpToTarget
i:removeIfConsentStored
i:animateProgressArc
