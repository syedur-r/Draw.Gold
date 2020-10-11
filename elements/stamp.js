// constructor for the stamp tool
function Stamp() {
   this.icon = "graphics/stampTool.png"; // Sets the image icon of the element
   this.name = "Stamp Tool"; // Gives a unique name to the element
   
   this.slider = createSlider(100, 200, 100); // Creates a slider from the dom library
   this.input = createInput(); // Creates an input from the dom library

   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.stamp = loadImage("graphics/stampImg.png"); // Loads the stamp image from the graphics folder (Does not load when executed locally)
   
   this.drawing = false;  // sets the drawing state as false as nothing is being drawn yet
   this.stamping = false; // sets the stamping state as false as nothing has been stamped yet

   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
      cursor(ARROW); // Sets the cursor as an arrow
      imageMode(CENTER); // aligns the stamp image to the center of the mouse x and y position
      this.stamping = true; // sets the stamping state as true
   };

   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         this.stamping == true && this.mouseOrigin.x == -1 ? // checks if the stamping state is true and mouseOrigin.x is -1
         (this.mouseOrigin.x = mouseX, this.mouseOrigin.y = mouseY, this.drawing = true, loadPixels()) :  // if it is then set mouseOrigin.x 
         // to the current mouseX position and mouseOrigin.y to the current mouseY position, set the drawing state to true and 
         // load the pixel data of the current display window into the pixels array
         (updatePixels(), push(), image(this.stamp, mouseX, mouseY, this.slider.value(), this.slider.value()), pop());
         // otherwise update the display window with the data in the pixels array, and draw the stamp image on to the canvas
         // with the width and height set as the slider value
      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the stamp is set to false as the mouse state is released on the canvas
      }
   };

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      this.slider.hide(); // hides the slider
      this.input.hide(); // hides the input field
      this.stamping = false; // sets the stamping state to false
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