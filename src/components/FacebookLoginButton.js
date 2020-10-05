// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import * as Facebook from 'expo-facebook';

// import { AntDesign } from '@expo/vector-icons';

// // import { LoginManager } from "react-native-fbsdk";

// import colors from 'src/colors';

// import styles from '../../styles';

// import BlueButton from './BlueButton';

// import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

// import { getAuthentication } from 'controllers/Network';

// // console.disableYellowBox = true;

// // const getAuthentication = async () => {
// //     await Auth.currentAuthenticatedUser().then((cognito) => {
// //     console.log('cognito: ', cognito);


// //     return cognito;
// //   }).catch((err) => {
// //     console.log('err: ', err);
// //   })
// // };

// // getAuthentication()

// export default function FacebookLogin(props) {
//   const [isLoggedin, setLoggedinStatus] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [isImageLoading, setImageLoadStatus] = useState(false);

//   const { handleFacebookSignIn, handleFacebookSignOut } = props;

  
//   const facebookLogIn = async () => {
//     try {
//       await Facebook.initializeAsync(global.facebookAppId); // console.log('global.facebookAppId: ', global.facebookAppId);
//         const {
//           type,
//           token,
//           expires,
//           permissions,
//           declinedPermissions,
//         } = await Facebook.logInWithReadPermissionsAsync(
//           "facebook",
//           {
//           permissions: ['public_profile','email'],
//         }
//       );

//       console.log('type: ', type);
//       console.log('declinedPermissions: ', declinedPermissions);
//       console.log('expires: ', expires);

//       if (permissions) console.log('permissions: ', permissions);

//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         let result = await fetch(
//           `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,picture.height(500)`)
//         // const response = await fetch(
//     // `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
//           .then(response => response.json())
//           .then(async data => {
//             console.log('data: ', data);
            
//             if (!(await getAuthentication())) {


//             /*  SIGNS FB USER INTO AWS COGNITO */
//             let a = await Auth.federatedSignIn(
//               'facebook',
//               { token, expires },
//               data,
//             );
//           }

//           // console.log('data.id: ', data.id);

//           // global.storageKey = data.id

//           // let Image_Http_URL ={ uri: data.picture.data.url};

//           // global.avatar = { uri: userData.picture.data.url }

//           setLoggedinStatus(true);

//           setUserData(data);




//           handleFacebookSignIn(data);











//       // console.log('a: ', a);

//             // Attempt a login using the Facebook login dialog asking for default permissions.
    

//             // try {
//             //   // statements
//             //   Facebook.logInWithPermissions(['email'])
//             //   .then((result) => {
//             //   if (result.isCancelled) {
//             //     console.log("Login cancelled");
//             //   } else {
//             //     console.log("Login success with permissions: " + result.grantedPermissions.toString());
//             //   }
//             // },(error) => {
//             //     console.log("Login fail with error: " + error);
//             //   }
//             //   ).catch(stuff => {})
//             // } catch(e) {
//             //   // statements
//             //   console.log(e);
//             // }

            
          






//           })
//           .catch(e => console.log('fb login err:',e))


//       } else {
//         // type === 'cancel'
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//     }
//   };

//   const login = () => {
//     // console.log('userData: ', userData);



//     handleFacebookSignIn(userData);
//   };

//   const logout = () => {
//     setLoggedinStatus(false);
//     setUserData(null);
//     setImageLoadStatus(false);
//     handleFacebookSignOut(userData);
//   };

//   return (
//     isLoggedin ?
//       userData ?
//         <View style={{
//               alignItems: 'center',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//         }}>
//           <Image
//             style={{ width: 100, height: 100, borderRadius: 50 }}
//             source={{ uri: userData.picture.data.url }}
//             onLoadEnd={() => setImageLoadStatus(true)} />

//           <ActivityIndicator size="large" color="#ddd" animating={!isImageLoading} style={{ position: "absolute" }} />
          
//           <Text style={styles.textStyle}>Hi {userData.name}!</Text>

//           {/*
//             <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//               <Text style={{ color: "#fff" }}>Logout</Text>
//             </TouchableOpacity>
//           */}
            
//           { userData &&
//             (
//               <View>
//               {global.isFederated &&  <BlueButton title="Login" onPress={() => {}} />}
//              {/*<BlueButton title="Logout" onPress={logout} />*/}
//               </View>
//             )
//           }
//         </View> :
//         null
//       :
//       <View style={{
//             alignItems: 'center',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//       }}>
//        {/* <Image
//           style={{ width: 100, height: 100, borderRadius: 22, marginVertical: 8 }}
//           source={global.avatar} />*/}

//           {/*
//           <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
//               <Text style={{ color: "#fff" }}>Login with Facebook</Text>
//             </TouchableOpacity>
//           */}

//         <BlueButton icon={(<AntDesign name="facebook-square" size={styles.buttonText.fontSize} color={colors.white} />)} title="acebook" onPress={facebookLogIn} />
        
//       </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     // alignSelf: 'center',
// //     // flex: 0.5,
// //     // width: '100%',
// //     // justifyContent: 'center',
// //     alignItems: 'center',

// //     borderWidth: 1,
// //     borderColor: 'white',
// //     borderStyle: 'solid',
// //   },
// //   // loginBtn: {
// //   //   backgroundColor: '#4267b2',
// //   //   paddingVertical: 10,
// //   //   paddingHorizontal: 20,
// //   //   borderRadius: 20
// //   // },
// //   // logoutBtn: {
// //   //   backgroundColor: 'grey',
// //   //   paddingVertical: 10,
// //   //   paddingHorizontal: 20,
// //   //   borderRadius: 20,
// //   //   // position: "absolute",
// //   //   // bottom: 0,
// //   // },
// // });

