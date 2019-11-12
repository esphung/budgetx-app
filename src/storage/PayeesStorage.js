/*
FILE: PayeesStorage.js
UPDATED:  10/11/2019 02:07 PM
PURPOSE: user default payees local storage
*/
import { AsyncStorage } from 'react-native';

import defaultPayees from '../data/payees';

const STORAGE_KEY = 'PAYEES';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const savePayees = (payees) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payees));
};

// LOAD VALUE USERDEFAULTPAYEES
const DEFAULT_USERDEFAULTPAYEES = {
  payees: defaultPayees,
};

export const loadPayees = async () => {
  try {
    const storageObject = await AsyncStorage.getItem(STORAGE_KEY);

    if (storageObject === null) { return DEFAULT_USERDEFAULTPAYEES; }

    // console.log(storageObject.payees)

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading storageObject', error);
  }
};
