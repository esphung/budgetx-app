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
*/

import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Animated,
  SafeAreaView,
  ActivityIndicator,
  // Platform,
  Text,
} from 'react-native';

import Constants from 'expo-constants';

import NetInfo from '@react-native-community/netinfo'; // online

// import the Analytics category
import Analytics from '@aws-amplify/analytics';

import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

import { showMessage } from 'react-native-flash-message';

// ui colors
import colors from '../../colors';

// ui styles
import styles from '../../styles';

import {
  loadSettingsStorage,
  saveSettingsStorage,
  // compareListTransactions,
  retrieveOnlineTransactions,
  retrieveOnlineCategories,
  retrieveLocalTransactions,
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

// import { calculateBalance, calculateMonthSpent } from './functions';

import calculateBalance from '../functions/calculateBalance';

import calculateMonthSpent from '../functions/calculateMonthSpent';

import searchByID from '../functions/searchByID';

import searchByName from '../functions/searchByName';

import uuidv4 from '../functions/uuidv4';

import defaultCategories from '../data/categories';

/* my custom queries */
import {
  updateTransaction,
  updateCategory,
  removeTransaction,
  removePayee,
  removeCategory,
  savePayee,
  saveCategory,
  saveTransaction,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  getTransactionByID,
} from '../storage/my_queries';

// global.hasSyncedDevice = false;

import {
  setIsBackedUp,
  getIsBackedUp,
  setIsDeviceSynced,
  getIsDeviceSynced,
} from '../../globals';

import { isDeviceOnline } from '../../network-functions';

// global.showGlobalValues()

// console.log('getExistingPayee({id: "12"}): ', getExistingPayee({id: "12"}));

const compareListTransactions = async (local_transactions, online_transactions) => {
  // load online transactions
  // let online_transactions = await retrieveOnlineTransactions();
  // console.log('online_transactions.length: ', online_transactions.length);

  // load local transactions
  // let local_transactions = await retrieveLocalTransactions();
  // console.log('local_transactions.length: ', local_transactions.length);

  // let storage = await loadSettingsStorage(global.storageKey);
  // local_transactions = storage.transactions;
  // console.log('local_transactions.length: ', local_transactions.length);

  const props = ['id', 'version'];

  const result = local_transactions.filter((o1) => {
      // filter out (!) items in online_transactions
      return online_transactions.some((o2) => {
        return (o1.id === o2.id) && (o1.version < o2.version);
      });
  }).map(function(o){
      // objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce((newo) => {
          newo = o;
          return newo;
      }, {});
  });
  
  // console.log('compareListTransactions(local, online) => result: ', result);
  // console.log('result: ', result);
  return result;
}

