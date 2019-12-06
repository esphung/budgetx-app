/*
FILENAME:  Login.js
PURPOSE:   Login screen for budget x app
AUTHOR:    Eric Phung
CREATED:   12/06/2019 12:17 AM
UPDATED:   12/06/2019 12:17 AM
*/

// @flow
import React, { useState, useEffect } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  // Button,
  // ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  loadUserObject,
  // saveUserObject,
} from '../storage/UserStorage';

import colors from '../../colors';

import FullScreenSpinnerHOC from '../components/FullScreenSpinnerHOC';

import KeyboardAwareHOC from '../components/KeyboardAwareHOC';

// const FullScreenSpinnerView = FullScreenSpinnerHOC(View);

const DismissKeyboardView = KeyboardAwareHOC(View);

const FullScreenSpinnerAndDismissKeyboardView = FullScreenSpinnerHOC(
  DismissKeyboardView,
);

const KeyboardAwareImage = KeyboardAwareHOC(Image);
const KeyboardAwareView = KeyboardAwareHOC(View);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18,

    backgroundColor: colors.darkTwo,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19,
    color: colors.white,

    backgroundColor: colors.dark,
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Login(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [navigation, setNavigation] = useState(null);

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState(null);

  async function retrieveStoredUserData() {
    const userObject = await loadUserObject(); // load storage object
    // console.log(userObject.user);

    // //  Testing
    // userObject.user.username = ''
    // userObject.user.email = ''
    // saveUserObject(userObject)

    setIsLoggedIn(userObject.user.isLoggedIn);
  }


  async function checkIfUserLoggedIn() {
    setIsLoggedIn(await global.getIsStoredUserLoggedIn());
  }

  // async function callLoginAPI() {
  //   setIsLoggingIn(true);
  //   // const userObject = await loadUserObject(); // load storage object

  //   // temporary replacement for wait of user being logged in
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 200);
  //   });

  //   setIsLoggingIn(false);
  // }

  function handleUsernameChange(name) {
    setUsername(name);
  }

  async function submitUsername(text) {
    // verify current user's username === username
    const userObject = await loadUserObject(); // load storage object

    if (text.replace(/ /g, '') === userObject.user.username) {
      // navigation.navigate('Home');
      await global.setIsStoredUserLoggedIn(true);
      setIsLoggedIn(global.getIsStoredUserLoggedIn());
    }
  }

  function handlePasswordChange(text) {
    setPassword(text);
  }

  async function submitPassword(text) {
    // const userObject = await loadUserObject(); // load storage object
    // // verify current user's username === username
    // if (text === user.password) {
    //   // console.log('Passwords match');
    //   // navigation.navigate('Home');
    //   // await global.setIsStoredUserLoggedIn(true);
    // }
  }

  useEffect(() => {
    // console.log('Mount');
    setNavigation(props.navigation);

    checkIfUserLoggedIn();

    // console.log(isLoggedIn);

    if (isLoggedIn === true) {
      // console.log(isLoggedIn);
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation, props]);

  // useEffect(() => {
  //   // console.log(username);
  //   return () => {
  //     // effect
  //   };
  // }, [username])

  useEffect(() => {
    retrieveStoredUserData();
    return () => {
      // effect
    };
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user.isLoggedIn);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [user]);

  return (

    <FullScreenSpinnerAndDismissKeyboardView
      spinner={isLoggingIn}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <KeyboardAwareView
          style={{
            flex: 1,
            marginBottom: 40,
          }}
          styleDuringKeyboardShow={{ marginBottom: 10 }}
        >
        
          <KeyboardAwareImage
            resizeMode="contain"
            style={[
              {
                height: '100%',
                width: '100%',
              },
            ]}
            styleDuringKeyboardShow={{ opacity: 0.5 }}
            source={global.appIcon}
          />
        </KeyboardAwareView>
        <TextInput
          placeholder="Username"
          placeholderTextColor={colors.offWhite}
          style={[styles.textInput, { marginTop: 40 }]}


          onChangeText={handleUsernameChange}

          autoCapitalize="none"

          onSubmitEditing={() => submitUsername(username)}

          value={username.replace(/ /g, '')}

          // autoFocus={true}

          autoCompleteType="username"

          // enablesReturnKeyAutomatically={true}

          keyboardAppearance="dark"

          keyboardType="email-address"

          maxLength={22}

          // returnKeyType="go"

        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.offWhite}
          style={[styles.textInput, { marginVertical: 20 }]}

          keyboardAppearance="dark"

          autoCompleteType="password"

          // enablesReturnKeyAutomatically={true}

          value={password}

          autoCapitalize="none"

          maxLength={14}

          // secureTextEntry={true}

          // textContentType="password"

          onSubmitEditing={() => submitPassword(password)}

          onChangeText={handlePasswordChange}

        />

        <TouchableOpacity
          onPress={() => {
            submitUsername(username)
          }}
          style={[styles.button]}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          height: 40,
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#BDC3C6', fontSize: 15 }}>
          Need Help?
        </Text>
      </TouchableOpacity>
      <Text style={{ alignSelf: 'center', color: '#A6A8A9', fontSize: 15 }}>
        Don’t have an account yet ?
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          height: 34,
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#0D92CA', fontSize: 15 }}>
          Create an account
        </Text>
      </TouchableOpacity>
    </FullScreenSpinnerAndDismissKeyboardView>
  );
}

Login.navigationOptions = () => {
  // get user name and username from passed props
  const header = {
    headerTransparent: {},
  };
  return header;
};


export default Login;
