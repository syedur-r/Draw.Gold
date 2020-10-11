// Fade out function for preloader
setTimeout(function () {
   $('#preloader').fadeOut(); // Fades the preloader animation out after 3.5 seconds/3500 milliseconds
}, 3500);

// Function to disable the tab key to fix an unknown bug
$(document).keydown(function (event) {
   if (event.which == 9) { // Checks if the tab key is pressed and disables it
      return false;
   }
});

// Function to detect browser closing
$(window).bind('beforeunload', function(dialogue) {
    return dialogue; // Checks if the user is closing the tab/browser and returns a dialogue box to prevent any loss of unsaved drawings
});