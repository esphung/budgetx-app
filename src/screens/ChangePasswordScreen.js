import React, { useState, useEffect, useRef } from 'react';

import { Ionicons } from '@expo/vector-icons';

import {
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from '../../colors';

import styles from '../../styles';

import getButtonStyle from '../../src/functions/getButtonStyle';



function ChangePasswordScreen(props) {
  // hooks
  const [oldPassword, setOldPassword] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSubmitBtnEnabled, setIsSubmitBtnEnabled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // input refs
  const newPasswordInputRef = useRef(null);

  function onChangeText(key, value) {
    // console.log(key, value);
    // this.setState({[key]: value})
    if (key === 'oldPassword') {
      setOldPassword(value);
    } else if (key === 'newPassword') {
      setNewPassword(value);
    }
  }

  const changePassword = async () => {
    // const { password1, password2 } = this.state
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => {
        // console.log('Password changed successfully', data);
        Alert.alert('Password changed successfully');
      })
      .catch((err) => {
        if (!err.message) {
          // console.log('Error changing password: ', err);
          Alert.alert('Error changing password: ', err);
        } else {
          // console.log('Error changing password: ', err.message);
          Alert.alert('Error changing password: ', err.message);
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
    await Auth.signOut()
      .then(() => {
        // console.log('Sign out complete');
        AsyncStorage.removeItem('userToken'); // end local user session results

        props.navigation.navigate('AuthLoading');
      })
      .catch((err) => console.log('Error while signing out!', err));


  };
  
  // Confirm sign out
  const signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        // Calling signOut
        { text: 'OK', onPress: () => signOut() },
      ],
      { cancelable: false },
    );
  };

  const toggleShowPasswords = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (newPassword && oldPassword && (newPassword !== oldPassword)) {
      setIsSubmitBtnEnabled(true);
    } else {
      setIsSubmitBtnEnabled(false);
    }
  }, [newPassword, oldPassword]);

  const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={false}
      >
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
                  <Ionicons onPress={() => toggleShowPasswords()} active name="md-lock" style={styles.iconStyle} />
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
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
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
                <View
                  style={
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingBottom: 100,
                    }
                  }
                />
                <TouchableOpacity
                  style={
                    [styles.buttonStyle,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center',
                      },
                    ]
                  }
                  onPress={signOutAlert}
                >
                  <Ionicons active name="md-power" style={{ color: '#fff', paddingRight: 10 }} />
                  <Text style={styles.buttonText}>
                    Sign out
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

ChangePasswordScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
    // headerLeft: null,
  };
  return navbar;
};

export default ChangePasswordScreen;
