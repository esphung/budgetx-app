import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from 'expo-vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import OfflineScreen from '../screens/OfflineScreen';

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
  Alert,
  // Animated,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from 'main/colors';

import styles from './styles';

import { isValidUsername, getButtonStyle } from './functions';

function SignInScreen(props) {
  // state hooks
  const passwordInputRef = useRef(null);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

  // const [user, setUser] = useState(null);

  // methods
  const signIn = async () => {
    // const userTokenValue = '123456789';
    // await AsyncStorage.setItem('userToken', userTokenValue);
    // // console.log('userToken set:', userTokenValue);
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(username, password)
      .then((cognitoUser) => {
        // setUser(cognitoUser);
        // console.log(cognitoUser);
        props.navigation.navigate('AuthLoading');
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error when signing in: ', err);
          Alert.alert('Error when signing in: ', err);
        } else {
          console.log('Error when signing in: ', err.message);
          Alert.alert('Error when signing in: ', err.message);
        }
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
      setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'password') {
      setPassword(value.replace(' ', ''));
    } 
    // this.setState({[key]: value})
  }

  useEffect(() => {
    // console.log('username:', username);
    // console.log('password:', password);

    if (username && isValidUsername(username) && password) {
      setIsSignInBtnEnabled(true);
      // console.log(username);
    } else {
      setIsSignInBtnEnabled(false);
    }
    return () => {
      // effect
    };
  }, [username, password]);

  const signin = (
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

                    value={username}

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

                    value={password}

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
