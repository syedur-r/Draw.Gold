// constructor for the resize canvas tool
function ResizeCanvas() {
   this.icon = "graphics/resizeCanvas.png"; // Sets the image icon of the element
   this.name = "Resize Canvas Tool"; // Gives a unique name to the element
   
   this.widthSlider = createSlider(0, canvasContent.size().width, canvasContent.size().width, 1); // Creates a canvas width slider from the dom library
   this.widthInput = createInput(); // Creates a canvas width input from the dom library
   this.heightSlider = createSlider(0, canvasContent.size().height, canvasContent.size().height, 1); // Creates a canvas height slider from the dom library
   this.heightInput = createInput(); // Creates a canvas height input from the dom library
   this.resizeBtn = createButton('Apply'); // Creates a toggle button to apply changes, from the dom library
   
   let resize; // stores the new canvas size inside of a variable
   let self = this; // stores this inside of a variable to be used in the click handlers for the toggle button
      
   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.widthInput.value(this.widthSlider.value()); // Sets the width input value as the width slider value
      this.heightInput.value(this.heightSlider.value()); // Sets the height input value as the height slider value
   };
   
   // draw method
   this.draw = function() { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(ARROW); // Sets the cursor as an arrow

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent)) {
         // click handler for the mouse click of the resize canvas toggle button
         this.resizeBtn.mouseClicked(function () {
            loadPixels(); // Loads the pixel data of the current display window into the pixels array
            push(); // pushes the current state of the canvas to set the new canvas size
            resize = createCanvas(self.widthSlider.value(), self.heightSlider.value()); // sets the new canvas size according to the width and slider values
            background(255); // sets the background colour as white
            resize.parent("components"); // Puts the resized canvas on top of all elements
            updatePixels(); // Updates the display window with the data in the pixels array
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            fill(palette.currentColour); // sets the fill as the palette's current colour
            pop(); //return to the original state with the drawing pixels still intact
         });
      }
   };
   
   // Method for unselecting the element
   this.unselectElement = function() {
      this.widthSlider.hide(); // when the element is deselected, hide the width slider
      this.widthInput.hide(); // when the element is deselected, hide the width input
      this.heightSlider.hide();  // when the element is deselected, hide the height slider
      this.heightInput.hide(); // when the element is deselected, hide the height input
      this.resizeBtn.hide(); // when the element is deselected, hide the resize canvas toggle button
   };
   
   // Method for populating the options when the element is selected
   this.addOptions = function() {
      this.widthSlider.show(); // when the element is selected, show the width slider
      this.widthSlider.position(10, 10); // sets the position of the width slider
      this.widthSlider.style('width', '100px'); // adds a width styling to the width slider
      
      this.widthInput.show(); // when the element is selected, show the width input field
      this.widthInput.position(120, 10); // sets the position of the width input field
      this.widthInput.style('width', '30px').style('text-align', 'center'); // adds a width styling to the width input field and aligns the text of the input to the center
      
      this.heightSlider.show(); // when the element is selected, show the height slider
      this.heightSlider.position(170, 10); // sets the position of the height slider
      this.heightSlider.style('width', '100px'); // adds a width styling to the height slider
            
      this.heightInput.show(); // when the element is selected, show the height input field
      this.heightInput.position(280, 10); // sets the position of the height input field
      this.heightInput.style('width', '30px').style('text-align', 'center'); // adds a width styling to the height input field and aligns the text of the input to the center
      
      this.resizeBtn.show(); // when the element is selected, show the resize canvas toggle button
      this.resizeBtn.position(335, 10); // sets the position of the resize canvas toggle button
   };
}