import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from 'expo-vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import OfflineScreen from '../screens/OfflineScreen';

import SpinnerMask from 'main/src/components/SpinnerMask';

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

import {
  loadUserObject,
  saveUserObject,
} from 'main/src/storage/UserStorage';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from 'main/colors';

import styles from './styles';

import { isValidUsername, getButtonStyle } from './functions';


const messages = {
  emptyUsernameOrPassword: 'Enter username and password',
  mustPressSubmitBtn: 'Hit the submit button',
}

function SignInScreen(props) {
  // state hooks
  const usernameInputRef = useRef(null);

  const passwordInputRef = useRef(null);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [helpMessage, setHelpMessage] = useState(null);

  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const [isHelpIconVisible, setIsHelpIconVisible] = useState(true);

  const [helpIcon, setHelpIcon] = useState('md-help');

  const [user, setUser] = useState(null);

  // const [user, setUser] = useState(null);

  // async _cacheResourcesAsync() {
  //   const images = [require('./assets/snack-icon.png')];

  //   const cacheImages = images.map(image => {
  //     return Asset.fromModule(image).downloadAsync();
  //   }); 
  //   return Promise.all(cacheImages);
  // }import React from 'react'

  function handleHelpBtnPressed() {
    if (helpMessage) {
      setHelpMessage(null);
      setHelpIcon('md-help');
    } else if (!username) {
      usernameInputRef.current._root.focus();
      setHelpMessage(messages.emptyUsernameOrPassword);
    } else if (!password) {
      passwordInputRef.current._root.focus();
      setHelpMessage(messages.emptyUsernameOrPassword);
    } else if ((isValidUsername(username)) && password) {
      setHelpMessage(messages.mustPressSubmitBtn);
    }
  }
  
  const clearState = () => {
    setIsMessageVisible(false);
    setHelpMessage(null);
    setIsLoading(false);
    setIsSignInBtnEnabled(false);
    setPassword(null);
    setUsername(null);
    setIsHelpIconVisible(true);

    setHelpIcon('md-help');
  }

  useEffect(() => {

    if (helpMessage) {
      if (!username) {
        // setHelpIcon('md-help')
        setHelpIcon('md-checkbox-outline');
      } else if (helpMessage && username && (!password)) {
        setHelpIcon('md-checkbox-outline');
        setHelpMessage(messages.emptyUsernameOrPassword);
      }
      else {
        setHelpIcon('md-checkbox');
      }    
    }

    // return () => {
    //   effect
    // };
  }, [isHelpIconVisible, helpMessage, username])


  // methods
  const signIn = async () => {
    setIsLoading(true);
    // const userTokenValue = '123456789';
    // await AsyncStorage.setItem('userToken', userTokenValue);
    // // console.log('userToken set:', userTokenValue);
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(username, password)
      .then((cognitoUser) => {
        // setUser(cognitoUser);
        console.log(cognitoUser);

        setUser(cognitoUser)



        props.navigation.navigate('AuthLoading');
      })
      .catch((err) => {
        // console.log('Error when signing in: ', err.message);
        // Alert.alert('Error when signing in: ', err.message);
        setHelpMessage(err.message);
      });
    


    // setIsLoading(false);
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

  async function retrieveLocalUser() {
    const localUserObject = await loadUserObject();
    

    setUser(localUserObject)
  }

  useEffect(() => {
    // console.log('username:', username);
    // console.log('password:', password);

    

    if (username && isValidUsername(username) && password) {
      setIsSignInBtnEnabled(true);
      // console.log(username);
      setIsHelpIconVisible(false);
    } else {
      setIsSignInBtnEnabled(false);
    }
    return () => {
      // effect
    };
  }, [username, password, isLoading]);

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

                    ref={usernameInputRef}

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
                  }]}
                  >
                <View style={
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',

                    alignItems: 'center',


                  }
                }>
                  <View style={
                    {
                      flex: 0.1,
                      position: 'absolute',
                    }
                  }>
                
                  <Text
                    style={
                      [
                        styles.textStyle,
                        {
                          opacity: 0.3,
                        }
                      ]
                    }
                  >
                    { helpMessage }
                  </Text>
                  </View>
                  </View>
                </Item>
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
  } else {
    return view;
  }
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
