import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

// import { NetworkConsumer } from 'react-native-offline';

// import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

import { TouchableOpacity } from 'react-native-gesture-handler';

import mime from 'mime-types';

import Storage from '@aws-amplify/storage';

import Dialog from 'react-native-dialog';

import Auth from '@aws-amplify/auth';

import Amplify from '@aws-amplify/core';
import config from '../../../aws-exports';
// Auth.configure(config);

// import amplify from '../../../aws-exports';

// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:f1677c4d-8148-4c3e-97e0-d81ffd75c15a',
// });

import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

import { isDeviceOnline } from '../../../network-functions';

const getAuthentication = async () => {
  let authenticated = false;
  await Auth.currentAuthenticatedUser()
    .then((cognito) => {
      console.log('cognito: ', cognito);
      authenticated = (cognito) ? true : false;
    }).catch((err) => {
      console.log('err: ', err);
    })
  return authenticated
};




function ProfileUserImage(props) {
  const  { isUserLoggedIn } =  props;

  const [image, setImage] = useState(global.avatar);

  const [isReady, setIsReady] = useState(true);

  // const [storageKey, setStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [shouldShowPleaseLoginBox, setShouldShowPleaseLoginBox] = useState(false);

  const [isPermissionDialogVisible, setIsPermissionDialogVisible] = useState(false);

  useEffect(() => {
    setIsReady(false);
    clearState()

    getImage()
    // return () => {
    //   // effect
    // };
  }, []);


  const dialogBox = (
    <View>
      <Dialog.Container visible={true}>
        <Dialog.Title>Please Login</Dialog.Title>
        <Dialog.Description>
          Cannot use feature without a profile
        </Dialog.Description>
        {/* <Dialog.Button label="Cancel" onPress={() => setShouldShowPleaseLoginBox(false)} /> */}
        <Dialog.Button label="Ok" onPress={() => setShouldShowPleaseLoginBox(false)} />
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
        {/* <Dialog.Button label="Cancel" onPress={() => setShouldShowPleaseLoginBox(false)} /> */}
        <Dialog.Button label="Ok" onPress={() => setIsPermissionDialogVisible(false)} />
      </Dialog.Container>
    </View>
  );



  async function clearState() {
    setImage(null)
    retrieveStoredSettingsImage()

    // setImage(global.avatar)
  }

  // this handles the image upload to S3
  const handleImagePicked = async (imageResult) => {
    // console.log('imageResult: ', imageResult);

    setImage(null)

    // setIsLoading(true);
    // const imageName = `@${global.storageKey}/picture.jpg`;
    // const fileType = mime.lookup(pickerResult.uri);
    // const access = { level: 'public', contentType: fileType }; // 'image/jpeg'
    // const imageData = await fetch(pickerResult.uri);
    // const blobData = await imageData.blob();

    // if (isUserLoggedIn && await getAuthentication() && await isDeviceOnline()) {
      // try {
      //     await Storage.put(imageName, pickerResult.uri, fileType);
      //     console.log('Successfully uploaded ', imageName, 'to bucket!');
      //   } catch (err) {
      //     console.log('error upload s3 image: ', err);
      //     // Alert.alert(err);s
      //   }
      // }
    // // console.log('pickerResult: ', pickerResult);

    // global.avatar = ({ uri: pickerResult.uri });

    // try {
    //   saveProfileImage(pickerResult);
    // } catch(e) {
    //   // statements
    //   console.log(e);
    //   setImage(global.avatar);
    // }

    // setIsLoading(false);

          

    // setIsLoading(true);


    const imageName = imageResult.uri.replace(/^.*[\\\/]/, '');
    console.log('imageName: ', imageName);
    const fileType = mime.lookup(imageResult.uri);
    console.log('fileType: ', fileType);
    const access = { level: "public", contentType: fileType, };
    console.log('access: ', access);
    fetch(imageResult.uri).then(response => {
      response.blob()
        .then(blob => {
          Storage.put(`@${global.storageKey}/${imageName}`, blob, access)
            .then(async succ => {
              // SUCCESSFUL UPLOAD TO S3
              console.log('succ', succ);

              global.currentBucketImage = `@${global.storageKey}/${imageName}`;

              let settings = await loadSettingsStorage(global.storageKey);

              settings.user.currentBucketImage = global.currentBucketImage;
              // console.log('bucketProfileImagePath: ', bucketProfileImagePath);

              // settings.image_url = 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage

              // settings.avatar = { uri: 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage}

              try {
                let stored = await Storage.get(global.currentBucketImage);

                global.avatar = { uri: stored };

                // console.log('stored: ', stored);
              } catch(e) {
                // statements
                console.log(e);
              }

              // try {
              //   setImage({ uri: 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage})
              // } catch(e) {
              //   // statements
              //   console.log(e);
              // }

              // console.log('settings.image_url: ', settings.image_url);


              setImage(global.avatar);

              settings.avatar = global.avatar;

              saveSettingsStorage(global.storageKey, settings);


              // https://s3.amazonaws.com/bucketname/foldername/imagename.jpg
            })
            .catch(err => console.log('err', err));
        });
    });

    setIsLoading(false);

    // try {
    //   await Storage.put(imageName, imageResult.uri, fileType);
    //   console.log('Successfully uploaded ', imageName, 'to bucket!');
    // } catch (err) {
    //   console.log('error upload s3 image: ', err);
    //   // Alert.alert(err);s
    // }
  


  };

  const getImage = async () => {
    retrieveStoredSettingsImage(global.storageKey);

    try {
      let storage = await loadSettingsStorage(global.storageKey)

      if (storage.avatar) {
        // stored user image exists
        setImage(avatar);
      } else {
        // stored image dne
        setImage(global.avatar);
      }

      setIsReady(true);
    } catch(e) {
      // statements
      console.log('error in getImage:', e);

      setIsReady(true);
    }

    // setIsLoading(false);
    
    // try {
    //   setIsReady(false)
    //   let imageReturn = await Storage.get(`@${global.storageKey}/picture.jpg`)

    //   // console.log('imageReturn: ', imageReturn);

    //   // global.avatar = {uri: imageReturn}

    //   setImage({uri: imageReturn})

    //   global.avatar = ({ uri: imageReturn.uri });

    // } catch(e) {
    //   // statements
    //   console.log(e);

    //   // retrieveStoredSettingsImage(global.storageKey);
    // }
    // // this.setState({ image: imageReturn })

    // setIsReady(true);
  }

  // async function saveProfileImage(newImage) {
  //   setIsReady(false);
  //   const userObject = await loadSettingsStorage(global.storageKey);
  //   userObject.image_url = ({uri:newImage.uri});
  //   // saveUserObject(userObject);
  //   // console.log(userObject.image);

  //   saveSettingsStorage(global.storageKey, userObject);

  //   setImage(global.avatar)

  //   setIsReady(true);
  // }

  // async function retrieveStoredUserImage() {
  //   // load stored user transactions
  //   try {
  //     const userObject = await loadSettingsStorage(storageKey);

  //     // set stored user image
  //     if (userObject.image) {
  //       setImage(userObject.image);
  //     }
  //     //   .catch((err) => console.log(err));
  //   } catch (e) {
  //     // statements
  //     // Alert.alert('Could not load image');
  //   }
  //   // loadCognitoUser();
  // }

  const handleChooseImage = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        // this.setState({ image: response })
        setImage(response)
      }
    })
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

  async function retrieveStoredSettingsImage() {
    setImage(null)
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);
      // console.log('storageObj: ', storageObj);
      setImage(storageObj.user.image_url);
    } catch (e) {
      // statements
      Alert.alert('Could not load settings');
      // console.log(e);
      setImage(global.avatar)
    }
  }

  // useEffect(() => {
  //   // setIsReady(false);
  //   // getPermissionAsync();



  
  //   // getImage()


    
  // }, []);

  // useEffect(() => {
  //   // console.log('Image updated');
  //   if (image) {
  //     // console.log(image);
  //     // setIsReady(true);
  //   }
  // }, [image]);

  // useEffect(() => {
  //   // if (storageKey) {
  //     retrieveStoredSettingsImage(global.storageKey);
  //   // }
  // }, []);


  // async function retrieveCognitoUserKey() {
  //   Auth.currentAuthenticatedUser()
  //     .then((cognito) => {
  //       // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //       // console.log('username:', cognitoUser.username);
  //       setStorageKey(cognito.username);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Alert.alert(err);
  //     });
  // }
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

  // const imageView = (
  //   <TouchableOpacity
  //     onPress={pickImage}
  //     style={
  //      styles.userImageMaskView
  //     }
  //   >
  //     <Image
  //       // source={global.placeholderUserImage}
  //       source={image}
  //       style={
  //         {
  //           width: '100%',
  //           height: '100%',
  //           borderRadius: 26,
  //         }
  //       }
  //     />
  //   </TouchableOpacity>
  // );

  useEffect(() => {
    if (!image) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    return () => {
      // effect
    };
  }, [image])


  const imageView = (
    

    
 
          
        <TouchableOpacity
        // disabled
        onPress={
          async () => {
            // if (global.authenticated) {
              await getPermissionAsync();
            //   setShouldShowPleaseLoginBox(true)
            // }
          }
        }
        >
        {
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        {
          permissionDialogBox
        }


         {
          isReady &&
          (
            <View style={styles.userImageMaskView}><Image
                     // source={{ uri: image.uri }}
                     // style={{ width: 300, height: 300 }}
                     style={styles.userImage}
                     source={global.avatar} // {global.placeholder500x500}
                   /></View>)
         
     }
     </View>
   }
   
    
        </TouchableOpacity>
      
        
      
      
      

      
      
  );

  return isLoading && <View style={{

                 width: '80%',
                 height: '80%',

                 position: 'absolute',

                 alignItems: 'center',
                 justifyContent: 'center',

                 // borderWidth: 1,
                 // borderColor: 'white',
                 // borderStyle: 'solid',
     
  }}><ActivityIndicator style={{
         
       
         
               }} size="large" color={colors.offWhite} /></View> || imageView

  // const view =
  //   <NetworkConsumer>
  //     {({ isConnected }) => (
  //       isConnected ? (
  //         imageView
  //       ) : (
  //       )
  //     )}
  //   </NetworkConsumer>



    //   return true && (
    //     <View style={styles.container}>

    //         {
    //   shouldShowPleaseLoginBox && dialogBox
    // }
    //       <TouchableOpacity
    //       // disabled
    //       onPress={
    //         async () => {
    //           // if (global.authenticated) {
    //             await getPermissionAsync();

    //           //   setShouldShowPleaseLoginBox(true)
    //           //   // return
    //           // }
              
    //         }
    //       }
    //       style={styles.userImageMaskView}>
    //         {<Image

    //           style={styles.userImage}
    //           source={image} // {global.placeholder500x500}
    //         />}
    //     {
    //       image && (
    //         <Image
    //           // source={{ uri: image.uri }}
    //           style={{ width: 300, height: 300 }}
    //           // style={styles.userImage}
    //           source={global.avatar} // {global.placeholder500x500}
    //         />
    //     )
    //   }
    //       </TouchableOpacity>
    //       {
    //         permissionDialogBox
    //       }
    //     </View>
    //   ) ||
    //   spinnerView
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
