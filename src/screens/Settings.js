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

import { withNavigation, NavigationEvents } from 'react-navigation';

// import SignIn from './SignInScreen';

import { showMessage } from 'react-native-flash-message';

// import NetInfo from "@react-native-community/netinfo";

import Dialog from 'react-native-dialog';

import {
  loadSettingsStorage,
  saveSettingsStorage,
  // compareListTransactions,
  retrieveOnlineTransactions,
  // retrieveOnlineCategories,
  // pushAllTransactionsToCloud,
} from '../storage/SettingsStorage';

import {
  // StyleSheet,
  ActivityIndicator,
  View,
  // ScrollView,
  // Button,
  // TouchableOpacity,
  // Text,
  // Image,
  // TextInput,
  // SafeAreaView,
  AsyncStorage,
  Alert,
  Share,
} from 'react-native';

/* my custom queries */
import {
  // updateTransaction,
  DeleteTransaction,
  // removePayee,
  removeCategory,
  // savePayee,
  // saveCategory,
  // saveTransaction,
  updateCategory,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
} from '../storage/my_queries';

import defaultCategories from '../data/categories';

// // import the Analytics category
// import Analytics from '@aws-amplify/analytics';

// import { Ionicons } from 'expo-vector-icons';

import * as StoreReview from 'expo-store-review';

import * as MailComposer from 'expo-mail-composer';

// import { TouchableOpacity } from 'react-native-gesture-handler';

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

import Category from '../models/Category';

import Auth from '@aws-amplify/auth'; // AWS Amplify

import colors from '../../colors'; // ui colors

import styles from '../../styles';

// import uuidv4 from '../functions/uuidv4';

import { isDeviceOnline } from '../../network-functions';

// import searchByName from '../functions/searchByName';

// import searchByID from '../functions/searchByID';

import {
  // getHasRatedUs,
  // getIsBackedUp,
  // setHasRatedUs,
  setIsBackedUp,
  // getIsDeviceSyncOn,
  // setIsDeviceSyncOn,
  getAuthentication,
} from '../../globals';


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

// const findArrayDifferences = (otherArray) => {
//   return (current) => {
//     return otherArray.filter((other) => {
//       return other.id === current.id; // && other.version === current.version
//     }).length === 0;
//   };
// };

// const storeUserCategories = async (list) => {
//   try {
//     const storage = await loadSettingsStorage(global.storageKey);

//     storage.categories = list;

//     saveSettingsStorage(global.storageKey, storage);
//   } catch (error) {
//     // statements
//     console.log('storeUserCategories error:', error);
//   }
// };

// const setIsBackedUp = (bool) => {
//   // Saves to storage as a JSON-string
//   AsyncStorage.setItem('isBackedUp', JSON.stringify(bool));
//   global.isBackedUp = bool
// }

// const getIsBackedUp = async () => {
//   // Retrieves from storage as boolean
//   let value = await AsyncStorage.getItem('isBackedUp')

//   global.isBackedUp = value
//   return value // boolean false
// };

// const setHasRatedUs = (bool) => {
//   // Saves to storage as a JSON-string
//   AsyncStorage.setItem('hasRatedUs', JSON.stringify(bool));
//   global.hasRatedUs = bool;
// }

// const getHasRatedUs = async () => {
//   // Retrieves from storage as boolean
//   let value = await AsyncStorage.getItem('hasRatedUs');

//   global.hasRatedUs = value;
//   return value // boolean false
// };

