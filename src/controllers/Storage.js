import AsyncStorage from '@react-native-community/async-storage';

import { showMessage } from 'react-native-flash-message';

import Settings from '../models/Settings';

import uuidv4 from '../functions/uuidv4';

import searchByID from 'functions/searchByID';

import searchByName from 'functions/searchByName';

import defaultCategories from '../data/categories';

import { isDeviceOnline, getAuthentication } from './Network';

import {
  // UpdatePayee,
  DeletePayee,
  ListPayees,
} from '../queries/Payee';

import {
  // UpdateCategory,
  DeleteCategory,
  ListCategories,
} from 'queries/Category';

import {
  // UpdateTransaction,
  ListTransactions,
  DeleteTransaction,
} from '../queries/Transaction';



// LOAD VALUE USER DEFAULTS
const DEFAULT_STORAGE = async (key) => {
  const settings = new Settings(key);

  // Stash user session token for auto sign in
  const userToken = `${global.storageKey}@session${uuidv4()}`;

  AsyncStorage.setItem('userToken', userToken);
  return settings;
};

// CONTROLLER METHODS
export const saveStorage = async (key, settings) => {
  settings.version++;
  // console.log('settings.version: ', settings.version);
  AsyncStorage.setItem(key, JSON.stringify(settings));
};

export const loadStorage = async (key) => {
  // console.log('key: ', key);
  const storageObject = await AsyncStorage.getItem(key); // get local storage
  if (storageObject === null) {
    // if storage is empty return new one
    return DEFAULT_STORAGE(key);
  }
  // console.log('(storageObject): ', (storageObject));
  return JSON.parse(storageObject);
};

export const storeUserCategories = async (list) => {
  try {
    const storage = await loadStorage(global.storageKey);
    storage.categories = list;
    saveStorage(global.storageKey, storage);
  } catch (error) {
    // statements
    throw new Error(error);
  }
};

async function myJSCallback() {
  await loadStorage(global.storageKey).then(async (result) => {
     const list = defaultCategories();

    result.categories = list;

    saveStorage(global.storageKey, result);

    updateUserTransactionCategories(list);
  })
  // 2nd code goes here
 
  // console.log('uh oh 2');
};

var callback1 = async () => {
  // 1st code goes here
  await loadStorage(global.storageKey).then(async (result) => {
    if (result.isDeviceSyncEnabled) {
    // console.log('await ListCategories(): ', await ListCategories());
     let categoriesList = result.categories;
      if (categoriesList.length > 0) {
        categoriesList.forEach(async (category) => {
          await DeleteCategory(category);
        });
      }
    }
    myJSCallback();

  });
  // console.log('uh oh 1'),
  
};


const resetCategories = async () => callback1();

export const resetTransactions = async () => {
  const list = [];
  await loadStorage(global.storageKey)
    .then((result) => {
      result.transactions = list;
      saveStorage(global.storageKey, result);
    });
};

export const updateUserTransactionCategories = async (list) => {
  await loadStorage(global.storageKey).then((storage) => {
// update all of the user's transactions 'categories
  storage.categories = list;

  storage.transactions.forEach(async (transaction) => {
    /* Update transaction category */
    try {
      // statements
      let categoryFound = searchByID(transaction.category.id, list)
      transaction.category = categoryFound
    } catch(e) {
      // statements
      let categoryFound = searchByName(transaction.category.name, list)
      transaction.category = categoryFound
      console.log(e);
    }
    
    // transaction.category = searchByID(transaction.category.id, list);

    
    

     // Update transaction type 
    transaction.type = transaction.category.type;

     // Adjust inaccurate amounts to new category type 
    if (transaction.type === 'EXPENSE') {
      transaction.amount = -Math.abs(transaction.amount).toFixed(2)
    } else {
      transaction.amount = Math.abs(transaction.amount).toFixed(2)
    }
  });

  saveStorage(global.storageKey, storage);
  })
  
  
};

async function firstFunction(){

  // console.log('1: ');
    // do some asynchronous work
    let response = await loadStorage(global.storageKey).then((storage) => {
        resetTransactions();

    // let {
    //   categories,
    //   transactions,
    //   payees,
    //   isDeviceSyncEnabled,
    // } = storage;
    // ddo local storage stuff
    resetCategories();

    

    
    // console.log('storage: ', storage);

    return storage;
    })
    // and when the asynchronous stuff is complete
    // _callback();

    return response
}



export const resetData = async ({ handleRoute }) => {
  // let bool = await loadStorage(global.storageKey).then(async (storage) => {


    let settings = await firstFunction(async (storage) => {

      
      
      // // // do stuff online
      // if (storage.isDeviceSyncEnabled) {
      //   await ListTransactions()
      //   .then((list) => {
      //     // console.log('list: ', list);
      //     list.forEach((transaction, index) => {
      //       DeleteTransaction(transaction);
      //       DeletePayee(transaction.payee);
      //       // console.log('index: ', index);
      //     });
      //   })
      //   // console.log('await ListCategories(): ', await ListCategories());
      //   let categoriesList = await ListCategories();
      //   if (categoriesList.length > 0) {
      //     categoriesList.forEach((category) => {
      //       DeleteCategory(category)
      //     });
      //   }

      //   let payeesList = await ListPayees();
      //   if (payeesList.length > 0) {
      //     payeesList.forEach((payee) => {
      //       DeletePayee(payee);
      //     })
      //   }



        

      //   // categories.forEach((element) => DeleteCategory(element));
      //   // payees.forEach((element) => DeletePayee(element));

      //   showMessage({
      //     message: 'Reset completed',
      //     type: 'success',
      //     description: 'Success!',
      //     floating: true,
      //     position: 'bottom',
      //   });
      // }

      return storage;
    }).catch((err) => err)

    
  // });

  showMessage({
    message: 'Reset completed',
    type: 'success',
    floating: true,
    onPress: () => handleRoute('AuthLoading'),
    autoHide: false,
  });


  return settings;

  // AsyncStorage.getAllKeys((err, keys) => {
  //   AsyncStorage.multiGet(keys, (error, stores) => {
  //     stores.forEach((result, i, store) => {
  //       if (store[i][0].includes(global.storageKey)) {
  //         AsyncStorage.removeItem(store[i][0]);
  //       } else if (store[i][0] === (`${global.storageKey}_BACKUP_SETTINGS`)) {
  //         // remove backups with username key
  //         AsyncStorage.removeItem(store[i][0]);
  //       } else if (store[i][0] === (`${global.storageKey}_HISTORY`)) {
  //         AsyncStorage.removeItem(store[i][0]);
  //       }
  //     });
  //   });
  // });
  // showMessage({ message: 'Reset completed', type: 'success', floating: true, });

  // setIsResetingData(false);

  
};

