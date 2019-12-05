/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
*/

import React from 'react';

import StackNavigator from './navigation';

import './globals'; // global values

function App() {
  // return component view
  const view = (
    <StackNavigator />
  );
  return view;
}

export default App;
