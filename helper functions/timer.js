// Helper class to help create a sleep/timer
class Timer {
   constructor() {
   }
   
   // Reference: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
   sleep(milliseconds) {
      return new Promise(delay => setTimeout(delay, milliseconds)); // Creates a new promise for the sleep function to delay a task for a specific number of milliseconds
   };
}