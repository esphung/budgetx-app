/*
FILE: SettingsStorage.js
CREATED: 01/03/2020 01:21 AM
PURPOSE: default settings saved to local device storage
*/
import { AsyncStorage } from 'react-native';

import NetInfo from '@react-native-community/netinfo'; // online

import Auth from '@aws-amplify/auth'; // online

import { showMessage, hideMessage } from "react-native-flash-message";

// NetInfo.fetch().then(state => {
//   console.log('Connection type', state.type);
//   console.log('Is connected?', state.isConnected);
// });

import User from '../models/User';

import defaultCategories from '../data/categories';

import uuidv4 from '../functions/uuidv4';

function handleFirstConnectivityChange(isConnected) {
  // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}


const retrieveAuthenticatedStorageKey = async () => {
  let key
  await Auth.currentAuthenticatedUser()
    .then((cognito) => {
      key = cognito.attributes.sub;
    })
    .catch(async (err) => {
      // showMessage(err);
      return
    });

  return key

}

const getOnlineUserKey = async () => {
  let key;
  // get authenticated user storage key if online
  await NetInfo.isConnected.fetch().then(async (isConnected) => {
    isConnected ?
    key = await retrieveAuthenticatedStorageKey() : showMessage('Not Online');
  })
  .catch((err) => { console.log('err: ', err) });

  // NetInfo.isConnected.addEventListener(
  //   'connectionChange',
  //   handleFirstConnectivityChange
  // );
  return key;
}

export const saveSettingsStorage = (key, settings) => {
  AsyncStorage.setItem(key, JSON.stringify(settings));
};

export const clearSettingsStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    console.log('exception: ', exception);
  }
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_SETTINGS = async () => {
  const settings = {
    user: new User(global.storageKey),
    // image: global.avatar,
    transactions: [],
    categories: defaultCategories,
    version: 1,
  };
  await AsyncStorage.setItem('userToken', String(global.storageKey + '@session' + uuidv4()));
  return settings;
};

const retrieveOnlineTransactions = async () => {
  let list = []
  let key = await getOnlineUserKey(); // get online logged in user storage key
  console.log('key: ', key);

  return list
}

export const loadSettingsStorage = async (key) => {  
  let d1 = []; // online transactions
  let d2 = []; // local transactions
  try {
    // get all records from online
    d1 = await retrieveOnlineTransactions();
    console.log('d1:', d1.length, 'items');
    
    const storageObject = await AsyncStorage.getItem(key); // get local storage
    // console.log('JSON.parse(storageObject.transactions.length): ', JSON.parse(storageObject).transactions.length);

    // get all transactions from local
    d2 = JSON.parse(storageObject).transactions
    console.log('d2:', d2.length, 'items');


    // d2.forEach(element => {
    //   if (searchByID(element.id, d1)) {
    //     // transaction from d2 (local) is in d1 (online)

    //     // compare versions
    //     let found = searchByID(element.id, d1);
    //     if (element.version > found) {
    //       // if d2 transaction is newer version, update d1 item
    //       let pos = d1.indexOf(found);

    //       d1[pos] = d2[pos];

    //       storageObject.transactions = d2


    //     }
    //   }
    // });



    if (storageObject === null) {
      // if storage is empty return new one
      return DEFAULT_SETTINGS()
    } 
    // else {
    //   // storage is not empty

    //   // update storage transactions from online transactions

    //  } 

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading storageObject:', error);
  }
};

