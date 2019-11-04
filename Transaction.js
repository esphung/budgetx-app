// FILENAME:  Transaction.js
// PURPOSE:   Transaction
// AUTHOR:    Eric Phung
// CREATED:   04/11/2019 02:37 PM

module.exports = class Transaction {
  constructor(idNumber, date, amount, payee, category) {
    this.idNumber = String(idNumber)
    this.date = date
    this.amount = amount
    this.payee = payee
    this.category = category
  }
}