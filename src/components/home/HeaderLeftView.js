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
import { Auth, Storage } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

import { NetworkConsumer } from 'react-native-offline';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

// ui colors
import colors from '../../../colors';

import {
  loadUserObject,
  // saveUserObject,
} from '../../storage/UserStorage';

import avatarPicture from '../../../assets/avatar.png';

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

  async function retrieveStoredUserImage() {
    // load stored user transactions
    try {
      const userObject = await loadUserObject();

      // set stored user image
      if (userObject.user.profileImage) {
        setImage(userObject.user.profileImage);
      }

      //  set current userr info
      Auth.currentAuthenticatedUser({
        bypassCache: false,
      }).then((user) => {
        // console.log(user);
        setNormalMessage(`Your are logged in as ${user.username}`);
        setBoldMessage(`Welcome to ${global.appName} ${global.appVersion}`);
      })
        .catch((err) => Alert.alert(err));
    } catch (e) {
      // statements
      Alert.alert('Could not load image');
    }
  }

  async function _cacheResourcesAsync() {
    const images = [require('main/assets/avatar.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    // setIsReady(true);
    // return Promise.all(cacheImages);
  }

  async function retrieveImages() {
    await Asset.loadAsync([
      avatarPicture,
      // video2,
      // ...
    ]);
   // this.setState({ ready: true });
   // setIsReady(true);
  }


  function clearState() {
    // setBoldMessage('') // (`${global.appName} ${global.appVersion}`);
    // setNormalMessage('') // (`Get device cross-sync!`);

    retrieveStoredUserImage(); // load stored user
  }

  // const handleTextChange = (value) => {
  //   setText(value);
  //   // console.log(text);
  // };

  // const submitBtnPressed = (value) => {
  //   setText(value);
  //   // if (isValidEmail(text)) {
  //   //   // create new user with text email
  //   //   // console.log(text);
  //   //   setUser(new User(text));
  //   // }
  // };

  // const uploadLocalTransactions = async () => {
  //   const userObject = await loadUserObject(); // load storage object
  //   if (userObject) {
  //     // console.log(userObject.user._id);
  //     // Upload file to S3
  //     Storage.put(`@${userObject.user._id}/data.json`, JSON.stringify(userObject))
  //         .then (result => {
  //         // console.log(result);
  //         // console.log('User transactions uploaded to the cloud')
  //     }) // {key: "test.txt"}
  //         .catch(err => Alert.alert(err));
  //   }
  // }

  // async function loadCognitoUser() {
  //   // await uploadLocalTransactions();

  //   // Storage.get('test.txt', { level: 'protected' })
  //   //   .then(result => {
  //   //     // console.log(result)
  //   //   })
  //   //   .catch(err => {
  //   //     Alert.alert(err);
  //   //     // console.log(err);
  //   //   });
  //   //    // Storage.get('test.text')
  //   //    //    .then(result => console.log(JSON(result)))
  //   //    //    .catch(err => console.log(err));

  //   Auth.currentAuthenticatedUser()
  //     .then((cognitoUser) => {
  //       // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //       // console.log('username:', cognitoUser.username);


  //       setUser(cognitoUser);

  //       // console.log(cognitoUser.username);
  //       // console.log(cognitoUser.transactions)
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Alert.alert(err);
  //     });
  //   }

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  // useEffect(() => {
  //   // retrieveFonts();
  //   retrieveStoredUserImage();

  // }, []);

  // useEffect(() => {
  //   if (username) {
  //     setNormalMessage(`Logged in as ${user.username}`);
  //   }

  //   // loadCognitoUser();
  //   // retrieveStoredUserImage();
  //   // return () => {
  //   //   // effect
  //   // };
  // }, [username]);

  useEffect(() => {
    retrieveStoredUserImage();
    // console.log('Updating Online Info');
  }, []);

  useEffect(() => {
    if (image) {
      setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [image])

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user);

  //     if (user.username) {
  //       setUsername(user.username);
  //     } else  {
  //       setNormalMessage(`User ${user.id}`);
  //     }

  //     // setEmail(user.attributes.email);

  //           // set stored user image
  //     setImage(user.profileImage);

  //     setBoldMessage(`Welcome to ${global.appName} ${global.appVersion}`);

  //     // setNormalMessage(`Logged in as user ${user.id}`);
      
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [user])

  // useEffect(() => {
  //   // cognito user could not be retrieved
  //   // retrieveStoredUserImage();

  //   setBoldMessage('Offline Mode');

  //   setNormalMessage('Using local storage');

  //   setIsReady(true);
  // }, [user]);

  // // mount user
  // useEffect(() => {
  //   if (user) {
  //     const fullName = user.getFullName();
  //     setBoldMessage(`Welcome ${fullName}`);
  //     setNormalMessage(user.email);
  //     // console.log(user)
  //   }

  //   // return () => {
  //   //   // console.log('user clean up');
  //   //   // setBoldMessage('Enter a name')//user.getFullName());
  //   //   // setNormalMessage(user.email);

  //   //   // setIsInputEnabled(false);
  //   // };
  // }, [user]);

  const appLoading = (
    <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={setIsReady}
      onError={console.warn}
    />
  );

  imageView =
    <NetworkConsumer>
      {({ isConnected }) => (
        isConnected ? (
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
        ) : (
          <TouchableOpacity
          disabled={true}
          style={styles.userImageMaskView}
        >
          <Image
            resizeMode="contain"
            style={styles.userImage}
            source={global.noWifiImage}
          />
        </TouchableOpacity>
        )
      )}
    </NetworkConsumer>

  if (isReady) {
    return (
      <SafeAreaView style={styles.container}>

        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={() => clearState()} // {(payload) => clearState()}
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