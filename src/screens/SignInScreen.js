import React, { useState, useEffect,  useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import { showMessage, hideMessage } from "react-native-flash-message";

import FacebookLogin from '../components/FacebookLoginButton';

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

// import the Analytics category
import Analytics from '@aws-amplify/analytics';

import {
  Container,
  Item,
  Input,
} from 'native-base';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../src/storage/SettingsStorage';

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

import uuidv4 from '../functions/uuidv4';

import AppleSignInButton from '../components/AppleSignInButton';

{/**
<AppleAuthentication.AppleAuthenticationButton
  onPress={onSignIn}
  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  style={{ width: 200, height: 64 }} // You must choose default size
/>




function appleSignInCallback(authResult) {
     // Add the apple's id token to the Cognito credentials login map.
     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'IDENTITY_POOL_ID',
        Logins: {
           'appleid.apple.com': authResult['id_token']
        }
     });

     // Obtain AWS credentials
     AWS.config.credentials.get(function(){
        // Access AWS resources here.
     });
}
*/}

function SignInScreen(props) {
  // state hooks
  // const usernameInputRef = useRef(null);

  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const [email, setEmail] = useState(global.emailAddressInput);

  const [username, setUsername] = useState(global.emailAddressInput);

  const [password, setPassword] = useState(global.passwordInput);

  const [authCode, setAuthCode] = useState(null);

  const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [helpMessage, setHelpMessage] = useState(null);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(true);

  const authCodeInputRef = useRef(null);

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

  

      // console.log('userToken: ', userToken);
      await AsyncStorage.setItem('userToken', String('')); 
    
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(email, password)
      .then(async (cognito) => {
        // console.log(cognito);
        if (cognito) {
          // set username key here!
          showMessage(`Signed in as ${cognito.attributes.email}`);

          // create an event handler
          Analytics.record({
            name: "Sign in attempt successful!",
            attributes: { username: cognito.attributes.email }
          });

          const userTokenValue = String(global.storageKey) + '@session123456789';
          await AsyncStorage.setItem('userToken', userTokenValue);
          // console.log('userToken set:', userTokenValue);

          AsyncStorage.setItem('isFederated', JSON.stringify(false))

          AsyncStorage.setItem('authenticated', JSON.stringify(true))
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

          

                    // create an event handler
          Analytics.record({
            name: "Sign in attempt failed!",
            // attributes: { username: cognito.attributes.email }
          });

        }
      });

      // Analytics.record({ name: "Sign in attempted!"});
      // console.log('Analytics recorded sign in attempt!');

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

  function handleEmailInputSubmit () {
    if (global.emailAddressInput) {
      try {
        passwordInputRef.current._root.focus();
      } catch(e) {
        // statements
        authCodeInputRef.current._root.focus();
        console.log(e);
      }
    }
  }

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
  }, [authCode]);

  // global.emailAddressInput = 'hello'

  useEffect(() => {
    if (global.emailAddressInput) {
      setEmail(global.emailAddressInput);
    }
    // if (email) {
    //   passwordInputRef.current._root.focus();
    // }
    // return () => {
    //   // effect
    // };
  }, []);

    const handleFacebookSignIn = async (userData) => {
    setIsLoading(true);
    // do stuff with the new user's data
    console.log('userData: ', userData);
    
    // setUserData(userData);

    


    global.storageKey = userData.id

    let Image_Http_URL = { uri: userData.picture.data.url};

    global.avatar = Image_Http_URL;


    let storage = await loadSettingsStorage(global.storageKey);

    // global.storageKey = userData.id

    AsyncStorage.setItem('storageKey', global.storageKey);

    for (var i = storage.transactions.length - 1; i >= 0; i--) {
      storage.transactions[i].owner = global.storageKey
    }

    for (var i = storage.categories.length - 1; i >= 0; i--) {
      storage.categories[i].owner = global.storageKey
    }

    storage.user.id = userData.id;

    storage.user.name = userData.name;

    storage.user.email = userData.email;

    storage.user.image_url = userData.picture.data.url;

    saveSettingsStorage(global.storageKey, storage);

    console.log('storage: ', storage);

    // global.isUserAuthenticated = true;

    // global.authenticated = true;

    // AsyncStorage.setItem('authenticated', JSON.stringify(true))

    AsyncStorage.setItem('isFederated', JSON.stringify(true))

    let userToken = global.storageKey + '@session' + uuidv4();

      // console.log('userToken: ', userToken);
    await AsyncStorage.setItem('userToken', userToken); // save user token

    // let userToken = global.storageKey + '@session' + String(Math.random(1,8)*100);

    // await AsyncStorage.setItem('userToken', userToken); // save user token



    setIsLoading(false);

    props.navigation.navigate('AuthLoading');
}

  const handleFacebookSignOut = async (userData) => {
    setIsLoading(true);
    // do stuff with the new user's data
    await Auth.signOut()
      .then(() => {
        AsyncStorage.removeItem('userToken');

        AsyncStorage.removeItem('storageKey');

        AsyncStorage.removeItem('isLoginEnabled');

        // AsyncStorage.removeItem('isUserAuthenticated');
        AsyncStorage.removeItem('authenticated');

        global.storageKey = '';

        global.email = '';

        global.emailAddressInput = '';

        // global.isUserAuthenticated = false;
        global.authenticated = false;

        global.isFederated = false;

        AsyncStorage.setItem('authenticated', JSON.stringify(false))

        AsyncStorage.setItem('isFederated', JSON.stringify(false))

        global.avatar = require('../../assets/avatar.png');

        AsyncStorage.setItem('isAppleSignedIn', JSON.stringify(false))


        // console.log('Removed AsyncsStorage Variables ..');


        // AsyncStorage.getAllKeys((err, keys) => {
        //   AsyncStorage.multiGet(keys, (error, stores) => {
        //     stores.map((result, i, store) => {
        //       console.log({ [store[i][0]]: store[i][1] });
        //       return true;
        //     });
        //   });
        // });

        // setHasRatedUs(false);

        // setIsBackedUp(false)

        AsyncStorage.setItem('storageKey', JSON.stringify(''))

        navigation.navigate('AuthLoading');

        // console.log('Sign out complete');
        // showMessage('Signed out');
        })
        .catch((err) => console.log('Error while signing out!', err));

// userToken = global.storageKey + '@session' + uuidv4();

      // console.log('userToken: ', userToken);
      await AsyncStorage.setItem('userToken', String('')); 

        await setIsLoading(false)

        handleRoute('AuthLoading');
      }


  const signin = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
              {/* Facebook Login */}
            {
              (!global.isFederated && !global.isAopleSignedIn && !global.authenticated) && <FacebookLogin handleFacebookSignIn={handleFacebookSignIn} handleFacebookSignOut={handleFacebookSignOut} />
            }
            {
              // (!global.isFederated && !global.isAppleSignedIn && !global.authenticated) && <AppleSignInButton appleSignInCallback={appleSignInCallback} />
            }
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
                    onSubmitEditing={() => passwordInputRef.current._root.focus()}
                    onChangeText={(value) => onChangeText('email', value)}

                    value={email}

                    keyboardAppearance="dark"
                    onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={26}

                    

                    autoCompleteType="email"


                    textContentType="emailAddress"
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

                    autoCompleteType="password"

                    textContentType="password"
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

  async function appleSignInCallback(authResult) {
    global.isAppleSignedIn = true

    AsyncStorage.setItem('isAppleSignedIn', JSON.stringify(global.isAppleSignedIn))



    // if (!authResult.email) {
    //   // throw new Error('No email from Apple!', authResult)



    //   return
    // }

    // if (authResult.fullName.familyName && authResult.fullName.givenName) {} {
    //    // // global.storageKey = userId
    //   // AsyncStorage.setItem('storageKey', global.storageKey)

    //   // let token = authResult.identityToken
    //   // AsyncStorage.setItem('userToken', JSON.stringify(token))

    //   // let userEmail =  authResult.email

    //   let userFullName = authResult.fullName.givenName + ' ' + authResult.fullName.familyName

    //   let settings = await loadSettingsStorage(global.storageKey);

    //   // if (userEmail) settings.user.email = userEmail

    //   if (userFullName) settings.user.full_name = userFullName
    //   settings.user.full_name = userFullName;

    //   saveSettingsStorage(global.storageKey, settings);
    // }



    
    console.log('authResult: ', authResult);

    // // let userId = authResult.authorizationCode

    // // global.storageKey = userId
    // AsyncStorage.setItem('storageKey', global.storageKey)

    // let token = authResult.identityToken
    // AsyncStorage.setItem('userToken', JSON.stringify(token))

    // let userEmail =  authResult.email

    // let userFullName = authResult.fullName.givenName + ' ' + authResult.fullName.familyName

    // let settings = await loadSettingsStorage(global.storageKey);

    // if (userEmail) settings.user.email = userEmail

    // if (userFullName) settings.user.full_name = userFullName
    // // settings.user.name = userFullName;

    // saveSettingsStorage(global.storageKey, settings);

    // // global.isFederated = true;
    
    // // AsyncStorage.setItem('isFederated', JSON.stringify(global.isFederated))

    


   // Add the apple's id token to the Cognito credentials login map.
   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:f1677c4d-8148-4c3e-97e0-d81ffd75c15a',
      Logins: {
         'appleid.apple.com': authResult['identityToken']
      }
   });

   // Obtain AWS credentials
   AWS.config.credentials.get((result) => {
      // Access AWS resources here.

      // console.log('Success!')
      console.log('result: ', result);
      // alert('Coming Soon!')



      


   });

     // props.navigation.navigate('AuthLoading');
  props.navigation.navigate('AuthLoading');
}

  const view = (
    <NetworkConsumer>
      {
        ({ isConnected }) => ((isConnected && !global.isConfirmSent) ? signin : confirm)
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
    // return <AppleSignInButton appleSignInCallback={appleSignInCallback} />
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


// import React, { useState, useEffect,  useRef } from 'react';

// import PropTypes from 'prop-types';

// import { Ionicons } from '@expo/vector-icons';

// import { NetworkConsumer } from 'react-native-offline';

// import { showMessage, hideMessage } from "react-native-flash-message";

// // import the Analytics category
// // import Analytics from '@aws-amplify/analytics';
// // Analytics.record({ name: String!, attributes: Object, metrics: Object })

// import Amplify from '@aws-amplify/core';
// import config from '../../aws-exports';
// Amplify.configure(config);

// // Analytics.record({ name: "User authenticated!" });
// // console.log('Analytics recorded user authenticated!');

// import SpinnerMask from '../../src/components/SpinnerMask';

// import HelpMessage from '../../storybook/stories/HelpMessage';

// import {
//   // StyleSheet,
//   View,
//   Text,
//   // AsyncStorage,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   SafeAreaView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Keyboard,
//   Alert,
//   // Animated,
// } from 'react-native';

// // import the Analytics category
// import Analytics from '@aws-amplify/analytics';

// import {
//   Container,
//   Item,
//   Input,
// } from 'native-base';

// import {
//   loadSettingsStorage,
//   saveSettingsStorage,
// } from '../storage/SettingsStorage';

// // import { Asset } from 'expo-asset';

// // import { AppLoading } from 'expo';

// // AWS Amplify
// import Auth from '@aws-amplify/auth';

// // ui colors
// import colors from '../../colors';

// import styles from '../../styles';

// import OfflineScreen from './OfflineScreen';

// // import { getButtonStyle } from './functions';

// import getButtonStyle from '../../src/functions/getButtonStyle';

// import isValidUsername from '../../src/functions/isValidUsername';

// import isValidEmail from '../../src/functions/isValidEmail';

// import Dialog from "react-native-dialog";

// function SignInScreen(props) {
//   // state hooks
//   const usernameInputRef = useRef(null);

//   const passwordInputRef = useRef(null);

//   const emailInputRef = useRef(null);

//   const [email, setEmail] = useState(global.emailAddressInput);

//   const [username, setUsername] = useState('')

//   const [password, setPassword] = useState(null);

//   const [authCode, setAuthCode] = useState(null);

//   const [isSignInBtnEnabled, setIsSignInBtnEnabled] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);

//   const [helpMessage, setHelpMessage] = useState(null);

//   const [isConfirmVisible, setIsConfirmVisible] = useState(false);

//   const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

//   const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] = useState(true);

//   // const authCodeInputRef = useRef(null);

//   const [isConfirmSignUpBtnEnabled, setIsConfirmSignUpBtnEnabled] = useState(false);

//   const [isResendCodeBtnEnabled, setIsResendCodeBtnEnabled] = useState(false);

//   const [isDialogVisible, setIsDialogVisible] = useState(false);

//   const [dialogMessage, setDialogMessage] = useState('');

//   const [dialogTitle, setDialogTitle] = useState('');

//   function okDialogueBtnPressed() {
//     setIsDialogVisible(false);
//   }


//   const confirmationDialog = (
//     <View>
//       <Dialog.Container visible={isDialogVisible}>
//         <Dialog.Title>{ dialogTitle }</Dialog.Title>
//         <Dialog.Description>
//           { dialogMessage }
//         </Dialog.Description>
//         <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
//         <Dialog.Button label="Ok" onPress={okDialogueBtnPressed} />
//       </Dialog.Container>
//     </View>
//   );


//   // Resend code if not received already
//   async function resendSignUp() {
//     // let isSuccessful = false;
//     // const { username } = this.state;
//     if (!email) {
//       // usernameInputRef.current._root.focus();
//       // Alert.alert('Please provide a username');
//       setHelpMessage('Please provide a email');
//       // setDialogTitle('Please provide a username');
//       // setIsDialogVisible(true);
//       // isSuccessful = true;
//       return;
//     }
//     await Auth.resendSignUp(email)
//       .then(() => {
//         // Alert.alert('Confirmation code resent successfully!');
//         setHelpMessage('Confirmation code resent successfully!');
//         // setDialogTitle('Confirmation code resent successfully!');
//         // setIsDialogVisible(true);
//         // console.log('Confirmation code resent successfully');
//       })
//       .catch((err) => {
//         if (!err.message) {
//           // console.log('Error requesting new confirmation code: ', err);
//           // Alert.alert('Error requesting new confirmation code: ', err);
//           setHelpMessage('Error requesting new confirmation code');
//           // setDialogMessage(err);
//           // setIsDialogVisible(true);

//         }
//         // else {
//         //   // console.log('Error requesting new confirmation code: ', err.message);
//         //   // Alert.alert('Error requesting new confirmation code: ', err.message);
//         //   setHelpMessage('Error requesting new confirmation code: ', err);
//         //   // setDialogTitle(err);
//         //   // setDialogMessage(err.message);
//         //   // setIsDialogVisible(true);
//         // }
//       });
//   }


//     // Confirm users and redirect them to the SignIn page
//   async function confirmSignUp() {
//     let isSuccessful = false;
//     if (authCode !== null) {
//       // const { username, authCode } = this.state;
//       // if (!username) {
//       //   // usernameInputRef.current._root.focus();
//       //   // Alert.alert('Please provide a username');
//       //   setHelpMessage('Please provide a username');
//       //   return;
//       // }

//       console.log('global.emailAddressInput: ', global.emailAddressInput);

//       // console.log('global.email: ', global.email);

//       setUsername(global.emailAddressInput)

//       // alert(username)

//       // try {
//     //    
//     //    
//         await Auth.verifyCurrentUserAttributeSubmit('email', authCode)
//        .then(() => {
          

//         })


//     //     .then(() => {
//     //       isSuccessful = true;
//     //       // props.navigation.navigate('SignIn');/
//     //       setHelpMessage('Confirm successful!');
//     //       // console.log('Confirm sign up successful');
//     //       // Alert.alert('Confirm sign up successful');
//     //     })
//         .catch((err) => {
//           if (!err.message) {
//             console.log('Error when entering confirmation code: ', err);
//             // Alert.alert('Error when entering confirmation code: ', err);
//             setHelpMessage('Error when entering confirmation code');
//           }
//         });
//     //   } catch(e) {
//     //     // statements
//     //     console.log('e:', e);
//     //   }
//     // }
//     // if (isSuccessful) {
//     //   setIsConfirmVisible(false);
//     }


//     const user = await Auth.currentAuthenticatedUser()
//     .then(async (cognito) => {
//       global.storageKey = cognito.attributes.sub

//       try {
        
//         let storage = await loadSettingsStorage(global.storageKey)

//         storage.user.email = global.emailAddressInput
        
//         console.log('storage: ', storage);

//         saveSettingsStorage(global.storageKey, storage)
//       } catch(e) {
//         // statements
//         console.log('e:',e);
//       }

//     }).catch ((err) => {
//       console.log('err: ', err);
//     })

    
//     setIsConfirmVisible(false);



//     setHelpMessage('Confirm successful!');
//     props.navigation.navigate('Home');
//   }

//   function handleAuthCodeInputSubmit(value) {
//     // emailInputRef.current._root.focus();
//     setAuthCode(value.nativeEvent.text.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
//     // console.log(value.nativeEvent.text)
//   }

//     const confirm = (
//     <SafeAreaView style={styles.container}>
//       <StatusBar />
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior="padding"
//         // keyboardVerticalOffset={80}
//         enabled={isKeyboardAvoidEnabled}
//       >

//         <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <Container style={styles.infoContainer}>
//               <View style={styles.container}>

// {/*              <Item rounded style={styles.itemStyle}>
//                   <Ionicons active name="md-person" style={styles.iconStyle} />
//                   <Input
//                     style={styles.input}
//                     placeholder={`Username (mininum length of ${global.minUsernameLength})`}
//                     placeholderTextColor={colors.offWhite} // "#adb4bc"
//                     keyboardType="email-address"
//                     returnKeyType="next"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     onSubmitEditing={(value) => handleUsernameInputSubmit(value.nativeEvent.text)}
//                     // ref={usernameInputRef}
//                     onChangeText={(value) => onChangeText('username', value)}

//                     value={username}

//                     maxLength={global.maxUsernameLength}

//                     keyboardAppearance="dark"
//                     onFocus={() => setIsKeyboardAvoidEnabled(false)}
//                   />
//                 </Item>*/}

//                 {/* email section */}
//                 <Item rounded style={styles.itemStyle}>
//                   <Ionicons active name="md-mail" style={styles.iconStyle} />
//                   <Input
//                     style={styles.input}
//                     placeholder="Email"
//                     placeholderTextColor={colors.offWhite}
//                     keyboardType="email-address"
//                     returnKeyType="next"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     secureTextEntry={false}
//                     ref={emailInputRef}
//                     onSubmitEditing={() => handleEmailInputSubmit()}
//                     onChangeText={(value) => onChangeText('email', value)}

//                     value={email}

//                     keyboardAppearance="dark"
//                     onFocus={() => setIsKeyboardAvoidEnabled(false)}
//                     maxLength={26}
//                   />
//                 </Item>

//                 <Item rounded style={styles.itemStyle}>
//                   <Ionicons active name="md-apps" style={styles.iconStyle} />
//                   <Input
//                     disabled={!isAuthCodeInputEnabled}
//                     style={styles.input}
//                     placeholder="Confirmation code"
//                     placeholderTextColor={colors.offWhite}
//                     keyboardType="numeric"
//                     returnKeyType="done"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     secureTextEntry={false}
//                     // ref={authCodeInputRef}
//                     onSubmitEditing={handleAuthCodeInputSubmit}
//                     onChangeText={(value) => onChangeText('authCode', value)}

//                     value={authCode}

//                     keyboardAppearance="dark"
//                     onFocus={() => setIsKeyboardAvoidEnabled(true)}

//                     maxLength={global.maxAuthCodeLength}
//                   />
//                 </Item>
//                 <TouchableOpacity
//                   disabled={!isConfirmSignUpBtnEnabled}
//                   onPress={confirmSignUp}
//                   style={getButtonStyle(isConfirmSignUpBtnEnabled)}
//                 >
//                   <Text style={styles.buttonText}>
//                     Confirm Sign Up
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   disabled={!isResendCodeBtnEnabled}
//                   onPress={resendSignUp}
//                   style={getButtonStyle(isResendCodeBtnEnabled)}
//                 >
//                   <Text style={styles.buttonText}>
//                     Resend code
//                   </Text>
//                 </TouchableOpacity>

//                 {/* help message section  */}
//                 <HelpMessage message={helpMessage} />
//               </View>
//             </Container>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );

//   // methods
//   const signIn = async () => {
//     setIsLoading(true);
//     // const userTokenValue = '123456789';
//     // await AsyncStorage.setItem('userToken', userTokenValue);
//     // // console.log('userToken set:', userTokenValue);
//     // props.navigation.navigate('AuthLoading');
//     await Auth.signIn(email, password)
//       .then((cognito) => {
//         // console.log(cognito);

        

//         if (cognito) {
//           // set username key here!
//           showMessage(`Signed in as ${cognito.attributes.email}`);

//           // create an event handler
//           Analytics.record({
//             name: "Sign in attempt successful!",
//             attributes: { username: cognito.attributes.email }
//           });


//           props.navigation.navigate('AuthLoading');
//           // setIsLoading(false);
//         }

//       })
//       .catch((err) => {
//         // console.log('Error when signing in: ', err.message);
//         // Alert.alert('Error when signing in: ', err.message);
//         setHelpMessage(err.message);
//         setIsLoading(false);

//         if (err.message.includes('User is not confirmed.')) {
//           setDialogTitle(err.message);
//           setDialogMessage('Please enter the verification code we sent you or have us send it to you again.')
//           setIsDialogVisible(true);

//           setIsResendCodeBtnEnabled(true);

//           setIsConfirmVisible(true);

          

//                     // create an event handler
//           Analytics.record({
//             name: "Sign in attempt failed!",
//             // attributes: { username: cognito.attributes.email }
//           });

//         }
//       });

//       // Analytics.record({ name: "Sign in attempted!"});
//       // console.log('Analytics recorded sign in attempt!');

//       // send record of sign in attempt to analytics
//       // Analytics.record({ name: "Sign in attempted!"});
//       // console.log('Analytics recorded sign in attempt!');
//   };

//   // function onChangeText(key, value) {
//   //   // console.log('key:', key);
//   //   // console.log('value:', value);

//   //   if (key === 'username') {
//   //     setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
//   //   } else if (key === 'password') {
//   //     setPassword(value.replace(' ', ''));
//   //   } else if (key === 'authCode') {
//   //     setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
//   //   }
//   // }

//   // user input handlers
//   function handleUsernameInputSubmit() {
//     // passwordInputRef.current._root.focus();
//     // console.log(passwordInputRef.current._root.focus());
//   }

//   function handlePasswordInputSubmit() {
//     // authCodeInputRef.current._root.focus();
//     // console.log(passwordInputRef.current._root.focus());
//   }

//   function onChangeText(key, value) {
//     // console.log('key:', key);
//     // console.log('value:', value);

//     if (key === 'email') {

//       setEmail(value);
//     } else if (key === 'password') {
//       setPassword(value.replace(' ', ''));
//     } else if (key === 'authCode') {
//       setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
//     }
//   }

//   useEffect(() => {
//     // console.log('username:', username);
//     // console.log('password:', password);

//     if (email) {
//       setIsSignInBtnEnabled(true);
//     }

//     // else if (username.length >= 6 && isValidUsername(username) && password) {
//     //   setIsSignInBtnEnabled(true);
//     //   // console.log(username);
//     //   // setIsHelpIconVisible(false);
//     // } else {
//     //   setIsSignInBtnEnabled(false);
//     // }
//     // return () => {
//     //   // effect
//     //   // console.log('clean up');
//     // };
//   }, [password, isLoading, helpMessage]);

//   useEffect(() => {
//     if (!authCode) {
//       setIsConfirmSignUpBtnEnabled(false);
//     } else {
//       setIsConfirmSignUpBtnEnabled(true);
//     }
//     return () => {
//       // effect
//     };
//   }, [authCode]);

//   useEffect(() => {

//     if (global.isCodeSent) {
//       setIsConfirmVisible(true)
//     }

//     if (email) {
//       // passwordInputRef.current._root.focus();
//     }
//     // return () => {
//     //   // effect
//     // };
//   }, []);

//   const signin = (
//     <SafeAreaView style={styles.container}>
//       <StatusBar />
//       <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//         <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <Container style={styles.infoContainer}>
//               <View style={styles.container}>
//                 {/* email section */}
//                 <Item rounded style={styles.itemStyle}>
//                   <Ionicons active name="md-mail" style={styles.iconStyle} />
//                   <Input
//                     style={styles.input}
//                     placeholder="Email"
//                     placeholderTextColor={colors.offWhite}
//                     keyboardType="email-address"
//                     returnKeyType="next"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     secureTextEntry={false}
//                     ref={emailInputRef}
//                     // onSubmitEditing={() => handleEmailInputSubmit()}
//                     onChangeText={(value) => onChangeText('email', value)}

//                     value={email}

//                     keyboardAppearance="dark"
//                     onFocus={() => setIsKeyboardAvoidEnabled(false)}
//                     maxLength={26}

                    

//                     autoCompleteType="email"


//                     textContentType="emailAddress"
//                   />
//                 </Item>
//                 <Item rounded style={styles.itemStyle}>
//                   <Ionicons active name="md-lock" style={styles.iconStyle} />
//                   <Input
//                     style={styles.input}
//                     placeholder="Password"
//                     placeholderTextColor={colors.offWhite} // "#adb4bc"
//                     returnKeyType="go"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     secureTextEntry
//                     ref={passwordInputRef}
//                     onSubmitEditing={() => handlePasswordInputSubmit()}
//                     onChangeText={(value) => onChangeText('password', value)}

//                     value={password}

//                     maxLength={16}

//                     keyboardAppearance="dark"

//                     autoCompleteType="password"

//                     textContentType="password"
//                   />
//                 </Item>
//                 <TouchableOpacity
//                   disabled={!isSignInBtnEnabled}
//                   onPress={signIn}
//                   style={getButtonStyle(isSignInBtnEnabled)}
//                 >
//                   <Text style={styles.buttonText}>
//                     Sign In
//                   </Text>
//                 </TouchableOpacity>


//                 <Item style={
//                   [styles.itemStyle, {
//                     borderColor: 'transparent',
//                   }]
//                 }
//                 >
//                   <View style={
//                     {
//                       flex: 1,
//                       flexDirection: 'row',
//                       justifyContent: 'space-around',

//                       alignItems: 'center',
//                     }
//                   }
//                   />
//                 </Item>
//                 <HelpMessage message={helpMessage} />
//               </View>
//             </Container>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );

//   const offline = <OfflineScreen />;

//   // global.isCodeSent

//   const view = (
//     <NetworkConsumer>
//       {
//         ({ isConnected }) => (isConnected ? (!isConfirmVisible && signin || confirm) : offline)
//       }
//     </NetworkConsumer>
//   );

//   if (isDialogVisible) {
//     return confirmationDialog;
//   }

//   // if (isConfirmVisible) {
//   //   return confirm;
//   // }

//   if (isLoading === true) {
//     return <SpinnerMask />;
//   }
//     return view;
// }

// SignInScreen.navigationOptions = () => {
//   const navbar = {
//     headerTransparent: {},
//     headerTintColor: colors.white,
//   };
//   return navbar;
// };

// SignInScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };


// export default SignInScreen;
