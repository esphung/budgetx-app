import API, { graphqlOperation } from '@aws-amplify/api';

// import gql from 'graphql-tag';

// import colorLog from 'functions/colorLog';

import { showMessage } from 'react-native-flash-message';

// WORKING !!!

import {
  deleteTransaction,
} from '../graphql/mutations';

import {
  getTransaction,
} from '../graphql/queries';

import {
  // UpdatePayee,
  ListPayees,
  AddPayee,
} from './Payee';

// import {
//   // UpdateCategory,
//   GetCategory,
// } from './Category';

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

const showSignUpMessage = () => {
  if (global.hasSeenNoCurrentUserMessage !== true) {
    showMessage({
      description: 'please sign up or login to sync device',
      message: 'no current user',
      autoHide: false,
      floating: true,
      icon: { icon: 'danger', },
      animated: true,
    })
    global.hasSeenNoCurrentUserMessage = true;
  }
}

export const ListTransactions = async () => {

  
    const graphqldata = await API.graphql(graphqlOperation(listTransactionsGQL)).then((response) => {
      // console.log('ListTransactions response.data.listTransactions: ', JSON.stringify(response.data.listTransactions.items, [
      //     "id",
      //     "amount",
      //     "owner",
      //     "type",
      //     "version",
      //   ], 1));
      return response.data.listTransactions.items;
    }).catch((err) => {
      console.log('ListTransactions err: ', err);
      // Error: No current user'
      if (err === 'No current user') {
        showSignUpMessage();
        // return err;
        return []
      }
      return graphqldata;
    })
    return graphqldata;
    // console.log('graphqldata.data.listTransactions.items.length: ', graphqldata.data.listTransactions.items.length);
    // console.log('online categories list.length: ', list.length);
    // console.log('list.filter((item) => !item.payee)): ', list.filter((item) => !item.payee));
    // let noPayeesList = list.filter((item) => !item.payee);
    // console.log('await ListPayees(): ', await ListPayees());
    // return list;
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
    version: ${transaction.version}
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
    // colorLog({ message: 'transaction successfully added:' + transaction.id, color: 'yellow' });
    // return response.data.createTransaction;
    // console.log('response: ', response);
    return response.data.addTransaction;
  } catch (err) {
    // const { message } = err;
    // throw err;
    // console.log('error adding transaction:', message);
    // return err.message;
  }
};


export const UpdateTransaction = async (transaction) => {
  if (!transaction.payee) {
    let payee = new Payee({
      owner: transaction.owner,
      name: transaction.note,
    });
    transaction.payee = payee;
    AddPayee(payee);
  }
  // console.log('transaction.category: ', transaction.category);
  // let found = await GetCategory(transaction.category)
  // console.log('found: ', found);
  const query = `
mutation UpdateTransaction {
  updateTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    amount: ${(transaction.amount) ? (transaction.category.type === 'EXPENSE' ?  -Math.abs(transaction.amount).toFixed(2) : Math.abs(transaction.amount).toFixed(2)) : 0.00}
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
  const result = await API.graphql(graphqlOperation(query))
    .then((response) => response.data.updateTransaction)
    .catch((err) => err.data.updateTransaction);
  return result;
};

export const GetTransaction = async (transaction) => {
    const result = await API.graphql(graphqlOperation(getTransaction, { id: transaction.id }))
      .then((response) => {
        // console.log('response: ', response);
        return response.data.getTransaction
      })
      .catch((err) => {
        console.warn('err: ', err);
        return err.data.getTransaction
      });
    return result;
};

export const DeleteTransaction = async (transaction) => {
    const result = await API.graphql(graphqlOperation(deleteTransaction, { input: { id: transaction.id } }))
      .then((response) => response.data.deleteTransaction)
      .catch((err) => err.data.deleteTransaction);
    return result;
};
