/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/

'use strict';

// app global values
import './globals'

// load user/test data
global.data = {
  user: {
    email: null,
    name: null,
  },
  date:                 null,
  transactions:         null,
  currentBalanceValue:  null,
  currentSpentValue:    null,
  categories:           null,
  amount:               null,
}


// First View Screen

import React, { Component } from 'react';

import StackNavigator from './StackNavigator';

class App extends Component {
  render() {
    return (
      <StackNavigator />
    );
  }
}

// RootStack defined here 
export default App;






import Transaction from './Transaction'
function getFakeTransactionsList (argument) {
  let list = []
  for (var i = 0; i <= 5; i++) {
    var transaction = new Transaction()
    list.push(transaction)
    console.log('New Transaction:',i)
  }
  return list
}



data.transactions = getFakeTransactionsList()



