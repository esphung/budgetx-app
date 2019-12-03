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
*/

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Animated
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import * as Font from 'expo-font';

// import {
//   loadTransactionsObject,
//   saveTransactionsObject
// } from '../storage/TransactionsStorage';

import {
  loadUserObject,
  saveUserObject
} from '../storage/UserStorage';

// import my custom view components
import HeaderLeftView from '../components/Header/HeaderLeftView';
import HeaderRightView from '../components/Header/HeaderRightView';
import BalanceView from '../components/Balances/BalanceView';
import MyStickyTable from '../components/TransactionsView/MyStickyTable';
import ScrollingPillCategoriesView from '../components/CategoryPills/ScrollingPillCategoriesView';
import AmountInputView from '../components/AmountInput/AmountInputView';
import KeypadView from '../components/Keypad/KeypadView';
import SlideUp from '../components/SlideUp/SlideUp';
import SpinnerMask from '../components/SpinnerMask';

import Transaction from '../models/Transaction';
// const Transaction = require('../models/Transaction');

// ui colors
import colors from '../../colors';

import { dates } from '../functions/dates';

const calculateBalance = (array) => {
  let balance = 0.00;
  if (array) {
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].amount) {
        // console.log(array[i].amount);
        balance += array[i].amount;
      }
    }
  }
  return balance.toFixed(2);
};

const calculateMonthSpent = (array) => {
  let balance = 0.00;
  if (array) {
    //  get date 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);

    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (dates.compare(array[i].date, date) > 0) {
        if (array[i].amount <= 0.00) {
          // console.log(array[i].amount);
          balance += array[i].amount;
        }
      }
    }
  }
  return balance.toFixed(2);
};

