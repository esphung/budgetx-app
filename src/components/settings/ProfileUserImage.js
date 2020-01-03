import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  StyleSheet,
  View,
  // ActivityIndicator,
  ImageBackground,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { NetworkConsumer } from 'react-native-offline';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

import { TouchableOpacity } from 'react-native-gesture-handler';

import mime from 'mime-types';

import SpinnerMask from '../SpinnerMask';

// import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

import Auth from '@aws-amplify/auth';

import Storage from '@aws-amplify/storage'


function ProfileUserImage() {
  const [image, setImage] = useState(null);

  const [user, setUser] = useState(null);

  const [isReady, setIsReady] = useState(false);

  const [storageKey, setStorageKey] = useState(null);

  async function clearState() {
    setIsReady(false);
    setStorageKey(null);
    setImage(null);
    setUser(null);

    // retrieveCognitoUser();
    _cacheResourcesAsync();
  }

  async function retrieveCognitoUser() {
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);
        setStorageKey(cognito.username);

        // setEmail(cognito.attributes.email);
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
      });
  }

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
    const imageName = `@${storageKey}/picture.jpg`;
    const fileType = mime.lookup(pickerResult.uri);
    const access = { level: 'public', contentType: fileType }; // 'image/jpeg'
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

    saveProfileImage(pickerResult);
  };

  async function saveProfileImage(newImage) {
    // setIsReady(false);
    const userObject = await loadSettingsStorage(storageKey);
    userObject.image = newImage;
    // saveUserObject(userObject);
    // console.log(userObject.image);

    saveSettingsStorage(storageKey, userObject);

    // setIsReady(true);
  }

  async function retrieveStoredUserImage() {
    // load stored user transactions
    try {
      const userObject = await loadSettingsStorage(storageKey);

      // set stored user image
      if (userObject.image) {
        setImage(userObject.image);
      }
      
      //   .catch((err) => console.log(err));
    } catch (e) {
      // statements
      // Alert.alert('Could not load image');
    }
    // loadCognitoUser();
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
        // Alert.alert(err);
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



  useEffect(() => {
    getPermissionAsync();
  }, []);

  useEffect(() => {
    // console.log('Image updated');
    if (image) {
      // console.log(image);
      setIsReady(true);
    }
  }, [image]);

  useEffect(() => {
    if (storageKey) {
      retrieveStoredSettingsImage(storageKey);
    }
  }, [storageKey])


  async function _cacheResourcesAsync() {
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);
        setStorageKey(cognito.username);
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
      });
  }
  // async function retrieveImages() {
  //   await Asset.loadAsync([
  //     avatarPicture,
  //     // video2,
  //     // ...
  //   ]);
  //  // this.setState({ ready: true });
  //  setIsReady(true);
  // }

  const appLoading = (
    <AppLoading
      startAsync={clearState}
      onFinish={() => {}}
      onError={console.warn}
    />
  );

  const imageView = (
    <TouchableOpacity
      onPress={pickImage}
      style={
       styles.userImageMaskView
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

  // const view =
  //   <NetworkConsumer>
  //     {({ isConnected }) => (
  //       isConnected ? (
  //         imageView
  //       ) : (
              
  //       )
  //     )}
  //   </NetworkConsumer>

  if (isReady) {
    return <View style={styles.container}>
        <TouchableOpacity

          onPress={pickImage}
          style={styles.userImageMaskView}
        >
          <Image

            style={styles.userImage}
            source={image} // {global.placeholder500x500}
          />
        </TouchableOpacity>
        </View>
  } else {
    return appLoading;
    // return <SpinnerMask />;
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // marginLeft: 15,
    width: '100%',
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  userImageMaskView: {
    // flex: 0.8,
    width: 60,
    height: 60,
    backgroundColor: colors.darkGreyBlue,
    borderRadius: 50,

    // borderWidth: 2,
    // borderColor: colors.white,
    // borderStyle: 'solid',
  },

  userImage: {
    width: '100%',
    height: '100%',
    // borderRadius: 17,
    borderRadius: 50,

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


export default ProfileUserImage;
