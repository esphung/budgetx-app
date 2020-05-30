/* generate fake transactions */

import Transaction from '../models/Transaction';

import { randomName } from './generateRandomName'

export function getFakeTransactions(limit) {
  let transactions = [];

  for (var i = limit - 1; i >= 0; i--) {
    console.log('i: ', i);

    let transaction = new Transaction(i);
    transactions.push(transaction)
  }

  return transactions;
}


console.log('fake transactions => getFakeTransactions(4): ', getFakeTransactions(4));