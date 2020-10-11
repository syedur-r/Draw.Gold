// constructor for the line tool
function Line() {
   this.icon = "graphics/lineTool.png"; // Sets the image icon of the element
   this.name = "Line Tool"; // Gives a unique name to the element

   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.slider = createSlider(2, 50, 2); // Creates a slider from the dom library
   this.input = createInput(); // Creates an input from the dom library
   
   this.drawing = false; // This boolean variable sets the default state of drawing the line to false as the mouse state is released on the canvas
   this.strokeMode = false; // Boolean variable for the round/square stroke
   
   let self = this; // Stores this inside a variable to access it inside of the button handler

   // setup method
   this.setup = function () { //This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
      // sets the default stroke cap as round if nothing is clicked, other sets the stroke cap as square if the button is clicked
      this.strokeMode == false ? strokeCap(ROUND) : strokeCap(SQUARE);
   };

   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables

      cursor(CROSS); // Sets the cursor as a cross
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         //check if either mouseOrigin.x or mouseOrigin.y are -1. 
         //set them to the current mouse X and Y if they are.
         if (this.mouseOrigin.x == -1) {
            this.mouseOrigin.x = mouseX;
            this.mouseOrigin.y = mouseY;
            this.drawing = true; // Sets the drawing state to true
            loadPixels(); // Loads the pixel data of the current display window into the pixels array
         } else {
            updatePixels(); // Updates the display window with the data in the pixels array
            noFill(); // removes the fill values
            strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            line(this.mouseOrigin.x, this.mouseOrigin.y, mouseX, mouseY); // draws a straight line from the previous mouse position to the current mouse position
         }
      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the line is set to false as the mouse state is released on the canvas
      }
   };

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      select(".selection").html(""); // clears the selection element from html
      this.slider.hide(); // hides the slider
      this.input.hide(); // hides the input field
      this.strokeMode = false; // sets the stroke cap selector as false
   };
   
   // Method for populating the options when the element is selected
   this.addOptions = function () {
      // selects the selection div class from html and assigns a button to it
      select(".selection").html("<button id='strokeCap'>Square Stroke</button>");
      //click handler for the stroke cap button
      select("#strokeCap").mouseClicked(function () {
         let strokeCap = select("#" + this.elt.id); // stores the button element inside a variable
         // sets the button html as 'Round Stroke' when the button is pressed, otherwise sets the button html as 'Square Stroke'
         self.strokeMode ? (self.strokeMode = false, strokeCap.html('Square Stroke')) : (self.strokeMode = true,  strokeCap.html('Round Stroke'));
      });

      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(50, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider

      this.input.show(); // when the element is selected, show the input field
      this.input.position(140, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center      
   };   
}