// constructor for the paint bucket tool (Flood Fill)
function PaintBucket() {
   this.icon = "graphics/paintBucket.png"; // Sets the image icon of the element
   this.name = "Paint Bucket"; // Gives a unique name to the element

   // setup method
   this.setup = function () { // This starts the setup method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      cursor(ARROW); // Sets the cursor as an arrow
   }

   // draw method
   this.draw = function () { // This starts the draw method on the constructor function allowing more interaction to take place as well as overriding the properties of the variables
      undoTask.undoAction();
      
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed) {
         let mouseCoords = createVector(mouseX, mouseY);
         try {
           this.floodFill(mouseCoords.x, mouseCoords.y);
         } catch (error) {
           console.log(error);
         }
       }
   };

   // flood fill algorithm
   this.floodFill = function (x, y) {
      loadPixels();

      let replacementColour = color(palette.currentColour);
      let pixelClicked = pixelLocator.getPixel(x, y);
      let red = pixelClicked.red;
      let green = pixelClicked.green;
      let blue = pixelClicked.blue;

      let targetColour = [];
      let pixelGrid = [];
      let retracedColour = [];
      let density = pixelDensity();

      for (let i = 0; i < height; i++) {
         pixelGrid.push([]);
         for (let j = 0; j < width; j++) {
            let index = 4 * (i * density * width * density + j * density);
            let rNode = pixels[index + 0];
            let gNode = pixels[index + 1];
            let bNode = pixels[index + 2];

            rNode === red && gNode === green && bNode === blue ?
               pixelGrid[i].push(true) :
               pixelGrid[i].push(false);
         }
      }

      targetColour.push([x, y]);
      retracedColour.push([x, y]);
      pixelGrid[y][x] = false;

      while (retracedColour.length > 0) {
         let coords = retracedColour[0];
         let pixelX = coords[0];
         let pixelY = coords[1];

         // if statement to check pixel to left
         if (pixelX > 0) {
            if (pixelGrid[pixelY][pixelX - 1] === true) {
               pixelGrid[pixelY][pixelX - 1] = false;
               targetColour.push([pixelX - 1, pixelY]);
               retracedColour.push([pixelX - 1, pixelY]);
            }
         }

         // if statement to check pixel to right
         if (pixelX + 1 < pixelGrid[pixelY].length) {
            if (pixelGrid[pixelY][pixelX + 1] === true) {
               pixelGrid[pixelY][pixelX + 1] = false;
               targetColour.push([pixelX + 1, pixelY]);
               retracedColour.push([pixelX + 1, pixelY]);
            }
         }

         // if statement to check pixel to top
         if (pixelY > 0) {
            if (pixelGrid[pixelY - 1][pixelX] === true) {
               pixelGrid[pixelY - 1][pixelX] = false;
               targetColour.push([pixelX, pixelY - 1]);
               retracedColour.push([pixelX, pixelY - 1]);
            }
         }

         // if statement to check pixel to bottom
         if (pixelY + 1 < pixelGrid.length) {
            if (pixelGrid[pixelY + 1][pixelX] === true) {
               pixelGrid[pixelY + 1][pixelX] = false;
               targetColour.push([pixelX, pixelY + 1]);
               retracedColour.push([pixelX, pixelY + 1]);
            }
         }

         // remove entry in retracedColour
         retracedColour.splice(0, 1);
      }

      // fill in the area with the new colour
      let map = targetColour.length;
      for (let i = 0; i < map; i++) {
         let x = targetColour[i][0];
         let y = targetColour[i][1];
         let red = replacementColour.levels[0];
         let green = replacementColour.levels[1];
         let blue = replacementColour.levels[2];
         pixelLocator.setPixel(x, y, red, green, blue);
      }
      updatePixels();
   }
}
