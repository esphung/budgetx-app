import React, { useState, useEffect } from 'react';

import {
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { TouchableOpacity } from 'react-native-gesture-handler';

import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

import {
  loadUserObject,
  saveUserObject,
} from '../../storage/UserStorage';

function ProfileUserImage() {
  const [image, setImage] = useState(null);

  async function saveProfileImage(newImage) {
    const userObject = await loadUserObject(); // load storage object
    // console.log('user:', userObject.user.username);

    userObject.user.profileImage = newImage;
    // console.log(image);
    // console.log('user image:', userObject.user.profileImage);

    saveUserObject(userObject);
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
      // setIsUserImageLoaded(true);
    }
  }

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // alert('Sorry, we need camera roll permissions to make this work!');
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
      setImage(result.uri);
      saveProfileImage(result.uri);
    }
  }

  useEffect(() => {
    getPermissionAsync();
    retrieveStoredUserData();
    // console.log('hi');
  }, []);

  useEffect(() => {
    // console.log('Image updated');

    // if (image) {
    //   saveProfileImage(image);
    // }
  }, [image]);

  let view = <SpinnerMask />;

  if (image) {
    view = (
      <TouchableOpacity
        onPress={pickImage}
        style={
          {
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: '100%',
          }
        }
      >
        <Image
          // source={global.placeholderUserImage}
          source={{ uri: image }}
          style={
            {
              width: '68%',
              height: '60%',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: 30,
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
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: '100%',
          }
        }
      >
        <Image
          // source={global.placeholderUserImage}
          source={global.placeholder500x500}
          style={
            {
              width: '68%',
              height: '60%',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: 30,
            }
          }
        />
      </TouchableOpacity>
    );
  }
  return view;
}

export default ProfileUserImage;
