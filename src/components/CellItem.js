// import React, { useState, useCallback, useEffect } from 'react';

// import PropTypes from 'prop-types';

// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   // Button,
//   // TouchableOpacity,
//   Text,
//   TextInput,
//   Image,
//   // TextInput
//   SafeAreaView,
//   AsyncStorage,
//   Alert,
//   FlatList,
//   ActivityIndicator,
//   Button,
// } from 'react-native';

// import {
//   Container,
//   Item,
//   Input,
//   // Icon,
// } from 'native-base';

// import { NavigationEvents } from 'react-navigation';

// import { SwipeListView } from 'react-native-swipe-list-view';

// import CustomSwipeCell from '../components/CustomSwipeCell';

// import { Ionicons } from 'expo-vector-icons';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import Constants from 'expo-constants';

// import { Auth } from 'aws-amplify';

// import Category from '../models/Category';

// // ui colors
// import colors from 'main/colors';


// function CellItem({
//   id,
//   name,
//   selected,
//   onSelect,
//   color,
//   addCategory,
// }) {

//   const [text, setText] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);


//   // const deleteIconName = selected ? 'md-remove-circle-outline' : 'md-remove-circle';

//   const itemIconName = selected ? 'md-unlock' : 'md-lock';

//   const isEditable = selected ? true : false;

//   // const handleNameEndEditing = (text) => {
//   //   console.log(text);
//   // }

//   function checkColor(color) {

//     return color !== 'dark' | color !== 'darkTwo' | color !== 'darkGreyBlue' | color !== 'offWhite'
    
//   }

//   const randomKeyFrom = (obj) => {
//     const keys = Object.keys(obj);

//     // console.log(keys.filter(checkColor))

//     return obj[keys.filter(checkColor)[Math.floor(Math.random() * keys.length)]];
//   };

//   const handleTextChange = (value) => {

//     // console.log(value);
//     setText(value)
//   }

//   const handleTextSubmit = async (value) => {
//     setIsLoading(true);

//     // load stored user
//     const userObject = await loadUserObject(); // load storage object

//     const previousObj = search(value, userObject.user.categories);

//     const randomColor = randomKeyFrom(colors)

//     if (!previousObj) {
//       // clean scrub name

//       //  create new payee
//       addCategory(value, randomColor);

//       // // add payee to list
//       // userObject.user.categories.unshift(category);
//       // // console.log(payees);

//       // // save new list of payees
//       // saveUserObject(userObject);

//       // load user saved transactions
//       // const userObject = await loadUserObject(); // load storage object

//       // // find current transaction from list
//       // let i = userObject.user.categories.length - 1;
//       // for (i; i >= 0; i -= 1) {
//       //   if (userObject.user.categories[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
//       //     // set transaction payee
//       //     userObject.user.categories[i].payee = payee;

//       //     // console.log(transactions[i]);

//       //     // save transactions list
//       //     saveUserObject(userObject);

//       //     // return from here
//       //     return;
//       //   }
//       // }
//     }

//     // console.log('Submitted:', value);
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     setText(name)
//     return () => {
//       // effect
//     };
//   }, [])

//   useEffect(() => {
//     console.log(text);
//     return () => {
//       // effect
//     };
//   }, [text])
  
//   return (
//     <TouchableOpacity
//       onPress={() => onSelect(id)}
//       activeOpacity={1}
//       style={[
//         styles.item,
//         { 
//           backgroundColor: selected ? colors.darkGreyBlue : colors.dark,
//         },
//       ]}
//     >
//       <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//         <TextInput
//           style={
//             [
//               styles.text,
//               {
//                 color: selected ? colors.white : color,
//                 opacity: selected ? 0.9 : 1,
//               },
//             ]
//           }

//           placeholder=""

//           placeholderTextColor={colors.offWhite}

//           editable={isEditable}

//           returnKeyType="done"

//           keyboardAppearance="dark"

//           autoCapitalize="words"

//           autoCorrect

//           onChangeText={(text) => handleTextChange(text)}

//           onSubmitEditing={() => handleTextSubmit(text)}

//           // onEndEditing={() => setText(name)}

//           maxLength={14}

//           value={text}

//           // onEndEditing={(text) => handleNameEndEditing(text)}
//         />

//         <View style={
//           {
//             flex: 1,
//           }
//         } />

//         <Ionicons active name={itemIconName} style={styles.iconStyle} />
        
//         {/*<Text style={styles.arrow}>X</Text>*/}
      

//       </View>
//     </TouchableOpacity>
//   );
// }
