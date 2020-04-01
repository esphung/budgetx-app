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
} from 'react-native';

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
  compareListTransactions,
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

// import { calculateBalance, calculateMonthSpent } from './functions';

import calculateBalance from '../functions/calculateBalance';

import calculateMonthSpent from '../functions/calculateMonthSpent';

import searchByID from '../functions/searchByID';

import uuidv4 from '../functions/uuidv4';

/* my custom queries */
import {
  updateTransaction,
  removeTransaction,
  removePayee,
  removeCategory,
  savePayee,
  saveCategory,
  saveTransaction,
  fetchStoredTransactions,
  // fetchStoredCategories,
  getTransactionByID,
} from '../storage/my_queries';

// console.log('getExistingPayee({id: "12"}): ', getExistingPayee({id: "12"}));

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
  currentOwner: '',
  currentVersion: 0,
  currentTransaction: '',
  currentNote: 'Add a note',
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
      owner: transaction.category.owner,
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

const isUserCurrentlyOnline = async () => {
  let bool = false;
  await NetInfo.fetch().then((state) => {
    bool = state.isConnected;
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
  });
  return bool;
};

  const crossDeviceSync = async () => {
    let list = await retrieveOnlineTransactions();

    try {
      const storage = await loadSettingsStorage(global.storageKey);
      storage.transactions = list;

      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].payee === null) {
          list[i].payee = {
            id: uuidv4(),
            name: 'New',
            owner: list[i].owner,
            version: 0,
          }
        }
      }

      console.log('list: ', list);


      saveSettingsStorage(storageKey, storage);

    } catch(e) {
      // statements
      console.log(e);
    }
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

  // const [isNoteInputEditable, setIsNoteInputEditable] = useState(true);

  // const [shouldShowSlideView, setShouldShowSlideView] = useState(false);

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

    // console.log('updatedTransaction: ', updatedTransaction);


    const pos = transactions.indexOf(updatedTransaction); // get index transaction

    transactions[pos] = updatedTransaction;

    // save current transaction list to
    try {
      const storageObj = await loadSettingsStorage(global.storageKey); // get stored transactions

      storageObj.transactions = transactions;

      saveSettingsStorage(global.storageKey, storageObj);

          /* if online and logged in, update online transaction */
      if (isUserLoggedIn) {
        const isConnected = await isUserCurrentlyOnline();

        if (!isConnected)
        {
          setIsUpdatingTransaction(false);
          return // console.log('isConnected: ', isConnected);
        }

        updateOnlineTransaction(updatedTransaction)
      }
    } catch (err) {
      console.log('updateStoredTransaction err: ', err);
    }

    showMessage({
      message: 'Updated transaction',
      duration: 550,
      // position: 'top',

      // description: "My message description",
      type: 'success', // "success", "info", "warning", "danger"
      // backgroundColor: colors.dark, // "purple", // background color
      color: colors.white, // "#606060", // text color

      textStyle: styles.textStyle,

      icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      
    });

    Analytics.record({ name: 'Updated a stored transaction' });

    setCurrentTransaction(null);

    setIsUpdatingTransaction(false);

    retrieveUserStoredSettings()
  };

  const updateTransactionCategory = async (category) => {
    if (category !== currentTransaction.category) {
      return
    } else {
      // setIsUpdatingTransaction(true)
    }
    // load stored user transactions
    const storageObj = await loadSettingsStorage(global.storageKey);

    let list = storageObj.transactions;
 
    try {
      const found = searchByID(currentTransaction.id, list);

      if (category.id === found.category.id) {
        // setIsUpdatingTransaction(false)
        return
      }
      else {
        found.category = category;
        found.type = category.type;

        // flip dollar amount to negative or positive
        if (found.type.toLowerCase() === 'income' && found.amount < 0) {
          found.amount = found.amount * -1;
        } else if (found.type.toLowerCase() === 'expense' && found.amount >= 0) {
          found.amount = found.amount * -1;
        }
      }

      await updateStoredTransaction(list, found);

      setCurrentTransaction(found);

      Analytics.record({ name: 'Successfully updated a transaction category' });
    } catch (e) {
      console.log('Could not update transaction category');
    }
    // setIsUpdatingTransaction(false);
  };

  const updateTransactionNote = async (string) => {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);
      // console.log(transaction);
      const list = storageObj.transactions;

      const found = await searchByID(currentTransaction.id, list);

      found.note = string;

      setCurrentTransaction(found)

      updateStoredTransaction(list, found);

      crossDeviceSync();

    } catch (e) {
      console.log('e: ', e);
    }
    Analytics.record({ name: 'Updated a transaction note' });
  };
  async function retrieveUserStoredSettings() {
    await Auth.currentAuthenticatedUser()
      .then(async (cognito) => {
        global.storageKey = cognito.attributes.sub;

        setIsUserLoggedIn(true);

        const storage = await loadSettingsStorage(global.storageKey);
        // console.log('storage: ', storage);

        setCurrentOwner(storage.user.id);

        setCategories(storage.categories);

        setCurrentTransactions(storage.transactions);

        if (global.isDeviceCrossSyncOn) {
          // update duplicates with diff versions
          let updated = await compareListTransactions();
          // console.log('updated: ', updated);
        }
      })
      .catch(async () => {
        // Alert.alert(err);

        const userObject = await loadSettingsStorage(global.storageKey); // load user object
        // console.log(userObject);
        // console.log('storageKey: ', storageKey);

        setCurrentOwner(userObject.user.id);

        setCategories(userObject.categories);

        setCurrentTransactions(userObject.transactions);

        setIsUserLoggedIn(false);

        // // create an event handler
        // Analytics.record({
        //   name: "Unauthorized user retrieved stored settings!",
        //   attributes: { user_id: userObject.user.id }
        // });
      });
    saveUndoHistory();

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

    saveUndoHistory();

    // setIsStoringNewTransaction(false);

    Analytics.record({ name: 'Stored a transaction' });
  };
  async function clearState() {
    // setIsReady(false);

    // setIsStoringNewTransaction(false);

    // setIsUpdatingTransaction(false); ???

    // add/remove transactions
    // setCurrentTransactions([]);
    setCurrentBalance(0.00);
    setCurrentSpent(0.00);

    setCurrentTransaction(initialState.currentTransaction);

    setCurrentPayee({
      id: uuidv4(),
      name: 'New',
      owner: currentOwner,
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
  }
  async function removeStoredTransaction(transaction) {
    setIsRemovingStoredTransaction(true);

    const userObject = await loadSettingsStorage(global.storageKey);

    const list = userObject.transactions;

    const found = searchByID(transaction.id, list);

    if (found) {
      const pos = list.indexOf(found);

      list.splice(pos, 1);

      userObject.transactions = list;

      saveSettingsStorage(global.storageKey, userObject);

      /* rremove transaction online in db */
      if (isUserLoggedIn && isUserCurrentlyOnline()) {
        await removeTransaction(transaction)

        // removePayee(transaction.payee)

        Analytics.record({ name: 'Removed an online transaction' });
      }
      setCurrentTransaction(null);
    }

    setIsRemovingStoredTransaction(false);

    retrieveUserStoredSettings();

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
    console.log('payee: ', payee);

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
    // /* Create New Category */
    const category = new Category(
      currentCategoryID, // id
      currentCategoryName, // name
      currentCategoryColor, // color
      currentCategoryType, // type
      currentCategoryOwner, // owner
      currentCategoryVersion, // version
    );

    saveCategory(category);

    // /* Create New Payee */
    const payee = new Payee(uuidv4(), 'New', currentOwner, 0);
    // // console.log('payee: ', payee);

    // savePayee(payee);

    let amount = currentAmount

    if (category.type === 'EXPENSE') {
      amount = -Math.abs(currentAmount / (100))
    } else {
      amount = currentAmount / 300
    }
    const transaction = new Transaction(
      uuidv4(), // id
      currentDate, // date
      amount, // amount
      currentOwner, // owner
      payee, // currentPayee, // payee
      category, // category
      currentType, // type
      currentNote, // note
      currentVersion, // version
    );

    /* Check internet connection */
    /* Check authorization */
    // if (!isUserLoggedIn || !isUserCurrentlyOnline()) {
    //   storeNewTransaction(transaction); // store new transaction locally
    //   return;
    // }

    storeNewTransaction(transaction); // store new transaction locally

    await saveTransaction(transaction); // store new transaction online

    // console.log('transaction: ', transaction);

    // let onlineTransaction = await getTransactionOnlineByID(transaction.id);

    // console.log('onlineTransaction: ', onlineTransaction);

    // storeNewTransaction(onlineTransaction); // store new transaction locally

    // clearInputs();

    setCurrentAmount(0)
    setCurrentCategory(null)
  }

  const saveUndoHistory = async () => {
    let success = false;
    // const undo_storage_key = `${storageKey}_BACKUPSETTINGS`

    // load stored settings
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      // set stored user transactions
      if (storageObj !== null && global.storageKey !== null) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        saveSettingsStorage(`${storageObj.user.id}_HISTORY`, storageObj);
        // console.log(key)
        success = true;
      }
    } catch (e) {
      // statements
      console.log('e:', e);
      // console.log(e);
    }
  };

  const loadUndoHistory = async () => {
    // let success = false;
    // const undo_storage_key = `${storageKey}_BACKUPSETTINGS`

    // load stored settings
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      let undo_storage_key = `${storageObj.user.id}_HISTORY`; // history for REDOs
      const undoObj = await loadSettingsStorage(undo_storage_key);

      setCurrentTransactions(undoObj.transactions);

      saveSettingsStorage(global.storageKey, undoObj);
    } catch (e) {
      // statements
      console.log('Could not save undo history:', e);
      // console.log(e);
    }
  };
  function backspaceBtnPressed() {
    const strValue = String(currentAmount);
    // pop last char from string value
    const newStr = strValue.substring(0, strValue.length - 1);
    handleChange(newStr);
  }

  // current transaction updates
  useEffect(() => {
    if (currentTransactions) {
      // calculate balance
      const balance = (calculateBalance(currentTransactions));
      setCurrentBalance(balance);

      // calculate spent
      const spent = (calculateMonthSpent(currentTransactions));
      setCurrentSpent(spent);
      // console.log('currentTransactions:', currentTransactions.length);
    }
  }, [currentTransactions]);

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

  useEffect(() => {
    if (!isSlideViewHidden) {
      // Showing Slide View
      setShouldShowScrollingPills(false);
      setShouldShowAmountInput(false);
      setShouldShowKeypad(false);
    } else {
      // Slide View is Hidden
      setShouldShowScrollingPills(true);
      setShouldShowAmountInput(true);
      setShouldShowKeypad(true);
    }
    // Control Name Input Editable
    if (currentTransaction && !isSlideViewHidden) {
      setIsNameInputEnabled(false);
    } else {
      setIsNameInputEnabled(true);
    }
  }, [isSlideViewHidden]);

  // useEffect(() => {
  //   console.log('Mounted', title);
  //   return () => {
  //     // effect
  //     console.log('Cleaned up', title);
  //   };
  // }, []);

  useEffect(() => {
    if (currentTransaction) {
      showSlideView();
      // console.log('currentTransaction: ', currentTransaction);
    } else {
      hideSlideView();
      // console.log('\n');
    }
  }, [currentTransaction]);

  useEffect(() => {
    isStoringNewTransaction && showMessage(
      {
        message: 'Stored new transaction',
        // description: '...',
        type: 'success',
        // position: 'top',
        icon: { icon: 'auto', position: 'right' },

        textStyle: styles.textStyle,

        // backgroundColor: colors.dark, // "purple", // background color

        duration:  2505,
      })
    return () => {
      // isStoringNewTransaction effect
    };
  }, [isStoringNewTransaction]);

  useEffect(() => {
    isRemovingStoredTransaction && showMessage(
      {
        // message: 'Removed a stored transaction',
        // description: 'Press here to undo',
        message: 'Deleted transaction',
        // type: 'warning',
        // position: 'top',
        // icon: { icon: 'auto', position: 'right' },

        // backgroundColor: colors.dark, // "purple", // background color

        textStyle: styles.textStyle,

        onPress: () => {
          // let user undo action
          if (!isUserLoggedIn) {
            loadUndoHistory()
          }
        },

        duration: 2500,
      }
    )

    return () => {
      // isRemovingStoredTransaction effect
    };
  }, [isRemovingStoredTransaction]);

  useEffect(() => {
    console.log('mount');

    // compareListTransactions()

    return () => {
      // effect
      console.log('clean up');
    };
  }, []);


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

  const deleteBtnPressed = (transaction) => {
    removeStoredTransaction(transaction);
    clearState();
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
    <MyStickyTable
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


    />
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

  if (!shouldShowScrollingPills) {
    scrollingPills = null;
  }

  if (!shouldShowAmountInput) {
    amountInput = null;
  }

  if (!shouldShowKeypad) {
    keypad = null;
  }

  async function updateTransactionDate(date) {
    // set new date for transaction
    currentTransaction.date = new Date(date);

    updateStoredTransaction(currentTransactions, currentTransaction);

    // RELOAD TRANSACTIONS AND SHOW UPDATED ONE
    const storage = await loadSettingsStorage(global.storageKey);

    // setCurrentOwner(storage.user.id);

    // setCategories([]);

    // setCurrentTransactions([]);

    setCurrentTransaction(null);

    // clearState();

    retrieveUserStoredSettings();
  }

  const updateTransactionIndicator = <ActivityIndicator size="large" color={colors.white} />;


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
          // styles.container,
          {
            flex: 1,
            alignItems: 'center',

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
        onWillFocus={retrieveUserStoredSettings}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        onWillBlur={() => hideSlideView()}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
      {/* Balance View */}
      <View
        style={
          {
            flex: 0.1,
            width: '100%',
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // top: '14%', // 110,
            top: 80, // 70
            // top: '9%',
            // position: 'absolute',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
      >
        <BalanceView
          currentBalanceValue={currentBalance}
          currentSpentValue={currentSpent}
        />
      </View>

      {/* sticky table, scrolling pills, amount view,  keypad with transactions */}
      <View style={
        {
          flex: 0.75,
          width: '100%',  

          // alignItems: 'stretch',
          // height: tableHeight, // '32%',
          top: 90,

          // height: 250,

          // height: '40%',

          // height: '32.5%',
          // position: 'absolute',
          // top: tableTop, // '30%', // 240,

          // zIndex: -1,

          // paddingBottom: 30,
          // marginBottom: 20,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',
        }
      }
      >
         <View style={{ flex: 0.75, }}>{ stickyTable }</View>
         {/* Scrolling pills, amount view and keypad */}
         <View style={{ flex: 1, }}>
           { isSlideViewHidden && scrollingPills }
           { isSlideViewHidden && amountInput }
           <View style={{ flex: 1, }}>{ isSlideViewHidden && keypad }</View>
         </View>
       </View>
      {
        !isSlideViewHidden && transactionSlide
      }
              

    </SafeAreaView>
  );
  return view;
}

Home.navigationOptions = (props) => {
  const boldMessage = 'Get device cross-sync'; // `${global.appName} ${global.appVersion} (Basic)`;
  let normalMessage = `${global.appName} ${global.appVersion}`;

  // const normalMessage = 'Enter your email';
  async function onUsernameSubmit(string) {
    // console.log('string: ', string);
    const storageObj = await loadSettingsStorage(string);
    // console.log(storageObj);

    if (storageObj) {
      // overwrite current user settings
      saveSettingsStorage(global.storageKey, storageObj);

      global.storageKey = string;

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
     // boldMessage={boldMessage}
     // normalMessage={normalMessage}
     />),
    headerRight: <HeaderRightView />,
  };
  return header;
};
