// Example Extension - AMMENDMENTS HAVE BEEN MADE BY USING 2D ARRAYS, STROKE/FILL SELECTOR AND DOM INTERACTION

// Constructor for editable shapes
function FreeHandShape() {
   this.icon = "graphics/freeHandShape.png"; // Sets the image icon of the element
   this.name = "Free Hand Shape"; // Gives a unique name to the element

   this.slider = createSlider(2, 20, 2); // Creates a slider for the stroke weight of the editable shape, from the dom library
   this.input = createInput();  // Creates an input for the stroke weight value, from the dom library
   
   this.selectorMode = false; // Boolean variable for the stroke/fill selector

   this.editMode = false; // Boolean variable for editing the shape or adding vertices
   this.currentShape = []; // Array stores all mouseX and mouseY vertices
   
   let self = this; // Stores this inside a variable for the toggle button click handler

   /* STEPS
      1. Plot out a shape as a series of vertices
            - Add a button for switching between creating new vertices and editing vertices
            - Click the canvas to add a vertex
            - Don't draw right away, add vertex to an array the draw but don't save to the canvas

      2. Edit the vertices using a mouse drag
            - If editing is on
            - Highlight the location of the vertices
            - When mouse pressed is near vertex (using the dist) update the vertex x and y with the mouseX and mouseY

      3. Confirm the final shape
   */
   
   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.input.value(this.slider.value()); // Sets the size input value as the size slider value
      // displays the stroke slider and input when stroke is selected, otherwise the stroke slider and input are hidden
      this.selectorMode == false ? (this.slider.show(), this.input.show()) : (this.slider.hide(), this.input.hide());
   };   

   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      
      updatePixels(); // Updates the display window with the data in the pixels array (doesn't get back the previously stored shape)
      
      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         // checks if the edit toggle button has not been pressed (editing is off)
         if (!this.editMode) {
            this.currentShape.push([mouseX, mouseY]); // stores the mouseX and mouseY coordinates as an array inside of the currentShape array
         
         // checks otherwise if the edit toggle button has been pressed (editing is on)
         } else {
            // loops through the length currentShape array and checks for inner array
            for (let i = 0; i < this.currentShape.length; i++) {
               // loops through the length of the array inside of the currentShape array and checks for each mouse position
               for (let j = 0; j < this.currentShape[i].length; j++) {
                  // checks if the mouseX and mouseY position is near the currentShape mouseX and mouseY position
                  if (dist(this.currentShape[i][j], this.currentShape[i][j+1], mouseX, mouseY) < 15) {
                     this.currentShape[i][j] = mouseX; // updates the mouseX position as the currentShape mouseX position
                     this.currentShape[i][j+1] = mouseY; // updates the mouseY position as the currentShape mouseY position
                  }
               }
            }
         }
      }
      
      // Checks if stroke selector is false (stroke button has been clicked)
      if (this.selectorMode == false) {
         push(); // push contains the stroke settings of the editable shape
         strokeWeight(this.slider.value()); // sets the stroke weight as the slider value
         strokeCap(ROUND); // sets the stroke cap as round
         noFill(); // removes any filling of the shape
         stroke(palette.currentColour); // sets the stroke as the palette's current colour
         beginShape(); // starts the shape
         // loops through the length currentShape array and checks for inner array
         for (let i = 0; i < this.currentShape.length; i++) {
            // loops through the length of the array inside of the currentShape array and checks for each current mouse position
            for (let j = 0; j < this.currentShape[i].length; j++) {
               vertex(this.currentShape[i][j], this.currentShape[i][j+1]); // draws a vertex for each current mouseX and mouseY position
               // checks if the shape is in editmode (edit button has been clicked)
               if (this.editMode) {
                  push(); // contains the style settings of the editing ellipse
                  let x = 20; // stores the current editing ellipse xSize
                  let y = 20; // stores the current editing ellipse ySize
                  fill('rgb(0,255,0)'); // sets the colour of the editing ellipse
                  noStroke(); // removes any strokes of the ellipse
                  ellipseMode(CENTER); // allows the mouse to move the editing ellipse from its center
                  this.slider.value() >= 10 && this.slider.value() <= 20 ? (x += 20, y += 20) : (x = 20, y = 20); // Ternary operator to check if the stroke weight has exceeded 10 or is below 20 to increment the ellipse size, otherwise the size remains as 20 
                  ellipse(this.currentShape[i][j], this.currentShape[i][j+1], x, y); // creates a movable ellipse to show the user where to find the vertex
                  pop(); // restores the original settings
               }
            }
         }
         endShape(); // ends the shape
         pop(); // restores the original setting of the shape
      }
      
      // Checks if stroke selector is true (fill button has been clicked)
      if (this.selectorMode == true) {
         push(); // push contains the fill settings of the editable shape
         noStroke(); // removes any strokes of the shape
         fill(palette.currentColour); // sets the fill as the palette's current colour
         beginShape(); // starts the shape
         // loops through the length currentShape array and checks for inner array
         for (let i = 0; i < this.currentShape.length; i++) {
            // loops through the length of the array inside of the currentShape array and checks for each current mouse position
            for (let j = 0; j < this.currentShape[i].length; j++) {
               vertex(this.currentShape[i][j], this.currentShape[i][j+1]); // draws a vertex for each current mouseX and mouseY position
               // checks if the shape is in editmode (edit button has been clicked)
               if (this.editMode) {
                  push(); // contains the style settings of the editing ellipse
                  fill('rgb(0,255,0)'); // sets the colour of the editing ellipse
                  noStroke(); // removes any strokes of the ellipse
                  ellipseMode(CENTER); // allows the mouse to move the editing ellipse from its center
                  ellipse(this.currentShape[i][j], this.currentShape[i][j+1], 30, 30); // creates a movable ellipse to show the user where to find the vertex
                  pop(); // restores the original settings
               }
            }
         }
         endShape(); // ends the shape
         pop(); // restores the original setting of the shape
      }
   };

   // Method for unselecting the element and clearing the options
   this.unselectElement = function () {
      this.slider.hide(); // hides the slider
      this.input.hide(); // hides the input
      select(".selection").html(""); // clears the selection for the stroke/fill selector
      select(".selection2").html(""); // clears the selection for switching between edit/add vertices
      select(".selection3").html(""); // clears the selection for the finish button
      this.editMode = false; // resets the editmode as false since nothing will be edited
      this.currentShape = []; // empties the currentShape array as we don't want any current vertices to be stored
      this.draw(); // calls the draw method again
      this.selectorMode = false; // resets the selectorMode as false so it's set as stroke by default
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {
      cursor(CROSS); // sets the cursor as a cross
      // selects the selection div class from html and assigns a button to it
      select(".selection").html("<button id='selectorBtn'>Fill</button>");
      //click handler for the selector button
      select("#selectorBtn").mouseClicked(function () {
         let selectorBtn = select("#" + this.elt.id); // stores the button element inside a variable
         // sets the button html as 'Fill' when stroke is selected, otherwise sets the button html as 'Stroke'
         self.selectorMode ? (self.selectorMode = false, selectorBtn.html('Fill')) : (self.selectorMode = true, selectorBtn.html('Stroke'));
      });
      
      // selects the selection2 div class from html and assigns a button to it
      select(".selection2").html("<button id='editBtn'>Edit</button>");
      //sets the position of the edit button
      select("#editBtn").position(210, 10);
      //click handler for the edit button
      select("#editBtn").mouseClicked(function () {
         let editBtn = select("#" + this.elt.id); // stores the button element inside a variable
         // checks if the shape is in editmode, if it isn't then the button will say 'Edit'
         self.editMode ? (self.editMode = false, editBtn.html('Edit'), cursor(CROSS)) : 
         // otherwise if the button is in editmode, the button will say 'Add Vertices' and the background colour will change to green
         // to show that the shape is being edited
         (self.editMode = true, editBtn.style('background-color','rgb(0,255,0)').style('border-color','rgb(0,255,0)').style('border-radius','3px'), 
          editBtn.html('Add Vertices'), 
          cursor(ARROW)); // sets the cursor as an arrow when editing the vertices
      });

      // selects the selection3 div class from html and assigns a button to it
      select(".selection3").html("<button id='finishBtn'>Finish</button>");
      //sets the position of the finish button
      select("#finishBtn").position(310, 10);
      //click handler for the finish button
      select("#finishBtn").mouseClicked(function () {
         self.editMode = false; // when the finish button is clicked, editmode will be reset to false
         select(".selection").html("<button id='editBtn'>Edit</button>"); // switches the edit button back to 'Edit' in case it says 'Add Vertices'
         self.draw(); // calls the draw method again
         self.addOptions(); // calls the addOptions method again to populate the options
         loadPixels(); // Loads the pixel data of the current display window into the pixels array (saves the current state of the canvas)
         self.currentShape = []; // empties the currentShape array
         self.selectorMode = false; // resets the selectorMode as false so it's set as stroke by default
         cursor(CROSS); // sets the cursor as a cross to represent adding a new shape
      });
      
      this.slider.show(); // when the element is selected, show the slider
      this.slider.position(50, 10); // sets the position of the slider
      this.slider.style('width', '80px'); // adds a width styling to the slider

      this.input.show(); // when the element is selected, show the input field
      this.input.position(140, 10); // sets the position of the input field
      this.input.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center
   };
}