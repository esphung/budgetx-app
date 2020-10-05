// import gql from 'graphql-tag';

// import API, { graphqlOperation } from '@aws-amplify/api';

// /* schema queries */
// import {
//   deleteTransaction,
//   deleteCategory,
//   deletePayee,
//   // createCategory,
//   // updatePayee,
//   // updateTransaction,
// } from '../graphql/mutations';

// // import {
// //   UpdatePayee,
// // } from '../queries/Payee';

// import {
//   getTransaction,
//   getCategory,
//   listCategorys,
//   listPayees,
//   listTransactions,
// } from '../graphql/queries';

// // import uuidv4 from '../functions/uuidv4';

// // import searchByID from '../functions/searchByID';

// // import getUniqueId from '../functions/getUniqueId';

// /* fetch cloud resources functions */
// export const fetchStoredCategories = async () => {
//   let list = [];
//   try {
//     const graphqldata = await API.graphql(graphqlOperation(listCategorys));
//     list = graphqldata.data.listCategorys.items;
//     // console.log('list: ', list);
//   } catch (err) {
//     // console.log('error fetching user categories: ', err);
//     throw err;
//   }
//   return list;
// };
// export const fetchStoredTransactions = async () => {
//   let list = [];
//   try {
//     const graphqldata = await API.graphql(graphqlOperation(listTransactions));
//     list = graphqldata.data.listTransactions.items;
//   } catch (err) {
//     // console.log('err: ', err);
//     throw err;
//   }
//   return list;
// };

// export const listAllOnlinePayees = async () => {
//   let list = [];
//   try {
//     const graphqldata = await API.graphql(graphqlOperation(listPayees));
//     list = graphqldata.data.listPayees.items;
//     // console.log('payees list.length: ', list.length);
//   } catch (err) {
//     // console.log('err: ', err);
//     throw err;
//   }
//   return list;
// };

// const listCategorysGQL = gql`
// query ListCategorys {
//   listCategorys (limit: 1000000000) {
//     items {
//       id
//       name
//       color
//       type
//       owner
//       version
//       transactions {
//         nextToken
//       }
//     }
//     # nextToken
//   }
// }
// `;

// export const listAllOnlineCategories = async () => {
//   let list = [];
//   try {
//     const graphqldata = await API.graphql(graphqlOperation(listCategorysGQL));
//     // console.log('graphqldata: ', graphqldata);
//     list = graphqldata.data.listCategorys.items;
//     // console.log('online categories list.length: ', list.length);
//   } catch (err) {
//     console.log('error fetching user categories from online transactions: ', err);
//   }
//   return list;
// };

// /* custom GQLs query return functions */
// export const CreateCategoryGQL = (category) => {
//   const query = gql`
// mutation CreateCategory {
//   createCategory(input: {
//     id: ${'"'+category.id+'"'}
//     name: ${'"'+category.name+'"'}
//     color: ${'"'+category.color+'"'}
//     type: ${'"'+category.type+'"'}
//     owner: ${'"'+global.storageKey+'"'}
//     version: 0
//   }) {
//     id
//     name
//     color
//     type
//     owner
//     version
//   }
// }
// `;
//   return query;
// };
// export const CreatePayeeGQL = (payee) => {
//   const query = gql`
// mutation CreatePayee {
//   createPayee(input: {
//     id: ${'"'+payee.id+'"'}
//     name: ${'"'+payee.name+'"'}
//     owner: ${'"'+global.storageKey+'"'}
//     version: ${payee.version}
//   }) {
//     id
//     name
//     owner
//     version
//   }
// }
// `;
//   return query;
// };
// // id, date, amount, owner, payee, category, type, note, version
// export const CreateTransactionGQL = (transaction) => {
//   // console.log('transaction: ', transaction);
//   const query = gql`
// mutation CreateTransaction {
//   createTransaction(input: {
//     id: ${'"'+transaction.id+'"'}
//     date: ${'"'+transaction.date+'"'}
//     amount: ${transaction.amount}
//     owner: ${'"'+global.storageKey+'"'}
//     transactionPayeeId: ${'"'+transaction.payee.id+'"'}
//     version: ${transaction.version}
//     note: ${'"'+transaction.note+'"'}
//     transactionCategoryId: ${'"'+transaction.category.id+'"'}
//     type: ${'"'+transaction.type+'"'}

//   }) {
//     id
//       date
//       amount
//       owner
//       category {
//         id
//         name
//         color
//         type
//         owner
//         version
//       }
//       payee {
//         id
//         name
//         owner
//         version
//       }
//       type
//       note
//       version
//   }
// }
// `;
//   return query;
// };

// // // id, date, amount, owner, payee, category, type, note, version
// // export const UpdateTransactionGQL = (transaction) => {
// //   console.log('transaction: ', transaction);
// //   const query = gql`
// // mutation CreateTransaction {
// //   createTransaction(input: {
// //     id: ${'"'+transaction.id+'"'}
// //     date: ${'"'+transaction.date+'"'}
// //     amount: ${transaction.amount}
// //     owner: ${'"'+global.storageKey+'"'}
// //     transactionPayeeId: ${'"'+transaction.payee.id+'"'}
// //     version: ${transaction.version}
// //     note: ${'"'+transaction.note+'"'}
// //     transactionCategoryId: ${'"'+transaction.category.id+'"'}
// //     type: ${'"'+transaction.type+'"'}

