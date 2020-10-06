import Auth from '@aws-amplify/auth';

import NetInfo from '@react-native-community/netinfo';

// import { showMessage } from 'react-native-flash-message';

import API, { graphqlOperation } from '@aws-amplify/api';

import gql from 'graphql-tag';

import {
  getCategory,
  getTransaction,
  // listTransactions,
} from '../graphql/queries';

import {
  UpdatePayee,
  // AddPayee,
} from '../queries/Payee';

import {
  UpdateCategory,
} from '../queries/Category';

import {
  UpdateTransaction,
} from '../queries/Transaction';

import filterCategories from 'functions/filterCategories';

import Storage from '@aws-amplify/storage';

export async function getS3ProfileImage(key) {
  /* Try to get online image */
  // global.storageKey
  // key
  try {
    let stored = await Storage.get(`@${key}/picture.jpg`, { level: 'public' });
    return stored;
  } catch (e) {
    throw ('can\'t get s3 image error:', e);
    return global.defaultAvatar;
  }
}

// check if user device is connected to internet
export const isDeviceOnline = async () => {
  const bool = await NetInfo.fetch().then((state) => state.isConnected);
  if (!bool) showMessage({ message: 'No internet', type: 'danger' });
  // console.log("Connection type", state.type);
  // console.log('Is connected?', state.isConnected);
  return bool;
};

// Get user authentication => true/false
export const getAuthentication = async () => {
  const authenticated = await Auth.currentAuthenticatedUser()
    .then((cognito) => true).catch((err) => false);
  return authenticated;
};

// Get user authentication => true/false
export const getCognitoIdentity = async () => {
  const cognito = await Auth.currentAuthenticatedUser()
    .then((cognito) => cognito)
    .catch((err) => err);
  return cognito;
};

export const UpdateCategories = async (categories) => {
  if (await isDeviceOnline()) {
    categories.forEach(async (category) => {
      // const response = await GetCategory(category);
      await UpdateCategory(response).then((result) => result);
    });
  }
};
export const UpdateTransactions = async (transactions) => {
  // do online stuff
  if (await isDeviceOnline()) {
    transactions = transactions.map((transaction) => {
      UpdatePayee(transaction.payee);
      UpdateCategory(transaction.category);
      UpdateTransaction(transaction);
      // console.log('response: ', response);
      // console.log('element: ', element);
      return transaction
    });
  }
  return transactions;
};

// const listTransactions = gql`
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

export const GetTransaction = async (transaction) => {
  try {
    const graphqldata = await API.graphql(graphqlOperation(getTransaction, transaction));
    console.log('graphqldata.data.getTransaction: ', graphqldata.data.getTransaction);
    return graphqldata.data.getTransaction;
  } catch(err) {
    // statements
    console.log('graphqldata.data.getTransaction => err: ', err.message);
    return err;
  }
};

export const GetCategory = async (category) => {
  try {
    const graphqldata = await API.graphql(graphqlOperation(getCategory, category));
    // console.log('graphqldata.data.getCategory: ', graphqldata.data.getCategory);
    return graphqldata.data.getCategory;
  } catch(err) {
    // statements
    console.log('graphqldata.data.getCategory => err: ', err.message);
    return err;
  }
};

export const syncCategories = async (local_categories) => {
  // Sync online categories and offline categories
  let online_categories = await ListCategories();
  try {
    let filtered = filterCategories(local_categories, online_categories);
    return filtered;
  } catch {
    // online_categories = [];
    console.log('There has been a problem with your syncCategories: ' + error.message);
    // throw error;
    return err;
  }
};



