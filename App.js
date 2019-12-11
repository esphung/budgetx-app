/*
FILENAME:   App.js
PURPOSE:    Entry point for budget x app
AUTHOR:     Eric Phung
CREATED:    Fri Nov 1 2019
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
            12/09/2019 12:56 PM | added AuthLoadingScreen, SwitchNavigator, AUthStackNavigator
            12/10/2019 06:02 AM | Stuck at AWS suspension
            12/10/2019 01:58 PM | AWS authentication set up
            12/11/2019 02:55 PM |
*/

import React, { useState, useEffect } from 'react';

import * as Font from 'expo-font';

// Amplify imports and config
import Amplify from 'aws-amplify'; // '@aws-amplify/core';
import config from './aws-exports';

import SpinnerMask from './src/components/SpinnerMask';

import SwitchNavigator from './SwitchNavigator';

import './globals'; // global values

// import LocalAuthentication from './src/screens/LocalAuthentication';

Amplify.configure(config);

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
