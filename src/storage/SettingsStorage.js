/*
FILE: SettingsStorage.js
CREATED: 01/03/2020 01:21 AM
PURPOSE: default settings saved to local device storage
*/
import { AsyncStorage } from 'react-native';

import User from '../models/User';

// import Payee from '../models/Payee';

// import Category from '../models/Category';

// import Transaction from '../models/Transaction';

import defaultCategories from '../data/categories';

// const STORAGE_KEY = 'USER';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const saveSettingsStorage = (key, settings) => {
  console.log('saving ' + key + '\'s settings');
  AsyncStorage.setItem(key, JSON.stringify(settings));
};

export const clearSettingsStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_SETTINGS = (key) => {
  const settings = {
    user: new User(key),
    image: global.avatar,
    transactions: [],
    categories: defaultCategories,
  };
  return settings;
};

export const loadSettingsStorage = async (key) => {
  console.log('loading', key, '\'s settings');
  try {
    const storageObject = await AsyncStorage.getItem(key);

    if (storageObject === null) { return DEFAULT_SETTINGS(key); }

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading storageObject', error);
  }
};

/*
* > Categories
*/
// export const saveUserCategories = (key, categories) => {
//   AsyncStorage.setItem(key, JSON.stringify(categories));
// };

// // LOAD VALUE USERDEFAULTCATEGORIES
// const DEFAULT_USERCATEGORIES = defaultCategories;

// export const loadUserCategories = async (key) => {
//   try {
//     const storageObject = await AsyncStorage.getItem(key);

//     if (storageObject === null) { return defaultCategories; }

//     return JSON.parse(storageObject);
//   } catch (error) {
//     throw new Error('Error loading storageObject', error);
//   }
// };
