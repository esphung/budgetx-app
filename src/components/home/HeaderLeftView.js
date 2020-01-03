/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
UPDATED:    12/04/2019 05:07 PM   | commented out Font loader
            12/05/2019 11:22 PM   | fixed  bold, norrmal messages,
            image to show updated user image
            12/11/2019 03:07 AM | added cognito user
*/


import React, { useState, useEffect } from 'react';

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
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

import { NetworkConsumer } from 'react-native-offline';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

// ui colors
import colors from '../../../colors';

// import {
//   loadUserObject,
//   // saveUserObject,
// } from '../../storage/UserStorage';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

// import avatarPicture from '../../../assets/avatar.png';

// const isValidEmail = require('../../functions/isValidEmail');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 15,
    width: '100%',
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  userImageMaskView: {
    flex: 0.1,
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,
    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,

    // width: 27,// if user image available???
    // height: 27,// if user image available???
    // opacity: 0.2, // if no image available
    // backgroundColor: '#ffffff'
  },

  userMessageView: {
    flex: 1,
    // flexDirection: 'column',
    // height: '100%', // 36,
    // left: 12,
    // justifyContent: 'center',
    marginLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});


const HeaderLeftView = () => {
  const [boldMessage, setBoldMessage] = useState(`Welcome to ${global.appName}`);

  const [normalMessage, setNormalMessage] = useState('Get cross-device sync');

  const [image, setImage] = useState(null);

  const [isReady, setIsReady] = useState(false);

  const [storageKey, setStorageKey] = useState(null);

  // async function retrieveStoredUserImage() {
  //   // load stored user transactions
  //   try {
  //     const userObject = await loadUserObject();

  //     // set stored user image
  //     if (userObject.user.profileImage) {
  //       setImage(userObject.user.profileImage);
  //     }

  //     // //  set current userr info
  //     // Auth.currentAuthenticatedUser({
  //     //   bypassCache: false,
  //     // }).then((user) => {
  //     //   // console.log(user);
  //     //   setNormalMessage(`Your are logged in as ${user.username}`);
  //     //   setBoldMessage(`Welcome to ${global.appName} ${global.appVersion}`);
  //     // })
  //     //   .catch((err) => Alert.alert(err));
  //   } catch (e) {
  //     // statements
  //     Alert.alert('Could not load image');
  //   }
  // }

  function _cacheResourcesAsync() {
    // console.log('loading');
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);
        setStorageKey(cognito.username);

        setBoldMessage(`Welcome to ${global.appName}`);

        setNormalMessage(`Logged into ${cognito.username}`)

      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
      });
  }

  useEffect(() => {
    if (storageKey) {
      // load user storage
      retrieveStoredSettingsImage(storageKey);
    }
    return () => {
      // effect
    };
  }, [storageKey])

  useEffect(() => {
    if (image) {
      setIsReady(true);
    }
  }, [image])

  const appLoading = (
    <AppLoading
      startAsync={clearState}
      onFinish={() => {}}
      onError={console.warn}
    />
  );

  async function clearState() {
    setBoldMessage('');
    setNormalMessage('');
    setIsReady(false);
    setStorageKey(null);
    setImage(null);

    _cacheResourcesAsync();
    // console.log('Cleared HeaderLeft');
  }


  async function retrieveStoredSettingsImage(user_storage_key) {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(user_storage_key);

      // set stored user image
      if (storageObj) {
        // console.log('stored user settings image:', storageObj.image);
        if (storageObj.image) {
          // found stored image
          setImage(storageObj.image);
        }
      }
    } catch (e) {
      // statements
      Alert.alert('Could not load settings');
      // console.log(e);
    }
  }

  const imageView = (
    <TouchableOpacity
    disabled={true}
    style={styles.userImageMaskView}
  >
    <Image
      resizeMode="contain"
      style={styles.userImage}
      source={image} // {global.placeholder500x500}
    />
  </TouchableOpacity>
  )

  if (isReady) {
    return (
      <SafeAreaView style={styles.container}>

        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={clearState} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />

        { imageView }

        <View style={styles.userMessageView}>
          <Text style={
            {
              fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
              fontSize: 15,
              fontStyle: 'normal',
              letterSpacing: 0.12,
              color: colors.white,
              fontWeight: '600',
            }

          }
          >
            { boldMessage }

          </Text>

          <Text
            style={
              {
                fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
                fontSize: 15,
                fontStyle: 'normal',
                letterSpacing: 0.12,
                color: colors.white,
              }
            }>
            { normalMessage }
            </Text>

        </View>

      </SafeAreaView>
    );
  } else {
    return appLoading;
  }
};

export default HeaderLeftView;