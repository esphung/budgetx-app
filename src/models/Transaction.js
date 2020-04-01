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

function Transaction(id, date, amount, owner, payee, category, type, note, version) {
  const obj = {
    id: id,
    date: date,
    amount: amount,
    owner: owner,
    payee: payee,
    category: category,
    type: type,
    note: note,
    version: version,
  }
  return obj
}

// console.log('Transaction: ', Transaction());

export default Transaction; // es6


// /*
// FILENAME:   Transaction.js
// PURPOSE:    Transaction
// AUTHOR:     Eric Phung
// CREATED:    11/04/2019 02:37 PM
// UPDATED:    11/25/2019 02:11 PM  | added header prop
//             11/26/2019 04:20 AM  | updated  for  sticky headers
//             11/26/2019 11:01 PM
//             02/06/2020 02:46 PM
// */

// import uuidv4 from '../functions/uuidv4';

// export default function Transaction(date, amount, owner, payee, category, type, note, version) {
//   this.id = uuidv4();
//   this.date = date
//   this.amount = amount
//   this.payee = payee
//   this.category = category
//   this.type = type
//   this.note = note
//   this.owner = owner
//   this.version = version
// }
