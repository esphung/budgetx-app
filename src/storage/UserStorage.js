/*
FILE: UserStorage.js
UPDATED:  Thu Oct 24 03:27:46 2019
          08/11/2019 02:06 AM
PURPOSE: user default user local storage
*/
import { AsyncStorage } from 'react-native';

import User from '../models/User';

const STORAGE_KEY = 'USER';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const saveUserObject = (user) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_USERDEFAULTUSER = {
  user: new User(),
};

export const loadUserObject = async () => {
  try {
    const storageObject = await AsyncStorage.getItem(STORAGE_KEY);

    if (storageObject === null) { return DEFAULT_USERDEFAULTUSER; }

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading storageObject', error);
  }
};
