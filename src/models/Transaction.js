/*
FILENAME:  Transaction.js
PURPOSE:   Transaction
AUTHOR:    Eric Phung
CREATED:   04/11/2019 02:37 PM
*/

export default function Transaction(id, date, amount, payee, category) {
  this.id = String(id);
  this.date = date;
  this.amount = amount;
  this.payee = payee;
  this.category = category;
}

// class Transaction {
//   constructor(id, date, amount, payee, category) {
//      this.id = String(id);
//   this.date = date;
//   this.amount = amount;
//   this.payee = payee;
//   this.category = category;
//   }
// }

// Transaction.prototype.showMe = function() {
//   console.log(this)
// };

// var obj = new Transaction()

// obj.showMe()
