/*
FILENAME:   App.js
PURPOSE:    entry point for budget x app
AUTHOR:     eric phung
CREATED:    Fri Nov 1 2019
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
            12/09/2019 12:56 PM | added AuthLoadingScreen, SwitchNavigator, AUthStackNavigator
*/

import React, { useState, useEffect } from 'react';

// import { AppLoading } from 'expo';

// import { Container, Text } from 'native-base';

import * as Font from 'expo-font';

// import { StyleSheet, Text, View } from 'react-native';

// import {
//   View,
//   // Text,
// } from 'react-native';

// import StackNavigator from './StackNavigator';

import SpinnerMask from './src/components/SpinnerMask';

import SwitchNavigator from './SwitchNavigator';

import './globals'; // global values

// import LocalAuthentication from './src/screens/LocalAuthentication';

function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  async function retrieveStoredFonts() {
    // load stored fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
    });
    // stored fonts have been loaded
    setFontsAreLoaded(true);
  }

  // component did mount
  useEffect(() => {
    // console.log('Mount');
    retrieveStoredFonts();
    return () => {
      // effect
      // console.log('Clean up');
    };
  }, []);

  let view = <SpinnerMask />;

  if (fontsAreLoaded) {
    view = (
      <SwitchNavigator />
    );
  }

  return view;
}

export default App;
