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

const userData = {
  user: {
    email: null, // 'fbar@zmail.com',
    name: null, // 'Foo Bar'
  },
};

function App() {
  return (
    <StackNavigator
      screenProps={userData}
    />
  );
}

export default App;
