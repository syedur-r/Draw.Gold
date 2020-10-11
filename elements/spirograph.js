// Reference for spirograph: https://www.youtube.com/watch?v=f5QBExMNB1I&feature=youtu.be
// constuctor for the spirograph tool
function Spirograph() {
   this.icon = "graphics/spirographTool.png"; // Sets the image icon of the element
   this.name = "Spirograph Tool"; // Gives a unique name to the element
   
   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.size = createSlider(0.5, 1.75, 0.5, 0.05); // Creates a slider for the size of the spirograph, from the dom library
   this.input = createInput();  // Creates an input for the size value, from the dom library
   this.strokeWeight; // sets the stroke weight of the spirograph
   this.curves; // sets the curve complexity of the spirograph
   
   // An array of objects to store the curve complexity and the stroke weights of the spirographs
   this.spirographs = [
      {spirograph: 1.2, strokeWeight: 4},
      {spirograph: 2.4, strokeWeight: 4},
      {spirograph: 3.6, strokeWeight: 4},
      {spirograph: 1.3, strokeWeight: 4},
      {spirograph: 1.9, strokeWeight: 4},
      {spirograph: 2.9, strokeWeight: 4},
      {spirograph: 3.9, strokeWeight: 4}
   ];
   
   let self = this; // Stores this inside a variable for the toggle button click handler

   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
     this.input.value(this.size.value()); // Sets the size input value as the size slider value
   };
   
   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      
      cursor(HAND); // sets the cursor as a pointer/hand
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
            
         //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw a spirograph from 
         //there to the current mouse location      
         } else {
            updatePixels(); // Updates the display window with the data in the pixels array
            translate(mouseX, mouseY); // translates the shape so that it moves with the current mouseX and mouseY position
            push(); // push and pop contains the style settings of the spirograph
            noFill(); // removes any fill values
            strokeWeight(this.strokeWeight); // sets the stroke weight as the slider value
            strokeCap(ROUND); // sets the stroke cap as round
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            rotate(frameCount / 100); // rotates the spirograph by the number of frames displayed since drawn
            this.createSpirograph(200, this.size.value(), this.size.value()); // calls the createSpirograph method to create the spirograph with the
            // radius set as 200 and both the X and Y sizes set as the slider value
            pop();
         }

      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the spirograph is set to false as the mouse state is released off the canvas
      }
   };
   
   // Method for creating the spirograph
   this.createSpirograph = function(radius, xSize, ySize) {
      beginShape(); // starts the shape
      // loops through 2PI which is a perfect circle & multiplies the edges by 10
      // the angle of the circle increments by 0.02 as followed by the mathematical roses algorithm
      for (let angle = 0; angle < TWO_PI * 10; angle += 0.02) {
         let spiroRadius = createVector(
            radius * cos((this.curves * angle)) * cos(angle) * xSize, // Creates a vector to store the X and Y coordinates of the vertices
            radius * cos((this.curves * angle)) * sin(angle) * ySize  // calculates the complexity of the curves by using the sine and cosine functions
         );
         vertex(spiroRadius.x, spiroRadius.y); // draw a vertex for each angle of the spirograph
      }
      endShape(CLOSE); // ends the shape ensuring all vertices are connected
   };

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      this.complexity.remove(); // when the element is deselected, dispose of the dropdown menu
      this.input.hide(); // when the element is deselected, hide the size input
      this.size.hide(); // when the element is deselected, hide the size slider
      this.strokeWeight = 0; // resets the stroke weight to 0, to stop drawing any spirographs
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {
      this.size.hide(); // hides the size slider and only shows it when the dropdown option is selected
      this.size.position(210, 10); // sets the position of the size slider
      this.size.style('width', '100px'); // adds a width styling to the size slider
      
      this.input.hide(); // hides the size input and only shows it when the dropdown option is selected
      this.input.position(325, 10); // sets the position of the size input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the size input field and aligns the text of the input to the center

      this.complexity = createSelect(); // creates a new drop down selection
      this.complexity.position(20, 10); // sets the position of the drop down selection
      this.complexity.option('Please select a spirograph'); // adds a please select option at the beginning of the dropdown list
      this.complexity.option('Spirograph 1');
      this.complexity.option('Spirograph 2');
      this.complexity.option('Spirograph 3');
      this.complexity.option('Spirograph 4'); // adds all the spirograph options so the curve complexity changes when selected
      this.complexity.option('Spirograph 5');
      this.complexity.option('Spirograph 6');
      this.complexity.option('Spirograph 7');
      
      // changed handler when an option is selected from the drop down list
      this.complexity.changed(function () {
         let options = self.complexity.value(); // stores all the dropdown list options inside of variable
               
         // loops through the length of the spirographs array of objects
         for (let i = 0; i < self.spirographs.length; i++) {
            // switch statement for switching between the dropdown options
            switch(options) {
               case 'Spirograph 1': // checks if the spirograph 1 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 1 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 1 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 1.2) self.curves = self.spirographs[i].spirograph; 
                  self.size.show(); // displays the size input when spirograph 1 has been selected
                  self.input.show(); // displays the size slider when spirograph 1 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 2': // checks if the spirograph 2 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 2 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 2 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 2.4) self.curves = self.spirographs[i].spirograph; 
                  self.size.show(); // displays the size input when spirograph 2 has been selected
                  self.input.show(); // displays the size slider when spirograph 2 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 3': // checks if the spirograph 3 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 3 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 3 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 3.6) self.curves = self.spirographs[i].spirograph; 
                  self.size.show(); // displays the size input when spirograph 3 has been selected
                  self.input.show(); // displays the size slider when spirograph 3 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 4': // checks if the spirograph 4 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 4 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 4 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 1.3) self.curves = self.spirographs[i].spirograph;  
                  self.size.show(); // displays the size input when spirograph 4 has been selected
                  self.input.show(); // displays the size slider when spirograph 4 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 5': // checks if the spirograph 5 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 5 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 5 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 1.9) self.curves = self.spirographs[i].spirograph;  
                  self.size.show(); // displays the size input when spirograph 5 has been selected
                  self.input.show(); // displays the size slider when spirograph 5 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 6': // checks if the spirograph 6 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 6 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 6 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 2.9) self.curves = self.spirographs[i].spirograph; 
                  self.size.show(); // displays the size input when spirograph 6 has been selected
                  self.input.show(); // displays the size slider when spirograph 6 has been selected
                  break; // breaks out of the case condition
               case 'Spirograph 7': // checks if the spirograph 7 option has been selected   
                  self.strokeWeight = self.spirographs[i].strokeWeight; // assigns the stroke weight of spirograph 7 from the array of objects
                  // checks if the spirographs array of objects has the curve complexity of the spirograph 7 and assigns it on the curves property
                  if (self.spirographs[i].spirograph == 3.9) self.curves = self.spirographs[i].spirograph;  
                  self.size.show(); // displays the size input when spirograph 7 has been selected
                  self.input.show(); // displays the size slider when spirograph 7 has been selected
                  break; // breaks out of the case condition
               default: // sets the default option before any other option is selected
                  self.strokeWeight = 0; // sets the stroke weight as 0, to stop drawing any spirographs
                  self.size.hide(); // hides the size slider by default
                  self.input.hide(); // hides the size input by default
            }
         }
      });
   };
}