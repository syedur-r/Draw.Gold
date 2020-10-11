// constructor for the brush tool
function Brush() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   
   this.icon = "graphics/brushTool.png"; // Sets the image icon of the element
   this.name = "Brush Tool"; // Gives a unique name to the element

   this.slider = createSlider(8, 50, 8); // Creates a slider from the dom library
   
   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(HAND); // Sets the cursor as a pointer/hand
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         //check if either pMouseOrigin.x or pMouseOrigin.y are -1. 
         //set them to the current mouse X and Y if they are.
         if (this.pMouseOrigin.x == -1) {
            this.pMouseOrigin.x = mouseX;
            this.pMouseOrigin.y = mouseY;
            loadPixels();
         }
         //if we already have values for pMouseOrigin.x and pMouseOrigin.y we can draw a line from 
         //there to the current mouse location
         else {
            // Reference: https://www.youtube.com/watch?v=T8Hs0ZM7h7w
            let brushSpeed = createVector(Math.abs(mouseX - this.pMouseOrigin.x), Math.abs(mouseY - this.pMouseOrigin.y)); // creates a vector to store
            // the absolute value of brush speed of mousex and brush speed of mousey
            let brushStroke = map(formulas.calculateAverage(brushSpeed.x, brushSpeed.y), 0, 200, 3, this.slider.value()); // Uses an average speed based on mouse movements. When the mouse speed increases, the stroke weight will increase
            
            strokeCap(ROUND);
            strokeWeight(brushStroke); // gives an average stroke weight using a map function to give that brush effect
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth brush line
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