// //   }) {
// //     id
// //       date
// //       amount
// //       owner
// //       category {
// //         id
// //         name
// //         color
// //         type
// //         owner
// //         version
// //       }
// //       payee {
// //         id
// //         name
// //         owner
// //         version
// //       }
// //       type
// //       note
// //       version
// //   }
// // }
// // `;
// //   return query;
// // };

// // export const UpdateCategoryGQL = (category) => {
// //   const graphql_query = gql`
// // mutation UpdateCategory {
// //   updateCategory(input: {
// //     id: ${'"'+category.id+'"'}
// //     name: ${'"'+category.name+'"'}
// //     color: ${'"'+category.color+'"'}
// //     type: ${'"'+category.type+'"'}
// //     owner: ${'"'+global.storageKey+'"'}
// //     version: ${(category.version + 1)}
// //   }) {
// //     id
// //     name
// //     color
// //     type
// //     owner
// //     version
// //   }
// // }`;
// //   return graphql_query;
// // };

// export const getTransactionGQL = (transaction) => {
//   const graphql_query = gql`
//   query GetTransaction($id: ID!) {
//     getTransaction(id: id: ${'"'+transaction.id+'"'}) {
//       id
//       date
//       amount
//       owner
//       payee {
//         id
//         name
//         owner
//         version
//         transaction {
//           id
//           date
//           amount
//           owner
//           type
//           note
//           version
//         }
//       }
//       category {
//         id
//         name
//         color
//         type
//         owner
//         version
//         transactions {
//           nextToken
//         }
//       }
//       type
//       note
//       version
//     }
//   }
// `;
// }

// // /* API calls */
// // export const removeCategory = async (category) => {
// //   try {
// //     await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
// //     console.log('category successfully deleted.', category.id);
// //   } catch (err) {
// //     console.log('error deleting category...', err);
// //   }
// // };

// export const DeleteCategory = async (category) => {
//   try {
//     await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
//     console.log('category successfully deleted.', category.id);
//   } catch (err) {
//     console.log('error deleting category...', err);
//   }
// };

// export const DeletePayee = async (payee) => {
//   try {
//     await API.graphql(graphqlOperation(deletePayee, { input: { id: payee.id } }));
//     console.log('payee successfully deleted.', payee.id);
//   } catch (err) {
//     console.log('error deleting payee...', err);
//   }
// };
// export const DeleteTransaction = async (transaction) => {
//   try {
//     await API.graphql(graphqlOperation(deleteTransaction, { input: { id: transaction.id } }));
//     console.log('transaction successfully deleted.', transaction.id);
//   } catch (err) {
//     console.log('error deleting transaction...', err);
//   }
// };

// export const savePayee = async (payee) => {
//   // push new payee to cloud
//   try {
//     const mutation = await graphqlOperation(CreatePayeeGQL(payee)); // store transaction in cloud
//     await API.graphql(mutation);
//   } catch (err) {
//     // failed to upload transaction
//     console.log('error creating payee...', err);
//   }
// };
// // export const SaveCategory = async (category) => {
// //   if (global.debugMode === true) return
// //   try {
// //     const categoryMutation = graphqlOperation(CreateCategoryGQL(category)); // push new category
// //     await API.graphql(categoryMutation);
// //     console.log('category successfully created:', category.id);
// //   } catch (e) {
// //     // console.log('category: ', category);
// //     // console.log('save category error:', e);
// //     // const errorType = e.errors[0].errorType;

// //     // if (errorType && errorType === 'DynamoDB:ConditionalCheckFailedException') {
// //     //   // console.log(`trying to update category ${category.id} instead ...`);
// //       // UpdateCategory(category);
// //     // }
// //   }
// // };

// // export const saveTransaction = async (transaction) => {
// //   // console.log('transaction.category: ', transaction.category);
// //   try {
// //     const mutation = await API.graphql(graphqlOperation(CreateTransactionGQL(transaction))); // push new category
    
// //   } catch (err) {
// //     console.log('error creating transaction...', err);
// //     UpdateTransaction(transaction)
// //     // console.log('transaction: ', transaction);
// //   }
// // };

// export const getTransactionByID = async (id) => {
//   // console.log('retrieved transaction by id: ', id);
//   let obj;
//   try {
//     const stored = await API.graphql(graphqlOperation(getTransaction, { id: id }));
//     obj = stored.data.getTransaction;
//     // console.log('obj: ', obj);
//   } catch (err) {
//     // console.log('error getting transaction by id...', err);
//   }
//   return obj;
// };

// export const getCategoryByID = async (id) => {
//   let obj;
//   try {
//     const stored = await API.graphql(graphqlOperation(getCategory, { id: id }));
//     obj = stored.data.getCategory;
//     // console.log('obj: ', obj);
//   } catch (err) {
//     // console.log('error getting category by id...', err);
//     throw new Error(err)

//   }
//   return obj;
// };

