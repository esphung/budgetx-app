/*
FILENAME:  Transaction.js
PURPOSE:   Transaction
AUTHOR:    Eric Phung
CREATED:   04/11/2019 02:37 PM
*/

module.exports = function Transaction(id, date, amount, payee, category, type) {
  this.id = String(id);
  this.date = date;
  this.amount = (type === 'income') ? amount :  amount * -1;
  this.payee = payee;
  this.category = category;
  this.type = type;

  // console.log(JSON.stringify(this));
}
