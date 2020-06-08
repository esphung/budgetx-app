/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
            11/04/2019 03:57 AM
            11/06/2019 06:54 PM (ESLinter)
            11/08/2019 03:01 AM (AsyncStorage -> Transactions, Categories)
            11/12/2019 05:03 AM
            11/12/2019 02:36 PM
            11/26/2019 11:01 PM | Working  Sticky Header Table
            11/29/2019 04:40 AM | Hooks conversion
            12/02/2019 12:11 AM | Implemented storage user
            12/03/2019 12:07 PM
            12/04/2019 04:41 PM | Hide HeaderLeft and Hide Search btn
            12/05/2019 12:45 PM | Added Hooks eslinter
            12/10/2019 12:22 AM
            01/01/2020 03:28 PM | AppSync Settings
            01/04/2020 08:25 AM | Released version 1.1.0 to App Store!
            02/04/2020 05:50 AM | Added Sound
            02/28/2020 02:34 PM | Enabling settings title
            03/02/2020 12:25 PM
            03/05/2020 10:06 AM | Published 2.1.0
            03/05/2020 02:01 PM | Storybooks
            03/09/2020 12:23 AM | update transactions
            03/10/2020 11:44 AM | 2.1.7
            03/11/2020 02:59 AM
            03/11/2020 04:11 PM | 3.0.3
            03/29/2020 12:33 PM | Added Detox
            05/02/2020 05:58 PM
            05/06/2020 02:26 PM | Cognito js
            05/09/2020 03:12 PM | after 4.8.5(failed release?)
            05/29/2020 06:18 PM | Updated balance view style for android
            06/03/2020 04:23 PM
            06/05/2020 05:54 PM | crossDeviceSync almost perfect
            06/06/2020 08:44 PM | added category filters

*/

import React,
{
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  View,
  Animated,
  SafeAreaView,
  ActivityIndicator,
  // Platform,
  Text,
  // Dimensions,
  // Button,
  // TouchableOpacity,
  AsyncStorage,
} from 'react-native';

// import Constants from 'expo-constants';

// import NetInfo from '@react-native-community/netinfo'; // online

// import the Analytics category
import Analytics from '@aws-amplify/analytics';

import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

// import { showMessage } from 'react-native-flash-message';

// ui colors
import colors from '../../colors';

// ui styles
import styles from '../../styles';

import {
  loadSettingsStorage,
  saveSettingsStorage,
  retrieveOnlineTransactions,
} from '../storage/SettingsStorage';

// import my custom view components
import HeaderLeftView from '../components/home/HeaderLeftView';
import HeaderRightView from '../components/home/HeaderRightView';
import BalanceView from '../components/home/BalanceView';
import MyStickyTable from '../components/TransactionsTable/MyStickyTable';
import ScrollingPillCategoriesView from '../components/home/ScrollingPillCategoriesView';
import AmountInputView from '../components/home/AmountInputView';
import KeypadView from '../components/home/KeypadView';
import SlideUpView from '../components/home/SlideUpView';

// data models
import Transaction from '../models/Transaction';

import Payee from '../models/Payee';

import Category from '../models/Category';

import calculateBalance from '../functions/calculateBalance';

import calculateMonthSpent from '../functions/calculateMonthSpent';

import searchByID from '../functions/searchByID';

import searchByName from '../functions/searchByName';

import uuidv4 from '../functions/uuidv4';

// import isUpperCase from '../functions/isUpperCase';

// import defaultCategories from '../data/categories';

import getUniqueId from '../functions/getUniqueId';

import incrementVersion from '../functions/incrementVersion';

import filterOutNewestTransactions from '../functions/filterOutNewestTransactions'; // (local, online)

/* my custom queries */
import {
  UpdateTransaction,
  UpdateCategory,
  DeleteTransaction,
  SaveCategory,
  saveTransaction,
  // getTransactionByID,
  getCategoryByID,
  listAllOnlineCategories,
  // getCategoryByName,
  removeCategory,
  savePayee,
  // GetTransaction,
} from '../storage/my_queries';

import { isDeviceOnline } from '../../network-functions';

import { getFakeTransactions } from '../functions/getFakeTransactions';

const LIMIT = 10;

const getAuthentication = async () => {
  global.authenticated = false;
  await Auth.currentAuthenticatedUser()
    .then(async () => {
      // console.log('user authenticated: ', cognito.attributes.sub);
      global.authenticated = true;
    }).catch((err) => {
      console.log('error getting user authentication: ', err);
    });
  return global.authenticated;
};

const compareListTransactions = async (local_transactions, online_transactions) => {
  const props = ['id', 'version'];

  const result = local_transactions.filter((o1) => {
    // filter out (!) items in online_transactions
    return online_transactions.some((o2) => {
      return (o1.id === o2.id) && (o1.version < o2.version);
    });
  }).map(function (o) {
    // objects with only the required properties
    // and map to apply this to the filtered array as a whole
    return props.reduce((newo) => {
      newo = o;
      return newo;
    }, {});
  });
  return result;
};

const initialState = {
  currentTransactions: [],
  currentCategories: [],
  currentDate: new Date(),
  currentAmount: 0.00,
  currentCategory: '',
  slideViewBounceValue: new Animated.Value(300),
  currentBalance: 0.00,
  currentSpent: 0.00,
  currentPayeeName: '',
  currentOwner: global.storageKey,
  currentVersion: 0,
  currentTransaction: '',
  currentNote: '',
  isReady: false,
  currentType: '',
  isSlideViewHidden: true,
  isCurrentTransaction: false,
};



const findTransactionArrayDifferences = (otherArray) => {
  return (current) => {
    return otherArray.filter((other) => {
      return other.id === current.id; // && other.version === current.version
    }).length === 0;
  };
};


const findCategoryArrayDifferences = (otherArray) => {
  return (current) => {
    return otherArray.filter((other) => {
      return other.id === current.id || other.name === current.name; // && other.version === current.version
    }).length === 0;
  };
};

const storeUserCategories = async (list) => {
  try {
    const storage = await loadSettingsStorage(global.storageKey);

    storage.categories = list;

    saveSettingsStorage(global.storageKey, storage);
  } catch (error) {
    // statements
    throw new Error(error);
  }
};

const updateOnlineTransaction = async (transaction) => {
  // const updated = {
  //   id: transaction.id,
  //   date: transaction.date,
  //   amount: transaction.amount,
  //   owner: transaction.owner,
  //   category: {
  //     id: transaction.category.id,
  //     name: transaction.category.name,
  //     color: transaction.category.color,
  //     type: transaction.category.type,
  //     owner: transaction.category.owner,
  //     version: transaction.category.version,

  //   },
  //   payee: {
  //     // id: transaction.payee.id,
  //     // name: transaction.payee.name,
  //     // owner: transaction.payee.owner,
  //     // version: transaction.payee.version
  //   },
  //   version: transaction.version,
  //   note: transaction.note,
  //   type: transaction.type,
  // };
  UpdateTransaction(transaction);
};

