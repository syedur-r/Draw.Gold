// constructor for the spray can tool
function AirBrush() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   
   this.icon = "graphics/airBrush.png"; // Sets the image icon of the element
   this.name = "Air Brush Tool"; // Gives a unique name to the element
   
   this.slider = createSlider(10, 50, 10); // Creates a slider from the dom library

   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(HAND); // Sets the cursor as a pointer/hand
      undoTask.undoAction();

      //if the mouse is pressed within the canvas bounds, call the spray method and start spraying
      //the slider value represents the spread (how far to spread the paint from the mouse pointer)
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         if (this.pMouseOrigin.x == -1) {
            this.pMouseOrigin.x = mouseX;
            this.pMouseOrigin.y = mouseY;
            loadPixels(); // Saves the current pixel data into the pixel array
         }
         //if we already have values for pMouseOrigin.x and pMouseOrigin.y we can draw a line from 
         //there to the current mouse location
         else {
            this.spray(30, this.pointsPos, this.slider.value());
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
   
   // Reference: https://forum.processing.org/one/topic/fill-tool-and-spray-tool-in-a-drawing-program.html
   // Method for creating the spray effect
   this.spray = function (points, position, size) {
      // Ellipse Air Brush - Amended from the rect air brush
      // loops through the number pixels (points) to spray for each mouse press.
      for (var i = 0; i < points; i++) {
         let circle = random(360); // Angles in a circle is 360
         position = createVector( // Creates a vector to hold a random circular point of mouseX and mouseY
            (random(size) * cos(radians(circle))) + mouseX,
            (random(size) * sin(radians(circle))) + mouseY
         );
         strokeCap(ROUND); // sets the stroke cap as round
         strokeWeight(2); // Sets the stroke weight to 2
         stroke(palette.currentColour);
         point(position.x, position.y); // plugs in the vectorX and vectorY points inside of the point() function
      }
   };
}