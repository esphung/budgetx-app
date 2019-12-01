/*
FILENAME:   Transaction.js
PURPOSE:    Transaction
AUTHOR:     Eric Phung
CREATED:    11/04/2019 02:37 PM
UPDATED:    11/25/2019 02:11 PM  | added header prop
            11/26/2019 04:20 AM  | updated  for  sticky headers
            11/26/2019 11:01 PM
*/

function Transaction(date, amount, payee, category, type) {
  this.id = `${Date.now()}`;
  this.date = date;
  this.amount = amount;
  this.payee = {};
  this.category = category;
  this.type = type;
}

Transaction.prototype = {
  id: `${Date.now()}`
}

module.exports = Transaction;






// module.exports = Transaction;

// Transaction.prototype.getTitle = function() {
//   const str =
//   `${this.getShortDate()} ${this.getAmountString()}
//   `;
//   //${this.payee} ${this.category}`;
//   return str;
// };

// function Transaction(date, amount, payee, category, type) {
//   // this.id = String(Date.now())
//   // this.id = String(id);

//   //  CONST VALUES
//   const timeStamp = `${Date.now()}`;
//   const currentDate = new Date();

//   // INITIALIZE PROPERTIES
//   this.id = timeStamp;
//   this.date = (date) ? date : currentDate;
//   this.amount = (amount) ? amount : 0;
//   this.created = currentDate;

//   // this.amount = (type === 'income') ? amount :  amount * -1;
//   // this.amount = (type === 'income') ? (Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) : ((Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) * (-1));
//   // this.amount = (type === 'income') ? (amount.replace(/ [^0-9.-]+/g, '') / 100) : (amount.replace(/ [^0-9.-]+/g, '') / 100) * (-1);

//   this.payee = (payee) ? payee : {};
//   this.category = (category) ? category : {};
//   this.type = (type) ? type: 'income';

//   this.header = false;

//   // this.shortDate = (date) ? `${this.getShortDate()}` : '';

//   // setters
//   this.setAmount = function(amount) {
//     this.amount = amount;
//   }

//   this.setCategory = function (category) {
//     this.category = category;
//   }

//   // methods
//   this.getTitle = function() {
//     const str =
//     `${this.getShortDate()} ${this.getAmountString()}
//     `;
//     //${this.payee} ${this.category}`;
//     return str;
//   }

//   this.getShortDate = function() {
//     // short human readable date
//     let str = '';
//     if (this.date) {
//       const dateObj = new Date(this.date);
//       const dd = dateObj.getDate();
//       const mm = dateObj.getMonth() + 1; // January is 0!
//       const yyyy = dateObj.getFullYear();

//       // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
//       str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
//     }
//     return str;
//   }

//   this.getAmountString = function() {
//     let str = '';
//     if (this.amount) {
//       let symbol = '$';
//       if (this.amount <= 0) {
//         symbol = '-$';
//       }
//       str = `${symbol}${Math.abs(this.amount)}`;
//     }

//     return str;
//   }

//   // update values
//   this.shortDate = `${this.getShortDate()}`;

//   this.title = `${this.getTitle()}`;


//   // console.log(this)

// }

// module.exports = Transaction;


// //  TESTING

// // const o = new Transaction(12, new Date(), 2218.33)

// // // const o = new Transaction()

// // console.log(o.getTitle())


// // // console.log(o)


