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
            03/01/2020 02:52 PM | Removed username and email textinputs
*/

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  // StyleSheet,
  View,
  // ScrollView,
  // Button,
  // TouchableOpacity,
  // Text,
  // Image,
  // TextInput
  SafeAreaView,
  AsyncStorage,
  Alert,
  Share,
} from 'react-native';

// import { Ionicons } from 'expo-vector-icons';

import * as StoreReview from 'expo-store-review';

import * as MailComposer from 'expo-mail-composer';

// import { TouchableOpacity } from 'react-native-gesture-handler';

import { NavigationEvents } from 'react-navigation';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

import BlueButton from '../../storybook/stories/BlueButton';

import DeveloperCredit from '../components/settings/DeveloperCredit';

import DesignerCredit from '../components/settings/DesignerCredit';

import VersionCredit from '../components/settings/VersionCredit';

import {
  getObjectKeysHTML,
  getHTMLObjectRows,
  htmlTop,
  htmlBottom,
} from '../components/settings/exportHTML';

// import {
//   loadUserObject,
//   // saveUserObject,
// } from '../storage/UserStorage';

import {
  loadSettingsStorage,
  saveSettingsStorage,
  clearSettingsStorage,
} from '../storage/SettingsStorage';

// import Auth from '@aws-amplify/auth';

// ui colors
import colors from '../../colors';

import styles from '../../styles';

// import { getShortDate } from './functions';

// AWS Amplify
// import Auth from '@aws-amplify/auth';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // top: '5%',
//     // alignItems: 'stretch',
//     // justifyContent: 'center',
//     // backgroundColor: colors.darkTwo,

