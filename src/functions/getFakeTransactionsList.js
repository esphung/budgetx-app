'use strict';

import Transaction from '../models/Transaction'

import categories from '../data/categories'

import { genRandomFloat } from '../functions/genRandomFloat'


export function getFakeTransactionsList (argument) {
  let list = []
  for (var i = 0; i < 8; i++) {
    var amount = genRandomFloat(0, 10, 2)

    var transaction = new Transaction(
      i,
      new Date(), 
      amount,
      '',
      (categories[Math.floor(Math.random() * 8)])
    )

    list.push(transaction)
    console.log('Created new Transaction:',list[i])
  }
  return list
}

