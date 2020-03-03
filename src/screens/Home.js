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
*/

import React, { useState, useEffect, useCallback } from 'react';


// import { Audio } from 'expo-av';

import {
  // StyleSheet,
  View,
  // ScrollView,
  Animated,
  // Alert,
  // AsyncStorage,
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

// export function logCurrentStorage() {
//   AsyncStorage.getAllKeys().then((keyArray) => {
//     AsyncStorage.multiGet(keyArray).then((keyValArray) => {
//       const myStorage: any = {};
//       for (let keyVal of keyValArray) {
//         myStorage[keyVal[0]] = keyVal[1];
//       }

//       // console.log('CURRENT STORAGE: ', myStorage);
//     });
//   });
// }

// import Auth from '@aws-amplify/auth';

// import { AppLoading } from 'expo';

// import API, { graphqlOperation } from '@aws-amplify/api'; // AppSync Query GraphQL

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from '../../colors';

// import styles from '../../styles';

import {
  loadSettingsStorage,
  saveSettingsStorage,
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

// import Category from '../models/Category';

// import { calculateBalance, calculateMonthSpent } from './functions';

import calculateBalance from '../functions/calculateBalance';

import calculateMonthSpent from '../functions/calculateMonthSpent';

import searchByID from '../functions/searchByID';

import uuidv4 from '../functions/uuidv4';

const initialState = {
  currentDate: new Date(),
  currentAmount: 0.00,
  currentCategory: null,
  transactions: [],
  slideViewBounceValue: new Animated.Value(300),
  currentBalance: 0.00,
  currentSpent: 0.00,
  currentPayee: null,
  currentOwner: null,
  currentVersion: 0,
  currentTransaction: null,
  currentNote: null,
  isReady: false,
  currentType: null,
  isSlideViewHidden: true,
  isCurrentTransaction: false,
};

export default function Home() {
  // constants
  const title  = 'Home';

  // state hooks
  const [currentTransactions, setCurrentTransactions] = useState(initialState.transactions);

  const [categories, setCategories] = useState([]);

  const [currentBalance, setCurrentBalance] = useState(initialState.currentBalance);

  const [currentSpent, setCurrentSpent] = useState(initialState.currentSpent);

  const [currentTransaction, setCurrentTransaction] = useState(initialState.currentTransaction);

  const [currentCategory, setCurrentCategory] = useState(initialState.currentCategory);

  const [currentType, setCurrentType] = useState(initialState.currentType);

  const [currentAmount, setCurrentAmount] = useState(initialState.currentAmount);

  const [currentDate, setCurrentDate] = useState(initialState.currentDate);

  const [currentOwner, setCurrentOwner] = useState(initialState.currentOwner);

  const [currentVersion, setCurrentVersion] = useState(initialState.currentVersion);

  const [currentPayee, setCurrentPayee] = useState(initialState.currentPayee);

  const [currentNote, setCurrentNote] = useState(initialState.currentNote);

  const [slideViewBounceValue, setSlideViewBounceValue] = useState(initialState.slideViewBounceValue);

  const [isSlideViewHidden, setIsSlideViewHidden] = useState(initialState.isSlideViewHidden);

  const [isCurrentTransaction, setIsCurrentTransaction] = useState(initialState.isCurrentTransaction);
  
  const [isReady, setIsReady] = useState(false);

  const [shouldShowScrollingPills, setShouldShowScrollingPills] = useState(false);
  const [shouldShowAmountInput, setShouldShowAmountInput] = useState(false);
  const [shouldShowKeypad, setShouldShowKeypad] = useState(false);

  const [isNameInputEnabled, setIsNameInputEnabled] = useState(false);

  const showSlideView = useCallback(
    () => {
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 0,
          velocity: 10, // 100
          tension: 12, // 32
          friction: 8,
        },
      ).start();
      setIsSlideViewHidden(false);
    },
    [slideViewBounceValue],
  );

  const hideSlideView = useCallback(
    () => {
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 400,
          velocity: 10,
          tension: 12,
          friction: 8,
        },
      ).start();
      setIsSlideViewHidden(true);
    },
    [slideViewBounceValue],
  );

  const handleTransactionChange = async (transactions, updatedTransaction) => {
    // console.log(transactions);
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      const list = transactions;

      storageObj.transactions = list;

      saveSettingsStorage(global.storageKey, storageObj);

      setCurrentTransactions(storageObj.transactions);

      setCurrentTransaction(updatedTransaction);
    } catch(error) {
      // statements
      // console.log(e);
      console.log('error: ', error);
    }
  };

  const handlePayeeNameChange = async (string, transaction) => {
    // console.log(string);
    // console.log(transaction);
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);
      // console.log(transaction);
      const list = storageObj.transactions;

      const found = searchByID(transaction.id, list);

      // console.log(found);

      // set stored user image
      // console.log('stored user settings image:', storageObj.image);
      if (found) {
        found.payee = new Payee(string);
        // console.log(found);

        found.version = found.version + 1;

        console.log('found.version: ', found.version);

        const pos = list.indexOf(found);

        list[pos] = found;

        storageObj.transactions = list;

        saveSettingsStorage(global.storageKey, storageObj);

        setCurrentTransactions(list);

        setCurrentTransaction(list[pos]);

        setCurrentTransaction(null);
      }
    } catch (e) {
      // statements
      // console.log(e);
    } 
  }


  const updateStoredTransactionCategory = async (category) => {
    // console.log('categor: ', categor);
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      const found = searchByID(currentTransaction.id, storageObj.transactions);

      if (found) {
        found.category = category;

        found.type = category.type;

        found.version = found.version + 1;

        console.log('found.version: ', found.version);

        const pos = storageObj.transactions.indexOf(found);

        if (storageObj.transactions[pos].type.toLowerCase() === 'income' && storageObj.transactions[pos].amount < 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1;
        } else if (storageObj.transactions[pos].type.toLowerCase() === 'expense' && storageObj.transactions[pos].amount >= 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1;
        }

        // console.log(storageObj.transactions[pos]);

        saveSettingsStorage(global.storageKey, storageObj);

        handleTransactionChange(storageObj.transactions, storageObj.transactions[pos]);
      }
    } catch (e) {
      // statements
      // Alert.alert('Could not update transaction');
      // console.log(e);
      console.log('e: ', e);
    }
  };


  const updateStoredTransactionNote = async (string) => {
    // console.log(string);

    // console.log(currentTransaction.id);

    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);
      // console.log(transaction);
      const list = storageObj.transactions;

      const found = searchByID(currentTransaction.id, list);

      if (found) {
        // UPDATE TRANSACTION
        found.note = string;

        found.version = found.version + 1;

        console.log('found.version: ', found.version);

        // console.log('new note:', found.note);

        const pos = list.indexOf(found);

        list[pos] = found;

        storageObj.transactions = list;

        saveSettingsStorage(global.storageKey, storageObj);

        setCurrentTransactions(list);

        // setCurrentPayee(null);
        // setCurrentNote(null);
        // setCurrentAmount(initialState.currentAmount);
        // setCurrentCategory(initialState.currentCategory);
        setCurrentTransaction(list[pos]);
      }
    } catch (e) {
      // statements
      // Alert.alert('Could not load settings');
      // console.log(e);
      console.log('e: ', e);
    }
  };

  async function retrieveUserStoredSettings() {
    // console.log('loading '  + global.storageKey + '\'s categories');
    const userObject = await loadSettingsStorage(global.storageKey); // load user object
    // console.log(userObject);

    setCurrentOwner(userObject.user.id);

    setCategories(userObject.categories);

    setCurrentTransactions(userObject.transactions);

    // console.log('userObject.user: ', userObject.user);

    // Auth.currentAuthenticatedUser()
    //   .then((cognito) => {
    //     // setUserToken(user.signInUserSession.accessToken.jwtToken);
    //     // console.log('username:', cognitoUser.username);
    //     setStorageKey(cognito.username);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     Alert.alert(err);
    //   });
  }

  Home.reloadTransactions = () => {
    retrieveUserStoredSettings();
  };

  async function storeUserTransaction(transaction) {
    // setIsReady(false);
    const userObject = await loadSettingsStorage(global.storageKey); // load user object

    userObject.transactions.unshift(transaction);

    saveSettingsStorage(global.storageKey, userObject);

    setCurrentTransactions(userObject.transactions);

    setCurrentPayee(null);
    setCurrentNote(null);
    setCurrentAmount(initialState.currentAmount);
    setCurrentCategory(initialState.currentCategory);
    setCurrentTransaction(initialState.currentTransaction);
    setCurrentType(initialState.currentType);
  }
  async function clearState() {

    setIsReady(false);

    // hideSlideView();

    // add/remove transactions
    setCurrentTransactions([]);
    setCurrentBalance(0.00);
    setCurrentSpent(0.00);
    setCurrentPayee(null);
    setCurrentNote(null);
    setCurrentOwner(initialState.currentOwner);
    setCurrentVersion(initialState.currentVersion);
    setCurrentDate(initialState.currentDate);
    setCurrentAmount(initialState.currentAmount);
    setCurrentCategory(initialState.currentCategory);
    setCurrentTransaction(initialState.currentTransaction);
    setCurrentType(initialState.currentType);
    setIsNameInputEnabled(true);

    setSlideViewBounceValue(initialState.slideViewBounceValue); // (new Animated.Value(300));
    setIsSlideViewHidden(initialState.isSlideViewHidden);
    setIsCurrentTransaction(initialState.isCurrentTransaction);

    // setStorageKey(null);
    // retrieveStoredTransactions(); // load stored user
    await retrieveUserStoredSettings();
    // console.log('Cleared');
  }
  async function removeUserTransaction(transaction) {
    const userObject = await loadSettingsStorage(global.storageKey);

    const list = userObject.transactions;

    const found = searchByID(transaction.id, list);

    // console.log(found);

    if (found) {
      const pos = list.indexOf(found);
      list.splice(pos, 1);

      setCurrentTransactions(list);

      userObject.transactions = list;

      saveSettingsStorage(global.storageKey, userObject);

      // setCurrentPayee(null);
      // setCurrentNote(null);
      // setCurrentAmount(initialState.currentAmount);
      // setCurrentCategory(initialState.currentCategory);
      // setCurrentTransaction(initialState.currentTransaction);
      // setCurrentType(initialState.currentType);

      // hide slide view
      hideSlideView();
    }
  }

  function createNewTransaction() {
    console.log('\nCreating New Transaction');
    // Transaction(date, amount, owner, payee, category, type, note, version)

    // convert amount to money format
    let amount = (currentAmount / 100);

    if (currentType === 'EXPENSE') {
      amount = (currentType === 'INCOME') ? amount : amount * -1; // INCOME/EXPENSE
      // console.log('amount: ', amount);
    } else {
      amount = ((Number(currentAmount).toFixed(2)) / (100));
    }

    const transaction = new Transaction(
      currentDate, // date
      // Number(currentAmount).toFixed(2) / 100, // amount
      amount,
      currentOwner, // owner
      currentPayee, // payee
      currentCategory, // category
      currentType, // type
      currentNote, // note
      currentVersion,
    );

    console.log('transaction: ', transaction);
    return transaction;
  }

  // value changes
  function handleChange(value) {
    // check for limit of 11 digits
    if (String(value).length <= 11) {
      setCurrentAmount(value);
    }
  }

  function numberBtnPressed(number) {
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    handleChange(newValue);
    // _playClickSound();
    // setTimeout(_playClickSound, 30);
  }

  // const createNewTransaction = () => {
  //   let transaction = null;

  //   // check if category is selected and amount is provided by user
  //   if ((currentCategory) && (currentAmount > 0) && currentType) {
  //     // do date stuff here

  //     // convert amount to money format
  //     let amount = currentAmount / 100;
  //     amount = (currentType === 'INCOME') ? amount : amount * -1; // INCOME/EXPENSE

  //     // do payee stuff here
  //     transaction = new Transaction(
  //       // currentTransactions.length, // id
  //       new Date(), // current date
  //       amount, // current camount
  //       {}, // payee obj
  //       currentCategory, // category object
  //       currentCategory.type, // type
  //     );
  //     // console.log(transaction);
  //   }
  //   return transaction;
  // };

  function addBtnPressed() {
    // console.log('global.storageKey: ', global.storageKey);
    console.log('Add Transaction Btn Pressed =>');

    // Check for input values
    console.log('currentDate',  currentDate);
    console.log('currentAmount: ', currentAmount);
    console.log('currentOwner: ', currentOwner);
    console.log('currentPayee', currentPayee);
    console.log('currentCategory: ', currentCategory);
    console.log('currentType: ', currentType);
    console.log('currentNote: ', currentNote);
    console.log('currentVersion: ', currentVersion);
    // console.log('\n');

    console.log('uuidv4(): ', uuidv4());

    if (!currentDate || !currentAmount || !currentOwner || !currentCategory || !currentType) {
      console.log('\nError: Missing New Transaction Input');
      return;
    } else {
      // create new transaction from input
      const transaction = createNewTransaction();

      // store new transaction locally
      storeUserTransaction(transaction);
    }
  }

  function backspaceBtnPressed() {
    // if (currentAmount) {
      const strValue = String(currentAmount);
      // pop last char from string value
      const newStr = strValue.substring(0, strValue.length - 1);
      handleChange(newStr);
      // _playClickSound();
    // } else {
    //   return;
    // }
  }

  // function handlePress(value) {
  //   numberBtnPressed(value);
  //   _playClickSound();
  // };

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

  useEffect(() => {
    // if (currentCategory) {
    //   setCurrentType(currentCategory.type);
    // }
    if (currentCategory) {
      console.log('currentCategory: ', currentCategory);

      setCurrentType(currentCategory.type.toUpperCase());

      // if (currentCategory.name.includes('Income')) {
      //   console.log('SELECTED INCOME CATEGORY!');

      //   // set current type input
      //   // setCurrentType(currentCategory.type.toUpperCase());
      //   // console.log('currentCategory: ', currentCategory);
      // }
    } else {
      console.log('\n');
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
    return () => {
      // effect
    };
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
      console.log('currentTransaction: ', currentTransaction);
    } else {
      console.log('\n');
    }
  }, [currentTransaction]);

  useEffect(() => {
    if (currentType) {
      console.log('currentType: ', currentType);
    }
    return () => {
      // current type input effect
    };
  }, [currentType]);

  useEffect(() => {
    if (currentOwner) {
      console.log('currentOwner: ', currentOwner);
    }
    return () => {
      //current Owner input effect
    };
  }, [currentOwner]);

  // useEffect(() => {
  //   // // toggle slideup view
  //   // if (currentTransaction) {
  //   //   showSlideView();

  //   //   // setCurrentAmount(Math.abs(currentTransaction.amount * 100));
  //   //   // setCurrentCategory(currentTransaction.category);

  //   //   // categoryBtnPressed(currentTransaction.category);
  //   //   // console.log(currentCategory)
  //   // } else if (!currentTransaction) {
  //   //   hideSlideView();
  //   // }
  //   // return () => {
  //   //   // effect
  //   //   hideSlideView();

  //   //   // setCurrentAmount(initialState.currentAmount);
  //   //   // setCurrentCategory(initialState.currentCategory);
  //   // };
  // }, [currentTransaction, hideSlideView, showSlideView]);

  // async function didMount() {
  //   try {
  //       const items = await API.graphql(graphqlOperation(ListBooks));
  //       console.log('items: ', items);
  //       // this.setState({ items: items.data.listBooks.items });
  //       setCurrentTransactions(items.data.listBooks.items);
  //   } catch (err) {
  //       console.log('error: ', err);
  //   }
  // }

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

    toggleTransactionSlideView(transaction)
  };

  const deleteBtnPressed = (transaction) => {
    removeUserTransaction(transaction);
    // clearState();
  };

  const categoryBtnPressed = (category) => {
    // console.log('category: ', category);
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

  // const handleNoteChange = (note) => {
  //   // setCurrentNote(note);
  //   console.log(note);
  // }

  const isCurrentCategory = (category) => {
    if (currentCategory !== category) { // (!currentCategories.includes(category)) {
      return false;
    }
    if (currentCategory === category) { // || (currentCategories.includes(category))) {
      return true;
    }
  };

  const toggleTransactionSlideView = (transaction) => {
     // console.log(transaction);
    hideSlideView();
    // setCurrentTransaction(null);

    

    // show slide view if not visible and transaction selected
    if (!currentTransaction) {
      setCurrentTransaction(transaction);
      showSlideView();
    } else if (currentTransaction === transaction && !isSlideViewHidden) {
      hideSlideView();
      setCurrentTransaction(null);
    }

    else {
      setCurrentTransaction(transaction)
      showSlideView();
      
    }

  };

  const swipeEditBtnPressed = (transaction) => {
    toggleTransactionSlideView(transaction);
  }

  let scrollingPills = (
    <ScrollingPillCategoriesView
      onPress={categoryBtnPressed}
      categories={categories}
      // currentCategory={currentCategory}
      // topPosition="56.8%"
      // shadowOffset={{
      //   width: 1,
      //   height: 1,
      // }}
      // shadowRadius={26}
      // shadowOpacity={1}

      // currentCategories={[]}

      isSelected={isCurrentCategory}
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

  async function onDateChange(date) {
    // console.log(new Date(date));

    // set new date for transaction
    currentTransaction.date = new Date(date);
    // console.log(currentTransaction.date);

    handleTransactionChange(currentTransactions, currentTransaction);

    setCurrentTransaction(null);

    // retrieveUserStoredSettings();

    
    // save transaction

    // reload transactions list (to update table)

    // clearState();

    // // setIsReady(false);
    // // hideSlideView();

    // // add/remove transactions
    setCurrentTransactions([]);
    // // setCurrentBalance(0.00);
    // // setCurrentSpent(0.00);
    // // setCurrentPayee(null);
    // // setCurrentNote(null);
    // // setCurrentDate(initialState.currentDate);
    // // setCurrentAmount(initialState.currentAmount);
    // // setCurrentCategory(initialState.currentCategory);
    // setCurrentTransaction(initialState.currentTransaction);
    // // setCurrentType(initialState.currentType);
    // // setIsNameInputEnabled(true);


    // // setSlideViewBounceValue(initialState.slideViewBounceValue); // (new Animated.Value(300));
    // setIsSlideViewHidden(initialState.isSlideViewHidden);
    // // setIsCurrentTransaction(initialState.isCurrentTransaction);

    // setStorageKey(null);
    // // retrieveStoredTransactions(); // load stored user
    // await retrieveUserStoredSettings();
    // console.log('Cleared');
  }

  const view = (
    <View
      // scrollEnabled={false}
      // contentContainerStyle={styles.container}>
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        // backgroundColor: colors.darkTwo,
      }}
    >
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={clearState} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={clearState} // console.log('will blur',payload)}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
      <BalanceView
        currentBalanceValue={currentBalance}
        currentSpentValue={currentSpent}
      />

      <MyStickyTable
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

        isNameInputEnabled={isNameInputEnabled}

        handlePayeeNameChange={handlePayeeNameChange}
      />

      <View style={
        {
          position: 'absolute',
          // flexDirection: 'row',
          // justifyContent: 'center',
          // width: '100%',
          // height: '6%', // 53,
          height: 50,
          // maxHeight: '6%',
          // shadowColor: '#0a101b',
          // shadowOffset: props.shadowOffset,
          // shadowRadius: props.shadowRadius,
          // shadowOpacity: props.shadowOpacity,

          // position: 'absolute',

          top: '56%', // props.topPosition, // '57%', // 462,

          // zIndex: -2,

          // zIndex: props.zIndex, // display ontop of datepickerbox

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',
        }
      }
      >

        {
          scrollingPills
        }


        <View
          style={{

            // justifyContent: 'center',
            // alignItems: 'center',

            position: 'absolute',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            // backgroundColor: colors.dark,

            top: '100%', // 460,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',
          }}
        >

          {
            amountInput
          }
        </View>

      </View>

      <View
        style={{

          position: 'absolute',

          top: '69%', // 460,

          marginTop: 4,

          width: '100%',

          height: '26%', // 252,

          backgroundColor: colors.darkTwo,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      >

        {
          keypad
        }

      </View>

      <SlideUpView
        slideViewBounceValue={slideViewBounceValue}
        transaction={currentTransaction}
        handleTransactionChange={handleTransactionChange}
        // handleNoteChange={handleNoteChange}
        dismiss={() => {
          setCurrentTransaction(initialState.currentTransaction);
        }}
        updateStoredTransactionNote={updateStoredTransactionNote}

        updateStoredTransactionCategory={updateStoredTransactionCategory}

        onDateChange={onDateChange}
      />

    </View>

  );

  return view;
}

Home.navigationOptions = () => {
  const boldMessage = 'Get device cross-sync'; // `${global.appName} ${global.appVersion} (Basic)`;
  const normalMessage = `${global.appName} ${global.appVersion}`;
  // let normalMessage = 'Enter your email';
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

    // logCurrentStorage();
  }
  // get user name and email from passed props
  const header = {
    headerTransparent: {},
    headerLeft: <HeaderLeftView onUsernameSubmit={onUsernameSubmit} boldMessage={boldMessage} normalMessage={normalMessage} />,
    headerRight: <HeaderRightView />,
  };
  return header;
};

// const TransactionsList = compose(
//     // GraphQL.operations.FetchTransactions
// )(Home);

// export default Home; // TransactionsList; // Home;
