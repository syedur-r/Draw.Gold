function Themes() {
   //event handler for theme 1
   select("#frgrndBtn1").mouseClicked(function () {
      select("#frgrndBtn1").style("font-weight", "bolder"); // sets the font-weight of the current theme as bold
      select("#frgrndBtn2").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      select("#frgrndBtn3").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      
      select(".title").style("color", "rgb(228, 137, 48)"); // sets the colour of the heading text as orange
      select(".heading").style("background-color", "#141a46"); // sets the background colour of the heading as navy blue
      select(".elements").style("background-color", "rgb(228, 137, 48)"); // sets the background colour of navbar grid as orange
      select(".selection").style("background-color", "rgb(228, 137, 48)"); // sets the background colour of selection grid as orange
      select(".palette").style("background-color", "rgb(228, 137, 48)"); // sets the background colour of palette grid as orange
      
      select("#frgrndBtn1").style("background-color", "#141a46"); // sets the background colour of button 1 as navy blue
      select("#frgrndBtn1").style("color", "rgb(228, 137, 48)"); // sets the colour of the button 1 text as orange
      select("#frgrndBtn2").style("background-color", "#141a46"); // sets the background colour of button 2 as navy blue
      select("#frgrndBtn2").style("color", "rgb(228, 137, 48)"); // sets the colour of the button 2 text as orange
      select("#frgrndBtn3").style("background-color", "#141a46"); // sets the background colour of button 3 as navy blue
      select("#frgrndBtn3").style("color", "rgb(228, 137, 48)"); // sets the colour of the button 3 text as orange
   });

   //event handler for theme 2
   select("#frgrndBtn2").mouseClicked(function () {
      select("#frgrndBtn1").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      select("#frgrndBtn2").style("font-weight", "bolder"); // sets the font-weight of the current theme as bold
      select("#frgrndBtn3").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      
      select(".title").style("color", "#01e790"); // sets the colour of the heading text as lime green
      select(".heading").style("background-color", "#333333"); // sets the background colour of the heading grid as dark grey
      select(".elements").style("background-color", "#01e790"); // sets the background colour of navbar grid as lime green
      select(".selection").style("background-color", "#01e790"); // sets the background colour of selection grid as lime green
      select(".palette").style("background-color", "#01e790"); // sets the background colour of palette grid as lime green
      
      select("#frgrndBtn1").style("background-color", "#333333"); // sets the background colour of button 1 as dark grey
      select("#frgrndBtn1").style("color", "#01e790"); // sets the colour of the button 1 text as lime green
      select("#frgrndBtn2").style("background-color", "#333333"); // sets the background colour of button 2 as dark grey
      select("#frgrndBtn2").style("color", "#01e790"); // sets the colour of the button 2 text as lime green
      select("#frgrndBtn3").style("background-color", "#333333"); // sets the background colour of button 3 as dark grey
      select("#frgrndBtn3").style("color", "#01e790"); // sets the colour of the button 3 text as lime green
   });
   
   //event handler for theme 3
   select("#frgrndBtn3").mouseClicked(function () {
      select("#frgrndBtn1").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      select("#frgrndBtn2").style("font-weight", "normal"); // sets the font-weight of the unselected theme as normal
      select("#frgrndBtn3").style("font-weight", "bolder"); // sets the font-weight of the current theme as bold
      
      select(".title").style("color", "#e1dd8f"); // sets the colour of the heading text as light green
      select(".heading").style("background-color", "#0b253a"); // sets the background colour of the heading grid as dark blue
      select(".elements").style("background-color", "#e1dd8f"); // sets the background colour of navbar grid as light green
      select(".selection").style("background-color", "#e1dd8f"); // sets the background colour of selection grid as light green
      select(".palette").style("background-color", "#e1dd8f"); // sets the background colour of palette grid as light green
      
      select("#frgrndBtn1").style("background-color", "#0b253a"); // sets the background colour of button 1 as dark blue
      select("#frgrndBtn1").style("color", "#e1dd8f"); // sets the colour of the button 1 text as light green
      select("#frgrndBtn2").style("background-color", "#0b253a"); // sets the background colour of button 2 as dark blue
      select("#frgrndBtn2").style("color", "#e1dd8f"); // sets the colour of the button 2 text as light green
      select("#frgrndBtn3").style("background-color", "#0b253a"); // sets the background colour of button 3 as dark blue
      select("#frgrndBtn3").style("color", "#e1dd8f"); // sets the colour of the button 3 text as light green
   });
}