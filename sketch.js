// YOU CAN ALSO VIEW THE APPLICATION ON THIS URL: http://doc.gold.ac.uk/~mrahm024/draw.gold/index.html

/* Variables to create an instance of a new object */
let canvasContent;
let canvas;
let assistant;
let themes;
let palette;
let cabinet;
let shortcuts;
let bounds;
let formulas
let pixelLocator;
let timer;
let undoTask;
let previousState; // Will contain a stack for undo feature.

function setup() {
   canvasContent = select('#components'); // Selects the canvas grid component from CSS
   // Sets the width and height of the canvas from the CSS width/height values
   canvas = createCanvas(canvasContent.size().width, canvasContent.size().height);
   background(255); // Keeps the canvas background as white 
   canvas.parent("components"); // Puts the canvas on top of all elements

   // Creates new instances for the palette and the cabinet
   cabinet = new Cabinet();
   palette = new Palette();
   
   // Creates new instances for all the helper functions
   assistant = new Assistant();
   themes = new Themes();
   shortcuts = new KeyShortcuts();
   bounds = new CanvasBounds();
   formulas = new Formulas();
   pixelLocator = new Pixels();
   timer = new Timer();
   previousState = new Stack();
   undoTask = new Undo();

   // Adds all the drawing elements to the cabinet
   /*1*/
   cabinet.addElement(new ResizeCanvas());
   /*2*/
   cabinet.addElement(new GaussianBlur());
   /*3*/
   cabinet.addElement(new PenTool());
   /*4*/
   cabinet.addElement(new RainbowPen());
   /*5*/
   cabinet.addElement(new PaintBucket());
   /*6*/
   cabinet.addElement(new Eraser());
   /*7*/
   cabinet.addElement(new Brush());
   /*8*/
   cabinet.addElement(new RainbowBrush());
   /*9*/
   cabinet.addElement(new Pencil());
   /*10*/
   cabinet.addElement(new SymmetryicalPen());
   /*11*/
   cabinet.addElement(new Text());
   /*12*/
   cabinet.addElement(new Rectangle());
   /*13*/
   cabinet.addElement(new Ellipse());
   /*14*/
   cabinet.addElement(new Triangle());
   /*15*/
   cabinet.addElement(new Line());
   /*16*/
   cabinet.addElement(new Polygon());
   /*17*/
   cabinet.addElement(new RoundRect());
   /*18*/
   cabinet.addElement(new RightAngleTriangle());
   /*19*/
   cabinet.addElement(new Star());
   /*20*/
   cabinet.addElement(new FreeHandShape());
   /*21*/
   cabinet.addElement(new Stamp());
   /*22*/
   cabinet.addElement(new AirBrush());
   /*23*/
   cabinet.addElement(new Spirograph());
   /*24*/
   cabinet.addElement(new RainbowSpirograph());
}

function draw() {   
   // Checks if each of the objects has a setup/draw prototype method, if not an alert will be displayed
   cabinet.currentElement.hasOwnProperty('setup') ? (cabinet.currentElement.setup()) : (alert("Your constructor function is missing a setup method!"));
   cabinet.currentElement.hasOwnProperty('draw') ? (cabinet.currentElement.draw()) : (alert("Your constructor function is missing a draw method!"));
}

// Keyboard Shortcuts
function keyPressed(event) {
   // Calls the keypressed method from the keyshortcuts class
   shortcuts.keyPressed(event);
}

function keyReleased(event) {
   // Calls the keyreleased method from the keyshortcuts class
   shortcuts.keyReleased(event);
}