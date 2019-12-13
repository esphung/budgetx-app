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

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import mime from 'mime-types';

import { Storage } from 'aws-amplify';

// import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from 'main/colors';


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

  // const [userProfileImage, setUserProfileImage] = useState(global.placeholder500x500);

  const [profilePictureName, setProfilePictureName] = useState(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [onlineImageDoesNotExist, setOnlineImageDoesNotExist] = useState(true);

  const [loading, setLoading] = useState(false);

  const loadUserProfilePicture = async (imageName) => {
    // retrieve the item
    const storedImage = await Storage.get(imageName);
    if (storedImage) {
      setOnlineImageDoesNotExist(false);
    } else {
      setOnlineImageDoesNotExist(true);
    }
  };

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
      setLoading(true);
      await Storage.put(imageName, blobData, access);
      setImage(pickerResult);
      // console.log('Successfully uploaded', imageName, 'to bucket!');

      // seretrtIsImageLoaded(true);
    } catch (err) {
      console.log('error: ', err);
    }

    // loadUserProfilePicture(profilePictureName);
    setLoading(false);
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

      // set stored user image
      if (userObject.user.profileImage) {
        // console.log(userObject.user.profileImage);
        setImage(userObject.user.profileImage);
      } else {
        setImage(global.avatar);
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
      setImage(result);
      saveProfileImage(result);

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
    getPermissionAsync();
    loadCognitoUser();
  }, []);

  useEffect(() => {
    if (profilePictureName) {
      loadUserProfilePicture(profilePictureName);
    }
    return () => {
      // effect
    };
  }, [profilePictureName]);

  useEffect(() => {
    if (user) {
      setProfilePictureName(`images/profile/${user.username}`);
      // console.log(`Loading images/profile/${user.username}`)
    }
  }, [user]);

  useEffect(() => {
    if (onlineImageDoesNotExist) {
      retrieveStoredUserData();
    } else {
      console.log('Load back up/offline image here')
    }
    return () => {
      // effect
    };
  }, [onlineImageDoesNotExist]);

  useEffect(() => {
    // console.log('Image updated');
    if (image) {
      // console.log(image);
      saveProfileImage(image);
      setIsImageLoaded(true);
    }
    // return () => {
    //   // effect
    //   console.log('Clean up image');

    //   // console.log(image)
    // };
  }, [image]);

  const spinnerView = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark }}>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  let view = spinnerView;

  if (!loading || isImageLoaded) {
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
  }

  return view;
}

export default ProfileUserImage;
