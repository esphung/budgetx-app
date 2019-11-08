/*
FILE: TransactionsStorage.js
AUTHOR:  eric phung
UPDATED:  Thu Oct 24 03:27:46 2019
          08/11/2019 01:56 AM
PURPOSE: user default transactions local storage
*/
import { AsyncStorage } from 'react-native';

// import sortArrayDesc from '../functions/sortArrayDesc';

const STORAGE_KEY = 'TRANSACTIONS';

// AsyncStorage.clear() // DEBUG CLEAR ALL EXISTING APP KEYS!!!

export const saveTransactionsObject = (storageObject) => {
  // const { transactions } = storageObject; // get transactions from storage object

  // console.log(storageObject.transactions);

  // const { transactions } = storageObject;

  // transactions = transactions.sort(function(a, b){return b-a})

  // let sortedArray = sortArrayDesc(transactions, 'date');// sort transactions by date descending

  // storageObject.transactions = sortedArray;

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storageObject));
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
