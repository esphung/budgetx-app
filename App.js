/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/
import './globals';// global values
// import { getFakeTransactionsList } from './src/functions/getFakeTransactionsList';
// data.transactions = getFakeTransactionsList(3)
import React from 'react';

import StackNavigator from './StackNavigator';

// load test data
const data = {
  date: null,
  transactions: null,
  currentBalanceValue: null,
  currentSpentValue: null,
  categories: null,
  amount: null,
};

// default user data
const user = {
  email: null, // 'esphung@gmail.com',
  name: null, // 'eric phung'
};

function App() {
  return (
    <StackNavigator screenProps={{ data, user }} />
  );
}

export default App;
