/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/
import './globals';// global values

import React from 'react';

import StackNavigator from './StackNavigator';

// testing
import getFakeTransactionsList from './src/functions/getFakeTransactionsList';
import getRandomDate from './src/functions/getRandomDate';

import categories from './src/data/categories';

// // data
// const data = {
//   date: null,
//   transactions: null, // getFakeTransactionsList(3),
//   currentBalanceValue: null,
//   currentSpentValue: null,
//   categories: null,
//   amount: null,
// };

// // user
// const user = {
//   email: null, // 'esphung@gmail.com',
//   name: null, // 'eric phung'
// };

const testData = {
  user: {
    email: 'fbar@zmail.com',
    name: 'Foo Bar'
  },
  data: {
    date: getRandomDate(new Date(2012, 0, 1), new Date()),
    transactions: getFakeTransactionsList(1),
    currentBalanceValue: 34987,
    currentSpentValue: 373463,
    categories,
    amount: 76521,
  }
};

function App() {
  return (
    // <StackNavigator screenProps={{ data, user }} />
    <StackNavigator screenProps={testData} />
  );
}

export default App;
