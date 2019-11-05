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

// Test Fake Transactions
import { getFakeTransactionsList } from './src/functions/getFakeTransactionsList'

data.transactions = getFakeTransactionsList(20)



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




