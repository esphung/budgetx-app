import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import SpinnerMask from 'main/src/components/SpinnerMask';

import {
  // StyleSheet,
  View,
  Text,
  // AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  // Alert,
  // Animated,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

// import {
//   loadUserObject,
//   saveUserObject,
// } from 'main/src/storage/UserStorage';

// import { Asset } from 'expo-asset';

// import { AppLoading } from 'expo';

// AWS Amplify
import Auth from '@aws-amplify/auth';

import colors from '../../colors';

import styles from './styles';

import OfflineScreen from './OfflineScreen';

import { isValidUsername, getButtonStyle } from './functions';

function SignInScreen(props) {
  // state hooks
  const usernameInputRef = useRef(null);

  const passwordInputRef = useRef(null);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [helpMessage, setHelpMessage] = useState(null);

  // methods
  const signIn = async () => {
    setIsLoading(true);
    // const userTokenValue = '123456789';
    // await AsyncStorage.setItem('userToken', userTokenValue);
    // // console.log('userToken set:', userTokenValue);
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(username, password)
      .then((cognito) => {
        // console.log(cognito);

        if (cognito) {
          // set username key here!
          props.navigation.navigate('AuthLoading');
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log('Error when signing in: ', err.message);
        // Alert.alert('Error when signing in: ', err.message);
        setHelpMessage(err.message);
        setIsLoading(false);
      });
  };

  // user input handlers
  function handleUsernameInputSubmit() {
    passwordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handlePasswordInputSubmit() {
    // authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    if (key === 'username') {
      if (value.length < 6) {
        setHelpMessage('Username too short');
      } else {
        setHelpMessage(null);
      }
      setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'password') {
      setPassword(value.replace(' ', ''));
    }
  }

  useEffect(() => {
    // console.log('username:', username);
    // console.log('password:', password);

    if (!username) {
      setHelpMessage(null);
    } else if (username && username.length < 6) {
      setIsSignInBtnEnabled(false);
    }

    else if (username.length >= 6 && isValidUsername(username) && password) {
      setIsSignInBtnEnabled(true);
      // console.log(username);
      // setIsHelpIconVisible(false);
    } else {
      setIsSignInBtnEnabled(false);
    }
    // return () => {
    //   // effect
    //   // console.log('clean up');
    // };
  }, [username, password, isLoading]);

  const signin = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={false}>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => handleUsernameInputSubmit()}
                    onChangeText={(value) => onChangeText('username', value)}

                    ref={usernameInputRef}

                    value={username}

                    keyboardAppearance="dark"

                    maxLength={24}

                  />
                </Item>
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={passwordInputRef}
                    onSubmitEditing={() => handlePasswordInputSubmit()}
                    onChangeText={(value) => onChangeText('password', value)}

                    value={password}

                    maxLength={16}

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity
                  disabled={!isSignInBtnEnabled}
                  onPress={signIn}
                  style={getButtonStyle(isSignInBtnEnabled)}
                >
                  <Text style={styles.buttonText}>
                    Sign In
                  </Text>
                </TouchableOpacity>


                <Item style={
                  [styles.itemStyle, {
                    borderColor: 'transparent',
                  }]
                }
                >
                  <View style={
                    {
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',

                      alignItems: 'center',


                    }
                  }
                  />
                </Item>
                <View style={
                    {
                      flex: 0.12,
                      // position: 'absolute',

                      // borderWidth: 1,
                      // borderColor: 'white',
                      // borderStyle: 'solid',
                    }
                  }
                >
                  <Text
                    style={
                      [
                        styles.textStyle,
                        {
                          // opacity: 0.3,
                          // color: 'white',
                        }
                      ]
                    }
                  >
                    { helpMessage }
                  </Text>
                </View>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  const offline = <OfflineScreen />;

  const view = (
    <NetworkConsumer>
      {
        ({ isConnected }) => (isConnected ? signin : offline)
      }
    </NetworkConsumer>
  );

  if (isLoading === true) {
    return <SpinnerMask />;
  }
    return view;
}

SignInScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default SignInScreen;
