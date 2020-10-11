// Class to contain the mouse bounds within the canvas
class CanvasBounds {
   constructor() {  
   }
   
   // HELPER FUNCTION FOR MOUSE PRESS BOUNDS WITHIN CANVAS
   mousePressOnCanvas(canvas) {
      if (mouseX > canvas.elt.offsetLeft - 50 && // checks if the mouse width starts within the boundaries of the left offset of the canvas
         mouseX < (canvas.elt.offsetLeft + canvas.width) && // checks if the mouse width ends at the boundaries of the right side of the canvas
         mouseY > canvas.elt.offsetTop - 35 && // checks if the mouse height starts at the boundaries of the top of the canvas
         mouseY < (canvas.elt.offsetTop + canvas.height - 35) // checks if the mouse height ends at the boundaries of the bottom of the canvas
      ) {
         return true; // Executes the helper function when the conditions are satisfied
      }
      return false; // Terminates the functions once the conditions are not satisfied
   };
}