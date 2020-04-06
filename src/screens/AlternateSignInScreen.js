import React, { useState, useEffect,  useRef } from 'react';

import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import { showMessage, hideMessage } from "react-native-flash-message";

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

import User from '../models/User';

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
  // compareListTransactions,
  retrieveOnlineTransactions,
  retrieveOnlineCategories,
} from '../storage/SettingsStorage';

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

  const passwordInputRef = useRef(null);

  const emailInputRef = useRef(null);

  const [email, setEmail] = useState(global.emailAddressInput);

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

  const [shouldShowFacebookUserDialog, setShouldShowFacebookUserDialog] = useState(false)

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

    const facebookUserDialog = (
    <View>
      <Dialog.Container visible>
        <Dialog.Title>{ dialogTitle }</Dialog.Title>
        <Dialog.Description>
          {
            global.emailAddressInput && (
              <Dialog.Description>
                { global.emailAddressInput }
              </Dialog.Description>
            )
          }

        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => 
          {
            setShouldShowFacebookUserDialog(false)
          }
        } />
        <Dialog.Button label="Ok" onPress={() => {
          setShouldShowFacebookUserDialog(false)
        }} />
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
      if (!email) {
        // usernameInputRef.current._root.focus();
        // Alert.alert('Please provide a username');
        setHelpMessage('Please provide your');
        return;
      }

      // let username = email

      await Auth.confirmSignUp(email, authCode)
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
                  onPress={confirmSignUp} // !!!!!!!!!!
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
    // check if user is already signed in with fb

    checkForFBUserSettings();

    setShouldShowFacebookUserDialog(true);



    // add picture and other info to this account from fb





    // setIsLoading(true);
    // const userTokenValue = '123456789';
    // await AsyncStorage.setItem('userToken', userTokenValue);
    // // console.log('userToken set:', userTokenValue);
    // props.navigation.navigate('AuthLoading');
    await Auth.signIn(email, password)
      .then((cognito) => {
        // console.log(cognito);

        

        if (cognito) {
          // set username key here!
          showMessage(`Signed in as ${cognito.attributes.email}`);

          // // create an event handler
          // Analytics.record({
          //   name: "Sign in attempt successful!",
          //   attributes: { username: cognito.attributes.email }
          // });


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

          

          //           // create an event handler
          // Analytics.record({
          //   name: "Sign in attempt failed!",
          //   // attributes: { username: cognito.attributes.email }
          // });

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

  // user input handlers
  function handleUsernameInputSubmit() {
    // passwordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handlePasswordInputSubmit() {
    // authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  /*
  * > User Sign Up Methods
  */
  // Sign up user with AWS Amplify Auth
  // async function signUp(email) {
  //   // let isSuccessful = false;
  //   // setIsLoading(true);
  //   //   // Alert.alert('Phone valid');

  //   // rename variable to conform with Amplify Auth field phone attribute
  //   // const phone_number = phoneNumber; // +01234567890 format
  //   // console.log(phone_number);
  //   await Auth.signUp({
  //     username: email,
  //     password: password,
  //     attributes: { email },
  //   })
  //     .then(() => {
  //       // isSuccessful = true;
  //       // console.log('Sign up successful!');
  //       // Alert.alert('Enter the confirmation code you received.');
  //       // SHOW CONFIRRMATION DIALOG BOX HERE
  //       // setDialogTitle('Sign Up Successful!');
  //       // setDialogMessage('Enter the confirmation code you received.');
  //       // setIsDialogVisible(true);

  //       // setIsConfirmVisible(true);
        
  //     })
  //     .catch((err) => {
  //       // console.log('err: ', err);
  //       // isSuccessful = false;
  //       if (err) {
  //         // console.log('Error when signing up: ', err.message);
  //         // Alert.alert('Error when signing up: ', err.message);

  //         showMessage({
  //           message: 'sign up failed',
  //           description: err.message,
  //           // type: 'danger',
  //         });

  //         // record analytics
  //         // const name = `Failed user sign up`;
  //         // Analytics.record({ name: name });
  //         // console.log(`Analytic Recorded: ${name}`);

  //         // setDialogTitle('Error when signing up!');
  //         // setDialogMessage(err.message);
  //         // setIsDialogVisible(true);
  //       }
  //     });
  //   // setIsLoading(false);

  //   // if (isSuccessful) {
  //   //   // setDialogTitle('Sign Up Successful!');
  //   //   // setDialogMessage('Enter the confirmation code you received.');
  //   //   // setIsDialogVisible(true);

  //   //   showMessage({
  //   //     message: 'Sent confirmation code!',
  //   //     description: 'Please check your email!',
  //   //     type: 'success',
  //   //   });

  //   //   setIsResendCodeBtnEnabled(true);

  //   //   setIsConfirmVisible(true);

  //   //   // record analytics
  //   //   const name = `Successful user sign up`;
  //   //   Analytics.record({ name: name });
  //   //   // console.log(`Analytic Recorded: ${name}`);
  //   // }
  // }

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
          // Alert.alert('Confirm sign up successful');
          showMessage('Sign Up Successful!');
        })
        .catch((err) => {
          // console.log('Error when entering confirmation code: ', err.message);
          // Alert.alert('Error when entering confirmation code: ', err.message);

          setHelpMessage(err.message)

          showMessage({
            message: 'Error when entering confirmation code',
            description: err.message,
            // type: 'danger',
          });
          
        });
    }
  }

  // Resend code if not received already
  async function resendSignUp() {
    // await Auth.resendSignUp(email)
    // .then(() => {
    //   // Alert.alert('Confirmation code resent successfully!');
    //   showMessage({
    //     message: 'Confirmation code resent successfully!',
    //     type: 'success',
    //   });
    //   // console.log('Confirmation code resent successfully');
    // })
    // .catch((err) => {
    //   showMessage({
    //     message: 'Error requesting new confirmation code: ',
    //     description: err.message,
    //     type: 'success',
    //   });
    // });
  }

  //   // Confirm users and redirect them to the SignIn page
  // async function confirmSignUp() {
  //   if (authCode !== null) {
  //     // const { username, authCode } = this.state;
  //     // if (!username) {
  //     //   usernameInputRef.current._root.focus();
  //     //   Alert.alert('Please provide a username');
  //     //   return;
  //     // }
  //     await Auth.confirmSignUp(email, authCode)
  //       .then(() => {
  //         props.navigation.navigate('SignIn');
  //         // console.log('Confirm sign up successful');
  //         // Alert.alert('Confirm sign up successful');

  //         showMessage({
  //           message: 'Sign Up Successful!',
  //           type: 'success',
  //         });
  //       })
  //       .catch((err) => {
  //         // console.log('Error when entering confirmation code: ', err.message);
  //         // Alert.alert('Error when entering confirmation code: ', err.message);

  //         showMessage({
  //           message: 'Error when entering confirmation code',
  //           description: err.message,
  //           type: 'danger',
  //         });
          
  //       });
  //   }
  // }

  const checkForFBUserSettings = async () => {

    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(async (fb) => {
      // console.log('fb:', fb);

      // console.log('Object.keys(fb): ', Object.keys(fb));s

      /* Create financely user from fb credentials */

      let new_user = new User(fb.id)

      new_user.name = (fb.name);

      new_user.email = email; // global.emailAddressInput

      new_user.picture = fb.picture

      // console.log('new_user: ', new_user);s

      /* Create Settings to be stored on sign in confirmation */
      let storage = await loadSettingsStorage(fb.id);

      console.log('storage: ', storage);

      let settings = {
        user: new_user,
        transactions: storage.transactions, // what ever currently existing transactions exist
        categories: storage.categories,
        payees: storage.payees, // ???
        image_url: (fb.picture.data.url) ? fb.picture.data.url : global.avatar,
        version: 0,
        // owner: new_user.id,
        // isLoggedIn: false,
      };

      if (!password) {
        alert('No Password');
        return
      }

      /* Try to create new financely user */
      await Auth.signUp({
        username: email,
        password: password,
        attributes: { email },
        })
        .then(data => {
          // props.navigation.navigate('');
          console.log('success data: ', data);
          setIsConfirmVisible(true)
        })
        .catch((err) => {
          // setHelpMessage(err.message)
          console.warn('sign up err: ', err);
          // Alert.alert(err.message)
          return
          if (err.code === 'UsernameExistsException') {
            // need to send forgotten password
            
            props.navigation.navigate('ForgotPassword');
            // return
          }
          
          
        })

      setShouldShowFacebookUserDialog(false)

      // // After retrieving the confirmation code from the user
      // Auth.confirmSignUp(username, code, {
      //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      //     forceAliasCreation: true    
      // }).then(data => console.log(data))
      //   .catch(err => console.log(err));

      // Auth.resendSignUp(username).then(() => {
      //     console.log('code resent successfully');
      // }).catch(e => {
      //     console.log(e);
      // });












    })
    .catch(err => console.log(err));

    // auth_user: Object {
    //   "id": "216747749558231",
    //   "name": "Eric Phung",
    //   "picture": Object {
    //     "data": Object {
    //       "height": 720,
    //       "is_silhouette": false,
    //       "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=216747749558231&height=500&ext=1588736677&hash=AeRQAi8VR5xIb5IN",
    //       "width": 720,
    //     },
    //   },
    // }

    // Auth.currentSession()
    // .then(data => console.log(data))
    // .catch(err => console.log(err));



    // let storage = await loadSettingsStorage(global.storageKey);
    // console.log('storage.user.id: ', storage.user.id);
    // const { id, name }
  };

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
    if (!authCode || !email) {
      setIsConfirmSignUpBtnEnabled(false);
    } else {
      setIsConfirmSignUpBtnEnabled(true);
    }
    return () => {
      // effect
    };
  }, [authCode]);

  // useEffect(() => {
  //   if (email) {
  //     passwordInputRef.current._root.focus();
  //   }
  //   // if (email && password) {
  //   //   // if storage has a user id already, check fo picture
  //   //   checkForFBUserSettings();

  //   //   setShouldShowFacebookUserDialog(true);
  //   // }
  //   // return () => {
  //   //   // effect
  //   // };
  // }, []);

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

                {
                 shouldShowFacebookUserDialog && facebookUserDialog
                }
    
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
        ({ isConnected }) => (isConnected ? ( isConfirmVisible && confirm || signin ): offline)
      }
    </NetworkConsumer>
  );

  if (isDialogVisible) {
    return confirmationDialog;
  }

  // if (isConfirmVisible) {
  //   return confirm;
  // }

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
