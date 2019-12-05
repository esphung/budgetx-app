/*
FILENAME:   Settings.js
PURPOSE:    Settings
AUTHOR:     Eric Phung
CREATED:    Thu Oct 31 23:17:49 2019
UPDATED:    12/04/2019 07:44 PM Changed to hook state
            12/04/2019 08:37 PM
*/

import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  // TouchableOpacity,
  Text,
  Image,
  TextInput
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler'

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from '../../colors';

function Settings() {
  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={() => console.log('Settings')} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={payload => console.log('will blur',payload)}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
      <View style={userProfileRectangle}>
        <View style={
            {
              flex: 0.3,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',

              // backgroundColor: 'pink',
            }
        }
        >
          <TouchableOpacity style={
            {
              alignItems: 'center',
              justifyContent: 'center',

              width: '100%',
              height: '100%',
            }}>
            <Image source={global.placeholderUserImage}  style={
            {
              width: '68%',
              height: '68%',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: 29,
            }}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'column',}}>
          <View style={
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          >
            {/* User Name input */}
            <Text style={
              {
                flex: 0.2,
                // width: 44,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                color: colors.white,

                marginLeft: 5,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }>Name</Text>
            <TextInput style={
              {
                flex: 0.8,
                // width: 120,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                textAlign: 'right',
                color: colors.offWhite, // '#ffffff7f.8',

                marginRight: 10,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
              placeholder="John Smith"
              
              placeholderTextColor={colors.offWhite}

              keyboardAppearance="dark" // ios

              // textContentType="name" // ios

              // keyboardType="name-phone-pad"

              returnKeyType="done"

              autoCorrect={true}

              autoCapitalize="sentences" // "words"

              maxLength={24}

              // onSubmitEditing={() => this.submitBtnPressed(text)}

              // onChangeText={this.handleTextChange}

              // editable={this.isInputEnabled}

              // value={text}

            >
              
            </TextInput>
          </View>
          <View style={line2} />
          <View style={
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          >
          {/* User Email input */}
            <Text style={
              {
                flex: 0.2,
                // width: 44,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                color: colors.white,

                marginLeft: 5,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }>Email</Text>
            <TextInput style={
              {
                flex: 0.8,
                // width: 120,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                textAlign: 'right',
                color: colors.offWhite, // '#ffffff7f.8',

                marginRight: 10,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
              placeholder="mail@budgetx.com"
              
              placeholderTextColor={colors.offWhite}

              keyboardAppearance="dark" // ios

              // textContentType="name" // ios

              // keyboardType="name-phone-pad"

              returnKeyType="done"

              autoCorrect={true}

              autoCapitalize="sentences" // "words"

              maxLength={24}

              // onSubmitEditing={() => this.submitBtnPressed(text)}

              // onChangeText={this.handleTextChange}

              // editable={this.isInputEnabled}

              // value={text}

            >
              
            </TextInput>
          </View>
          </View>

          
          

        </View>
    </ScrollView>
  );
}

Settings.navigationOptions = ({ navigation }) => {
  const backBtnPressed = () => {
    navigation.navigate('Home');
  };

  const navbar = {
    title: 'Settings',
    headerTransparent: {},
    headerTintColor: colors.white,

    headerRight: 
      <View style={{ marginHorizontal: 8 }}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack(null)}>
        <View style={combinedShape}>
        <Image source={global.xIconWhite}  style={styles.backBtnImage}/>
        </View>
        
      </TouchableOpacity>
      </View>,

    // headerTitleStyle: {
    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'solid',
    // },

    headerLeft: (
      <View style={
        {
          marginHorizontal: 14,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text style={copy18}>Log Out</Text>
        </TouchableOpacity>
      </View>
    ),

  };
  // const props = navigation.getScreenProps('props');
  // console.log(props)
  return navbar;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  backBtnImage: {
    width: '100%',
    height: '100%' 
  },
  backBtn: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});

const line2 = {
  alignSelf: 'center',
  justifyContent: 'center',
  width: '95%', // 267,
  height: '1%',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: colors.darkTwo
};

// log out header backBtn
const copy18 = {
  width: '100%',
  // width: 58,
  height: 20,
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 17,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.13,
  textAlign: 'right',
  color: colors.pinkRed,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

// right X header btn
const combinedShape = {
  // width: 20.3,
  // height: 19.9,
  width: '100%',
  height: '100%',
  // backgroundColor: '#ffffff',
  shadowColor: '#0000002e.68f5c28f5c28',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowRadius: 4,
  shadowOpacity: 1,
  // borderStyle: 'solid',
  // // borderWidth: 0.2,
  // // borderColor: colors.darkTwo

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// user profile rectangle
const userProfileRectangle = {
  flexDirection: 'row',
  // width: 375,
  width: '100%',
  // height: 92,
  height: '11%',

  backgroundColor: colors.dark,

  top: '30%',

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

const userProfilePicView = {
  flex: 1,
  // width: 58,
  // height: 58,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

export default Settings;

// // Settings.js
// // Thu Oct 31 23:17:49 2019
// // eric phung
// //  settings screen for budget x app
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,

//   Button,
//   AsyncStorage
// } from 'react-native';

// // ui colors
// import colors from '../../colors';

// class Settings extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const obj = {
//       title: 'Settings',

//       headerStyle: {
//         backgroundColor: colors.dark,
//       },
//       headerLeft: (
//         <Button title='Back' onPress={() => navigation.goBack(null)} />
//       ),

//       headerTintColor: colors.white
//     };
//     // const props = navigation.getScreenProps('props');

//     return obj;
//   }

//   clearAll() {
//     const { navigation } = this.props;
//     AsyncStorage.clear();
//     navigation.goBack(null);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title='Reset' onPress={() => this.clearAll()} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.darkTwo
//   },

//   logOutBtnView: {
//     flex: 1,
//     marginLeft: 15,
//     marginBottom: 6
//   },

//   logOutBtnText: {
//     width: 58,
//     height: 20,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 17,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'right',
//     color: colors.pinkRed,
//   }
// });

// export default Settings;
