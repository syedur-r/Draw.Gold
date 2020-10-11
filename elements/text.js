// constructor for the text tool
function Text() {
   this.icon = "graphics/textTool.png"; // Sets the image icon of the element
   this.name = "Text Tool"; // Gives a unique name to the element

   this.mouseOrigin = createVector(-1, -1); // This vector assigns the origin of mouse X and Y with an offset origin value/impossible value
   this.label = createElement('h1'); // Creates a HTML5 h1 element using the p5.dom.js library
   this.size = createSlider(15, 200, 15, 1); // Creates a slider from the dom library
   this.sizeInput = createInput(); // Creates an input from the dom library
   this.inputbox = createInput(); // Creates the input box for the text content
   this.drawing = false; // This boolean variable sets the default state of drawing the line to false as the mouse state is released on the canvas

   let acme = loadFont('fonts/acme.ttf'); // loads the acme fontstyle from the directory
   let anton = loadFont('fonts/anton.ttf'); // loads the anton fontstyle from the directory
   let balsamiq = loadFont('fonts/balsamiq.ttf'); // loads the balsamiq fontstyle from the directory
   let courgette = loadFont('fonts/courgette.ttf'); // loads the courgette fontstyle from the directory
   let kaushanScript = loadFont('fonts/kaushanScript.ttf'); // loads the kaushan script fontstyle from the directory
   let montserrat = loadFont('fonts/montserrat.ttf'); // loads the montserrat fontstyle from the directory
   let righteous = loadFont('fonts/righteous.ttf'); // loads the righteous fontstyle from the directory
   let satisfy = loadFont('fonts/satisfy.ttf'); // loads the satisfy fontstyle from the directory
   let currentFont = acme; // sets the current font style

   let self = this; // stores this into a variable for DOM event handlers

   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      this.sizeInput.value(this.size.value()); // Sets the input value as the slider value
      cursor(ARROW); // Sets the cursor as an arrow
   };

   this.draw = function () { //This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      undoTask.undoAction();
      
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
            push(); // push and pop contains the settings of the text
            // setting the text style, colour and size as well as the location
            noStroke();
            fill(palette.currentColour);
            textSize(this.size.value());
            textFont(currentFont);
            textAlign(CENTER);
            text(this.inputbox.value(), mouseX, mouseY + 10);
            pop();
         }
      } else if (this.drawing) {
         this.drawing = false;
         this.mouseOrigin.x = -1;
         this.mouseOrigin.y = -1;
         // If nothing is drawn on the canvas, the origin of mouse X and Y  is set to -1 (off the canvas) and the default state of drawing the line is set to false as the mouse state is released on the canvas
      }
   };

   // Method for unselecting the element
   this.unselectElement = function () {
      this.size.hide(); // hides the slider
      this.sizeInput.hide(); // hides the input field
      this.label.hide(); // hides the label
      this.inputbox.hide(); // hides the input box
      this.fontSelector.remove(); // removes the drop down selection
      currentFont = acme; // resets the current font style
   };

   // Method for populating the options when the element is selected
   this.addOptions = function () {

      this.fontSelector = createSelect(); // creates a drop down selection
      this.fontSelector.position(400, 10); // sets the position of the drop down selection
      this.fontSelector.option('Acme');
      this.fontSelector.option('Anton');
      this.fontSelector.option('Balsamiq');
      this.fontSelector.option('Courgette');
      this.fontSelector.option('Kaushan Script'); // adds all the shape options so the number of edges change when selected
      this.fontSelector.option('Montserrat');
      this.fontSelector.option('Righteous');
      this.fontSelector.option('Satisfy');


      this.fontSelector.changed(function () {
         let fontstyles = self.fontSelector.value(); // stores all the dropdown list options inside of variable

         // Switches between the dropdown list options, and assigns it with its specific fontstyle
         switch (fontstyles) {
            case 'Acme':
               currentFont = acme;
               break;
            case 'Anton':
               currentFont = anton;
               break;
            case 'Balsamiq':
               currentFont = balsamiq;
               break;
            case 'Courgette':
               currentFont = courgette;
               break;
            case 'Kaushan Script':
               currentFont = kaushanScript;
               break;
            case 'Montserrat':
               currentFont = montserrat;
               break;
            case 'Righteous':
               currentFont = righteous;
               break;
            case 'Satisfy':
               currentFont = satisfy;
               break;
            default:
               currentFont = acme;
         }
      });

      this.size.show(); // when the element is selected, show the slider
      this.size.position(50, 10); // sets the position of the slider
      this.size.style('width', '80px'); // adds a width styling to the slider

      this.sizeInput.show(); // when the element is selected, show the input field
      this.sizeInput.position(140, 10); // sets the position of the input field
      this.sizeInput.style('width', '30px').style('text-align', 'center'); // adds a width styling to the input field and aligns the text of the input to the center

      this.label.show(); // displays the label when the element is selected
      this.label.position(195, 2); // sets the position of the laabel
      this.label.html('Input Text '); // Assigns the label with string data
      this.label.style('font-size', '14px').style('color', 'white'); // sets the font size and font colour of the label

      this.inputbox.show(); // displays the input box when the element is selected
      this.inputbox.position(275, 8); // sets the position of the input box
      this.inputbox.style('width', '100px').style('text-align', 'center'); // adds a width styling to the input box and aligns the text of the input to the center
   };
}