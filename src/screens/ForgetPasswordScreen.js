import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import { AppLoading } from 'expo';

import { Ionicons } from 'expo-vector-icons';

import { NetworkConsumer } from 'react-native-offline';

import OfflineScreen from '../screens/OfflineScreen';

import SpinnerMask from 'main/src/components/SpinnerMask';


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

import colors from 'main/colors';

import styles from './styles';

import { isValidUsername } from './functions';


function ForgotPasswordScreen(props) {
  // input refs
  const newPasswordInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  // state hooks
  const [username, setUsername] = useState(null);

  const [authCode, setAuthCode] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSendCodeBtnEnabled, setIsSendCodeBtnEnabled] = useState(false);

  const [isConfirmNewPasswordBtnEnabled, setIsConfirmNewPasswordBtnEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (username && isValidUsername(username)) {
      setIsSendCodeBtnEnabled(true);
    } else {
      setIsSendCodeBtnEnabled(false);
    }
    return () => {
      // effect
    };
  }, [username])

  useEffect(() => {
    if (authCode) {
      setIsConfirmNewPasswordBtnEnabled(true);
    } else {
      setIsConfirmNewPasswordBtnEnabled(false);
    }
    return () => {
      // effect
    };
  }, [authCode])

  // input handlers
  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);
    if (key === 'username') {
      // setUsername(value);
      setUsername(value.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase());
    } else if (key === 'authCode') {
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

  function handleNewPasswordInputSubmit() {
    authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleAuthCodeInputSubmit() {
    // emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
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

  /*
  * > Request a new password
  */
  async function forgotPassword() {
    setIsLoading(true);
    // const { username } = this.state;
    await Auth.forgotPassword(username)
      .then((data) => {
        console.log('New code sent', data);
        Alert.alert('Code was emailed')
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error while setting up the new password: ', err);
          Alert.alert('Error while setting up the new password: ', err);
        } else {
          console.log('Error while setting up the new password: ', err.message);
          Alert.alert('Error while setting up the new password: ', err.message);
        }
      });

    setIsLoading(false);
  }

  // Upon confirmation redirect the user to the Sign In page
  async function forgotPasswordSubmit() {
    setIsLoading(true);
    // const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
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
        enabled
        // keyboardVerticalOffset={23}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Infos */}
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* Username */}
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

                    maxLength={6}

                    keyboardAppearance="dark"
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


ForgotPasswordScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

export default ForgotPasswordScreen;
