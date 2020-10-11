// constructor function for the mirror pen tool
function SymmetryicalPen() {
   PenTool.call(this); // inherits all the methods and properties from the PenTool constructor
   
   this.icon = "graphics/mirrorDraw.png"; // Sets the image icon of the element
   this.name = "Pen Symmetry Tool"; // Gives a unique name to the element
   
   this.axis = "x"; // property that checks which axis is being mirrored (x or y), default axis is x
   this.lineOfSymmetry = width / 2; // property to check where the line of symmetry on the x axis is created (halfway across the screen)
   
   this.slider = createSlider(2, 50, 2); // Slider for the thickness of the pen

   this.pOppositeMouseOrigin = createVector(-1, -1); // This vector assigns the origin of the opposite mouse X and Y with an offset origin value/impossible value

   let self = this; // Stores this inside a variable allowing it to be accessible in the click handler as self

   // setup method
   this.setup = function() { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the input value as the slider value
      // if the axis changes to y, the line of symmetry changes to horizontal (height/2), otherwise it remains as vertical (width/2)
      this.axis == "y" ? (this.axis = "y", this.lineOfSymmetry = height / 2) : (this.axis = "x", this.lineOfSymmetry = width / 2);
   };
      
   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(HAND); // sets the cursor as a pointer/hand
      updatePixels(); // displays the last save state of pixels
      
      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         //check if either pMouseOrigin.x or pMouseOrigin.y, and pOppositeMouseOrigin.x or pOppositeMouseOrigin.y are -1. 
         //set them to the current mouse X and Y if they are as well as set the axis and line of symmetry.
         if (this.pMouseOrigin.x == -1) {
            this.pMouseOrigin.x = mouseX;
            this.pMouseOrigin.y = mouseY;
            this.pOppositeMouseOrigin.x = formulas.calculateOpposite(mouseX, "x", this.axis, this.lineOfSymmetry);
            this.pOppositeMouseOrigin.y = formulas.calculateOpposite(mouseY, "y", this.axis, this.lineOfSymmetry);
         }

         //if we already have values for pMouseOrigin.x & pMouseOrigin.y, and pOppositeMouseOrigin.x & pOppositeMouseOrigin.y we can draw a line from 
         //there to the current mouse location
         else {            
            strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
            strokeCap(ROUND); // sets the stroke cap as round
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a smooth marker line
            this.pMouseOrigin.x = mouseX; // resets the previous mouseX location to the current mouseX location
            this.pMouseOrigin.y = mouseY; // resets the previous mouseY location to the current mouseY location
            
            //these are for the mirrored drawing the other side of the line of symmetry
            let oppositeX = formulas.calculateOpposite(mouseX, "x", this.axis, this.lineOfSymmetry); // mirrored point of mouseX
            let oppositeY = formulas.calculateOpposite(mouseY, "y", this.axis, this.lineOfSymmetry); // mirrored point of mouseY
            strokeCap(ROUND); // sets the stroke cap as round
            stroke(palette.currentColour); // sets the stroke as the palette's current colour
            line(this.pOppositeMouseOrigin.x, this.pOppositeMouseOrigin.y, oppositeX, oppositeY); // draws a smooth marker line on the mirrored side
            this.pOppositeMouseOrigin.x = oppositeX; // resets the previous oppositemouseX location to the current opposite mouseX location
            this.pOppositeMouseOrigin.y = oppositeY; // resets the previous oppositemouseY location to the current opposite mouseY location
         }
      }
      //if the mouse isn't pressed reset the previous values to -1 (offet the canvas)
      else {
         this.pMouseOrigin.x = -1;
         this.pMouseOrigin.y = -1;

         this.pOppositeMouseOrigin.x = -1;
         this.pOppositeMouseOrigin.y = -1;
      }
      undoTask.undoAction();
      loadPixels(); // once the drawing has been done, save the pixel state. The line of symmetry shouldn't be part of the drawing

      push(); // pushes the drawing state to set the stroke weight and colour
      strokeWeight(3); // sets the stroke weight as 3
      strokeCap(ROUND); // sets the stroke cap as round
      stroke("black"); // sets the stroke as black
      // checks if the axis is either in x or y and draws their given line of symmetry
      if (this.axis == "x") {
         line(width / 2, 0, width / 2, height); // draws a vertical line by dividing the width by 2
      } else {
         line(0, height / 2, width, height / 2); // draws a horizontal line by dividing the height by 2
      }
      pop(); //return to the original stroke
   };

   // Method for unselecting the element
   this.unselectElement = function () {
      updatePixels(); // hides the line of symmetry and only shows the drawing
      this.axis = "x"; // sets the axis back to x as its default
      select(".selection").html(""); // clears the selection div container
      this.slider.hide(); // when the element is deselected, hide the slider
      this.input.hide(); // when the element is deselected, hide the input
   };

   //adds a button and click handler to the options area. When clicked
   //toggle the line of symmetry between horizonatl to vertical
   this.addOptions = function () {
      // selects the selection div class from html and assigns a toggle button to it
      select(".selection").html("<button id='directionButton'>Horizontal Line</button>");
      //click handler for the direction button
      select("#directionButton").mouseClicked(function () {
         let button = select("#" + this.elt.id); // stores the toggle button element inside a variable      
         self.axis == "x" ? (self.axis = "y", self.lineOfSymmetry = height / 2, button.html('Vertical Line')) : 
         (self.axis = "x", self.lineOfSymmetry = width / 2, button.html('Horizontal Line'));
         // if the current is x, it changes to to y along with the line of symmetry changing to horizontal and the button text change to 'Vertical Line',
         // otherwise the the axis remains as x with the vertical line of symmetry and the button text as 'Horizontal Line'
      });
      // Slider location
      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(50, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider
      
      // Input Box location
      this.input.show(); // when the element is selected, show the input field
      this.input.position(140, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center
   };
}