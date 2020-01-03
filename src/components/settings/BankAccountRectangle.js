// import React, { useState } from 'react';

// import {
//   View,
//   Text
// } from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// // ui colors
// import colors from '../../../colors';

// function BankAccountRectangle() {
//   const [message] = useState('Add expenses automatically from your bank account');
//   const view = (
//     <View style={mask}>
//       <View
//         style={
//           {
//             flex: 0.25,
//             alignItems: 'flex-start',
//             justifyContent: 'center',

//             // borderWidth: 1,
//             // borderColor: 'white',
//             // borderStyle: 'solid',
//           }

//         }
//       >
//         <View style={oval2}>
//           <TouchableOpacity style={
//             {
//               width: '100%',
//               height: '100%',

//               // borderWidth: 1,
//               // borderColor: 'white',
//               // borderStyle: 'solid',
//             }
//           }
//           />
//         </View>
//       </View>
//       <View style={
//         {
//           flex: 0.75,
//           alignItems: 'center',
//           justifyContent: 'center',

//           // borderWidth: 1,
//           // borderColor: 'white',
//           // borderStyle: 'solid',
//         }

//       }
//       >
//         <Text style={copy3}>{ message }</Text>
//       </View>
//     </View>
//   );
//   return view;
// }

// // text style
// const copy3 = {
//   width: 215,
//   // height: 40,
//   fontFamily: 'SFProDisplay-Semibold',
//   fontSize: 17,
//   fontWeight: '600',
//   fontStyle: 'normal',
//   letterSpacing: 0.13,
//   color: colors.shamrockGreen,

//   paddingHorizontal: 6,

//   // borderWidth: 1,
//   // borderColor: 'white',
//   // borderStyle: 'solid',
// };

// // oval bank icon
// const oval2 = {
//   width: '100%',
//   height: '100%',
//   // width: 84,
//   // height: 74,
//   borderRadius: 9,
//   backgroundColor: colors.shamrockGreen
// };

// // view rectangle
// const mask = {
//   flex: 0.2,
//   flexDirection: 'row',
//   alignSelf: 'center',
//   // justifyContent: 'center',
//   // width: 346,
//   width: '90%',
//   // height: 74,
//   height: '10%',
//   borderRadius: 9,
//   backgroundColor: colors.dark,
//   shadowColor: '#0f1725',
//   shadowOffset: {
//     width: 5,
//     height: 5
//   },
//   shadowRadius: 16,
//   shadowOpacity: 1,

//   top: '8%',

//   marginHorizontal: 12,
//   marginTop: 10,

//   // borderWidth: 1,
//   // borderColor: 'white',
//   // borderStyle: 'solid',
// };

// export default BankAccountRectangle;
