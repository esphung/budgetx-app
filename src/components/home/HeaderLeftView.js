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

function HeaderLeftView(props) {
  const { onUsernameSubmit, getNormalMessage } = props;

  const { navigation } = props;

  // console.log('props: ', props);
  const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  const [normalMessage, setNormalMessage] = useState('Enter your email');
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [normalMessage, setNormalMessage] = useState(`${global.appName} ${global.appVersion}`);

  const [image, setImage] = useState(global.avatar);

  const [isReady, setIsReady] = useState(false);

  // const [text, onChangeText] = React.useState(normalMessage);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const emailInputRef = useRef(null);

  useEffect(() => {
    clearState()
    // return () => {
    //   // effect
    // };
  }, []);

  const clearState = async () => {
    // setBoldMessage('Get cross-device sync');
    // setNormalMessage('Enter your email');


    retrieveStoredSettingsImage(global.storageKey)

    setImage(global.avatar)

    global.emailAddressInput = '';

    Auth.currentAuthenticatedUser().then(async (cognito) => {

      global.storageKey = cognito.attributes.sub

      global.email = cognito.attributes.email
      
      // setNormalMessage(cognito.attributes.email);

      const storage = await loadSettingsStorage(cognito.attributes.sub);

      try {
        storage.user.email = cognito.attributes.email
      
        storage.user.id = cognito.attributes.sub

        await saveSettingsStorage(global.storageKey, storage)
      } catch(e) {
        // statements
        console.log(e);
      }


      if (storage) {
        // console.log('storage: ', storage);
        setBoldMessage((storage.user.full_name) ? storage.user.full_name : global.displayName);
        setNormalMessage(storage.user.email)

      }

      setIsUserLoggedIn(true);

    }).catch((err) => {
      // console.log('err: ', err);
      // setNormalMessage(`${global.appName} ${global.appVersion}`);
      // setNormalMessage('Enter your email');
    });
  };

    async function retrieveStoredSettingsImage(key) {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(key);

      // console.log('storageObj: ', storageObj);
      if (storageObj.user.name  && storageObj.user.name !== '' && storageObj.user.email) {
        setNormalMessage(storageObj.user.name);
        setIsUserLoggedIn(true);
      }

      // console.log('storageObj: ', storageObj);
      if (storageObj.user.email  && storageObj.user.email !== '') {
        setNormalMessage(storageObj.user.email);
        setIsUserLoggedIn(true);
      }

      // set stored user image
      if (storageObj.image_url) {
        // console.log('stored user settings image:', storageObj.image);
        if (storageObj.image_url) {
          // found stored image
          setImage(storageObj.image_url);
        }
      }
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



  const imageView = (
    <TouchableOpacity
    disabled
    style={styles.userImageMaskView}
  >
    <Image
      resizeMode="contain"
      style={styles.userImage}
      source={image} // {global.placeholder500x500}
    />
  </TouchableOpacity>
  );

  function clearEmailInput() {
    // console.log('emailInputRef.current._root.focus(): ', emailInputRef.current._root.focus());
    emailInputRef.current._root.clear();
  }

  function showSignInScreen(email) {
    // console.log('navigation: ', navigation);
    // console.log('email: ', email);
    props.navigation.navigate('SignUp');
  }

  return (
      <View
        style={
          styles.headerLeft
          // {
          //   flexDirection: 'row',
          //   marginTop: 20,
          //   marginLeft: 15,

          //   alignItems: 'center',

          //   borderWidth: 1,
          //   borderColor: 'white',
          //   borderStyle: 'solid',
          // }
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

        <View style={styles.userMessageView}>
          <Input editable={false} style={styles.boldMessage}>
            {
              boldMessage
            }
          </Input>

          {/*<TouchableOpacity disabled={isUserLoggedIn}>*/}
        
          <Input

            testID="emailTextID"

            editable={!isUserLoggedIn}

            placeholder={normalMessage}
            style={styles.normalMessage}
            // editable={false}
            // onChangeText={(text) => onChangeText(text)}

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

                    showMessage({
                      message: 'Enter valid email address',
                      duration: 1150,
                      position: 'top',

                      // description: "My message description",
                      type: 'danger', // "success", "info", "warning", "danger"
                      backgroundColor: colors.dark, // "purple", // background color
                      color: colors.white, // "#606060", // text color

                      textStyle: styles.textStyle,

                      icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
                    });

                    clearEmailInput();
                  }
                }
            }

            clearTextOnFocus



            // // value={text}
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
