import {
  loadSettingsStorage,
  saveSettingsStorage,
  retrieveOnlineCategories,
  retrieveOnlineTransactions,
} from '../storage/SettingsStorage';

import searchByName from './searchByName';

import Category from '../models/Category';

/* my custom queries */
import {
  // updateTransaction,
  // removeTransaction,
  // removePayee,
  // removeCategory,
  // savePayee,
  saveCategory,
  saveTransaction,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
} from '../storage/my_queries';

const findArrayDifferences = (otherArray) => {
  return (current) => {
    return otherArray.filter((other) => {
      return other.id === current.id; // && other.version === current.version
    }).length === 0;
  };
};

const findCategoryArrayDifferences = (otherArray) => {
  return (current) => {
    return otherArray.filter((other) => {
      return other.name === current.name; // && other.version === current.version
    }).length === 0;
  };
};

const pushCategoriesToCloud = async (categories) => {
  try {
    const storage = await loadSettingsStorage(global.storageKey);

    for (var i = 0; i < categories.length; i++) {
      // /* Create New Category */
      const category = new Category(
        categories[i].id, // id
        categories[i].name, // name
        categories[i].color, // color
        categories[i].type, // type
        categories[i].owner, // owner
        categories[i].version, // version
      );
      saveCategory(category);
    }
  } catch (e) {
    // statements
    console.log('Error pushing categories to cloud:', e);
  }
};


const crossDeviceSync = async () => {
  /* Sync Transactions */
  // compare both transaction lists
  let online_transactions = []; // online trans
  let local_transactions = []; // local trans in device storage

  try {
    // get user's local transactions
    const storage = await loadSettingsStorage(global.storageKey);
    local_transactions = storage.transactions;
    // console.log('local_transactions.length: ', local_transactions.length);
    // console.log('local_transactions: ', local_transactions);

    // get user's online transactions
    online_transactions = await retrieveOnlineTransactions();
    // console.log('online_transactions.length: ', online_transactions.length);
    // console.log('online_transactions: ', online_transactions);

    // check for local transactions that dont exist in online transactions yet
    // ie: offline-mode transactions
    const onlyInLocal = local_transactions.filter(findArrayDifferences(online_transactions));
    // const onlyInOnline = online_transactions.filter(findArrayDifferences(local_transactions));

    // only upload new local transactions; not all of them
    if (onlyInLocal.length > 0) {
      for (var i = onlyInLocal.length - 1; i >= 0; i--) {
        // console.log('onlyInLocal[i]: ', onlyInLocal[i]);
        saveTransaction(onlyInLocal[i]);
      }
    }

    // add new online transactions to local transactions  on to user's device
    storage.transactions = await retrieveOnlineTransactions();
    // storage.transactions = local_transactions.concat(onlyInOnline);
    // console.log('storage.transactions.length: ', storage.transactions.length);

    // save storage transactions to device storage
    saveSettingsStorage(global.storageKey, storage);
  } catch (crossDeviceSyncError) {
    // throw new Error('Error performing crossDeviceSync:', e);
    console.log('crossDeviceSyncError: ', crossDeviceSyncError);
  }

  /* Sync Categories */
  // compare both category lists
  let online_categories = []; // online trans
  let local_categories = []; // local trans in device storage

  try {
    // get user's local categories
    const storage = await loadSettingsStorage(global.storageKey);
    local_categories = storage.categories;
    // console.log('local_categories.length: ', local_categories.length);
    // console.log('local_categories: ', local_categories);

    //  // get user's online categories
    online_categories = await retrieveOnlineCategories();
    // console.log('online_categories.length: ', online_categories.length);
    // console.log('online_categories: ', online_categories);


    for (var i = online_categories.length - 1; i >= 0; i--) {
      const found = searchByName(online_categories[i].name, local_categories);
      if (found) {
        const pos = local_categories.indexOf(found);

        local_categories[pos] = online_categories[i];
      }
    }
    /* Add categories to this device that are onnly online */
    // const onlyInLocalCategores = local_categories.filter(findCategoryArrayDifferences(online_categories));
    const onlyInOnlineCategories = online_categories.filter(findCategoryArrayDifferences(local_categories));

    storage.categories = local_categories.concat(onlyInOnlineCategories);

    saveSettingsStorage(global.storageKey, storage);

    await pushCategoriesToCloud(storage.categories);
  } catch (categorySync) {
    // throw new Error('Error performing crossDeviceSync:', e);
    console.log('categorySync: ', categorySync);
  }
};

module.exports = {
  crossDeviceSync,
  findCategoryArrayDifferences,
  pushCategoriesToCloud,
}
