function Stack() {
   this.arr = [];
   
   this.pop = function () {
      if (this.arr.length == 0) {
         return "Underflow";
      }
      return this.arr.pop();
   };
   
   this.push = function (el) {
      return this.arr.push(el);
   };
   
   this.peek = function () {
      return this.arr[this.arr.length - 1];
   };
   
   this.isEmpty = function () {
      return (this.arr.length === 0);
   };
}