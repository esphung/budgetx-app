/*
FILENAME:   Settings.js
PURPOSE:    Settings
AUTHOR:     Eric Phung
CREATED:    Thu Oct 31 23:17:49 2019
UPDATED:    12/04/2019 07:44 PM Changed to hook state
            12/04/2019 08:37 PM
            12/04/2019 10:53 PM | Cleaned up code
            12/06/2019 02:20 AM | Added Log out functionality
*/

import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  Image
  // TextInput
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { NavigationEvents } from 'react-navigation';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

// ui colors
import colors from '../../colors';

function Settings() {
  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
    {/*
    <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={() => console.log('Settings')} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={payload => console.log('will blur',payload)}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
    */}

      <View style={rectangle5} />

      <ProfileRectangle />

      <SubscriptionRect />

      {/* User Options */}

      <UserOptions />

      <View
        style={
          {
            flex: 0.4,

            // top: '55%',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >
        <Text
          style={
            {
              height: 40,
              opacity: 0.5,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              textAlign: 'center',
              color: colors.white
            }
          }
        >
          Developed by Eric Phung
        </Text>

        <View
          style={
            {
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',

              marginHorizontal: 20,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <View style={
            {
              // alignSelf: 'center',
              // justifyContent: 'center',
              width: '38%', // 133,
              height: 46,
              borderRadius: 23,
              backgroundColor: colors.azure
            }
          }
          >
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
              <Text
                style={
                  {
                    fontFamily: 'SFProDisplay-Regular',
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0.13,
                    textAlign: 'center',
                    color: '#ffffff',

                    alignSelf: 'center',

                    // borderWidth: 1,
                    // borderColor: 'white',
                    // borderStyle: 'solid',
                  }
                }
              >
                Rate Us
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={
              {
                // alignSelf: 'center',
                // justifyContent: 'center',
                width: '38%', // 133,
                height: 46,
                borderRadius: 23,
                backgroundColor: colors.azure
              }
            }
          >
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
              <Text
                style={
                  {
                    fontFamily: 'SFProDisplay-Regular',
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0.13,
                    textAlign: 'center',
                    color: '#ffffff',

                    alignSelf: 'center',

                    // borderWidth: 1,
                    // borderColor: 'white',
                    // borderStyle: 'solid',
                  }
                }
              >
              Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={
            {
              flex: 1,
              // width: 61,
              // height: 15,
              opacity: 0.5,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 15,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.1,
              textAlign: 'center',
              color: colors.white // '#ffffff'
            }
        }
        >
          
        { `Version ${global.appVersion.toFixed(1)}` }
        </Text>
      </View>

    </ScrollView>
  );
}

Settings.navigationOptions = ({ navigation }) => {
  const backBtnPressed = () => {
    navigation.navigate('Home');
  };

  async function logUserOut() {
    await global.setIsStoredUserLoggedIn(false);
    navigation.navigate('Login');
  }

  const navbar = {
    title: 'Settings',
    headerTransparent: {},
    headerTintColor: colors.white,

    headerRight: (
      <View style={{ marginHorizontal: 8 }}>
        <TouchableOpacity style={styles.backBtn} onPress={() => backBtnPressed()}>
          <View style={combinedShape}>
            <Image source={global.xIconWhite} style={styles.backBtnImage} />
          </View>
        </TouchableOpacity>
      </View>
    ),

    headerLeft: null

    // headerTitleStyle: {
    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'solid',
    // },



    // headerLeft: (
    //   <View style={
    //     {
    //       marginHorizontal: 14,
    //       // borderWidth: 1,
    //       // borderColor: 'white',
    //       // borderStyle: 'solid',
    //     }
    //   }
    //   >
    //     <TouchableOpacity onPress={() => logUserOut()}>
    //       <Text style={copy18}>Log Out</Text>
    //     </TouchableOpacity>
    //   </View>
    // ),

  };
  return navbar;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',

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

// header rectangle
const rectangle5 = {
  flex: 0.23,
  // width: '100%', // 375,
  // height: '11%', // 88,
  backgroundColor: colors.dark,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};


// log out header backBtn
const copy18 = {
  // width: '100%',
  // width: 58,
  // height: 20,
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


// const userProfilePicView = {
//   flex: 1,
//   // width: 58,
//   // height: 58,

//   // borderWidth: 1,
//   // borderColor: 'white',
//   // borderStyle: 'solid',
// };

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
