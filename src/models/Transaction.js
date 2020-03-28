

// import Payee from './Payee'; // es6 import

// import Category from './Category'; // es6 import

// const Payee = require('./Payee'); ???

// const Category = require('./Category'); // ???

// import uuidv4 from './uuidv4'; // es6 import

// const uuidv4 = require('./uuidv4'); // plain js import
// const uuidv4 = require('../functions/uuidv4'); // plain js import

function Transaction(id, date, amount, owner, payee, category, type, note, version) {
  const obj = {
    id: id,
    date: date,
    amount: amount,
    payee: payee,
    category: category,
    type: type,
    note: note,
    owner: owner,
    version: version,
  }
  return obj
}

// console.log('Transaction: ', Transaction());

export default Transaction; // es6

// /*
// FILENAME:   Transaction.js
// PURPOSE:    Transaction
// AUTHOR:     Eric Phung
// CREATED:    11/04/2019 02:37 PM
// UPDATED:    11/25/2019 02:11 PM  | added header prop
//             11/26/2019 04:20 AM  | updated  for  sticky headers
//             11/26/2019 11:01 PM
// */

// import Payee from './Payee';

// import Category from './Category';

// import colors from '../../colors';

// import uuidv4 from '../functions/uuidv4';

// export default function Transaction(date, amount, owner, payee, category, type, note, version) {
//   this.id = uuidv4();
//   this.date = date
//   this.amount = amount
//   this.payee = payee
//   this.category = category
//   this.type = type
//   this.note = note
//   this.owner = owner
//   this.version = version
// }


// // var ID = function () {
// //   // Math.random should be unique because of its seeding algorithm.
// //   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
// //   // after the decimal.
// //   return Math.random().toString(36).substr(2, 9);
// // };

// // export default function Transaction(date, amount, payee, category, type, note) {
// //   const currentDate = new Date();

// //   // if (category) {
// //   //   // const id = category.id;
// //   //   // const created = category.created;
// //   //   category = new Category(category.name, category.color, category.type);
// //   //   category.created = category.created;
// //   //   category.id = id;
// //   // }

// //   // console.log(category);

// //   this.id = `${Date.now(currentDate)}`,
// //   this.date = (date) ? date : currentDate;
// //   this.amount = amount ? amount : Number.parseFloat(0).toFixed(2);
// //   this.payee = payee ? payee : new Payee();
// //   this.category = (category) ? category : new Category();
// //   this.type = (type) ? type: this.category.type;


// //   // this.created = currentDate;
// //   this.note = note ? note : '';

// //   if (this.type !== 'income') {
// //     this.amount = this.amount * -1.0
// //   }
// // }

// // // module.exports = Transaction;


// // // //  TESTING
// // // // const o = new Transaction(new Date(), 2218.33, new Payee(), new Category('Test', colors.white), 'expense')
// // // // console.log(o)
// // // // // console.log(typeof o.created);

// // // const transaction = new Transaction()

// // // console.log(transaction)
























// // console.log(typeof transaction.amount)

// // module.exports = Transaction;

// // Transaction.prototype.getTitle = function() {
// //   const str =
// //   `${this.getShortDate()} ${this.getAmountString()}
// //   `;
// //   //${this.payee} ${this.category}`;
// //   return str;
// // };

// // function Transaction(date, amount, payee, category, type) {
// //   // this.id = String(Date.now())
// //   // this.id = String(id);

// //   //  CONST VALUES
// //   const timeStamp = `${Date.now()}`;
// //   const currentDate = new Date();

// //   // INITIALIZE PROPERTIES
// //   this.id = timeStamp;
// //   this.date = (date) ? date : currentDate;
// //   this.amount = (amount) ? amount : 0;
// //   this.created = currentDate;

// //   // this.amount = (type === 'income') ? amount :  amount * -1;
// //   // this.amount = (type === 'income') ? (Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) : ((Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) * (-1));
// //   // this.amount = (type === 'income') ? (amount.replace(/ [^0-9.-]+/g, '') / 100) : (amount.replace(/ [^0-9.-]+/g, '') / 100) * (-1);

// //   this.payee = (payee) ? payee : {};
// //   this.category = (category) ? category : {};
// //   this.type = (type) ? type: 'income';

// //   this.header = false;

// //   // this.shortDate = (date) ? `${this.getShortDate()}` : '';

// //   // setters
// //   this.setAmount = function(amount) {
// //     this.amount = amount;
// //   }

// //   this.setCategory = function (category) {
// //     this.category = category;
// //   }

// //   // methods
// //   this.getTitle = function() {
// //     const str =
// //     `${this.getShortDate()} ${this.getAmountString()}
// //     `;
// //     //${this.payee} ${this.category}`;
// //     return str;
// //   }

// //   this.getShortDate = function() {
// //     // short human readable date
// //     let str = '';
// //     if (this.date) {
// //       const dateObj = new Date(this.date);
// //       const dd = dateObj.getDate();
// //       const mm = dateObj.getMonth() + 1; // January is 0!
// //       const yyyy = dateObj.getFullYear();

// //       // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
// //       str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
// //     }
// //     return str;
// //   }

// //   this.getAmountString = function() {
// //     let str = '';
// //     if (this.amount) {
// //       let symbol = '$';
// //       if (this.amount <= 0) {
// //         symbol = '-$';
// //       }
// //       str = `${symbol}${Math.abs(this.amount)}`;
// //     }

// //     return str;
// //   }

// //   // update values
// //   this.shortDate = `${this.getShortDate()}`;

// //   this.title = `${this.getTitle()}`;


// //   // console.log(this)

// // }

// // module.exports = Transaction;


// // // // console.log(o)


