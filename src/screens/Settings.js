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
            03/29/2020 10:49 AM | Fixed flash messages to not break app
*/

import React, { useState, useEffect } from 'react';

import { Linking } from 'expo';

import PropTypes from 'prop-types';

import { withNavigation } from 'react-navigation';

import SignIn from './SignInScreen'

import { showMessage, hideMessage } from "react-native-flash-message";

// import NetInfo from "@react-native-community/netinfo";

import Dialog from 'react-native-dialog';

import {
  loadSettingsStorage,
  saveSettingsStorage,
  compareListTransactions,
  retrieveOnlineTransactions,
  pushAllTransactionsToCloud,
} from '../storage/SettingsStorage';

import {
  // StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  AsyncStorage,
  Alert,
  Share,
} from 'react-native';

/* my custom queries */
import {
  // updateTransaction,
  // removeTransaction,
  // removePayee,
  // removeCategory,
  // savePayee,
  // saveCategory,
  saveTransaction,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
} from '../storage/my_queries';

// // import the Analytics category
// import Analytics from '@aws-amplify/analytics';

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

import Auth from '@aws-amplify/auth'; // AWS Amplify

import colors from '../../colors'; // ui colors

import styles from '../../styles';

import uuidv4 from '../functions/uuidv4';

import { isDeviceOnline } from '../../network-functions';

// import { } from 'Utils';

// import { getShortDate } from './functions';

