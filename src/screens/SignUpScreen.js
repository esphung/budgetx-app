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

import OfflineScreen from '../screens/OfflineScreen';

import SpinnerMask from 'main/src/components/SpinnerMask';

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


import { AppLoading } from 'expo';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import countries from '../../Countries';

import colors from '../../colors';

import styles from './styles';

import Offline from '../components/Offline';

import { isValidUsername, isValidPhoneNumber, getButtonStyle } from './functions';

function SignUpScreen(props) {
  /*
  * > Hooks
  */
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [email, setEmail] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');

  const [authCode, setAuthCode] = useState(null);

  const [flag, setFlag] = useState(null);

  const [modalVisible, setModalVisible] = useState(null);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [dialCode, setDialCode] = useState(null);

  const [isSignUpBtnEnabled, setIsSignUpBtnEnabled] = useState(false);

  const [isConfirmSignUpBtnEnabled, setIsConfirmSignUpBtnEnabled] = useState(false);

  const [isResendCodeBtnEnabled, setIsResendCodeBtnEnabled] = useState(false);

  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(true);

  function isValidEmail(string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
  }

  /*
  * > Input Refs
  */
  const usernameInputRef = useRef(null);

  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const phoneNumberInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  const clearState = () => {
    setIsConfirmSignUpBtnEnabled(false);
    setIsResendCodeBtnEnabled(false);
    setIsAuthCodeInputEnabled(true);

    setIsLoading(false);
  };

  useEffect(() => {
    // Default render of country flag
    const defaultFlag = countries.filter((obj) => obj.name === 'United States')[0].flag;
    setFlag(defaultFlag);

    setDialCode(countries.filter((obj) => obj.name === 'United States')[0].dial_code)
    // setCountryData(countries);
    return () => {
      // effect
    };
  }, []);

  useEffect(() => {
    if (authCode) {
      // console.log(username);
      setIsConfirmSignUpBtnEnabled(true);
      setIsResendCodeBtnEnabled(true);
    }

    if (
      username
      && isValidUsername(username)
      && password
      && isValidEmail(email)
      && isValidPhoneNumber(phoneNumber)
    ) {
      // console.log(phoneNumber);
      setIsSignUpBtnEnabled(true);
      // setIsConfirmSignUpBtnEnabled(true);

      // console.log('Sign up available');
    } else {
      setIsSignUpBtnEnabled(false);
      // setIsConfirmSignUpBtnEnabled(false);
      // setIsResendCodeBtnEnabled(false);
    }
    return () => {
      // effect
    };
  }, [username, password, email, phoneNumber, authCode]);

  /*
  * > Handlers
  */
  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    if (key === 'username') {
      setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'password') {
      setPassword(value.replace(' ', ''));
    } else if (key === 'email') {
      var re = /^(((\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // return re.test(String(email).toLowerCase());
      setEmail(value.replace(/^[` ~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'phoneNumber') {
      setPhoneNumber(value.replace(/[A-z]|[` ~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
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
    phoneNumberInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handlePhoneNumberInputSubmit() {
    if (!phoneNumber.includes(dialCode)) {
      setPhoneNumber(`${dialCode}${phoneNumber}`);
    }
    // console.log(`${dialCode}${phoneNumber}`);
    // setPhoneNumber(`${dialCode}${phoneNumber}`);
    // authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

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

  /*
  * > User Sign Up Methods
  */
  // Sign up user with AWS Amplify Auth
  async function signUp() {
    setIsLoading(true);
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber; // +01234567890 format
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number },
    })
      .then(() => {
        // console.log('Sign up successful!');
        Alert.alert('Enter the confirmation code you received.');
      })
      .catch((err) => {
        if (!err.message) {
          // console.log('Error when signing up: ', err.message);
          Alert.alert('Error when signing up: ', err.message);
        }
      });

    setIsLoading(false);
  }

  // Confirm users and redirect them to the SignIn page
  async function confirmSignUp() {
    if (authCode !== null) {
      // const { username, authCode } = this.state;
      if (!username) {
        usernameInputRef.current._root.focus();
        Alert.alert('Please provide a username');
        return
      }
      await Auth.confirmSignUp(username, authCode)
        .then(() => {
          props.navigation.navigate('SignIn');
          // console.log('Confirm sign up successful');
          // Alert.alert('Confirm sign up successful');
        })
        .catch((err) => {
          if (!err.message) {
            // console.log('Error when entering confirmation code: ', err);
            Alert.alert('Error when entering confirmation code: ', err);
          } else {
            // console.log('Error when entering confirmation code: ', err.message);
            Alert.alert('Error when entering confirmation code: ', err.message);
          }
        });
    }
  }

  // Resend code if not received already
  async function resendSignUp() {
    // const { username } = this.state;
    if (!username) {
      usernameInputRef.current._root.focus();
      Alert.alert('Please provide a username');
      return
    }
    await Auth.resendSignUp(username)
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

  /*
  * > return view component
  */
  const signup = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled={isKeyboardAvoidEnabled}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
{/*
                <View
                  style={
                    {
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',

                      // width: '100%',

                      // borderWidth: 1,
                      // borderColor: 'white',
                      // borderStyle: 'dashed',
                    }
                  }
                >
                  <Image
                    style={{
                      height: '50%',
                      width: '50%',
                      opacity: 0.7,
                      // borderRadius: 12,
                      // backgroundColor: 'pink',

                      // borderWidth: 1,
                      // borderColor: 'white',
                    }}
                    resizeMode="contain"
                    // source={global.noWifiImage}
                    source={global.avatar}
                  />

                </View>*/}

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
                    ref={usernameInputRef}
                    onChangeText={(value) => onChangeText('username', value)}

                    value={username}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
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
                    onSubmitEditing={() => handlePasswordInputSubmit()}
                    ref={passwordInputRef}
                    onChangeText={(value) => onChangeText('password', value)}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={16}
                  />
                </Item>
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
                {/*
                * > phone number section
                */}
                <Item rounded style={styles.itemStyle}>
                  <PickCountryModal />
                  <Ionicons
                    active
                    name="md-call"
                    style={styles.iconStyle}
                    onPress={() => showModal()}
                  />

                  {/*
                  * > country flag
                  */}
                  <TouchableOpacity
                    onPress={showModal}
                    style={
                      {
                        flex: 0.1,
                        alignItems: 'center',

                        // borderWidth: 1,
                        // borderColor: 'orange',
                        // borderStyle: 'solid',
                      }
                    }
                  >
                    <Text>{flag}</Text>
                  </TouchableOpacity>


                  <Input
                    style={styles.input}
                    placeholder="+12345678910"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={phoneNumberInputRef}
                    value={phoneNumber}
                    onEndEditing={() => setPhoneNumber(`${phoneNumber}`)}
                    onSubmitEditing={() => handlePhoneNumberInputSubmit()}
                    onChangeText={(val) => onChangeText('phoneNumber', val)}

                    value={phoneNumber}

                    keyboardAppearance="dark"
                    onFocus={() => {
                      // setPhoneNumber('');
                      setIsKeyboardAvoidEnabled(true);
                    }}
                    maxLength={12}
                  />
                </Item>


            <View>
            <TouchableOpacity
              onPress={signUp}
              style={getButtonStyle(isSignUpBtnEnabled)}
              disabled={!isSignUpBtnEnabled}
            >
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>



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
                  onSubmitEditing={() => handleAuthCodeInputSubmit()}
                  onChangeText={(value) => onChangeText('authCode', value)}

                  keyboardAppearance="dark"
                  onFocus={() => setIsKeyboardAvoidEnabled(true)}
                />
              </Item>
              <TouchableOpacity
                disabled={!isConfirmSignUpBtnEnabled}
                onPress={confirmSignUp} style={getButtonStyle(isConfirmSignUpBtnEnabled)}
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

                {/* code confirmation section  */}

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

  if (!isLoading) {
    return view;
  }
  else if (isLoading === true) {
    return (
      <SpinnerMask>
        <AppLoading
          autoHideSplash
          // startAsync={_cacheResourcesAsync}
          onFinish={() => setIsLoading(false)}
          onError={console.warn}
        />
      </SpinnerMask>

    );
  }
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
