import React, { useState, useEffect } from 'react';

import {
  Image,
  View,
  ActivityIndicator,
  // ImageBackground,
  Platform,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

// import Constants from 'expo-constants';

// import * as Permissions from 'expo-permissions';

// import { NetworkConsumer } from 'react-native-offline';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import mime from 'mime-types';

import Storage from '@aws-amplify/storage';

import Dialog from 'react-native-dialog';

import { getAuthentication, isDeviceOnline } from '../../../controllers/Network';

import { pickImage, getPermissionAsync } from '../../../controllers/ImageController';

// ui colors
import colors from 'src/colors';

import {
  loadStorage,
  saveStorage,
} from 'controllers/Storage';

import styles from 'styles/Navbar';

function AvatarDisplay({ style, avatarImage }) {
  const [image, setImage] = useState(avatarImage);

  // const [storageKey, setStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [shouldShowAndroidUserBox, setShouldShowAndroidUserBox] = useState(false);

  const [shouldShowAuthenticateDialogBox, setShouldShowAuthenticateDialogBox] = useState(false);

  const [isPermissionDeniedBoxVisible, setPermissionDeniedBoxVisible] = useState(false);

  const permissionDeniedBtnPressed = () => setPermissionDeniedBoxVisible(false);

  const onDialogBoxOkBtnPressed = () => {
    // ask for image picker permissions for ANDROID user
    setShouldShowAndroidUserBox(false);
    ImagePicker.requestCameraPermissionsAsync();
  };

  const authenticationDialogBox = (
    <View>
      <Dialog.Container visible={shouldShowAuthenticateDialogBox}>
        <Dialog.Title>Please sign in</Dialog.Title>
        <Dialog.Description>
          We keep all information as safe and secure as possible.
        </Dialog.Description>
        <Dialog.Button label="Ok" onPress={() => setShouldShowAuthenticateDialogBox(!shouldShowAuthenticateDialogBox)} />
      </Dialog.Container>
    </View>
  );
  const dialogBox = (
    <View>
      <Dialog.Container visible={shouldShowAndroidUserBox}>
        <Dialog.Title>Android User</Dialog.Title>
        <Dialog.Description>
          Hello
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShouldShowAndroidUserBox(false)} />
        <Dialog.Button
          label="Ok"
          onPress={onDialogBoxOkBtnPressed}
        />
      </Dialog.Container>
    </View>
  );
  const sorryPermissionsDialogBox = (
    <View>
      <Dialog.Container visible={isPermissionDeniedBoxVisible}>
        <Dialog.Title>Sorry!</Dialog.Title>
        <Dialog.Description>
          We need camera roll permissions to make this work!
        </Dialog.Description>
        {/* <Dialog.Button label="Cancel" onPress={() => setShouldShowAndroidUserBox(false)} /> */}
        <Dialog.Button
          label="Ok"
          onPress={permissionDeniedBtnPressed}
        />
      </Dialog.Container>
    </View>
  );
  // this handles the imagse upload to S3
  const handleImagePicked = async (imageResult) => {
    // const settings = await loadStorage(global.storageKey);

    await loadStorage(global.storageKey).then((storage) => {
      storage.user.image_url = { uri: imageResult.uri };

      saveStorage(global.storageKey, storage);

      global.avatar = { uri: imageResult.uri };

      setImage(avatar);
      // const imageName = imageResult.uri.replace(/^.*[\\\/]/, '');
      // console.log('imageName: ', imageName);
      // const fileType = mime.lookup(imageResult.uri);
      // console.log('fileType: ', fileType);
      const access = { level: 'public', contentType: 'image/jpeg' }; // fileType };
      // console.log('access: ', access);
      fetch(imageResult.uri).then((response) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        response.blob()
          .then((blob) => {
            // Storage.put(`@${global.storageKey}/${imageName}`, blob, access)
            Storage.put(`@${global.storageKey}/picture.jpg`, blob, access)
              .then(async (succ) => {
                setIsLoading(true);

                await Storage.get(succ.key, { level: 'public' }).then((stored) => {
                  storage.user.image_url = { uri: stored };

                  saveStorage(global.storageKey, storage);

                  setIsLoading(false);
                }).catch(() => {
                  setIsLoading(false);
                });
              });
          });
      });
    });
  };
  const getImage = async () => {
    // if (!(await isDeviceOnline())) return
    if (!(await getAuthentication())) return;

    /* Try to update with online image */
    await isDeviceOnline()
      .then(async () => {
        setIsLoading(true);
        const stored = await Storage.get(`@${global.storageKey}/picture.jpg`, { level: 'public' });
        // console.log('stored: ', stored);

        global.avatar = ({ uri: stored });
        const storage = await loadStorage(global.storageKey);
        storage.user.image_url = stored;

        saveStorage(global.storageKey, storage);
        // setImage(global.avatar);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    setImage(global.avatar);
  };
  const imagePressed = async () => {
    if (!(await getAuthentication())) {
      setShouldShowAuthenticateDialogBox(true);
    } else if (Platform.OS !== 'android') {
      // user is on ios
      const status = await getPermissionAsync();
      // console.log('status: ', status);
      if (status === 'granted') {
        await pickImage()
          .then((result) => {
            if (!result.cancelled) handleImagePicked(result);
          })
          .catch((err) => err);
      } else {
        // user did not give camera roll permission yet
        setPermissionDeniedBoxVisible(true);
      }
    } else {
      // user is on android
      await pickImage().then((result) => {
        if (result) handleImagePicked(result);
      });
    }
  };
  const imageView = (
    <TouchableOpacity style={styles.imageViewContainer} onPress={imagePressed}>
      <View style={[styles.userImageMaskView, style]}>
        <Image style={styles.userImage} source={image} />
      </View>

    </TouchableOpacity>
  );
  useEffect(() => {
    getImage();
  }, []);
  const view = (
    <View>
      { imageView }
      { dialogBox }
      { sorryPermissionsDialogBox }
      { authenticationDialogBox }
      {
        (isLoading) && (
          <View
            style={[
              styles.userImageMaskView,
              {
                position: 'absolute',
                marginLeft: 3,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              },
            ]}
          >
            <ActivityIndicator size="small" color={colors.offWhite} />
          </View>
        )
      }
    </View>
  );
  return view;
}

export default AvatarDisplay;
