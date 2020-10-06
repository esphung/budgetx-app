import React, { useState, useEffect } from 'react';

import {
  Image,
  // Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from 'react-native';

// import { MaterialCommunityIcons } from '@expo/vector-icons';

// import { NavigationEvents } from 'react-navigation';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

// import { NetworkConsumer } from 'react-native-offline';

// import { Asset } from 'expo-asset';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import mime from 'mime-types';

import Storage from '@aws-amplify/storage';

import Dialog from 'react-native-dialog';

import Auth from '@aws-amplify/auth';

import { getAuthentication, isDeviceOnline } from 'controllers/Network';

// ui colors
import colors from 'src/colors';

import {
  loadStorage,
  saveStorage,
} from 'controllers/Storage';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // marginTop: 20,
  //   // marginLeft: 15,
  //   // width: '100%',
  //   // height: '100%',

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'dashed',
  // },

  userImageMaskView: {
    // flex: 0.8,
    // width: 60,
    // height: 60,
    width: 33,
    height: 33,
    // backgroundColor: colors.darkGreyBlue,
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

// const getAuthentication = async () => {
//   let authenticated = false;
//   await Auth.currentAuthenticatedUser()
//     .then((cognito) => {
//       // console.log('cognito: ', cognito);
//       authenticated = Boolean(cognito);
//     }).catch((err) => {
//       console.log('err: ', err);
//     });
//   return authenticated;
// };

function ProfileUserImage({ style, avatarImage, }) {
  const [image, setImage] = useState(avatarImage);

  const [isReady, setIsReady] = useState(true);

  // const [storageKey, setStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [shouldShowAndroidUserBox, setShouldShowAndroidUserBox] = useState(false);

  const [shouldShowAuthenticateDialogBox, setShouldShowAuthenticateDialogBox] = useState(false);

  const [isPermissionDialogVisible, setIsPermissionDialogVisible] = useState(false);

  const authenticateDialogBox = (
    <View>
      <Dialog.Container visible={shouldShowAuthenticateDialogBox}>
        <Dialog.Title>Please sign in</Dialog.Title>
        <Dialog.Description>
          We keep all information as safe and secure as possible, even your image and likeness
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
          onPress={() => {
          // ask for image picker permissions for ANDROID user
            setShouldShowAndroidUserBox(false);
            ImagePicker.requestCameraPermissionsAsync();
          }}
        />
      </Dialog.Container>
    </View>
  );
  const permissionDialogBox = (
    <View>
      <Dialog.Container visible={isPermissionDialogVisible}>
        <Dialog.Title>Sorry!</Dialog.Title>
        <Dialog.Description>
          We need camera roll permissions to make this work!
        </Dialog.Description>
        {/* <Dialog.Button label="Cancel" onPress={() => setShouldShowAndroidUserBox(false)} /> */}
        <Dialog.Button
          label="Ok"
          onPress={() => {
            // console.log('Platform.OS: ', Platform.OS);
            setIsPermissionDialogVisible(false);
          }}
        />
      </Dialog.Container>
    </View>
  );
  // this handles the imagse upload to S3
  const handleImagePicked = async (imageResult) => {
    const settings = await loadStorage(global.storageKey);

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

        setIsReady(true);
      }, 3000);
      response.blob()
        .then((blob) => {
          // Storage.put(`@${global.storageKey}/${imageName}`, blob, access)
          Storage.put(`@${global.storageKey}/picture.jpg`, blob, access)
            .then(async (succ) => {
              // SUCCESSFUL UPLOAD TO S3
              // console.log('succ', succ);
              try {
                // setIsLoading(true);
                const stored = await Storage.get(succ.key, {level:  'public'});
                // `@${global.storageKey}/picture.jpg`




                // console.log('stored: ', stored);

                // let settings = await loadStorage(global.storageKey);

                settings.user.image_url = stored;

                saveStorage(global.storageKey, settings);

                setImage({ uri: settings.user.image_url });

                // setImage(global.avatar);

                // setIsLoading(false);

                // setIsReady(true);

                // console.log('successfully stored image', succ);
              } catch (e) {
                // statements
                setIsLoading(false);

                setIsReady(true);

                console.log('Error on succ:', e);
              }
            });
        });
    });

    settings.user.image_url = imageResult.uri;

    saveStorage(global.storageKey, settings);

    setImage({ uri: settings.user.image_url });

    setIsLoading(false);

    setIsReady(true);
  };
  const getImage = async () => {
    // if (!(await isDeviceOnline())) return
    if (!(await getAuthentication())) return;
    // try {
    /* Get local stored user image */
    // const storage = await loadStorage(global.storageKey);
    // console.log('storage: ', storage.user);
    // setImage({ uri: storage.user.image_url });
    // setImage(global.avatar);
    // setIsReady(true);
    // setIsLoading(false);
    // } catch (e) {
    //   console.log('error setting image:', e);
    // }

    /* Try to update with online image */
    if (await isDeviceOnline()) {
      try {
        // setIsLoading(true)
        const stored = await Storage.get(`@${global.storageKey}/picture.jpg`, { level: 'public' });
        // console.log('stored: ', stored);
        setImage({ uri: stored });
        const settings = await loadStorage(global.storageKey);
        settings.user.image_url = stored;

        saveStorage(global.storageKey, settings);
        // setImage(global.avatar);
        // setIsLoading(false);
        // setIsReady(true);

        // return
      } catch (e) {
        // statements
        console.log('getImage e:', e);
      }
    }
    setIsReady(true);
    setIsLoading(false);
    // setImage(global.avatar);
  };
  // const handleChooseImage = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker(options, (response) => {
  //     if (response.uri) {
  //       setImage(response);
  //     }
  //   })
  // };
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result);
    }
  }
  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        setIsPermissionDialogVisible(true);
      } else {
        pickImage();
      }
    }
  }
  async function imagePressed() {
    if (!(await getAuthentication())) {
      setShouldShowAuthenticateDialogBox(true);
      return;
    }
    if (Platform.OS !== 'android') {
      // user is on ios
      getPermissionAsync();
    } else {
      // user is on android
      try {
        // statements
        pickImage();
      } catch (e) {
        // statements
        console.log('imagePressed e:', e);
        setShouldShowAndroidUserBox(true);
      }
    }
  }


  const imageView = (
    <TouchableOpacity onPress={imagePressed}>
      <View style={[styles.userImageMaskView, style]}>
        {/*<ImageBackground style={styles.userImage} source={global.defaultAvatar}>*/}
          {
            (image && !isLoading) ? <Image style={styles.userImage} source={image} /> : <Image style={styles.userImage} source={global.defaultAvatar} />
          }
        {/*</ImageBackground>*/}
      </View>

    </TouchableOpacity>
  );

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View>
      {
        imageView
      }
      {
        dialogBox
      }
      {
        permissionDialogBox
      }
      {
        authenticateDialogBox
      }
      {
        (!isReady || isLoading) && (
          <View
            style={
              {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }
            }
          >
            <ActivityIndicator size="small" color={colors.offWhite} />
          </View>
        )
      }
    </View>
  );
}

export default ProfileUserImage;
