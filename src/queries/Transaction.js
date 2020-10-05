import API, { graphqlOperation } from '@aws-amplify/api';

// import gql from 'graphql-tag';

// WORKING !!!

import {
  deleteTransaction,
} from '../graphql/mutations';

import {
  // UpdatePayee,
  AddPayee,
} from './Payee';

import {
  // UpdateCategory,
  GetCategory,
} from './Category';

import Payee from 'models/Payee';

export const listTransactionsGQL = `
query ListTransactions {
  listTransactions (limit: 1000000) {
    items {
      id
      date
      amount
      owner
      category {
        id
        name
        color
        type
        owner
        version
      }
      payee {
        id
        name
        owner
        version
      }
      type
      note
      version
    }
  }
}
`;

// const listTransactions = `

// query ListTransactions {
//   listTransactions (limit: 1000000000) {
//     items {
//       id
//       date
//       amount
//       owner
//       payee {
//         id
//       }
//       category {
//         id
//         name
//       }
//       type
//       note
//       version
//     }
//     # nextToken
//   }
// }
// }
// `

export const ListTransactions = async () => {
  let list = [];
  try {
    const graphqldata = await API.graphql(graphqlOperation(listTransactionsGQL));
    // console.log('graphqldata.data.listTransactions.items.length: ', graphqldata.data.listTransactions.items.length);
    list = graphqldata.data.listTransactions.items;
    // console.log('online categories list.length: ', list.length);
    return list;
  } catch (err) {
    console.log('error fetching user transactions from online: ', err);
    return err;
  }
  return list;
};


// console.log('AddTransaction(): ', AddTransaction());
export const AddTransaction = async (transaction) => {
    const query = `
mutation AddTransaction {
  createTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    amount: ${transaction.amount}
    date: ${'"'+transaction.date+'"'}
    owner: ${'"'+transaction.owner+'"'}
    transactionPayeeId: ${'"'+transaction.payee.id+'"'}
    transactionCategoryId: ${'"'+transaction.category.id+'"'}
    type: ${'"'+transaction.type+'"'}
    note: ${'"'+transaction.note+'"'}
    version: ${0}
  }) {
    id
    date
    amount
    owner
    payee {
      id
      name
      owner
      version
    }
    category {
      id
      name
      color
      type
      owner
      version
    }
    type
    note
    version
  }
}
  `;
  try {
    let response = await API.graphql(graphqlOperation(query));
    // console.log('transaction successfully added:', transaction);
    return response.data.createTransaction;
  } catch (err) {
    const { message } = err;
    console.log('error adding transaction:', message);
    return err.message;
  }
};


export const UpdateTransaction = async (transaction) => {
  // if (!transaction.payee) {
  //   let payee = new Payee({
  //     owner: transaction.id
  //   });
  //   AddPayee(payee);
  //   transaction.payee = payee;
  // }
  // console.log('transaction.category: ', transaction.category);
  // let found = await GetCategory(transaction.category)
  // console.log('found: ', found);
  const query = `
mutation UpdateTransaction {
  updateTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    amount: ${transaction.amount}
    date: ${'"'+transaction.date+'"'}
    owner: ${'"'+transaction.owner+'"'}
    transactionPayeeId: ${'"'+transaction.payee.id+'"'}
    transactionCategoryId: ${'"'+transaction.category.id+'"'}
    type: ${'"'+transaction.type+'"'}
    note: ${'"'+transaction.note+'"'}
    version: ${transaction.version += 1}
  }) {
    id
    date
    amount
    owner
    payee {
      id
      name
      owner
      version
    }
    category {
      id
      name
      color
      type
      owner
      version
    }
    type
    note
    version
  }
}
  `;
  // console.log('query: ', query);
  try {
    let response = await API.graphql(graphqlOperation(query));
    // console.log('transaction successfully updated:', transaction);
    return response.data.updateTransaction;
  } catch (err) {
    // const { message } = err;
    // console.log('error updating transaction:', err);
    // return err.message;
    // console.log('query: ', query);
    // throw err
    console.log('transaction: ', transaction);
    // AddTransaction(transaction);
  }
};

export const DeleteTransaction = async (transaction) => {
  try {
    await API.graphql(graphqlOperation(deleteTransaction, { input: { id: transaction.id } }));
    // console.log('transaction successfully deleted.', transaction.id);
  } catch (err) {
    console.log('error deleting transaction...', err);
  }
};
