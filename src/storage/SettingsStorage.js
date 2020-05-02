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

/* my custom queries */
import {
  updateTransaction,
  removeTransaction,
  removePayee,
  removeCategory,
  savePayee,
  saveCategory,
  saveTransaction,
  fetchStoredTransactions,
  fetchStoredCategories,
  getTransactionByID
} from './my_queries';

import searchByID from '../functions/searchByID';

function handleFirstConnectivityChange(isConnected) {
  // console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}

  // const getTransactionOnlineByID = async (id) => {
  //   /* Process retrieved server transaction */
  //   let stored = await getTransactionByID(id); // retrieve newly created from online trans by id

  //   console.log('stored: ', stored);

  //   // const date = stored.date;
  //   // // console.log('date: ', date);

  //   // const amount = stored.amount
  //   // // console.log('amount: ', amount);

  //   // const owner = stored.owner;
  //   // // console.log('owner: ', owner);

  //   // let payee = (stored.payee) ? stored.payee : new Payee(uuidv4(), '', stored.owner, 0);
  //   // console.log('payee: ', payee);

  //   // let category = (stored.category) ? stored.category : new Category(uuidv4(), 'None', '#fff', owner, type, 0);
  //   // // console.log('category: ', category);

  //   // const { type, note, version } = stored

  //   // // const note = stored.note;

  //   // // const version = stored.version;

  //   // let obj = new Transaction(
  //   //   id,
  //   //   date,
  //   //   amount,
  //   //   owner,
  //   //   payee,
  //   //   category,
  //   //   type,
  //   //   note,
  //   //   version,
  //   // );

  //   // return obj;
  // };

export const pushAllTransactionsToCloud = async () => {
  try {
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('local_transactions: ', local_transactions);

   for (var i = 0; i < storage.transactions.length; i++) {
    saveTransaction(storage.transactions[i])
      // console.log('storage.transactions[i]: ', storage.transactions[i]);
   }

  } catch(e) {
    // statements
    console.log(e);
  }
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


export const Settings = (key) => {
  return {
    id: uuidv4(),
    user: new User(key),
    transactions: [],
    categories: defaultCategories,
    payees: [],
    // avatar: global.defaultAvatar,
    owner: key,
    version: 0,
    json : () => {
      return JSON.stringify(this, null, 2);
    },
  }
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_SETTINGS = async (key) => {
  
  let settings = new Settings(key);

  // var person = {
  //   firstName: "John",
  //   lastName : "Doe",
  //   id       : 5566,
  //   log : function() {
  //     return this.firstName + " " + this.lastName;
  //   }
  // };
  // console.log('settings.json(): ', settings.json());

  
  AsyncStorage.setItem('userToken', String(key + '@session' + uuidv4()));
  
  return settings;
};

export const retrieveOnlineTransactions = async () => {
  let list = []
  let key = await getOnlineUserKey(); // get online logged in user storage key
  // console.log('key: ', key);

  list = await fetchStoredTransactions()

  return list
}

export const retrieveOnlineCategories = async () => {
  let list = []
  let key = await getOnlineUserKey(); // get online logged in user storage key
  // console.log('key: ', key);

  list = await fetchStoredCategories()

  return list
}

export const retrieveLocalTransactions = async () => {
  let list = []
   try {
     const storageObject = await loadSettingsStorage(global.storageKey);
    // console.log('storageObject: ', storageObject);

    if (storageObject.transactions) {
      list = storageObject.transactions
    }
  } catch (error) {
    console.log('Error loading local transactions:', error);
  }
  return list
}

export function removeFromArray(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
  return array;
}

const removeDuplicates = (array) => {
  var numbers4 = local_transactions // [5, 2, 3, 4, 2, 6, 7, 1, 2, 3];
    var firstIndex = "";
   var isMatch=false;
    for (var a = 0; a < numbers4.length; a++) {
        for (var b = a+1; b < numbers4.length; b++) {
            if (numbers4[a].id === numbers4[b].id){
                firstIndex = numbers4.indexOf(numbers4[a]);
                isMatch=true;
                break;
          }
        }
           if (isMatch) {break;}
    }

  // console.log('firstIndex: ', firstIndex);

  // console.log('removeFromArray(numbers4, numbers4[firstIndex]): ', removeFromArray(numbers4, numbers4[firstIndex]));

  return removeFromArray(numbers4, numbers4[firstIndex])
}



const removeStoredTransaction = async (transaction) => {
   const userObject = await loadSettingsStorage(global.storageKey);

    const list = userObject.transactions;

    const found = searchByID(transaction.id, list);

    if (found) {
      const pos = list.indexOf(found);

      list[0] = transaction;

      userObject.transactions = list;

      // console.log('userObject.transactions: ', userObject.transactions);

      // saveSettingsStorage(global.storageKey, userObject);

      try {
        saveSettingsStorage(global.storageKey, userObject);
      } catch(e) {
        // statements
        console.log('e: ', e);
      }
    }
}

export const loadSettingsStorage = async (key) => {
  // console.log('key: ', key);
  try {
    const storageObject = await AsyncStorage.getItem(key); // get local storage

    if (storageObject === null) return DEFAULT_SETTINGS(key) // if storage is empty return new one


    /* update owner of all categories */ // ???
    if (storageObject.categories) {
      storageObject.categories.forEach((category) => {
        category.owner = key
      })
    }

    /* update transaction payees */ // ???
    if (storageObject.payees) {
      storageObject.payees.forEach((payee) => {
        if (payee.id || payee.id === '') {
          payee.id = uuidv4()
        }
        
        if (payee.owner === '' || !payee.owner) {
          payee.owner = key
        }

        if (!payee.name || payee.name === '') {
          payee.name = 'None'
        }
        
      })
    }

    /* set user profile image if there is */
    // if (storageObject.image_url) {
    //   let Image_Http_URL ={ uri: storageObject.image_url};
    //   global.avatar = Image_Http_URL;
    // }
    return JSON.parse(storageObject);
  } catch (error) {
    console.log('Error loading storageObject:', error);
  }
};

