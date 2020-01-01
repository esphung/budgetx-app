/*
FILENAME:   Settings.js
PURPOSE:    Settings
AUTHOR:     Eric Phung
CREATED:    Thu Oct 31 23:17:49 2019
UPDATED:    12/04/2019 07:44 PM Changed to hook state
            12/04/2019 08:37 PM
            12/04/2019 10:53 PM | Cleaned up code
            12/06/2019 02:20 AM | Added Log out functionality
            12/06/2019 03:15 PM
            12/09/2019 12:32 PM
*/

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  Image,
  // TextInput
  SafeAreaView,
  AsyncStorage,
  Alert,
  Share,
} from 'react-native';

// import { Ionicons } from 'expo-vector-icons';

import * as StoreReview from 'expo-store-review';

import * as MailComposer from 'expo-mail-composer';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { NavigationEvents } from 'react-navigation';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

import RateUsButton from '../components/settings/RateUsButton';

import ShareButton from '../components/settings/ShareButton';

import DeveloperCredit from '../components/settings/DeveloperCredit';

import DesignerCredit from '../components/settings/DesignerCredit';

import VersionCredit from '../components/settings/VersionCredit';

import {
  getObjectKeysHTML,
  getHTMLObjectRows,
  htmlTop,
  htmlBottom,
} from '../components/settings/exportHTML';

import {
  loadUserObject,
  // saveUserObject,
} from '../storage/UserStorage';

// ui colors
import colors from '../../colors';

import { getShortDate } from './functions';

// AWS Amplify
import Auth from '@aws-amplify/auth';

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


function getTransactionsHTML(data) {
  let html = '';

  const keys = `${getObjectKeysHTML(data)}`;

  const table = `
<div>
<table style="width:100%">
<tr>
${keys}
</tr>
${getHTMLObjectRows(data)}
</table>

</div>${'\n'}
`;

  html = htmlTop + table + htmlBottom;
  // console.log(html);
  return html;
}

