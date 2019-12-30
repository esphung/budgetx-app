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
// import app from 'main/app.json'
// console.log(app.expo.version);

import React, { useState, useEffect } from 'react';

import {
  Platform,
  AsyncStorage,
  NetInfo,
  Alert,
} from 'react-native';

// import { NetInfo } from 'react-native';

// import Constants from 'expo-constants';

import * as LocalAuthentication from 'expo-local-authentication';

import * as Font from 'expo-font';

import { NetworkProvider } from 'react-native-offline';

// Amplify imports and config
import Amplify from 'aws-amplify'; // '@aws-amplify/core';
import config from './aws-exports';

import SpinnerMask from './src/components/SpinnerMask';

// import Root from './Root';

import SwitchNavigator from './SwitchNavigator';

// import Offline from './src/components/Offline';

import './globals'; // global values

// import LocalAuthentication from './src/screens/LocalAuthentication';

Amplify.configure(config);

function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isLocallyAuthenticated, setIsLocallyAuthenticated] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [failedCount, setFailedCount] = useState(0);

  const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(null);

  // const [isOnline, setIsOnline] = useState(null);

  async function retrieveStoredFonts() {
    // setIsLoading(true);
    // load stored fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
    });
    // stored fonts have been loaded
    setFontsAreLoaded(true);
  }

  const scanFingerPrint = async () => {
    try {
      const results = await LocalAuthentication.authenticateAsync();
      if (results.success === true) {
        setModalVisible(false);
        setIsLocallyAuthenticated(results.success);
        // storeIsLocallyAuthenticated(results.success);
        setFailedCount(0);
      } else {
        setFailedCount(failedCount + 1);
      }
      // console.log(results.success);
    } catch (e) {
      Alert.alert(e);
      // console.log(e);
    }
  };

  const storeIsLocallyAuthenticated = async (bool) => {
    try {
      await AsyncStorage.setItem(global.isLocallyAuthenticatedKey, JSON.stringify(bool));
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveIsLocallyAuthenticated = async () => {
    try {
      const bool = await AsyncStorage.getItem(global.isLocallyAuthenticatedKey);
      if (bool === null) {
        // store first time user isLocallyAuthenticated value of 'true'
        // console.log(JSON.stringify(true));
        // await AsyncStorage.setItem(global.isLocallyAuthenticatedKey, JSON.stringify(true));
        setIsLocallyAuthenticated(false);
      } else {
        setIsLocallyAuthenticated(JSON.parse(bool));
      }
    } catch (error) {
      Alert.alert(error);
      // Error saving data
    }
  };

  const storeIsPasscodeEnabled = async (bool) => {
    try {
      await AsyncStorage.setItem(global.isPasscodeEnabledKey, JSON.stringify(bool));
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveIsPasscodeEnabled = async () => {
    // // Saves to storage as a JSON-string
    // AsyncStorage.setItem('isPasscodeEnabled', JSON.stringify(false))

    // Retrieves from storage as boolean
    // AsyncStorage.getItem('isPasscodeEnabled', function (err, value) {
    //     JSON.parse(value) // boolean false
    // }

    // Or if you prefer using Promises
    await AsyncStorage.getItem(global.isPasscodeEnabledKey)
      .then((value) => {
        JSON.parse(value); // boolean false
        if (value === null) {
          setIsPasscodeEnabled(false);
        }
        if (value) {
          setIsPasscodeEnabled(JSON.parse(value));
        }
      });
  };

  function clearState() {
    // setIsLocallyAuthenticated(false);
    setFailedCount(0);
  }

  // const handleConnectionChange = (connectionInfo) => {
  //   // console.log('connection info: ', connectionInfo);
  //   NetInfo.isConnected.fetch().then((isConnected) => {
  //     setIsOnline(isConnected);
  //   });
  // };

  // component did mount
  useEffect(() => {
    // console.log('Mount');
    retrieveStoredFonts();

    retrieveIsPasscodeEnabled();

    retrieveIsLocallyAuthenticated();

    clearState();
  }, []);

  useEffect(() => {
    // console.log('isLocallyAuthenticated:', isLocallyAuthenticated);
    // console.log('isPasscodeEnabled:', isPasscodeEnabled);

    /*
    * > if passcode is enabled, display local authentication passcode input modal
    */
    if (isPasscodeEnabled === true) {
      if (Platform.OS === 'android') {
        setModalVisible(modalVisible);
      } else {
        scanFingerPrint();
      }
    }

    if (fontsAreLoaded === true) {
      setIsLoading(false);
    }

    return () => {
      // effect
      if (isLocallyAuthenticated !== null) {
        storeIsLocallyAuthenticated(isLocallyAuthenticated);
        // console.log('Stored isLocallyAuthenticated:', isLocallyAuthenticated);
      }
      if (isPasscodeEnabled !== null) {
        storeIsPasscodeEnabled(isPasscodeEnabled);
        // console.log('Stored isPasscodeEnabled:', isPasscodeEnabled);
      }
      // console.log('clean up');
    };
  }, [isPasscodeEnabled, fontsAreLoaded, isLocallyAuthenticated, modalVisible, scanFingerPrint]);

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

  let view = <SpinnerMask />;

  if (!isLoading) {
    view = (
      <NetworkProvider>
        <SwitchNavigator />
      </NetworkProvider>
    );
  }





  return view;
}

export default App;
