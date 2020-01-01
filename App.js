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
*/

import React, { useState, useEffect } from 'react';

// import {
//   Platform,
//   AsyncStorage,
//   Alert,
// } from 'react-native';

// import * as LocalAuthentication from 'expo-local-authentication';

import * as Font from 'expo-font';

import { NetworkProvider } from 'react-native-offline';

import { AppLoading } from 'expo';

// Amplify imports and config
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
Amplify.configure(config);

// import API, { graphqlOperation } from '@aws-amplify/api';

import SwitchNavigator from './SwitchNavigator';

import './globals'; // global values

function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  async function _cacheResourcesAsync() {
    try {
      await Font.loadAsync({
        'SFProDisplay-Regular': global.SFProDisplayRegularFont,
        'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
      });
      // stored fonts have been loaded
      setFontsAreLoaded(true);
    } catch (err) {
      // console.log('error: ', err);
    }
  }

  useEffect(() => {
    // console.log('isLocallyAuthenticated:', isLocallyAuthenticated);
    // console.log('isPasscodeEnabled:', isPasscodeEnabled);
    /*
    * > if passcode is enabled, display local authentication passcode input modal
    */
    // if (isPasscodeEnabled === true) {
    //   if (Platform.OS === 'android') {
    //     setModalVisible(modalVisible);
    //   } else {
    //     scanFingerPrint();
    //   }
    // }

    if (fontsAreLoaded === true) {
      setIsLoading(false);
    }

  }, [fontsAreLoaded]);

  // useEffect(() => {
  //   if (isLocallyAuthenticated) {
  //     storeIsLocallyAuthenticated(isLocallyAuthenticated);
  //     console.log('Stored isLocallyAuthenticated as:', isLocallyAuthenticated);
  //   }
  // }, [isLocallyAuthenticated])

  // useEffect(() => {
  //   // console.log('Mount connection change');
  //   return () => {
  //     // effect
  //     // console.log('clean up connectionChange');
  //     NetInfo.isConnected.removeEventListener(
  //       'connectionChange',
  //       handleConnectionChange
  //     );
  //   };
  // }, [handleConnectionChange]);

  // useEffect(() => {
  //   console.log('isOnline:', isOnline);
  //   return () => {
  //     // isOnline side effect
  //   };
  // }, [isOnline])


  const appLoading = (
    <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setIsLoading(false)}
      onError={console.warn}
    />
  );

  let app = (
    <NetworkProvider>
      <SwitchNavigator />
    </NetworkProvider>
  );

  if (!isLoading) {
    return app;
  } else {
    return appLoading;
  }
}

export default App;
