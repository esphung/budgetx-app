import gql from 'graphql-tag';

import API, { graphqlOperation } from '@aws-amplify/api';

/* schema queries */
import {
  deleteTransaction,
  deleteCategory,
  deletePayee,
  // createCategory,
} from '../graphql/mutations';

import {
  getTransaction,
  getCategory,
  listCategorys,
} from '../graphql/queries';

import uuidv4 from '../functions/uuidv4';


// import searchByID from '../functions/searchByID';

// import getUniqueId from '../functions/getUniqueId';

/* fetch cloud resources functions */
export const fetchStoredCategories = async () => {
  let list = [];
  try {
    const graphqldata = await API.graphql(graphqlOperation(listCategorys));
    list = graphqldata.data.listCategorys.items;
    // console.log('list: ', list);
  } catch (err) {
    console.log('error fetching user categories: ', err);
  }
  return list;
};
export const fetchStoredTransactions = async () => {
  let list = [];
  try {
    const graphqldata = await API.graphql(graphqlOperation(listTransactions));
    list = graphqldata.data.listTransactions.items;
  } catch (err) {
    console.log('err: ', err);
  }
  return list;
};

const listCategorysGQL = gql`
query ListCategorys {
  listCategorys (limit: 1000000000) {
    items {
      id
      name
      color
      type
      owner
      version
      # transactions {
      #   nextToken
      # }
    }
    # nextToken
  }
}
`;

export const listAllOnlineCategories = async () => {
  let list = [];
  try {
    const graphqldata = await API.graphql(graphqlOperation(listCategorysGQL));
    // console.log('graphqldata: ', graphqldata);
    list = graphqldata.data.listCategorys.items;
    // console.log('online categories list.length: ', list.length);
  } catch (err) {
    console.log('error fetching user categories from online transactions: ', err);
  }
  return list;
};

/* static querys */
export const listTransactions = gql`
query ListTransactions {
  # listTransactions (limit: 1000000) {
  listTransactions (
    limit: 1000000000,
    # filter: {
    #   # owner: {
    #   #   contains: "3fb13ac4-a22c-4799-a7f8-a4b4d0115023"
    #   # }
    #   type: {
    #     contains: "EXPENSE"
    #   }
    # }
  ) {
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
    # # nextToken
  }
}
`;

/* custom GQLs query return functions */
export const CreateCategoryGQL = (category) => {
  const query = gql`
mutation CreateCategory {
  createCategory(input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    owner: ${'"'+global.storageKey+'"'}
    version: 0
  }) {
    id
    name
    color
    type
    owner
    version
  }
}
`;
  return query;
};
export const CreatePayeeGQL = (payee) => {
  const query = gql`
mutation CreatePayee {
  createPayee(input: {
    id: ${'"'+payee.id+'"'}
    name: ${'"'+payee.name+'"'}
    owner: ${'"'+global.storageKey+'"'}
    version: ${payee.version}
  }) {
    id
    name
    owner
    version
  }
}
`;
  return query;
};
// id, date, amount, owner, payee, category, type, note, version
export const CreateTransactionGQL = (transaction) => {
  console.log('transaction: ', transaction);
  const query = gql`
mutation CreateTransaction {
  createTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    date: ${'"'+transaction.date+'"'}
    amount: ${transaction.amount}
    owner: ${'"'+global.storageKey+'"'}
    transactionPayeeId: ${'"'+transaction.payee.id+'"'}
    version: ${transaction.version}
    note: ${'"'+transaction.note+'"'}
    transactionCategoryId: ${'"'+transaction.category.id+'"'}
    type: ${'"'+transaction.type+'"'}

  }) {
    id
    amount
    version
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
  }
}
`;
  return query;
};

// User Pool Web Client Id
// 794chgh604h4tsi3l10j5tmd3

export const UpdateTransactionGQL = (transaction) => {
  // console.log('updated: ', transaction);
  const graphql_query = gql`
mutation UpdateTransaction {
  updateTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    date: ${'"'+transaction.date+'"'}
    amount: ${transaction.amount}
    owner: ${'"'+global.storageKey+'"'}
    version: ${(transaction.version + 1)}
    note: ${'"'+transaction.note+'"'}
    type: ${'"'+transaction.type+'"'}
    transactionCategoryId: ${'"'+transaction.category.id+'"'}
    
  }) {
    id
    date
    amount
    owner
    version
    note
    type
    category {
      id
      name
      type
      color
      owner
      version
    }
  }
}


`;
  return graphql_query;
};

// mutation UpdateCategory {
//   updateCategory(input: {
//     id: "6789"
//     name: "Updated Hello"
//     color: "#fffff"
//     type: "INCOME"
//     # owner: "81d12192-d55f-452c-be43-7f508638e438"
//     version: 1
//   }) {
//     id
//     name
//     color
//     type
//     owner
//     version
//   }
// }

export const UpdateCategoryGQL = (category) => {
  const graphql_query = gql`
mutation UpdateCategory {
  updateCategory(input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    owner: ${'"'+global.storageKey+'"'}
    version: ${(category.version + 1)}
  }) {
    id
    name
    color
    type
    owner
    version
  }
}`;
  return graphql_query;
};

export const getTransactionGQL = (transaction) => {
  const graphql_query = gql`
  query GetTransaction($id: ID!) {
    getTransaction(id: id: ${'"'+transaction.id+'"'}) {
      id
      date
      amount
      owner
      payee {
        id
        name
        owner
        version
        transaction {
          id
          date
          amount
          owner
          type
          note
          version
        }
      }
      category {
        id
        name
        color
        type
        owner
        version
        transactions {
          nextToken
        }
      }
      type
      note
      version
    }
  }
`;
}

