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

const testData = {
  user: {
    email: 'fbar@zmail.com',
    name: 'Foo Bar'
  },
  data: {
    date: getRandomDate(new Date(2012, 0, 1), new Date()),
    transactions: getFakeTransactionsList(2),
  }
};

function App() {
  return (
    // <StackNavigator screenProps={{ data, user }} />
    <StackNavigator screenProps={testData} />
  );
}

export default App;
