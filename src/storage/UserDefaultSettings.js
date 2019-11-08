/*
FILE: UserDefaultSettings.js
DATE: Thu Oct 24 03:27:46 2019
PURPOSE: user default settings local storage
*/
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'USERDEFAULTSETTINGS';

export const saveSettings = (settings) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

// LOAD VALUE USERDEFAULTSETTINGS
const DEFAULT_USERDEFAULTSETTINGS = {
  // email: null,

  // name: null,

  // user: {

  // },
};

export const loadSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEY);

    if (settings === null) { return DEFAULT_USERDEFAULTSETTINGS; }

    return JSON.parse(settings);
  } catch (error) {
    throw new Error('Error loading settings', error);
  }
};
