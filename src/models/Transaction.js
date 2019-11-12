/*
FILENAME:  Transaction.js
PURPOSE:   Transaction
AUTHOR:    Eric Phung
CREATED:   04/11/2019 02:37 PM
*/

export default function Transaction(id, date, amount, payee, category, type) {
  this.id = String(id);
  this.date = date;
  this.amount = (type === 'income') ? (Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) : ((Number(amount.replace(/ [^0-9.-]+/g, '')) / 100) * (-1));
  this.payee = {};
  this.category = category;
  this.type = type;

  // console.log(JSON.stringify(this));
}
