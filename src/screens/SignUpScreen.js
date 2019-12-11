/*
FILENAME:  SignUpScreen.js
PURPOSE:   Sign Up Screen for budget x app
AUTHOR:    Eric Phung
CREATED:   12/10/2019 02:26 PM
UPDATED:   12/10/2019 02:26 PM
*/

import React, { useState, useEffect, useRef } from 'react';

import { Ionicons } from 'expo-vector-icons';

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
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import countries from 'main/Countries';

import colors from 'main/colors';

import styles from './styles';

function SignUpScreen(props) {
  /*
  * > Hooks
  */
  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [email, setEmail] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');

  const [authCode, setAuthCode] = useState(null);

  const [flag, setFlag] = useState(null);

  const [modalVisible, setModalVisible] = useState(null);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  /*
  * > Input Refs
  */
  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const phoneNumberInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  useEffect(() => {
    // Default render of country flag
    const defaultFlag = countries.filter((obj) => obj.name === 'United States')[0].flag;
    setFlag(defaultFlag);

    // setCountryData(countries);
    return () => {
      // effect
    };
  }, []);

  /*
  * > Handlers
  */
  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    if (key === 'username') {
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    } else if (key === 'email') {
      setEmail(value);
    } else if (key === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (key === 'authCode') {
      setAuthCode(value);
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
    phoneNumberInputRef.current._root.focus();
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
      // Update the state then hide the Modal
      setPhoneNumber(countryCode);
      setFlag(countryFlag);
      // this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  const PickCountryModal = () => {
    const modal = (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ flex: 1, backgroundColor: colors.dark }}>
          <View style={{ height: '80%', marginTop: 80 }}>
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
                        (
                        {item.dial_code}
                        )
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => hideModal()}
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
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber; // +01234567890 format
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number },
    })
      .then(() => {
        console.log('Sign up successful!');
        Alert.alert('Enter the confirmation code you received.');
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error when signing up: ', err.message);
          Alert.alert('Error when signing up: ', err.message);
        }
      });
  }

  // Confirm users and redirect them to the SignIn page
  async function confirmSignUp() {
    // const { username, authCode } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        props.navigation.navigate('SignIn');
        console.log('Confirm sign up successful');
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error when entering confirmation code: ', err);
          Alert.alert('Error when entering confirmation code: ', err);
        } else {
          console.log('Error when entering confirmation code: ', err.message);
          Alert.alert('Error when entering confirmation code: ', err.message);
        }
      });
  }

  // Resend code if not received already
  async function resendSignUp() {
    // const { username } = this.state;
    await Auth.resendSignUp(username)
      .then(() => console.log('Confirmation code resent successfully'))
      .catch((err) => {
        if (!err.message) {
          console.log('Error requesting new confirmation code: ', err);
          Alert.alert('Error requesting new confirmation code: ', err);
        } else {
          console.log('Error requesting new confirmation code: ', err.message);
          Alert.alert('Error requesting new confirmation code: ', err.message);
        }
      });
  }

  /*
  * > return component
  */
  const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={isKeyboardAvoidEnabled}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* username section  */}
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

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
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
                    onSubmitEditing={() => handlePhoneNumberInputSubmit()}
                    onChangeText={(val) => onChangeText('phoneNumber', val)}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                  />

                </Item>

                <TouchableOpacity
                  onPress={signUp}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>
                    Sign Up
                  </Text>
                </TouchableOpacity>

                {/* code confirmation section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-apps" style={styles.iconStyle} />
                  <Input
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
                <TouchableOpacity onPress={confirmSignUp} style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Confirm Sign Up
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={resendSignUp} style={styles.buttonStyle}>
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
  return view;
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
