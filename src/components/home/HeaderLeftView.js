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
  TextInput,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';

// AWS Amplify
import { Auth, Storage } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from 'main/colors';

import {
  loadUserObject,
  // saveUserObject,
} from '../../storage/UserStorage';

const isValidEmail = require('../../functions/isValidEmail');

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
  // const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [text, setText] = useState('');

  const [boldMessage, setBoldMessage] = useState('');

  const [normalMessage, setNormalMessage] = useState('');

  // const [isInputEnabled, setIsInputEnabled] = useState(true);

  const [user, setUser] = useState(null);

  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState(null); // useState(global.placeholder500x500);

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [isReady, setIsReady] = useState(false);

  async function retrieveStoredUserImage() {
    // load stored user transactions
    try {
      const userObject = await loadUserObject();

      // setUser(userObject.user)


      // REPLACE THIS IN SETTINGS USER PROFILE IMAGE COMP !!!!!

      // set stored user image
      if (userObject.user.profileImage) {
        setUserProfileImage(userObject.user.profileImage);
      } else {
        setUserProfileImage(global.avatar);
      }

      // setBoldMessage(`Hello ${userObject.user.username}`);

      // setNormalMessage(`${userObject.user.email}`);

      setIsStorageLoaded(true);
    } catch (e) {
      // statements
      Alert.alert('Could not load storage');
    }
  }

  function clearState() {
    // loadCognitoUser();
    // retrieveStoredUserImage(); // load stored user
  }

  const handleTextChange = (value) => {
    setText(value);
    // console.log(text);
  };

  const submitBtnPressed = (value) => {
    setText(value);
    // if (isValidEmail(text)) {
    //   // create new user with text email
    //   // console.log(text);
    //   setUser(new User(text));
    // }
  };

  const uploadLocalTransactions = async () => {
    const userObject = await loadUserObject(); // load storage object
    if (userObject) {
      // console.log(userObject.user._id);
    
      // Upload file to S3
      Storage.put(`@${userObject.user._id}/data.json`, JSON.stringify(userObject))
          .then (result => {
          // console.log(result);
          // console.log('User transactions uploaded to the cloud')
      }) // {key: "test.txt"}
          .catch(err => Alert.alert(err));
    }
  }

  async function loadCognitoUser() {
    await uploadLocalTransactions();

    Storage.get('test.txt', { level: 'protected' })
      .then(result => {
        // console.log(result)
      })
      .catch(err => {
        Alert.alert(err);
        // console.log(err);
      });
       // Storage.get('test.text')
       //    .then(result => console.log(JSON(result)))
       //    .catch(err => console.log(err));

      Auth.currentAuthenticatedUser()
        .then((cognitoUser) => {
          // setUserToken(user.signInUserSession.accessToken.jwtToken);
          // console.log('username:', cognitoUser.username);


          setUser(cognitoUser);

          // console.log(cognitoUser.username);
          // console.log(cognitoUser.transactions)
        })
        .catch((err) => {
          // console.log(err);
          Alert.alert(err);
        });
    }

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  // useEffect(() => {
  //   // retrieveFonts();
  //   retrieveStoredUserImage();

  // }, []);

  useEffect(() => {
    loadCognitoUser();
    // retrieveStoredUserImage();
    // return () => {
    //   // effect
    // };
  }, []);

  useEffect(() => {
    // console.log('Updating Online Info');
    if (user) {
      // console.log(user);
      // setUsername(user.username);

      // setEmail(user.attributes.email);

      setBoldMessage(`Welcome to ${global.appName} ${global.appVersion}`);

      setNormalMessage(`Logged in as ${user.username}`);
    }
  });

  useEffect(() => {
    // cognito user could not be retrieved
    retrieveStoredUserImage();

    setBoldMessage('Offline Mode');

    setNormalMessage('Using local storage');

    setIsReady(true);
  }, [user]);

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


  const spinnerView = (
    <View style={{ marginLeft: 15, marginTop: 20, backgroundColor: colors.darkTwo }}>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  let view = spinnerView;

  if (isReady || isStorageLoaded) {
    view = (
      <SafeAreaView style={styles.container}>

        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={() => clearState()} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />

        <TouchableOpacity
          disabled={true}
          style={styles.userImageMaskView}
        >
          <Image
            resizeMode="contain"
            style={styles.userImage}
            source={userProfileImage} // {global.placeholder500x500}
          />
        </TouchableOpacity>

        <View style={styles.userMessageView}>
          <Text style={
            {
              fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
              fontSize: 15,
              fontStyle: 'normal',
              letterSpacing: 0.12,
              color: '#ffffff',
              fontWeight: '600',
            }

          }
          >
            { boldMessage }

          </Text>

          <TextInput
            style={
              {
                fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
                fontSize: 15,
                fontStyle: 'normal',
                letterSpacing: 0.1,
                color: '#ffffff',
              }
            }

            placeholder={normalMessage}

            placeholderTextColor="#ffffff"

            autoCompleteType="email" // android

            keyboardAppearance="dark" // ios

            textContentType="emailAddress" // ios

            keyboardType="email-address"

            returnKeyType="next"

            autoCorrect={false}

            autoCapitalize="none"

            maxLength={22}

            onSubmitEditing={() => submitBtnPressed(text)}

            onChangeText={handleTextChange}

            editable={false} // {isInputEnabled}

            value={text}

            onEndEditing={() => {
              if (isValidEmail(text) === true) {
                // send email ??
                // create user to send aws cred
              } else {
                // clear text field
                setText('');
                // console.log('Ended:', text);
              }
            }}
          />

        </View>

      </SafeAreaView>
    );
  }
  return view;
};

export default HeaderLeftView;
