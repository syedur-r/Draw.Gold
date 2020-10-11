// constructor for the pencil tool
function Pencil() {
   this.icon = "graphics/pencilTool.png"; // Sets the image icon of the element
   this.name = "Pencil Tool"; // Gives a unique name to the element

   //to smoothly draw we'll draw a line from the previous mouse location
   //to the current mouse location. The following values store
   //the locations from the last frame. They are -1 to start with as an offset value
   //because we haven't started drawing yet.
   this.pMouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value 

   // setup method
   this.setup = function() { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(HAND); // Sets the cursor as a pointer/hand
   };
   
   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      undoTask.undoAction();
      // checks if the mouse is pressed within the canvas bounds using the helper function
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         //check if either pMouseOrigin.x or pMouseOrigin.y are -1. 
         //set them to the current mouse X and Y if they are.
         if (this.pMouseOrigin.x == -1) {
            this.pMouseOrigin.x = mouseX;
            this.pMouseOrigin.y = mouseY;
         }
         //if we already have values for pMouseOrigin.x and pMouseOrigin.y we can draw a line from 
         //there to the current mouse location
         else {
            strokeWeight(2); // sets the stroke weight as 2
            strokeCap(ROUND); // sets the stroke cap as round
            line(this.pMouseOrigin.x, this.pMouseOrigin.y, mouseX, mouseY); // draws a pencil line
            this.pMouseOrigin.x = mouseX; // resets the previous mouseX location to the current mouseX location
            this.pMouseOrigin.y = mouseY; // resets the previous mouseY location to the current mouseY location
            
         }
      }
      // if the user has released the mouse, pMouseOrigin.x and pMouseOrigin.y are set back to -1.
      else {
         this.pMouseOrigin.x = -1;
         this.pMouseOrigin.y = -1;
      }
   };
}