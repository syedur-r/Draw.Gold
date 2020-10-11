// Object/Class to store all the cabinet items and select the cabinet item
function Cabinet() {
   let self = this; // stores this inside a variable

   this.elements = []; // stores all the cabinet elements inside an array
   this.currentElement = null; // set the current element as an empty element

   // Function to set border outline for cabinet items
   let cabinetItemClick = function () {
      let items = selectAll(".navBarElements");
      for (let i = 0; i < items.length; i++) {
         items[i].style('border', '0'); // Removes all the existing borders using the for loop
      }

      let cabinetName = this.id().split("navBarElements")[0]; // selects the first cabinet element with a border outline
      self.selectElement(cabinetName); // When another element is selected, the border outline gets removed and added to the selected element
      loadPixels();
   };

   // Function to add a new icon to cabinet items
   let addCabinetIcon = function (icon, name) {
      let navBarTools = createDiv("<img src='" + icon + "'></div>"); // Creates a div container for the cabinet icons with a html img semantic
      navBarTools.class("navBarElements"); // Adds a class to the div called .navBarElements
      navBarTools.id(name + "navBarElements"); // Adds an id to the div called .navBarElements
      navBarTools.parent("navBar"); // Places the navbarTools div ontop of the navbar grid container
      navBarTools.mouseClicked(cabinetItemClick); // When any of the icons are clicked, the cabinetItemClick() function is called
                                                      // to place a border around the icon
   };

   // Adding elements to the elements array
   this.addElement = function (elements) {
      // Checks if the elements array elements doesn't have a properties called icon and name
      if (!elements.hasOwnProperty("icon") || !elements.hasOwnProperty("name")) {
         alert("Ensure your cabinet has a name and an icon"); // Alerts the user telling them to add the specified properties
      }
      this.elements.push(elements); // Adds the elements to the elements array
      addCabinetIcon(elements.icon, elements.name); // Calls the addCabinetIcon() function to add an icon and a unique name
      //if no element is selected (ie. none have been added so far)
      //make this tool the selected one.
      
      // Checks if no element is selected (i.e. no elements have been added)
      if (this.currentElement == null) {
         this.selectElement(elements.name); // Make this element the selected element
      }
   };

   // Checking for methods within the cabinet
   this.selectElement = function (cabinetName) {
      // Loops through all the elements from the array and checks it with it's matching name (cabinetName)
      for (let i = 0; i < this.elements.length; i++) {
         if (this.elements[i].name == cabinetName) {
            // Checks if the element has a method called unselectElement
            if (this.currentElement != null && this.currentElement.hasOwnProperty("unselectElement")) {
               // Runs the unselectElement method
               this.currentElement.unselectElement();
            }
            // Selects the current element and higlights it on the navbar with a white border
            this.currentElement = this.elements[i];
            select("#" + cabinetName + "navBarElements").style("border", "2px solid white").style("border-radius", "8px");

            // Checks if the element has a method called addOptions
            if (this.currentElement.hasOwnProperty("addOptions")) {
               // Runs the addOptions method
               this.currentElement.addOptions();
            }
         }
      }
   };
}