/* API calls */
export const removeCategory = async (category) => {
  if (global.debugMode === true) return
  try {
    await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
    console.log('category successfully deleted.', category.id);
  } catch (err) {
    console.log('error deleting category...', err);
  }
};

export const DeleteCategory = async (category) => {
  if (global.debugMode === true) return
  try {
    await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
    console.log('category successfully deleted.', category.id);
  } catch (err) {
    console.log('error deleting category...', err);
  }
};

export const removePayee = async (payee) => {
  if (global.debugMode === true) return
  try {
    await API.graphql(graphqlOperation(deletePayee, { input: { id: payee.id } }));
    // console.log('payee successfully deleted.', payee.id);
  } catch (err) {
    console.log('error deleting payee...', err);
  }
};
export const DeleteTransaction = async (transaction) => {
  if (global.debugMode === true) return
  try {
    await API.graphql(graphqlOperation(deleteTransaction, { input: { id: transaction.id } }));
    console.log('transaction successfully deleted.', transaction.id);
  } catch (err) {
    console.log('error deleting transaction...', err);
  }
};

export const savePayee = async (payee) => {
  if (global.debugMode === true) return
  // push new payee to cloud
  try {
    const mutation = await graphqlOperation(CreatePayeeGQL(payee)); // store transaction in cloud
    await API.graphql(mutation);
  } catch (err) {
    // failed to upload transaction
    console.log('error creating payee...', err);
  }
};
export const SaveCategory = async (category) => {
  if (global.debugMode === true) return
  try {
    const categoryMutation = graphqlOperation(CreateCategoryGQL(category)); // push new category
    await API.graphql(categoryMutation);
    console.log('category successfully created:', category.id);
  } catch (e) {
    // console.log('category: ', category);
    // console.log('save category error:', e);
    // const errorType = e.errors[0].errorType;

    // if (errorType && errorType === 'DynamoDB:ConditionalCheckFailedException') {
    //   // console.log(`trying to update category ${category.id} instead ...`);
      UpdateCategory(category);
    // }
  }
};
export const formatTransactionInput = (item) => {
  if (global.debugMode === true) return
  const obj = {};
  Object.keys(item).forEach((key) => {
    if (key) {
      obj.key = key;
      // checking for nulls
      if ((item[key] === null || !item[key]) && item[key] !== 0) {
        if (key === 'note') obj[key] = 'Add note';

        if (key === 'payee') obj[key] = {
          id: uuidv4(),
          name: 'None',
          owner: global.storageKey,
          version: 0,
        };
      }
      else {
        obj[key] = item[key];
      }
    }
  });
  return obj;
};

export const saveTransaction = async (transaction) => {
  console.log('transaction.category: ', transaction.category);
  if (global.debugMode === true) return
  try {
    const mutation = await graphqlOperation(CreateTransactionGQL(transaction)); // store transaction in cloud
    
    API.graphql(mutation);
    console.log('transaction successfully created:', transaction.id);
  } catch (err) {
    console.log('error creating transaction...', err);
    UpdateTransaction(transaction)
    // console.log('transaction: ', transaction);
  }
};
export const UpdateTransaction = async (updated) => {
  if (global.debugMode === true) return
  try {
    await API.graphql(graphqlOperation(UpdateTransactionGQL(updated)));
    // console.log('transaction successfully updated:', updated.id);
  } catch (err) {
    // throw new Error(err);
    // transaction dne yet (most likely)
    // if (!(err.errors[0]['errorType'])) return
    // console.log('error updating transaction...',  err.errors[0]['errorType']);
    // let errorType = err.errors[0]['errorType']
    // if (errorType !== 'DynamoDB:ConditionalCheckFailedException') throw new Error(err);

    // if (errorType === 'DynamoDB:ConditionalCheckFailedException') {
    //   // transaction dne online
    //   saveTransaction(updated)
    // }

  }
};
export const UpdateCategory = async (category) => {
  // console.log('category before update: ', category);
  if (global.debugMode === true) return
  try {
    const response = await API.graphql(graphqlOperation(UpdateCategoryGQL(category)));
    // console.log(`${'category successfully updated...'} ${JSON.stringify(response.data.updateCategory, null, 2)}`);
    // console.log('category successfully  updated: ', category.id);
  } catch (err) {
    console.log('error updating category in UpdateCategory...', err); // err

    // if (!(err.errors[0]['errorType'])) return

    // let errorType = err.errors[0]['errorType']

    // if (errorType === 'DynamoDB:ConditionalCheckFailedException') {
    //   // transaction dne online
    //   SaveCategory(category)
    // }

    // if (!err.data.updateCategory) {
    //   // category doesnt exist yet
    //   SaveCategory(updated)
    // }
  }
};

export const GetTransaction = async (transaction) => {
  let obj;
  try {
    const response = await API.graphql(graphqlOperation(UpdateTransactionGQL(category)));
    // obj = response.data.getTransaction;
    // console.log('obj: ', obj);
    console.log('response: ', response);
    // console.log('retrieved transaction by id: ', transaction);
  } catch (err) {
    console.log('error getting transaction...', err);
  }
  return obj;
};
export const getTransactionByID = async (id) => {
  // console.log('retrieved transaction by id: ', id);
  let obj;
  try {
    const stored = await API.graphql(graphqlOperation(getTransaction, { id: id }));
    obj = stored.data.getTransaction;
    console.log('obj: ', obj);
  } catch (err) {
    // console.log('error getting transaction by id...', err);
  }
  return obj;
};

export const getCategoryByID = async (id) => {
  let obj;
  try {
    const stored = await API.graphql(graphqlOperation(getCategory, { id: id }));
    obj = stored.data.getCategory;
    console.log('obj: ', obj);
  } catch (err) {
    // console.log('error getting category by id...', err);
    throw new Error(err)

  }
  return obj;
};


