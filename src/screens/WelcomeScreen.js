// import React from 'react';

// import PropTypes from 'prop-types';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   SafeAreaView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Keyboard,
// } from 'react-native';

// import colors from '../../colors';

// import styles from './styles';

// // import Dialog from "react-native-dialog";

// function WelcomeScreen(props) {
//   const handleRoute = async (destination) => {
//     await props.navigation.navigate(destination);
//   };

//   const welcome = (
//     <SafeAreaView style={styles.container}>
//       <StatusBar />
//       <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//         <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <View style={styles.infoContainer}>
//               <View style={styles.container}>
//                 <TouchableOpacity
//                   onPress={() => handleRoute('SignUp')}
//                   style={styles.buttonStyle}
//                 >
//                   <Text style={styles.buttonText}>Sign Up</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleRoute('SignIn')}
//                   style={styles.buttonStyle}
//                 >
//                   <Text style={styles.buttonText}>Sign In</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleRoute('ForgetPassword')}
//                 >
//                   <Text style={styles.buttonText}>Forget password ?</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );

//   return welcome;
// }

// WelcomeScreen.navigationOptions = () => {
//   const navbar = {
//     headerTransparent: {},
//     headerTintColor: colors.white,
//   };
//   return navbar;
// };

// WelcomeScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

// export default WelcomeScreen;
