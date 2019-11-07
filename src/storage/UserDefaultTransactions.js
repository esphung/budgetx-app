/*
FILE: UserTransactions.js
DATE: Thu Oct 24 03:27:46 2019
PURPOSE: user default settings local storage
*/
import { AsyncStorage } from 'react-native';

import categories from '../data/categories';

const STORAGE_KEY = '2';

export const saveSettings = (settings) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

// LOAD VALUE USERDEFAULTTRANSACTIONS
const DEFAULT_USERDEFAULTTRANSACTIONS = {
  transactions: [],
};

export const loadSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEY);

    if (settings === null) { return DEFAULT_USERDEFAULTTRANSACTIONS; }

    return JSON.parse(settings);
  } catch (error) {
    throw new Error('Error loading settings', error);
  }
};
