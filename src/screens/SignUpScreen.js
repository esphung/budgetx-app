import React, { useState, useEffect, useRef } from 'react';

import { Ionicons } from 'expo-vector-icons';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  Animated,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon
} from 'native-base';

import colors from 'main/colors';

import styles from './styles';

function SignUpScreen() {
  // input refs
  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const phoneNumberInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  // state hooks
  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [email, setEmail] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState(null);

  const [authCode, setAuthCode] = useState(null);

  // input handlers
  function onChangeText(key, value) {
    console.log('key:', key);
    console.log('value:', value);

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

    // if (key === 'username') {
    //   setUsername(value);
    // } else if (key === 'password') {
    //   setPassword(value);
    // }
    // this.setState({[key]: value})
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
    authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleAuthCodeInputSubmit() {
    // emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        // behavior="padding"
        // enabled
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
                    // onSubmitEditing={(event) => {refs.SecondInput._root.focus()}}
                    onSubmitEditing={() => handleUsernameInputSubmit()}
                    onChangeText={(value) => onChangeText('username', value)}

                    keyboardAppearance="dark"
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
                    // ref={c => this.SecondInput = c}
                    // ref="SecondInput"
                    // onSubmitEditing={(event) => {this.refs.ThirdInput._root.focus()}}
                    onSubmitEditing={() => handlePasswordInputSubmit()}
                    ref={passwordInputRef}
                    onChangeText={(value) => onChangeText('password', value)}

                    keyboardAppearance="dark"
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
                    // onSubmitEditing={(event) => {this.refs.FourthInput._root.focus()}}
                    onSubmitEditing={() => handleEmailInputSubmit()}
                    onChangeText={(value) => onChangeText('email', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                {/* phone section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-call" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="+44766554433"
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
                  />
                </Item>

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
                  />
                </Item>

                {/* End of text input */}
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Sign Up
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Confirm Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
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

SignUpScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

export default SignUpScreen;
