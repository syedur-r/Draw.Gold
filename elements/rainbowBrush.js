// constructor for the rainbow brush tool
function RainbowBrush() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   RainbowPen.call(this); // inherits the setup method from the RainbowPen constructor
   
   this.icon = "graphics/rainbowBrush.png"; // Sets the image icon of the element
   this.name = "Rainbow Brush"; // Gives a unique name to the element

   this.slider = createSlider(8, 50, 8); // Creates a slider from the dom library

   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(HAND); // Sets the cursor as a pointer/hand
      undoTask.undoAction();
      let brushColour = color((12 * frameCount) % 360, 40, 100); // Changes the hue of the colour to a rainbow like colour by every frame count
      // Reference: https://editor.p5js.org/aferriss/sketches/Bys1YDQx7

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
                     
            push(); // push and pop contains the fill and stroke settings of the rainbow brush
            fill(brushColour); // Sets the fill of the brush with the rainbow colour
            stroke(brushColour); // Sets the stroke of the brush with the rainbow colour
            strokeWeight(brushStroke); // gives an average stroke weight using a map function to give that brush effect
            strokeCap(ROUND); // sets the stroke cap as round
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth brush line
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