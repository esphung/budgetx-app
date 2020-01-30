/*
FILENAME:   functions.js
PURPOSE:    functions for budget x components
AUTHOR:     Eric Phung
CREATED:    12/04/2019 05:23 PM
UPDATED:    12/04/2019 05:23 PM
            // 01/29/2020 04:14 PM Added ID function

*/



// // Generate random unique identifier string; alphanumeric.
// export var ID = function () {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return Math.random().toString(36).substr(2, 9);
// };


export function getCurrencySymbol(amount) {
  let symbol = '$';
  if (amount < 0) {
    symbol = '- $';
  }
  return symbol;
}

export function getFormattedDateString(date) {
  const transactionDate = new Date(date);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let day = dayNames[transactionDate.getDay()];
  let dd = transactionDate.getDate();
  let mm = transactionDate.getMonth() + 1; // January is 0!
  const yyyy = transactionDate.getFullYear();
  // const hours = transactionDate.getHours();
  let minutes = transactionDate.getMinutes();

  if (dd < 10) { dd = `0${dd}`; }
  if (mm < 10) { mm = `0${mm}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }

  // set "today" word in transaction date label
  const todaysDate = new Date();
  if
  (
    transactionDate.getDay() === todaysDate.getDay()
    && transactionDate.getMonth() === todaysDate.getMonth()
    && transactionDate.getFullYear() === todaysDate.getFullYear()
  ) {
    day = 'Today';
  }

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  let string = `${day}, ${monthNames[mm - 1]} ${parseInt(dd, 10)}`;

  // if different year, show the year
  if (todaysDate.getFullYear() !== yyyy) {
    string = `${day}, ${monthNames[mm - 1]} ${parseInt(dd, 10)}, ${yyyy}`;
  }

  return string;
}
