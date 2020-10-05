import React, { useState, useEffect, useRef } from 'react';

import { NetworkConsumer } from 'react-native-offline';

import { StatusBar } from 'expo-status-bar';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { showMessage } from 'react-native-flash-message';

import Dialog from 'react-native-dialog';

import {
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  // Alert,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import OfflineScreen from './OfflineScreen';

import HelpMessage from 'components/HelpMessage';

import { originalTheme } from 'src/colors';

import styles from '../../styles';

import getButtonStyle from 'functions/getButtonStyle';

function ChangePasswordScreen({ navigation }) {
  // hooks
  const [oldPassword, setOldPassword] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSubmitBtnEnabled, setIsSubmitBtnEnabled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [shouldShowSignOutDialog, setShouldShowSignOutDialog] = useState(false);

  const [icon, setIcon] = useState(null);

  // input refs
  const newPasswordInputRef = useRef(null);

  const [helpMessage, setHelpMessage] = useState('');

  const onChangeText = (key, value) => {
    // console.log(key, value);
    // this.setState({[key]: value})
    if (key === 'oldPassword') {
      setOldPassword(value);
    } else if (key === 'newPassword') {
      setNewPassword(value);
    }
  };
  const changePassword = async () => {
    // const { password1, password2 } = this.state
    await Auth.currentAuthenticatedUser()
      .then((user) => Auth.changePassword(user, oldPassword, newPassword))
      .then(() => {
        // console.log('Password changed successfully', data);
        // Alert.alert('Password changed successfully');
        showMessage({ message: 'Password changed successfully', type: 'success' });
        // navigation.goBack();
        navigation.navigate('AuthLoading');
      })
      .catch((err) => {
        if (!err.message) {
          showMessage({ message: 'Error changing password: ', description: err.message, type: 'danger' });
          // Alert.alert('Error changing password: ', err);
        } else {
          showMessage({ message: 'Error changing password: ', description: err.message, type: 'danger' });
          // Alert.alert('Error changing password: ', err.message);
        }
      });
  };
  function handleOldPasswordInputSubmit() {
    newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleNewPasswordInputSubmit() {
    // newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }
  // Sign out from the app
  const signOut = async () => {
    // global.showGlobalValues();
    await Auth.signOut().then(() => {
      AsyncStorage.removeItem('userToken');

      AsyncStorage.removeItem('storageKey');

      showMessage({ message: 'Sign out successful', type: 'success' });
    })
      .catch((err) => showMessage({ message: err.message, type: 'danger' }));
  };
  // Confirm sign out
  // const signOutAlert = async () => setShouldShowSignOutDialog(true);

  const toggleShowPasswords = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (newPassword && oldPassword) {
      setIsSubmitBtnEnabled(true);
      if (newPassword === oldPassword) {
        setIcon(<AntDesign onPress={toggleShowPasswords} name="unlock" style={styles.iconStyle}/>)
        setHelpMessage('');
      } else {
        setIcon(<AntDesign onPress={toggleShowPasswords} name="lock" style={styles.iconStyle} />)
      }
    } else {
      setIsSubmitBtnEnabled(false);
      // set help message
      setHelpMessage('enter the old password\nand the new password you want');
    }
  }, [newPassword, oldPassword]);
  useEffect(() => {
    setIcon(<AntDesign onPress={toggleShowPasswords} name="lock" style={styles.iconStyle} />);
  }, []);
  const dialogBox = (
    <View>
      <Dialog.Container visible>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>
          Do you want to sign out?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShouldShowSignOutDialog(false)} />
        <Dialog.Button label="Sign Out" onPress={signOut} />
      </Dialog.Container>
    </View>
  );
  const changePasswordScreenView = (
    <SafeAreaView style={styles.container}>
      { shouldShowSignOutDialog && dialogBox }
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={false}
      >
        {
        global.authenticated && (
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* Info */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View
                    style={
                      [styles.buttonStyle, { borderRadius: 4, marginBottom: 20 }]
                    }
                  >
                    <Text style={styles.buttonText}>Change password</Text>
                  </View>
                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                     {
                      icon
                     }
                    <Input
                      style={styles.input}
                      placeholder="Old password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={isPasswordVisible}
                      onSubmitEditing={() => handleOldPasswordInputSubmit()}
                      onChangeText={(value) => onChangeText('oldPassword', value)}

                      keyboardAppearance="dark"
                    />
                  </Item>
                  {/* New password */}
                  <Item rounded style={styles.itemStyle}>
                  {
                    icon
                  }
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={isPasswordVisible}
                      ref={newPasswordInputRef}

                      onSubmitEditing={() => handleNewPasswordInputSubmit()}
                      onChangeText={(value) => onChangeText('newPassword', value)}

                      keyboardAppearance="dark"
                    />
                  </Item>
                  <TouchableOpacity
                    disabled={!isSubmitBtnEnabled}
                    onPress={changePassword}
                    style={getButtonStyle(isSubmitBtnEnabled)}
                  >
                    <Text style={styles.buttonText}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <HelpMessage message={helpMessage} />
                  <View
                    style={
                      {
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 100,
                      }
                    }
                  />
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        ) || (
          <View
            style={
              {
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 100,
              }
            }
          >
            <TouchableOpacity
              style={
                [styles.buttonStyle,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                  },
                ]
              }
              onPress={() => setShouldShowSignOutDialog(true)}
            >
              <Ionicons active name="md-power" style={{ color: originalTheme.inputIconColor, paddingRight: 10 }} />
              <Text style={styles.buttonText}>
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        )
      }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  const offline = <OfflineScreen />;

  let view = (
    <NetworkConsumer>
      {
        ({ isConnected }) => (isConnected ? changePasswordScreenView : offline)
      }
    </NetworkConsumer>
  );
  return view;
}

export default ChangePasswordScreen;
