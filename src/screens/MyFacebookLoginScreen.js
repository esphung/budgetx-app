// /*
// FILENAME:  MyFacebookLoginScreen.js
// PURPOSE:   test fb login on expo
// AUTHOR:    Eric Phung
// CREATED:   04/04/2020 05:55 PM
// UPDATED:   04/04/2020 05:55 PM
// */

// import React from 'react';

// import {
//   View,
//   Button,
//   Alert,
//   // YellowBox,
// } from 'react-native';

// import * as Facebook from 'expo-facebook';

// // import _ from 'lodash';

// // /* blocks warnings */
// // YellowBox.ignoreWarnings(['AWSPinpointProvider']);
// // const _console = _.clone(console);
// // console.warn = message => {
// // if (message.indexOf('AWSPinpointProvider') <= -1) {
// //  _console.warn(message);
// // } 
// // };

// // AWS Amplify
// import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';
// // Auth.federatedSignIn

// import colors from '../../colors';

// const getAuthentication = async () => {
//     await Auth.currentAuthenticatedUser().then((cognito) => {
//     console.log('cognito: ', cognito);
//   }).catch((err) => {
//     console.log('err: ', err);
//   })
// };

// async function logIn() {
//   try {
//     await Facebook.initializeAsync(global.facebookAppId); // console.log('global.facebookAppId: ', global.facebookAppId);
//     const {
//       type,
//       token,
//       expires,
//       permissions,
//       declinedPermissions,
//     } = await Facebook.logInWithReadPermissionsAsync({
//       permissions: ['public_profile'],
//     });
//     if (type === 'success') {
//       // Get the user's name using Facebook's Graph API
//       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

//       let user = await response.json();

//       // console.log('data: ', data);

//       await Auth.federatedSignIn(
//         "facebook",
//         { token, expires },
//         user
//       );
//       Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//     } else {
//       // type === 'cancel'
//       // console.log('Sign in canceled');
//     }
//   } catch ({ message }) {
//     Alert.alert(`Facebook Login Error: ${message}`);
//   }
// }

// /* Component View */
// const MyFacebookLoginScreen = () => {
//   const onPress = async () => {
//     await logIn();
//     getAuthentication();
//   };
//   return (
//     <View
//       style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.darkTwo }}
//     >
//       <Button title="Facebook Login" onPress={onPress} />
//     </View>
//   );
// };

// module.exports = {
//   MyFacebookLoginScreen,
// };



