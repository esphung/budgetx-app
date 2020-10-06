/*
FILE: SettingsStorage.js
CREATED: 01/03/2020 01:21 AM
PURPOSE: default settings saved to local device storage
*/
import { AsyncStorage } from 'react-native';

import NetInfo from '@react-native-community/netinfo'; // online

import Auth from '@aws-amplify/auth'; // online

import User from '../models/User';

import defaultCategories from '../data/categories';

import uuidv4 from '../functions/uuidv4';

/* my custom queries */
import {
  // updateTransaction,
  // removeTransaction,
  // removePayee,
  // removeCategory,
  // savePayee,
  // saveCategory,
  // saveTransaction,
  fetchStoredTransactions,
  fetchStoredCategories,
  // getTransactionByID,
} from './my_queries';

// import searchByID from '../functions/searchByID';

// function handleFirstConnectivityChange(isConnected) {
//   // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
//   NetInfo.isConnected.removeEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange
//   );
// }

// export const pushAllTransactionsToCloud = async () => {
//   try {
//     const storage = await loadSettingsStorage(global.storageKey);
//     // console.log('local_transactions: ', local_transactions);

//    for (var i = 0; i < storage.transactions.length; i++) {
//     saveTransaction(storage.transactions[i])
//       // console.log('storage.transactions[i]: ', storage.transactions[i]);
//    }

//   } catch(e) {
//     // statements
//     console.log(e);
//   }
// }

const retrieveAuthenticatedStorageKey = async () => {
  let key;
  await Auth.currentAuthenticatedUser()
    .then((cognito) => {
      key = cognito.attributes.sub;
    })
    .catch((err) => {
      console.warn(err);
    });

  return key;
};

// const getOnlineUserKey = async () => {
//   let key;
//   // get authenticated user storage key if online
//   await NetInfo.isConnected.fetch().then(async (isConnected) => {
//     isConnected ? key = await retrieveAuthenticatedStorageKey() : console.warn('Not Online');
//   })
//   .catch((err) => { console.log('err: ', err) });

//   return key;
// };

export const saveSettingsStorage =  async (key, settings) => {
  if (global.debugMode === true) return;
  settings.version++;
  // console.log('settings.version: ', settings.version);
  await AsyncStorage.setItem(key, JSON.stringify(settings));
};

export const clearSettingsStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    console.warn('exception clearing storage: ', exception);
  }
};

export const Settings = (key) => {
  return {
    id: uuidv4(),
    user: new User(key),
    transactions: [],
    categories: defaultCategories(),
    payees: [],
    // avatar: global.defaultAvatar,
    owner: key,
    version: 0,
    json: () => {
      return JSON.stringify(this, null, 2);
    },
  };
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_SETTINGS = async (key) => {
  const settings = new Settings(key);

  // var person = {
  //   firstName: "John",
  //   lastName : "Doe",
  //   id       : 5566,
  //   log : function() {
  //     return this.firstName + " " + this.lastName;
  //   }
  // };
  // console.log('settings.json(): ', settings.json());

  await AsyncStorage.setItem('userToken', `${key}${'@session'}${uuidv4()}`);
  return settings;
};

export const retrieveOnlineTransactions = async () => {
  let list = [];

  list = await fetchStoredTransactions();

  return list;
};

export const retrieveOnlineCategories = async () => {
  let list = [];
  list = await fetchStoredCategories();

  return list;
};

export const retrieveLocalTransactions = async () => {
  let list = [];
  try {
    const storageObject = await loadSettingsStorage(global.storageKey);
    if (storageObject.transactions) {
      list = storageObject.transactions;
    }
  } catch (error) {
    console.log('Error retrieving local transactions:', error);
  }
  return list;
};

// export function removeFromArray(array, element) {
//   const index = array.indexOf(element);
//   array.splice(index, 1);
//   return array;
// }

// const removeDuplicates = (array) => {
//   var numbers4 = local_transactions // [5, 2, 3, 4, 2, 6, 7, 1, 2, 3];
//     var firstIndex = "";
//    var isMatch=false;
//     for (var a = 0; a < numbers4.length; a++) {
//         for (var b = a+1; b < numbers4.length; b++) {
//             if (numbers4[a].id === numbers4[b].id){
//               firstIndex = numbers4.indexOf(numbers4[a]);
//               isMatch = true;
//               break;
//           }
//         }
//            if (isMatch) {break;}
//     }

//   // console.log('firstIndex: ', firstIndex);

//   // console.log('removeFromArray(numbers4, numbers4[firstIndex]): ', removeFromArray(numbers4, numbers4[firstIndex]));

//   return removeFromArray(numbers4, numbers4[firstIndex])
// }

export const loadSettingsStorage = async (key) => {
  // console.log('key: ', key);
  try {
    const storageObject = await AsyncStorage.getItem(key); // get local storage

    if (storageObject === null) return DEFAULT_SETTINGS(key); // if storage is empty return new one


    /* update owner of all categories */ // ???
    if (storageObject.categories) {
      storageObject.categories.forEach((category) => {
        category.owner = key;
      });
    }

    /* update transaction payees */ // ???
    if (storageObject.payees) {
      storageObject.payees.forEach((payee) => {
        if (payee.id || payee.id === '') {
          payee.id = uuidv4();
        }
        if (payee.owner === '' || !payee.owner) {
          payee.owner = key;
        }
        if (!payee.name || payee.name === '') {
          payee.name = 'None';
        }
      });
    }
    /* set user profile image if there is */
    if (storageObject.user) {
      const Image_Http_URL = { uri: storageObject.user.image_url };
      global.avatar = Image_Http_URL;
    }
    return JSON.parse(storageObject);
  } catch (error) {
    console.log('Error loading storageObject:', error);
  }
};
