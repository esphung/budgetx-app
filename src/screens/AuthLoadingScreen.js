/*
Edits:
06/05/2020 06:00 PM
*/
import React, { useEffect } from 'react';

import { LogBox } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { Auth } from 'aws-amplify';

import { getAuthentication, getCognitoIdentity } from 'src/controllers/Network';

import SpinnerMask from 'src/components/SpinnerMask';

import uuidv4 from 'src/functions/uuidv4';

// import colorLog from 'src/functions/colorLog';

// Ignore log notification by message:
LogBox.ignoreLogs(['not authenticated']);

const AuthLoadingScreen = ({ navigation }) => {
  async function retrieveCognitoUserToken() {
    global.authenticated = await AsyncStorage.getItem('authenticated');

    let userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      // console.log('Local Storage userToken: ', userToken);
      global.storageKey = await AsyncStorage.getItem('storageKey');
      // colorLog(global.storageKey);

      // console.log('Local Storage userToken: ', userToken.substring(0, 25), '...');
    } else {
      // get current authenticated user
      Auth.currentAuthenticatedUser()
        .then((cognito) => {
          AsyncStorage.setItem('storageKey', cognito.attributes.sub);
          userToken = cognito.signInUserSession.accessToken.jwtToken;
          global.storageKey = AsyncStorage.getItem('storageKey');
          // console.log('storageKey: ', global.storageKey);
        })
      userToken = await AsyncStorage.getItem('userToken');
    }
    return userToken;
  }
  // Get the logged in users and remember them
  async function loadApp() {
    // try offline stored useruserToken first
    let userToken = await retrieveCognitoUserToken();

    if (!userToken) {
      // global.showGlobalValues()
      userToken = `${global.storageKey}@session${uuidv4()}`;

      // console.log('userToken: ', userToken);
      AsyncStorage.setItem('userToken', userToken); // save user token
      // AsyncStorage.setItem('authenticated', 'false');
      global.authenticated = await AsyncStorage.getItem('authenticated');

      if (global.authenticated === true) {
        // console.log('authenticated: ', authenticated);
        // console.log('User Locally Authenticated');
        global.storageKey = await AsyncStorage.getItem('storageKey');
      } else {
        global.storageKey = uuidv4();
        AsyncStorage.setItem('storageKey', global.storageKey);
      }
    }
    global.authenticated = await getAuthentication();
    /* Play App Intro Slider */
    const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
    // console.log('hasSeenIntro: ', hasSeenIntro);

    if (!hasSeenIntro) navigation.navigate('MyAppIntroSlider');
    navigation.navigate(userToken ? 'App' : 'Auth');
  }
  useEffect(() => {
    loadApp();
  }, []);
  const spinnerMask = <SpinnerMask />;
  return spinnerMask;
};

export default AuthLoadingScreen;