function Settings(props) {
  // const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(null);
  const { navigation } = props;

  // const [user, setUser] = useState(null);

  // const [email, setEmail] = useState(null);

  const [currentTransactions, setCurrentTransactions] = useState([]);

  // // const [storageKey, setStorageKey] = useState(null);

  const [isReady, setIsReady] = useState(false);

  const [isBackupDisabled, setIsBackupDisabled] = useState(false);

  const [isRestoreDisabled, setIsRestoreDisabled] = useState(false);

  const [currentSettingsVersion, setCurrentSettingsVersion] = useState(0);

  const [optionOpacity, setOptionOpacity] = useState(1.0)

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(global.authenticated);

  const [isUserOnline, setIsUserOnline] = useState(false);

  const [shouldShowResetDialog, setShowResetDialogBox] = useState(false);

  const [input, setInput] = useState('');

  const [textColor, setTextColor] = useState(colors.offWhite);

  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);

  const [currentOwner, setCurrentOwner] = useState(global.storageKey);

  // const [shouldShowOfflineDialogBox, setShouldShowOfflineDialogBox] = useState(false);

  const [shouldShowCloudSyncDialogBox, setShouldShowCloudSyncDialogBox] = useState(false);

  const [shouldShowUpdateCloudDialogBox, setShouldShowUpdateCloudDialogBox] = useState(false);

  const [isExportingTransactions, setIsExportingTransactions] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);

  const [isExportTransactionsDisabled, setIsExportTransactionsDisabled] = useState(false);

  const [isSyncBtnEnabled, setIsSyncBtnEnabled] = useState(true);

  const [isDeviceSyncOnText, setIsDeviceSyncOnText] = useState('')






  const spinner = (
    <View
      style={
        {
          // flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ddd',
          opacity: 0.1,

        }
      }
    >
      <ActivityIndicator style={{
        position: 'absolute',
        top: 70,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }} size="large" color="gray" />
    </View>
  );

  const pushAllCategoriesToCloud = async () => {
    try {
      const storage = await loadSettingsStorage(global.storageKey);
      // console.log('local_transactions: ', local_transactions);

     for (var i = 0; i < storage.categories.length; i++) {
        // /* Create New Category */
        const category = new Category(
          storage.categories[i].id, // id
          storage.categories[i].name, // name
          storage.categories[i].color, // color
          storage.categories[i].type, // type
          currentOwner, // owner
          storage.categories[i].version, // version
        );

        updateCategory(category);

      // saveCategory(storage.categories[i])
        // console.log('storage.transactions[i]: ', storage.transactions[i]);
     }

    } catch(e) {
      // statements
      console.log(e);
    }
  }

  const compareListTransactions = async () => {
    // load online transactions
    let online_transactions = await retrieveOnlineTransactions();
    console.log('online_transactions.length: ', online_transactions.length);


    // load local transactions
    let local_transactions = [] // = await retrieveLocalTransactions();
    let storage = await loadSettingsStorage(global.storageKey);
    local_transactions = storage.transactions;
    // console.log('local_transactions.length: ', local_transactions.length);

    var props = ['id', 'version'];

    var result = local_transactions.filter(function(o1){
        // filter out (!) items in online_transactions
        return online_transactions.some(function(o2){
            return (o1.id === o2.id) && (o1.version < o2.version);          // assumes unique id
        });
    }).map(function(o){
        // objects with only the required properties
        // and map to apply this to the filtered array as a whole
        return props.reduce((newo) => {
            newo = o;
            return newo;
        }, {});
    });

    console.log('result: ', result);

    /* Filter Out Updated Trans then replace in local db */
    // result.forEach(async (element) => {
    //   // console.log('element.id: ', element.id);
    //   // console.log('element.version: ', element.version);

    //   // date for the new transaction to store
    //   let data = await getTransactionByID(element.id); // retrieve newly created from online trans by id

    //   // console.log('data: ', data);
    //   const transaction = {
    //     id: element.id,
    //     amount: element.amount,
    //     category: {
    //       id: data.category.id,
    //       name: data.category.name,
    //       color: data.category.color,
    //       type: data.category.type,
    //       owner: element.category.owner,
    //       version: data.category.version,
    //     },
    //     payee: (data.payee && (data.payee.name !== '' && data.payee.name !== null)) ? data.payee : {
    //       id: element.payee.id,
    //       name: element.payee.name,
    //       owner: element.owner,
    //       version: element.payee.version
    //     },
    //     // {
    //     //   id: data.payee.id,
    //     //   name: data.payee.name + '*',
    //     //   owner: data.payee.owner,
    //     //   version: data.payee.version,
    //     // },
    //     owner: data.owner,
    //     type: data.type,
    //     date: new Date(data.date),
    //     note: (data.note && data.note !== 'null') ? data.note : '',
    //     version: data.version,

    //   }
    //   // console.log('transaction: ', transaction);

      


    //   /* REPLACE LESSER VERSIONS OF TRANSACTION LOCALLY */
    //   // DeleteTransaction(transaction);
    // });

    return result;
  }

