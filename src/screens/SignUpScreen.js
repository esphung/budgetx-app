/*
FILENAME:  SignUpScreen.js
PURPOSE:   Sign Up Screen for budget x app
AUTHOR:     Eric Phung
CREATED:    12/10/2019 02:26 PM
UPDATED:    12/10/2019 02:26 PM
            12/30/2019 02:48 AM | Offline screen redirect
*/

import React, { useState, useEffect, useRef } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

// import PropTypes from 'prop-types';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  // StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  // Animated,
  // TextInput,
  // Image,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';


// import { AppLoading } from 'expo';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import Dialog from 'react-native-dialog';

import OfflineScreen from './OfflineScreen';

import SpinnerMask from '../components/SpinnerMask';

import HelpMessage from '../../storybook/stories/HelpMessage';

import countries from '../../Countries';

import colors from '../../colors';

import styles from '../../styles';

import isValidEmail from '../../src/functions/isValidEmail';


// import Offline from '../components/Offline';

// import { getButtonStyle } from './functions';

// import isValidUsername from '../../src/functions/isValidUsername';

// import isValidPhoneNumber from '../../src/functions/isValidPhoneNumber';

import getButtonStyle from '../../src/functions/getButtonStyle';

function SignUpScreen(props) {
  /*
  * > Hooks
  */
  const [isLoading, setIsLoading] = useState(false);

  // const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [email, setEmail] = useState(null);

  // const [phoneNumber, setPhoneNumber] = useState('');

  const [authCode, setAuthCode] = useState(null);

  // const [flag, setFlag] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  // const [dialCode, setDialCode] = useState(null);

  const [isSignUpBtnEnabled, setIsSignUpBtnEnabled] = useState(false);

  const [isConfirmSignUpBtnEnabled, setIsConfirmSignUpBtnEnabled] = useState(false);

  const [isResendCodeBtnEnabled, setIsResendCodeBtnEnabled] = useState(false);

  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(true);

  const [helpMessage, setHelpMessage] = useState(null);

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');

  const [dialogTitle, setDialogTitle] = useState('');

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  // function isValidEmail(string) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
  // }

  /*
  * > Input Refs
  */
  // const usernameInputRef = useRef(null);

  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  // const phoneNumberInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  // const clearState = () => {
  //   setUsername('');
  //   setPassword('');
  //   setEmail('');
  //   setPhoneNumber('');
  //   setAuthCode('');
  //   setFlag(null);
  //   setModalVisible(false);
  //   setIsKeyboardAvoidEnabled(false);
  //   setDialCode(null);


  //   setIsConfirmSignUpBtnEnabled(false);
  //   setIsResendCodeBtnEnabled(false);
  //   setIsAuthCodeInputEnabled(true);

  //   setHelpMessage('');
  //   setIsDialogVisible(false);
  //   setDialogMessage('');
  //   setDialogTitle('');
  //   setIsConfirmVisible(false);

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   // Default render of country flag
  //   const defaultFlag = countries.filter((obj) => obj.name === 'United States')[0].flag;
  //   // setFlag(defaultFlag);

  //   setDialCode(countries.filter((obj) => obj.name === 'United States')[0].dial_code)
  //   // setCountryData(countries);
  //   return () => {
  //     // effect
  //   };
  // }, []);

  useEffect(() => {
    // if (!username || username.length < global.minUsernameLength || !isValidUsername(username)) {
    //   setHelpMessage('Username invalid');
    // }

    // if (!password) {
    //   setHelpMessage('Password invalid');
    // }

    if (!email || !password) {
      setHelpMessage('Enter email and password');
    } else if (!isValidEmail(email)) {
      setHelpMessage('Invalid email');
    } else if (password.length < global.minPasswordLength) {
      setHelpMessage('Password too short');
    }


    // else if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
    //   setHelpMessage('Phone is invalid');
    // }

    else {
      setHelpMessage('');
    }
    return () => {
      // effect
    };
  });

  useEffect(() => {
    if (password && isValidEmail(email) && password.length >= global.minPasswordLength) {
      setIsSignUpBtnEnabled(true);
    }
    else {
      setIsSignUpBtnEnabled(false);
    }
  }, [password, email]);

  useEffect(() => {
    if (!authCode || !email) {
      // console.log(username);
      setIsConfirmSignUpBtnEnabled(false);
      setIsResendCodeBtnEnabled(false);
    } else {
      setIsConfirmSignUpBtnEnabled(true);
      setIsResendCodeBtnEnabled(true);
    }
    return () => {
      // effect
    };
  }, [authCode, email]);

  /*
  * > Handlers
  */
  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    // if (key === 'username') {
    //   setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    // }
    if (key === 'password') {
      setPassword(value.replace(' ', ''));
    } else if (key === 'email') {
      var re = /^(((\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // return re.test(String(email).toLowerCase());
      setEmail(value.replace(/^[` ~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'authCode') {
      setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    }
  }

  function handleUsernameInputSubmit() {
    passwordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handlePasswordInputSubmit() {
    emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleEmailInputSubmit() {
    // phoneNumberInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  // function handlePhoneNumberInputSubmit(value) {
  //   if (value === '+') {
  //     setPhoneNumber(dialCode);
  //     return;
  //   }
  //   // console.log(value);
  //   // console.log(typeof value);

  //   const regexDialCode = /^(\+?\d{1,3}|\d{1,4})$/;
  //   // setPhoneNumber(`${dialCode}${value}`);
  //   const phone = value.replace(regexDialCode, '');
  //   // value = value.replace(/[+.]{1,3}/g,'');

  //   if (!value.includes(dialCode)) {
  //     value = `${dialCode}${value}`;
  //     setPhoneNumber(`${dialCode}${phone}`);
      
  //   }
  // }

  function handleAuthCodeInputSubmit() {
    // emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  /*
  * > Modal Methods
  */
  function showModal() {
    setModalVisible(true);
    // this.setState({ modalVisible: true })
  }
  function hideModal() {
    setModalVisible(false);
    // Refocus on the Input field after selecting the country code
    // phoneNumberInputRef.current._root.focus();
  }

  async function selectCountry(country) {
    // Get data from Countries.js
    // const countryData = await countries;
    try {
      // Get the country code
      const countryCode = await countries.filter(
        (obj) => obj.name === country,
      )[0].dial_code;
      // Get the country flag
      const countryFlag = await countries.filter(
        (obj) => obj.name === country,
      )[0].flag;

      setDialCode(countryCode);

      setFlag(countryFlag);

      setPhoneNumber(countryCode);
      

      // this.setState({ phoneNumber: countryCode, flag: countryFlag })
      hideModal();
    } catch (err) {
      // console.log(err);
      Alert.alert(err);
    }
  }

  const PickCountryModal = () => {
    const modal = (
      <Modal
        animationType="slide"
        // transparent={false}
        transparent
        visible={modalVisible}
      >
        <View style={
            {
            flex: 1,
            backgroundColor: colors.darkTwo,
            opacity: 0.7,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }>
          <View style={
            {
              // height: '100%',
              marginTop: 80,
            }
          }>
            {/*
            * > Render the list of countries
            */}
            <FlatList
              data={countries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={
                ({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => selectCountry(item.name)}
                  >
                    <View style={styles.countryStyle}>
                      <Text style={styles.textStyle}>
                        {item.flag}
                        {item.name}
                        ({item.dial_code})
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              hideModal();
              // Alert.alert('Ayye!');
            }}
            style={styles.closeButtonStyle}
          >
            <Text style={styles.textStyle}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
    return modal;
  };

  // function isPhoneAWSFormat(phone) {
  //   // +01234567890
  //   if (/[+][0-9]{11}/.test(phone)) {
  //     // console.log('Correct format');
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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

  /*
  * > User Sign Up Methods
  */
  // Sign up user with AWS Amplify Auth
  async function signUp() {
    let isSuccessful = false;
    setIsLoading(true);
      // Alert.alert('Phone valid');

    // rename variable to conform with Amplify Auth field phone attribute
    // const phone_number = phoneNumber; // +01234567890 format
    // console.log(phone_number);
    await Auth.signUp({
      username: email,
      password: password,
      // attributes: { email },
    })
      .then(() => {
        isSuccessful = true;
        // console.log('Sign up successful!');
        // Alert.alert('Enter the confirmation code you received.');
        // SHOW CONFIRRMATION DIALOG BOX HERE
        // setDialogTitle('Sign Up Successful!');
        // setDialogMessage('Enter the confirmation code you received.');
        // setIsDialogVisible(true);

        // setIsConfirmVisible(true);
        
      })
      .catch((err) => {
        console.log('err: ', err);
        if (!err.message) {
          // console.log('Error when signing up: ', err.message);
          // Alert.alert('Error when signing up: ', err.message);

          setDialogTitle('Error when signing up!');
          setDialogMessage(err.message);
          setIsDialogVisible(true);

          }
      });
    setIsLoading(false);

    if (isSuccessful) {
      setDialogTitle('Sign Up Successful!');
      setDialogMessage('Enter the confirmation code you received.');
      setIsDialogVisible(true);

      setIsResendCodeBtnEnabled(true);

      setIsConfirmVisible(true);
    }
  }

  // Confirm users and redirect them to the SignIn page
  async function confirmSignUp() {
    if (authCode !== null) {
      // const { username, authCode } = this.state;
      // if (!username) {
      //   usernameInputRef.current._root.focus();
      //   Alert.alert('Please provide a username');
      //   return;
      // }
      await Auth.confirmSignUp(email, authCode)
        .then(() => {
          props.navigation.navigate('SignIn');
          // console.log('Confirm sign up successful');
          Alert.alert('Confirm sign up successful');
        })
        .catch((err) => {
          // console.log('Error when entering confirmation code: ', err.message);
          Alert.alert('Error when entering confirmation code: ', err.message);
          
        });
    }
  }

  // Resend code if not received already
  async function resendSignUp() {
    // const { username } = this.state;
    // if (!username) {
    //   usernameInputRef.current._root.focus();
    //   Alert.alert('Please provide a username');
    //   return;
    // }
    await Auth.resendSignUp(email)
      .then(() => {
        Alert.alert('Confirmation code resent successfully!');
        // console.log('Confirmation code resent successfully');
      })
      .catch((err) => {
        if (!err.message) {
          // console.log('Error requesting new confirmation code: ', err);
          Alert.alert('Error requesting new confirmation code: ', err);
        } else {
          // console.log('Error requesting new confirmation code: ', err.message);
          Alert.alert('Error requesting new confirmation code: ', err.message);
        }
      });
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
                    // clearButtonMode="always"

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
                    ref={authCodeInputRef}
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
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  /*
  * > return view component
  */
  const signup = (
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
{/*                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder={`Username (mininum length of ${global.minUsernameLength})`}
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleUsernameInputSubmit}
                    ref={usernameInputRef}
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
                    // clearButtonMode="always"
                  />
                </Item>

                {/*  password section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.offWhite}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    onSubmitEditing={handlePasswordInputSubmit}
                    ref={passwordInputRef}
                    onChangeText={(value) => onChangeText('password', value)}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={16}
                  />
                </Item>


                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // if (isPhoneAWSFormat(phoneNumber) === false) {
                      //   // +01234567890
                      //   // Alert.alert('Phone is wrong format:', phoneNumber);
                      //   setDialogTitle('Phone Number Invalid');
                      //   setDialogMessage('This is the correct format of a phone number\n+01234567890');
                      //   setIsDialogVisible(true);
                      // }

                      if (password.length < global.minPasswordLength) {
                        setDialogTitle('Password Invalid');
                        setDialogMessage(`Password not long enough. Make it atleast ${global.minPasswordLength} letters or numbers.`);
                        setIsDialogVisible(true);
                      }

                      else {
                        // console.log(username);
                        // console.log(password);
                        // console.log(email);
                        // console.log(phoneNumber);
                        signUp();
                      }
                    }}
                    style={getButtonStyle(isSignUpBtnEnabled)}
                    disabled={!isSignUpBtnEnabled}
                  >
                    <Text style={styles.buttonText}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* help message section  */}
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
        ({ isConnected }) => (isConnected ? signup : offline)
      }
    </NetworkConsumer>
  );

  // return view;

  if (isDialogVisible) {
    return confirmationDialog;
  }

  if (isConfirmVisible) {
    return confirm;
  }

  if (!isLoading) {
    return view;
  }
  return (
    <SpinnerMask>
{/*      <AppLoading
        autoHideSplash
        startAsync={clearState}
        onFinish={() => {}}
        onError={console.warn}
      />*/}
    </SpinnerMask>

  );
}

/*
* > Navigation Options
*/
SignUpScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

// /*
// * > Prop Types
// */
// SignUpScreen.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phoneNumber: PropTypes.string.isRequired,
//   authCode: PropTypes.string.isRequired,
// };

export default SignUpScreen;
