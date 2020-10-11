// constructor for the rainbow pen tool
function RainbowPen() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   
   this.icon = "graphics/rainbowPen.png"; // Sets the image icon of the element
   this.name = "Rainbow Pen"; // Gives a unique name to the element
   
   // setup method
   this.setup = function() { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
      colorMode(HSB); // Hue, Saturation, Brightness colour model
   };
      
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
            push(); // push and pop contains the fill and stroke settings of the rainbow pen
            fill(brushColour); // Sets the fill of the brush with the rainbow colour
            stroke(brushColour); // Sets the stroke of the brush with the rainbow colour
            strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
            strokeCap(ROUND); // sets the stroke cap as round
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth rainbow pen line
            pop();
            this.pMouseOrigin.x = mouseX; // resets the previous mouseX location to the current mouseX location
            this.pMouseOrigin.y = mouseY; // resets the previous mouseY location to the current mouseY location
         }
      }
      // if the user has released the mouse, pMouseOrigin.x and pMouseOrigin.y are set back to -1.
      else {
         this.pMouseOrigin.x = -1;
         this.pMouseOrigin.y = -1;
      }
   };
}