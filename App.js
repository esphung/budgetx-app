/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
*/
import React from 'react';
import StackNavigator from './navigation';

import './globals'; // global values

import Transaction from './src/models/Transaction';

// global.debugModeOn = true;

// console.log(global.testTransactions)

import {
  AsyncStorage
} from 'react-native';

async function clearStorageSync() {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    AsyncStorage.clear();
  }
}

// clearStorageSync();


// // TESTING
// const test = {
//   transactions: []
// };

// const o = new Transaction()
// o.setAmount(3782.434)

// // console.log(o)

// test.transactions.push(o)


function App() {
  return (
    <StackNavigator
    // screenProps={test}
    />

  );
}

export default App;
