import Transaction from '../models/Transaction';

import categories from '../data/categories';

import { genRandomFloat } from './genRandomFloat';


export default function getFakeTransactionsList(limit) {
  const list = [];
  let i = 0;
  for (i; i < limit; i += 1) {
    const amount = genRandomFloat(0, 10, 2);

    const transaction = new Transaction(
      i,
      new Date(),
      amount,
      '',
      (categories[Math.floor(Math.random() * 8)])
    );

    list.push(transaction);
    // console.log('Created new Transaction:',list[i])
  }
  return list;
}
