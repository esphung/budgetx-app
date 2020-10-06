import AsyncStorage from '@react-native-community/async-storage';

import { showMessage } from 'react-native-flash-message';

import Settings from '../models/Settings';

import uuidv4 from '../functions/uuidv4';

import defaultCategories from '../data/categories';

import { isDeviceOnline, getAuthentication } from './Network';

import {
  // UpdatePayee,
  DeletePayee,
} from '../queries/Payee';

import {
  // UpdateCategory,
  DeleteCategory,
} from '../queries/Category';

import {
  // UpdateTransaction,
  DeleteTransaction,
} from '../queries/Transaction';

import {
  // DeleteTransaction,
  // DeleteCategory,
  // DeletePayee,
} from '../storage/my_queries';


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
  const storageObject = await AsyncStorage.getItem(key); // get local storage
  if (storageObject === null) {
    // if storage is empty return new one
    return DEFAULT_STORAGE(key);
  }
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
export const resetCategories = async () => {
  const list = defaultCategories();
  await loadStorage(global.storageKey)
    .then((result) => {
      result.categories = list;
      saveStorage(global.storageKey, result);
    });
};
export const resetTransactions = async () => {
  const list = [];
  await loadStorage(global.storageKey)
    .then((result) => {
      result.transactions = list;
      saveStorage(global.storageKey, result);
    });
};
export const resetData = async () => {
  await loadStorage(global.storageKey).then((storage) => {

    // let {
    //   categories,
    //   transactions,
    //   payees,
    //   isDeviceSyncEnabled,
    // } = storage;
    
    // // do stuff online
    // if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
    //   transactions.forEach((element) => DeleteTransaction(element));
    //   categories.forEach((element) => DeleteCategory(element));
    //   payees.forEach((element) => DeletePayee(element));
    // }

    // ddo local storage stuff
    resetCategories();

    resetTransactions();

    saveStorage(global.storageKey, storage); // .then(() => navigation.navigate('AuthLoading'));
    // console.log('storage: ', storage);
  });




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
  showMessage({ message: 'Reset completed', type: 'success' });

  // setIsResetingData(false);

  
};