// const updateOnlineCategory = async (category) => {
//   const updated = {
//     id: category.id,
//     name: category.name,
//     color: category.color,
//     type: category.type,
//     owner: category.owner,
//     version: category.version + 1,
//   };
//   UpdateCategory(updated);
// };

  const deleteOnlineCategories = async (categories) => {

    // Auth.currentAuthenticatedUser().then(async () => {
      try {
        // const storage = await loadSettingsStorage(global.storageKey);

        // const { categories } = storage;
        categories.forEach(async (category) => {
          // removeCategory(category);
          // alert('message?: DOMString')
          // console.log('category: ', category);
          
          // console.log('await getCategoryByID(category: ', await getCategoryByID(category.id));

          let response = await removeCategory(await getCategoryByID(category.id))

        });
        // if (await isDeviceOnline()) {
        //   const onlineCategories = await listAllOnlineCategories();
        //   onlineCategories.forEach((item) => {
        //     removeCategory(item);
        //   });
        // }
        // showMessage({
        //   message: 'All categories deleted',
        //   // duration: 550,
        //   position: 'bottom',
        //   color: colors.shamrockGreen, // "#606060", // text color
        //   // opacity: 0.5,
        //   textStyle: styles.textStyle,
        //   // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
        // });
      } catch (e) {
        // statements
        // console.log(e);
      }
    // });
    // .catch((err) => console.log('err: ', err));
  };

