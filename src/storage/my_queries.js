import gql from 'graphql-tag';

import API, { graphqlOperation } from '@aws-amplify/api';

/* schema queries */
import {
  deleteTransaction,
  deleteCategory,
  deletePayee,
} from '../graphql/mutations';

import {
  getTransaction,
  getCategory,
  createCategory,
} from '../graphql/queries';

import uuidv4 from '../functions/uuidv4';

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
    console.log('error: ', err);
  }
  return list;
};

/* static querys */
export const listTransactions = gql`
query ListTransactions {
  listTransactions{
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
    # nextToken
  }
}
`;
export const listCategorys = gql`
query ListCategorys {
  listCategorys {
    items {
      id
      name
      color
      type
      owner
      version
    }
    # nextToken
  }
}
`;
/* custom GQLs query return functions */
export const CreateCategoryGQL = (category) => {
  const query = gql`
mutation createCategory {
  createCategory (input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    owner: ${'"'+category.owner+'"'}
    version: ${category.version}
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
  return query
};
export const CreatePayeeGQL = (payee) => {
  const query = gql`
mutation CreatePayee {
  createPayee(input: {
    id: ${'"'+payee.id+'"'}
    name: ${'"'+payee.name+'"'}
    owner: ${'"'+payee.owner+'"'}
    version: ${payee.version}
  }) {
    id
    name
  }
}
`;
  return query;
};
export const CreateTransactionGQL = (transaction) => {
  const query = gql`
mutation createTransaction {
  createTransaction(input: {
    id: ${'"'+transaction.id+'"'}
    date: ${'"'+transaction.date+'"'}
    amount: ${transaction.amount}
    owner: ${'"'+transaction.owner+'"'}
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
    }
  }
}
`;
  return query;
};
export const UpdateTransactionGQL = (updated) => {
  // console.log('updated: ', updated);
  const graphql_query = gql`
mutation updateTransaction {
  updateTransaction(input: {
    id: ${'"'+updated.id+'"'}
    date: ${'"'+updated.date+'"'}
    amount: ${updated.amount}
    owner: ${'"'+updated.owner+'"'}
    # payee: ${updated.payee}
    version: ${updated.version}
    note: ${'"'+updated.note+'"'}
    type: ${'"'+updated.type+'"'}

    # transactionPayeeId: ${'"'+updated.payee.id+'"'}
    transactionCategoryId: ${'"'+updated.category.id+'"'}

  }) {
    id
    amount
    version
  }
}`;
  return graphql_query
};

export const UpdateCategoryGQL = (updated) => {
  const graphql_query = gql`
mutation updateCategory {
  updateCategory(input: {
    id: ${'"'+updated.id+'"'}
    name: ${'"'+updated.name+'"'}
    color: ${'"'+updated.color+'"'}
    type: ${'"'+updated.type+'"'}
    owner: ${'"'+updated.owner+'"'}
    # version: ${updated.version}
  }) {
    id
    name
    color
    type
    owner
    version
  }
}`;
  return graphql_query
};


// export const GetTransactionByIDGQL = (id) => {
//   const graphql_query = gql`
// query getTransaction {
//   getTransaction(input: {
//     id: ${id}
//   }) {
//     id
//     amount
//     version
//   }
// }`;
//   return graphql_query
// };


/* API calls */
export const removeCategory = async (category) => {
  try {
    await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
    // console.log('category successfully deleted.', category.id);
  } catch (err) {
    console.log('error deleting category...', err);
  }
};
export const removePayee = async (payee) => {
  try {
    await API.graphql(graphqlOperation(deletePayee, { input: { id: payee.id } }));
    // console.log('payee successfully deleted.', payee.id);
  } catch (err) {
    console.log('error deleting payee...', err);
  }
};
export const removeTransaction = async (transaction) => {
  try {
    await API.graphql(graphqlOperation(deleteTransaction, { input: { id: transaction.id } }));
    console.log('transaction successfully deleted.');
  } catch (err) {
    console.log('error deleting transaction...', err);
  }
};

export const savePayee = async (payee) => {
  // push new payee to cloud
  try {
    const mutation = await graphqlOperation(CreatePayeeGQL(payee)); // store transaction in cloud
    await API.graphql(mutation);
  } catch (err) {
    // failed to upload transaction
    console.log('error creating payee...', err);
  }
}
export const saveCategory = async (category) => {
  // send to server
  try {
    const categoryMutation = await graphqlOperation(CreateCategoryGQL(category)) // push new category
    await API.graphql(categoryMutation);
    console.log('category successfully created:', category.id);
  } catch (e) {
    // console.log('error saving category:', e);
    // console.log('Update category error (duplicate):');

    // throw new Error('Update category error (duplicate)');
    category.version = category.version + 1

    updateCategory(category);

  }
};
export const formatTransactionInput = (item) => {
  let obj = {};
  Object.keys(item).forEach((key) => {
    if (key) {
      obj.key = key
      // checking for nulls
      if ((item[key] === null || !item[key]) && item[key] !== 0) {
        if (key === 'note') obj[key] = 'Add note';

        if (key === 'payee') obj[key] = {
          id: uuidv4(),
          name: 'None',
          owner: item.owner,
          version: 0,
        }

      }
      else {
        obj[key] = item[key]
      }
    }
  });
  return obj
}

export const formatCategoryInput = (item) => {
  let obj = {};
  Object.keys(item).forEach((key) => {
    if (key) {
      obj.key = key
      // checking for nulls
      if ((item[key] === null || !item[key]) && item[key] !== 0) {
        // console.log('item[key]: ', item[key]);
        // if (key === 'note') obj[key] = 'Add note';

        // if (key === 'payee') obj[key] = {
        //   id: uuidv4(),
        //   name: 'None',
        //   owner: item.owner,
        //   version: 0,
        // }

      }
      else {
        obj[key] = item[key]
      }
    }
  });
  return obj
}


export const saveTransaction = async (transaction) => {
  // validate trans properties, check for null/empty and fix it
  let input = formatTransactionInput(transaction)
  // console.log('input: ', input);
  try {
    const mutation = await graphqlOperation(CreateTransactionGQL(input)); // store transaction in cloud
    await API.graphql(mutation);
    console.log('transaction successfully created:', input.id);
  } catch (err) {
    console.log('error creating transaction...', err);
  }
}
export const updateTransaction = async (updated) => {
  let input = formatTransactionInput(updated)
  // console.log('input: ', input);
  try {
    await API.graphql(graphqlOperation(UpdateTransactionGQL(input)));
    console.log('transaction successfully updated:', input.id);
  } catch (err) {
    // transaction dne yet (most likely)
    console.log('error updating transaction...', err);
    saveTransaction(input);
  }
};
export const updateCategory = async (updated) => {
  // console.log('updated category: ', updated);
  try {
    await API.graphql(graphqlOperation(UpdateCategoryGQL(updated)));
    console.log('category successfully updated...');
  } catch (err) {
    console.log('error updating category...', err);
    saveCategory(updated)
  }
};
export const getTransactionByID = async (id) => {
  let obj;
  console.log('HELLO')
  try {
    let stored = await API.graphql(graphqlOperation(getTransaction, { id: id }))
    obj = stored.data.getTransaction;
    console.log('obj: ', obj);
  } catch (err) {
    console.log('error getting transaction by id...', err);
  }
  return obj;
};
export const getCategoryByID = async (id) => {
  // console.log('getting cat by id: ', id);
  let obj;
  try {
    let stored = await API.graphql(graphqlOperation(getCategory, { id: id }))
    obj = stored.data.getCategory;
  } catch (err) {
    console.log('error getting category by id...', err);
  }
  return obj;
};