// header rectangle
const rectangle5 = {
  flex: 0.05,
  // backgroundColor: colors.dark,

  // marginBottom: '35%',

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

function getTransactionsHTML(data) {
  // console.log(data);
  let html = '';

  const keys = `${getObjectKeysHTML(data)}`;
  // console.log('keys: ', keys);

  const objectRows = getHTMLObjectRows(data);
  // console.log('objectRows: ', objectRows);

  const table = `
<div>
<table style="width:100%">
<tr>
${keys}
</tr>
${objectRows}
</table>

</div>${'\n'}
`;

  html = htmlTop + table + htmlBottom;
  // console.log(html);
  return html;
}

// export const isDeviceOnline = async () => {
//   let bool = false;
//   await NetInfo.fetch().then(state => {
//     bool = state.isConnected;
//     // console.log("Connection type", state.type);
//     console.log("Is connected?", state.isConnected);
//   });
//   return bool;
// };

function Settings(props) {
  // const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(null);
  const { navigation } = props;

  // const [user, setUser] = useState(null);

  // const [email, setEmail] = useState(null);

  const [currentTransactions, setCurrentTransactions] = useState([]);

  // // const [storageKey, setStorageKey] = useState(null);

  // const [isReady, setIsReady] = useState(false);

  const [isBackupDisabled, setIsBackupDisabled] = useState(false);

  const [isRestoreDisabled, setIsRestoreDisabled] = useState(false);

  const [currentSettingsVersion, setCurrentSettingsVersion] = useState(0);

  const [optionOpacity, setOptionOpacity] = useState(1.0)

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [isUserOnline, setIsUserOnline] = useState(false);

  const [shouldShowResetDialog, setShowResetDialogBox] = useState(false);

  const [input, setInput] = useState('');

  const [textColor, setTextColor] = useState(colors.offWhite);

  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);

  const [currentOwner, setCurrentOwner] = useState('');

  const [shouldShowOfflineDialogBox, setShouldShowOfflineDialogBox] = useState(false);

  const [shouldShowCloudSyncDialogBox, setShouldShowCloudSyncDialogBox] = useState(false);

  const [shouldShowUpdateCloudDialogBox, setShouldShowUpdateCloudDialogBox] = useState(false);

  const [isExportingTransactions, setIsExportingTransactions] = useState(false);

  const findArrayDifferences = (otherArray) => {
    return (current) => {
      return otherArray.filter((other) => {
        return other.id === current.id // && other.version === current.version
      }).length === 0;
    }
  }

  const crossDeviceSync = async () => {
    // developer debugging only let this user sync
    if (currentOwner !== '056049d7-ad75-4138-84d6-5d54db151d83') return;

    // check if user is online
    let bool = await isDeviceOnline();
    if (bool !== true) return;

    // check if user has device sync enabled
    if (!global.isDeviceCrossSyncOn || global.isDeviceCrossSyncOn !== true) return;

    // compare both transaction lists
    let online_transactions = []; // online trans
    let local_transactions = [];  // local trans in device storage

    try {
      // get user's local transactions
      let storage = await loadSettingsStorage(global.storageKey);
      local_transactions = storage.transactions;
      console.log('local_transactions.length: ', local_transactions.length);
      // console.log('local_transactions: ', local_transactions);

       // get user's online transactions
      online_transactions = await retrieveOnlineTransactions();
      console.log('online_transactions.length: ', online_transactions.length);
      // console.log('online_transactions: ', online_transactions);

      // check for local transactions that dont exist in online transactions yet
      // ie: offline-mode transactions
      const onlyInLocal = local_transactions.filter(findArrayDifferences(online_transactions));
      const onlyInOnline = online_transactions.filter(findArrayDifferences(local_transactions));

      // only upload new local transactions; not all of them
      if (onlyInLocal.length > 0) {
        for (var i = onlyInLocal.length - 1; i >= 0; i--) {
          // console.log('onlyInLocal[i]: ', onlyInLocal[i]);
          saveTransaction(onlyInLocal[i]);
        }
      }

      // add new online transactions to local transactions  on to user's device
      storage.transactions = local_transactions.concat(onlyInOnline);
      // console.log('storage.transactions.length: ', storage.transactions.length);

      // save storage transactions to device storage
      saveSettingsStorage(storageKey, storage);
    } catch(crossDeviceSyncError) {
      // throw new Error('Error performing crossDeviceSync:', e);
      console.log('crossDeviceSyncError: ', crossDeviceSyncError);
    }
    // go back to user home screen
    navigation.navigate('Home');
  }


  const crossDeviceSyncDialogBox = (
    <View>
      <Dialog.Container headerStyle={{
          // backgroundColor: 'pink',
          // backgroundColor: colors.dark,
        }}
        contentStyle={{
          // backgroundColor: colors.dark,
        }}
        footerStyle={
          {
            // backgroundColor: colors.dark,
          }
        }
        visible={true}
        >
        <Dialog.Title>Sync This Device</Dialog.Title>
        <Dialog.Description>
          With cross-device sync you can access your transactions on any device.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShouldShowCloudSyncDialogBox(false)} />
        <Dialog.Button label="Sync Now" onPress={() => {
          setShouldShowCloudSyncDialogBox(false)
          global.isDeviceCrossSyncOn = true
          crossDeviceSync();
        }} />
      </Dialog.Container>
    </View>
  );

  // // create an event handler
  // const recordBtnPress = () => {
  //   Analytics.record({
  //     name: "Button Clicked!",
  //     attributes: { username: currentOwner }
  //   });
  // }


  // async function retrieveCognitoUser() {
  //   // Auth.currentAuthenticatedUser()
  //   //   .then((cognito) => {
  //   //     // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //   //     // console.log('username:', cognitoUser.username);
  //   //     setStorageKey(cognito.username);

  //   //     setEmail(cognito.attributes.email);
  //   //   })
  //   //   .catch((err) => {
  //   //     // console.log(err);
  //   //     Alert.alert(err);
  //   //   });
  // }

  const dialogBox = (
  <View>
    <Dialog.Container visible={true}>
      <Dialog.Title>Offline</Dialog.Title>
      <Dialog.Description>
        Cannot sync without internet connection
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => setShouldShowOfflineDialogBox(false)} />
      <Dialog.Button label="Ok" onPress={() => setShouldShowOfflineDialogBox(false)} />
    </Dialog.Container>
  </View>
);

    const updateCloudDialogBox = (
  <View>
    <Dialog.Container visible={true}>
      <Dialog.Title>Update Cloud</Dialog.Title>
      <Dialog.Description>
        Update this data across all devices?
      </Dialog.Description>
      <Dialog.Button label="No" onPress={() => {
        setShouldShowUpdateCloudDialogBox(false)
        props.navigation.navigate('Home');
      }} />
      <Dialog.Button label="Yes" onPress={() => {
        // update transactions in cloud
        pushAllTransactionsToCloud();
        props.navigation.navigate('Home');
      }} />
    </Dialog.Container>
  </View>
);



  function handleFirstConnectivityChange(isConnected) {
    // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  function retrieveStoredSettings() {
    Auth.currentAuthenticatedUser()
    .then(async (cognito) => {
      const storage = await loadSettingsStorage(global.storageKey);
      
      setCurrentOwner(storage.user.id);

      // setCategories(storage.categories);

      setCurrentTransactions(storage.transactions);

      // setCurrentSettingsVersion(storage.version);

      setIsUserLoggedIn(true); // cognito (logged in)
    })
    .catch(async (auth_error) => {
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
   
        setCurrentOwner(userObject.user.id);

        setCurrentTransactions(userObject.transactions);

        // setCurrentSettingsVersion(userObject.version);

        setIsUserLoggedIn(false); //  local (not logged in)

        // showMessage({
        //   message: `You are ${auth_error}`,
        //   type: 'danger', // "success", "info", "warning", "danger"
        //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
        // });  
    });
  }

  const restoreBackUpData = async () => {
    let success = false;
    // let backup_key = `${storageKey}_BACKUP_SETTINGS`
    // console.log('backup_key: ', backup_key);
    // load backed up user settings

    try {
      let storage = await loadSettingsStorage(global.storageKey);

      // global.storageKey = storageObj.user.id

      let backup_key = `${storage.user.id}_BACKUP_SETTINGS`
      // console.log('backup_key: ', backup_key);

      storage = await loadSettingsStorage(backup_key);

      if (storage !== null && storageKey !== null) {
        
        // console.log('stored user settings transactions:', storageObj.transactions);
        saveSettingsStorage(storageKey, storage);

        setCurrentSettingsVersion(storage.version)

        success = true;

        setIsRestoreDisabled(true);

        setIsBackupDisabled(false)

        setShouldShowUpdateCloudDialogBox(true);

        // props.navigation.navigate('Home');
      }
    } catch (e) {
      // statements
      // Alert.alert('Could not back up settings');
      console.log('e: ', e);
      // console.log(e);
    }
  };

  const backupStoredSettings = async () => {
    let success = false;
    // const backup_key = `${storageKey}_BACKUPSETTINGS`

    // load stored settings
    try {
      const storageObj = await loadSettingsStorage(storageKey);

      let backup_key = `${storageObj.user.id}_BACKUP_SETTINGS`
      // console.log('backup_key: ', backup_key);

      // set stored user transactions
      if (storageObj !== null && storageKey !== null) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        saveSettingsStorage(backup_key, storageObj);
        // console.log(key)
        success = true;

        setShouldShowUpdateCloudDialogBox(true)

        // setIsBackupDisabled(true);

        // setIsRestoreDisabled(false);
      }
    } catch (e) {
      // statements
      console.log('Could not back up settings', e);
      // console.log(e);
    }

    // if (success) {
    //   Alert.alert('Data backed up successfully');
    // }

    // UPDATE CURRENT SETTINGS TO THIS BACKUP DATA !!!
    if (success) {
      // restoreBackUpData();
      showBackupCompleteAlert();
    }
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

  function showResetCompleteAlert() {
    // Alert.alert(
    //  'Reset Complete',
    //  'All your data is gone.'
    // );
    showMessage('All your data is gone.');
  }

  function showBackupCompleteAlert() {
    // Alert.alert(
    //  'Backup Complete',
    //  'Your data has been backed up!',
    // );
    showMessage('Your data has been backed up!')
  }

  function showRestoreCompleteAlert() {
    // Alert.alert(
    //  'Backup Restored',
    //  'Your data has been restored!',
    // );
    showMessage('Your data has been restored!');
  }

  function showMailSenderFailedAlert(text) {
    Alert.alert(
     'Mail Sender',
     text
    );
  }

  // const clearAsyncStorage = async () => {
  //   await AsyncStorage.clear();
  // };

  useEffect(() => {
    if (input === 'DELETE') {
      setTextColor(colors.pinkRed);
      setIsOkBtnDisabled(false);
    }
    else {
      setTextColor(colors.offWhite);
      setIsOkBtnDisabled(true);
    }    
    return () => {
      // effect
    };
  }, [input])

  /*
  * > reset data from the app
  */
  const resetData = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          if (store[i][0] === (global.storageKey)) {
            // remove items with username key
            // console.log({ [store[i][0]]: store[i][1] });
            AsyncStorage.removeItem(store[i][0]) // Remove Settings Storage
          } else if (store[i][0] === (global.storageKey + '_BACKUP_SETTINGS')) {
            // remove backups with username key
            AsyncStorage.removeItem(store[i][0]) // Remove Backups
          }
          return true;
        });
      });
    });
    navigation.navigate('AuthLoading');
  };

  const resetDataDialogBox = (
    <View
      style={
        {
          flex: 1,
          position: 'absolute',

          top:  0,
          left:  0,
          right: 0,
          bottom: 25,

          // borderWidth: 1,
          // borderColor: 'red',
          // borderStyle: 'solid',
        }
      }
    >
      <Dialog.Container
        // blurComponentIOS={blurComponentIOS}
        headerStyle={{
          // backgroundColor: 'pink',
          backgroundColor: colors.dark,
        }}
        contentStyle={{
          backgroundColor: colors.dark,
        }}
        footerStyle={
          {
            backgroundColor: colors.dark,
          }
        }
        buttonSeparatorStyle={
          // {
          //   backgroundColor: 'red',
          // }
          styles.seperator
        }
        // style={{
        //   backgroundColor: colors.dark,
        // }}
        visible={shouldShowResetDialog}
      >
        <Dialog.Title style={
         [
           styles.textStyle,
           {
             fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
             fontWeight: '600',
             fontSize: 17,
           }
         ]
        }>Remove all data from this device?</Dialog.Title>
        <Dialog.Description style={
          [
            {
              // backgroundColor: colors.dark,
            },
            styles.textStyle,
            {
              color: colors.darkTwo,
            }
          ]
        }
        >
          
        Please type DELETE'
        </Dialog.Description>
        <Dialog.Input
          style=
          { 
            [
              // styles.input,
              // styles.itemStyle,
              {
                marginBottom: 20,
                textAlign: 'center',
                borderWidth: 1,
                borderColor: colors.white, // colors.dark,
                borderStyle: 'solid',
                borderRadius: 19,

                color: textColor,

                opacity: 0.9,
              }
            ]
          }
          onChangeText={(text) => {
            setInput(text)
          }}
          maxLength={'DELETE'.length}
          autoCorrect
          value={input}
          // autoFocus
        />
        <Dialog.Button
          style={
            styles.buttonText
            // {
            //   color: (isOkBtnDisabled) ? colors.offWhite : colors.white,
            // }
          }
          onPress={() => {
            setShowResetDialogBox(false);
          }}
          label="Cancel"
        />
        <Dialog.Button
          style={[
            styles.buttonText,
            {
              color: (isOkBtnDisabled) ? colors.offWhite : colors.white,
            }
          ]}
          onPress={resetData}
          label="Ok"
          disabled={isOkBtnDisabled}
        />
      </Dialog.Container>
    </View>
  );

  // Reset Data Alert
  const resetDataAlertPrompt = () => {
    // RESET DATA PROMPT
    

    if (Platform.OS === 'ios') {
      // user on ios
      Alert.prompt(
        'Remove all data from this device?',
        'Please type DELETE',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {
            text: 'OK',
            onPress: (input)=> {
              if (input === 'DELETE') {
                resetData();
              }
            }
          },
        ],
        // 'secure-text',
        // 'login-password',
        'plain-text',
      );

    } else {
      //  user on android
      setShowResetDialogBox(true);
    }
  };

  const restoreDataAlert = () => {
    Alert.alert(
      'Restore Backup Data',
      'Are you sure you want to restore your most recent backup data?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        { text: 'OK', onPress: restoreBackUpData },
      ],
      { cancelable: false },
    );
  };


  const sendContactSupportEmail = async () => {

    const userObject = await loadSettingsStorage(storageKey);
    // console.log('userObject: ', userObject);
    try {
      await MailComposer.composeAsync({
        recipients: [global.adminEmailAddress],
        subject: `Contact Support | ${global.appName} ${global.appVersion}`,  // `Issue #${Date.now()}`,
        body: '', // `<p>${userObject.user.username}</p>`,
        attachments: [],
        isHtml: false,
      });
    } catch(err) {
      // could not send to Mail
      console.log('err: ', err.message);
      showMailSenderFailedAlert(err.message);
    }
  };

  const sendTransactionsMail = async (transactions) => {
      const html = getTransactionsHTML(transactions);
      console.log('html: ', html);
      try {
        await MailComposer.composeAsync({
            recipients: [email],
            subject: 'Exported Transactions',
            body: html.replace('\n', ''),
            attachments: [],
            isHtml: true,
          });
      } catch(err) {
        // could not send to Mail
        console.log('err: ', err.message);
        showMailSenderFailedAlert(err.message);
      }

    // MailComposer.composeAsync({
    //   recipients: [user.email],
    //   subject: 'Exported Transactions',
    //   body: html,
    //   // attachments: [],
    //   isHtml: true,
    // });
  };

  const getKeys = (obj) => {
    let keys = []
    Object.keys(obj).forEach((key) => {
      // parse the nested object's properties
      if (key) {
        keys.push(`${key}`);
      }
    });
    return keys;
  }

  const directToAppStoreDownload =  () => {
    Linking.openURL('https://apps.apple.com/us/app/financely/id1491309602')
    // Share.share({
    //   message:  '',
    // url: Linking.openURL('https://apps.apple.com/us/app/financely/id1491309602'), // Expo.Linking.makeUrl() ,
    //   // url: Linking.openURL('https://apps.apple.com/us/app/financely/id1491309602'), // Expo.Linking.makeUrl(),
    //   // title: 'Sufiyaan has invited you to join this activity',
    // })
    // .then((result) =>{
    //   console.log(result)
    //     if(result === 'dismissedAction'){
    //       return
    //     }
    // })
    // .catch((error) => console.log(error))
  }


  const onClick = () => {


    Share.share({
      ...Platform.select({
        ios: {
          // message: 'Have a look on : ',
          message: `Download ${global.appName} at : \n${'https://apps.apple.com/us/app/financely/id1491309602/'}`,  // this.props.url
          url: 'https://apps.apple.com/us/app/financely/id1491309602'  // this.props.url,
        },
        android: {
          message: `Download ${global.appName} at : \n` + 'https://apps.apple.com/us/app/financely/id1491309602/'  // this.props.url
        }
      }),
      title: 'Wow, did you see that?'
    }, {
      ...Platform.select({
        ios: {
          // iOS only:
          excludedActivityTypes: [
            // 'com.apple.UIKit.activity.PostToTwitter'
          ]
        },
        android: {
          // Android only:
          dialogTitle: `Share : ${global.appName}`
        }
      })
    });
  }

  const onExport = async () => {
    if (!currentTransactions || currentTransactions.length <= 0) {
      showMessage('You have no transactions');
      return
    }
      try {
        const result = await Share.share({
          title: 'My Transactions',
          subject: 'My Transactions',
          // tintColor: 'dark',
          message: JSON.stringify(currentTransactions, getKeys(currentTransactions[0]), 4),
        });

        console.log('result: ', result);

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
            // console.log('result.activityType: ', result.activityType);
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log('error.message: ', error.message);
      }
  };

  const onShare = async () => {

    onClick()
    
    // onExport()

    // return
    // // if (!currentTransactions || currentTransactions.length <= 0) return
    // console.log('currentTransactions: ', currentTransactions);
    
    // try {
    //   const result = await Share.share({
    //     message: 'React Native | A framework for building native apps using React',
    //   });

    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
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
    resetDataAlertPrompt();
  }

  const rateUsBtnPressed = async () => {
    // store review
    StoreReview.requestReview();
    // AsyncStorage.setItem('hasRatedUs', String(true));
  };

  function contactSupportBtnPressed() {
    // send contact support email
    sendContactSupportEmail();
  }

  // function termsOfServiceBtnPressed() {
  //   props.navigation.navigate('Terms');
  // }

  function shareBtnPressed() {
    onShare((text) => {
      console.log('text: ', text);
    })
    // console.log('Share button pressed');
  }

  function exportBtnPressed() {
    
    onExport();
  }

  function changePasswordBtnPressed() {
    props.navigation.navigate('ChangePasswordScreen');
  }

  function signInBtnPressed() {
    // console.log(props.navigation);
    // AsyncStorage.removeItem('userToken')
    props.navigation.navigate('SignIn')
    // props.navigation.popToTop();
  }

  const backupDataBtnPressed = async () => {
    backupDataAlert();
  }

  const restoreBackupDataBtnPressed = async () => {
    restoreDataAlert();
  }

  // console.log('currentOwner: ', currentOwner);
  const crossDeviceSyncBtnPressed = async () => {
    // check if user online
    const online = await isDeviceOnline();
    if (online !== true) {
      setShouldShowOfflineDialogBox(true);
      return;
    }

    // check if user logged in
    if (!isUserLoggedIn) return;

    // alert => would you like to sync transactions in the cross-device with this device?
    setShouldShowCloudSyncDialogBox(true);
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
    }
    else if (name === 'Change Password/Sign Out') {
      changePasswordBtnPressed();
    }
    else if (name === 'Sign In') {
      signInBtnPressed();
    }
    else if (name === 'Sync This Device') {
      crossDeviceSyncBtnPressed();
    }
    else if (name === 'Reset Device Data') {
      resetDataBtnPressed();
    } else if (name === 'Customize Categories') {
      customizeCategoriesBtnPressed();
    }
    else if (name === 'Backup Data') {
      backupDataBtnPressed();
    }
    else if (name === 'Restore Backup Data') {
      restoreBackupDataBtnPressed();
    }
  }
  const checkConnectivity = async () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      // console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      {
        // isConnected ? showFlashMessage('Online') : showFlashMessage('Offline');
        isConnected ? null : showMessage('You are currently offline');
      }
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  // useEffect(() => {
  //   checkConnectivity();
  //   retrieveStoredSettings();
  // }, []);

  useEffect(() => {
    if (currentSettingsVersion) {
      // console.log('currentSettingsVersion: ', currentSettingsVersion);
    }
  }, [currentSettingsVersion]);

  // useEffect(() => {
  //   if (transactions) {
  //     setIsReady(true);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [transactions])

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
    {
      shouldShowOfflineDialogBox && dialogBox
    }
    {
      shouldShowCloudSyncDialogBox && crossDeviceSyncDialogBox
    }
        <NavigationEvents
            // try only this. and your component will auto refresh when this is the active component
            onWillFocus={retrieveStoredSettings} // {(payload) => checkConnectivity()}
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
            }
          }
        >
          <ProfileRectangle />
        </View>
   

        <View
          style={
            {
              flex: 0.3,
              justifyContent: 'center',
            }
          }
        >
          {
            <SubscriptionRect
            onPress={() => {
              if (!isUserLoggedIn) {
                navigation.navigate('SignUp')
              } else {
                directToAppStoreDownload()
              }
            }}
            isUserLoggedIn={isUserLoggedIn}
            isUserOnline={async () => await isDeviceOnline()}
          />
          }
        </View>

        {/* User Options */}
        <View
          style={
            {
              flex: 1,
            }
          }
        >
          <UserOptions
            onPress={onPress}
            isBackupDisabled={isBackupDisabled}
            optionOpacity={optionOpacity}
            isRestoreDisabled={isRestoreDisabled}
            currentSettingsVersion={currentSettingsVersion}
            isUserLoggedIn={isUserLoggedIn}
          />
        </View>

        <View
          style={
            {
              flex: 0.5,
              alignItems: 'center',
            }
          }
        >
          <View
            style={
              {
                flex: 1,
                alignSelf: 'stretch',
              }
            }
          >

            <View
              style={
                {
                  flex: 1,
                  padding: 4,
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
            // alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >

              
                <BlueButton title="Rate Us" onPress={() => rateUsBtnPressed()} /><BlueButton title="Share Us" onPress={() => {
                  shareBtnPressed()
                }} />
              


          </View>

          <View style={{
            flex: 1,
          }}
          >
            <VersionCredit />
          </View>
        </View>
        {
          shouldShowResetDialog && resetDataDialogBox
        }
        {
          // shouldShowUpdateCloudDialogBox && isUserLoggedIn && updateCloudDialogBox
        }
        {
          isExportingTransactions && <ActivityIndicator color="#ddd" size="large" />
        }
    </View>
  );

  return view;
}

Settings.navigationOptions = ({ navigation }) => {
  let signOutBtn = null
  // let signOutBtn = (
  //   <View style={
  //     {
  //       width: '100%',
  //       height: '100%',

  //       justifyContent: 'center',
  //       alignItems: 'center',

  //       marginRight: 14,

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
  // );

  // Sign out from the app
  const signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app? You will need internet access to sign back in and recover your data!',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        // Calling signOut
        { text: 'OK', onPress: () => {
          signOut()} },
      ],
      { cancelable: false },
    );
  };
  // Confirm sign out
  const signOut = async () => {
    await Auth.signOut()
      .then(async () => {
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

    headerRight: signOutBtn,

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


export default withNavigation(Settings);
