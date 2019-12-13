import React, { useEffect, useState } from 'react';

// import { PropTypes } from 'prop-types';

import {
  // StyleSheet,
  View,
  // Text,
  ActivityIndicator,
  // AsyncStorage,
  // Button,
} from 'react-native';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from 'main/colors';

import styles from './styles';

function AuthLoadingScreen(props) {
  /*
  * > hooks
  */
  const [userToken, setUserToken] = useState(null);

  // Get the logged in users and remember them
  async function loadApp() {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserToken(user.signInUserSession.accessToken.jwtToken);
        // this.setState({userToken: user.signInUserSession.accessToken.jwtToken})
      })
      .catch((err) => console.log(err));
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  useEffect(() => {
    // console.log('Mount');
    loadApp();
  }, []);

  useEffect(() => {
    // if (userToken) {
    //   // console.log(userToken);
    // }
    return () => {
      props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  }, [userToken, props.navigation]);

  const view = (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
  return view;
}

export default AuthLoadingScreen;