function Home() {
  // hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [currentBalance, setCurrentBalance] = useState(0);

  const [currentSpent, setCurrentSpent] = useState(null);

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentType, setCurrentType] = useState(null);

  const [currentAmount, setCurrentAmount] = useState(null);

  const [slideViewBounceValue, setSlideViewBounceValue] = useState(new Animated.Value(300));

  const [isSlideViewHidden, setIsSlideViewHidden] = useState(true);

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  const clearState = () => {
    retrieveStoredUser(); // load stored user

    setCurrentAmount(0.00);

    setCurrentCategory(null);

    setCurrentTransaction(null);

    setCurrentType(null);

    setSlideViewBounceValue(new Animated.Value(300));

    setIsSlideViewHidden(true);
  };

  const refresh = () => {
    retrieveFonts();// load Fonts
    retrieveStoredUser(); // load stored user transactions
  }

  // component did mount
  useEffect(() => {
    // console.log('mount Home');
    refresh();
    return () => {
      // console.log('Clean up Home');
    };
  }, []);

  useEffect(() => {
    // console.log('mount transactions');
    // calculate balances
    const balance = (calculateBalance(transactions));
    setCurrentBalance(balance);

    // calculate spent
    const spent = (calculateMonthSpent(transactions));
    setCurrentSpent(spent);

    return () => {
      // effect
      // console.log('Clean up transactions');
    };
  }, [transactions]);

  // current transaction updates
  useEffect(() => {
    // console.log('Mount current transaction');
    // console.log(currentTransaction);

    // toggle slideup view
    if (currentTransaction) {
      showSlideView();
    } else {
      hideSlideView();
    }
    return () => {
      // effect
      console.log('clean up current transaction');
    };
  }, [currentTransaction]);

  const retrieveFonts = async () => {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });
    setFontsAreLoaded(true);
  };

  const retrieveStoredUser = async () => {
    // load stored user transactions
    try {
      const userObject = await loadUserObject();

      // set stored user transactions
      setTransactions(userObject.user.transactions);
    } catch (e) {
      // statements
      // console.log('Could not load stored user');
    }
  };

  // actions
  const transactionBtnPressed = (transaction) => {
    if (currentTransaction === transaction) {
      setCurrentTransaction(null);
      if (isSlideViewHidden !== true) {
        hideSlideView();
      }
    } else if (currentTransaction !== transaction) {
      // not same transaction
      setCurrentTransaction(transaction);
    }
    // else {
    //   setCurrentTransaction(transaction);
    // }
  };

  const deleteBtnPressed = (transaction) => {
    removeUserTransaction(transaction);
  };

  const categoryBtnPressed = (category) => {
    // console.log(category);
    // toggle current category
    if (currentCategory === category) {
      setCurrentCategory(null); // set off
    } else if (currentCategory !== category) {
      setCurrentCategory(category); // set on
    } else {
      // set new current category
      setCurrentCategory(category); // set other
    }
    // set current type from category
    if (category.type) {
      setCurrentType(category.type);
    }
  };

  const numberBtnPressed = (number) => {
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    handleChange(newValue);
  };
  const backspaceBtnPressed = () => {
    // check for null, NaN, undefined, ''
    if (currentAmount) {
      const strValue = String(currentAmount);
      // pop last char from string value
      const newStr = strValue.substring(0, strValue.length - 1);

      handleChange(newStr);
    }
  };

  const showSlideView = () => {
    Animated.spring(
      slideViewBounceValue,
      {
        toValue: 0,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();
    setIsSlideViewHidden(false);
  };

  const hideSlideView = () => {
    Animated.spring(
      slideViewBounceValue,
      {
        toValue: 300,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();
    setIsSlideViewHidden(true);
  };

  const handlePress = (value) => {
    if (typeof (value) === 'number') {
      numberBtnPressed(value);
    } else if (value === 'Add') {
      addTransactionBtnPressed();
      // console.log('Add', value)
    } else if (value === '<') {
      backspaceBtnPressed();
    } else {
      throw new Error('Pressed:', value);
    }
  };

  // value changes
  const handleChange = (value) => {
    // check for limit of 11 digits
    if (String(value).length > global.maxAmountLength) {
      return;
    }
    setCurrentAmount(value);
  };

  const createNewTransaction = () => {
    let transaction = null;

    // check if category is selected and amount is provided by user
    if ((currentCategory) && (currentAmount > 0) && currentType) {
      // do date stuff here

      // convert amount to money format
      let amount = currentAmount / 100;
      amount = (currentType === 'income') ? amount : amount * -1; // income/expense

      // do payee stuff here
      transaction = new Transaction(
        // currentTransactions.length, // id
        new Date(), // current date
        amount, // current camount
        {}, // payee obj
        currentCategory, // category object
        currentCategory.type // type
      );
      // console.log(transaction);
    }
    return transaction;
  };

  const addTransactionBtnPressed = () => {
    const transaction = createNewTransaction();
    if (transaction) {
      storeUserTransaction(transaction); // add new transaction to existing storage
    }
    // console.log(transaction);
  };

  const storeUserTransaction = async (transaction) => {
    const userObject = await loadUserObject(); // load user object

    userObject.user.transactions.unshift(transaction);

    saveUserObject(userObject);

    clearState();
  };

  const removeUserTransaction = async (transaction) => {
    const userObject = await loadUserObject();

    // loop thru stored transactions and splice transaction from it
    let i = userObject.user.transactions.length - 1;

    for (i; i >= 0; i -= 1) {
      if (userObject.user.transactions[i].id === transaction.id) {
        userObject.user.transactions.splice(i, 1);
      }
    }

    saveUserObject(userObject);

    clearState();
  };

  // return component
  let view = <View />;

  if (fontsAreLoaded) {
    view = (

      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={payload => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />
        <BalanceView
          currentBalanceValue={currentBalance}
          currentSpentValue={currentSpent}
        />

        <MyStickyTable
          transactions={transactions}
          currentTransaction={currentTransaction}
          key={transactions}

          tableTop="25.5%"
          tableHeight="32%"
          tablePosition="absolute"

          onPress={(transaction) => transactionBtnPressed(transaction)}
          deleteBtnPressed={(transaction) => deleteBtnPressed(transaction)}
        />

        <ScrollingPillCategoriesView
          onPress={(category) => categoryBtnPressed(category)}
          currentCategory={currentCategory}
          topPosition="57%"
          shadowOffset={{
            width: 1,
            height: 1
          }}
          shadowRadius={26}
          shadowOpacity={1}

          currentCategories={[]}
        />

        <AmountInputView
          isEditable={false}
          value={currentAmount}
          handleChange={handleChange}
        />

        <KeypadView handlePress={handlePress} />

        <SlideUp
          toggleSlideView={() => {}} // toggleSlideView()}
          slideViewBounceValue={slideViewBounceValue}
          transaction={currentTransaction}
        />

      </ScrollView>
    );
  } else {
    view = (
      <View style={styles.container}>
        <SpinnerMask />
      </View>
    );
  }
  return view;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});

Home.navigationOptions = ({ screenProps }) => {
  // get user name and email from passed props
  const header = {
    headerTransparent: {},
    headerLeft: <HeaderLeftView props={screenProps} />,
    headerRight: <HeaderRightView />,
  };
  return header;
};


export default Home;
