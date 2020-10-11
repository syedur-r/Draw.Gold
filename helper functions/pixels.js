class Pixels {
   constructor() {
      this.density = pixelDensity();
   }

   getPixel(x, y) {
      let getColour = {
         red: 0,
         green: 0,
         blue: 0
      };
      let index =
         4 * (y * this.density * width * this.density + x * this.density);

      getColour.red = pixels[index + 0];
      getColour.green = pixels[index + 1];
      getColour.blue = pixels[index + 2];
      return getColour;
   }

   setPixel(x, y, r, g, b) {
      for (let i = 0; i < this.density; i++) {
         for (let j = 0; j < this.density; j++) {
            let index =
               4 *
               ((y * this.density + j) * width * this.density +
                  (x * this.density + i));

            pixels[index + 0] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
         }
      }
   }
}