const initialState = {
  currentTransactions: [],
  categories: [],
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

// Transaction handling functions
const incrementVersion = (transaction) => {
  transaction.version += 1;
  // alert(`transaction.version: ${transaction.version}`);s
};

function isUpperCase(str) {
  return str === str.toUpperCase();
}

const findArrayDifferences = (otherArray) => {
  return (current) => {
    return otherArray.filter((other) => {
      return other.id === current.id // && other.version === current.version
    }).length === 0;
  }
};

const storeUserCategories = async (list) => {
  try {
    const storage = await loadSettingsStorage(storageKey);

    storage.categories = list;
    
    saveSettingsStorage(storageKey, storage);
  } catch (error) {
    // statements
    throw new Error(error)
  }
};

// const retrieveAuthenticatedStorageKey = async () => {
//   let key;
//   await Auth.currentAuthenticatedUser()
//     .then((cognito) => {
//       key = cognito.attributes.sub;
//     })
//     .catch(async (err) => {
//       console.log('err: ', err);
//       return;
//     });
//   return key;
// };

const updateOnlineTransaction = async (transaction) => {
  const updated = {
    id: transaction.id,
    date: transaction.date,
    amount: transaction.amount,
    owner: transaction.owner,
    category: {
      id: transaction.category.id,
      name: transaction.category.name,
      color: transaction.category.color,
      type: transaction.category.type,
      owner: transaction.category.owner,
      version: transaction.category.version,

    },
    payee: {
      // id: transaction.payee.id,
      // name: transaction.payee.name,
      // owner: transaction.payee.owner,
      // version: transaction.payee.version
    },
    version: transaction.version,
    note: transaction.note,
    type: transaction.type,
  };
  updateTransaction(updated);
};

const updateOnlineCategory = async (category) => {
  const updated = {
    id: category.id,
    name: category.name,
    color: category.color,
    type: category.type,
    owner: category.owner,
    version: category.version + 1,
  };
  updateCategory(updated);
};

const updateStoredCategoryProperties = async (category) => {
  // console.log('updating category: ', category);
  const storage = await loadSettingsStorage(global.storageKey);
  // console.log('storage.categories: ', storage.categories);

  // console.log('category: ', category);

  let list = storage.categories; // stored categories

  let found = searchByID(category.id, list); // find previous item

  if (found) {
    // console.log('list.indexOf(found): ', list.indexOf(found));
    const pos = list.indexOf(found);
    // console.log('list[pos]: ', list[pos]);

    list[pos] = category; // replace old with new
    // console.log('list[pos]: ', list[pos]);

    storage.categories = list; // .sort();

    // save it locally
    saveSettingsStorage(global.storageKey, storage);

    // check if authenticated
    // global.storageKey = await retrieveAuthenticatedStorageKey();
    // let key = await getOnlineUserKey();
    // // console.log('key: ', key);
    // if (key) {
    //   saveCategory(category); 
    // }
  }

  // storage.categories = list.sort();

  // console.log('storage.categories: ', storage.categories);
  // console.log('category: ', category);
}

export default function Home(props) {
  // state hooks
  const [currentTransactions, setCurrentTransactions] = useState(initialState.currentTransactions);

  const [categories, setCategories] = useState(initialState.categories);

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

  const [currentPayee, setCurrentPayee] = useState('');

  const [currentPayeeID, setCurrentPayeeID] = useState('');

  const [currentPayeeName, setCurrentPayeeName] = useState('');

  const [currentNote, setCurrentNote] = useState(initialState.currentNote);

  const [isStoringNewTransaction, setIsStoringNewTransaction] = useState(false);

  const [isRemovingStoredTransaction, setIsRemovingStoredTransaction] = useState(false);

  const [
    slideViewBounceValue,
    setSlideViewBounceValue,
  ] = useState(initialState.slideViewBounceValue);

  const [isSlideViewHidden, setIsSlideViewHidden] = useState(initialState.isSlideViewHidden);

  const [shouldShowScrollingPills, setShouldShowScrollingPills] = useState(false);

  const [shouldShowAmountInput, setShouldShowAmountInput] = useState(false);

  const [shouldShowKeypad, setShouldShowKeypad] = useState(false);

  const [isNameInputEnabled, setIsNameInputEnabled] = useState(false);

  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState(false);


  const [shouldShowCalendarPicker, setShouldShowCalendarPicker] = useState(false);

  const [top, setTop] = useState(0);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [isCalculatingBalance, setIsCalculatingBalance] = useState(false);

  const [isCalculatingSpent, setIsCalculatingSpent] = useState(false);

  // const [isNoteInputEditable, setIsNoteInputEditable] = useState(true);

  // const [shouldShowSlideView, setShouldShowSlideView] = useState(false);

  const [isReady, setIsReady] = useState(true)

  // const clearInputs = () => {
  //   setCurrentPayee('')
  //   setCurrentPayeeID('');
  //   setCurrentPayeeName('');

  //   setCurrentNote('');
  //   setCurrentAmount(0);

  //   setCurrentCategory('');
  //   setCurrentCategoryID('');
  //   setCurrentCategoryName('');
  //   setCurrentCategoryColor('');

  //   setCurrentType('');
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
  const updateStoredTransaction = async (transactions, updatedTransaction) => {
    // console.log('updatedTransaction: ', updatedTransaction);
    setIsUpdatingTransaction(true); // to show activity indicator

    // console.log('updatedTransaction: ', updatedTransaction);
    // saveUndoHistory(); // so user can undo changes later

    incrementVersion(updatedTransaction); // update transaction version

    const pos = transactions.indexOf(updatedTransaction); // get index transaction

    transactions[pos] = updatedTransaction;

    // save current transaction list to
    try {
      const storageObj = await loadSettingsStorage(global.storageKey); // get stored transactions

      storageObj.transactions = transactions;

      saveSettingsStorage(global.storageKey, storageObj);

    } catch (err) {
      throw new Error(err)

    }

     /* if online and logged in, update online transaction */
    
    global.isConnected = await isDeviceOnline();
    global.authenticated = await getAuthentication();
    // console.log('transactions[pos]: ', transactions[pos]);
    if (isConnected && global.authenticated) {
      transactions[pos].category.owner = global.storageKey
      transactions[pos].owner = global.storageKey
      // transactions[pos].payee.owner = global.storageKey

      updateOnlineCategory(transactions[pos].category)
      updateOnlineTransaction(transactions[pos])
    }
  
    showMessage({
      message: 'Updated transaction',
      duration: 550,
      // position: 'top',

      // description: "My message description",
      type: 'success', // "success", "info", "warning", "danger"
      // backgroundColor: colors.dark, // "purple", // background color
      color: colors.white, // "#606060", // text color

      // textStyle: styles.textStyle,

      icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      
    });

    Analytics.record({ name: 'Updated a stored transaction' });

    retrieveUserStoredSettings()

    setCurrentTransaction(null);

    setIsUpdatingTransaction(false);

    
  };

  const updateTransactionCategory = async (category) => {
    if (category !== currentTransaction.category) return

    setIsUpdatingTransaction(true)

    // load stored user transactions
    const storageObj = await loadSettingsStorage(global.storageKey);

    let list = storageObj.transactions;
 
    try {
      const found = searchByID(currentTransaction.id, list);
      // console.log('found: ', found);


      if (category.id === found.category.id || !found) {
        setIsUpdatingTransaction(false);
        return
      }

      found.category = category;

      found.type = category.type;

      // found.category.version++

      // flip dollar amount to negative or positive
      if (found.type.toLowerCase() === 'income' && found.amount < 0) found.amount = found.amount * -1;
      if (found.type.toLowerCase() === 'expense' && found.amount >= 0) found.amount = found.amount * -1;
    
      updateStoredTransaction(list, found);

      Analytics.record({ name: 'Successfully updated a transaction category' });
    } catch (e) {
      throw new Error(e)
      // category  = new Category(category.id, category.name,  category.color, category.type, currentOwner, 0)
      // console.log('category: ', category);

      setIsUpdatingTransaction(false);
    }
    setCurrentTransaction(null);

    setIsUpdatingTransaction(false);
  };

  const updateTransactionNote = async (string) => {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      const list = storageObj.transactions;

      const found = await searchByID(currentTransaction.id, list);

      found.note = string;

      

      updateStoredTransaction(list, found);

      setCurrentTransaction(found)

    } catch (e) {
      console.log('e: ', e);
    }
    Analytics.record({ name: 'Updated a transaction note' });
  };
  const pushAllCategoriesToCloud = async () => {
    // try {
    //   const storage = await loadSettingsStorage(global.storageKey);
    //   // console.log('local_transactions: ', local_transactions);

    //  for (var i = 0; i < storage.categories.length; i++) {
    //     // /* Create New Category */
    //     const category = new Category(
    //       storage.categories[i].id, // id
    //       storage.categories[i].name, // name
    //       storage.categories[i].color, // color
    //       storage.categories[i].type, // type
    //       global.storageKey, // owner
    //       storage.categories[i].version, // version
    //     );

    //     updateCategory(category);

    //   // saveCategory(storage.categories[i])
    //     // console.log('storage.transactions[i]: ', storage.transactions[i]);
    //  }

    // } catch(e) {
    //   // statements
    //   console.log(e);
    // }
  }
  async function retrieveUserStoredSettings() {
    // setIsReady(false)

    // await setIsDeviceSynced(false)

    global.isConnected = await isDeviceOnline();
    // console.log('global.isConnected: ', global.isConnected);
    
    global.authenticated = await getAuthentication()
    // console.log('global.authenticated: ', global.authenticated);

    global.isDeviceSynced = await getIsDeviceSynced()
    // console.log('isDeviceSynced: ', isDeviceSynced);

    await Auth.currentAuthenticatedUser()
      .then(async (cognito) => {
        global.storageKey = cognito.attributes.sub;

        global.email = cognito.attributes.email;







        // console.log('global.isConnected: ', global.isConnected);
        // console.log('await isDeviceOnline(): ', await isDeviceOnline());

        // console.log('global.isDeviceSynced: ', global.isDeviceSynced);

        // if (global.isConnected === true) {
        if (global.isDeviceSynced !== true) {
          // clearState();
          
          // setCurrentTransactions(await retrieveOnlineTransactions())
          // storage.transactions = await retrieveOnlineTransactions();
 
          // let online_categories = await retrieveOnlineCategories();
          // const onlyInOnlineCategories = online_categories.filter(findArrayDifferences(storage.categories));

          // check if device is synced
          // alert(await getIsDeviceSynced());

          // if not synced => sync
          if (await getIsDeviceSynced() !== true) {


          crossDeviceSync();

          // alert('message?: DOMString')

          setIsDeviceSynced(true);

          
        }

          
      }



      const storage = await loadSettingsStorage(global.storageKey);
      // console.log('storage: ', storage);

      storage.user.id = global.storageKey

      storage.user.email = global.email

      for (var i = storage.categories.length - 1; i >= 0; i--) {
        storage.categories[i].owner = global.storageKey
      }

      await setCategories(storage.categories);

      setCurrentTransactions(storage.transactions);

      saveSettingsStorage(global.storageKey, storage)

      let isConnected = await isDeviceOnline();

      setIsUserLoggedIn(true);

      global.isUserLoggedIn = true

      // global.isUserAuthenticated = true
      global.authenticated = true;

      global.email = storage.user.email

      global.avatar = (storage.avatar) ? storage.avatar : global.avatar;

    })
    .catch(async () => {
      try {
        
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
        // console.log(userObject);
        // console.log('storageKey: ', storageKey);

        setCurrentOwner(userObject.user.id);

        for (var i = userObject.categories.length - 1; i >= 0; i--) {
          userObject.categories[i].owner = global.storageKey
        }

        await setCategories(userObject.categories);

        setCurrentTransactions(userObject.transactions);

        setIsUserLoggedIn(false);
      } catch(e) {
        // statements
        console.log(e);
      }
    });
    // saveUndoHistory();


    setCurrentOwner(global.storageKey);

    



      // /* Calculate transaction balances */
      // setIsCalculatingBalance(true);
      // const balance = (calculateBalance(currentTransactions));
      // setCurrentBalance(balance);
      // setIsCalculatingBalance(false);

      // // setIsCalculatingBalance(false);

      // // calculate spent
      // setIsCalculatingSpent(true);
      // const spent = (calculateMonthSpent(currentTransactions));
      // setCurrentSpent(spent);
      // setIsCalculatingSpent(false);

      setIsReady(true);

  }

  Home.reloadTransactions = () => {
    retrieveUserStoredSettings();
  };

  const storeNewTransaction = async (transaction) => {
    // setIsStoringNewTransaction(true);

    // check for maximum unauthorized user transactions
    if (!isUserLoggedIn && currentTransactions.length >= 5) {
      showMessage({
        description: 'Sign up for more',

        message: 'Maximum transactions',

        textStyle: styles.textStyle,

        type: 'warning',

        // position: 'top',

        icon: {
          icon: 'auto',
          position: 'right',
        },

        onPress:
          () => {
            props.navigation.navigate('SignUp');
          },
      });
      return;
    }

    // user is authorized

    // load local transactions
    const userObject = await loadSettingsStorage(global.storageKey); // load user object

    // save to online storage, if online

    let list = [...userObject.transactions, transaction]

    // add to local storage
    userObject.transactions = list;

    saveSettingsStorage(global.storageKey, userObject);

    setCurrentTransactions(userObject.transactions);

    // clearInputs();

    // setCurrentTransaction(transaction); // ???

    // saveUndoHistory();

    // setIsStoringNewTransaction(false);

    Analytics.record({ name: 'Stored a transaction' });
  };
  async function clearState() {
    await setIsReady(false);

    // setIsStoringNewTransaction(false);

    setIsUpdatingTransaction(false);

    // add/remove transactions
    // setCurrentTransactions([]);
    setCurrentBalance(0.00);
    setCurrentSpent(0.00);



    setCurrentTransaction(initialState.currentTransaction);

    setCurrentPayee({
      id: uuidv4(),
      name: 'None',
      owner: global.storageKey,
      version: 0,
    });
    setCurrentPayeeID(uuidv4());
    setCurrentPayeeName('');

    setCurrentNote('Add a note');
    setCurrentType(initialState.currentType);
    // setCurrentOwner(initialState.currentOwner);
    setCurrentVersion(initialState.currentVersion);
    setCurrentDate(initialState.currentDate);
    setCurrentAmount(initialState.currentAmount);

    setCurrentCategory(null);
    setCurrentCategoryID('');
    setCurrentCategoryName('');
    setCurrentCategoryColor('');
    setCurrentCategoryType('');
    setCurrentCategoryOwner('');
    setCurrentCategoryVersion('');

    
    setIsNameInputEnabled(true);

    setSlideViewBounceValue(initialState.slideViewBounceValue); // (new Animated.Value(300));
    setIsSlideViewHidden(initialState.isSlideViewHidden);

    setIsCalculatingBalance(false);

    setIsCalculatingSpent(false);

    retrieveUserStoredSettings()
  }
  async function removeStoredTransaction(transaction) {
    setIsRemovingStoredTransaction(true);

    let list = [];

    try {
      const userObject = await loadSettingsStorage(global.storageKey);

      list = userObject.transactions;

      const found = await searchByID(transaction.id, list);

      if (found) {
        const pos = list.indexOf(found);

        list.splice(pos, 1);

        userObject.transactions = list;

        saveSettingsStorage(global.storageKey, userObject);

        /* rremove transaction online in db */
        if (isUserLoggedIn && isDeviceOnline()) {
          removeTransaction(transaction)

          removePayee(transaction.payee)

          Analytics.record({ name: 'Removed an online transaction' });
        }
        
      }

        } catch(e) {
      // statements
      console.log(e);
    }

    

    retrieveUserStoredSettings();

    setCurrentTransaction(null);

    setIsRemovingStoredTransaction(false);

    

    Analytics.record({ name: 'Removed a local transaction' });
  }
  function handleChange(value) {
    // check for limit of 11 digits
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
    let invalid = '';
    let message = 'Invalid Input'

    if (!currentDate || !currentAmount || !currentOwner || !currentCategory || !currentType) {
      // all inputs are filled
      bool = false
    }
    if (!currentDate) {
      invalid = 'Date'
    }
    else if (!currentAmount) {
      invalid = 'Amount'
    }
    else if (!currentOwner) {
      invalid = 'Owner'
    }
    else if (!currentCategory) {
      invalid = 'Category'
    }

    let a = 'a';
    if (invalid === 'Amount') a = 'an'

    if (invalid) showMessage({ message: message, description: `Please Enter ${a} valid ${invalid.toLowerCase()}`, duration: 1350 }) // console.log('invalid: ', invalid);
    return bool;
  };
  const getAuthentication = async () => {
    global.authenticated = false;
    await Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // console.log('cognito: ', cognito);
        global.authenticated = (cognito) ? true : false;
      }).catch((err) => {
        // console.log('err: ', err);
      })
    return global.authenticated
  };
  const getTransactionOnlineByID = async (id) => {
    /* Process retrieved server transaction */
    let stored = await getTransactionByID(id); // retrieve newly created from online trans by id

    const date = stored.date;
    // console.log('date: ', date);

    const amount = stored.amount
    // console.log('amount: ', amount);

    const owner = stored.owner;
    // console.log('owner: ', owner);

    let payee = (stored.payee) ? stored.payee : new Payee(uuidv4(), '', stored.owner, 0);
    // console.log('payee: ', payee);

    let category = (stored.category) ? stored.category : new Category(uuidv4(), 'None', '#fff', owner, type, 0);
    // console.log('category: ', category);

    const { type, note, version } = stored

    // const note = stored.note;

    // const version = stored.version;

    let obj = new Transaction(
      id,
      date,
      amount,
      owner,
      payee,
      category,
      type,
      note,
      version,
    );

    return obj;
  };
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
    const payee = new Payee(uuidv4(), 'None', currentOwner, 0);
    // // console.log('payee: ', payee);

    let amount = (category.type === 'EXPENSE') ? -Math.abs(currentAmount / (100)) : Math.abs(currentAmount / (100))

 
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

    /* Check internet connection */
    /* Check authorization */
    // if (!isUserLoggedIn || !isDeviceOnline()) {
    //   storeNewTransaction(transaction); // store new transaction locally
    //   return;
    // }

    storeNewTransaction(transaction); // store new transaction locally

    let isConnected = await isDeviceOnline();
    if (isConnected) {
      global.authenticated = await getAuthentication();
      // alert(authenticated);
      if (global.authenticated) {
        saveCategory(category);
        savePayee(payee);
        saveTransaction(transaction)
      }
    }
      

    // await saveTransaction(transaction); // store new transaction online

    setCurrentAmount(0)
    setCurrentCategory(null)
    setCurrentCategory(null)
    setCurrentPayee(null)
    setCurrentDate(new Date())
    setCurrentType('')
    setCurrentNote('')
    setCurrentVersion(0)

    // setIsReady(true);


    // setIsBackedUp(false)
  }

  const saveUndoHistory = async () => {
    let success = false;
    // const undo_storage_key = `${storageKey}_BACKUPSETTINGS`

    let undo_storage_key = `${global.storageKey}_HISTORY`

    // load stored settings
    try {
      const storageObj = await loadSettingsStorage(undo_storage_key);

      let key = global.storageKey.replace('_HISTORY', '');

      

      saveSettingsStorage(key, storageObj);

      global.storageKey = key

    } catch (e) {
      // statements
      console.log('e:', e);
      // console.log(e);
    }
  };

  const loadUndoHistory = async () => {
    // let success = false;
    try {
      let undo_storage_key = `${global.storageKey}_HISTORY`; // history for REDOs
      const undoObj = await loadSettingsStorage(undo_storage_key);

      let key = global.storageKey.replace('_HISTORY', '');

      

      saveSettingsStorage(key, undoObj)

      global.storageKey = key



    } catch (e) {
      // statements
      console.log('Could not save undo history:', e);
      // console.log(e);
    }

    ;

    // setCurrentTransactions(undoObj.transactions);
  };
  function backspaceBtnPressed() {
    const strValue = String(currentAmount);
    // pop last char from string value
    const newStr = strValue.substring(0, strValue.length - 1);
    handleChange(newStr);
  }

  // current transaction updates
  useEffect(() => {
    /* Calculate transaction balances */
    setIsCalculatingBalance(true);
    const balance = (calculateBalance(currentTransactions));
    setCurrentBalance(balance);
    setIsCalculatingBalance(false);

    // setIsCalculatingBalance(false);

    // calculate spent
    setIsCalculatingSpent(true);
    const spent = (calculateMonthSpent(currentTransactions));
    setCurrentSpent(spent);
    setIsCalculatingSpent(false);
  }, [currentTransactions]);



  useEffect(() => {
    if (currentCategory) {
      // check for version and owner properties
      if (!currentCategory.hasOwnProperty('owner') || !currentCategory.hasOwnProperty('version')) {
        let category = new Category(currentCategory.id, currentCategory.name, currentCategory.color, currentCategory.type, currentOwner, 0)
        // console.log('category props updated in side effect: ', category);
        updateStoredCategoryProperties(category); // re-store category in local db
      }
      // check if category type is uppercase
      if (!isUpperCase(currentCategory.type)) {
        let category = new Category(currentCategory.id, currentCategory.name, currentCategory.color, currentCategory.type.toUpperCase(), currentOwner, 0)
        updateStoredCategoryProperties(category); // re-store category in local db
        // console.log('category.type: ', category.type);
      }

      setCurrentCategoryID(currentCategory.id)
      setCurrentCategoryName(currentCategory.name)
      setCurrentCategoryColor(currentCategory.color)
      setCurrentCategoryType(currentCategory.type)

      setCurrentCategoryOwner(currentOwner);
      setCurrentCategoryVersion(currentVersion);

      setCurrentType(currentCategory.type);
    } else {
      setCurrentCategoryID('')
      setCurrentCategoryName('')
      setCurrentCategoryColor('')
      setCurrentCategoryType('')
      setCurrentCategoryOwner('');
      setCurrentCategoryVersion('');

      setCurrentType('');
    }
  }, [currentCategory]);

  // useEffect(() => {
  //   if (!isSlideViewHidden) {
  //     // Showing Slide View
  //     setShouldShowScrollingPills(false);
  //     setShouldShowAmountInput(false);
  //     setShouldShowKeypad(false);
  //   } else {
  //     // Slide View is Hidden
  //     setShouldShowScrollingPills(true);
  //     setShouldShowAmountInput(true);
  //     setShouldShowKeypad(true);
  //   }
  //   // Control Name Input Editable
  //   if (currentTransaction && !isSlideViewHidden) {
  //     setIsNameInputEnabled(false);
  //   } else {
  //     setIsNameInputEnabled(true);
  //   }
  // }, [isSlideViewHidden]);

  useEffect(() => {
    // console.log('Mounted');
    // Set Defaults
    // setCurrentTransactions([]);

    // setCategories(defaultCategories);

    // clearState()

    // setIsReady(false);

    setIsReady(false);

    retrieveUserStoredSettings();

    // setIsReady(true)

    // return () => {
    //   clearState()
    // }
    
  }, []);

  useEffect(() => {
    if (currentTransaction) {
      showSlideView();
      // console.log('currentTransaction: ', currentTransaction);
    } else {
      hideSlideView();
      // console.log('\n');
    }
  }, [currentTransaction]);

  // useEffect(() => {
  //   isStoringNewTransaction && showMessage(
  //     {
  //       message: 'Stored new transaction',
  //       // description: '...',
  //       type: 'success',
  //       // position: 'top',
  //       icon: { icon: 'auto', position: 'right' },

  //       textStyle: styles.textStyle,

  //       // backgroundColor: colors.dark, // "purple", // background color

  //       duration:  2505,
  //     })
  //   return () => {
  //     // isStoringNewTransaction effect
  //   };
  // }, [isStoringNewTransaction]);

  // useEffect(() => {
  //   isRemovingStoredTransaction &&
  //   showMessage(
  //     {
  //       // message: 'Removed a stored transaction',
  //       description: 'Press here to undo',
  //       message: 'Deleted transaction',
  //       // type: 'warning',
  //       // position: 'top',
  //       // icon: { icon: 'auto', position: 'right' },

  //       // backgroundColor: colors.dark, // "purple", // background color

  //       textStyle: styles.textStyle,

  //       onPress: () => {
  //         // let user undo action
  //         // if (!isUserLoggedIn) {
  //           // loadUndoHistory()
  //         // }
  //       },

  //       duration: 2500,
  //     }
  //   )

  //   return () => {
  //     // isRemovingStoredTransaction effect
  //   };
  // }, [isRemovingStoredTransaction]);

  // useEffect(() => {
  //   retrieveUserStoredSettings()
  //   // console.log('mount');

  //   // setIsReady(true);
  //   // setIsUpdatingTransaction(false)

  //   // compareListTransactions();

  //   // crossDeviceSync();


  //   return () => {
  //     // effect
  //     // console.log('clean up');
  //     // setIsDeviceSynced(false);

  //   };
  // }, []);


  // useEffect(() => {
  //   if (currentType) {
  //     // console.log('currentType: ', currentType);
  //   }
  //   return () => {
  //     // current type input effect
  //   };
  // }, [currentType]);

  // useEffect(() => {
  //   if (currentOwner) {
  //     // console.log('currentOwner: ', currentOwner);
  //   }
  //   return () => {
  //     //current Owner input effect
  //   };
  // }, [currentOwner]);

  // actions
  const transactionBtnPressed = (transaction) => {
    // if (currentTransaction === transaction) {
    //   // already selected
    //   setCurrentTransaction(null);
    //   // if (isSlideViewHidden !== true) {
    //   //   hideSlideView();
    //   // }
    // } else {
    //   // not same transaction
    //   setCurrentTransaction(transaction);
    //   // showSlideView()
    // }

    showNewTransactionSlide(transaction);
  };

  const deleteBtnPressed = async (transaction) => {
    setIsRemovingStoredTransaction(true);
    await removeStoredTransaction(transaction);
    setIsRemovingStoredTransaction(false);
    // clearState();
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

  const updateTransactionPayee = async (transaction, input) => {
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('storage.payees: ', storage.payees);

    // first time storing a any payee ever
    if (!storage.payees) {
      storage.payees = [];
      // console.log('storage.payees: ', storage.payees);
      await saveSettingsStorage(global.storageKey, storage)
    }

    let list = storage.payees; // previous saved payee

    const found = list.find(element => element.name === input); // does payee exist

    let payee = new Payee(uuidv4(), input, transaction.owner, 0); // brand new payee
    // console.log('found: ', found);

    transaction.payee = payee

    if (!found) {
      //  brand new payee
      // payee = new Payee(uuidv4(), input, transaction.owner, 0); // brand new payee
      transaction.payee = payee;

      // list.push(transaction.payee);

      list = [...list,transaction.payee]
    } else {
      found.name = input

      const pos = list.indexOf(found); // get index transaction

      list[pos] = payee
    }

    storage.payees = list;

    saveSettingsStorage(global.storageKey, storage); // save local payees

    updateStoredTransaction(currentTransactions, transaction);
  };

  let stickyTable = (
    <View
    style={
      {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // height: 500,
      position: 'absolute',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',

      zIndex: -1,
      }
    }><MyStickyTable
      isUpdatingTransaction={isUpdatingTransaction}
      transactions={currentTransactions}
      currentTransaction={currentTransaction}
      key={currentTransactions}

      tableTop="25.5%"
      tableHeight="32%"
      // tablePosition="absolute"

      onPress={(transaction) => transactionBtnPressed(transaction)}
      deleteBtnPressed={(transaction) => deleteBtnPressed(transaction)}
      // isCurrentTransaction={isCurrentTransaction}

      swipeEditBtnPressed={swipeEditBtnPressed}

      // isNameInputEnabled={isNameInputEnabled}
      isNameInputEnabled={isNameInputEnabled}

      currentPayeeName={currentPayeeName}

      updateTransactionPayee={updateTransactionPayee}

      updateStoredTransaction={(item) => updateStoredTransaction(currentTransactions, item)}


    /></View>
  );
  let scrollingPills = (
    <ScrollingPillCategoriesView
      onPress={categoryBtnPressed}
      categories={categories}
      isSelected={isCurrentCategory}
      // currentCategory={currentCategory}
    />
  );
  let amountInput = (
    <AmountInputView
      isEditable={false}
      value={currentAmount}
      handleChange={handleChange}
    />
  );
  let keypad = (
    <KeypadView
      handlePress={numberBtnPressed}
      addBtnPressed={addBtnPressed}
      backspaceBtnPressed={backspaceBtnPressed}
    />
  );

  // if (!shouldShowScrollingPills) {
  //   scrollingPills = null;
  // }

  // if (!shouldShowAmountInput) {
  //   amountInput = null;
  // }

  // if (!shouldShowKeypad) {
  //   keypad = null;
  // }

  async function updateTransactionDate(date) {
    // set new date for transaction
    currentTransaction.date = new Date(date);


    updateStoredTransaction(currentTransactions, currentTransaction);

    // RELOAD TRANSACTIONS AND SHOW UPDATED ONE
    // const storage = await loadSettingsStorage(global.storageKey);

    // setCurrentOwner(storage.user.id);

    // setCategories([]);

    // setCurrentTransactions([]);

    setCurrentTransaction(null);

    // clearState();

    // retrieveUserStoredSettings();
  }

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
          opacity: 0.05,
        }
      }
    >
      <ActivityIndicator size="large" color="#ddd" />
    </View>
  );

  const crossDeviceSync = async () => {
    // check if user is online
    let bool = await isDeviceOnline();
    if (bool !== true) {
      showMessage('Device Currently Offline');
      return;
    }

    // check if device is synced
    // if (await getIsDeviceSynced() === true) return


    // alert(await getIsDeviceSynced());



    // check if user has device sync enabled
    // if (!global.isDeviceCrossSyncOn || global.isDeviceCrossSyncOn !== true) return;

    // setIsReady(false);

    // setIsSyncing(true)

    /* Sync Transactions */
    // compare both transaction lists
    let online_transactions = []; // online trans
    let local_transactions = [];  // local trans in device storage

    try {
      // get user's local transactions
      let storage = await loadSettingsStorage(global.storageKey);
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
      const onlyInOnline = online_transactions.filter(findArrayDifferences(local_transactions));

      // only upload new local transactions; not all of them
      if (onlyInLocal.length > 0) {
        for (var i = onlyInLocal.length - 1; i >= 0; i--) {
          // console.log('onlyInLocal[i]: ', onlyInLocal[i]);
          saveTransaction(onlyInLocal[i]);
        }
      }

      // add new online transactions to local transactions  on to user's device
      // storage.transactions = await retrieveOnlineTransactions();
      storage.transactions = local_transactions.concat(onlyInOnline);
      // console.log('storage.transactions.length: ', storage.transactions.length);

      // save storage transactions to device storage
      saveSettingsStorage(storageKey, storage);
    } catch(crossDeviceSyncError) {
      // throw new Error('Error performing crossDeviceSync:', e);
      console.log('crossDeviceSyncError: ', crossDeviceSyncError);
    }




    /* Sync identical transactions */
    // console.log('compareListTransactions(): ', await compareListTransactions());

    let outdated_transactions = await compareListTransactions(local_transactions, online_transactions);

    if (outdated_transactions && outdated_transactions.length > 0) {
      // pull newer online transaction and replace outdated local with it

      for (var i = outdated_transactions.length - 1; i >= 0; i--) {
        const existing_local_transaction = searchByID(outdated_transactions[i].id, local_transactions);
        // console.log('existing_local_transaction: ', existing_local_transaction);
        // console.log('online_transactions[i]: ', online_transactions[i]);

        let online_newer_transaction = await getTransactionByID(existing_local_transaction.id);
        // console.log('online_newer_transaction: ', online_newer_transaction);

        try {
          let storage = await loadSettingsStorage(global.storageKey);

          let list = storage.transactions;

          let found = searchByID(existing_local_transaction.id, list);

          let pos = list.indexOf(found);

          list[pos] = online_newer_transaction;

          saveSettingsStorage(global.storageKey, storage);
        } catch(e) {
          // statements
          console.log(e);
        }
      }
    }

    /* Sync Categories */
    // compare both category lists
    let online_categories = []; // online trans
    let local_categories = [];  // local trans in device storage

    try {
      // get user's local categories
      let storage = await loadSettingsStorage(global.storageKey);
      local_categories = storage.categories;
      // console.log('local_categories.length: ', local_categories.length);
      // console.log('local_categories: ', local_categories);

      //  // get user's online categories
      online_categories = await retrieveOnlineCategories();
      // console.log('online_categories.length: ', online_categories.length);
      // console.log('online_categories: ', online_categories);

      for (var i = online_categories.length - 1; i >= 0; i--) {
        try {
          let found = searchByName(online_categories[i].name, local_categories)
          if (found) {
            const pos = local_categories.indexOf(found);
            local_categories[pos] = online_categories[i];
          }
        } catch(e) {
          // statements
          console.log(e);
        }
      }

      var arr1 = local_categories;
      var arr2  = online_categories;

      let merged = [];

      for(let i=0; i<arr1.length; i++) {
      merged.push({
        ...arr1[i],
        ...(arr2.find((itmInner) => itmInner.name === arr1[i].name))}
        );
      }

      for (var i = merged.length - 1; i >= 0; i--) {
        merged[i].owner = currentOwner
      }

      // console.log('merged: ', merged);
      // console.log('merged.length: ', merged.length);

      storeUserCategories(merged);

      storage.categories = merged

      await saveSettingsStorage(global.storageKey, storage);

      pushAllCategoriesToCloud();

    } catch(categorySync) {
      // throw new Error('Error performing crossDeviceSync:', e);
      console.log('categorySync: ', categorySync);
    }

    // setIsReady(true);

    // setIsSyncing(false);

    // showMessage({
    //   message: `Synced data successfully`,
    //   // description: 
    //   type: 'success', // "success", "info", "warning", "danger"
    //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
    // });






    // go back to user home screen
    // navigation.navigate('Home');
  }





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
    />


  );

  // useEffect(() => {
  //   if (currentPayee) {
  //     setCurrentPayeeID(currentPayee.id);
  //     setCurrentPayeeName(currentPayee.name);
  //   } else {
  //     setCurrentPayeeID('');
  //     setCurrentPayeeName('');
  //   }

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
        // onWillFocus={clearState} // {(payload) => clearState()}
        onWillFocus={async () => {
            

            // retrieveUserStoredSettings()

            // global.hasSyncedDevice = false;

            retrieveUserStoredSettings();

            setIsDeviceSynced(await getIsDeviceSynced());

            global.isConnected = await isDeviceOnline();
            
            global.authenticated = await getAuthentication();

            


          }
        }
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        onWillBlur={async () =>
          {
            // setIsUpdatingTransaction(false)
            setCurrentTransaction(null);
            // hideSlideView();

            setIsDeviceSynced(false);

          }
        }
        // onDidBlur={payload => console.log('did blur',payload)}
      />
      
      {/* North Panel View (leave room for navigation bar; contains balance view and spacing) */}
      <View
        style={
            {
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'center',
            

            
            

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
      >


        {/* Balance View */}
        <View
          // style={
          //   {
          //     flex: 0.1,
          //     width: '100%',
          //     // flex: 1,
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //     // top: '14%', // 110,
          //     top: 80, // 70
          //     // top: '9%',
          //     // position: 'absolute',

          //     // borderWidth: 1,
          //     // borderColor: 'white',
          //     // borderStyle: 'dotted',
          //   }
          // }
          style={[{
            flex: 1,
            marginTop: 50,
            
            justifyContent: 'center',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          },
          // styles.balanceViewRectangle
          ]}
        >
          <BalanceView
            currentBalanceValue={currentBalance}
            currentSpentValue={currentSpent}
            isCalculatingBalance={isCalculatingBalance}
            isCalculatingSpent={isCalculatingSpent}
          />
        </View>

      </View>

      <View style={{ flex: 0.9, }}>{ stickyTable }</View>

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

                  <View style={{ flex: 1, }}>
            { isSlideViewHidden && scrollingPills }
            <View style={{ flex: 0, }}>{ isSlideViewHidden && scrollingPills && amountInput }</View>
            <View style={{ flex: 1, }}>
              { isSlideViewHidden && amountInput && keypad }
            </View>
          </View>
      {
        isReady && !isSlideViewHidden && transactionSlide
      }
      {
        isReady && isRemovingStoredTransaction && spinner
      }
      {
        isReady && isCalculatingBalance && spinner
      }
      {
        // !isReady && spinner
      }
          




    </SafeAreaView>
  );
  return isReady && view;
}




