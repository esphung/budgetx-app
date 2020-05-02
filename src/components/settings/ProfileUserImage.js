import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
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

import DisplayImageExample from '../../../DisplayImageExample';

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
      // console.log('cognito: ', cognito);
      authenticated = (cognito) ? true : false;
    }).catch((err) => {
      console.log('err: ', err);
    })
  return authenticated
};




function ProfileUserImage(props) {
  const  { isUserLoggedIn } =  props;

  const [image, setImage] = useState(global.avatar);

  const [isReady, setIsReady] = useState(false);

  // const [storageKey, setStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // const [shouldShowPleaseLoginBox, setShouldShowPleaseLoginBox] = useState(false);

  const [isPermissionDialogVisible, setIsPermissionDialogVisible] = useState(false);

  // const [uri, setUri] = useState(null);

  // const [shouldShowDisplayExample, setShouldShowDisplayExample] = useState(false)

  // const [bgImage, setBgImage] = useState({uri: global.image_url})

  useEffect(() => {
    // setShouldShowDisplayExample(true)
    // setIsReady(false);
    // setIsLoading(true);
    // clearState();

    getImage();


    return () => {
      // effect
      // setIsReady(false);
      // setIsLoading(true);

    };
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
    // setImage(global.defaultAvatar);
    // retrieveStoredSettingsImage()

    // setImage(global.avatar)
  }

  // this handles the image upload to S3
  const handleImagePicked = async (imageResult) => {
    // console.log('imageResult: ', imageResult);

    // setImage(null);

    // setIsLoading(true);
    // const imageName = `@${global.storageKey}/picture.jpg.jpg`;
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
    const access = { level: "protected", contentType: fileType, };
    console.log('access: ', access);
    fetch(imageResult.uri).then(response => {
      setIsLoading(true)
      response.blob()
        .then(blob => {
          // Storage.put(`@${global.storageKey}/${imageName}`, blob, access)
          Storage.put(`picture.jpg`, blob, access)
            .then(async succ => {
              // SUCCESSFUL UPLOAD TO S3
              console.log('succ', succ);

              // global.currentBucketImage = `@${global.storageKey}/${imageName}`;
              global.currentBucketImage = `picture.jpg`;

              let settings = await loadSettingsStorage(global.storageKey);

              settings.user.currentBucketImage = global.currentBucketImage;
              // console.log('bucketProfileImagePath: ', bucketProfileImagePath);

              // settings.image_url = 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage

              // settings.avatar = { uri: 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage}
              // setIsLoading(false);
              try {
                setIsLoading(true);
                let stored = await Storage.get('picture.jpg', {level:  'protected'});
                // console.log('stored: ', stored);

                global.avatar = {uri: stored}


                if (stored) {
                  // console.log('stored: ', stored);
                  settings.user.image_url = stored
                  // settings.avatar = { uri: stored };

                  saveSettingsStorage(global.storageKey, settings);

                  // global.avatar = (settings.avatar) ? settings.avatar : global.avatar

                  // await setImage(global.avatar);

                  setIsLoading(false);

                  setImage({ uri: settings.user.image_url })


                }

                // global.avatar = settings.avatar

                // setImage(global.avatar)

                // setShouldShowDisplayExample(false)
                setBgImage(null);





                

              


                // console.log('stored: ', stored);
              } catch(e) {
                // statements
                console.log('Error on succ:', e, succ);
              }

              // try {
              //   setImage({ uri: 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage})
              // } catch(e) {
              //   // statements
              //   console.log(e);
              // }

              // console.log('settings.image_url: ', settings.image_url);



              // setImage(global.avatar);

              // settings.avatar = global.avatar;

              // saveSettingsStorage(global.storageKey, settings);

              // setIsLoading(false);


              // https://s3.amazonaws.com/bucketname/foldername/imagename.jpg
            })
            .catch(err => {
              // throw new Error(err);
              console.log('successful stored image url err: ', err);
            }
              // console.log('Error err:', err)
              );
            

            // setIsLoading(false);s
        });

        // setImage(global.avatar);
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
    // retrieveStoredSettingsImage(global.storageKey);
    // console.log('isUserLoggedIn: ', isUserLoggedIn);

    // await getAuthentication()

    if (!global.authenticated) {
      setImage(global.defaultAvatar);
      setIsReady(true);
      setIsLoading(false);
      return
    }

    try {
      setIsLoading(true)
      let stored = await Storage.get('picture.jpg', {level:  'protected'});
      // console.log('stored: ', stored);
      global.avatar = ({uri: stored})
      // return
    } catch(e) {
      // statements
      console.log(e);
      global.avatar = (global.defaultAvatar)
    }

    setImage(global.avatar);

    setIsLoading(false);
    setIsReady(true);

    // try {
    //   let storage = await loadSettingsStorage(global.storageKey)

    //   if (storage.image_url) {
    //     // stored user image exists
    //     global.avatar = { uri: storage.image_url }
    //     // setIsReady(true);
    //     // setIsLoading(false);
    //   } else {
    //     // stored image dne
        
    //   }

    //   setIsReady(true);
    // } catch(e) {
    //   // statements
    //   console.log('error in getImage:', e);

    //   setIsReady(true);

    // }

    // setIsLoading(false);
    
    // try {
    //   setIsReady(false)
    //   let imageReturn = await Storage.get(`@${global.storageKey}/picture.jpg.jpg`)

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

  // async function retrieveStoredSettingsImage() {
  //   // setImage(null)
  //   // // load stored user transactions
  //   // try {
  //   //   const storageObj = await loadSettingsStorage(global.storageKey);
  //   //   // console.log('storageObj: ', storageObj);
  //   //   if (storageObj.avatar) global.avatar = storageObj.avatar


  //   //   setImage(global.avatar)
  //   // } catch (e) {
  //   //   // statements
  //   //   Alert.alert('Could not load settings');
  //   //   // console.log(e);
  //   //   setImage(global.avatar)
  //   // }
  // }

//   const viewA = (
//      <View
//       // disabled
//     style={[styles.userImageMaskView, props.style]}
//     // style={[styles.userImageMaskView, props.style]}
//     // {...rest}
  
//       >
//       <DisplayImageExample style={styles.userImage} uri={bgImage} />

// {/*            <Image
//       style={styles.userImage}
//       // style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
//       source={bgImage}/>*/}

//   </View>
//   )

    const imageView = (
      <TouchableOpacity
      disabled={!global.authenticated}
    // style={styles.userImageMaskView}
    style={[styles.userImageMaskView, props.style]}
    // {...rest}
    onPress={
          async () => {
            // if (global.authenticated) {
              await getPermissionAsync();
            //   setShouldShowPleaseLoginBox(true)
            // }
          }
        }
      >

    <View
    style={[styles.userImageMaskView, props.style]}
  >
  
    <Image
      // resizeMode="contasin"
      style={styles.userImage}
      source={image} // {global.placeholder500x500}
    />
    
    {
      permissionDialogBox
    }


  </View>

  </TouchableOpacity>
  );


  // const imageVie = (
    

    
 
          
  //       <TouchableOpacity
  //       // disabled
  //       onPress={
  //         async () => {
  //           // if (global.authenticated) {
  //             await getPermissionAsync();
  //           //   setShouldShowPleaseLoginBox(true)
  //           // }
  //         }
  //       }
  //       >
  //       {
  //         <View style={{
  //           flex: 1,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}>
  //       {
  //         permissionDialogBox
  //       }


  //        {
  //         isReady &&
  //         (
  //           <View style={styles.userImageMaskView}><Image
  //                    // source={{ uri: image.uri }}
  //                    // style={{ width: 300, height: 300 }}
  //                    style={styles.userImage}
  //                    source={global.avatar} // {global.placeholder500x500}
  //                  /></View>) || <View />
         
  //    }
  //    </View>
  //  }
   
    
  //       </TouchableOpacity>
      
        
      
      
      

      
      
  // );
// return <TouchableOpacity
//       // disabled
//     // style={styles.userImageMaskView}
//     // style={[styles.userImageMaskView, props.style]}
//     // {...rest}
//     style={{
//       justifyContent: 'center',
//       alignItems: 'center'
//     }}
//     onPress={
//           async () => {
//             // if (global.authenticated) {
//               await getPermissionAsync();
//             //   setShouldShowPleaseLoginBox(true)
//             // }
//           }
//         }
//       ><DisplayImageExample uri={'https://reactnative.dev/img/tiny_logo.png'
// } /></TouchableOpacity>
  
  return <View>
  {
    imageView
    
    
  }{
         (!isReady || isLoading) &&
    <View style={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <ActivityIndicator size='large' />
    </View>
}</View>

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


export default ProfileUserImage;