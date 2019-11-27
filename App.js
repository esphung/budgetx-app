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

// global.debugModeOn = true;

// // UNIT TEST TRANSACTIONS
// global.testTransactions = require('./testing/test');
// // console.log(testTransactions)

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

// const userData = {
//   user: {
//     email: null, // 'fbar@zmail.com',
//     name: null, // 'Foo Bar'
//   },
// };

function App() {
  return (
    <StackNavigator />
    // screenProps={userData}

  );
}

export default App;
