import React, { useState, useEffect, useRef } from 'react';

import { Ionicons, AntDesign } from '@expo/vector-icons';

// import { showMessage, hideMessage } from "react-native-flash-message";

import Dialog from 'react-native-dialog';

import HelpMessage from '../components/HelpMessage';

import {
  setHasRatedUs,
  setIsBackedUp,
  setUserToken,
  setStorageKey,
  setAuthenticated,
} from '../../globals'

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
  const { navigation } = props;
  // hooks
  const [oldPassword, setOldPassword] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSubmitBtnEnabled, setIsSubmitBtnEnabled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [shouldShowSignOutDialog, setShouldShowSignOutDialog] = useState(false);

  const [icon, setIcon] = useState(null);

  // input refs
  const newPasswordInputRef = useRef(null);

  const [helpMessage, setHelpMessage] = useState('')

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
        // Alert.alert('Password changed successfully');
        // showMessage('Password changed successfully')

        navigation.goBack()
      })
      .catch((err) => {
        if (!err.message) {
          console.log('Error changing password: ', err);
          // Alert.alert('Error changing password: ', err);
        } else {
          console.log('Error changing password: ', err.message);
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
    await Auth.signOut().then((succ) => {
      // setUserToken('');

      // setStorageKey('');

      // // setAuthenticated(false);

      // setHasRatedUs(false);

      global.email = '';

      global.emailAddressInput = '';

      global.authenticated = false;

      global.emailAddressInput = '';

      global.isFederated = false;

      global.displayName = '';
      
      AsyncStorage.removeItem('hasRatedUs');
      
      AsyncStorage.removeItem('userToken');

      AsyncStorage.removeItem('isFederated');

      AsyncStorage.removeItem('authenticated');      

      AsyncStorage.removeItem('storageKey');

      // global.clearGlobalValues()

      // AsyncStorage.removeItem('isLoginEnabled');

      // // AsyncStorage.removeItem('isUserAuthenticated');
      AsyncStorage.removeItem('authenticated');

      AsyncStorage.removeItem('isAppleSignedIn')


      // global.storageKey = '';

      // // global.isUserAuthenticated = false;
      // global.authenticated = false;

      global.avatar = require('../../assets/avatar.png');


      // // console.log('Removed AsyncsStorage Variables ..');


      // // AsyncStorage.getAllKeys((err, keys) => {
      // //   AsyncStorage.multiGet(keys, (error, stores) => {
      // //     stores.map((result, i, store) => {
      // //       console.log({ [store[i][0]]: store[i][1] });
      // //       return true;
      // //     });
      // //   });
      // // });

      // setHasRatedUs(false);

      // setIsBackedUp(false)

      // AsyncStorage.setItem('storageKey', JSON.stringify(''))

      navigation.navigate('AuthLoading');

      // global.showGlobalValues();

      // // console.log('Sign out complete');
      // showMessage('Signed out');
    })
    .catch((err) => console.log('Error while signing out!', err));


  };
  
  // Confirm sign out
  const signOutAlert = async () => {
    setShouldShowSignOutDialog(true);
    // await Alert.alert(
    //   // 'Sign Out',
    //   'Sign out?  :(',
    //   'Are you sure?',
    //   [
    //     { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
    //     // Calling signOut
    //     { text: 'OK', onPress: () => signOut() },
    //   ],
    //   { cancelable: false },
    // );
  };

  const toggleShowPasswords = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (newPassword && oldPassword) {
      setIsSubmitBtnEnabled(true);
      if (newPassword === oldPassword) {
        setIcon( <AntDesign onPress={() => toggleShowPasswords()}
                    name="unlock"
                    // size={styles.iconStyle.fontSize}
                    // color={styles.iconStyle.color}
                    style={styles.iconStyle}
                    />)
        
        setHelpMessage('')
        
      } else {
        setIcon( <AntDesign onPress={() => toggleShowPasswords()}
                    name="lock"
                    // size={styles.iconStyle.fontSize}
                    // color={styles.iconStyle.color}
                    style={styles.iconStyle}
                    />)
        // setIsSubmitBtnEnabled(false);
        // setHelpMessage('password don\'t match')
      }
    } else {
      setIsSubmitBtnEnabled(false);
      // set help message
      setHelpMessage('enter the old password\nand the new password you want')
    }
  }, [newPassword, oldPassword]);

  useEffect(() => {
    setIcon( <AntDesign onPress={() => toggleShowPasswords()}
                  name="lock"
                  // size={styles.iconStyle.fontSize}
                  // color={styles.iconStyle.color}
                  style={styles.iconStyle}
                  />)
    return () => {
      // effect
    };
  }, [])

  const dialogBox = (
    <View>
      <Dialog.Container visible={true}>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>
          Do you want to sign out?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShouldShowSignOutDialog(false)} />
        <Dialog.Button label="Sign Out" onPress={signOut} />
      </Dialog.Container>
    </View>
  );

  const view = (
    <SafeAreaView style={styles.container}>
    {
      shouldShowSignOutDialog && dialogBox
    }
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={false}
      >

      {
        global.authenticated &&
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
               { /*
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
              */}
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback> ||
        <View
          style={
            {
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 100,
            }
          }
        ><TouchableOpacity
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

          <Ionicons active name="md-power" style={{ color: '#fff', paddingRight: 10 }} />
          <Text style={styles.buttonText}>
            Sign out
          </Text>
        </TouchableOpacity>

         
      </View>
      }
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
