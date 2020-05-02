import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import { AppLoading } from 'expo';

import { Ionicons } from '@expo/vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import OfflineScreen from '../screens/OfflineScreen';

import SpinnerMask from '../../src/components/SpinnerMask';

import HelpMessage from '../../storybook/stories/HelpMessage';

import { showMessage } from 'react-native-flash-message';

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
  // Animated,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from '../../colors';

import styles from '../../styles';

import isValidUsername from '../../src/functions/isValidUsername';

import getButtonStyle from '../../src/functions/getButtonStyle';

import isValidEmail from '../../src/functions/isValidEmail';

function ForgotPasswordScreen(props) {
  // input refs
  const emailInputRef = useRef(null)

  const newPasswordInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  // state hooks
  const [username, setUsername] = useState(null);

  const [email, setEmail] = useState(null)

  const [authCode, setAuthCode] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSendCodeBtnEnabled, setIsSendCodeBtnEnabled] = useState(false);

  const [isConfirmNewPasswordBtnEnabled, setIsConfirmNewPasswordBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [helpMessage, setHelpMessage] = useState(null);

  useEffect(() => {
    // if (!username || username.length < 6 || !isValidUsername(username)) {
    if (!email || !isValidEmail(email)) {
      setIsSendCodeBtnEnabled(false);
    } else {
      setIsSendCodeBtnEnabled(true);      
    }
    return () => {
      // effect
    };
  }, [email]);

  useEffect(() => {
    if (!authCode || !newPassword || !email) {

      // if (!username) {
      //   setHelpMessage('Username required');
      // }

      // if (!newPassword) {
      //   setHelpMessage('New password required');
      // }

      // if (!authCode) {
      //   setHelpMessage('Confirmation code required');
      // }

      setIsConfirmNewPasswordBtnEnabled(false);
    } else {
      setIsConfirmNewPasswordBtnEnabled(true);
    }
    return () => {
      // effect
    };
  });

  // input handlers
  function onChangeText(key, value) {
    console.log('key:', key);
    console.log('value:', value);

    if (key === 'email') {
      setEmail(value);
    }



    // if (key === 'username') {
    //   // setUsername(value);
    //    if (value.length < 6) {
    //     setHelpMessage('Username too short');
    //   } else {
    //     setHelpMessage(null);
    //   }
    //   setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    // }

    if (key === 'authCode') {
      setAuthCode(value.replace(/[A-z]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
      // setAuthCode(value);
    } else if (key === 'newPassword') {
      // setNewPassword(value);
      setNewPassword(value.replace(' ', ''));
    }
  }

  function handleUsernameInputSubmit() {
    // newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleEmailInputSubmit() {

  }

  function handleNewPasswordInputSubmit() {
    authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleAuthCodeInputSubmit() {
    // emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  /*
  * > Request a new password
  */
  async function forgotPassword() {
    setIsLoading(true);
    // const { username } = this.state;
    await Auth.forgotPassword(email)
      .then((data) => {
        console.log('New code sent', data);
        Alert.alert('Code was emailed')
      })
      .catch( err => {
        showMessage(err)
        
        // switch ( err.code ) {
        //     case 'LimitExceededExeption':
        //         // return true;
        //         // make customer help available,  for account recovvery
        //         //  LIMIT IS 10 ATTEMPTS
        //     case 'NotAuthorizedException':
        //         return false;
        //     case 'AliasExistsException':
        //         // Email alias already exists
        //         return false;
        //     case 'CodeMismatchException':
        //         return false;
        //     case 'ExpiredCodeException':
        //         return false;
        //     default:
        //         return false;

        // }

    } )
      // .catch((err) => {
      //   showMessage(err);
      // });
    setIsLoading(false);
  }

  // Upon confirmation redirect the user to the Sign In page
  async function forgotPasswordSubmit() {
    setIsLoading(true);
    // const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(email, authCode, newPassword)
      .then(() => {
        props.navigation.navigate('SignIn');
        console.log('New password submitted successfully!');
        Alert.alert('New password submitted successfully!');
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error while confirming the new password: ', err);
          Alert.alert('Error while confirming the new password: ', err);
        } else {
          console.log('Error while confirming the new password: ', err.message);
          Alert.alert('Error while confirming the new password: ', err.message);
        }
      });

    setIsLoading(false);
  }

  function getButtonStyle(bool) {
    // console.log(bool);
    if (bool) {
      return {
        alignItems: 'center',
        backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
        padding: 14,
        marginBottom: 20,
        borderRadius: 26, // 24,
      }
    }
    else  {
      return {
        alignItems: 'center',
        backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
        padding: 14,
        marginBottom: 20,
        borderRadius: 26, // 24,
        opacity: 0.4,
      }
    }
  }

  const forgot = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={isKeyboardAvoidEnabled}
        // keyboardVerticalOffset={23}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Infos */}
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* Username
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => handleUsernameInputSubmit()}
                    onChangeText={(value) => onChangeText('username', value)}

                    value={username}

                    keyboardAppearance="dark"
                    // onFocus={() => setIsKeyboardAvoidEnabled(false)}
                  />
                </Item>
              */}

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

                <TouchableOpacity
                  disabled={!isSendCodeBtnEnabled}
                  onPress={forgotPassword}
                  style={getButtonStyle(isSendCodeBtnEnabled)}
                >
                  <Text style={styles.buttonText}>
                    Send code
                  </Text>
                </TouchableOpacity>
                {/* the New password section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="New password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={newPasswordInputRef}
                    onSubmitEditing={() => handleNewPasswordInputSubmit()}

                    onChangeText={(value) => onChangeText('newPassword', value)}

                    value={newPassword}

                    maxLength={16}

                    keyboardAppearance="dark"
                    // onFocus={() => setIsKeyboardAvoidEnabled(false)}
                  />
                </Item>
                {/* Code confirmation section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-apps" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Confirmation code"
                    placeholderTextColor="#adb4bc"
                    keyboardType="numeric"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={authCodeInputRef}
                    onSubmitEditing={() => handleAuthCodeInputSubmit()}
                    onChangeText={(value) => onChangeText('authCode', value)}

                    value={authCode}

                    maxLength={global.maxAuthCodeLength}

                    keyboardAppearance="dark"
                    // onFocus={() => setIsKeyboardAvoidEnabled(true)}
                  />
                </Item>
                <TouchableOpacity
                  disabled={!isConfirmNewPasswordBtnEnabled}
                  onPress={forgotPasswordSubmit}
                  style={getButtonStyle(isConfirmNewPasswordBtnEnabled)}
                >
                  <Text style={styles.buttonText}>
                    Confirm the new password
                  </Text>
                </TouchableOpacity>

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
        ({ isConnected }) => (isConnected ? forgot : offline)
      }
    </NetworkConsumer>
  );

  // if (!isLoading) {
  //   return view;
  // }
  // else if (isLoading === true) {
  //   return (
  //     <SpinnerMask>
  //       <AppLoading
  //         autoHideSplash
  //         // startAsync={_cacheResourcesAsync}
  //         onFinish={() => setIsLoading(false)}
  //         onError={console.warn}
  //       />
  //     </SpinnerMask>

  //   );
  // }

  return view
}


ForgotPasswordScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

export default ForgotPasswordScreen;
