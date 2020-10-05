// import React, { useState, useEffect,  useRef } from 'react';

// import {
//   // StyleSheet,
//   View,
//   // Text,
//   // AsyncStorage,
//   // TouchableOpacity,
//   // TouchableWithoutFeedback,
//   // SafeAreaView,
//   // StatusBar,
//   // KeyboardAvoidingView,
//   // Keyboard,
//   // Alert,
//   // Animated,
// } from 'react-native';

// import * as AppleAuthentication from 'expo-apple-authentication';

// export default function AppleSignInButton(props) {

//   return (
//     <View style={{
//       // flex: 1,
//       alignItems: 'center', // justifyContent: 'center',
//       marginBottom: 20,
//     }}>
//     <AppleAuthentication.AppleAuthenticationButton
//       buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
//       buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
//       cornerRadius={5}
//       style={{ width: 200, height: 44 }}
//       onPress={async () => {
//         try {
//           const credential = await AppleAuthentication.signInAsync({
//             requestedScopes: [
//               AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//               AppleAuthentication.AppleAuthenticationScope.EMAIL,
//             ],
//           });
//           // signed in

//           props.appleSignInCallback(credential)

//           // console.log('credential: ', credential);

//           // if (credential.email) {
//           //   console.log('credential.email: ', credential.email);
//           //   props.appleSignInCallback(credential)
//           // } else {
//           //   throw new Error('User not given email from Apple')
//           // }




//         } catch (e) {
//           if (e.code === 'ERR_CANCELED') {
//             // handle that the user canceled the sign-in flow
//             // throw new Error(e.code)
//           } else {
//             // handle other errors
//             // throw new Error(e)
//           }
//         }
//       }}
//     />
//     </View>
//   );
// }




