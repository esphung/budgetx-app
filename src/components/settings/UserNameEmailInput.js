import React, { useState, useEffect, useRef } from 'react';

import { withNavigation } from 'react-navigation';

import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

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
import colors from 'src/colors';

import styles from '../../../styles';

// import SpinnerMask from '../SpinnerMask';

import {
  loadStorage,
  saveStorage,
} from 'controllers/Storage';

import isValidEmail from '../../functions/isValidEmail';

import { isDeviceOnline } from 'controllers/Network';

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

  const isUserLoggedIn = navigation.getParam('isUserLoggedIn')

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  const [idLabelText, setCurrentIdText] = useState('Id');

  const [emailLabelText, setEmailLabelText] = useState('Email');

  const [uniqueId, setUniqueId] = useState('');

  const [email, setEmail] = useState(global.emailAddressInput);

  const [name, setName] = useState('');

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

  const [isReady, setIsReady] = useState(false);

  function submitNewEmailAddress (email) {
    // body...

    props.navigation.navigate('SignUp');
  }

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
      // showMessage('Enter a code')
      showMessage({
          message: 'Enter a code',
          // duration: 550,
          position: 'bottom',

          // description: "My message description",
          // type: 'success', // "success", "info", "warning", "danger"
          // backgroundColor: colors.dark, // "purple", // background color
          color: colors.pinkRed, // "#606060", // text color
          opacity: 1,

          textStyle: styles.textStyle,

          // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
        });
        return
      }

    setIsConfirming(true);

    global.emailAddressInput = email

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

                    value={email}

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

    const confirmationDialog =
    <Dialog.Container visible={isDialogVisible}>
      <Dialog.Title>Would You Like to Sign Up?</Dialog.Title>
      <Dialog.Description>
      A confirmation code will be sent to this email address.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
      <Dialog.Button label="Ok" 
      onPress={() =>
        {
          global.emailAddressInput = email;
          setIsDialogVisible(false);
          submitNewEmailAddress(email);
          
        }
      }
      />
    </Dialog.Container>

  // const confirmationDialog = <Dialog.Container visible={isDialogVisible}>
  //       <Dialog.Title>Verify new email?</Dialog.Title>
  //       <Dialog.Description>
  //       A confirmation code will be sent to this email address.
  //       If it is an invalid email this account will unverified and you will
  //       </Dialog.Description>
  //       <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
  //       <Dialog.Button label="Ok" 
  //       onPress={() => verifyNewEmailAddress(email)}
  //       />
  //     </Dialog.Container>

 //  const errorDialog =
 // <Dialog.Container visible={isError}>
 //        <Dialog.Title>Error</Dialog.Title>
 //        <Dialog.Description>

 //          Helllo
 //        </Dialog.Description>
 //        {<Dialog.Button label="Cancel" onPress={() => {}} />}
 //        <Dialog.Button label="Ok"
 //        onPress={
 //          () => {

 //            setIsError(false)
 //          }
 //          // okDialogueBtnPressed
 //        }
 //        />
 //      </Dialog.Container>



  function submit(key, value) {
    // console.log(key + ':', value);
    if (key === 'name') {
      setUniqueId(value);
    } else if (key === 'email') {
      // setEmail(value);
      handleEmailSubmit(value)
    }

    // if (uniqueId && email) {
    //   if (isValidEmail(email) && isValidName(uniqueId)) {
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
      await Auth.updateUserAttributes(user, { email: email })
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
      let storage = await loadStorage(global.storageKey)
      setEmail(storage.user.email)
      global.email = storage.user.email
    } catch(e) {
      // statements
      console.log(e);
    }


    console.log('email: ', email);
  }

  function handleTextChange(text) {
    setUniqueId(text);
  }

  function handleEmailChange(text) {
    setEmail(text);
    // setEmailPlaceholder(text);
  }

  const submitName = async () => {
    const storage = await loadStorage(global.storageKey);

    // saveStorage(global.storageKey, storage);
    if (await isDeviceOnline()) {
      try {
        await Auth.currentAuthenticatedUser()
          .then(async (user) => {
            // console.log('user.attributes: ', user.attributes);
            await Auth.updateUserAttributes(user, { 'name': name }).then(async () => {
              Auth.updateUserAttributes(user, { 'custom:name': name });
              // .then(() => {
              //   // console.log('succ: ', succ);
              //   // console.log('storage.user: ', storage.user);
              //   // console.log('user.attributes: ', user.attributes);
              // }).catch((e) => console.warn(e))
            });
          }).catch((e) => console.warn(e));
      } catch (error) {
        console.log('error updating name: ', error);
      }
    }
    storage.user.full_name = name;

    storage.user.name = name;

    saveStorage(global.storageKey, storage);
  };

  const handleFullNameChange = async (text) => {
    // let storage = await loadStorage(global.storageKey)
    // storage.user.full_name = text;
    // console.log('storage.user: ', storage.user);

    // saveStorage(global.storageKey, storage)
    setName(text);
  };
  async function loadResources() {
    const storage = await loadStorage(global.storageKey);

    setUniqueId(storage.user.id);

    if (!storage.user.full_name) {
      setName(storage.user.name);
    } else {
      setName(storage.user.full_name);
    }

    setEmail(storage.user.email);

    await Auth.currentAuthenticatedUser().then(async (cognito) => {
      setEmail(cognito.attributes.email);
      // setName(cognito.attributes['custom:name'])

      setIsReady(true);
    }).catch(() => {
      setIsReady(true);
    })

    
  }

  useEffect(() => {
    loadResources();
    return () => {
      // effect
      setEmail('');
      global.emailAddressInput = '';
      global.email = '';
    };
  }, []);

  async function onSubmitEditingEmailInput() {
    if (global.authenticated) return;

    const str = email.trim();
    if (isValidEmail(str) !== true) {
      return
    }
    if (!global.authenticated) {
      global.emailAddressInput = str;
      submitNewEmailAddress(str);
    }
  }
  const view = (
    <TouchableOpacity
      disabled // ={isSignUpDisabled}
      onPress={
        () => navigation.navigate('SignUp')
      }
      style={{ flex: 1, flexDirection: 'column' }}
    >

    {
      (isConfirming || !isReady) && spinnerView
    }
    <View style={{
      flex: 1,
      // flexDirection: 'row',
      flexDirection: 'column',
      justifyContent: 'center',
        // alignItems: 'center',
     }}
     >
      {/*<View style={line2} />*/}
    

     
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
      <Text style={
       [
         styles.textStyle,
         {
          marginLeft: 10,
         }
       ]
      }
      >

      {/*<Ionicons name="md-person" size={styles.iconStyle.fontSize} color={colors.white} />*/}

      Name
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
          placeholder="Enter name"

          clearButtonMode="while-editing"

          placeholderTextColor={colors.offWhite}

          keyboardAppearance="dark" // ios

          textContentType="givenName" // ios

          // keyboardType="uniqueId-phone-pad"

          returnKeyType="done"

          // autoCorrect={true}

          // autoCapitalize="words" // "words"

          maxLength={24}

          onSubmitEditing={submitName}

          onChangeText={handleFullNameChange}

          value={name}

          // autoFocus={shouldNameAutofocus}

          autoCompleteType="name" // android

          // enablesReturnKeyAutomatically={true}

          // editable={isNameInputEnabled}
          editable={true}

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
        {/*<Entypo name="email" size={styles.iconStyle.fontSize} color={colors.white} />*/}
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
          
          placeholder="No verified email address"

          clearButtonMode="while-editing"

          placeholderTextColor={colors.offWhite}

          keyboardAppearance="dark" // ios

          // textContentType="uniqueId" // ios

          // keyboardType="uniqueId-phone-pad"

          returnKeyType="done"

          // autoCorrect={true}

          autoCapitalize="none" // "words"

          maxLength={global.maxEmailLength}

          // onSubmitEditing={() => submit('email', email)}
          onSubmitEditing={onSubmitEditingEmailInput}

          onChangeText={handleEmailChange}

          editable={!isUserLoggedIn}
          // editable={false}

          value={email}

          textContentType="emailAddress" // ios

          autoCompleteType="email" // android

          // clearTextOnFocus={shouldClearNameInput}

        >
        </TextInput>

      </View>
      {
        confirmationDialog
      }
    </TouchableOpacity>
    );
  return codeSent && confirmationInput || view;
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
