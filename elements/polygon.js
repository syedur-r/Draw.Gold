// Reference: https://p5js.org/examples/form-regular-polygon.html
// constructor for polygon tool
function Polygon() {
   this.icon = "graphics/polygonTool.png"; // Sets the image icon of the element
   this.name = "Polygon Tool"; // Gives a unique name to the element
   
   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.edges; // Number of edges of the shape
   this.rotation; // Allows the shape to be rotated to its origin
   
   this.drawing = false; // This boolean variable sets the default state of drawing the polygon to false as the mouse state is released off the canvas
   this.selectorMode = false; // Boolean variable for the stroke/fill selector
   
   this.size = createSlider(20, 400, 10, 1); // Creates a slider for the size of the polygons, from the dom library
   this.input = createInput(); // Creates an input for the size value, from the dom library
   this.stroke = createSlider(2, 50, 2); // Creates a slider for the stroke weight of the polygons, from the dom library
   this.strokeInput = createInput(); // Creates an input for the stroke weight value, from the dom library

   // An array of objects to store the number of edges and origin of all the polygons
   this.polygons = [
      {pentagon: 5, shapeOrigin: 60.0}, // pentagon
      {hexagon: 6, shapeOrigin: 0}, // hexagon
      {heptagon: 7, shapeOrigin: PI/14.0}, // ShapeOrigin of the heptagon divides PI by double the number of edges
      {octagon: 8, shapeOrigin: PI/8.0} // ShapeOrigin of the octagon divides PI by the number of edges
   ];
   
   let self = this; // Stores this inside a variable for the toggle button click handler
      
   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.size.value()); // Sets the size input value as the size slider value
      this.strokeInput.value(this.stroke.value()); // Sets the stroke weight input value as the stroke slider value
   };
   
   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      
      cursor(CROSS); // Sets the cursor as a cross
      undoTask.undoAction();

      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         // Checks if stroke selector is false (stroke button has been clicked)
         if (this.selectorMode == false) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1. 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
            
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw a polygon from 
            //there to the current mouse location   
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the polygon
               noFill(); // removes the fill values
               strokeWeight(this.stroke.value()); // sets the stroke weight as the slider value
               strokeCap(ROUND); // sets the stroke cap as round
               stroke(palette.currentColour); // sets the stroke as the palette's current colour
               translate(mouseX, mouseY); // translates the shape so that it moves with the current mouseX and mouseY position
               rotate(this.rotation); // rotates the polygon based on the dropdown options selected, as each polygon has a different rotation
               this.createShape(this.size.value(), this.edges); // calls the createShape method to create the polygon with the
               // size set as the slider value and the edges set as the edges selected from the dropdown options
               pop();
            }
         }

         // Checks if stroke selector is true (fill button has been clicked)
         if (this.selectorMode == true) {
            //check if either mouseOrigin.x or mouseOrigin.y are -1. 
            //set them to the current mouse X and Y if they are.
            if (this.mouseOrigin.x == -1) {
               this.mouseOrigin.y = mouseY;
               this.mouseOrigin.x = mouseX;
               this.drawing = true; // Sets the drawing state to true
               loadPixels(); // Loads the pixel data of the current display window into the pixels array
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the polygon
               noStroke(); // removes any stroke values
               fill(palette.currentColour); // sets the fill as the palette's current colour
               translate(mouseX, mouseY); // translates the shape so that it moves with the current mouseX and mouseY position
               rotate(this.rotation); // rotates the polygon based on the dropdown options selected, as each polygon has a different rotation
               this.createShape(this.size.value(), this.edges); // calls the createShape method to create the polygon with the
               // size set as the slider value and the edges set as the edges selected from the dropdown options
               pop();
            }
         }

      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the polygon is set to false as the mouse state is released off the canvas
      }
   };
   
   // Method for creating the polygon shapes
   this.createShape = function(size, edges) {
      beginShape(); // starts the shape
      // loops through 2PI which is a perfect circle, and increments by dividing the circle by the number of edges to give the polygon shape
      for (let i = 0; i < TWO_PI; i += TWO_PI / edges) {
         let polyonPos = createVector(cos(i) * size, sin(i) * size); // creates a vector to store the X and Y edges of the polygon 
         // and multiplies it by the size argument (the slider value)
         vertex(polyonPos.x, polyonPos.y); // creates a vertex for the number of edges of each polygon
      }
      endShape(CLOSE); // ends the shape ensuring all vertices are connected
   };

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      this.polygonSelection.remove(); // when the element is deselected, dispose of the dropdown menu
      select(".selection").html(""); // clears the selection element from html
      this.size.hide(); // when the element is deselected, hide the size slider
      this.input.hide(); // when the element is deselected, hide the size input field
      this.stroke.hide(); // when the element is deselected, hide the stroke weight slider
      this.strokeInput.hide(); // when the element is deselected, hide the stroke weight input field
      this.edges = 0; // resets the number of edges of the shape to 0, to stop drawing any shapes
      this.selectorMode = false; // resets the selector mode as false to set stroke as default
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {
      // selects the selection div class from html and assigns a button to it
      select(".selection").html("<button id='selectorBtn'>Fill</button>");
      //click handler selector button
      select("#selectorBtn").mouseClicked(function () {
         let selectorBtn = select("#" + this.elt.id); // stores the button element inside a variable
         // sets the button html as 'Fill' when stroke is selected, and displays both the stroke slider and stroke input field
         self.selectorMode ? (self.selectorMode = false, selectorBtn.html('Fill'), self.stroke.show(), self.strokeInput.show()) : 
         // otherwise sets the button html as 'Stroke' when fill is selected, and hides both the stroke slider and stroke input field
         (self.selectorMode = true, selectorBtn.html('Stroke'), self.stroke.hide(), self.strokeInput.hide());
      });
            
      this.size.hide(); // hides the size slider and only shows it when the dropdown option is selected
      this.size.position(235, 10); // sets the position of the size slider
      this.size.style('width', '80px'); // adds a width styling to the size slider

      this.input.hide(); // hides the size input and only shows it when the dropdown option is selected
      this.input.position(335, 10); // sets the position of the size input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the size input field and aligns the text of the input to the center
      
      this.stroke.hide(); // hides the stroke weight slider and only shows it when the dropdown option is selected
      this.stroke.position(390, 10); // sets the position of the stroke weight slider
      this.stroke.style('width', '80px'); // adds a width styling to the stroke weight slider

      this.strokeInput.hide(); // hides the stroke weight input and only shows it when the dropdown option is selected
      this.strokeInput.position(490, 10); // sets the position of the stroke weight input field
      this.strokeInput.style('width', '30px').style('text-align', 'center'); // adds a width styling to the stroke weight input field and aligns the text of the input to the center

      this.polygonSelection = createSelect(); // creates a new drop down selection
      this.polygonSelection.position(20, 10); // sets the position of the drop down selection
      this.polygonSelection.option('Please select a polygon shape'); // adds a please select option at the beginning of the dropdown list
      this.polygonSelection.option('Pentagon');
      this.polygonSelection.option('Hexagon'); // adds all the shape options so the number of edges change when selected
      this.polygonSelection.option('Heptagon');
      this.polygonSelection.option('Octagon');

      // changed handler when an option is selected from the drop down list
      this.polygonSelection.changed(function () {
         let options = self.polygonSelection.value(); // stores all the dropdown list options inside of variable

         // loops through the length of the polygons array of objects
         for (let i = 0; i < self.polygons.length; i++) {
            // switch statement for switching between the dropdown options
            switch (options) {
               case 'Pentagon': // checks if the pentagon option has been selected
                  self.size.show(); // displays the size slider when pentagon has been selected
                  self.input.show(); // displays the size input when pentagon has been selected
                  self.stroke.show(); // displays the stroke weight slider when pentagon has been selected
                  self.strokeInput.show(); // displays the stroke weight input when pentagon has been selected
                  // checks if the polygons array of objects has the shapeOrigin of the pentagon and assigns it on the rotation property
                  if (self.polygons[i].shapeOrigin == 60.0) self.rotation = self.polygons[i].shapeOrigin;
                  // checks if the polygons array of objects has the edges of the pentagon and assigns it on the edges property
                  if (self.polygons[i].pentagon == 5) self.edges = self.polygons[i].pentagon;
                  break; // breaks out of the case condition
               case 'Hexagon': // checks if the hexagon option has been selected
                  self.size.show(); // displays the size slider when hexagon has been selected
                  self.input.show(); // displays the size input when hexagon has been selected
                  self.stroke.show(); // displays the stroke weight slider when hexagon has been selected
                  self.strokeInput.show(); // displays the stroke weight input when hexagon has been selected
                  // checks if the polygons array of objects has the shapeOrigin of the hexagon and assigns it on the rotation property
                  if (self.polygons[i].shapeOrigin == 0) self.rotation = self.polygons[i].shapeOrigin;
                  // checks if the polygons array of objects has the edges of the hexagon and assigns it on the edges property
                  if (self.polygons[i].hexagon == 6) self.edges = self.polygons[i].hexagon;
                  break; // breaks out of the case condition
               case 'Heptagon': // checks if the heptagon option has been selected
                  self.size.show(); // displays the size slider when heptagon has been selected
                  self.input.show(); // displays the size input when heptagon has been selected
                  self.stroke.show(); // displays the stroke weight slider when heptagon has been selected
                  self.strokeInput.show(); // displays the stroke weight input when heptagon has been selected
                  // checks if the polygons array of objects has the shapeOrigin of the heptagon and assigns it on the rotation property
                  if (self.polygons[i].shapeOrigin == PI/14.0) self.rotation = self.polygons[i].shapeOrigin;
                  // checks if the polygons array of objects has the edges of the heptagon and assigns it on the edges property
                  if (self.polygons[i].heptagon == 7) self.edges = self.polygons[i].heptagon;
                  break; // breaks out of the case condition
               case 'Octagon': // checks if the octagon option has been selected
                  self.size.show(); // displays the size slider when octagon has been selected
                  self.input.show(); // displays the size input when octagon has been selected
                  self.stroke.show(); // displays the stroke weight slider when octagon has been selected
                  self.strokeInput.show(); // displays the stroke weight input when octagon has been selected
                  // checks if the polygons array of objects has the shapeOrigin of the octagon and assigns it on the rotation property
                  if (self.polygons[i].shapeOrigin == PI/8.0) self.rotation = self.polygons[i].shapeOrigin;
                  // checks if the polygons array of objects has the edges of the octagon and assigns it on the edges property
                  if (self.polygons[i].octagon == 8) self.edges = self.polygons[i].octagon;
                  break; // breaks out of the case condition
               default: // sets the default option before any other option is selected
                  self.edges = 0; // sets the number of edges of the shape as 0, to stop drawing any shapes
                  self.size.hide(); // hides the size slider by default
                  self.input.hide(); // hides the size input by default
                  self.stroke.hide(); // hides the stroke weight slider by default
                  self.strokeInput.hide(); // hides the stroke weight input by default
            }
         }
      });
   };
}