// constructor for the triangle tool
function Triangle() {
   Rectangle.call(this); // Inherits all the methods and properties from the Rectangle constructor

   this.icon = "graphics/triangleTool.png"; // Sets the image icon of the element
   this.name = "Triangle Tool"; // Gives a unique name to the element

   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables

      cursor(CROSS); // Sets the cursor as a cross
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {

         // Checks if stroke selector is false (stroke button has been clicked)
         if (this.selectorMode == false) {
            //check if either pMouseOrigin.x or pMouseOrigin.y are -1 (off the canvas). 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
               
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw a triangle from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the triangle
               noFill(); // removes the fill values
               strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
               strokeCap(ROUND); // sets the stroke cap as round
               stroke(palette.currentColour); // sets the stroke as the palette's current colour
               triangle(this.mouseOrigin.x + (mouseX - this.mouseOrigin.x)/2, this.mouseOrigin.y, this.mouseOrigin.x, mouseY, mouseX, mouseY); // draws a triangle from the previous mouse position to the current mouse position, the previous position starts from the bottom right corner of the triangle
               pop();

            }
         }
         
         // Checks if stroke selector is true (fill button has been clicked)
         if (this.selectorMode == true) {
            //check if either pMouseOrigin.x or pMouseOrigin.x are -1 (off the canvas). 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array

            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the triangle
               noStroke(); // removes the stroke values
               fill(palette.currentColour); // sets the fill as the palette's current colour
               triangle(this.mouseOrigin.x + (mouseX - this.mouseOrigin.x)/2, this.mouseOrigin.y, this.mouseOrigin.x, mouseY, mouseX, mouseY); // draws a triangle from the previous mouse position to the current mouse position, the previous position starts from the bottom right corner of the triangle
               pop();
            }
         }

      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the line is set to false as the mouse state is released on the canvas
      }
   };
}