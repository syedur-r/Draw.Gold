function Assistant() {
   let vector; // declares the image argument for the load button
   let fileInput = createFileInput(loadImage); // creates a new file input for the load stream
   let text = createElement('h1'); // Creates a new h1 text using the dom library
   
   fileInput.hide(); // hiders the file input
   fileInput.position(925, 8); // sets the position for the file input
   fileInput.style('color', 'white'); // sets the text colour of the file input as white
   text.hide(); // hides the text element
   text.html("Click the load button"); // assigns a string to the h1 text element using html()
   text.position(925, 0); // sets the position for the text
   text.style('font-size', '12px').style('color', 'white'); // adds some styling to the text
   
   //event handler for the load image button
   select("#loadImgBtn").mouseClicked(function () {
      waitForLoad(); // calls the waitForLoad() async function to cause a delay
      // checks if the vector argument has been passed and assigned with an image
      if (vector) {
         imageMode(CENTER); // sets the image to the center
         image(vector, width/2, height/2, width, height); // adds the image to the canvas
      }
   });
   
   //event handler for the save image button
   select("#savingBtn").mouseClicked(function () {
      let fileName = prompt("Save As:") // creates a prompt dialogue to get an input for the file name
      saveCanvas(fileName, 'png'); // saves the canvas as a png image using the file name input
   });

   //event handler for the clear button event. Clears the screen
   select("#clearBtn").mouseClicked(function () {
      background(255); // sets the background as white
      loadPixels(); // this function is needed for the line of symmetry tool
      for (var i = 0; i < previousState.arr.length; i++) {
         previousState.arr.length = 0;
      }
   });
   
   //event handler for the undo button event. Undo a single task
   select("#undoBtn").mouseClicked(function () {
      loadPixels();
      if (previousState.isEmpty() === true) {
         alert("There are no tasks to be undone!")
      } else {
         // Check if action is possible
         if (previousState.peek() !== null) {
            // Changes pixels array to the state saved in previousState
            // before the last action
            for (var i = 0; i < pixels.length; i++) {
               pixels[i] = previousState.peek()[i];
            }
            // Pop the stack so the program is ready to go back another step
            previousState.pop();
         }
      }
      // Saves changes to the canvas
      updatePixels();
   });

   // function to handle the lading of the image
   function loadImage(file) {
      // checks if the type of file is an image
      if (file.type === 'image') {
         // uses try and catch to try and perform a task and catch any errors
         try {
            vector = createImg(file.data, ''); // creates an image file
            vector.hide(); // hides the image
            waitForText(); // calls the waitForText() async function to cause a delay
            fileInput.hide(); // hides the file input
         } catch (error) {
            alert(error); // catches any errors and displays it in an alert box
         }
      } else {
         // If the file type is not an image, an alert box will be displayed
         alert('This is not an image file!');
         vector = null; // clears the vector image variable
      }
   };
   
   // function to cause a delay in displaying the text
   let waitForText = async function () {
      await timer.sleep(1000); //delays for 1 second = 1000 milliseconds
      text.show(); // displays the text
      await timer.sleep(1000); // delays again for 1 second
      text.hide(); // hides the text
   };

   // function to cause a delay in displaying the file input
   let waitForLoad = async function () {
      await timer.sleep(1000); // delays again for 1 seconds
      fileInput.show(); // displays the file input
   };
}