import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  // Text,
  // TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../storage/SettingsStorage'

import {
  setHasRatedUs,
  setIsBackedUp,
} from '../../globals'

import colors from '../../colors';

import styles from '../../styles';

import MyButton from '../components/MyButton';

import TouchableText from '../components/TouchableText';

import FacebookLogin from '../components/FacebookLoginButton';

import HelpMessage from '../components/HelpMessage';

import uuidv4 from '../functions/uuidv4';

// AWS Amplify
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';
// Auth.federatedSignIn

const getAuthentication = async () => {
  await Auth.currentAuthenticatedUser()
  .then((cognito) => {
    console.log('cognito: ', cognito);
    return cognito;
  }).catch((err) => {
    console.log('err: ', err);
  })
};

function WelcomeScreen(props) {
  // const [userData, setUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleRoute = async (destination) => {
    try {
      // statements
      props.navigation.navigate(destination);
    } catch (e) {
      // statements
      console.log('Error with welcomescreen route', e);
    }
  };

    const spinner = (
    <View
      style={
        {
          // flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ddd',
          opacity: 0.1,

        }
      }
    >
      <ActivityIndicator style={{
        position: 'absolute',
        top: 70,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }} size="large" color="gray" />
    </View>
  );



  const handleFacebookSignIn = async (userData) => {

//     try {
//               // statements
//               Auth.federatedSignIn('facebook',
//               { token, expires },
//               data,)
//               .then((result) => {
//               if (result.isCancelled) {
//                 console.log("Login cancelled");
//               } else {
//                 console.log("Login success with permissions: " + result.grantedPermissions.toString());
//               }
//             },(error) => {
//                 console.log("Login fail with error: " + error);
//               }
//               ).catch(stuff => {})
//             } catch(e) {
//               // statements
//               console.log(e);
//             }

            
 
// // users/facebook_sign_in
// AWS.config.region = config.AWSRegion
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-east-1:f1677c4d-8148-4c3e-97e0-d81ffd75c15a',
//   Logins: {
//     'graph.facebook.com': '24df2ee78d93a59bcb8d05aaaf5da7b5' // facebookAccessToken
//   }
// })

// AWS.config.credentials.get((err) => {
//   // Here I get no errors, I presume that I have logged Facebook user in 
//   const accessKeyId = AWS.config.credentials.accessKeyId
//   const secretAccessKey = AWS.config.credentials.secretAccessKey
//   const sessionToken = AWS.config.credentials.sessionToken
//   // here I can do stuff probably, 
//   // but I would like to receive token that would allow me to do stuff, 
//   // rather than context I can do stuff in
// })

// console.log('AWS.config: ', AWS.config);



    // setIsLoading(true);
    // // do stuff with the new user's data
    // // console.log('userData: ', userData);
    
    // // setUserData(userData);

    // global.storageKey = userData.id

    // let Image_Http_URL = { uri: userData.picture.data.url};

    // global.avatar = Image_Http_URL;

    // // global.storageKey = userData.id

    // AsyncStorage.setItem('storageKey', global.storageKey);


    // let storage = await loadSettingsStorage(userData.id);

    // storage.user.name = userData.name;

    // storage.user.email = userData.email;

    // storage.user.image_url = userData.picture.data.url;

    // saveSettingsStorage(global.storageKey, storage);

    // // console.log('storage: ', storage);

    // // global.isUserAuthenticated = true;

    // // global.authenticated = true;

    // AsyncStorage.setItem('authenticated', JSON.stringify(true))

    // AsyncStorage.setItem('isFederated', JSON.stringify(true))

    // let userToken = global.storageKey + '@session' + uuidv4();

    //   // console.log('userToken: ', userToken);
    // AsyncStorage.setItem('userToken', userToken); // save user token

    // // let userToken = global.storageKey + '@session' + String(Math.random(1,8)*100);

    // // await AsyncStorage.setItem('userToken', userToken); // save user token



    // setIsLoading(false)

    // Auth.currentSession().then((user) => console.log('user: ', user)).catch((err) => console.log('err: ', err))

    // handleRoute('AuthLoading');
}

  const handleFacebookSignOut = async (userData) => {

    setIsLoading(true);
    // do stuff with the new user's data
    await Auth.signOut()
      .then(() => {
        AsyncStorage.removeItem('userToken');

        AsyncStorage.removeItem('storageKey');

        AsyncStorage.removeItem('isLoginEnabled');

        // AsyncStorage.removeItem('isUserAuthenticated');
        AsyncStorage.removeItem('authenticated');

        global.storageKey = '';

        global.email = '';

        global.emailAddressInput = '';

        // global.isUserAuthenticated = false;
        global.authenticated = false;

        global.isFederated = false;

        AsyncStorage.setItem('authenticated', JSON.stringify(false))

        AsyncStorage.setItem('isFederated', JSON.stringify(false))

        global.avatar = require('../../assets/avatar.png');


        // console.log('Removed AsyncsStorage Variables ..');


        // AsyncStorage.getAllKeys((err, keys) => {
        //   AsyncStorage.multiGet(keys, (error, stores) => {
        //     stores.map((result, i, store) => {
        //       console.log({ [store[i][0]]: store[i][1] });
        //       return true;
        //     });
        //   });
        // });

        // setHasRatedUs(false);

        // setIsBackedUp(false)

        AsyncStorage.setItem('storageKey', JSON.stringify(''))

        navigation.navigate('AuthLoading');

        // console.log('Sign out complete');
        // showMessage('Signed out');
        })
        .catch((err) => console.log('Error while signing out!', err));



        setIsLoading(false)

        Auth.signOut({ global: true })

        handleRoute('AuthLoading');
      }

  const signUpSignInBtns = (
    <View style={styles.infoContainer}>
              
      <View style={styles.container}>

        <MyButton title="Sign Up" onPress={() => handleRoute('SignUp')} />

        <MyButton title="Sign In" onPress={() => {
          // if (global.isFederated) {
          //   handleRoute('AuthLoading')
          // } else {
            handleRoute('SignIn')
          // }
        }} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          justifyContent: 'space-around',
          padding: 6,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>
        <TouchableText title="Forgot Password?" onPress={() => handleRoute('ForgetPassword')} />

        </View>
      </View>
    </View>
  );
  const welcome = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            {/* Facebook Login */}
            {
              //(!global.isFederated && !global.authenticated) && <FacebookLogin handleFacebookSignIn={handleFacebookSignIn} handleFacebookSignOut={handleFacebookSignOut} />
            }
            
            {

              signUpSignInBtns
            }

            {
              isLoading && spinner
            }
            
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  return welcome;
}

WelcomeScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
