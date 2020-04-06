import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  // Text,
  // TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../storage/SettingsStorage'

import colors from '../../colors';

import styles from '../../styles';

import Button from '../../storybook/stories/Button';

import TouchableText from '../../storybook/stories/TouchableText';

import FacebookLogin from '../components/FacebookLoginButton';

import HelpMessage from '../../storybook/stories/HelpMessage';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';
// Auth.federatedSignIn

const getAuthentication = async () => {
  await Auth.currentAuthenticatedUser()
  .then((cognito) => {
    console.log('cognito: ', cognito);
    return cognito;
  }).catch((err) => {
    console.log('err: ', err);
  })
};

function WelcomeScreen(props) {
  const [userData, setUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleRoute = async (destination) => {
    try {
      // statements
      await props.navigation.navigate(destination);
    } catch (e) {
      // statements
      console.log('Error with welcomescreen route', e);
    }
  };

    const spinner = (
    <View
      style={
        {
          // flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ddd',
          opacity: 0.1,

        }
      }
    >
      <ActivityIndicator style={{
        position: 'absolute',
        top: 70,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }} size="large" color="gray" />
    </View>
  );



  const handleFacebookSignIn = async (userData) => {
    setIsLoading(true);
    // do stuff with the new user's data
    // console.log('userData: ', userData);
    
    // setUserData(userData);

    // global.storageKey = userData.id

    await AsyncStorage.setItem('storageKey', userData.id);

    // await AsyncStorage.setItem('storageKey', global.storageKey)

    let storage = await loadSettingsStorage(userData.id);

    storage.user.name = userData.name;

    storage.user.email = userData.email;

    saveSettingsStorage(global.storageKey, storage);

    // global.isUserAuthenticated = true;

    await setIsLoading(false)

    handleRoute('AuthLoading');

    
  
}

  const signUpSignInBtns = (
    <View style={styles.infoContainer}>
              
      <View style={styles.container}>

        <Button title="Sign Up" onPress={() => handleRoute('SignUp')} />

        <Button title="Sign In" onPress={() => handleRoute('SignIn')} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          justifyContent: 'space-around',
          padding: 6,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>
        <TouchableText title="Forgot Password?" onPress={() => handleRoute('ForgetPassword')} />

        </View>
      </View>
    </View>
  );

  const welcome = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            {/* Facebook Login */}
            <FacebookLogin handleFacebookSignIn={handleFacebookSignIn} />
            
            { signUpSignInBtns }

            {
              isLoading && spinner
            }
            
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  return welcome;
}

WelcomeScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
