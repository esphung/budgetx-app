/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
*/
import React from 'react';
import StackNavigator from './navigation';

import './globals'; // global values

//global.debugModeOn = true;

// UNIT TEST TRANSACTIONS
// global.testTransactions = require('./testing/test');
// console.log(testTransactions)

function App() {
  return (
    <StackNavigator />
  );
}

export default App;
