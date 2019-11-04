/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/


// load user/test data
data = {
  user: {
    email: '',//'esphung@gmail.com',//null,
    name: '',//'eric phung',//null
  },
  date:                 null,
  transactions:         null,//['Hello', 'World'],
  currentBalanceValue:  null,
  currentSpentValue:    null,
  categories:           null,//categories,
  amount:               0.00,
}



Transaction = function(id) {
  this.idNumber = (new Date()).getTime()
  this.dateCreated = new Date()
  this.iconImage = global.placeholder500x500
  this.payeeName = 'Foo Bar Inc'
  //console.log('New Transaction:', JSON.stringify(this))
}

function getFakeTransactionsList (argument) {
  let list = []
  for (var i = 5; i >= 0; i--) {
    var transaction = new Transaction()
    list.push(transaction)
  }
  return list
}

data.transactions = getFakeTransactionsList()




// load initial view
import Router from './Router'

export default Router
