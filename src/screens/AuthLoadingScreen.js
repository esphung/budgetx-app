/*
Edits:
06/05/2020 06:00 PM | commented out
                      AsyncStorage.setItem('authenticated', 'false');
                      global.isFederated
                      global.isApple.....
*/

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import { getAuthentication, getCognitoIdentity } from '../controllers/Network';

import SpinnerMask from '../components/SpinnerMask';

import uuidv4 from '../functions/uuidv4';

const AuthLoadingScreen = (props) => {
  async function retrieveCognitoUserToken() {
    let userToken = await AsyncStorage.getItem('userToken');
    global.authenticated = await AsyncStorage.getItem('authenticated');
    if (userToken) {
      // console.log('Local Storage userToken: ', userToken);
      global.storageKey = await AsyncStorage.getItem('storageKey');
      // console.log('Local Storage userToken: ', userToken.substring(0, 25), '...');
    } else {
      // get current authenticated user
      Auth.currentAuthenticatedUser()
        .then((cognito) => {
          AsyncStorage.setItem('storageKey', cognito.attributes.sub);
          userToken = cognito.signInUserSession.accessToken.jwtToken;
          global.storageKey = AsyncStorage.getItem('storageKey');
          // console.log('storageKey: ', global.storageKey);
        });
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

    if (!hasSeenIntro) {
      props.navigation.navigate('MyAppIntroSlider');
    }
    // global.showGlobalValues()
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  }
  useEffect(() => {
    loadApp();
  }, []);
  const spinnerMask = <SpinnerMask />;
  return spinnerMask;
};

export default AuthLoadingScreen;
