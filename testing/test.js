

// ================================
// get random date
function generateRandomDate() {
  // return new Date()
  return new Date((new Date(2019, 0, 0)).getTime() + Math.random() * ((new Date()).getTime() - (new Date(2019, 0, 0)).getTime()));
}
// console.log(generateRandomDate());

// get random amount
function generateRandomAmount() {
 return Math.floor(Math.random() * (100000 - 100) + 100) / 100;
}
// console.log(generateRandomAmount());

// get random payee/company name
function generateRandomName (argument) {
  const fakeCompanies = require('./fakeCompanies');
  return fakeCompanies[Math.floor(Math.random()*fakeCompanies.length)];
}
// console.log(generateRandomName());


// get random category
function generateRandomCategory () {
  const categories = require('./categories');
  return categories[Math.floor(Math.random()* categories.length)];
}

// console.log(generateRandomCategory());

// ================================

// GENERATE FAKE TRANSACTIONS
let Transaction = require('./Transaction');


const LIMIT = 9;

let TRANSACTIONS  = [];

let i = 0;
while (i < LIMIT) {
  // id, date, amount, payee, category, type
  const date = generateRandomDate();

  const payee = generateRandomName();

  const amount = generateRandomAmount();

  const category = generateRandomCategory();

  const transaction = new Transaction(
    date.getTime(), // i,
    date,
    amount,
    payee,
    category,
    category.type
  )
  i += 1;

  TRANSACTIONS.push(transaction);
}


// console.log(TRANSACTIONS);

module.exports = TRANSACTIONS;

// let dates = require('./dates');







function getShortDate(date) {
  const dateObj = new Date(date);

  const dd = dateObj.getDate();
  const mm = dateObj.getMonth() + 1; // January is 0!
  const yyyy = dateObj.getFullYear();

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  return `${mm}/${parseInt(dd, 10)}/${yyyy}`;
}

function getDifferentDates(argument) {
  let count = 0;
  for (var i = argument.length - 1; i >= 0; i--) {
    let previous = getShortDate(argument[i].date)
    // console.log(previous)
    let j = i + 1;
    if ((j) <= (argument.length - 1)) {
      if (previous !== getShortDate(argument[j].date)) {
        count += 1;
        // console.log(j, argument[j].date);
       //  console.log(count)
      }
      
    }
  }
  if (count == 0) {
    return 1
  }
  return count;
}

function create2DArrayByDate(list) {
  const differentDates = getDifferentDates(list);
  console.log('Different Dates:', differentDates);

  // Create one dimensional array 
  var array = new Array(list.length); 

  // Loop to create 2D array using 1D array
  // (a new list for each item)
  console.log("Creating 2D array"); 
  let i = 0;
  for (i; i < array.length; i += 1) {
    array[i] = [];
  }

  var h = 0;

  var s = list; 
    
  // Loop to initilize 2D array elements. 
  for (var b = 0; b < differentDates; b++) { 
    for (var j = 0; j < array.length; j++) {
      
      if (s[h]) {
        let previousDate = getShortDate(s[j].date);
        // console.log(previousDate)
        
        if (s[h + 1]) {
          // next date exists
          let nextDate = getShortDate(s[h + 1].date)
          //  compare next date to previous
          // console.log(nextDate + ' === ' + previousDate)
          // console.log(nextDate === previousDate)

          if (nextDate !== previousDate) {
            // add then go to next list
            array[b][j] = s[h++];
            break
          } else {
            // add to list
            array[b][j] = s[h++];
          }
        }
      }
    } 
  }

  // Loop to display the elements of 2D array.
  for (var g = 0; g < array.length; g++) {
    console.log("<ItemListHeader />");
    for (var h = 0; h < array.length; h++) {
      if (array[g][h]) {
        console.log(
          '$ ' + array[g][h].amount + ' | ' +
          getShortDate(array[g][h].date)
        );
      }
    }
  }

  // return array;
}




// console.log(create2DArray(TRANSACTIONS));

create2DArrayByDate(TRANSACTIONS)




