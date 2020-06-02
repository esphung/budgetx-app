import React, { useEffect, useState } from 'react';

// import { PropTypes } from 'prop-types';

import {
  // StyleSheet,
  // View,
  // Text,
  // ActivityIndicator,
  AsyncStorage,
  // Button,
} from 'react-native';

import {
  getAuthentication,
} from '../../globals'

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';


// // import the Analytics category
// import Analytics from '@aws-amplify/analytics'
// // Analytics.record({ name: String!, attributes: Object, metrics: Object })

// // Analytics.record({ name: "User authenticated!" });
// // console.log('Analytics recorded user authenticated!');

import SpinnerMask from '../../src/components/SpinnerMask';

// import colors from '../../colors';

// import styles from '../../styles';

// /* My Functions */
// import uuidv4 from '../functions/uuidv4';

// console.disableYellowBox = true;

// console.warn("Warning message");

import uuidv4 from '../functions/uuidv4';


export default function AuthLoadingScreen(props) {
  /*
  * > hooks
  */
  // const [userToken, setUserToken] = useState('');

  // async function retrieveStoredUserToken() {
  //   let userToken = null;
  //   try {
  //     // try to retrieve stored userToken
  //     userToken = await AsyncStorage.getItem('userToken');
  //   } catch(err) {
  //     // statements
  //     console.log('err: ', err);
  //   }
  //   return userToken
  // }

  async function retrieveCognitoUserToken() {
    let userToken = await AsyncStorage.getItem('userToken');
    // console.log('userToken: ', userToken);
    // let userToken = null

    global.authenticated = await AsyncStorage.getItem('authenticated');

        global.isFederated = await AsyncStorage.getItem('isFederated');

        global.isAppleSignedIn = await AsyncStorage.getItem('isAppleSignedIn')
        // console.log('isAppleSignedIn: ', isAppleSignedIn);
    if (userToken) {
      // console.log('Local Storage userToken: ', userToken);
      global.storageKey = await AsyncStorage.getItem('storageKey');
      // console.log('Local Storage userToken: ', userToken.substring(0, 25), '...');

    } else {
      // get current authenticated user
      await Auth.currentAuthenticatedUser()
        .then(async (cognito) => {
          await AsyncStorage.setItem('storageKey', cognito.attributes.sub);
          // alert(global.storageKey)
          // global.showGlobalValues()


          // console.log('cognito: ', cognito);
          // console.log('\nAuthenticated User =>')
          // console.log('cognito.attributes: ', cognito.attributes);
          userToken = cognito.signInUserSession.accessToken.jwtToken;
          // console.log('Cognito  Session userToken: ', userToken.substring(0, 13), '...');

          // AsyncStorage.setItem('userToken', userToken); // save user token

          // AsyncStorage.setItem('storageKey', cognito.attributes.sub);
          global.storageKey = await AsyncStorage.getItem('storageKey');
          // console.log('storageKey: ', global.storageKey);

        })
        .catch((err) => {
          console.log('err: ', err);
          
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
      userToken = global.storageKey + '@session' + uuidv4();

      // console.log('userToken: ', userToken);
      await AsyncStorage.setItem('userToken', userToken); // save user token
      
      await AsyncStorage.setItem('authenticated', 'false');
      global.authenticated = await AsyncStorage.getItem('authenticated');

      
      

      if (global.authenticated === true) {
        // console.log('authenticated: ', authenticated);
        // console.log('User Locally Authenticated');
        global.storageKey = await AsyncStorage.getItem('storageKey');
      }
      else {

        console.log('User Not Locally Authenticated');
        global.storageKey = uuidv4();
        await AsyncStorage.setItem('storageKey', global.storageKey)
      }
    }

    // props.navigation.navigate('App');
    
    // console.log('userToken: ', userToken);
    

    global.authenticated = await getAuthentication();
    // console.log('global.authenticated: ', global.authenticated);

    global.isFederated = await AsyncStorage.getItem('isFederated');

    global.isAppleSignedIn = await AsyncStorage.getItem('isAppleSignedIn')

    // await AsyncStorage.setItem('storageKey', cognito.attributes.sub);
    // alert(global.storageKey);


    /* Play App Intro Slider */
    let hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
    // console.log('hasSeenIntro: ', hasSeenIntro);

    /* get whether signed up user wants to sync device or not */
    global.isDeviceSyncOn = await AsyncStorage.getItem('isDeviceSyncOn');
    console.log('global.isDeviceSyncOn: ', global.isDeviceSyncOn);

    // console.log('props.navigation: ', props.navigation);

    if (!hasSeenIntro) {
      props.navigation.navigate('MyAppIntroSlider');
    };


    // global.showGlobalValues()
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  }




  // useEffect(() => {
  //   // console.log('Mount');
  //   loadApp();
  //   // return () => {
  //   //   console.log('Clean up');
  //   // }
  // }, []);

  useEffect(() => {

    loadApp();
    return () => {
      // effect
    };
  }, []);

  // useEffect(() => {
  //   // if (userToken) {
  //   //   // console.log(userToken);
  //   // }
  //   return () => {
  //     props.navigation.navigate(userToken ? 'App' : 'Auth');
  //   };
  // }, [userToken]);

  const spinnerMask = <SpinnerMask />;

  // const view = (
  //   <View style={styles.container}>
  //     <ActivityIndicator size="large" color={colors.white} />
  //   </View>
  // );
  // return view;
  return spinnerMask;
}

// export default AuthLoadingScreen;