// const storedNewTransaction =  async (transaction) => {
//     const userObject = await loadSettingsStorage(global.storageKey);

//     let list = userObject.transactions;

//     list = [...list,transaction];

//     userObject.transactions = list;

//     // console.log('list: ', list);

//     saveSettingsStorage(global.storageKey, userObject);

// };



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

  // const dialogBox = (
  //   <View>
  //     <Dialog.Container visible={shouldShowOfflineDialogBox}>
  //       <Dialog.Title>Offline</Dialog.Title>
  //       <Dialog.Description>
  //         Cannot sync without internet connection
  //       </Dialog.Description>
  //       <Dialog.Button label="Cancel" onPress={() => setShouldShowOfflineDialogBox(false)} />
  //       <Dialog.Button label="Ok" onPress={() => setShouldShowOfflineDialogBox(false)} />
  //     </Dialog.Container>
  //   </View>
  // );


  // function handleFirstConnectivityChange(isConnected) {
  //   // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  //   NetInfo.isConnected.removeEventListener(
  //     'connectionChange',
  //     handleFirstConnectivityChange
  //   );
  // }

  // useEffect(() => {
  //   // alert(global.isDeviceSyncOn)
  //   setIsDeviceSyncOnText((String(global.isDeviceSyncOn) === 'true') ? 'On' : 'Off');
  //   return () => {
  //     // effect
  //   };
  // }, [isDeviceSyncOn]);

  async function retrieveStoredSettings() {
    // global.isDeviceSyncOn = await getIsDeviceSyncOn()
    setIsReady(false)

    const storage = await loadSettingsStorage(global.storageKey);



    // alert(global.isDeviceSyncOn);

    // alert(global.isDeviceSyncOn)
    // setIsDeviceSyncOnText(String(global.isDeviceSyncOn) === 'true' ? 'On' : 'Off');

    // setIsDeviceSyncOnText((global.isDeviceSyncOn === true) ? 'On' : 'Off');

    await Auth.currentAuthenticatedUser()
    .then(async (cognito) => {
      
      
      setCurrentOwner(storage.user.id);

      global.storageKey = storage.user.id

      AsyncStorage.setItem('storageKey', (global.storageKey))

      // setCategories(storage.categories);

      setCurrentTransactions(storage.transactions);

      // setCurrentSettingsVersion(storage.version);

      global.authenticated = true

      AsyncStorage.setItem('authenticated', JSON.stringify(true))

      setIsUserLoggedIn(global.authenticated); // cognito (logged in)

      setIsExportTransactionsDisabled(false);

      // global.isUserAuthenticated = false



    })
    .catch(async (auth_error) => {
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
   
        setCurrentOwner(userObject.user.id);

        global.storageKey = userObject.user.id

        AsyncStorage.setItem('storageKey', (global.storageKey))

        setCurrentTransactions(userObject.transactions);

        // setCategories(userObject.categories);

        // setCurrentSettingsVersion(userObject.version);

        global.authenticated = false

        AsyncStorage.setItem('authenticated', JSON.stringify(false))

        setIsUserLoggedIn(global.authenticated); // local (not logged in)

        setIsExportTransactionsDisabled(true);

        // global.isUserAuthenticated = false

        // showMessage({
        //   message: `You are ${auth_error}`,
        //   // type: 'danger', // "success", "info", "warning", "danger"
        //   // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
        // });
        
    });

    // setIsBackupDisabled(global.isBackedUp);





    setIsReady(true);
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

      saveSettingsStorage(storageKey, storage);

        setCurrentSettingsVersion(storage.version)

        success = true;

        setIsBackupDisabled(false);

        await setIsBackedUp(false);

        setShouldShowUpdateCloudDialogBox(true);

        // props.navigation.navigate('Home');
    } catch (e) {
      // statements
      // Alert.alert('Could not back up settings');
      console.log('e: ', e);
      // console.log(e);
    }
  };

  // const backupStoredSettings = async () => {
  //   // setIsSyncing(true);
  //   let success = false;
  //   // const backup_key = `${storageKey}_BACKUPSETTINGS`

  //   // load stored settings
  //   try {
  //     const storageObj = await loadSettingsStorage(storageKey);

  //      /* Device Cross Syncing for  User's online  with backup */
  //       // if (await isDeviceOnline() && isUserLoggedIn === true && global.isDeviceCrossSyncOn === true) {
  //       //   if (global.storageKey === '056049d7-ad75-4138-84d6-5d54db151d83' || global.storagKey === '216747749558231') {
  //       //     for (var i = storageObj.transactions.length - 1; i >= 0; i--) {
  //       //       saveTransaction(storageObj.transactions[i])
  //       //     }
  //       //   }
  //       // }

  //     let backup_key = `${storageObj.user.id}_BACKUP_SETTINGS`
  //     // console.log('backup_key: ', backup_key);

  //     // set stored user transactions
  //     if (storageObj !== null && storageKey !== null) {
  //       // console.log('stored user settings transactions:', storageObj.transactions);
  //       saveSettingsStorage(backup_key, storageObj);
  //       // console.log(key)
  //       success = true;

  //       setShouldShowUpdateCloudDialogBox(true)

  //       setIsBackupDisabled(true);

  //       await setIsBackedUp(true);
  //     }
  //   } catch (e) {
  //     // statements
  //     console.log('Could not back up settings', e);
  //     // console.log(e);
  //   }

  //   // if (success) {
  //   //   Alert.alert('Data backed up successfully');
  //   // }

  //   // alert(await global.getIsBackedUp())

  //   // setIsSyncing(false);

  //   // UPDATE CURRENT SETTINGS TO THIS BACKUP DATA !!!
  //   if (success) {
  //     // restoreBackUpData();
  //     await showBackupCompleteAlert();

  //     // navigation.navigate('Home');
  //   }
  // };

  const backupDataAlert = async () => {
    await Alert.prompt(
      'Backup Data',
      'Are you sure you want to backup all data from the app?',
      [
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        // Calling resetData
        { text: 'OK', onPress: async () => await backupStoredSettings() },
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

  // useEffect(() => {
  //   if (isBackupDisabled === true) {
  //     setIsBackedUp(true)
  //   } else {
  //     setIsBackedUp(false)
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [isBackupDisabled, isRestoreDisabled])

  useEffect(() => {

    if (currentTransactions && currentTransactions.length> 0) {
      setIsExportTransactionsDisabled(false)
    }
    return () => {
      // effect
      // setIsExportTransactionsDisabled(true)
    };
  }, [currentTransactions])

  /*
  * > reset data from the app
  */
  const resetData = async () => {
    setIsReady(false);

    let backupKey = global.storageKey;
    let storage = await loadSettingsStorage(global.storageKey)

    for (var i = storage.transactions.length - 1; i >= 0; i--) {
      // console.log('transactions[i]: ', transactions[i]);
      DeleteTransaction(storage.transactions[i])
    }

    let categories = storage.categories;

    for (var i = categories.length - 1; i >= 0; i--) {
      // console.log('categories[i]: ', categories[i]);
      removeCategory(categories[i])
    }

    // let storage = await loadSettingsStorage(global.storageKey)

    // storage.categories = defaultCategories;

    // let  storage = await loadSettingsStorage(global.storageKey)
    Object.keys(storage).forEach( function(element, index) {
      // console.log('element: ', element);
      if (element !== 'user' && element !== 'image_url') {
        storage[element] = '';
      }
    });

    // storage = null;

   saveSettingsStorage(global.storageKey, storage);

    // global.isBackedUp = false;
    // global.isDeviceSyncOn = null
    // global.isDeviceSynced = false;
    // global.hasRatedUs = null
    
    // global.isUserAuthenticated = null;
    // global.isLoginEnabled = null
    // global.emailAddressInput =  null
    // global.email = null
    // global.avatar =  null
    // global.displayName =  null
    // global.isStorybookModeOn =  null
    // global.screenWidth =  null
    // global.debugMode =  null;
    // global.authenticated =  null;
    // global.isConnected =  null;
    // global.isUserLoggedIn = null
    // global.isConfirmSent = null


    // global.showGlobalValues()


    // AsyncStorage.removeItem('hasRatedUs');
    // // console.log('await AsyncStorage.getItem("hasRatedU"): ', await AsyncStorage.getItem('hasRatedUs'));

    // AsyncStorage.removeItem('isBackedUp');

    // // AsyncStorage.removeItem('storageKey');

    // AsyncStorage.removeItem('isDeviceSynced');

    // AsyncStorage.removeItem('isDeviceSyncOn');


    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map(async (result, i, store) => {

          if (store[i][0] === (global.storageKey)) {
            // remove items with username key
            // console.log({ [store[i][0]]: store[i][1] });
            await AsyncStorage.removeItem(store[i][0]) // Remove Settings Storage

            // if (store[i].includes('hasRatedUs')) {
            //   // remove items with username key
            //   alert({ [store[i][0]]: store[i][1] });
            //   // AsyncStorage.removeItem(store[i][0]) // Remove Settings Storage
            // }
          }

          else if (store[i][0] === (global.storageKey + '_BACKUP_SETTINGS')) {
            // remove backups with username key
            await AsyncStorage.removeItem(store[i][0]) // Remove Backups
          }
          else if (store[i][0] === (global.storageKey + '_HISTORY')) {
            // remove backups with username key
            await AsyncStorage.removeItem(store[i][0]) // Remove Backups
          }
        });
      });
    });

    let settings = await loadSettingsStorage(backupKey);

    global.storageKey = settings.user.id;

    global.email = settings.user.email;

    global.displayName = settings.user.full_name;

    global.username = settings.user.username;

    setIsReady(true)

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
        'Remove all data?',
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
        { text: 'OK', onPress: async () => {
            // setIsSyncing(true)
            await restoreBackUpData()
            // setIsSyncing(false)
            
          }
        },
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
      // console.log('html: ', html);
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
    // console.log('obj[0]: ', obj[0]);
    let keys = Object.keys(obj[0])
    // forEach((key, value) => {
    //   console.log('key, value: ', key, value);
    //   // parse the nested object's properties
    //   keys.push(`${key}`);
      
    // });


