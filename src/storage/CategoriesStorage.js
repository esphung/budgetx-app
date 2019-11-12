/*
FILE: CategoriesStorage.js
UPDATED:  Thu Oct 24 03:27:46 2019
          08/11/2019 02:06 AM
PURPOSE: user default categories local storage
*/
import { AsyncStorage } from 'react-native';

import defaultCategories from '../data/categories';

const STORAGE_KEY = 'CATEGORIES';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const saveCategories = (categories) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

// LOAD VALUE USERDEFAULTCATEGORIES
const DEFAULT_USERDEFAULTCATEGORIES = {
  categories: defaultCategories,
};

export const loadCategories = async () => {
  try {
    const storageObject = await AsyncStorage.getItem(STORAGE_KEY);

    if (storageObject === null) { return DEFAULT_USERDEFAULTCATEGORIES; }

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading storageObject', error);
  }
};