//     // marginTop: '5%',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },
//   backBtnImage: {
//     width: '100%',
//     height: '100%',
//   },
//   backBtn: {
//     width: 25,
//     height: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// header rectangle
const rectangle5 = {
  flex: 0.05,
  // backgroundColor: colors.dark,

  // marginBottom: '35%',

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
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
  // console.log(data);
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
  // const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(null);

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState(null);

  const [transactions, setTransactions] = useState([]);

  // const [storageKey, setStorageKey] = useState(null);

  const [isReady, setIsReady] = useState(false);

  async function retrieveCognitoUser() {
    // Auth.currentAuthenticatedUser()
    //   .then((cognito) => {
    //     // setUserToken(user.signInUserSession.accessToken.jwtToken);
    //     // console.log('username:', cognitoUser.username);
    //     setStorageKey(cognito.username);

    //     setEmail(cognito.attributes.email);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     Alert.alert(err);
    //   });
  }

  async function retrieveStoredSettingsTransactions(user_storage_key) {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(user_storage_key);

      // set stored user transactions
      if (storageObj) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        if (storageObj.transactions) {
          // found stored image
          // console.log(storageObj.transactions);
          setTransactions(storageObj.transactions);
        }
      }
    } catch (e) {
      // statements
      Alert.alert('Could not load settings');
      // console.log(e);
    }
  }

  const restoreBackedUpData = async () => {
    let success = false;
    const backup_key = `${storageKey}_BACKUPSETTINGS`
    // load stored settings
    try {
      const storage = await loadSettingsStorage(backup_key);

      console.log(storage);
      console.log('Restored from:', backup_key);

      // set stored user transactions
      if (storage && storageKey !== null) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        saveSettingsStorage(storageKey, storage)
        success = true;
      }
    } catch (e) {
      // statements
      Alert.alert('Could not back up settings');
      // console.log(e);
    }

    // if (success) {
    //   Alert.alert('Backup data restored successfully');
    // }
  };




  const backupStoredSettings = async () => {
    let success = false;
    const backup_key = `${storageKey}_BACKUPSETTINGS`
    // load stored settings
    try {
      const storage = await loadSettingsStorage(storageKey);

      // console.log(storage);
      // console.log(backup_key);
      // console.log('Backed up to:', backup_key);

      // set stored user transactions
      if (storage && storageKey !== null) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        saveSettingsStorage(backup_key, storage);
        // console.log(key)
        success = true;
      }
    } catch (e) {
      // statements
      console.log('Could not back up settings');
      // console.log(e);
    }

    // if (success) {
    //   Alert.alert('Data backed up successfully');
    // }
  };

  const backupDataAlert = async () => {
    await Alert.prompt(
      'Backup Data',
      'Are you sure you want to backup all data from the app?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        // Calling resetData
        { text: 'OK', onPress: backupStoredSettings },
      ],
      { cancelable: false },
    );
  };

  // const clearAsyncStorage = async () => {
  //   await AsyncStorage.clear();
  // };

  /*
  * > reset data from the app
  */
  const resetData = async () => {
    // console.log(storageKey);
    clearSettingsStorage(storageKey);
    // await clearAsyncStorage()
    //   .then(() => {
    //     // console.log('Reset complete');
    //     props.navigation.navigate('AuthLoading');
    //   })
    //   .catch((err) => console.log('Error while signing out!', err));
  };

  /*
  * > Confirm reset data
  */
  const resetDataAlert = async () => {
    await Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all data from the app?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        { text: 'OK', onPress: resetData },
      ],
      { cancelable: false },
    );
  };

  const restoreDataAlert = async () => {
    await Alert.alert(
      'Restore Data',
      'Are you sure you want to restore backed up data?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        { text: 'OK', onPress: restoreBackedUpData },
      ],
      { cancelable: false },
    );
  };


  const send = async () => {
    const userObject = await loadSettingsStorage(storageKey);
    // console.log('userObject: ', userObject);
    MailComposer.composeAsync({
      recipients: [global.adminEmailAddress],
      subject: `Contact Support | ${global.appName} ${global.appVersion}`,  // `Issue #${Date.now()}`,
      body: '', // `<p>${userObject.user.username}</p>`,
      attachments: [],
      isHtml: false,
    });
  };

  const sendTransactionsMail = (transactions) => {
    try {
      // statements
      const html = getTransactionsHTML(transactions);

      
      MailComposer.composeAsync({
        recipients: [email],
        subject: 'Exported Transactions',
        body: html,
        attachments: [],
        isHtml: true,
      });

    } catch(e) {
      // statements
      console.log(e);
    }


    // MailComposer.composeAsync({
    //   recipients: [user.email],
    //   subject: 'Exported Transactions',
    //   body: html,
    //   // attachments: [],
    //   isHtml: true,
    // });
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

  // const storeIsLocallyAuthenticated = async (bool) => {
  //   try {
  //     await AsyncStorage.setItem(global.isLocallyAuthenticatedKey, JSON.stringify(bool));
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };


  // const retrieveIsPasscodeEnabled = async () => {

  //   // // Saves to storage as a JSON-string
  //   // AsyncStorage.setItem('isPasscodeEnabled', JSON.stringify(false))

  //   // Retrieves from storage as boolean
  //   // AsyncStorage.getItem('isPasscodeEnabled', function (err, value) {
  //   //     JSON.parse(value) // boolean false
  //   // }

  //   // Or if you prefer using Promises
  //   await AsyncStorage.getItem('isPasscodeEnabled')
  //       .then( function (value) {
  //           JSON.parse(value) // boolean false
  //           if (value === null) {
  //             setIsPasscodeEnabled(false);
  //           }
  //           else if (value) {
  //             // setAuthenticated(true);
  //             setIsPasscodeEnabled(JSON.parse(value));
  //             // console.log(value);
  //           }
  //       })
  // };

  // const storeIsPasscodeEnabled = () => {
  //   if (isPasscodeEnabled !== null) {
  //     // Saves to storage as a JSON-string
  //     AsyncStorage.setItem('isPasscodeEnabled', JSON.stringify(isPasscodeEnabled));
  //     storeIsLocallyAuthenticated(JSON.stringify(!isPasscodeEnabled));
  //   }
  // };

  // async function passcodeBtnPressed() {
  //   setIsPasscodeEnabled(!isPasscodeEnabled);
  //   // storeIsPasscodeEnabled();
  // }

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
    if (transactions.length > 0) {
      sendTransactionsMail(transactions);
    } else {
      Alert.alert('You have no transactions')
    }
  }

  function changePasswordBtnPressed() {
    props.navigation.navigate('ChangePasswordScreen');
  }

  const backupDataBtnPressed = async () => {
    // console.log('Backup Data');
    // await retrieveCognitoUser();
    // backupStoredSettings(storageKey);
    backupDataAlert();
  }

  const restoreBackupDataBtnPressed = async () => {
    restoreDataAlert();
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
    else if (name === 'Backup Data') {
      backupDataBtnPressed();
    }
    else if (name === 'Restore Backup') {
      restoreBackupDataBtnPressed();
    }
  }

  const clearState = async () => {
    // retrieveCognitoUser();
    // console.log('Cleared');
  }

  useEffect(() => {
    if (storageKey) {
      retrieveStoredSettingsTransactions(storageKey);
    }
    return () => {
      // effect
    };
  }, [storageKey]);

  useEffect(() => {
    if (transactions) {
      setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [transactions])

  // useEffect(() => {
  //   // retrieveIsPasscodeEnabled();
  //   // retrieveUser();
  // }, [])

  // useEffect(() => {
  //   if (isPasscodeEnabled !== null) {
  //     console.log('passcode:',isPasscodeEnabled);
  //     storeIsPasscodeEnabled();
  //   }
    
  //   return () => {
  //     // effect
  //   };
  // }, [isPasscodeEnabled])

  const view = (
    <View
      style={styles.container}
    >
        <NavigationEvents
            // try only this. and your component will auto refresh when this is the active component
            onWillFocus={clearState} // {(payload) => clearState()}
            // other props
            // onDidFocus={payload => console.log('did focus',payload)}
            // onWillBlur={payload => console.log('will blur',payload)}
            // onDidBlur={payload => console.log('did blur',payload)}
          />

        <View style={rectangle5} />

   
        <View
          style={
            {
              flex: 0.3,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <ProfileRectangle />
        </View>
   

        <View
          style={
            {
              flex: 0.3,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <SubscriptionRect />
        </View>

        {/* User Options */}

        <View
          style={
            {
              flex: 1,
              // justifyContent: 'center',

              // top: '55%',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <UserOptions
            onPress={onPress}
            // isPasscodeEnabled={isPasscodeEnabled}
          />
        </View>

        <View
          style={
            {
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'center',

              // justifyContent: 'space-around',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
{/*        <View style={
          {
            width: '90%',
            // height: 0.1,
            borderStyle: 'solid',
            borderWidth: 0.5,
            borderColor: colors.dark
          }
        } />*/}
          <View
            style={
              {
                flex: 1,
                alignSelf: 'stretch',
                // justifyContent: 'space-around',
                justifyContent: 'center',

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
                  alignSelf: 'stretch',
                  // justifyContent: 'space-around',
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

          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }}
          >

              <BlueButton title="Rate Us" onPress={() => rateUsBtnPressed()} />

              {/*<BlueButton title="Share Us" onPress={() => shareBtnPressed()} />*/}

          </View>

          <View style={{
            flex: 1,
            justifyContent: 'center',


            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }}
          >
            <VersionCredit />
          </View>
        </View>
    </View>
  );

  return view;
}

Settings.navigationOptions = ({ navigation }) => {

  // Sign out from the app
  const signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app? You will need internet access to sign back in and recover your data!',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        // Calling signOut
        { text: 'OK', onPress: () => signOut() },
      ],
      { cancelable: false },
    );
  };
  // Confirm sign out
  const signOut = async () => {
    await Auth.signOut()
      .then(() => {
        // console.log('Sign out complete');
        navigation.navigate('AuthLoading');
      })
      .catch((err) => console.log('Error while signing out!', err));
  };

  const navbar = {
    title: 'Settings',
    // headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,

    },
    headerTintColor: colors.white,


/*    headerRight: (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8,
          width: '100%',
          height: '100%',
        }}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => backBtnPressed()}>
          <View style={combinedShape}>
            <Image source={global.xIconWhite} style={styles.backBtnImage} />
          </View>
        </TouchableOpacity>
      </View>
    ),
*/
    // headerTitleStyle: {
    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'solid',
    // },

/*    headerLeft: (
      <View style={
        {
          // width: '100%',
          // height: '100%',

          justifyContent: 'center',
          // alignItems: 'center',

          marginHorizontal: 14,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
        <TouchableOpacity onPress={signOutAlert}>
          <Text
            style={
              {
                // width: 42,
                height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                color: colors.pinkRed,
              }
            }
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    ),*/

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
