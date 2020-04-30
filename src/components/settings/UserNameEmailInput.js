import React, { useState, useEffect, useRef } from 'react';

import { withNavigation } from 'react-navigation';

// import SwitchNavigator from '../../../SwitchNavigator'; // ????

// import { NetworkProvider } from 'react-native-offline'; // ????
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

  // navigation.navigate('Home');
  // navigation.navigate('Home');

  // const [text, setText] = useState(null);

  // const [isUserLoaded, setIsUserLoaded] = useState(false);

  // const [isInputEnabled, setIsInputEnabled] = useState(false);

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  const [nameLabelText, setCurrentNameLabelText] = useState('Account');

  const [emailLabelText, setCurrentEmailLabelText] = useState('Email');

  const [currentName, setCurrentName] = useState('');

  const [currentEmail, setCurrentEmail] = useState(global.email);

  const [currentFullName, setCurrentFullName] = useState('')

  // const [emailPlaceholder, setCurrentEmailPlaceholder] = useState('examplemail@budget.com');

  // const [shouldNameAutofocus, setShouldNameAutoFocus] = useState(false);

  const [shouldAuthCodeAutoFocus, setShouldAuthCodeAutoFocus] = useState(false);

  // const [isEmailInputEnabled, setIsEmailInputEnabled] = useState(false);

  // const [isNameInputEnabled, setIsNameInputEnabled] = useState(true);

  const [shouldClearNameInput] = useState(false);

  const [codeSent, setCodeSent] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const [authCode, setAuthCode] = useState('')


  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  const authCodeInputRef = useRef(null);


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

  async function handleUpdateClick () {
    // event.preventDefault();

    // alert(currentEmail)

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: currentEmail });
      setCodeSent(true);
      showMessage('Code sent to email:', currentEmail)

      authCodeInputRef.current._root.focus(); // set cursor to field
    } catch (error) {
      // onError(error);
      console.log('error: ', error);
      setIsSendingCode(false);
    }

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



    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", authCode)

      // history.push("/settings");

      // PUSH USER SETTINGS HERE!!!
      // global.storageKey = ...


      // global.showGlobalValues()

      signOut()
      
    } catch (error) {
      // onError(error);
      console.log('error: ', error);
      setIsConfirming(false);


    }

    await setCodeSent(false);

    setIsDialogVisible(false)

    setAuthCode('');
  }


  // const handleAuthCodeInputSubmit = async () => {
  //   if (!authCode) return

  //   // console.log('You entered ' + authCode)
  //   await Auth.verifyCurrentUserAttributeSubmit('email', authCode)
  //   .then(
  //     async (user) => {
  //       // console.log('user: ', user);

        

  //       // navigation.navigate('AuthLoading');

  //       setIsConfirming(false);

  //       setIsSendingCode(false)

  //       setCodeSent(false);

  //       signOut()

  //       global.email = user.attributes.email

  //       navigation.navigate(SignIn)
        
  //   })
  //     .catch(err => {
  //     alert(err.message)
  //     // errorDialog(err.message)
  //     // setIsError(true)
  //     // await setErrorMessage(err.message)


  //   })

  //           setIsConfirming(false);

  //     setIsSendingCode(false)

  //     setCodeSent(false);


  // };
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
        <Dialog.Title>Verify email?</Dialog.Title>
        <Dialog.Description>
        A confirmation code will be sent
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Ok" 
        onPress={handleUpdateClick}
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

  const signOut = async () => {
    let storage =  await loadSettingsStorage(global.storageKey)
      // console.log('storage: ', storage);

    storage.image_url = global.avatar

    saveSettingsStorage(global.storageKey, storage)


    global.email = currentEmail;

    global.avatar = 

    global.showGlobalValues()

    await Auth.signOut()
      .then(async () => {
        AsyncStorage.removeItem('userToken');

        AsyncStorage.removeItem('storageKey');

        AsyncStorage.removeItem('isLoginEnabled');

        AsyncStorage.removeItem('isUserAuthenticated');

        global.storageKey = '';

        global.isUserAuthenticated = false;

        // global.avatar = require('../../../assets/avatar.png');


        // console.log('Removed AsyncsStorage Variables ..');


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

        // AsyncStorage.setItem('storageKey', JSON.stringify(''))

        showMessage({message:'Signed out', description: `Please sign in as ${global.email}`});

        // props.navigation.navigate('AuthLoading')
        global.emailAddressInput = global.email

        navigation.navigate('AuthLoading');



  

      //   // console.log('Removed AsyncsStorage Variables ..');


      //   // AsyncStorage.getAllKeys((err, keys) => {
      //   //   AsyncStorage.multiGet(keys, (error, stores) => {
      //   //     stores.map((result, i, store) => {
      //   //       console.log({ [store[i][0]]: store[i][1] });
      //   //       return true;
      //   //     });
      //   //   });
      //   // });

      // // AsyncStorage.setItem('storageKey', JSON.stringify(''))

      

        

      //   // console.log('Sign out complete');
      //   showMessage({message:'Signed out', description: `Please sign into ${global.email}`});

      //   // props.navigation.navigate('AuthLoading')
      //   global.emailAddressInput = global.email
      //   props.navigation.navigate('SignIn')
        // alert('Signed Out!')
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
    let storage = await loadSettingsStorage(global.storageKey)
    storage.user.full_name = currentFullName;
    saveSettingsStorage(global.storageKey, storage)

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user.attributes: ', user.attributes);
      // await Auth.updateUserAttributes(user, { 'name': currentFullName });
      await Auth.updateUserAttributes(user, { 'custom:full_name': storage.user.full_name });


      
      showMessage('Updated name:', currentFullName);
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

      AsyncStorage.setItem('isLoginEnabled', 'false');
      global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled');
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
      AsyncStorage.setItem('isLoginEnabled', 'true')
      global.isLoginEnabled = await AsyncStorage.getItem('isLoginEnabled')
      // console.log('isLoginEnabled: ', isLoginEnabled);

      setIsSignUpDisabled(false);

    })
    return () => {
      // effect
    };
  }, [])



  let view = (
    <TouchableOpacity
      disabled // ={isSignUpDisabled}
      onPress={
        () => navigation.navigate('SignUp')
        // async () => {
        //   // New User Sign Up Alert
        //   console.log('global.isLoginEnabled: ', global.isLoginEnabled);
        //   if (global.isLoginEnabled !== 'false') {
        //     // console.log('isLoginEnabled: ', isLoginEnabled);
        //     Alert.alert(
        //       'Would you like to sign up?',
        //       'Access more features: change your name, multiple users, save data and more',
        //       // null,
        //       // 'Signing up will allow more features like multiple users per device.',
        //       [
        //         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //         { text: 'OK', onPress: () => navigation.navigate('SignUp')
        //         },
        //       ],
        //     )
        //   }
        // }
      }
    style={{ flex: 1, flexDirection: 'column' }}>

    

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
       }}>
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
          onSubmitEditing={() => {
            if (currentEmail) setIsDialogVisible(true)
            
          }}

          onChangeText={handleEmailChange}

          editable={global.authenticated}

          value={currentEmail}

          textContentType="emailAddress" // ios

          autoCompleteType="email" // android

        >
        {
          // currentEmail
        }
        </TextInput>

      </View>
      {
        confirmationDialog
      }
    </TouchableOpacity>
    );
  // }


  // return view;

  // return errorDialog('Hello', 'world')

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
