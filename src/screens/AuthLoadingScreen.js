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
    if (userToken) {
      console.log('Local Storage userToken subString: ', userToken.substring(0, 24), '...');
    } else {
      // get current authenticated user
      await Auth.currentAuthenticatedUser()
        .then((cognito) => {
          // console.log('cognito: ', cognito);
          console.log('\nAuthenticated User =>')
          console.log('cognito.attributes: ', cognito.attributes);
          userToken = cognito.signInUserSession.accessToken.jwtToken;
          // console.log('Cognito  Session userToken: ', userToken.substring(0, 13), '...');

          AsyncStorage.setItem('userToken', userToken); // save user token
        })
        .catch((err) => console.log('err: ', err));

      userToken = await AsyncStorage.getItem('userToken');
    }

    return userToken;
  }

  // Get the logged in users and remember them
  async function loadApp() {
    // try offline stored useruserToken first
    let userToken = await retrieveCognitoUserToken();

    if (!userToken) {
      userToken = await AsyncStorage.setItem('userToken', '123456789'); // save user token
      console.log('userToken: ', userToken);
      console.log('User Not Authenticated  => Storing local data');
    }

    // props.navigation.navigate('App');



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
