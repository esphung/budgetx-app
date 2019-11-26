
const LIMIT = 2; // test transactions limit

// ================================
// get random transaction date
function generateRandomDate() {
  // return new Date() // same dates
  return new Date(
    (new Date(2019, 1, 3)).getTime()
    + Math.random() * ((new Date()).getTime() - (new Date(2019, 0, 1)).getTime())
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
// GENERATE FAKE testTransactions LIST
const Transaction = require('./Transaction');
const testTransactions = [];

let i = 0;
while (i < LIMIT) {

  // date, amount, payee, category, type

  const date = generateRandomDate();

  const payee = generateRandomName();

  const amount = generateRandomAmount();

  const category = generateRandomCategory();

  const transaction = new Transaction(
    date,
    amount,
    payee,
    category,
    category.type
  );
  i += 1;

  testTransactions.push(transaction);
}

// console.log(testTransactions);

module.exports = testTransactions;


// const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map((number) => number * 2);
// console.log(numbers);
// console.log(doubled);

