/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
UPDATED:    12/04/2019 05:07 PM   | commented out Font loader
            12/05/2019 11:22 PM   | fixed  bold, norrmal messages,
            image to show updated user image
            12/11/2019 03:07 AM | added cognito user
            02/28/2020 02:36 PM | Disabled TextInput
*/


import React, { useState, useEffect, useRef } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  // TextInput,
  // ActivityIndicator,
  Platform,
  SafeAreaView,
  Alert,
  TextInput,
  AsyncStorage,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';


import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

import { NavigationEvents } from 'react-navigation';

import { withNavigation } from 'react-navigation';

// import { NetworkConsumer } from 'react-native-offline';

// import { Asset } from 'expo-asset';

// import { AppLoading } from 'expo';

import Auth from '@aws-amplify/auth';

import { showMessage } from 'react-native-flash-message';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import isValidEmail from '../../functions/isValidEmail';

import { Ionicons } from '@expo/vector-icons';

import ProfileUserImage from '../settings/ProfileUserImage';

// global.showGlobalValues()

function HeaderLeftView(props) {
  const { onUsernameSubmit, getNormalMessage } = props;

  const { navigation } = props;

  // console.log('props: ', props);
  const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  const [normalMessage, setNormalMessage] = useState('');
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [normalMessage, setNormalMessage] = useState(`${global.appName} ${global.appVersion}`);

  // const [image, setImage] = useState(global.avatar);

  // const [isReady, setIsReady] = useState(false);

  const [emailInputText, setEmailInputText] = React.useState('');

  const emailInputRef = useRef(null);

  const [placeholder, setPlaceholder] = useState('Enter your email');

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(global.authenticated)

  useEffect(() => {

    clearState();
    // return () => {
    //   // effect
    // };
  }, []);

  const clearState = async () => {
    // setBoldMessage('Get cross-device sync');
    // setNormalMessage('Enter your email');


    retrieveStoredSettingsImage(global.storageKey);

    // setImage(global.avatar);

    global.emailAddressInput = '';

    Auth.currentAuthenticatedUser().then(async (cognito) => {
      global.storageKey = cognito.attributes.sub;

      global.email = cognito.attributes.email;
      const storage = await loadSettingsStorage(cognito.attributes.sub);

      try {
        storage.user.email = cognito.attributes.email
      
        storage.user.id = cognito.attributes.sub

        saveSettingsStorage(global.storageKey, storage)
      } catch(e) {
        // statements
        console.log(e);
      }

      try {
        setBoldMessage((storage.user.name) ? storage.user.name : `Cross-device sync ${JSON.parse(await AsyncStorage.getItem('someBoolean')) ? 'enabled' : 'disabled'}`) // : global.displayName);
        
        setNormalMessage(storage.user.email);
      } catch(e) {
        // statements
        throw new Error(e);
        setNormalMessage(cognito.attributes.email);
      }

      // if (storage.user.full_name) {
      //   setBoldMessage((storage.user.full_name) ? storage.user.full_name : global.displayName) // : global.displayName);
        
      //   setNormalMessage(storage.user.email);
      // } else {
      //   setNormalMessage(cognito.attributes.email);
      //   // setBoldMessage(global.displayName)

      // }

      setIsUserLoggedIn(true);


    }).catch((err) => {
      // console.log('err: ', err);
      setIsUserLoggedIn(false);
      // setNormalMessage(`${global.appName} ${global.appVersion}`);
      // setNormalMessage('Enter your email');
    });
  };

    async function retrieveStoredSettingsImage(key) {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(key);

      if (storageObj.user.name && storageObj.user.name !== '' && storageObj.user.email) {
        setNormalMessage(storageObj.user.name);
      }

      // console.log('storageObj: ', storageObj);
      if (storageObj.user.email  && storageObj.user.email !== '') {
        setNormalMessage(storageObj.user.email);
      }

      if (storageObj.avatar) global.avatar = storageObj.avatar
    } catch (e) {
      // statements
      Alert.alert('Could not load settings');
      // console.log(e);
    }
  }

  useEffect(() => {
    // getPermissionAsync();
    retrieveStoredSettingsImage(global.storageKey)
  }, []);



  // const imageVie = (
  //   <TouchableOpacity
  //   disabled
  //   style={styles.userImageMaskView}
  // >
  //   <Image
  //     // resizeMode="contain"
  //     style={styles.userImage}
  //     source={global.avatar} // {global.placeholder500x500}
  //   />
  // </TouchableOpacity>
  // );

  const imageView = <ProfileUserImage isUserLoggedIn={isUserLoggedIn} />

  function clearEmailInput() {
    // console.log('emailInputRef.current._root.focus(): ', emailInputRef.current._root.focus());
    emailInputRef.current._root.clear();
  }

  function showSignInScreen(email) {
    // console.log('navigation: ', navigation);
    // console.log('email: ', email);
    props.navigation.navigate('SignUp');
  }

  function handleEmailInputTextChange (text) {
    let str = text.trim()
    // console.log('text: ', str);
    setEmailInputText(str)
  }

  return (
      <View
        style={
          // styles.headerLeft,
          {
            
            height: 50,
            width: (screenWidth),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={clearState} // {(payload) => clearState()}
        // other props
        onDidFocus={clearState}
        // onWillBlur={clearState} // console.log('will blur',payload)}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
        {
          imageView
        }

        <View style={[styles.userMessageView,{}]}>
          
          <Input
            editable={false} style={styles.boldMessage}>
            {
              boldMessage
            }
          </Input>
       
        
          <Input

            testID="emailTextID"

            editable={!global.authenticated}

            placeholder={((isUserLoggedIn) ? normalMessage : placeholder)}
            placeholderTextColor={colors.white}
            style={styles.normalMessage}
            // editable={false}
            onChangeText={(text) => {
              // var str = text
              // alert(str.trim());
              // setEmailInputText(str);
              handleEmailInputTextChange(text);
            }}

            ref={emailInputRef}

            onSubmitEditing={(input) =>
                {
                  // console.log('input.nativeEvent.text: ', input.nativeEvent.text);
                  // if (isValidEmail(input.nativeEvent.text)) {

                  if (isValidEmail(input.nativeEvent.text)) {
                    // valid email input format
                    global.emailAddressInput = input.nativeEvent.text;

                    // showMessage({
                    //   message: `Email: ${global.emailAddressInput}`,
                    // });

                    showSignInScreen(input.nativeEvent.text);
                    
                  } else {
                    // email input is invalid format
                    // console.log('input: ', input);
                    global.emailAddressInput = '';

                    // showMessage({
                    //   message: 'Enter valid email address',
                    //   duration: 1150,
                    //   position: 'top',

                    //   // description: "My message description",
                    //   type: 'danger', // "success", "info", "warning", "danger"
                    //   backgroundColor: colors.dark, // "purple", // background color
                    //   color: colors.white, // "#606060", // text color

                    //   textStyle: styles.textStyle,

                    //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
                    // });

                    clearEmailInput();
                  }
                }
            }

            clearTextOnFocus



            value={emailInputText}
            clearButtonMode="while-editing"
            // clearTextOnFocus
            autoCorrect={false}
            autoCapitalize="none"
            // enablesReturnKeyAutomatically

            autoCompleteType="email"

            keyboardType="email-address"

            textContentType="emailAddress"

            maxLength={global.maxEmailLength}

            keyboardAppearance="dark"
          >
            {
              normalMessage

            }
          </Input>
          
          
          

        </View>

      </View>
    );
};

export default withNavigation(HeaderLeftView);
