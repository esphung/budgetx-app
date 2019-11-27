
const LIMIT = 16; // test transactions limit


// ================================
// get random transaction date
function generateRandomDate() {
  // return new Date() // same dates
  return new Date(
    (new Date(2019, 0, 0)).getTime()
    + Math.random() * ((new Date()).getTime() - (new Date(2019, 0, 0)).getTime())
  );
}
// console.log(generateRandomDate());

// get random transaction amount
function generateRandomAmount() {
  return Math.floor(Math.random() * (100000 - 100) + 100) / 100;
}
// console.log(generateRandomAmount());

// get random transaction payee/company name
const fakeCompanies = require('./fakeCompanies');

function generateRandomName() {
  return fakeCompanies[Math.floor(Math.random() * fakeCompanies.length)];
}
// console.log(generateRandomName());

// get random category
const categories = require('./categories');

function generateRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}
// console.log(generateRandomCategory());

// ================================
// GENERATE FAKE TEST_TRANSACTIONS LIST
const Transaction = require('./Transaction');

const TEST_TRANSACTIONS = [];

let i = 0;
while (i <= LIMIT) {
  // if (i === 0) {

  // }

  // id, date, amount, payee, category, type
  const id = i;

  const date = generateRandomDate();

  const payee = generateRandomName();

  const amount = generateRandomAmount();

  const category = generateRandomCategory();

  const transaction = new Transaction(
    id, // i,
    date,
    amount,
    payee,
    category,
    category.type
  );
  i += 1;

  TEST_TRANSACTIONS.push(transaction);
}


// console.log(TEST_TRANSACTIONS);

module.exports = TEST_TRANSACTIONS;

// // let dates = require('./dates');
// function getShortDate(date) {
//   const dateObj = new Date(date);

//   const dd = dateObj.getDate();
//   const mm = dateObj.getMonth() + 1; // January is 0!
//   const yyyy = dateObj.getFullYear();

//   // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
//   return `${mm}/${parseInt(dd, 10)}/${yyyy}`;
// }

// function getDifferentDates(array) {
//   let count = 0;
//   let h = array.length - 1;
//   for (h; h >= 0; h -= 1) {
//     const previous = getShortDate(array[h].date);
//     // console.log(previous)
//     const j = h + 1;
//     if ((j) <= (array.length - 1)) {
//       if (previous !== getShortDate(array[j].date)) {
//         count += 1;
//         // console.log(j, array[j].date);
//         // console.log(count)
//       }
//     }
//   }
//   if (count === 0) {
//     return 1;
//   }
//   return count;
// }

// function create2DArrayByDate(list) {
//   const differentDates = getDifferentDates(list);
//   console.log('Different Dates:', differentDates);

//   // Create one dimensional array
//   var array = new Array(list.length);

// // Loop to create 2D array using 1D array
// // (a new list for each item)
// console.log("Creating 2D array");
// let i = 0;
// for (i; i < array.length; i += 1) {
//   array[i] = [];
// }

// var h = 0;

// var s = list;

// // Loop to initilize 2D array elements.
// for (var b = 0; b < differentDates; b++) {
//   for (var j = 0; j < array.length; j++) {

//     if (s[h]) {
//       let previousDate = getShortDate(s[j].date);
//       // console.log(previousDate)

//       if (s[h + 1]) {
//         // next date exists
//         let nextDate = getShortDate(s[h + 1].date)
//         //  compare next date to previous
//         // console.log(nextDate + ' === ' + previousDate)
//         // console.log(nextDate === previousDate)

//         if (nextDate !== previousDate) {
//           // add then go to next list
//           array[b][j] = s[h++];
//           break
//         } else {
//           // add to list
//           array[b][j] = s[h++];
//         }
//       }
//     }
//   }
// }

// // Loop to display the elements of 2D array.
// for (var g = 0; g < array.length; g++) {
//   console.log("<ItemListHeader />");
//   for (var h = 0; h < array.length; h++) {
//     if (array[g][h]) {
//       console.log(
//         '$ ' + array[g][h].amount + ' | ' +
//         getShortDate(array[g][h].date)
//       );
//     }
//   }
// }
//   return array;
// }

// console.log(create2DArray(TEST_TRANSACTIONS));

// console.log(create2DArrayByDate(TEST_TRANSACTIONS))
