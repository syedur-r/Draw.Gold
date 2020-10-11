// constructor for the gausian blur and invert colours tool
function GaussianBlur() {
   this.icon = "graphics/gaussianBlur.png"; // Sets the image icon of the element
   this.name = "Gaussian Blur Tool"; // Gives a unique name to the element
   
   this.pMouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.slider = createSlider(0, 10, 0, 1); // Creates a slider from the dom library
   this.input = createInput(); // creates an input field from the dom library
   this.blurBtn = createButton('Apply Blur'); // creates a blur toggle button from the dom library
   this.invertColoursBtn = createButton('Invert Colours'); // creates a invert colours toggle button from the dom library
   
   let self = this; // stores this inside of a variable to be used in the click handlers for the toggle button

   // setup method
   this.setup = function() { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
   };
   
   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(ARROW); // Sets the cursor as an arrow
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent)) {
         // click handler for the mouse click of the blur toggle button
         this.blurBtn.mouseClicked(function () {
            filter(BLUR, self.slider.value()); // sets the slider value as the gaussian blur value
         });
         // click handler for the mouse click of the invert colours toggle button
         // Reference: https://learn.gold.ac.uk/mod/page/view.php?id=761417
         this.invertColoursBtn.mouseClicked(function () {
            loadPixels(); // Saves the current pixel data into the pixel array
            // loops through the entire pixel array
            for (let i = 0; i < pixels.length; i++) {
               // ignores the first 3 pixel entries (which correspond to the rgb values ) and only checks every fourth pixel entry (corresponding to the alpha value)
               if ((i+1) % 4 != 0) {
                  // inverts every fourth pixel colour
                  pixels[i] = 255 - pixels[i];
               }
            }
            updatePixels(); // updates the pixel data
         });
      }
   };

   // Method for unselecting the element
   this.unselectElement = function () {
      this.slider.hide(); // when the element is deselected, hide the slider
      this.input.hide(); // when the element is deselected, hide the input
      this.blurBtn.hide(); // when the element is deselected, hide the blur toggle button
      this.invertColoursBtn.hide(); // when the element is deselected, hide invert colours toggle button
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {
      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(10, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider

      this.input.show(); // when the element is selected, show the input field
      this.input.position(100, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center

      this.blurBtn.show(); // when the element is selected, show the blur toggle button
      this.blurBtn.position(170, 10); // sets the position of the blur toggle button

      this.invertColoursBtn.show(); // when the element is selected, show the invert colours toggle button
      this.invertColoursBtn.position(270, 10); // sets the position of the invert colours toggle button
   };   
}