Home.navigationOptions = (props) => {
  // console.log('props: ', props);
  let boldMessage = 'Get device cross-sync';

  if (global.fullName) {
    boldMessage = global.fullName
  }

  // if (global.authenticated !==  true) {
  //   boldMessage  = 'Get device cross-sync'
  // }

  // if (global.isDeviceSynced === false || !global.isDeviceSynced) {
  //   boldMessage = 'Device not synced';
  // }

  //  {
  //   boldMessage = 'Welcome'
  // }

   // `${global.appName} ${global.appVersion} (Basic)`;
  

  
    
  



  let normalMessage = `${global.appName} ${global.appVersion}`;

  // const normalMessage = 'Enter your email';
  async function onUsernameSubmit(string) {
    // console.log('string: ', string);
    const storageObj = await loadSettingsStorage(string);
    // console.log(storageObj);

    if (storageObj) {
      // overwrite current user settings
      saveSettingsStorage(global.storageKey, storageObj);

      // global.storageKey = string; // ??

      // Home.retrieveUserStoredSettings();
      Home.reloadTransactions();
    }
  }
  // get user name and email from passed props
  const header = {
    headerTransparent: {},
    headerLeft: (
    <HeaderLeftView
     onUsernameSubmit={onUsernameSubmit}
     // getNormalMessage={getNormalMessage}
     boldMessage={boldMessage}
     // normalMessage={normalMessage}
     />),
    headerRight: <HeaderRightView />,
  };
  return header;
};