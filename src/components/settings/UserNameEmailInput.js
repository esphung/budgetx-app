import React, { useState, useEffect } from 'react';

import {
  // StyleSheet,
  View,
  // Button,
  // TouchableOpacity,
  Text,
  // Image,
  TextInput
} from 'react-native';

import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

import {
  loadUserObject,
  saveUserObject
} from '../../storage/UserStorage';

// var nameRegex = /^[a-zA-Z\-]+$/;
var usernameRegex = /^[a-zA-Z0-9]+$/;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(text) {
  // var regExp = /^[a-zA-Z]*$/
  const regExp = usernameRegex;
  if (!regExp.test(text)) {
    return false;
  } else {      
    return true;
  }
}

const EMAIL_INPUT_LIMIT = 22;

function UserNameEmailInput() {
  const [text, setText] = useState(null);

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const [name, setName] = useState('');

  const [email, setEmail] = useState(null);

  const [emailPlaceholder, setEmailPlaceholder] = useState('examplemail@budget.com');

  const [namePlaceholder, setNamePlaceholder] = useState('johnsmith123');

  const [shouldNameAutofocus, setShouldNameAutoFocus] = useState(false);

  const [isEmailInputEnabled, setIsEmailInputEnabled] = useState(true);

  const [isNameInputEnabled, setIsNameInputEnabled] = useState(true);

  const [shouldClearNameInput, setShouldClearNameInput] = useState(false);

  async function saveName(name) {
    const userObject = await loadUserObject(); // load storage object
    // console.log('user:', userObject.user.username);

    userObject.user.username = name;
    // console.log('user:', userObject.user.username);

    if (isValidName(name)) {
      saveUserObject(userObject);
    }
  }

  async function saveEmail(email) {
    const userObject = await loadUserObject(); // load storage object

    userObject.user.email = email;
    // console.log('user:', userObject.user.username);

    if (isValidEmail(email)) {
      saveUserObject(userObject);
      // setIsEmailInputEnabled(false);
    }
  }

  async function retrieveStoredUserData () {
    const userObject = await loadUserObject(); // load storage object
    // console.log(userObject.user);

    // //  Testing
    // userObject.user.username = ''
    // userObject.user.email = ''
    // saveUserObject(userObject)

    if (userObject.user.username) {
      setName(userObject.user.username);
      setNamePlaceholder(userObject.user.username);
    } else {
      setShouldClearNameInput(true);
    }

    if (userObject.user.email) {
      setEmail(userObject.user.email);
      setEmailPlaceholder(userObject.user.email);
      // setIsEmailInputEnabled(false);
    }

     setIsUserLoaded(true);
  }

  function submitNamePressed(text) {
    // setName(text);
    // console.log('Submit:', text)
    saveName(text);
  }

  function handleTextChange(text) {
    setName(text)
  }

  function handleEmailChange(text) {
    setEmail(text);
    setEmailPlaceholder(text)
  }
  function submitEmailPressed(text) {
    // console.log('Submit:', text)
    // setEmail(text);

    saveEmail(text)
  }

  useEffect(() => {
    if (isValidName(name) || name === '') {
      // console.log(name);
      setNamePlaceholder(name)
    } else {
      // setIsNameReturnKeyEnabled(false);
      setName(namePlaceholder)
    }
    return ()  => {
      // setIsNameReturnKeyEnabled(true);
    }

  }, [name]);

  useEffect(() => {

    if (isValidEmail(email) || email === '') {
      // console.log(email);
      setEmailPlaceholder(email);
    }
  }, [email])

  useEffect(() => {
    // check for stored user
    retrieveStoredUserData();

    // enable input
    setIsInputEnabled(true);
  }, [])

  let view = <SpinnerMask />;

  if (isUserLoaded) {
    view = (
        <View style={{ flex: 1, flexDirection: 'column' }}>
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
            {/* User name input */}
            <Text style={
              {
                flex: 0.4,
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
            Username
            </Text>
            <TextInput
              style={
                {
                  flex: 0.6,
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
              placeholder={'Choose username'}

              placeholderTextColor={colors.offWhite}

              keyboardAppearance="dark" // ios

              textContentType="username" // ios

              // keyboardType="name-phone-pad"

              returnKeyType="done"

              // autoCorrect={true}

              autoCapitalize="none" // "words"

              maxLength={14}

              onSubmitEditing={() => submitNamePressed(name)}

              onChangeText={handleTextChange}

              editable={true}

              value={name}

              autoFocus={shouldNameAutofocus}

              autoCompleteType="username" // android

              // enablesReturnKeyAutomatically={true}

              editable={isNameInputEnabled}

              // clearButtonMode="always"

              clearTextOnFocus={shouldClearNameInput}

            />

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
                flex: 0.2,
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
            Email
            </Text>
            <TextInput
              style={
                {
                  flex: 0.8,
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
              placeholder={'Enter email address'}

              placeholderTextColor={colors.offWhite}

              keyboardAppearance="dark" // ios

              // textContentType="name" // ios

              // keyboardType="name-phone-pad"

              returnKeyType="done"

              // autoCorrect={true}

              autoCapitalize="none" // "words"

              maxLength={EMAIL_INPUT_LIMIT}

              onSubmitEditing={() => submitEmailPressed(email)}

              onChangeText={handleEmailChange}

              editable={isEmailInputEnabled}

              value={email}

              textContentType="emailAddress" // ios

              autoCompleteType="email" // android

            />

          </View>
        </View>
    )
  }
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


export default UserNameEmailInput;