export default function Home() {
  // state hooks
  const [currentTransactions, setCurrentTransactions] = useState(initialState.currentTransactions);

  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  const [currentCategories, setCurrentCategories] = useState(initialState.categories);

  const [currentBalance, setCurrentBalance] = useState(initialState.currentBalance);

  const [currentSpent, setCurrentSpent] = useState(initialState.currentSpent);

  const [currentTransaction, setCurrentTransaction] = useState(initialState.currentTransaction);

  const [currentCategory, setCurrentCategory] = useState(initialState.currentCategory);

  const [currentCategoryID, setCurrentCategoryID] = useState('');
  const [currentCategoryName, setCurrentCategoryName] = useState('');
  const [currentCategoryColor, setCurrentCategoryColor] = useState('');
  const [currentCategoryType, setCurrentCategoryType] = useState('');
  const [currentCategoryOwner, setCurrentCategoryOwner] = useState('');
  const [currentCategoryVersion, setCurrentCategoryVersion] = useState(0);

  const [currentType, setCurrentType] = useState(initialState.currentType);

  const [currentAmount, setCurrentAmount] = useState(initialState.currentAmount);

  const [currentDate, setCurrentDate] = useState(initialState.currentDate);

  const [currentOwner, setCurrentOwner] = useState(initialState.currentOwner);

  const [currentVersion, setCurrentVersion] = useState(initialState.currentVersion);

  // const [currentPayee, setCurrentPayee] = useState('');

  // const [currentPayeeID, setCurrentPayeeID] = useState('');

  // const [currentPayeeName, setCurrentPayeeName] = useState('');

  const [currentNote, setCurrentNote] = useState(initialState.currentNote);

  // const [isStoringNewTransaction, setIsStoringNewTransaction] = useState(false);

  const [isRemovingStoredTransaction, setIsRemovingStoredTransaction] = useState(false);

  const [isSyncingCategories, setIsSyncingCategories] = useState(false);

  const [
    slideViewBounceValue,
    // setSlideViewBounceValue,
  ] = useState(initialState.slideViewBounceValue);

  const [isSlideViewHidden, setIsSlideViewHidden] = useState(initialState.isSlideViewHidden);

  // const [shouldShowScrollingPills, setShouldShowScrollingPills] = useState(false);

  // const [shouldShowAmountInput, setShouldShowAmountInput] = useState(false);

  // const [shouldShowKeypad, setShouldShowKeypad] = useState(false);

  // const [isNameInputEnabled, setIsNameInputEnabled] = useState(false);

  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState(false);


  const [shouldShowCalendarPicker, setShouldShowCalendarPicker] = useState(false);

  const [top, setTop] = useState(0);

  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [isCalculatingBalance, setIsCalculatingBalance] = useState(false);

  const [isCalculatingSpent, setIsCalculatingSpent] = useState(false);

  // const [isNoteInputEditable, setIsNoteInputEditable] = useState(true);

  // const [shouldShowSlideView, setShouldShowSlideView] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const [amountLabelText, setAmountLabelText] = useState('Amount Spent:')

  const [currentPieChartData, setCurrentPieChartData] = useState(null);

  const [isPieChartVisible, setIsPieChartVisible] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);

  const [currentTableHeight, setCurrentTableHeight] = useState(screenHeight/2.8)

  // const showCategoryToolTip = () => {
  //   // goToWalkthroughElementWithId('category-scroller')
  //   startWalkthrough(addTransactionWalkthrough)
  // };

  const showSlideView = useCallback(
    () => {
      // console.log('hello');
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 0,
          velocity: 10, // 100
          tension: 12, // 32
          friction: 8,
        },
      ).start(setIsSlideViewHidden(false));
    },
    [slideViewBounceValue],
  );
  const hideSlideView = useCallback(
    () => {
      // console.log('bye');
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 100,
          velocity: 5,
          tension: 2,
          friction: 8,
        },
      ).start(setIsSlideViewHidden(true));
    },
    [slideViewBounceValue],
  );
  const updateStoredCategoryProperties = async (category) => {
    // console.log('updating category: ', category);
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('storage.categories: ', storage.categories);

    // console.log('category: ', category);

    const list = storage.categories; // stored categories

    const found = await searchByID(category.id, list); // find previous item

    if (found) {
      // console.log('list.indexOf(found): ', list.indexOf(found));
      const pos = list.indexOf(found);
      // console.log('list[pos]: ', list[pos]);

      list[pos] = category; // replace old with new
      // console.log('list[pos]: ', list[pos]);

      storage.categories = list; // .sort();

      // save it locally
      saveSettingsStorage(global.storageKey, storage);

      // // try to save category online
      // Auth.currentAuthenticatedUser().then((cognito) => {
      //   // SaveCategory(category);
      //   // console.log(`auth user ${cognito.attributes.sub} saved category ${category.id} in Home`);
      // }).catch((err) => console.log('error saving category in Home: ', err));
    }

    // storage.categories = list.sort();

    setCurrentCategories(storage.categories)

    // console.log('storage.categories: ', storage.categories);
    // console.log('category: ', category);
  };
  const updateStoredTransaction = async (updatedTransaction) => {
    // console.log('global.storageKey: ', global.storageKey);
    if (global.debugMode === true) return;

    setIsUpdatingTransaction(true); // to show activity indicator

    // save current transaction list to
    try {
      const storage = await loadSettingsStorage(global.storageKey); // get stored transactions

      let transactions = storage.transactions;

      const pos = transactions.indexOf(updatedTransaction); // get index transaction

      transactions[pos] = updatedTransaction;

      incrementVersion(transactions[pos]); // update transaction version

      storage.transactions = transactions;

      saveSettingsStorage(global.storageKey, storage);

      /* if online and logged in, update online transaction */
      if (await isDeviceOnline() && await getAuthentication()) {
        UpdateTransaction(transactions[pos]);
      }

      setIsUpdatingTransaction(false);
      // loadResources();
    } catch (err) {
      // throw new Error(err);
      console.log('error updating stored transaction in Home: ', err);

      setIsUpdatingTransaction(false); // to show activity indicator

      // setIsReady(true)
    }
    //  /* if online and logged in, update online transaction */
    // if (await isDeviceOnline() && await getAuthentication()) {
    //   // transactions[pos].category.owner = global.storageKey;
    //   // transactions[pos].owner = global.storageKey;
      
    //   // if (transactions[pos].payee) {
    //   //   transactions[pos].payee.owner = global.storageKey;
    //   // }

    //   UpdateTransaction(transactions[pos]);

    //   // setIsUpdatingTransaction(false);
    // }

    // showMessage({
    //   message: 'Updated transaction',
    //   // duration: 550,
    //   position: 'bottom',

    //   // description: "My message description",
    //   // type: 'success', // "success", "info", "warning", "danger"
    //   // backgroundColor: colors.dark, // "purple", // background color
    //   color: colors.shamrockGreen, // "#606060", // text color
    //   // opacity: 0.5,

    //   textStyle: styles.textStyle,

    //   // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
    // });
    // setIsUpdatingTransaction(false);

    // retrieveUserStoredSettings();
    // loadResources();
  };

  const filterCategories = (local, online) => {
  let items = local.concat(online);
  // let keys = ['id', 'name','version'];
  let list = [];
  for (var i in items) {
    var filter = {
      id: items[i].id,
      name: items[i].name,
      type: items[i].type,
    };
    var filteredById = items.filter((item) => {
     for (var key in filter) {
      if ((item['name'] !== filter['name']) || (item['type'] !== filter['type']))
        return false
     }
      return true;
    });

    // testing
    // find all with same id
    // if (filteredById) {
      // find highest version of same id

      // console.log(filteredById);
      // return item with highest value version
      let highestVersion = Math.max.apply(Math, 
        filteredById.map((o) => {
          return o.version
        }))

      let result = filteredById.filter(obj => {
        return obj.version === highestVersion
      })
    // console.log(result);
    list.push(result[0])
    // }
    
  } // end for loop
  // return list;

  let arr = list;

   const unique = arr
       .map((e) => {
         if (!e) {
          return
         }
         return e['id']
       })
  // store the keys of
  // the unique objects
  .map((e, i, final) => 
       {
  return final.indexOf(e) === i && i})
  
  // eliminate the dead keys
  // & store unique objects
  .filter(e => {
    return arr[e]
  })
  .map(e => arr[e]);

  return unique;
};

  const updateTransactionCategory = async (category) => {
    let found = await searchByID(currentTransaction.id, currentTransactions);

    if (!found) return;

    found.category = category;

    found.category.owner = global.storageKey;

    found.type = category.type;

    found.owner = global.storageKey;

    // flip dollar amount to negative or positive
    if (found.type.toLowerCase() === 'income' && found.amount < 0) found.amount = found.amount * -1;
    if (found.type.toLowerCase() === 'expense' && found.amount >= 0) found.amount = found.amount * -1;

    // console.log('found: ', found);
    updateStoredTransaction(found);

    if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean')) && await getAuthentication()) {
      UpdateTransaction(found)
    }

     await save().then(() =>  {
      // loadResources();
      reloadTransactions()
    })
    setCurrentTransaction(null);
  };

  const updateTransactionNote = async (string) => {
    // load stored user transactions
    currentTransaction.note = string;

    updateStoredTransaction(currentTransaction);

    if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean')) && await getAuthentication()) {
      UpdateTransaction(currentTransaction)
    }

    await save().then(() =>  {
      // loadResources();
      reloadTransactions();
    })
    setCurrentTransaction(null);
  };
  const updateTransactionDate = async (date) => {
    // set new date for transaction
    currentTransaction.date = new Date(date);

    updateStoredTransaction(currentTransaction);

    if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean')) && await getAuthentication()) {
      UpdateTransaction(currentTransaction)
    }

    await save().then(() =>  {
      // loadResources();
      reloadTransactions();
    })

    setCurrentTransaction(null);

    // loadResources();
  }
  const pushAllCategoriesToCloud = async (categories) => {
    
    // syncCategories()
    // Auth.currentAuthenticatedUser()
    // .then(() => {
    if (await isDeviceOnline() && await getAuthentication()) {
      setIsSyncingCategories(true);
      categories.forEach(async (category) => {
        // category.version++
        // SaveCategory(category);
        // console.log('category: ', category);
        let retrieved = await getCategoryByID(category.id);
        if (!retrieved) {
          // UpdateCategory(retrieved);
          SaveCategory(category);
          setIsSyncingCategories(false)
        }
        else {
          // retrieved.version++
          // console.log('retrieved: ', retrieved);
          // let local = await searchByID(category.id, categories)
          UpdateCategory(retrieved);
          setIsSyncingCategories(false)
        }



            // create new  one last
            // SaveCategory(await searchByID(category.id, categories));
          
          // else if (retrieved) {
          // //   // console.log('await getCategoryByID(category.id): ', await getCategoryByID(category.id));
          //   UpdateCategory(retrieved);

          // //   // updateStoredCategoryProperties(retrieved)

          // //   // updateStoredCategoryProperties(retrieved)

          // //   console.log('retrieved: ', retrieved);
          // }
        
      // });
    });
    }

};

  async function retrieveUserStoredSettings() {

    setIsReady(false);

    /* get whether signed up user wants to sync device or not */
   // global.isDeviceSyncOn = await getIsDeviceSyncOn()
    // console.log('global.isDeviceSyncOn: ', global.isDeviceSyncOn);

    
    // console.log('JSON.parse(await AsyncStorage.getItem(\'someBoolean\')): ', JSON.parse(await AsyncStorage.getItem('someBoolean')));
 
    global.isConnected = await isDeviceOnline();
    // console.log('global.isConnected: ', global.isConnected);
    
    global.authenticated = await getAuthentication();
    // console.log('global.authenticated: ', global.authenticated);

    await Auth.currentAuthenticatedUser()
    .then(async (cognito) => {
      global.storageKey = cognito.attributes.sub;

      global.email = cognito.attributes.email;

      syncCategories();

      crossDeviceSync()
      // .then(async (transactions) => {

      // console.log('transactions.length: ', transactions.length);
      const storage = await loadSettingsStorage(global.storageKey);
      // console.log('storage: ', storage);

      storage.user.id = cognito.attributes.sub;

      storage.user.email = cognito.attributes.email;


      // console.log(JSON.parse(await AsyncStorage.getItem('someBoolean')));

      /* Update online transactions */
      if (
        (
          await isDeviceOnline())
          && (JSON.parse(await AsyncStorage.getItem('someBoolean')))
        )
      {
        storage.transactions.forEach(async (transaction) => {
          // console.log('transaction: ', transaction);
          UpdateCategory(transaction.category)
          UpdateTransaction(transaction)
        })
      }

      setCurrentCategories(storage.categories);

      setCurrentTransactions(storage.transactions);

      saveSettingsStorage(global.storageKey, storage)

      global.authenticated = true;

      setIsReady(true);
      // })
    })
    .catch(async () => {
      // User is not authenticated
      try {
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
        // console.log(userObject);
        // console.log('storageKey: ', storageKey);

        global.storageKey = userObject.user.id

        // userObject.transactions.forEach((transaction) => {
        //   transaction.owner = global.storageKey
        //   transaction.category.owner = global.storageKey
        //   // console.log('transaction: ', transaction);
        // });
        // setCurrentOwner(userObject.user.id);

        for (var i = userObject.categories.length - 1; i >= 0; i--) {
          userObject.categories[i].owner = global.storageKey
        }

        setCurrentCategories(userObject.categories);

        setCurrentTransactions(userObject.transactions);

        global.authenticated = false

        // setIsUserLoggedIn(false);

        setIsReady(true);
      } catch(e) {
        // statements
        console.log(e);
      }
      // setIsReady(true);
    });

      /* USER TRANSACTIONS DEBUG TESTING */
     if (global.debugMode === true) {
      console.log('global.storageKey: ', global.storageKey);
      /* FAKE USER TRANSACIONS */
      let fakeTransactions = getFakeTransactions(LIMIT);

      let fakeCategories = [];

      fakeTransactions.forEach((transaction, index) => {
        // statements
        fakeCategories.unshift(transaction.category);
      });

      fakeCategories  = getUniqueId(fakeCategories);

      setCurrentTransactions(fakeTransactions);

      setCurrentCategories(fakeCategories);
    }
  }
  const reloadTransactions = async () => {
    // retrieveUserStoredSettings();
    // loadResources()
    const storage =  await loadSettingsStorage(global.storageKey)

    setCurrentTransactions(storage.transactions)


  };
  const storeNewTransaction = async (transaction) => {
    // setIsStoringNewTransaction(true);
    if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean')) && await getAuthentication()) {
      // Auth.currentAuthenticatedUser().then(async () => {
        // global.authenticated = true;

        // global.isConnected = true

        savePayee(transaction.payee)

        SaveCategory(transaction.category);

        saveTransaction(transaction)

        // if (await getCategoryByID(transaction.category.id)) {
        //   UpdateCategory(transaction.category)
        // } else {
        //   // SaveCategory(transaction.category);
        // }

        // if (await getTransactionByID(transaction.id)) {
        //   UpdateTransaction(transaction)
        // } else {
        //   saveTransaction(transaction)
        // }

        
      // }).catch((e) => console.log('e: ', e))
    }

    /* store in local transactions */
    const userObject = await loadSettingsStorage(global.storageKey); // load user object

    // save to online storage, if online
    let list = [...userObject.transactions, transaction]

    // add to local storage
    userObject.transactions = list;


    saveSettingsStorage(global.storageKey, userObject);

    

    loadResources();
    // reloadTransactions();
  };
  async function removeStoredTransaction(transaction) {
    if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean')) && await getAuthentication()) {
      DeleteTransaction(transaction)
    }
    try {

      const userObject = await loadSettingsStorage(global.storageKey);
      // console.log('userObject.transactions.length: ', userObject.transactions.length);

      const list = userObject.transactions;

      // const found = await searchByID(transaction.id, list);
      const found = list.find(element => element.id === transaction.id);
      // console.log('found: ', found);

      if (found) {
        const pos = list.indexOf(found);

        list.splice(pos, 1);

        userObject.transactions = list;

        saveSettingsStorage(global.storageKey, userObject);

        setCurrentTransactions(userObject.transactions)

        setCurrentTransaction(null);
      }
    } catch(e) {
      // statements
      console.log('error removing stored category:', e);
    }
  }
  function handleChange(value) {
    if (currentTransaction) {
      // console.log('currentTransaction.amount: ', currentTransaction.amount);
      if (currentTransaction.type === 'INCOME') currentTransaction.amount = Math.abs(value / 100);
      if (currentTransaction.type === 'EXPENSE') currentTransaction.amount = -Math.abs(value / 100);
      // updateStoredTransaction(currentTransaction);
      save();
    }
    if (String(value).length <= global.amountInputMaxLength) {
      setCurrentAmount(value);
    }
  }
  function numberBtnPressed(number) {

    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    handleChange(newValue);
  }
  const isUserInputValid = () => {
    let bool = true;

    if (!currentDate || !currentAmount || !global.storageKey || !currentCategory || !currentType) {
      // all inputs are filled
      bool = false;
    }
    // if (!currentDate) {
    //   // invalid = 'Date'
    // }
    // else if (!currentAmount) {
    //   // invalid = 'Amount'
    //   // startWalkthrough(addAmountWalkthrough);
    // }
    // else if (!currentOwner) {
    //   invalid = 'Owner';
    // }
    // else if (!currentCategory) {
    //   invalid = 'Category';
    //   // alert('message?: DOMString')
    //   // showCategoryToolTip()
    //   // startWalkthrough(addTransactionCategoryWalkthrough);
    //   // goToWalkthroughElementWithId('category-scroller')
    // }

    // let a = 'a';
    // if (invalid === 'Amount') a = 'an'

    // if (invalid) showMessage({ message: message, description: `Please Enter ${a} valid ${invalid.toLowerCase()}`, duration: 1350 }) // console.log('invalid: ', invalid);
    return bool;
  };

  // const getTransactionOnlineByID = async (id) => {
  //   /* Process retrieved server transaction */
  //   let stored = await getTransactionByID(id); // retrieve newly created from online trans by id

  //   const date = stored.date;
  //   // console.log('date: ', date);

  //   const amount = stored.amount
  //   // console.log('amount: ', amount);

  //   const owner = stored.owner;
  //   // console.log('owner: ', owner);

  //   let payee = (stored.payee) ? stored.payee : new Payee(uuidv4(), '', stored.owner, 0);
  //   // console.log('payee: ', payee);

  //   let category = (stored.category) ? stored.category : new Category(uuidv4(), 'None', '#fff', owner, type, 0);
  //   // console.log('category: ', category);

  //   const { type, note, version } = stored

  //   let obj = new Transaction(
  //     id,
  //     date,
  //     amount,
  //     owner,
  //     payee,
  //     category,
  //     type,
  //     note,
  //     version,
  //   );

  //   return obj;
  // };
  const addBtnPressed = async () => {
    // make sure user inputs are not invalid
    if (!isUserInputValid()) return;

    // setIsReady(false);

    // /* Create New Category */
    const category = new Category(
      currentCategoryID, // id
      currentCategoryName, // name
      currentCategoryColor, // color
      currentCategoryType, // type
      currentCategoryOwner, // owner
      currentCategoryVersion, // version
    );

    // /* Create New Payee */
    const payee = new Payee(); // new Payee(uuidv4(), 'None', global.storageKey, 0);
    // // console.log('payee: ', payee);

    const amount = (category.type === 'EXPENSE') ? -Math.abs(currentAmount / (100)) : Math.abs(currentAmount / (100));


    const transaction = new Transaction(
      uuidv4(), // id
      currentDate, // date
      amount, // amount
      global.storageKey, // owner
      payee, // currentPayee, // payee
      category, // category
      currentType, // type
      currentNote, // note
      currentVersion, // version
    );

    storeNewTransaction(transaction); // store new transaction locally

    /* Check internet connection */
    /* Check authorization */
    // if (!isUserLoggedIn || !isDeviceOnline()) {
    //   storeNewTransaction(transaction); // store new transaction locally
    //   return;
    // }

    setCurrentAmount(0);
    setCurrentCategory(null);
    // setCurrentPayee(null)
    setCurrentDate(new Date());
    setCurrentType('');
    setCurrentNote('');
    setCurrentVersion(0);

    
  };
  function backspaceBtnPressed() {
    const strValue = String(currentAmount);
    // pop last char from string value
    const newStr = strValue.substring(0, strValue.length - 1);
    handleChange(newStr);
  }

  async function loadCurrentBalances() {
    /* Calculate transaction balances */
    setIsCalculatingBalance(true);
    const balance = (calculateBalance(currentTransactions));
    setCurrentBalance(balance);
    setIsCalculatingBalance(false);
    // calculate spent
    setIsCalculatingSpent(true);
    const spent = (await calculateMonthSpent(currentTransactions));
    // console.log('spent: ', spent);
    setCurrentSpent(spent);
    setIsCalculatingSpent(false);
  }

  // current transaction updates
  useEffect(() => {
    loadCurrentBalances();
  }, [currentTransactions]);

  const filterByCategory = (arr, category) => {
    // console.log('arr: ', arr);
    // console.log('category.name: ', category.name);
    // console.log('currentTransactions.length: ', currentTransactions.length);
    const b = arr.filter((item) => item.category.name === category.name);
    return b;
  };

  useEffect(() => {
    if (currentCategory) {
      // // check for version and owner properties
      // if (!currentCategory.hasOwnProperty('owner') || !currentCategory.hasOwnProperty('version')) {
      //   const category = new Category(currentCategory.id, currentCategory.name, currentCategory.color, currentCategory.type, currentOwner, 0)
      //   // console.log('category props updated in side effect: ', category);
      //   updateStoredCategoryProperties(category); // re-store category in local db
      // }
      // // check if category type is uppercase
      // if (!isUpperCase(currentCategory.type)) {
      //   const category = new Category(currentCategory.id, currentCategory.name, currentCategory.color, currentCategory.type.toUpperCase(), currentOwner, 0)
      //   updateStoredCategoryProperties(category); // re-store category in local db
      //   // console.log('category.type: ', category.type);
      // }

      setCurrentCategoryID(currentCategory.id);
      setCurrentCategoryName(currentCategory.name);
      setCurrentCategoryColor(currentCategory.color);
      setCurrentCategoryType(currentCategory.type);

      setCurrentCategoryOwner(global.storageKey);
      setCurrentCategoryVersion(currentVersion);
      setCurrentType(currentCategory.type);


      /* Show other transactions of the same category */
      // console.log('filterByCategory(currentTransactions, currentCategory): ', filterByCategory(currentTransactions, currentCategory));

      displayByCategory()

    } else {
      setCurrentCategoryID('');
      setCurrentCategoryName('');
      setCurrentCategoryColor('');
      setCurrentCategoryType('');
      setCurrentCategoryOwner('');
      setCurrentCategoryVersion('');

      setCurrentType('');
      // loadResources()
      reloadTransactions()
    }
  }, [currentCategory]);

  const displayByCategory = async () =>  {
    setIsSyncingCategories(true)
    const storage = await loadSettingsStorage(global.storageKey)

    setCurrentTransactions(filterByCategory(storage.transactions, currentCategory))
    setIsSyncingCategories(false)
  }

  async function loadResources() {
    
    // if (!isRemovingStoredTransaction) {
    
    retrieveUserStoredSettings()
    //   .then(() => {
    //     setIsReady(true);
    //   }).catch(() => setIsReady(true))
    // // }
    // global.isConnected = await isDeviceOnline();
    // global.authenticated = await getAuthentication();
  }

  useEffect(() => {
    // console.log('Mounted');
    // global.debugMode = true;
    // console.log('Debug Mode:', global.debugMode);


    // setCurrentTransactions([]);

    // setCurrentCategories([]);

    // clearState()

    // setIsReady(false);

    loadResources();

    // setIsReady(false);

    // retrieveUserStoredSettings();

    // setIsReady(true)
    return () => {
      setCurrentTransaction(null);
      setCurrentCategory(null);
      setCurrentAmount(0);
    }
  }, []);

  useEffect(() => {
    // console.log('screenHeight/2.5: ', screenHeight/2.55);
    if (currentTransaction) {
      setCurrentTableHeight(screenHeight * 0.7)
      setAmountLabelText('');
      setCurrentAmount(currentTransaction.amount * 100)
      showSlideView();
    } else if (!currentTransaction) {
      setCurrentTableHeight(screenHeight/2.8)
      setAmountLabelText('Amount Spent:');
      hideSlideView();

      if (global.authenticated) {
        save();
      }
      // setCurrentTransaction(null)
      setCurrentAmount(0.00)
      // console.log('\n');
    }
  }, [currentTransaction]);

  async function save () {
  if (global.debugMode) return

  let storage = await loadSettingsStorage(global.storageKey);

  storage.transactions = currentTransactions;

  saveSettingsStorage(global.storageKey, storage);

  // online stuff
  if (await isDeviceOnline() && (JSON.parse(await AsyncStorage.getItem('someBoolean')))) {
    (storage.transactions).forEach((element, index) => {
      // statements
      UpdateCategory(element.category)
      UpdateTransaction(element);
      // console.log('element: ', element);
    });
  }

  }
  const transactionBtnPressed = (transaction) => {
    showNewTransactionSlide(transaction);
  };
  const deleteBtnPressed = async (transaction) => {
    setIsRemovingStoredTransaction(true);

    if (await getAuthentication() && (await isDeviceOnline()) && (JSON.parse(await AsyncStorage.getItem('someBoolean')))) {
      DeleteTransaction(transaction);
    }
    
    removeStoredTransaction(transaction)
    
    setIsRemovingStoredTransaction(false);
  };
  const categoryBtnPressed = (category) => {
    // toggle current category
    if (currentCategory === category) {
      setCurrentCategory(null); // set off
    } else if (currentCategory !== category) {
      setCurrentCategory(category); // set on
    } else {
      // set new current category
      setCurrentCategory(category); // set other
    }
  };
  const isCurrentCategory = (category) => {
    let bool;
    if (currentCategory !== category) { // (!currentCategories.includes(category)) {
      bool = false;
    }
    if (currentCategory === category) { // || (currentCategories.includes(category))) {
      bool = true;
    }
    return bool;
  };
  const showNewTransactionSlide = (transaction) => {
    // show slide view for selecting new current transaction
    if (!currentTransaction) {
      setCurrentTransaction(transaction);
    } else if (currentTransaction === transaction && !isSlideViewHidden) {
      setCurrentTransaction(null);
    } else {
      setCurrentTransaction(transaction);
    }
  };
  const swipeEditBtnPressed = (transaction) => {
    showNewTransactionSlide(transaction);
  };



  // const updateTransactionPayee = async (transaction, input) => {
  //   const storage = await loadSettingsStorage(global.storageKey);
  //   // first time storing a any payee ever
  //   if (!storage.payees) {
  //     storage.payees = [];
  //     // console.log('storage.payees: ', storage.payees);
  //     saveSettingsStorage(global.storageKey, storage)
  //   }
  //   let list = storage.payees; // previous saved payee

  //   const found = list.find(element => element.name === input); // does payee exist

  //   let payee = new Payee(uuidv4(), input, transaction.owner, 0); // brand new payee
  //   // console.log('found: ', found);

  //   transaction.payee = payee;

  //   if (!found) {
  //     //  brand new payee
  //     // payee = new Payee(uuidv4(), input, transaction.owner, 0); // brand new payee
  //     transaction.payee = payee;
  //     list = [...list,transaction.payee];
  //   } else {
  //     found.name = input

  //     const pos = list.indexOf(found); // get index transaction

  //     list[pos] = payee
  //   }
  //   storage.payees = list;

  //   saveSettingsStorage(global.storageKey, storage); // save local payees

  //   updateStoredTransaction(transaction);
  // };
  const stickyTable = (
    <View
    style={
      {
      top: Platform.OS === 'android' ? 50 : 10,
      left: 0,
      right: 0,
      bottom: 0,
      // height: 250,
      height: Platform.OS  === 'android' ? currentTableHeight - 20 : currentTableHeight,
      position: 'absolute',

      // borderWidth: global.debugMode ? 1 : 0,
      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
      zIndex: 2,
      }
    }>
    <MyStickyTable
      isUpdatingTransaction={isUpdatingTransaction}
      transactions={currentTransactions}
      currentTransaction={currentTransaction}
      key={currentTransactions}

      // tableTop="25.5%"
      // tableHeight="32%"
      // tablePosition="absolute"

      onPress={(transaction) => transactionBtnPressed(transaction)}
      deleteBtnPressed={(transaction) => deleteBtnPressed(transaction)}
      // isCurrentTransaction={isCurrentTransaction}

      swipeEditBtnPressed={swipeEditBtnPressed}

      // isNameInputEnabled={isNameInputEnabled}
      // isNameInputEnabled={isNameInputEnabled}

      // currentPayeeName={currentPayeeName}

      // updateTransactionPayee={updateTransactionPayee}

      updateStoredTransaction={(item) => updateStoredTransaction(item)}
    />
    </View>
  );
  let scrollingPills = (
    <View>
    <ScrollingPillCategoriesView
      onPress={categoryBtnPressed}
      categories={currentCategories}
      isSelected={isCurrentCategory}
      // currentCategory={currentCategory}
    />

      </View>
  );
  let amountInput = (
    <AmountInputView
      isEditable={false}
      value={currentAmount}
      handleChange={handleChange}
      amountLabelText={amountLabelText}
    />
  );
  let keypad = (
    <KeypadView
      handlePress={numberBtnPressed}
      addBtnPressed={addBtnPressed}
      backspaceBtnPressed={backspaceBtnPressed}
    />
  );

  // const updateTransactionIndicator = <ActivityIndicator size="large" color={colors.white} />;

  const spinner = (
    <View
      style={
        {
          // flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ddd',
          opacity:  0.05, // 0.1,

          height: global.screenHeight,
        }
      }
    >
      <ActivityIndicator size="large" color={colors.darkTwo} />
    </View>
  );

    const categorySpinner = (
    <View
      style={
        {
          // flex: 1,
          // padding: 2,
          top: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ddd',
          opacity: 0.1,
          // zIndex: -1,

          // borderWidth: 3,
          // borderColor: 'white',
          // borderStyle: 'solid',

          // height: 300,

          height: global.screenHeight,

          
        }
      }
    >
      <ActivityIndicator size="large" color="black" />
    </View>
  );


  const updatingTransactionSpinner = (
    <View
      style={
        {
          // flex: 1,
          // padding: 2,
          top: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ddd',
          opacity: 0.02,
          // zIndex: -1,

          borderWidth: 4,
          borderColor: 'white',
          borderStyle: 'solid',

          // height: 300,

          height: global.screenHeight,

          
        }
      }
    >
      <ActivityIndicator size="large" color="black" />
    </View>
  );


  async function syncCategories () {
    // body... 
       /* Sync Categories */
    // compare both category lists
    let online_categories = []; // online trans

    let storage = await loadSettingsStorage(global.storageKey);

    let local_categories = storage.categories;

    // console.log('storage.categories: ', storage.categories);
      

    try {
      // get user's local categories
      
      // console.log('local_categories: ', local_categories);

      //  // get user's online categories
      online_categories = await listAllOnlineCategories()
      // online_categories = []
      // console.log('online_categories.length: ', online_categories.length);
      // console.log('local_categories.length: ', local_categories.length);
      // console.log('online_categories: ', online_categories);

      // const onlyInOnline = online_categories.filter(findCategoryArrayDifferences(local_categories));

      // let merged = onlyInOnline.concat(local_categories) // [];

       /* get only unique id categories */
      // merged = getUniqueId(merged)
      // let merged = filterOutNewestTransactions(local_categories, online_categories)

      

      // setCurrentCategories(merged);

      // storage.categories = merged;

      // let merged = filterCategories(local_categories, online_categories)
      // // console.log('merged.length: ', merged.length);

      // setCurrentCategories(merged);

      // // storage.categories = merged;

      // storeUserCategories(merged)

      // pushAllCategoriesToCloud(merged);



      

      // let intersectionDATA = storage.categories.filter(x => online_categories.includes(x));


      // console.log('intersectionDATA: ', intersectionDATA);

      // deleteOnlineCategories(intersectionDATA)


      

        
      

      


      // console.log('storage.categories: ', storage.categories);
      // console.log('merged: ', merged);
      
    } catch (err) {
      // throw new Error('Error performing categorySync:', err);
      console.log('err: ', err);
    }

          let merged = filterCategories(local_categories, online_categories)
      // console.log('merged.length: ', merged.length);

      setCurrentCategories(merged);

      // storage.categories = merged;

      storeUserCategories(merged)

      pushAllCategoriesToCloud(merged);

    
  }
  // const addNewCategory = async (category) => {
  //   const userObject = await loadSettingsStorage(global.storageKey);

  //   const list = userObject.categories;

  //   let found = list.find((item) => category.id === item.id);

  //   alert(found.id)



  //   // let found = await searchByID(category.id, list);

  //   if (!found) {
  //     // category doesn't exist yet
  //     found = searchByName(category.name, list);
  //     if (!found) {
  //       category = new Category();

  //       list.unshift(category);
  //     } else {
  //       category.id = found.id
  //       list.unshift(category);
  //     }
  //   }
  //   else if (found) {
  //     const pos = list.indexOf(found);
  //     list[pos] = category;
  //   }
  //   userObject.categories = getUniqueId(list);
  //   saveSettingsStorage(global.storageKey, userObject);
  // }
  const crossDeviceSync = async () => {

    if (JSON.parse(await AsyncStorage.getItem('someBoolean')) !== true) return

    if (await isDeviceOnline() !== true) return

    // setCurrentCategory(null);

    // setCurrentTransaction(null);


    // if (!global.authenticated) return
    // console.log('global.storageKey: ', global.storageKey);s
    // check if user is online
    if (global.debugMode) return;
    // let bool = await isDeviceOnline();

    if (await getAuthentication() !== true) return

    setIsSyncing(true);

    

    /* Sync Transactions */
    let online_transactions = []; // online trans
    let local_transactions = [];  // local trans in device storage

    /* og online transactions */
    try {
      online_transactions = await retrieveOnlineTransactions();
    } catch (e) {
      // statements
      // console.log('couldn\'t retrieve online transactions', e);
    }
    /* og local transactions */
    let storage = await loadSettingsStorage(global.storageKey);
    local_transactions = storage.transactions;

    // console.log('local_transactions.length: ', local_transactions.length);
    // console.log('online_transactions.length: ', online_transactions.length);


    let filteredTransactions  = filterOutNewestTransactions(local_transactions, online_transactions);
    // console.log('filteredTransactions.length: ', filteredTransactions.length);

    storage.transactions = filteredTransactions;

    setCurrentTransactions(storage.transactions)

    // console.log('filteredTransactions: ', filteredTransactions);

    saveSettingsStorage(global.storageKey, storage);

    // try {
    //   // get user's local transactions
    //   let storage = await loadSettingsStorage(global.storageKey);
    //   local_transactions = storage.transactions;
    //   // console.log('local_transactions.length: ', local_transactions.length);
    //   // console.log('local_transactions: ', local_transactions);
    //    // get user's online transactions
    //   online_transactions = await retrieveOnlineTransactions();
    //   // console.log('online_transactions.length: ', online_transactions.length);
    //   // console.log('online_transactions: ', online_transactions);

    //   // /* 1st save any new categories from online transactions */
    //   online_transactions.forEach(async (element, index) => {
    //     if (!element.category) {
    //       // console.warn('element does not have a category');
    //       // console.log('element: ', element);
    //       // storage.transactions = local_transactions.push(searchByID(element.id, storage.transactions));
    //       // console.log('searchByID(element.id, storage.transactions): ', searchByID(element.id, storage.transactions));
    //       // savePayee(searchByID(element.id, storage.transactions))
    //       SaveCategory(searchByID(element.id, storage.transactions).category);
    //       UpdateTransaction(searchByID(element.id, storage.transactions));
    //     }
    //     // else if (!element.payee) {
    //     //   console.warn('element does not have a payee');
    //     //   console.log('element: ', element);
    //     // }
    //     else {
    //       try {
    //         let found = await searchByID(element.category.id, storage.categories);
    //         // console.log('found category in storage by id:', found.id);

    //         transaction.category = found;

    //         if (!found) {
    //           // category dne in user storage
    //           found = await searchByName(element.category.name, storage.categories);
    //           // console.log('found category in storage by name:', found.name);
    //         }
    //         if ((element.category.name || element.category.id) && !found) {
    //           // if category has id or name and exists but isnt in storage, yet
    //           // console.log('Category Not on Device Yet!:', element.category.name);
    //           storage.categories.unshift(element.category);
    //           saveSettingsStorage(global.storageKey, storage);
    //         }
    //         // return
    //       } catch(e) {
    //         // console.log('new category from an online transaction that is not saved to the current device!\n... crossDeviceSync => Sync Transactions', element)

    //         // storeNewTransaction(element)

    //         // let storage = await loadSettingsStorage(global.storageKey);

    //         // let transaction = await searchByID(element.id, storage.transactions)

    //         // transaction.category = element.category;



    //         // for (const property in transaction) {
    //         //   // console.log(`${property}: ${transaction[property]}`);
    //         //   transaction[property] = element[property]
    //         // }


              



    //         // // updateStoredTransaction(element)

    //         // let category = element.category

    //         // addNewCategory(element.category);

    //         // UpdateCategory(category);


    //       }
    //     }
       
    //   });

    //   // check for local transactions that dont exist online yet
    //   // ie: offline-mode transactions
    const onlyInLocal = local_transactions.filter(findTransactionArrayDifferences(online_transactions));
    //   const onlyInOnline = online_transactions.filter(findTransactionArrayDifferences(local_transactions));

    //   // only upload new local transactions; not all of them
      if (onlyInLocal.length > 0) {
        for (var i = onlyInLocal.length - 1; i >= 0; i--) {
          /* if the transaction is missing an owner, use the current user's id */
          if (onlyInLocal[i].owner === '' || !(onlyInLocal[i].owner)) {
            onlyInLocal[i].owner = global.storageKey;
          }
          /* if transaction's category is missing an owner, use the current user's id */
          if (onlyInLocal[i].category.owner === '' || !(onlyInLocal[i].category.owner)) {
            onlyInLocal[i].category.owner = global.storageKey;
          }

          console.log('onlyInLocal[i]: ', onlyInLocal[i]);
          saveTransaction(onlyInLocal[i]);

          updateStoredTransaction(onlyInLocal[i]);

        }
      }

    //   // add new online transactions to local transactions  on to user's device

    //   // storage.transactions = await retrieveOnlineTransactions();
    //   storage.transactions = local_transactions.concat(online_transactions);
    //    let list = getUniqueId(storage.transactions)
    //    storage.transactions = list
    //   // console.log('storage.transactions.length: ', storage.transactions.length);

    //   // save storage transactions to device storage
    //   // saveSettingsStorage(global.storageKey, storage);

    //   setCurrentTransactions(storage.transactions)

    //   setIsReady(true)
    // } catch(err) {
    //   // throw new Error('Error performing crossDeviceSync:', e);
    //   console.log('crossDeviceSyncError: ', err);
    // }




    // /* Sync identical transactions */
    // // console.log('compareListTransactions(): ', await compareListTransactions());

    // let outdated_transactions = await compareListTransactions(local_transactions, online_transactions);

    // if (outdated_transactions && outdated_transactions.length > 0) {
    //   // pull newer online transaction and replace outdated local with it

    //   for (var i = outdated_transactions.length - 1; i >= 0; i--) {
    //     const existing_local_transaction = searchByID(outdated_transactions[i].id, local_transactions);
    //     // console.log('existing_local_transaction: ', existing_local_transaction);
    //     // console.log('online_transactions[i]: ', online_transactions[i]);

    //     let online_newer_transaction = await getTransactionByID(existing_local_transaction.id);
    //     // console.log('online_newer_transaction: ', online_newer_transaction);

    //     try {
    //       let storage = await loadSettingsStorage(global.storageKey);

    //       let list = storage.transactions;

    //       let found = searchByID(existing_local_transaction.id, list);

    //       let pos = list.indexOf(found);

    //       list[pos] = online_newer_transaction;

          saveSettingsStorage(global.storageKey, storage);


          // for (var i = storage.transactions.length - 1; i >= 0; i--) {
          //   updateOnlineTransaction(storage.transactions[i])
          // }



        // } catch(e) {
        //   // statements
        //   console.log(e);
        // }
      // }


        // for (var i = storage.transactions.length - 1; i >= 0; i--) {
        //   try {
        //     let found = searchByID(storage.transactions[i].category.id, currentCategories)
        //     if (!found) {
        //       storage.categories.push(storage.transactions[i].category)
        //     }
        //   } catch(e) {
        //     // statements
        //     console.log(e);
        //   }

        // }
    // }

    // pushAllCategoriesToCloud(storage.categories)





    // setIsReady(true);

    setIsSyncing(false);

    // return merged

    // showMessage({
    //   message: `Synced data successfully`,
    //   // description: 
    //   type: 'success', // "success", "info", "warning", "danger"
    //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
    // });
  } // end cross device sync definition

  const transactionSlide = (
   <SlideUpView
      slideViewBounceValue={slideViewBounceValue}
      transaction={currentTransaction}
      // dismiss={() => {
      //   setCurrentTransaction(initialState.currentTransaction);
      // }}
      updateTransactionNote={updateTransactionNote}
      updateTransactionCategory={updateTransactionCategory}
      updateTransactionDate={updateTransactionDate}
      shouldShowCalendarPicker={shouldShowCalendarPicker}
      setShouldShowCalendarPicker={setShouldShowCalendarPicker}
      top={top}
      setTop={setTop}

      isUpdatingTransaction={isUpdatingTransaction}
      isSelected={isCurrentCategory}
      // value={currentTransaction.amount}
      // updateTransactionAmount={updateTransactionAmount}
      isEditable={true}
      value={Math.abs(currentAmount)}
      handleChange={handleChange}
    />
  
  );
  // let barChartExample = (
  //   <View style={
  //     [
  //       // styles.container,
  //       {
  //         flex: 1,

  //         flexDirection: 'row-reverse',
  //         height: screenHeight * 0.06,
  //         marginTop: 25,
  //       },
  //       {
  //         position: 'absolute',
  //         top: 0,
  //         bottom: 0,
  //         right: 0,
  //         left: 0,

  //         width: screenWidth,

  //         // opacity: 0.5,

  //         // borderWidth: 1,
  //         // borderColor: 'red',
  //         // borderStyle: 'solid',
  //       }
  //     ]
  //   }>
  //     <BarChartExample data={currentPieChartData}  />
  //   </View>
  // );

  const displayIndicator = (
    <View style={{
        // flex: 1,
        // top: 150,
        // position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
        width: '100%',
        height: 30,
        // borderStyle: 'solid',
      }}>
      <Text style={[styles.textStyle,{
        fontSize: 14,
        color: colors.shamrockGreen,
        opacity:  0.5,
      }]}>Device Syncing</Text>
      <ActivityIndicator color="white" />
     
      </View>
  )
  // }, [currentPayee])
  const view = (
    <SafeAreaView
      style={
        [
          styles.container,
          {
            // flex: 1,
            // alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          },
        ]
      }
    >
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        // onWillFocus={() => startWalkthrough(addTransactionWalkthrough)} // {(payload) => clearState()}
        onWillFocus={loadResources}
        // other props
        // onDidFocus={() => startWalkthrough(addTransactionWalkthrough)}
        onWillBlur={async () =>
          {
            setIsUpdatingTransaction(false)
            setCurrentTransaction(null);
            // hideSlideView();

            // setIsDeviceSynced(false);

          }
        }
        // onDidBlur={retrieveUserStoredSettings}
      />
      
      {/* North Panel View (leave room for navigation bar; contains balance view and spacing) */}
      <View
        style={
            {
            marginTop: Platform.OS === 'ios' ? 50 : 120,
            // flex: 0.1,
            

            // alignItems: 'center',
            // justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
      >


        {/* Balance View */}

        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',

              borderWidth: global.debugMode ? 1 :0,
              borderColor: 'orange',
              // borderStyle: 'dotted',
            },
            styles.balanceViewRectangle
          ]}
        >
          <BalanceView currentBalanceValue={currentBalance} currentSpentValue={currentSpent} />
        </View>
      </View>
      {/* Device Syncing Text */}
      {
       isSyncing && displayIndicator
      }

        
<View style={{ flex: 1, }}>
     { isReady && stickyTable }
    </View>

      {/* sticky table, scrolling pills, amount view,  keypad with transactions */}

      {/*
        <View style={{ flex: 0.75, }}>{ stickyTable }</View>
         // Scrolling pills, amount view and keypad
         <View style={{ flex: 1, }}>
           { isReady && isSlideViewHidden && scrollingPills }
           { isReady && isSlideViewHidden && amountInput }
           <View style={{ flex: 1, }}>
            { isReady && isSlideViewHidden && keypad }
           </View>
         </View>
      */}

        
          {/* Scrolling pills, amount view and keypad */}

          {/*<View style={{ flex: 0.5, }}>*/}
          <View style={{
            position: 'absolute',
            top: screenHeight/1.8,
            height: screenHeight/2,

            // borderWidth: 1,
            // borderColor: 'red',
            // borderStyle: 'solid',

            // backgroundColor: 'white',
        }}>
          {
            /* Category picker tooltip */
            // <ToolTip message="Add a new transaction" />
          }
     
          <View style={{
              flex: 0.3,
              borderWidth: global.debugMode ? 1 : 0,
              borderColor: 'blue',
              borderStyle: 'solid',



            }}>{ isSlideViewHidden && scrollingPills }</View>
            <View style={{
              flex: 0.3,
              borderWidth: global.debugMode ? 1 : 0,
              borderColor: 'red',
              borderStyle: 'solid',



            }}>{ isSlideViewHidden
              && amountInput }</View>
            <View style={{
              height: screenHeight/3.5,
              top: 0,
              right: 0,
              left: 0,
              width: screenWidth,
              // borderWidth: 1,
              // borderColor: 'blue',
              // borderStyle: 'solid', 

              backgroundColor: colors.darkTwo,
            }}>
              { isSlideViewHidden && amountInput && keypad }
            </View>
          </View>
      {
        !isSlideViewHidden && transactionSlide
      }
      {
        isRemovingStoredTransaction && spinner
      }
      {
        isSyncingCategories && categorySpinner
      }
      {
        isUpdatingTransaction && updatingTransactionSpinner
      }
      {
        isSyncing &&  spinner
      }


    </SafeAreaView>
  );
  return view;
}

Home.navigationOptions = (props) => {
  // get user name and email from passed props
  const header = {
    headerTransparent: {},
    headerLeft: () => {return <HeaderLeftView />},
    headerRight: () => {return <HeaderRightView />},
  };
  return header;
};
