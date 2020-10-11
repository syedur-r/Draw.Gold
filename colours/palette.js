function Palette() {
   
   //an array of web colour strings from https://www.w3schools.com/colors/colors_names.asp
   this.palette = [
      "black", "silver", "gray", "white", "maroon", "crimson", "red", "tomato", "purple", "blueviolet", "orange",
      "pink", "fuchsia", "green", "lime", "springgreen", "greenyellow", "peachpuff", "yellow", "gold", "olive", 
      "navy", "blue", "teal", "aqua"
	];
   //Sets the current colour as black as it is the start colour of the palette
   this.currentColour = "black";
   
   let self = this; // Stores the this. inside variable to access it inside DOM handlers
   
   // Function to handle the selected colours
   let selectedColour = function () {
      
      // Removes the existing border
      let existing = select("#" + self.currentColour + "Sample");
      existing.style("border", "0");

      // Gets the new clicked colour from the id of the clicked colour element
      let clickedColour = this.id().split("Sample")[0];
      
      // Sets the current colour and fill and stroke
      self.currentColour = clickedColour;
      fill(clickedColour); // current fill colour
      stroke(clickedColour); // current stroke colour

      // Adds a new border to the clicked colour
      this.style("border", "2px solid white");
   };

   //fetch the colours
   this.fetchColours = function () {
      //set the fill and stroke properties to be black at the start of the programme
      //running
      fill(this.currentColour); // fill colour is set default as black
      stroke(this.currentColour); // stroke colour is set default as black
   };   
   this.fetchColours(); // calls the fetchColours() function after declaring it

   //highlights the colours
   this.highlightColours = function () {
      // Loops through each of the colour array elements and creates a new div in html for the colourGroup
      for (let i = 0; i < this.palette.length; i++) {
         // Stores the id of the colour
         let colourIdentity = this.palette[i] + "Sample";

         // Add the sample to the palette and set its background
         // colour to be the colour value.
         let colourGroup = createDiv();
         colourGroup.class("colourGroup"); // Sets the class of the colour for css reference
         colourGroup.id(colourIdentity); // Sets the id of the colour for javascript reference

         select(".palette").child(colourGroup); // Sets the colourGroup element as the child of the .palette parent element 
         select("#" + colourIdentity).style("background-color", this.palette[i]); // Sets the background colour as the colourID of the element
         colourGroup.mouseClicked(selectedColour); // When one of colours is clicked, it becomes the selected colour
      }
      select(".colourGroup").style("border", "2px solid white");   // Highlights the colour of the fetched colour with a white border
   };
   this.highlightColours(); // calls the highlightColours() function after declaring it
}