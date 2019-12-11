import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from 'main/colors';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import mime from 'mime-types';

import { Storage } from 'aws-amplify';

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

  const [userProfileImage, setUserProfileImage] = useState(global.placeholder500x500);

  const profilePictureName = 'profilePicture.jpg';

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // this handles the image upload to S3
  const handleImagePicked = async (pickerResult) => {
    // const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
    const imageName = profilePictureName;

    const fileType = mime.lookup(pickerResult.uri);
    const access = { level: 'public', contentType: fileType }; // 'image/jpeg'
    const imageData = await fetch(pickerResult.uri);
    const blobData = await imageData.blob();

    // setUploadedImageName(imageName);
    // console.log(imageName);

    try {
      await Storage.put(imageName, blobData, access);
      // ssetImage(pickerResult.uri);
      // console.log('Successfully uploaded', imageName, 'to bucket!');

      // seretrtIsImageLoaded(true);

    } catch (err) {
      console.log('error: ', err);
    }

    loadUserProfilePicture(profilePictureName)


  };

  const loadUserProfilePicture = async (imageName) => {
    // retrieve the item
      // console.log(imageName);
      const storedImage = await Storage.get(imageName);

      if (storedImage) {
        setImage(storedImage);
      } else {
        retrieveStoredUserData();
      }
      
      setIsImageLoaded(true);
  };

  async function saveProfileImage(newImage) {
    const userObject = await loadUserObject(); // load storage object
    // console.log('user:', userObject.user.username);

    userObject.user.profileImage = newImage;
    // console.log(image);
    // console.log('user image:', userObject.user.profileImage);

    saveUserObject(userObject);

    // setIsImageLoaded(true);
  }

  async function retrieveStoredUserData() {
    const userObject = await loadUserObject(); // load storage object
    // console.log(userObject.user);

    // // Rest user image testing
    // userObject.user.profileImage = null
    // saveUserObject(userObject)

    // console.log(userObject.user.profileImage);

    if (userObject.user.profileImage) {
      setImage(userObject.user.profileImage);
      // setIsImageLoaded(true);
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
      // this.setState({ image: result.uri });
      // setImage(result.uri);
      // // saveProfileImage(result.uri);

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
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // setImage(userProfileImage);

    if (!image) {
      getPermissionAsync();

      retrieveStoredUserData();

      loadCognitoUser();
    }

  }, []);

  useEffect(() => {
    if (user) {
      loadUserProfilePicture(profilePictureName);
    }
  }, [user]);

  useEffect(() => {
    if (isImageLoaded) {
      saveProfileImage(image);
    } else {
      console.log(isImageLoaded)
    }
    // return () => {
    //   // effect
    // };
  }, [isImageLoaded])

  useEffect(() => {
    // console.log('Image updated');
    // if (image) {
    //   // console.log(image);
    //   setIsImageLoaded(true);
      
    // } else {
    //   setIsImageLoaded(false);
    // }
    // return () => {
    //   // effect
    //   console.log('Clean up image')
    // };
  }, [image]);

  const spinnerView = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark }}>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  let view = spinnerView;

  if (isImageLoaded) {
    view = (
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
          source={{ uri: image }}
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
  } else {
    view = (
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
          source={global.placeholder500x500}
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
  }


  return view;
}

export default ProfileUserImage;
