import React, { useState, useEffect } from 'react';

import {
  Image,
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationEvents } from 'react-navigation';

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

  const [isReady, setIsReady] = useState(true);

  // const [storageKey, setStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [shouldShowAndroidUserBox, setShouldShowAndroidUserBox] = useState(false);

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


    // return () => {
    //   // effect
    //   setIsReady(true);
    //   setIsLoading(false);

    // };
  }, []);


  const dialogBox = (
    <View>
      <Dialog.Container visible={shouldShowAndroidUserBox}>
        <Dialog.Title>Android User</Dialog.Title>
        <Dialog.Description>
          Hello
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShouldShowAndroidUserBox(false)} />
        <Dialog.Button label="Ok" onPress={() => {
          // ask for image picker permissions for ANDROID user
          // setIsPermissionDialogVisible(true)
          setShouldShowAndroidUserBox(false)

          ImagePicker.requestCameraPermissionsAsync()

        }} />
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
        <Dialog.Button label="Ok" onPress={() => {
          // console.log('Platform.OS: ', Platform.OS);
          setIsPermissionDialogVisible(false)
        }} />
      </Dialog.Container>
    </View>
  );



  // async function clearState() {
  //   // setImage(global.defaultAvatar);
  //   // retrieveStoredSettingsImage()

  //   // setImage(global.avatar)
  // }

  // this handles the imagse upload to S3
  const handleImagePicked = async (imageResult) => {
    let settings = await loadSettingsStorage(global.storageKey);

    const imageName = imageResult.uri.replace(/^.*[\\\/]/, '');
    // console.log('imageName: ', imageName);
    const fileType = mime.lookup(imageResult.uri);
    // console.log('fileType: ', fileType);
    const access = { level: "public", contentType: fileType, };
    // console.log('access: ', access);
    fetch(imageResult.uri).then(response => {
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false);

        setIsReady(true)
      }, 3000)
      response.blob()
        .then(blob => {
          // Storage.put(`@${global.storageKey}/${imageName}`, blob, access)
          Storage.put(`@${global.storageKey}/picture.jpg`, blob, access)
            .then(async succ => {
              // SUCCESSFUL UPLOAD TO S3
              console.log('succ', succ);

              // global.currentBucketImage = `@${global.storageKey}/${imageName}`;
              // global.currentBucketImage = `picture.jpg`;

              // let settings = await loadSettingsStorage(global.storageKey);

              // settings.user.currentBucketImage = global.currentBucketImage;
              // console.log('bucketProfileImagePath: ', bucketProfileImagePath);

              // settings.image_url = 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage

              // settings.avatar = { uri: 'https://s3.amazonaws.com/' + global.bucketName + global.currentBucketImage}
              // setIsLoading(false);
              try {
                // setIsLoading(true);
                let stored = await Storage.get(`@${global.storageKey}/picture.jpg`, {level:  'public'});
                // console.log('stored: ', stored);

                 let settings = await loadSettingsStorage(global.storageKey);

                  settings.user.image_url = stored

                  saveSettingsStorage(global.storageKey, settings)

                    global.avatar = { uri: settings.user.image_url }

                  setImage(global.avatar);

                  setIsLoading(false);

                  setIsReady(true)

                


                // if (stored) {
                //   // console.log('stored: ', stored);
                  

                  



                  

                  


                // }

                // global.avatar = settings.avatar

                // setImage(global.avatar)

                // setShouldShowDisplayExample(false)
                // setBgImage(null);





                

              


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

    settings.user.image_url = imageResult.uri
                  // settings.avatar = { uri: stored };

    saveSettingsStorage(global.storageKey, settings);

    global.avatar = { uri: settings.user.image_url }

    setImage(global.avatar);

    setIsLoading(false);

    setIsReady(true)





    // try {
    //   await Storage.put(imageName, imageResult.uri, fileType);
    //   console.log('Successfully uploaded ', imageName, 'to bucket!');
    // } catch (err) {
    //   console.log('error upload s3 image: ', err);
    //   // Alert.alert(err);s
    // }
  


  };

  const getImage = async () => {

    try {
      let storage = await loadSettingsStorage(global.storageKey);
      // console.log('storage: ', storage.user);
      global.avatar = {uri: storage.user.image_url}
      setImage(global.avatar);
      setIsReady(true);
      setIsLoading(false);

    } catch(e) {
      // statements
      // global.avatar = global.defaultAvatar;
      // setImage(global.avatar);
      console.log('error seting image:', e);
    }

    // if (await isDeviceOnline() === true && global.authenticated) {
    //    try {
    //      fetch(image.uri).then(response => {
    //      response.blob()
    //       .then(blob => {
    //         const imageName = global.avatar.uri.replace(/^.*[\\\/]/, '');
    //         console.log('imageName: ', imageName);
    //         const fileType = mime.lookup(global.avatar.uri);
    //         console.log('fileType: ', fileType);
    //         const access = { level: "public", contentType: fileType, };

    //         Storage.put(`@${global.storageKey}/picture.jpg`, blob, access)
    //    })})
        
    //    } catch(e) {
    //      // statements
    //      throw new Error(e);
    //      // console.log('error uploading picture e: ', e);
    //    }
    //  }
    

    // let stored = await Storage.get('picture.jpg', {level:  'public'});
    // // console.log('stored: ', stored);
    // global.avatar = ({uri: stored})

    
    // if (global.isConnected) {
      
    // }


    // if (!global.authenticated) {
    //   // setImage(global.defaultAvatar);
    //   // setIsReady(true);
    //   // setIsLoading(false);
    //   // return
    // }
    // else if (global.isFederated) {
    //   let storage = await loadSettingsStorage(global.storageKey);
    //   console.log('storage: ', storage);

    //   global.avatar = { uri: storage.user.image_url }

    //   // setImage(global.avatar);

    //   // setIsReady(true);
    //   // setIsLoading(false);

    // }
    // if (global.authenticated) {

        try {
          // setIsLoading(true)
          let stored = await Storage.get(`@${global.storageKey}/picture.jpg`, {level:  'public'});
          // console.log('stored: ', stored);
          global.avatar = ({uri: stored})
          let settings = await loadSettingsStorage(global.storageKey)
          settings.user.image_url = stored

          saveSettingsStorage(global.storageKey, settings)
          // setImage(global.avatar);
          // setIsLoading(false);
          // setIsReady(true);

          // return
        } catch(e) {
          // statements
          console.log(e);
          // throw new Error(e)
          // global.avatar = global.defaultAvatar
          // setImage(global.avatar);
          // setIsLoading(false);
          // setIsReady(true);
        }

      // setTimeout(async function(){
        setIsReady(true);
        setIsLoading(false);
        setImage(global.avatar)
      // }, 3000)
      
    // }

    // if (!global.isConnected) {
    //   global.avatar = global.defaultAvatar
    // }

    // global.avatar = { uri: storage.user.image_url }
  }

  const handleChooseImage = () => {
    const options = {
      noData: true,
    }
    ImagePicker(options, response => {
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
      // disabled={!global.authenticated}
      // style={styles.userImageMaskView}
      style={[styles.userImageMaskView, props.style]}
      // {...rest}
      onPress={
          async () => {
            console.log('Platform.OS: ', Platform.OS);
              if (Platform.OS !== 'android') {
                // user is on ios
                getPermissionAsync();
              }
                else {
                  // user is on android
                  

                  try {
                    // statements
                    pickImage();
                  } catch(e) {
                    // statements
                    console.log(e);
                    setShouldShowAndroidUserBox(true);
                  }

                }
          }
        }
      >
    <View
    style={[styles.userImageMaskView, props.style]}
  >
  
  <ImageBackground style={styles.userImage} source={global.defaultAvatar}>
{/*  <MaterialCommunityIcons
  style={{
    flex: 1,
    position: 'absolute',
    top: 20,
    // bottom: 0,

    left: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 3,
  }}
  name="pencil" size={17} color={colors.offWhite} />*/}

    <Image
      // resizeMode="contasin"
      style={styles.userImage}
      source={image} // {global.placeholder500x500}
    />
    </ImageBackground>
        {
      dialogBox
    }

    
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
  //           //   setShouldShowAndroidUserBox(true)
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
//             //   setShouldShowAndroidUserBox(true)
//             // }
//           }
//         }
//       ><DisplayImageExample uri={'https://reactnative.dev/img/tiny_logo.png'
// } /></TouchableOpacity>
  
  return <View>
{/*        <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        // onWillFocus={() => {
        //   // setIsLoading(false)
        //   // setIsReady(true)
        //   // try {
        //     // getImage();
        //   // } catch(e) {
        //   //   // statements
        //   //   console.log(e);
        //   }
        // }} // {(payload) => clearState()}
        // onWillFocus={''}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={() => {
        //   setIsLoading(false)
        //   setIsReady(true)
        // }}
        // onDidBlur={retrieveUserStoredSettings}
      />
      */}
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

    //           //   setShouldShowAndroidUserBox(true)
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