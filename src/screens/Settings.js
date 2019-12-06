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
  // Text,
  Image,
  // TextInput
  SafeAreaView,
} from 'react-native';

import * as StoreReview from 'expo-store-review';

import * as MailComposer from 'expo-mail-composer';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import { NavigationEvents } from 'react-navigation';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

import RateUsButton from '../components/settings/RateUsButton';

import ShareButton from '../components/settings/ShareButton';

import DeveloperCredit from '../components/settings/DeveloperCredit';

import DesignerCredit from '../components/settings/DesignerCredit';

import VersionCredit from '../components/settings/VersionCredit';

// ui colors
import colors from '../../colors';

import {
  loadUserObject,
  // saveUserObject,
} from '../storage/UserStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.darkTwo,
  },
  backBtnImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// header rectangle
const rectangle5 = {
  flex: 0.15,
  backgroundColor: colors.dark,

  marginBottom: '5%',
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
    height: 2,
  },
  shadowRadius: 4,
  shadowOpacity: 1,
};


function Settings(props) {
  const send = async () => {
    const userObject = await loadUserObject();
    MailComposer.composeAsync({
      recipients: [global.adminEmailAddress],
      subject: `Contact Support ${Date.now()} ${userObject.user.username}`,
      body: '',
      attachments: [],
      isHtml: false,
    });
  };

  function rateUsBtnPressed() {
    // store review
    console.log('Rate Us button pressed')
    StoreReview.requestReview();
  }

  function contactSupportBtnPressed() {
    // send contact support email
    send();
  }

  function termsOfServiceBtnPressed() {
    // console.log('Terms');
    props.navigation.navigate('Terms');
  }

  function shareBtnPressed() {
    console.log('Share button pressed');
  }

  function onPress(btn) {
    const name = btn.key;

    // console.log(btn);
    if (name === 'Contact Support') {
      contactSupportBtnPressed();
    } else if (name === 'Terms of Service') {
      termsOfServiceBtnPressed();
    }
  }

  return (
    <SafeAreaView
      style={
        {
          flex: 1,
          backgroundColor: colors.dark,
        }
      }
    >
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
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

        <UserOptions
          onPress={onPress}
        />

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
          <View
            style={
              {
                flex: 1,
                justifyContent: 'center',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
          >

            <DeveloperCredit />

            <DesignerCredit />

          </View>

          <View
            style={
              {
                flex: 1,
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'center',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
          >
            <RateUsButton onPress={() => rateUsBtnPressed()} />

            <ShareButton onPress={() => shareBtnPressed()} />

          </View>

          <View style={{
            flex: 0.5,
            justifyContent: 'center',
          }}
          >
            <VersionCredit />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

Settings.navigationOptions = ({ navigation }) => {
  const backBtnPressed = () => {
    navigation.navigate('Home');
  };

  // async function logUserOut() {
  //   await global.setIsStoredUserLoggedIn(false);
  //   navigation.navigate('Login');
  // }

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

    headerLeft: null,

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
