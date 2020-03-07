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
*/

import React, { useState, useEffect, useCallback } from 'react';

import {
  // StyleSheet,
  View,
  // ScrollView,
  Animated,
  // Alert,
  AsyncStorage,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from '../../colors';

// ui styles
import styles from '../../styles';

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
  currentTransactions: [],
  categories: [],
  currentDate: new Date(),
  currentAmount: 0.00,
  currentCategory: null,
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

// Transaction handling functions
const incrementTransactionVersion = (transaction) => {
  transaction.version += 1;
  // alert(`transaction.version: ${transaction.version}`);s
};


export default function Home() {
  // state hooks
  const [currentTransactions, setCurrentTransactions] = useState(initialState.currentTransactions);

  const [categories, setCategories] = useState(initialState.categories);

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

  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState(false);

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
    // console.log(transactions);
    // update current transactions list in local storage
    setIsUpdatingTransaction(true);
    try {
      const storageObj = await loadSettingsStorage(global.storageKey);

      const list = transactions;

      storageObj.transactions = list;

      saveSettingsStorage(global.storageKey, storageObj);

      setCurrentTransactions(storageObj.transactions);

      setCurrentTransaction(updatedTransaction);
    } catch (error) {
      console.log('updateStoredTransaction error: ', error);
    }
    setIsUpdatingTransaction(false);
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

        // found.version = found.version + 1;
        // found.version += 1;
        // alert(found.version);
        incrementTransactionVersion(found);

        // console.log('found.version: ', found.version);

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
  };


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

        updateStoredTransaction(storageObj.transactions, storageObj.transactions[pos]);
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
       Auth.currentAuthenticatedUser()
      .then(async (cognito) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);
        // setStorageKey(cognito.username);
        global.storageKey = cognito.attributes.sub

        const storage = await loadSettingsStorage(global.storageKey)
        // console.log('storage: ', storage);

        setCurrentOwner(storage.user.id);

        setCategories(storage.categories);

        setCurrentTransactions(storage.transactions);
      })
      .catch(async (err) => {
        // console.log(err);
        // Alert.alert(err);

        const userObject = await loadSettingsStorage(global.storageKey); // load user object
    // console.log(userObject);
    // console.log('storageKey: ', storageKey);

    setCurrentOwner(userObject.user.id);

    setCategories(userObject.categories);

    setCurrentTransactions(userObject.transactions);

    // console.log('userObject.user: ', userObject.user);
      });
    // console.log('loading '  + global.storageKey + '\'s categories');
    


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

    retrieveUserStoredSettings();
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

      // hide slide view
      // hideSlideView();
      setCurrentTransaction(null)
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
    if (String(value).length <= global.amountInputMaxLength) {
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

  function addBtnPressed() {
    // // console.log('global.storageKey: ', global.storageKey);
    // console.log('Add Transaction Btn Pressed =>');

    // // Check for input values
    // console.log('currentDate',  currentDate);
    // console.log('currentAmount: ', currentAmount);
    // console.log('currentOwner: ', currentOwner);
    // console.log('currentPayee', currentPayee);
    // console.log('currentCategory: ', currentCategory);
    // console.log('currentType: ', currentType);
    // console.log('currentNote: ', currentNote);
    // console.log('currentVersion: ', currentVersion);
    // // console.log('\n');

    // // console.log('uuidv4(): ', uuidv4());

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

  useEffect(() => {
    if (currentCategory) {
      // console.log('currentCategory: ', currentCategory);
      setCurrentType(currentCategory.type.toUpperCase());
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
      showSlideView()
      // console.log('currentTransaction: ', currentTransaction);
    } else {
      hideSlideView();
      console.log('\n');
    }
  }, [currentTransaction]);

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

  // useEffect(() => {
  //   console.log('isUpdatingTransaction: ', isUpdatingTransaction);
  //   if (isUpdatingTransaction === true) {
  //     // show activity indicator
  //     view = updateTransactionIndicator
  //   } else {
  //     // hide activity indicator
  //   }
  // }, [isUpdatingTransaction]);

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

    showNewTransactionSlide(transaction)
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

  let stickyTable = (
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
  );
  let scrollingPills = (
    <ScrollingPillCategoriesView
      onPress={categoryBtnPressed}
      categories={categories}
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
    // set new date for transaction
    currentTransaction.date = new Date(date);

    updateStoredTransaction(currentTransactions, currentTransaction);

    setCurrentTransaction(null);

    setCurrentTransactions([]);
  }

  const updateTransactionIndicator = <ActivityIndicator size="large" color="#0000ff" />;


  let transactionSlide =  (
    <SlideUpView
      slideViewBounceValue={slideViewBounceValue}
      transaction={currentTransaction}
      // updateStoredTransaction={updateStoredTransaction}
      // handleNoteChange={handleNoteChange}
      dismiss={() => {
        setCurrentTransaction(initialState.currentTransaction);
      }}
      updateStoredTransactionNote={updateStoredTransactionNote}

      updateStoredTransactionCategory={updateStoredTransactionCategory}

      onDateChange={onDateChange}
    />
  );



  let view = (
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
    {
      /* show updating transaction activity indicator */
      isUpdatingTransaction &&
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    }
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={clearState} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={clearState} // console.log('will blur',payload)}
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
            top: 70,
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
          { scrollingPills }
          { amountInput }

           

          <View style={{ flex: 1, }}>
            { keypad }
              
          </View>

        </View>
        
      </View>

      {
              /* show updating transaction activity indicator */
              
              transactionSlide
            }
                  

    </SafeAreaView>
  );
  return view;
}

Home.navigationOptions = () => {
  const boldMessage = 'Get device cross-sync'; // `${global.appName} ${global.appVersion} (Basic)`;
  let normalMessage = `${global.appName} ${global.appVersion}`;

  // const getNormalMessage = () => {
  //   Home.getNormalMessage();
  // };

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

    // logCurrentStorage();
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

// const TransactionsList = compose(
//     // GraphQL.operations.FetchTransactions
// )(Home);

// export default Home; // TransactionsList; // Home;
