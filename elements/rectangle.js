// constructor for the rectangle tool
function Rectangle() {
   this.icon = "graphics/rectTool.png"; // Sets the image icon of the element
   this.name = "Rectangle Tool"; // Gives a unique name to the element

   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.drawing = false; // This boolean variable sets the default state of drawing the line to false as the mouse state is released on the canvas
   this.selectorMode = false; // Boolean variable for the stroke/fill selector
   this.slider = createSlider(2, 50, 2); // Creates a slider from the dom library
   this.input = createInput(); // Creates an input from the dom library

   let self = this; // Stores this inside a variable

   // setup method
   this.setup = function () { //This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
      // displays the stroke slider and input when stroke is selected, otherwise the slider and input are hidden
      this.selectorMode == false ? (this.slider.show(), this.input.show()) : (this.slider.hide(), this.input.hide());
   };

   // draw method
   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables

      cursor(CROSS); // Sets the cursor as a cross
      undoTask.undoAction();
      
      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         // Checks if stroke selector is false (stroke button has been clicked)
         if (this.selectorMode == false) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1 (off the canvas). 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
            
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an rectangle from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the rectangle
               noFill(); // removes the fill values
               strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
               strokeCap(ROUND); // sets the stroke cap as round
               stroke(palette.currentColour); // sets the stroke as the palette's current colour
               rect(this.mouseOrigin.x, this.mouseOrigin.y, mouseX - this.mouseOrigin.x, mouseY - this.mouseOrigin.y); // draws a rectangle from the previous mouse position to the current mouse position, the previous position starts from the top corner of the rectangle
               pop();
            }
         }

         // Checks if stroke selector is true (fill button has been clicked)
         if (this.selectorMode == true) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1 (off the canvas). 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array

            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an rectangle from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the rectangle
               noStroke(); // removes the stroke values
               fill(palette.currentColour); // sets the fill as the palette's current colour
               rect(this.mouseOrigin.x, this.mouseOrigin.y, mouseX - this.mouseOrigin.x, mouseY - this.mouseOrigin.y); // draws a rectangle from the previous mouse position to the current mouse position, the previous position starts from the top corner of the rectangle
               pop();
            }
         }

      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the rectangle is set to false as the mouse state is released on the canvas
      }
   };
   
   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      select(".selection").html(""); // clears the selection element from html
      this.selectorMode = false; // sets the stroke/fill selector state to false
      this.slider.hide(); // hides the slider
      this.input.hide(); // hides the input field
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {
      // selects the selection div class from html and assigns a button to it
      select(".selection").html("<button id='selectorBtn'>Fill</button>");
      //click handler for the selector button
      select("#selectorBtn").mouseClicked(function () {
         let selectorBtn = select("#" + this.elt.id); // stores the button element inside a variable
         // sets the button html as 'Fill' when stroke is selected, otherwise sets the button html as 'Stroke'
         self.selectorMode ? (self.selectorMode = false, selectorBtn.html('Fill')) : (self.selectorMode = true, selectorBtn.html('Stroke'));
      });
      
      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(50, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider

      this.input.show(); // when the element is selected, show the input field
      this.input.position(140, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center
   };
}