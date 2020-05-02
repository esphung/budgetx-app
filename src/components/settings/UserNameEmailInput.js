import React, { useState, useEffect, useRef } from 'react';

import { withNavigation } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

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

import Dialog from 'react-native-dialog';

import { showMessage } from 'react-native-flash-message';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import {
  Container,
  Item,
  Input,
} from 'native-base';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

// import SpinnerMask from '../SpinnerMask';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

import isValidEmail from '../../functions/isValidEmail';

const spinnerView = (
  <View
    style={
      {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: colors.dark,
        position: 'absolute',
        top:  0,
        bottom: 0,
        left: 0,
        right: 0
      }
    }
  >
    <ActivityIndicator size="large" color={colors.offWhite} />
  </View>
);

function UserNameEmailInput(props) {
  const { navigation } = props;

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  const [nameLabelText, setCurrentNameLabelText] = useState('ID');

  const [emailLabelText, setCurrentEmailLabelText] = useState('Email');

  const [currentName, setCurrentName] = useState('');

  const [currentEmail, setCurrentEmail] = useState(global.email);

  const [currentFullName, setCurrentFullName] = useState('');

  const [shouldAuthCodeAutoFocus, setShouldAuthCodeAutoFocus] = useState(false);

  const [shouldClearNameInput] = useState(false);

  const [codeSent, setCodeSent] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);

  const [isSendingCode, setIsSendingCode] = useState(false);

  const [authCode, setAuthCode] = useState('')


  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const authCodeInputRef = useRef(null);

  async function verifyNewEmailAddress (email) {
    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: email });
      setCodeSent(true);
      showMessage({ message:'Code sent to this email address:', description: email, duration: 3550})

      authCodeInputRef.current._root.focus(); // set cursor to field
    } catch (error) {
      // onError(error);
      console.warn('error: ', error);
      setIsSendingCode(false);
    }

    setIsSendingCode(false);

    // setIsConfirming(true);

    // try {
    //   await Auth.verifyCurrentUserAttributeSubmit("email", authCode);

    //   // history.push("/settings");

    // } catch (error) {
    //   // onError(error);
    //   console.log('error: ', error);
    //   setIsConfirming(false);
    // }
  }

  async function handleConfirmClick () {
    // event.preventDefault();

    if (!authCode) {
      showMessage('Enter a code')
      return
    }

    setIsConfirming(true);

    global.emailAddressInput = currentEmail

    props.navigation.navigate('SignIn');

    // try {

    //   signOutToSignInPage();

    // } catch (error) {
    //   // onError(error);
    //   console.log('error: ', error);
    //   setIsConfirming(false);
    //   setCodeSent(false);

    //   setIsDialogVisible(false)

    //   setAuthCode('');
    // } 
  }
  const confirmationInput = (
     <View style={{ flex: 1, flexDirection: 'column', top: 10, alignSelf: 'center', marginRight: 10 }}>


       {/* email section */}
                <Item style={[styles.itemStyle, {
                  // borderWidth: 0,
                borderColor: 'transparent',
                borderStyle: 'solid',}]}>
                  <Ionicons active name="md-mail" style={
                    [
                      styles.iconStyle,
                      {
                        height: 14,
                      }
                    ]
                  } />
                  <Input
                    style={[
                      styles.input,
                      {
                      height: 26,
                    }]}
                    placeholder="email"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    // ref={emailInputRef}
                    // onSubmitEditing={() => handleEmailInputSubmit()}
                    // onChangeText={(value) => onChangeText('email', value)}
                    onChangeText={(text) => {
                      setIsDialogVisible(false)
                    }}
                    // clearButtonMode="always"

                    value={currentEmail}

                    editable={false}

                    keyboardAppearance="dark"
                    // onFocus={() => setIsKeyboardAvoidEnabled(false)}
                    maxLength={26}
                  />
                </Item>

                <Item style={[styles.itemStyle, {
                  // borderWidth: 0,
                // borderColor: 'transparent',
                borderStyle: 'solid',}]}>
                  <Ionicons active name="md-apps" style={[
                      styles.iconStyle,
                      {
                        height: 14,
                      }
                    ]} />
                  <Input
                    // disabled={!isAuthCodeInputEnabled}
                    style={[
                      styles.input,
                      {
                      height: 26,
                    }]}
                    placeholder="Confirmation code"
                    placeholderTextColor={colors.offWhite}
                    keyboardType="numeric"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={authCodeInputRef}
                    // onSubmitEditing={handleAuthCodeInputSubmit}
                    onSubmitEditing={handleConfirmClick}
                    onChangeText={(value) => setAuthCode(value)}

                    value={authCode}

                    keyboardAppearance="dark"
                    // onFocus={() => setIsKeyboardAvoidEnabled(true)}

                    maxLength={global.maxAuthCodeLength}
                  />
                </Item>
   
      

    </View>
  );

  const confirmationDialog = <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Verify new email?</Dialog.Title>
        <Dialog.Description>
        A confirmation code will be sent to this email address.
        If it is an invalid email this account will unverified and you will
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Ok" 
        onPress={() => verifyNewEmailAddress(currentEmail)}
        />
      </Dialog.Container>

  const errorDialog =
 <Dialog.Container visible={isError}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>

          Helllo
        </Dialog.Description>
        {/*<Dialog.Button label="Cancel" onPress={() => {}} />*/}
        <Dialog.Button label="Ok"
        onPress={
          () => {

            setIsError(false)
          }
          // okDialogueBtnPressed
        }
        />
      </Dialog.Container>



  function submit(key, value) {
    // console.log(key + ':', value);
    if (key === 'name') {
      setCurrentName(value);
    } else if (key === 'email') {
      // setCurrentEmail(value);
      handleEmailSubmit(value)
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

  const signOutToSignInPage = async () => {
    // global.showGlobalValues();
    showMessage('Please sign in with your new email');

    await Auth.signOut()
      .then(() => {
        AsyncStorage.removeItem('userToken');

        props.navigation.navigate('SignIn');

      })
      .catch((err) => console.log('Error while signing out!', err));
  };

  async function handleEmailSubmit(event) {
    // event.preventDefault();

    setIsSendingCode(true);
    

    // setIsConfirming(true);
    

    // setIsDialogVisible(true)

    try {
      const user = await Auth.currentAuthenticatedUser();
      // console.log('user: ', user);
      await Auth.updateUserAttributes(user, { email: currentEmail })
      // .then(
      //   async () => {

        
        

      //   Auth.verifyCurrentUserAttribute('email')
      //   .then(async () => {
      //     await setCodeSent(true);

      //   })
      //   .catch(e => {
      //     // alert(e.message)
      //     showMessage(e.message)

      //     setIsConfirming(false)

      //     setIsSendingCode(false);

      //     setCodeSent(false);
      //   })
      // })
      setCodeSent(true);
      // .catch(e => {
      //   showMessage(e.message)

      //   setIsConfirming(false);

      //   setIsSendingCode(false);

      //   setCodeSent(false);
        
      // })
      




      // await Alert.prompt('Enter a value', null, async (text) => {
      //   try {
          

      //     // history.push("/settings");
      //   } catch (error) {
      //     // onError(error);
      //     console.log('error: ', error);
      //     setIsConfirming(false);
      //   }
      //   console.log('You entered ' + text)

      //   await Auth.verifyCurrentUserAttributeSubmit('email', text)


      //   // props.navigation.navigate('Home')
      //   signOut()
      // }



    // );

      // alert('message?: DOMString')
    } catch (error) {
      // onError(error);
      console.log('error: ', error);
      setIsSendingCode(false);



      

      // return errorDialog(error.code, error.message)
    }


    try {
      let storage = await loadSettingsStorage(global.storageKey)
      await setCurrentEmail(storage.user.email)
      global.email = storage.user.email
    } catch(e) {
      // statements
      console.log(e);
    }


    console.log('currentEmail: ', currentEmail);
  }

  function handleTextChange(text) {
    setCurrentName(text);
  }

  function handleEmailChange(text) {
    setCurrentEmail(text);
    // setCurrentEmailPlaceholder(text);
  }

  const submitFullName = async ()  => {
    let storage = await loadSettingsStorage(global.storageKey);

    storage.user.full_name = currentFullName;

    saveSettingsStorage(global.storageKey, storage);

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user.attributes: ', user.attributes);
      // await Auth.updateUserAttributes(user, { 'name': currentFullName });
      await Auth.updateUserAttributes(user, { 'custom:full_name': storage.user.full_name });


      
      showMessage('Updated name');
    } catch (error) {
      // onError(error);
      console.log('error updating full name: ', error);
    }

    
  }

  const handleFullNameChange = async (text) => {
    // let storage = await loadSettingsStorage(global.storageKey)
    // storage.user.full_name = text;
    // console.log('storage.user: ', storage.user);

    // saveSettingsStorage(global.storageKey, storage)
    setCurrentFullName(text);
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

      global.storageKey = cognito.attributes.sub

      // setEmailLabelText('Email Address')
      // setNameLabelText('User ID');

      // setIsLoginEnabled(false)

      const storage = await loadSettingsStorage(global.storageKey);

      if (storage.user.full_name) {
        // setCurrentEmail(storage.user.name);
        setCurrentFullName(storage.user.full_name)
        // setCurrentEmailLabelText('Name')

       // || storage.user.id);
      }
      // // console.log('storage.user: ', storage.user);
      // if (storage.user.email) {
      //   setCurrentEmail(storage.user.email)
      // } else if (storage.user.name) {
      //   setCurrentEmail(storage.user.name)
        
      // }
      // else {
      //   setCurrentEmail('No email address')
      //   // setEmailLabelText('Email Address')
        
      // }
      if (storage.user.username) {
        setCurrentName(storage.user.username)
      } else if (storage.user.id) {
        setCurrentName(storage.user.id)
      }

      // AsyncStorage.setItem('isLoginEnabled', 'false');
      // global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled');
      // console.log('isLoginEnabled: ', isLoginEnabled);

      setIsSignUpDisabled(true);
    })
    .catch(async (err) => {
      // console.log('err: ', eZsrr);
      const storage = await loadSettingsStorage(global.storageKey);

      if (storage.user.name) {
        setCurrentEmail(storage.user.name);
        setCurrentFullName(storage.user.full_name)
        setCurrentEmailLabelText('Name')

       // || storage.user.id);
      }
      // console.log('storage.user: ', storage.user);
      if (storage.user.email) {
        setCurrentEmail(storage.user.email)
      } else if (storage.user.name) {
        setCurrentEmail(storage.user.name)
        
      }
      else {
        setCurrentEmail('No email address')
        // setEmailLabelText('Email Address')
        
      }
      if (storage.user.username) {
        setCurrentName(storage.user.username)
      } else if (storage.user.id) {
        setCurrentName(storage.user.id)
      }

      // setIsLoginEnabled(true)
      // AsyncStorage.setItem('isLoginEnabled', 'true')
      // global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled')
      // console.log('isLoginEnabled: ', isLoginEnabled);

      setIsSignUpDisabled(false);

    })
    return () => {
      // effect
    };
  }, []);

  async function onSubmitEditingEmailInput() {
    let str = currentEmail.trim();
    // body... 
    if (str) {
      // must be valid email
      if (isValidEmail(str) !== true) {
        console.warn('Must be valid');
        // setCurrentEmail('');
      }
      //  cannot match verified user email;
      else if ((str === global.email) || (global.email === (str))) {
        console.warn('Cannot match!');
        // setCurrentEmail('');
      }
      else {
        setCurrentEmail(str);
        setIsDialogVisible(true)
      }
      
    }
  }
  let view = (
    <TouchableOpacity
      disabled // ={isSignUpDisabled}
      onPress={
        () => navigation.navigate('SignUp')
      }
      style={{ flex: 1, flexDirection: 'column' }}
    >
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
       [
         styles.textStyle,
         {
          marginLeft: 10,
         }
       ]
      }
      >
      {
        nameLabelText
      }
      </Text>
      <Text

        style={[
          styles.textStyle,
          {
            flex: 1,

            textAlign: 'right',
            color: colors.offWhite, // '#ffffff7f.8',

            marginRight: 10,
            // marginBottom: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
          ]
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



    {
      isConfirming && spinnerView
    }
    <View style={{
      flex: 1,
      // flexDirection: 'row',
      flexDirection: 'column',
      justifyContent: 'center',
        // alignItems: 'center',
     }}
     >
      <View style={line2} />
    

     
      <View style={
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
      {/* User First Name input */}
      <Text style={[styles.textStyle, {marginLeft: 10,}]}
      >
      Full Name
      </Text>
      <TextInput

        style={[
            styles.textStyle,
            {
              flex: 1,

              textAlign: 'right',
              color: colors.offWhite, // '#ffffff7f.8',

              marginRight: 10,
              // marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
            ]
          }
          placeholder={'Enter full name'}

          clearButtonMode="while-editing"

          placeholderTextColor={colors.offWhite}

          keyboardAppearance="dark" // ios

          textContentType="givenName" // ios

          // keyboardType="currentName-phone-pad"

          returnKeyType="done"

          // autoCorrect={true}

          autoCapitalize="words" // "words"

          maxLength={14}

          onSubmitEditing={submitFullName}

          onChangeText={handleFullNameChange}

          value={currentFullName}

          // autoFocus={shouldNameAutofocus}

          autoCompleteType="name" // android

          // enablesReturnKeyAutomatically={true}

          // editable={isNameInputEnabled}
          editable={global.authenticated}

          // clearButtonMode="always"

          // clearTextOnFocus={shouldClearNameInput}

        />
      </View>
      </View>
    
      <View style={line2} />
      <View
      style={
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
          [
            styles.textStyle,
            {
              marginLeft: 10,
            }
          ]
        }
        >
        {
          emailLabelText
        }
        </Text>
        <TextInput
          style={[
            styles.textStyle,
            {
              flex: 1,

              textAlign: 'right',
              color: colors.offWhite, // '#ffffff7f.8',

              marginRight: 10,
              // marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
            ]
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

          maxLength={global.maxEmailLength}

          // onSubmitEditing={() => submit('email', currentEmail)}
          onSubmitEditing={onSubmitEditingEmailInput}

          onChangeText={handleEmailChange}

          // editable={global.authenticated}
          editable={false}

          value={currentEmail}

          textContentType="emailAddress" // ios

          autoCompleteType="email" // android

        >
        </TextInput>

      </View>
      {
        (currentEmail !== global.email) && confirmationDialog
      }
    </TouchableOpacity>
    );
  return codeSent && confirmationInput || view
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
