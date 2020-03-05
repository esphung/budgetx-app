import React, { useState, useEffect } from 'react';

import { withNavigation } from 'react-navigation';

// import SwitchNavigator from '../../../SwitchNavigator'; // ????

// import { NetworkProvider } from 'react-native-offline'; // ????

import {
  Alert,
  // StyleSheet,
  View,
  // Button,
  TouchableOpacity,
  Text,
  // Image,
  TextInput,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';


// ui colors
import colors from '../../../colors';

// import isValidEmail from '../../../src/functions/isValidEmail';

// import SpinnerMask from '../SpinnerMask';

// function isValidEmail(currentEmail) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail);
// }

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

// function isValidName(text) {
//   // var nameRegex = /^[a-zA-Z\-]+$/;
//   const usernameRegex = /^[a-zA-Z0-9]+$/;
//   let bool = false;
//   const regExp = usernameRegex;
//   if (regExp.test(text)) {
//     bool = true;
//   }
//   return bool;
// }

// const login = <NetworkProvider><SwitchNavigator /></NetworkProvider>;

const EMAIL_INPUT_LIMIT = 22;

const spinnerView = (
    <View
      style={
        {
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark,
        }
      }
    >
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

function UserNameEmailInput(props) {
  const { navigation } = props;

  // navigation.navigate('Home');
  // navigation.navigate('Home');

  // const [text, setText] = useState(null);

  // const [isUserLoaded, setIsUserLoaded] = useState(false);

  // const [isInputEnabled, setIsInputEnabled] = useState(false);

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  const [nameLabelText] = useState('User ID');

  const [emailLabelText] = useState('Email');

  const [currentName, setCurrentName] = useState('');

  const [currentEmail, setCurrentEmail] = useState('');

  // const [emailPlaceholder, setCurrentEmailPlaceholder] = useState('examplemail@budget.com');

  // const [shouldNameAutofocus, setShouldNameAutoFocus] = useState(false);

  // const [isEmailInputEnabled, setIsEmailInputEnabled] = useState(false);

  // const [isNameInputEnabled, setIsNameInputEnabled] = useState(true);

  const [shouldClearNameInput] = useState(false);


  // const [isLoginEnabled, setIsLoginEnabled] = useState(false)

  // const [user, setUser] = useState(null);

  // async function saveName(string) {
  //   const userObject = await loadUserObject(); // load storage object
  //   // console.log('user:', userObject.user.username);

  //   userObject.user.username = string;
  //   // console.log('user:', userObject.user.username);

  //   if (isValidName(string)) {
  //     saveUserObject(userObject);
  //   }
  // }

  // async function saveEmail(string) {
  //   const userObject = await loadUserObject(); // load storage object

  //   userObject.user.currentEmail = string;
  //   // console.log('user:', userObject.user.username);

  //   if (isValidEmail(string)) {
  //     saveUserObject(userObject);
  //     // setIsEmailInputEnabled(false);
  //   }
  // }

  // async function retrieveStoredUserData() {
  //   const userObject = await loadUserObject(); // load storage object
  //   // console.log(userObject.user);

  //   // //  Testing
  //   // userObject.user.username = ''
  //   // userObject.user.currentEmail = ''
  //   // saveUserObject(userObject)

  //   if (userObject.user.username) {
  //     setCurrentName(userObject.user.username);
  //     // setCurrentNamePlaceholder(userObject.user.username);
  //   } else {
  //     setShouldClearNameInput(true);
  //   }

  //   if (userObject.user.currentEmail) {
  //     setCurrentEmail(userObject.user.currentEmail);
  //     // setCurrentEmailPlaceholder(userObject.user.currentEmail);
  //     // setIsEmailInputEnabled(false);
  //   }

  //   setIsUserLoaded(true);
  // }

  // function submitNamePressed(text) {
  //   // setCurrentName(text);
  //   console.log('Submit:', text)
  //   // saveName(text);
  //   if (isValidName(currentName) && isValidEmail(currentEmail)) {
  //     setIsLoginEnabled(true);
  //   }
  // }

  function submit(key, value) {
    // console.log(key + ':', value);
    if (key === 'name') {
      setCurrentName(value);
    } else if (key === 'email') {
      setCurrentEmail(value);
    }

    // if (currentName && currentEmail) {
    //   if (isValidEmail(currentEmail) && isValidName(currentName)) {
    //     alert('Success!');
    //   } else {
    //     alert('Failed!')
    //     return
    //   }
    // }
  }

  function handleTextChange(text) {
    setCurrentName(text);
  }

  function handleEmailChange(text) {
    setCurrentEmail(text);
    // setCurrentEmailPlaceholder(text);
  }
  // function submitEmailPressed(text) {
  //   console.log('Submit:', text);
  //   if (isValidName(currentName) && isValidEmail(currentEmail)) {
  //     setIsLoginEnabled(true);
  //   }
  // }

  // async function loadCognitoUser() {
  //   await Auth.currentAuthenticatedUser()
  //     .then((cognitoUser) => {
  //       // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //       // console.log('username:', cognitoUser.username);

  //       setUser(cognitoUser);
  //     })
  //     .catch((err) => console.log(err));
  // }


  // useEffect(() => {
  //   if (isValidEmail(currentEmail)) {
  //     // console.log(currentEmail);
  //     console.log('currentEmail: ', currentEmail);
  //   }
  // }, [currentEmail]);

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user);
  //     setCurrentName(user.username);
  //     setCurrentEmail(user.attributes.currentEmail);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [user]);

  // useEffect(() => {
  //   // check for stored user
  //   // retrieveStoredUserData();

  //   // loadCognitoUser();

  //   // // enable input
  //   // setIsInputEnabled(true);
  // }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(async (cognito) => {
      // console.log(cognito.attributes);
      // alert(cognito.attributes.email)
      setCurrentEmail(cognito.attributes.email);
      setCurrentName(cognito.attributes.sub);

      // setEmailLabelText('Email Address')
      // setNameLabelText('User ID');

      // setIsLoginEnabled(false)

      AsyncStorage.setItem('isLoginEnabled', 'false');
      global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled');
      console.log('isLoginEnabled: ', isLoginEnabled);

      setIsSignUpDisabled(true);
    })
    .catch(async (err) => {
      console.log('err: ', err);
      const storage = await loadSettingsStorage(storageKey)
      // console.log('storage.user: ', storage.user);
      if (storage.user.email) {
        setCurrentEmail(storage.user.email)
      } else {
        setCurrentEmail('Enter email here')
        // setEmailLabelText('Email Address')
        
      }
      if (storage.user.username) {
        setCurrentName(storage.user.username)
      } else if (storage.user.id) {
        setCurrentName(storage.user.id)
      }

      // setIsLoginEnabled(true)
      AsyncStorage.setItem('isLoginEnabled', 'true')
      global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled')
      console.log('isLoginEnabled: ', isLoginEnabled);

      setIsSignUpDisabled(false);

    })
    return () => {
      // effect
    };
  }, [])

  let view = null; // spinnerView;

  // if (!isLoginEnabled) {
  view = (
    <TouchableOpacity
    disabled={isSignUpDisabled}
    onPress={async () => {
      
      if (global.isLoginEnabled !== 'false') {
        console.log('isLoginEnabled: ', isLoginEnabled);
        Alert.alert(
          'Would you like to sign up?',
          'Access more features: change your name, multiple users, save data and more',
          // null,
          // 'Signing up will allow more features like multiple users per device.',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            { text: 'OK', onPress: () => navigation.navigate('Welcome')
            },
          ],

        )
      }

    }} style={{ flex: 1, flexDirection: 'column' }}>
      <View style={
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
        {/* User currentName input */}
        <Text style={
          {
            // flex: 0.4,
            // width: 44,
            // height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.13,
            color: colors.white,

            marginLeft: 5,
            marginBottom: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        >
        {
          nameLabelText
        }
        </Text>
        <Text

          style={
            {
              flex: 1,
              // width: 120,
              // height: 20,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              textAlign: 'right',
              color: colors.offWhite, // '#ffffff7f.8',

              marginRight: 10,
              marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          placeholder={'Enter username'}

          clearButtonMode="while-editing"

          placeholderTextColor={colors.offWhite}

          keyboardAppearance="dark" // ios

          textContentType="username" // ios

          // keyboardType="currentName-phone-pad"

          returnKeyType="done"

          // autoCorrect={true}

          autoCapitalize="none" // "words"

          maxLength={14}

          onSubmitEditing={() => submit('name', currentName)}

          onChangeText={handleTextChange}

          value={currentName}

          // autoFocus={shouldNameAutofocus}

          autoCompleteType="username" // android

          // enablesReturnKeyAutomatically={true}

          // editable={isNameInputEnabled}
          editable={false}

          // clearButtonMode="always"

          clearTextOnFocus={shouldClearNameInput}

        >
        {
          currentName.substring(0, (global.maxUsernameLength - 1))
        }
        </Text>

      </View>
      <View style={line2} />
      <View style={
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
        {/* User Email input */}
        <Text style={
          {
            // flex: 0.2,
            // width: 44,
            // height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.13,
            color: colors.white,

            marginLeft: 5,
            marginBottom: 5,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        >
        {
          emailLabelText
        }
        </Text>
        <Text
          style={
            {
              flex: 1,
              // width: 120,
              // height: 20,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              textAlign: 'right',
              color: colors.offWhite, // '#ffffff7f.8',

              marginRight: 10,
              marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          placeholder="No email address"

          clearButtonMode="while-editing"

          placeholderTextColor={colors.offWhite}

          keyboardAppearance="dark" // ios

          // textContentType="currentName" // ios

          // keyboardType="currentName-phone-pad"

          returnKeyType="done"

          // autoCorrect={true}

          autoCapitalize="none" // "words"

          maxLength={EMAIL_INPUT_LIMIT}

          onSubmitEditing={() => submit('email', currentEmail)}

          onChangeText={handleEmailChange}

          editable={false}

          value={currentEmail}

          textContentType="emailAddress" // ios

          autoCompleteType="email" // android

        >
        {
          currentEmail
        }
        </Text>

      </View>
    </TouchableOpacity>
    );
  // }
  return view;
}

const line2 = {
  alignSelf: 'center',
  justifyContent: 'center',
  width: '95%', // 267,
  height: '1%',
  borderStyle: 'solid',
  borderWidth: 0.5,
  borderColor: colors.darkTwo
};


export default withNavigation(UserNameEmailInput);
