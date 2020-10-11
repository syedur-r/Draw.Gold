// class to encapsulate all the keyboard shortcuts
class KeyShortcuts {
   constructor() {
      this.cmdDown = false; // boolean property for the command/control key
      this.shiftDown = false; // boolean property for the shift key
   }
   
   // function to check if key is pressed
   keyPressed(e) {
      if (keyCode == CONTROL || e.metaKey) this.cmdDown = true; // sets cmdDown to true when the control/command key is pressed
      if (keyCode == SHIFT) this.shiftDown = true; // sets ctrlShift to true when the shift key is pressed

      // Checks if both command/control and shift key is pressed together
      if (this.cmdDown) {
         if (this.shiftDown) {
            if (key == 's' || key == 'S') { // If the first two conditions are met, it also checks if the s or S key is pressed
               let fileName = prompt("Save As:") // creates a prompt box to input the name of the file
               saveCanvas(fileName, 'png'); // saves the canvas as a png image
            }
         } else {
            if (key == 'x' || key == 'X') { // If the first is met, it also checks if the x or X key is pressed
               background(255); // sets the background as white
               loadPixels(); // this function is needed for the line of symmetry tool
               for (var i = 0; i < previousState.arr.length; i++) {
                  previousState.arr.length = 0;
               }
            }
            if (key == 'z' || key == 'Z') { // If the first is met, it also checks if the z or Z key is pressed
               loadPixels();
               if (previousState.isEmpty() === true) {
                  alert("There are no tasks to be undone!")
               } else {
                  // Check if action is possible
                  if (previousState.peek() !== null) {
                     // Changes pixels array to the state saved in previousState
                     // before the last action
                     for (var i = 0; i < pixels.length; i++) {
                        pixels[i] = previousState.peek()[i];
                     }
                     // Pop the stack so the program is ready to go back another step
                     previousState.pop();
                  }
               }
               // Saves changes to the canvas
               updatePixels();
            }
         }
      }
   };
   
   // function to check if key is released
   keyReleased(e) {
      if (keyCode == CONTROL || e.metaKey) this.cmdDown = false; // sets cmdDown to false when the control/command key is released
      if (keyCode == SHIFT) this.shiftDown = false; // sets ctrlShift to false when the shift key is released
   };
}