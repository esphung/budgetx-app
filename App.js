/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/

import categories from './src/data/categories'

function genRand(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}


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
  for (var i = 0; i < 8; i++) {
    var amount = genRand(0, 10, 2)

    var transaction = new Transaction(
      i,
      new Date(), 
      amount,
      '',
      (categories[Math.floor(Math.random() * 8)])
    )

    list.push(transaction)
    console.log('Created new Transaction:',list[i])
  }
  return list
}



data.transactions = getFakeTransactionsList()



