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
            12/12/2019 09:43 AM | Pushed to App Store version 1.0.0
                                  Initialized version 1.0.1
            12/14/2019 02:14 AM | Fixed photos permission, passcode enable
            12/30/2019 07:46 AM | AWS Appsync
            01/02/2020 12:47 PM | Uploaded buggy 1.0.36, no user image on load
            01/07/2020 06:49 PM | set AppLoading onFinish to call setIsReady
                                  started app.json version 1.1.5
                                  Removed all Network stuff
                                  Added routes.js
            01/08/2020 05:47 PM | Added transaction item cell Stories
            02/04/2020 04:34 PM | Released version 2.0.0
            02/04/2020 09:00 PM   | Added AWS Analytics
*/


// console.disableYellowBox = true;
// global.isStorybookModeOn = true;

// console.log('\033[2J');

import React, { useState } from 'react';

// import {
//   // StyleSheet,
//   // Text,
//   View
// } from 'react-native';

import * as Font from 'expo-font';

import { NetworkProvider } from 'react-native-offline';

import { AppLoading } from 'expo';

import './globals'; // global values

// import { Audio } from 'expo-av';

// Amplify imports and config
// import Amplify from '@aws-amplify/core';
// import Amplify from '@aws-amplify/core';
// Analytics.record({ name: String!, attributes: Object, metrics: Object })
// import config from './aws-exports';

// Amplify.configure(config);

// import Analytics from '@aws-amplify/analytics';

// Analytics.record({ name: "Sign in attempted!"});
// console.log('Analytics recorded sign in attempt!');


import SwitchNavigator from './SwitchNavigator';

import AppStackNavigator from './AppStackNavigator';

// import Storybook from './storybook';

// function clearLines(lines) {
//   let i = 0;
//   for (i; i < lines; i += 1) {
//     console.log('\r\n');
//   }
// }

// import API, { graphqlOperation } from '@aws-amplify/api';

// /* Storybook editing */
// console.disableYellowBox = true;

// global.isStorybookModeOn = true;

// Play audio sounds
// async function _playRecording() {
//   const { sound } = await Audio.Sound.createAsync(
//     require('./assets/hello.mp3'),
//     {
//       shouldPlay: true,
//       isLooping: false,
//     },
//     this._updateScreenForSoundStatus,
//   );
//   this.sound = sound;
//   // this.setState({
//   //   playingStatus: 'playing'
//   // });
// }

// // _playRecording(); // inside async function

// clearLines(35);
// console.log(`Application ${global.appName} Loading:`, Date.now());

// global.userShouldLogin = false;

export default function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  // const navigator = <NetworkProvider><SwitchNavigator /></NetworkProvider>;

  // const storybook = <NetworkProvider><Storybook /></NetworkProvider>;

  let view = null;

  async function loadApplicationResources() {
    // const soundObject = new Audio.Sound();

    // fonts
    try {
      await Font.loadAsync({
        'SFProDisplay-Regular': global.SFProDisplayRegularFont, // require('./assets/fonts/SF-Pro-Display-Regular.otf');
        'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
      });
      // _playRecording(); // inside async func

      // stored fonts have been loaded
      setFontsAreLoaded(true);
    } catch (err) {
      // console.log('error: ', err);
    }
  }

  // if (global.isStorybookModeOn) {
  //   // return storybook;
  //   return <Storybook />;
  // }

  if (!fontsAreLoaded) {
    loadApplicationResources();
    view = <AppLoading />;
  }
  // else if (global.userShouldLogin) {
  //   view = <NetworkProvider><SwitchNavigator /></NetworkProvider>; // has login
  // }
  else {
    view = <AppStackNavigator />; // no login
    // view = <NetworkProvider><SwitchNavigator /></NetworkProvider>; // has login
  }
  return view;
}
