import gql from 'graphql-tag';

import API, { graphqlOperation } from '@aws-amplify/api';

/* schema queries */
import {
  deleteTransaction,
  deleteCategory,
  deletePayee,
  createCategory,
} from '../graphql/mutations';

import {
  getTransaction,
  // getCategory,
  listCategorys,
} from '../graphql/queries';

import uuidv4 from '../functions/uuidv4';


import searchByID from '../functions/searchByID';



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

export const listAllOnlineCategories = async () => {
 let list = [];
  try {
    const graphqldata = await API.graphql(graphqlOperation(listTransactions));
    // console.log('graphqldata: ', graphqldata);
    let transactions = graphqldata.data.listTransactions.items

    transactions.forEach((transaction) => {
      if (!transaction.category) return
      if (!(searchByID(transaction.category.id, list) )) {
        list.push(transaction.category)
      }
    })
    // console.log('list.length: ', list.length);
  } catch (err) {
    console.log('error fetching user categories from online transactions: ', err);
  }
  return list;
};

/* static querys */
export const listTransactions = gql`
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
    # nextToken
  }
}
`;
// export const listCategorys = gql`
// query ListCategorys {
//   listCategorys {
//     items {
//       id
//       name
//       color
//       type
//       owner
//       version
//     }
//     # nextToken
//   }
// }
// `;
/* custom GQLs query return functions */
export const CreateCategoryGQL = (category) => {
//   const query = gql`
// mutation CreateCategory {
//   createCategory(input: {
//  id: ${'"'+category.id+'"'}
//     name: ${'"'+category.name+'"'}
//     color: ${'"'+category.color+'"'}
//     type: ${'"'+category.type+'"'}
//     # owner: "81d12192-d55f-452c-be43-7f508638e438"
//   }) {
//     id
//     name
//     type
//     owner
//   }
// }`

  const query = gql`
mutation createCategory {
  createCategory (input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    # owner: ${'"'+category.owner+'"'}
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
    # owner: ${'"'+updated.owner+'"'}
    # payee: ${updated.payee}
    version: ${(updated.version + 1)}
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
    # owner: ${'"'+updated.owner+'"'}
    version: ${(updated.version + 1)}
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

// export const GetCategoryByIDGQL = (id) => {
//   const graphql_query = gql`
// query GetCategory {
//   getCategory(id: ${'"'+id+'"'}) {
//     id
//     name
//     type
//     owner
//     version
//   }
// }
//   `
//   return graphql_query
// }



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
    console.log('category successfully deleted.', category.id);
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

  // try {
  //   // try to update existing onine cat first
  //   // updateCategory(category);
  // } catch(e) {
  //   // statements
  //   console.log('error updating category from savveCategory():', e.errors);

    try {
      const categoryMutation = await graphqlOperation(CreateCategoryGQL(category)) // push new category
      await API.graphql(categoryMutation);
      console.log('category successfully created:', category.id);
    } catch (e) {
      console.log('error saving category:', e);
      // console.log('save category error:', category);
      console.log(`trying to update ccategory ${category.id} instead ...`);
      updateCategory(category);
    }
  // }

  
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
          owner: global.storageKey,
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
    saveCategory(input.category)
    await API.graphql(mutation);
    console.log('transaction successfully created:', input.id);
  } catch (err) {
    console.log('error creating transaction...', err);
    // updateTransaction(input)
    // console.log('transaction: ', transaction);
  }
}
export const updateTransaction = async (updated) => {
  saveTransaction(updated);
  // // let input = formatTransactionInput(updated)
  // // console.log('input: ', input);
  // try {
  //   await API.graphql(graphqlOperation(UpdateTransactionGQL(updated)));
  //   console.log('transaction successfully updated:', updated.id);
  // } catch (err) {
  //   // transaction dne yet (most likely)
  //   console.log('error updating transaction...', err);
  // //   removeTransaction(updated)
  // //   if (!err.data) {
  // //   saveTransaction(updated);
  // // }
  // }
};
export const updateCategory = async (updated) => {
  try {
    let response = await API.graphql(graphqlOperation(UpdateCategoryGQL(updated)));
    console.log('category successfully updated...', response.data.updateCategory);


  } catch (err) {
    // console.log('error updating category...', err); // err
    // err.data.updateCategory
    // saveCategory(updated);
    removeCategory(updated)
    if (!err.data.updateCategory) {
      // category doesnt exist yet
      saveCategory(updated)
    }
  }
};
export const getTransactionByID = async (id) => {
  let obj;
  try {
    let stored = await API.graphql(graphqlOperation(getTransaction, { id: id }))
    obj = stored.data.getTransaction;
    // console.log('obj: ', obj);
  } catch (err) {
    console.log('error getting transaction by id...', err);
  }
  return obj;
};
// export const getCategoryByID = async (id) => {
//   // let obj;
//   // try {
//   //   let stored = await API.graphql(graphqlOperation(getCategory, { id: id }))
//   //   obj = stored.data.getCategory;
//   //   return obj;
//   // } catch (err) {
//   //   throw new Error(err.message)
//   //   console.log('error getting category by id...', err);
//   // }
//   // return obj;
// };




