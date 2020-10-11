// constructor for the eraser tool
function Eraser() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   
   this.icon = "graphics/eraserTool.png"; // Sets the image icon of the element
   this.name = "Eraser Tool"; // Gives a unique name to the element

   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables

      cursor(ARROW); // Sets the cursor as an arrow
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         //checks if either pMouseOrigin.x or pMouseOrigin.y are -1 and 
         //sets them to the current mouse X and Y if they are.
         if (this.pMouseOrigin.x == -1) {
            this.pMouseOrigin.x = mouseX;
            this.pMouseOrigin.y = mouseY;
            loadPixels();
         }
         //if we already have values for pMouseOrigin.x and pMouseOrigin.y we can draw an ellipse from 
         //there to the current mouse location
         else {
            push(); // push and pop contains the style settings of the line
            strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
            strokeCap(ROUND); // sets the stroke cap as round
            stroke(255); // Sets the eraser as white to erase all the drawing
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth white line as an eraser
            pop();
            this.pMouseOrigin.x = mouseX; // resets the previous mouseX location to the current mouseX location
            this.pMouseOrigin.y = mouseY; // resets the previous mouseY location to the current mouseY location
         }
      }
      //if the user has released the mouse, pMouseOrigin.x and pMouseOrigin.y are set back to -1.
      else {
         this.pMouseOrigin.x = -1;
         this.pMouseOrigin.y = -1;
      }
   };
}