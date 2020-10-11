class Undo {
   constructor() {
      this.clicked = false;
   }

   undoAction() {
      if (bounds.mousePressOnCanvas(canvasContent) && mouseIsPressed && this.clicked === false) {
         loadPixels();
         this.updateUndoStack();
         this.clicked = true;
      }
      if (this.clicked === true && !mouseIsPressed) {
         this.clicked = false;
      }
   }

   updateUndoStack() {
      previousState.push(pixels.slice(0, pixels.length));
   }
}
