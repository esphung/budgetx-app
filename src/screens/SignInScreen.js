import React, { useState, useEffect,  useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

// import the Analytics category
// import Analytics from '@aws-amplify/analytics';
// Analytics.record({ name: String!, attributes: Object, metrics: Object })

import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';
Amplify.configure(config);

// Analytics.record({ name: "User authenticated!" });
// console.log('Analytics recorded user authenticated!');

import SpinnerMask from '../../src/components/SpinnerMask';

import HelpMessage from '../../storybook/stories/HelpMessage';

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
  Alert,
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
// } from '../../src/storage/UserStorage';

// import { Asset } from 'expo-asset';

// import { AppLoading } from 'expo';

// AWS Amplify
import Auth from '@aws-amplify/auth';

// ui colors
import colors from '../../colors';

import styles from '../../styles';

import OfflineScreen from './OfflineScreen';

// import { getButtonStyle } from './functions';

import getButtonStyle from '../../src/functions/getButtonStyle';

import isValidUsername from '../../src/functions/isValidUsername';

import isValidEmail from '../../src/functions/isValidEmail';

import Dialog from "react-native-dialog";

function SignInScreen(props) {
  // state hooks
  // const usernameInputRef = useRef(null);

  // const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

  const [authCode, setAuthCode] = useState(null);

  const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [helpMessage, setHelpMessage] = useState(null);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(true);

  // const authCodeInputRef = useRef(null);

  const [isConfirmSignUpBtnEnabled, setIsConfirmSignUpBtnEnabled] = useState(false);

  const [isResendCodeBtnEnabled, setIsResendCodeBtnEnabled] = useState(false);

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');

  const [dialogTitle, setDialogTitle] = useState('');

  function okDialogueBtnPressed() {
    setIsDialogVisible(false);
  }


  const confirmationDialog = (
    <View>
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>{ dialogTitle }</Dialog.Title>
        <Dialog.Description>
          { dialogMessage }
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Ok" onPress={okDialogueBtnPressed} />
      </Dialog.Container>
    </View>
  );


  // Resend code if not received already
  async function resendSignUp() {
    // let isSuccessful = false;
    // const { username } = this.state;
    if (!email) {
      // usernameInputRef.current._root.focus();
      // Alert.alert('Please provide a username');
      setHelpMessage('Please provide a email');
      // setDialogTitle('Please provide a username');
      // setIsDialogVisible(true);
      // isSuccessful = true;
      return;
    }
    await Auth.resendSignUp(email)
      .then(() => {
        // Alert.alert('Confirmation code resent successfully!');
        setHelpMessage('Confirmation code resent successfully!');
        // setDialogTitle('Confirmation code resent successfully!');
        // setIsDialogVisible(true);
        // console.log('Confirmation code resent successfully');
      })
      .catch((err) => {
        if (!err.message) {
          // console.log('Error requesting new confirmation code: ', err);
          // Alert.alert('Error requesting new confirmation code: ', err);
          setHelpMessage('Error requesting new confirmation code');
          // setDialogMessage(err);
          // setIsDialogVisible(true);

        }
        // else {
        //   // console.log('Error requesting new confirmation code: ', err.message);
        //   // Alert.alert('Error requesting new confirmation code: ', err.message);
        //   setHelpMessage('Error requesting new confirmation code: ', err);
        //   // setDialogTitle(err);
        //   // setDialogMessage(err.message);
        //   // setIsDialogVisible(true);
        // }
      });
  }


    // Confirm users and redirect them to the SignIn page
  async function confirmSignUp() {
    let isSuccessful = false;
    if (authCode !== null) {
      // const { username, authCode } = this.state;
      if (!username) {
        // usernameInputRef.current._root.focus();
        // Alert.alert('Please provide a username');
        setHelpMessage('Please provide a username');
        return;
      }

      await Auth.confirmSignUp(username, authCode)
        .then(() => {
          isSuccessful = true;
          // props.navigation.navigate('SignIn');
          setHelpMessage('Confirm successful!');
          // console.log('Confirm sign up successful');
          // Alert.alert('Confirm sign up successful');
        })
        .catch((err) => {
          if (!err.message) {
            // console.log('Error when entering confirmation code: ', err);
            // Alert.alert('Error when entering confirmation code: ', err);
            setHelpMessage('Error when entering confirmation code');
          }
        });
    }
    if (isSuccessful) {
      setIsConfirmVisible(false);
    }
  }

  function handleAuthCodeInputSubmit(value) {
    // emailInputRef.current._root.focus();
    setAuthCode(value.nativeEvent.text.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    // console.log(value.nativeEvent.text)
  }

    const confirm = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        // keyboardVerticalOffset={80}
        enabled={isKeyboardAvoidEnabled}
      >

        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>

{/*              <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder={`Username (mininum length of ${global.minUsernameLength})`}
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={(value) => handleUsernameInputSubmit(value.nativeEvent.text)}
                    // ref={usernameInputRef}
                    onChangeText={(value) => onChangeText('username', value)}

                    value={username}

                    maxLength={global.maxUsernameLength}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                  />
                </Item>*/}

                {/* email section */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-mail" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={emailInputRef}
                    onSubmitEditing={() => handleEmailInputSubmit()}
                    onChangeText={(value) => onChangeText('email', value)}

                    value={email}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={26}
                  />
                </Item>

                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-apps" style={styles.iconStyle} />
                  <Input
                    disabled={!isAuthCodeInputEnabled}
                    style={styles.input}
                    placeholder="Confirmation code"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="numeric"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    // ref={authCodeInputRef}
                    onSubmitEditing={handleAuthCodeInputSubmit}
                    onChangeText={(value) => onChangeText('authCode', value)}

                    value={authCode}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(true)}

                    maxLength={global.maxAuthCodeLength}
                  />
                </Item>
                <TouchableOpacity
                  disabled={!isConfirmSignUpBtnEnabled}
                  onPress={confirmSignUp}
                  style={getButtonStyle(isConfirmSignUpBtnEnabled)}
                >
                  <Text style={styles.buttonText}>
                    Confirm Sign Up
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={!isResendCodeBtnEnabled}
                  onPress={resendSignUp}
                  style={getButtonStyle(isResendCodeBtnEnabled)}
                >
                  <Text style={styles.buttonText}>
                    Resend code
                  </Text>
                </TouchableOpacity>

                {/* help message section  */}
                <HelpMessage message={helpMessage} />
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // methods
  const signIn = async () => {
    setIsLoading(true);
    // const userTokenValue = '123456789';
    // await AsyncStorage.setItem('userToken', userTokenValue);
    // // console.log('userToken set:', userTokenValue);
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(email, password)
      .then((cognito) => {
        // console.log(cognito);

         // Analytics.record({ name: "Sign in attempted!"});
         //  console.log('Analytics recorded sign in attempt!');

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

        if (err.message.includes('User is not confirmed.')) {
          setDialogTitle(err.message);
          setDialogMessage('Please enter the verification code we sent you or have us send it to you again.')
          setIsDialogVisible(true);

          setIsResendCodeBtnEnabled(true);

          setIsConfirmVisible(true);
        }
      });

      // send record of sign in attempt to analytics
      // Analytics.record({ name: "Sign in attempted!"});
      // console.log('Analytics recorded sign in attempt!');
  };

  // function onChangeText(key, value) {
  //   // console.log('key:', key);
  //   // console.log('value:', value);

  //   if (key === 'username') {
  //     setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
  //   } else if (key === 'password') {
  //     setPassword(value.replace(' ', ''));
  //   } else if (key === 'authCode') {
  //     setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
  //   }
  // }

  // user input handlers
  function handleUsernameInputSubmit() {
    // passwordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handlePasswordInputSubmit() {
    // authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    if (key === 'email') {

      setEmail(value);
    } else if (key === 'password') {
      setPassword(value.replace(' ', ''));
    } else if (key === 'authCode') {
      setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    }
  }

  useEffect(() => {
    // console.log('username:', username);
    // console.log('password:', password);

    if (email) {
      setIsSignInBtnEnabled(true);
    }

    // else if (username.length >= 6 && isValidUsername(username) && password) {
    //   setIsSignInBtnEnabled(true);
    //   // console.log(username);
    //   // setIsHelpIconVisible(false);
    // } else {
    //   setIsSignInBtnEnabled(false);
    // }
    // return () => {
    //   // effect
    //   // console.log('clean up');
    // };
  }, [password, isLoading, helpMessage]);

  useEffect(() => {
    if (!authCode || !username) {
      setIsConfirmSignUpBtnEnabled(false);
    } else {
      setIsConfirmSignUpBtnEnabled(true);
    }
    return () => {
      // effect
    };
  }, [authCode])

  const signin = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* email section */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-mail" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={emailInputRef}
                    // onSubmitEditing={() => handleEmailInputSubmit()}
                    onChangeText={(value) => onChangeText('email', value)}

                    value={email}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={26}
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
                    // ref={passwordInputRef}
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
                <HelpMessage message={helpMessage} />
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

  if (isDialogVisible) {
    return confirmationDialog;
  }

  if (isConfirmVisible) {
    return confirm;
  }

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
