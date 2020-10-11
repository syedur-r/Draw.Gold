// Helper function to help calculate all the formulas
class Formulas { 
   constructor() {
   }
   /* Formula to calculate average
      *@param x: value 1 to be added
      *@param y: value 2 to be added
      *@return average: the mean average of value 1 and value 2
   */
   calculateAverage(x, y) {
      let values = [x, y];
      let average;
      
      // loops through the values array to calculate the mean average
      for (var i = 0; i < values.length; i++) {
         average = values[i] + values[i+1] / values.length;
         return average; // returns the mean average
      }
      return false; // otherwise returns false
   };

   /* Calculate an opposite coordinate the other side of the
     *symmetry line.
     *@param n number: location for either x or y coordinate
     *@param axis [x,y]: the axis of the coordinate (x or y)
     *@param coordinate [x,y]: represents the defined coordinate (x or y)
     *@param lineOfSymmetry [width/2,height/2]: the line representing the point of reflection
     *@return number: the opposite coordinate
   */
   calculateOpposite(n, axis, coordinate, lineOfSymmetry) {
      // if the axis isn't the one being mirrored, the same value is returned
      if (axis != coordinate) {
         return n;
      }
      // if n is less than the line of symmetry return a coorindate that is far greater than the line of symmetry by the distance from
      // n to that line.
      if (n < lineOfSymmetry) {
         return lineOfSymmetry + (lineOfSymmetry - n);
      }
      // otherwise return a coordinate that is smaller than the line of symmetry
      // by the distance between it and n.
      else {
         return lineOfSymmetry - (n - lineOfSymmetry);
      }      
   };
}