function Settings(props) {

  const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(null);

  const clearAsyncStorage = async () => {
      AsyncStorage.clear();
  };

  /*
  * > Confirm reset data
  */
  const resetDataAlert = async () => {
    await Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all data from the app?',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        // Calling resetData
        {text: 'OK', onPress: () => resetData()}, 
      ],
      { cancelable: false }
    )
  };
  
  /*
  * > reset data from the app
  */
  const resetData = async () => {
    await clearAsyncStorage()
    .then(() => {
      console.log('Reset complete');
      props.navigation.navigate('AuthLoading');
    })
    .catch((err) => console.log('Error while signing out!', err))
  };

  const send = () => {
    // const userObject = await loadUserObject();
    MailComposer.composeAsync({
      recipients: [global.adminEmailAddress],
      subject: `Issue #${Date.now()}`,
      body: '', // `<p>${userObject.user.username}</p>`,
      attachments: [],
      isHtml: false,
    });
  };

  const sendTransactionsMail = async () => {
    const userObject = await loadUserObject();
    const { transactions, email } = userObject.user;

    // transactions.reverse();

    await MailComposer.composeAsync({
      recipients: [email],
      subject: `${userObject.user.username} Exported Transactions`,
      body: getTransactionsHTML(transactions),
      // attachments: [],
      isHtml: true,
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const storeIsLocallyAuthenticated = async (bool) => {
    try {
      await AsyncStorage.setItem(global.isLocallyAuthenticatedKey, JSON.stringify(bool));
    } catch (error) {
      // Error saving data
    }
  };


  const retrieveIsPasscodeEnabled = async () => {

    // // Saves to storage as a JSON-string
    // AsyncStorage.setItem('isPasscodeEnabled', JSON.stringify(false))

    // Retrieves from storage as boolean
    // AsyncStorage.getItem('isPasscodeEnabled', function (err, value) {
    //     JSON.parse(value) // boolean false
    // }

    // Or if you prefer using Promises
    await AsyncStorage.getItem('isPasscodeEnabled')
        .then( function (value) {
            JSON.parse(value) // boolean false
            if (value === null) {
              setIsPasscodeEnabled(false);
            }
            else if (value) {
              // setAuthenticated(true);
              setIsPasscodeEnabled(JSON.parse(value));
              // console.log(value);
            }
        })
  };

  const storeIsPasscodeEnabled = () => {
    if (isPasscodeEnabled !== null) {
      // Saves to storage as a JSON-string
      AsyncStorage.setItem('isPasscodeEnabled', JSON.stringify(isPasscodeEnabled));
      storeIsLocallyAuthenticated(JSON.stringify(!isPasscodeEnabled));
    }
  };

  async function passcodeBtnPressed() {
    setIsPasscodeEnabled(!isPasscodeEnabled);
    // storeIsPasscodeEnabled();
  }

  function customizeCategoriesBtnPressed() {
    props.navigation.navigate('CustomizeCategoriesScreen');
  }

  function resetDataBtnPressed() {
    resetDataAlert();
  }

  function rateUsBtnPressed() {
    // store review
    StoreReview.requestReview();
  }

  function contactSupportBtnPressed() {
    // send contact support email
    send();
  }

  function termsOfServiceBtnPressed() {
    props.navigation.navigate('Terms');
  }

  function shareBtnPressed() {
    // onShare()
    // console.log('Share button pressed');
  }

  function exportBtnPressed() {
    // console.log('Export btn pressed');
    sendTransactionsMail();
  }

  function changePasswordBtnPressed() {
    props.navigation.navigate('ChangePasswordScreen');
  }

  function onPress(btn) {
    const name = btn.key;

    // console.log(btn);
    if (name === 'Contact Support') {
      contactSupportBtnPressed();
    } else if (name === 'Terms of Service') {
      termsOfServiceBtnPressed();
    } else if (name === 'Passcode') {
      passcodeBtnPressed();
    } else if (name === 'Export Transactions') {
      exportBtnPressed();
    } else if (name === 'Change Password/Sign Out') {
      changePasswordBtnPressed();
    } else if (name === 'Reset Data') {
      resetDataBtnPressed();
    } else if (name === 'Customize Categories') {
      customizeCategoriesBtnPressed();
    }
  }

  useEffect(() => {
    retrieveIsPasscodeEnabled();
  }, [])

  useEffect(() => {
    if (isPasscodeEnabled !== null) {
      console.log('passcode:',isPasscodeEnabled);
      storeIsPasscodeEnabled();
    }
    
    return () => {
      // effect
    };
  }, [isPasscodeEnabled])

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
      
        <NavigationEvents
            // try only this. and your component will auto refresh when this is the active component
            onWillFocus={() => console.log('Settings')} // {(payload) => clearState()}
            // other props
            // onDidFocus={payload => console.log('did focus',payload)}
            // onWillBlur={payload => console.log('will blur',payload)}
            // onDidBlur={payload => console.log('did blur',payload)}
          />
      

        <View style={rectangle5} />

        <View
          style={
            {
              flex: 0.25,

              // top: '55%',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        ><ProfileRectangle />
        </View>

        <SubscriptionRect />

        {/* User Options */}

        <View
          style={
            {
              flex: 1.1,

              // top: '55%',

              // paddingTop: '10%',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        ><UserOptions
          onPress={onPress}
          isPasscodeEnabled={isPasscodeEnabled}
        /></View>

        <View
          style={
            {
              flex: 0.5,

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

            {/*<ShareButton onPress={() => shareBtnPressed()} />*/}

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
  // async function signOut() {
  //   // await AsyncStorage.clear()
  //   await AsyncStorage.removeItem('userToken');
  //   navigation.navigate('AuthLoading');
  // }

  const backBtnPressed = () => {
    navigation.navigate('Home');
  };

  // Sign out from the app
  const signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app? You will need internet access to sign back in and recover your data!',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        // Calling signOut
        {text: 'OK', onPress: () => signOut()}, 
      ],
      { cancelable: false }
    )
  }
  // Confirm sign out
  const signOut = async () => {
    await Auth.signOut()
    .then(() => {
      console.log('Sign out complete');
      navigation.navigate('AuthLoading');
    })
    .catch((err) => console.log('Error while signing out!', err))
  }

  const navbar = {
    title: 'Settings',
    headerTransparent: {},
    headerTintColor: colors.white,

    // headerRight: (
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       marginHorizontal: 8,
    //       width: '100%',
    //       height: '100%',
    //     }}
    //   >
    //     <TouchableOpacity style={styles.backBtn} onPress={() => backBtnPressed()}>
    //       <View style={combinedShape}>
    //         <Image source={global.xIconWhite} style={styles.backBtnImage} />
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // ),

    // headerTitleStyle: {
    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'solid',
    // },

    // headerLeft: (
    //   <View style={
    //     {
    //       width: '100%',
    //       height: '100%',

    //       justifyContent: 'center',
    //       // alignItems: 'center',

    //       marginHorizontal: 14,

    //       // borderWidth: 1,
    //       // borderColor: 'white',
    //       // borderStyle: 'solid',
    //     }
    //   }
    //   >
    //     <TouchableOpacity onPress={signOutAlert}>
    //       <Text
    //         style={
    //           {
    //             // width: 42,
    //             height: 20,
    //             fontFamily: 'SFProDisplay-Regular',
    //             fontSize: 17,
    //             fontWeight: 'normal',
    //             fontStyle: 'normal',
    //             letterSpacing: 0.13,
    //             color: colors.pinkRed,
    //           }
    //         }
    //       >
    //         Log Out
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // ),

    // headerLeft: null,

  };
  return navbar;
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default Settings;
