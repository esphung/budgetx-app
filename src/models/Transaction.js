/*
FILENAME:   Transaction.js
PURPOSE:    Transaction
AUTHOR:     Eric Phung
CREATED:    11/04/2019 02:37 PM
UPDATED:    11/25/2019 02:11 PM | added header prop
            11/26/2019 04:20 AM | updated  for  sticky headers
            11/26/2019 11:01 PM
            03/28/2020 02:18 PM | GraphQL Model/Schema
*/

import uuidv4 from 'functions/uuidv4';

import Payee from 'models/Payee';

function Transaction({
  date,
  amount,
  owner,
  category,
  type,
  note,
  version,
}) {
  const uuid = uuidv4();
  const obj = {
    id: uuid,
    date: date,
    amount: amount,
    owner: owner,
    payee: new Payee({
      name: '',
    }),
    category: category,
    type: type,
    note: note,
    version: version,
  }
  return obj
}

export default Transaction; // es6