//     keys:  Array [
//   "id",
//   "date",
//   "amount",
//   "owner",
//   "payee",
//   "category",
//   "type",
//   "note",
//   "version",
// ]

    // console.log('keys: ', keys);
    return keys;
  }

  const directToAppStoreDownload =  () => {
    // Expo.Linking.openURL('https://apps.apple.com/us/app/financely/id1491309602')
    // Expo.Linking.makeUrl()

    Linking.openURL('https://apps.apple.com/app/financely/id1491309602')
    // , // Expo.Linking.makeUrl() ,
    // Share.share({
    //   message:  '',
    //   url: Expo.Linking.makeUrl('https://apps.apple.com/app/financely/id1491309602'), // Expo.Linking.makeUrl() ,
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
          
        },
        android: {
          message: `Download ${global.appName} at : \n` + 'https://apps.apple.com/us/app/financely/id1491309602/',
          
        }
      }),
      // title: 'Wow, did you see that?'
    },
    // {
    //   ...Platform.select({
    //     ios: {
    //       // iOS only:
    //       excludedActivityTypes: [
    //         // 'com.apple.UIKit.activity.PostToTwitter'
    //       ]
    //     },
    //     android: {
    //       // Android only:
    //       dialogTitle: `Share : ${global.appName}`
    //     }
    //   })
    // }
    );
  }

  const onExport = async () => {
    // console.log('currentTransactions: ', currentTransactions);
    // console.log('getKeys(currentTransactions): ', getKeys(currentTransactions));

  //   keys:  Array [
  // "id",
  // "date",
  // "amount",
  // "owner",
  // "payee",
  // "category",
  // "type",
  // "note",
  // "version",
  // ]
    // return
    if (currentTransactions.length <= 0) {
      showMessage('You have no transactions');
      return
    }
      try {
        const result = await Share.share({
          title: 'My Transactions',
          subject: 'My Transactions',
          // tintColor: 'dark',
          message: JSON.stringify(currentTransactions, null, 2),
        });

        // console.log('result: ', result);

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
    StoreReview.isAvailableAsync().then(() => {
      try {
        StoreReview.requestReview().catch((e) => {
          console.log('e: ', e);
        })
        AsyncStorage.setItem('hasRatedUs',JSON.stringify(true));
      } catch(e) {
        // statements
        Linking.openURL('https://apps.apple.com/us/app/financely/id1491309602')
        console.log(e);
      }
    }).catch((err) => console.log('Store Review Error:', err))
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
      // console.log('text: ', text);
    })
    // console.log('Share button pressed');
  }

  function exportBtnPressed() {
    onExport();
  }

  function changePasswordBtnPressed() {
    props.navigation.navigate('ChangePasswordScreen');
  }

  async function signOutBtnPressed () {
    // if (await getAuthentication() !== true) {
    //   return
    // }
    props.navigation.navigate('SignOutScreen');
  }

  function signInBtnPressed() {
    // console.log(props.navigation);
    // AsyncStorage.removeItem('userToken')
    props.navigation.navigate('SignIn');
    // props.navigation.popToTop();
  }
  function signUpBtnPressed() {
    // console.log(props.navigation);
    // AsyncStorage.removeItem('userToken')
    props.navigation.navigate('SignUp');
    // props.navigation.popToTop();
  }

  const backupDataBtnPressed = async () => {
    backupDataAlert();
  }

  const restoreBackupDataBtnPressed = async () => {
    restoreDataAlert();
  }

  // // console.log('currentOwner: ', currentOwner);
  // const crossDeviceSyncBtnPressed = async () => {
  //   // check if user online
  //   global.isConnected = await isDeviceOnline();
  //   if (global.isConnected !== true) {
  //     setShouldShowOfflineDialogBox(true);
  //     return;
  //   }

  //   // check if user logged in
  //   if (!iglobal.authenticated) return;

  //   // // developer debugging only let this user sync
  //   // if (global.storageKey !== '056049d7-ad75-4138-84d6-5d54db151d83' || global.storagKey === '216747749558231') {
  //   //   showMessage('Update to 4.x!');
  //   //   return;
  //   // }

  //   // alert => would you like to sync transactions in the cross-device with this device?
  //   setShouldShowCloudSyncDialogBox(true);
  // }

  async function onPress(name) {
    // const name = btn.key;

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
    else if (name === 'Change Password') {
      changePasswordBtnPressed();
    }
    else if (name === 'Sign Out') {
      signOutBtnPressed();
    }
    // else if (name === 'Sign In/Sign Up') {
    //   signInBtnPressed();
    // }
    else if (name === 'Sign In') {
      signInBtnPressed();
    }
    else if (name === 'Sign Up') {
      signUpBtnPressed();
    }
    // else if (name.includes('Device Sync')) {
    //   crossDeviceSyncBtnPressed();
    //   // let bool = global.isDeviceSyncOn

    //   // if (bool === true) {
    //   //   setIsDeviceSyncOn(false)
    //   // } else {
    //   //   setIsDeviceSyncOn(true)
    //   // }

    // }
    else if (name === 'Reset Data') {
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
  // const checkConnectivity = async () => {
  //   NetInfo.isConnected.fetch().then(isConnected => {
  //     // console.log('First, is ' + (isConnected ? 'online' : 'offline'));
  //     isConnected ? null : showMessage('Currentlly offline');
  //     {
  //       // isConnected ? showFlashMessage('Online') : showFlashMessage('Offline');
        
  //     }
  //   });
  //   NetInfo.isConnected.addEventListener(
  //     'connectionChange',
  //     handleFirstConnectivityChange
  //   );
  // }

  useEffect(() => {
    // checkConnectivity();

    retrieveStoredSettings();

    return  () => {
      setInput('')
      global.emailAddressInput = ''
      global.email = ''
    }
  }, []);

  // useEffect(() => {
  //   if (currentSettingsVersion) {
  //     // console.log('currentSettingsVersion: ', currentSettingsVersion);
  //   }
  // }, [currentSettingsVersion]);

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

  const rateUsBtn = 
  <BlueButton title="Rate Us" onPress={rateUsBtnPressed} />

  

  // const getAuthentication = async () => {
  //   let authenticated = false;
  //   await Auth.currentAuthenticatedUser()
  //     .then((cognito) => {
  //       // console.log('cognito: ', cognito);
  //       authenticated = (cognito) ? true : false;
  //     }).catch((err) => {
  //       console.log('err: ', err);
  //     })
  //   return authenticated
  // };

  const view = (
    <View
      style={styles.container}
    >
    {
      // dialogBox
    }
    
        <NavigationEvents
            // try only this. and your component will auto refresh when this is the active component
            onWillFocus={async () =>
              {
                // alert(await getHasRatedUs())

                // global.hasRatedUs = await getHasRatedUs()

                setIsBackupDisabled(global.isBackedUp)

                let loggedIn = await getAuthentication();

                // setIsUserLoggedIn(loggedIn);

                await Auth.currentAuthenticatedUser().then((user) => {
                  global.authenticated = true
                  global.storageKey = user.attributes.sub
                }).catch((e) => console.log('e: ', e))

                // global.authenticated = await getAuthentication();

                global.isFederated = await AsyncStorage.getItem('isFederated' );

                global.isConnected  = await isDeviceOnline()


                // setIsRestoreDisabled(backup)

                retrieveStoredSettings();

                
              }
            } // {(payload) => checkConnectivity()}
            // other props
            // onDidFocus={payload => console.log('did focus',payload)}
            // onWillBlur={async () => global.isBackedUp = await getIsBackedUp()}
            onDidBlur={retrieveStoredSettings}
          />

        <View style={rectangle5} />

   
        <View
          style={
            {
              flex: 0.3,
            }
          }
        >
          <ProfileRectangle isUserLoggedIn={isUserLoggedIn} />
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
              // if (!global.authenticated) {
                navigation.navigate('WelcomeScreen');
              // } else {
              //   directToAppStoreDownload()
              // }
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
            isSyncBtnEnabled={isSyncBtnEnabled}
            isExportTransactionsDisabled={isExportTransactionsDisabled}
            onPress={onPress}
            isBackupDisabled={isBackupDisabled}
            optionOpacity={optionOpacity}
            isRestoreDisabled={isRestoreDisabled}
            currentSettingsVersion={currentSettingsVersion}
            isUserLoggedIn={isUserLoggedIn}
            // isDeviceSyncOnText={isDeviceSyncOnText}
            // toggleIsDeviceSyncOn={toggleIsDeviceSyncOn}
            // getIsDeviceSyncOn={getIsDeviceSyncOn}
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

              
                {
                  (!global.hasRatedUs) && rateUsBtn
                    
                }
                <BlueButton title="Share Us" onPress={shareBtnPressed} />
              


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
          isExportingTransactions && <ActivityIndicator color="#ddd" size="large" />
        }
        {
          // isSyncing && spinner
        }
        {
          !isReady && spinner
        }
    </View>
  );

  return view
}

Settings.navigationOptions = ({ navigation }) => {
  let signOutBtn
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




  // // Sign out from the app
  // const signOutAlert = async () => {
  //   await Alert.alert(
  //     'Sign Out',
  //     'Are you sure you want to sign out from the app? You will need internet access to sign back in and recover your data!',
  //     [
  //       {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
  //       // Calling signOut
  //       { text: 'OK',
  //       onPress: () => signOut()},
  //     ],
  //     { cancelable: false },
  //   );
  // };
  // // Confirm sign out
  // const signOut = async () => {
  //   await Auth.signOut()
  //   .then(async () => {
  //     // console.log('Sign out complete');

  //     setHasRatedUs(false);

  //     setIsBackedUp(false)

  //     AsyncStorage.setItem('storageKey', JSON.stringify(''))
      
  //     navigation.navigate('AuthLoading');


  //   })
  //   .catch((err) => console.log('Error while signing out!', err));
  // };

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

    // headerLeft  = null

  };
  return navbar;
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default withNavigation(Settings);
