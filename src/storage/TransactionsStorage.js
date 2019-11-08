/*
FILE: TransactionsStorage.js
AUTHOR:  eric phung
UPDATED:  Thu Oct 24 03:27:46 2019
          08/11/2019 01:56 AM
PURPOSE: user default transactions local storage
*/
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'TRANSACTIONS';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const saveTransactionsObject = (transactions) => {
  // console.log(transactions);
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

// LOAD VALUE TRANSACTIONS
const DEFAULT_TRANSACTIONS = {
  transactions: [],
};

export const loadTransactionsObject = async () => {
  try {
    const storageObject = await AsyncStorage.getItem(STORAGE_KEY);

    if (storageObject === null) { return DEFAULT_TRANSACTIONS; }

    // console.log(JSON.parse(storageObject));

    return JSON.parse(storageObject);
  } catch (error) {
    throw new Error('Error loading transactions', error);
  }
};
