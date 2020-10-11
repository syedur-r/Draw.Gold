// constructor for the ellipse tool
function Ellipse() {
   Rectangle.call(this); // Inherits all the methods and properties from the Rectangle constructor
   
   this.icon = "graphics/ellipseTool.png"; // Sets the image icon of the element
   this.name = "Ellipse Tool"; // Gives a unique name to the element
   
   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables

      cursor(CROSS); // Sets the cursor as a cross
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         
         // Checks if stroke selector is false (stroke button has been clicked)
         if (this.selectorMode == false) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1. 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
               
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an ellipse from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the ellipse
               noFill(); // removes the fill values
               strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
               strokeCap(ROUND); // sets the stroke cap as round
               stroke(palette.currentColour); // sets the stroke as the palette's current colour
               ellipseMode(CORNERS); // sets the start of the mouse to the corners of the ellipse
               ellipse(this.mouseOrigin.x, this.mouseOrigin.y, mouseX, mouseY); // draws an ellipse from the previous mouse position to the current mouse position
               pop();
            }
         }

         // Checks if stroke selector is true (fill button has been clicked)
         if (this.selectorMode == true) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1. 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
               
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an ellipse from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the ellipse
               noStroke(); // removes the stroke values
               fill(palette.currentColour); // sets the fill as the palette's current colour
               ellipseMode(CORNERS); // sets the start of the mouse to the corners of the ellipse
               ellipse(this.mouseOrigin.x, this.mouseOrigin.y, mouseX, mouseY); // draws an ellipse from the previous mouse position to the current mouse position
               pop();
            }
         }
      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the ellipse is set to false as the mouse state is released off the canvas
      }
   };
}