// Reference: https://p5js.org/examples/form-star.html
// constructor for star tool
function Star() {
   this.icon = "graphics/starTool.png"; // Sets the image icon of the element
   this.name = "Star Tool"; // Gives a unique name to the element
   
   this.size = createSlider(0.5, 6, 0.5, 0.1); // Creates a slider for the size of the star, from the dom library
   this.input = createInput(); // Creates an input for the size value, from the dom library
   this.stroke = createSlider(2, 50, 2); // Creates a slider for the stroke weight of the star, from the dom library
   this.strokeInput = createInput(); // Creates an input for the stroke weight value, from the dom library
   
   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.drawing = false; // This boolean variable sets the default state of drawing the ellipse to false as the mouse state is released off the canvas
   this.selectorMode = false; // Boolean variable for the stroke/fill selector

   let self = this; // Stores this inside a variable for the toggle button click handler

   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.size.value()); // Sets the size input value as the size slider value
      this.strokeInput.value(this.stroke.value()); // Sets the stroke weight input value as the stroke slider value
      // displays the stroke slider and input when stroke is selected, otherwise the stroke slider and input are hidden
      this.selectorMode == false ? (this.stroke.show(), this.strokeInput.show()) : (this.stroke.hide(), this.strokeInput.hide());
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
               
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an ellipse from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the star
               noFill(); // removes the fill values
               strokeWeight(this.stroke.value()); // sets the stroke weight as the slider value
               strokeCap(ROUND); // sets the stroke cap as round
               stroke(palette.currentColour); // sets the stroke as the palette's current colour
               translate(mouseX, mouseY); // translates the shape so that it moves with the current mouseX and mouseY position
               rotate(60.0); // rotates the star by 60 degrees
               this.starShape(); // calls the star method
               pop(); // restores the translation back to its original transformation state
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
               
            //if we already have values for mouseOrigin.x and mouseOrigin.y we can draw an ellipse from 
            //there to the current mouse location
            } else {
               updatePixels(); // Updates the display window with the data in the pixels array
               push(); // push and pop contains the style settings of the star
               noStroke(); // removes the stroke values
               fill(palette.currentColour); // sets the fill as the palette's current colour
               translate(mouseX, mouseY); // translates the shape so that it moves with the current mouseX and mouseY position
               rotate(60.0); // rotates the star by 60 degrees
               this.starShape(); // calls the star method
               pop(); // restores the translation back to its original transformation state
            }
         }

      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the star is set to false as the mouse state is released off the canvas
      }
   };
   
   // method for creating the star shape
   this.starShape = function () {
      this.edges = TWO_PI / 5; // defines the number of edges of a standard star, by dividing TWO_PI by 5
      beginShape(); // begins the vertices
      for (let i = 0; i < TWO_PI; i += this.edges) {
         let starPos = createVector(cos(i) * 70, sin(i) * 70); // creates a vector to store the first x and y vertices by calculating the sin and cos angles
         // and multiplying them by the radius 1 value (70)
         vertex(starPos.x * this.size.value(), starPos.y * this.size.value()); // plugs in the x and y vector values inside of the first vertices function
         starPos.x = cos(formulas.calculateAverage(i, this.edges)) * 30; // reassigns vector x with the second x vertices by calculating the cos angle
         starPos.y = sin(formulas.calculateAverage(i, this.edges)) * 30; // reassigns vector y with the second y vertices by calculating the sin angle
         // calculates the average of i and the number of edges, and multiplies them by the radius 2 value (30)
         vertex(starPos.x * this.size.value(), starPos.y * this.size.value()); // plugs in the x and y vector values inside of the second vertices function
      }
      endShape(CLOSE); // ends the vertics ensuring they close and have all edges connected
   }

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      select(".selection").html(""); // clears the selection element from html
      this.selectorMode = false; // sets the stroke/fill selector state to fal
      this.size.hide(); // hides the size slider
      this.input.hide(); // hides the size input 
      this.stroke.hide(); // hides the stroke slider
      this.strokeInput.hide(); // hides the stroke input 
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

      this.size.show(); // when the element is selected, show the size slider
      this.size.position(50, 10); // sets the position of the size slider
      this.size.style('width', '80px'); // adds a width styling to the size slider

      this.input.show(); // when the element is selected, show the size input field
      this.input.position(140, 10); // sets the position of the size input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the size input field and aligns the text of the input to the center
      
      this.stroke.show(); // when the element is selected, show the stroke slider
      this.stroke.position(200, 10); // sets the position of the stroke slider
      this.stroke.style('width', '80px'); // adds a width styling to the stroke slider

      this.strokeInput.show(); // when the element is selected, show the stroke input field
      this.strokeInput.position(290, 10); // sets the position of the stroke input field
      this.strokeInput.style('width', '30px').style('text-align', 'center'); // adds a width styling to the stroke input field and aligns the text of the input to the center
   };   
}