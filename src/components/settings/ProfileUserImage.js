import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  // View,
  // ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { NetworkConsumer } from 'react-native-offline';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

import { TouchableOpacity } from 'react-native-gesture-handler';

// AWS Amplify
import { Auth, Storage } from 'aws-amplify';

import mime from 'mime-types';

// import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

// import avatarPicture from 'main/assets/avatar.png';

// import Storage from '@aws-amplify/storage'
//
// to store an item
// await Storage.put('test.txt', 'Hello World!')
//
// retrieve an item
// const image = await Storage.get('welcome.png')

import {
  loadUserObject,
  saveUserObject,
} from '../../storage/UserStorage';

function ProfileUserImage() {
  const [image, setImage] = useState(null);

  const [user, setUser] = useState(null);

  const [isReady, setIsReady] = useState(false);

  // const loadUserProfilePicture = async () => {
  //   // retrieve the item
  //   const storedImage = await Storage.get(`${storagePath}images/profile.jpg`);
  //   // console.log('Loaded image:', storedImage)
  //   if (storedImage) {
  //     setOnlineImageDoesNotExist(false);
  //   } else {
  //     setOnlineImageDoesNotExist(true);
  //   }
  // };

  // this handles the image upload to S3
  const handleImagePicked = async (pickerResult) => {
    const imageName = `@${user.username}/picture.jpg`;
    const fileType = mime.lookup(pickerResult.uri);
    const access = { level: 'private', contentType: fileType }; // 'image/jpeg'
    const imageData = await fetch(pickerResult.uri);
    const blobData = await imageData.blob();

    try {
      Storage.put(imageName, blobData, access);
      console.log('Successfully uploaded ', imageName, 'to bucket!');
    } catch (err) {
      // console.log('error: ', err);
      Alert.alert(err);
    }

    setImage(pickerResult);
  };

  async function saveProfileImage(newImage) {
    const userObject = await loadUserObject(); // load storage objects
    userObject.user.profileImage = newImage;
    saveUserObject(userObject);
  }

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
        bypassCache: false
      }).then((cognito) => {
        // console.log(cognito);
        setUser(cognito);
      })
      
      //   .catch((err) => console.log(err));
    } catch (e) {
      // statements
      // Alert.alert('Could not load image');
    }
  }
  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      handleImagePicked(result);
    }
  }

  async function loadCognitoUser() {
    await Auth.currentAuthenticatedUser()
      .then((cognitoUser) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);

        setUser(cognitoUser);
      })
      .catch((err) => {
        Alert.alert(err);
        // console.log(err);
      });
  }

  // const uploadLocalTransactions = async () => {
  //   const userObject = await loadUserObject(); // load storage object
  //   // if (userObject) {
  //   //   console.log(userObject.user.transactions)
  //   // }
  //   // Upload file to S3
  //   Storage.put(storagePath + 'test.txt', 'Hello')
  //       .then (result => {
  //       // console.log(result);
  //       }) // {key: "test.txt"}
  //       .catch(err => {
  //         // console.log(err);
  //         Alert.alert(err);
  //       });

  // }

  useEffect(() => {
    getPermissionAsync();

    loadCognitoUser();

    retrieveStoredUserImage();
  }, []);

  // useEffect(() => {
  //   if (storagePath) {
  //     loadUserProfilePicture(storagePath);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [storagePath]);

  // useEffect(() => {
  //   if (user) {
  //     setStoragePath(`${user.username}/`);
  //     // console.log(`Loading images/profile/${user.username}`)
  //   }
  // }, [user]);

  useEffect(() => {
    // console.log('Image updated');
    if (image) {
      // console.log(image);
      saveProfileImage(image);
      // setIsImageLoaded(true);
    }
    // return () => {
    //   // effect
    //   console.log('Clean up image');

    //   // console.log(image)
    // };
  }, [image]);


  async function _cacheResourcesAsync() {
    const images = [
      require('main/assets/no-wifi-image.png'),
      require('main/assets/avatar.png')
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    setIsReady(true);
    // return Promise.all(cacheImages);
  }

  async function retrieveImages() {
    await Asset.loadAsync([
      avatarPicture,
      // video2,
      // ...
    ]);
   // this.setState({ ready: true });
   setIsReady(true);
  }

  const appLoading = (
    <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );

  const imageView = (
    <TouchableOpacity
      onPress={pickImage}
      style={
        {
          width: 58,
          height: 58,
          backgroundColor: colors.dark,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    >
      <Image
        // source={global.placeholderUserImage}
        source={image}
        style={
          {
            width: '100%',
            height: '100%',
            borderRadius: 26,
          }
        }
      />
    </TouchableOpacity>
  );

  const view =
    <NetworkConsumer>
      {({ isConnected }) => (
        isConnected ? (
          imageView
        ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={
                  {
                    width: 58,
                    height: 58,
                    // backgroundColor: colors.dark,
                    backgroundColor: colors.darkGreyBlue,
                    borderRadius: 50,

                    // borderWidth: 1,
                    // borderColor: 'white',
                    // borderStyle: 'solid',
                  }
                }
              >
                <Image
                  // source={global.placeholderUserImage}
                  source={noWifiImage}
                  style={
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 26,
                    }
                  }
                />
              </TouchableOpacity>
        )
      )}
    </NetworkConsumer>

  if (isReady) {
    return view;
  } else {
    return appLoading;
  }
}

export default ProfileUserImage;
