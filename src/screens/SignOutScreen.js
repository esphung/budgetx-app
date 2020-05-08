import React, { useState, useEffect, useRef } from 'react';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { showMessage, hideMessage } from "react-native-flash-message";

import Dialog from 'react-native-dialog';

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
  Icon,
  Button,
} from 'native-base';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import colors from '../../colors';

import styles from '../../styles';

import getButtonStyle from '../../src/functions/getButtonStyle';

  
let value = 'Hello'


function SignOutScreen({ navigation }) {
  // const { navigation } = props;


  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: value === '' ? 'No title' : value,
  //   });
  // }, [navigation, value]);

  // hooks
  const [oldPassword, setOldPassword] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  const [isSubmitBtnEnabled, setIsSubmitBtnEnabled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [shouldShowSignOutDialog, setShouldShowSignOutDialog] = useState(false);

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
    // global.showGlobalValues();
    await Auth.signOut().then((succ) => {
      // setUserToken('');

      // setStorageKey('');

      // // setAuthenticated(false);

      // setHasRatedUs(false);

      global.email = '';

      global.emailAddressInput = '';

      global.passwordInput = ''

      global.authenticated = false;

      global.emailAddressInput = '';

      global.isFederated = false;

      global.displayName = '';
      
      AsyncStorage.removeItem('hasRatedUs');
      
      AsyncStorage.removeItem('userToken');

      AsyncStorage.removeItem('isFederated');

      AsyncStorage.removeItem('authenticated');

      AsyncStorage.removeItem('isAppleSignedIn');

      // AsyncStorage.setItem('isAppleSignedIn', JSON.stringify(global.isAppleSignedIn))    

      // AsyncStorage.removeItem('storageKey');

      // global.clearGlobalValues()

      // AsyncStorage.removeItem('isLoginEnabled');

      // // AsyncStorage.removeItem('isUserAuthenticated');
      AsyncStorage.removeItem('authenticated');

      AsyncStorage.removeItem('hasSeenIntro');


      // global.storageKey = '';

      // // global.isUserAuthenticated = false;
      // global.authenticated = false;

      global.avatar = require('../../assets/avatar.png');


      // // console.log('Removed AsyncsStorage Variables ..');


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

      // AWS.config.credentials = null

      AsyncStorage.setItem('storageKey', JSON.stringify(''))

      Auth.signOut({ global: true })

      navigation.navigate('AuthLoading');

      // navigation.popToTop()

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
    if (newPassword && oldPassword && (newPassword !== oldPassword)) {
      setIsSubmitBtnEnabled(true);
    } else {
      setIsSubmitBtnEnabled(false);
    }
  }, [newPassword, oldPassword]);

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
      
      <Container
        style={
          {
            
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
            // borderWidth: 2,
            // borderColor: 'white',
            // borderStyle: 'solid',

            backgroundColor: colors.darkTwo,
          }
        }
      >

        <Button
          style={
            [
            styles.buttonStyle,
              {

                // flexDirection: 'row',
                justifyContent: 'center',
                // alignItems: 'center',

            // borderWidth: 2,
            // borderColor: 'white',
            // borderStyle: 'solid',
              },
            ]
          }
          onPress={() => setShouldShowSignOutDialog(true)}
        >
          {/*<Ionicons active name="md-power" size={17} style={styles.iconStyle} />*/}

          <Text style={styles.buttonText}>

            Sign out



          </Text>
           <AntDesign
              style={
                    {
                      marginLeft: 10,
                    }
                  }
                  // name="login"
                  size={styles.iconStyle.fontSize}
                  color={colors.white}
          name="poweroff"
          // size={styles.buttonText.fontSize}
          // color={colors.offWhite}
          />
        </Button>
      </Container>
      
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  return view;
}

SignOutScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
    // headerLeft: null,
  };
  return navbar;
};

export default SignOutScreen;
