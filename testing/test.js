

// ================================
// get random date
function generateRandomDate() {
    return new Date((new Date(2019, 0, 1)).getTime() + Math.random() * ((new Date()).getTime() - (new Date(2019, 0, 1)).getTime()));
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


const LIMIT = 50;

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



