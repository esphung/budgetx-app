import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from 'expo-vector-icons';

import {
  // StyleSheet,
  View,
  Text,
  AsyncStorage,
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
  // Icon,
} from 'native-base';


import colors from 'main/colors';

import styles from './styles';

function SignInScreen(props) {
  // state hooks
  const passwordInputRef = useRef(null);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  // methods
  const signIn = async () => {
    const userTokenValue = '123456789';
    await AsyncStorage.setItem('userToken', userTokenValue);
    // console.log('userToken set:', userTokenValue);
    props.navigation.navigate('AuthLoading');
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
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    }
    // this.setState({[key]: value})
  }

  useEffect(() => {
    console.log('username:', username);
    console.log('password:', password);
    return () => {
      // effect
    };
  }, [username, password]);

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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

                    keyboardAppearance="dark"
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

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity
                  onPress={() => signIn()}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
