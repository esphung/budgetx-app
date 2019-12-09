/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
            12/09/2019 12:56 PM | added local authentication
*/

// import React, { useState, useEffect } from 'react';
import React from 'react';

// import { StyleSheet, Text, View } from 'react-native';

// import {
//   View,
//   // Text,
// } from 'react-native';

// import StackNavigator from './StackNavigator';

import SwitchNavigator from './SwitchNavigator';

import './globals'; // global values

// import colors from './colors';

// import LocalAuthentication from './src/screens/LocalAuthentication';

import {
  loadUserObject,
  saveUserObject,
} from './src/storage/UserStorage';

// global app storage functions
global.getIsStoredUserLoggedIn = async () => {
  // return whether user is currently logged in
  let bool = false;
  // load stored user
  try {
    const userObject = await loadUserObject();
    bool = userObject.user.isLoggedIn;
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
  return bool;
};

global.setIsStoredUserLoggedIn = async (bool) => {
  // load stored user
  try {
    const userObject = await loadUserObject();
    userObject.user.isLoggedIn = bool;
    saveUserObject(userObject);
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
};

function App() {

  // const view = (
  //   <StackNavigator />
  // );

  const view = (
    <SwitchNavigator />
  );

  return view;
}

export default App;
