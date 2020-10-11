// constructor for the pen tool - Contains all the methods and properties to be inherited
function PenTool() {
   this.icon = "graphics/penTool.png"; // Sets the image icon of the element
   this.name = "Pen Tool"; // Gives a unique name to the element
   
   //to smoothly draw we'll draw a line from the previous mouse location
   //to the current mouse location. The following values store
   //the locations from the last frame. They are -1 to start with as an offset value
   //because we haven't started drawing yet.
   this.pMouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.slider = createSlider(8, 100, 8); // Creates a slider from the dom library
   this.input = createInput(); // creates an input field from the dom library
   
   // setup method
   this.setup = function() { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
   };

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
            strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
            strokeCap(ROUND); // sets the stroke cap as round
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth marker line
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
   
   // Method for unselecting the element
   this.unselectElement = function () {
      this.slider.hide(); // when the element is deselected, hide the slider
      this.input.hide(); // when the element is deselected, hide the input
   };
   
   // Method for populating the options when the element is selected
   this.addOptions = function () {
      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(50, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider

      this.input.show(); // when the element is selected, show the input field
      this.input.position(140, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center
   };
}