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
*/
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  // ActivityIndicator,
  ScrollView,
  Animated,
  // Keyboard,
  // TouchableWithoutFeedback,
  // AsyncStorage
} from 'react-native';

import * as Font from 'expo-font';

// import my custom view components
// import HeaderLeftView from '../components/Header/HeaderLeftView';
import HeaderRightView from '../components/Header/HeaderRightView';
import BalanceView from '../components/Balances/BalanceView';
// import DateLabelView from '../components/DateLabel/DateLabelView';
// import TransactionsView from '../components/TransactionsView/TransactionsView';
import MyStickyTable from '../components/TransactionsView/MyStickyTable';
import ScrollingPillCategoriesView from '../components/CategoryPills/ScrollingPillCategoriesView';
import AmountInputView from '../components/AmountInput/AmountInputView';
import KeypadView from '../components/Keypad/KeypadView';
// import ScrollingPayeePillsView from '../components/ScrollingPayeePillsView';
// import TypeView from '../components/TypeView';
import SlideUp from '../components/SlideUp/SlideUp';
import SpinnerMask from '../components/SpinnerMask';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

import Transaction from '../models/Transaction';
// const Transaction = require('../models/Transaction');

// ui colors
import colors from '../../colors';

// function search(nameKey, myArray) {
//   let obj = null;
//   let i = 0;
//   for (i; i < myArray.length; i += 1) {
//     if (myArray[i].name === nameKey) {
//       obj = myArray[i];
//     }
//   }
//   return obj;
// }

import { dates } from '../functions/dates';

// function clearStorageSync() {
//   const asyncStorageKeys = AsyncStorage.getAllKeys();
//   if (asyncStorageKeys.length > 0) {
//     AsyncStorage.clear();
//   }
// }

class Home extends Component {
  static navigationOptions = () => {
    // { screenProps }
    // get user name and email from props
    // console.log(screenProps);
    // const { name, email } = screenProps.user;
    const header = {
      headerTransparent: {},

      // headerLeft: <HeaderLeftView boldMessage={name} normalMessage={email} />,

      headerRight: <HeaderRightView />,
    };

    return header;
  }

  constructor(props) {
    super(props);

    this.state = {
      fontsAreLoaded: false,
      currentAmount: null,
      currentDate: new Date(),
      currentCategory: null,
      currentTransactions: [],
      currentPayee: null,
      currentType: null,
      currentBalanceValue: 0.00,
      currentSpentValue: 0.00,
      isSlideViewHidden: true,
      // isTypeViewHidden: true,
      enableCategoryPills: true,
      // typeViewBounceValue: new Animated.Value(100), // initial position of the type view
      slideViewBounceValue: new Animated.Value(300), // initial position of the slide view
      currentTransaction: null,
      isTableEnabled: true
    };

    this.handlePress = this.handlePress.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

    this.deleteBtnPressed = this.deleteBtnPressed.bind(this);

    // this.typeBtnPressed = this.typeBtnPressed.bind(this);

    this.toggleSlideView = this.toggleSlideView.bind(this);

    // this.toggleTypeView = this.toggleTypeView.bind(this);

    this.transactionBtnPressed = this.transactionBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load default transactions
    const transactionsObject = loadTransactionsObject();
    // console.log(transactions);

    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });

    // set fonts  are loaded
    this.setState({ fontsAreLoaded: true });

    const { transactions } = await transactionsObject;
    // =========================================== TEST
    // this.clearStorageSync();
    // if (global.debugModeOn) {
    //   transactions = testTransactions;
    // }

    // set transactions
    this.setState({ currentTransactions: transactions });

    // update current balance
    const balance = this.calculateBalance(transactions);
    this.setState({ currentBalanceValue: balance });

    // update current spent
    const spent = this.calculateSpent(transactions);
    this.setState({ currentSpentValue: spent });
  }


  calculateBalance = (array) => {
    let balance = 0.00;
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      // console.log(array[i].amount)
      balance += array[i].amount;
    }
    return balance.toFixed(2);
  }

  calculateSpent = (array) => {
    //  get date 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);

    let balance = 0.00;
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (dates.compare(array[i].date, date) > 0) {
        if (array[i].type === 'expense') {
          balance += array[i].amount;
        }
      }
    }
    return balance.toFixed(2);
  }

  transactionBtnPressed = (transaction) => {
    // console.log(transaction);
    const {
      currentTransaction,
      isSlideViewHidden
    } = this.state;

    if (currentTransaction === transaction) {
      // empty transaction
      this.setState({ currentTransaction: null });
      if (isSlideViewHidden !== true) {
        // hide slide view
        // this.toggleSlideView();
        // this.setState({ enableCategoryPills: !isSlideViewHidden });
      }
    } else if (currentTransaction !== transaction) {
      // not same transaction
      this.setState({ currentTransaction: transaction });
      // this.setState({ enableCategoryPills: true });
      if (isSlideViewHidden === true) {
        // this.toggleSlideView();
        // this.setState({ enableCategoryPills: !isSlideViewHidden });
      }
    } else {
      // set current transaction
      this.setState({ currentTransaction: transaction });
      if (isSlideViewHidden === true) {
        // show slide view
        // this.toggleSlideView();
        // this.setState({ enableCategoryPills: !isSlideViewHidden });
      }
    }
  }

  numberBtnPressed(number) {
    const { currentAmount } = this.state;
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    this.handleChange(newValue);
  }

  categoryBtnPressed(category) {
    // toggle current category selected
    const { currentCategory } = this.state;

    if (currentCategory === category) {
      this.setState({ currentCategory: null });
      // if (isTypeViewHidden !== true) {
      //   this.toggleTypeView();
      // }
    } else if (currentCategory !== category) {
      this.setState({ currentCategory: category });
      // if (isTypeViewHidden === true) {
      //   this.toggleTypeView();
      // }
    } else {
      // set new current category
      this.setState({ currentCategory: category });

      // if (isTypeViewHidden === true) {
      //   this.toggleTypeView();
      // }
    }
    if (category.type) {
      this.setState({ currentType: category.type });
    }
  }

  async storeNewTransaction(transaction) {
    const storageObj = await loadTransactionsObject(); // load storage object

    const { transactions } = storageObj; // get transactions from storage object

    transactions.unshift(transaction); // add new transaction to transactions

    // console.log(storageObj); // debug console

    saveTransactionsObject(storageObj); // save updated storage object

    // update current transactions list view with storage object
    await this.setState({ currentTransactions: transactions });

    const { currentTransactions } = this.state;

    // update current balance
    const balance = this.calculateBalance(currentTransactions);
    this.setState({ currentBalanceValue: balance });

    // update current spent this month
    const spent = this.calculateSpent(currentTransactions);
    this.setState({ currentSpentValue: spent });
  }

  clearCurrentInputs() {
    this.setState({ currentAmount: 0.00 });
    this.setState({ currentCategory: null });
    this.setState({ currentPayee: null });
    this.setState({ currentType: null });

    const {
      // isTypeViewHidden,
      enableCategoryPills,
      isSlideViewHidden
    } = this.state;

    // if (isTypeViewHidden === false) {
    //   this.toggleTypeView();
    // }

    if (isSlideViewHidden === false) {
      this.toggleSlideView();
    }

    if (enableCategoryPills !== true) {
      this.setState({ enableCategoryPills: true });
    }
  }

  // toggleTypeView() {
  //   let { isTypeViewHidden } = this.state;
  //   const { typeViewBounceValue } = this.state;

  //   let toValue = 100;

  //   if (isTypeViewHidden) {
  //     toValue = 0;
  //   }

  //   // This will animate the translateY of the subview between 0 & 300
  //   // depending on its current state
  //   // 300 comes from the style below, which is the height of the subview.
  //   Animated.spring(
  //     typeViewBounceValue,
  //     {
  //       toValue,
  //       velocity: 30,
  //       tension: 2,
  //       friction: 8,
  //     }
  //   ).start();

  //   isTypeViewHidden = !isTypeViewHidden;

  //   this.setState({ isTypeViewHidden });
  // }


  toggleSlideView() {
    let { isSlideViewHidden } = this.state;
    const { slideViewBounceValue } = this.state;

    let toValue = 300;

    if (isSlideViewHidden) {
      toValue = 0;
    }

    // This will animate the translateY of the subview between 0 & 300
    // depending on its current state
    // 300 comes from the style below, which is the height of the subview.
    Animated.spring(
      slideViewBounceValue,
      {
        toValue,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();

    isSlideViewHidden = !isSlideViewHidden;

    this.setState({ isSlideViewHidden });

    // console.log(isSlideViewHidden);
  }

  deleteBtnPressed(transaction) {
    this.removeTransaction(transaction);
  }

  // async removeItemValue(key) {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     return true;
  //   }
  //   catch(exception) {
  //     return false;
  //   }
  // }

  // async addNewPayee() {
  //   // add new payee to currentPayees (with textinput)
  //   const storage = await loadPayees();

  //   const { payees } = storage;

  //   const payee = new Payee(payees.length, 'New', colors.white);

  //   const resultObject = search(payee.name, payees);

  //   // console.log(resultObject);

  //   if (!resultObject) {
  //     payees.unshift(payee);

  //     savePayees(storage);

  //     this.setState({ currentPayee: payee });

  //     // console.log(sortArrayDesc(payees));
  //   }
  // }

  // payeeBtnPressed(payee) {
  //   if (payee.name === '+') {
  //     this.addNewPayee();
  //     return;
  //   }
  //   // toggle current payee selected
  //   const { currentPayee } = this.state;

  //   if (currentPayee === payee) {
  //     this.setState({ currentPayee: null });
  //   } else {
  //     // set new current payee
  //     this.setState({ currentPayee: payee });
  //   }

  //   // console.log(payee);
  // }

  // typeBtnPressed(type) {
  //   const { currentType } = this.state;
  //   if (currentType === type.name) {
  //     this.setState({ currentType: null });
  //   } else {
  //     this.setState({ currentType: type.name });
  //   }
  // }

  async removeTransaction(transaction) {
    const storageObject = await loadTransactionsObject();

    const { transactions } = storageObject;

    // console.log(transactions)

    // remove transaction by id
    const array = transactions;
    // console.log(array.length)

    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].id === transaction.id) {
        array.splice(i, 1);
      }
    }

    saveTransactionsObject(storageObject);

    this.setState({ currentTransactions: transactions });

    const { currentTransactions } = this.state;

    // update current balance
    const balance = this.calculateBalance(currentTransactions);
    this.setState({ currentBalanceValue: balance });

    // update current spent this month
    const spent = this.calculateSpent(currentTransactions);
    this.setState({ currentSpentValue: spent });
  }

  handlePress(value) {
    if (typeof (value) === 'number') {
      this.numberBtnPressed(value);
    } else if (value === 'Add') {
      this.addTransactionBtnPressed();
    } else if (value === '<') {
      this.backspaceBtnPressed();
    } else {
      throw new Error('Pressed:', value);
    }
  }

  backspaceBtnPressed() {
    const { currentAmount } = this.state;
    // check for null, NaN, undefined, ''
    if (currentAmount) {
      const strValue = String(currentAmount);
      // pop last char from string value
      const newStr = strValue.substring(0, strValue.length - 1);

      this.handleChange(newStr);
    }
  }

  // value changes
  handleChange(value) {
    // check for limit of 11 digits
    if (String(value).length > global.maxAmountLength) {
      return;
    }
    this.setState({ currentAmount: value });
  }

  createNewTransaction() {
    const {
      currentDate,
      currentAmount,
      currentPayee,
      currentCategory,
      currentType
    } = this.state;

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
        currentDate, // current date
        amount, // current camount
        currentPayee, // payee obj
        currentCategory, // category object
        currentType // type
      );
      // console.log(transaction);
    }
    return transaction;
  }

  addTransactionBtnPressed() {
    const transaction = this.createNewTransaction();

    if (transaction) {
      this.storeNewTransaction(transaction); // add new transaction to existing storage
      this.clearCurrentInputs(); // clear input values
    }
    // console.log(transaction);
  }

  render() {
    // this.clearStorageSync()
    const {
      fontsAreLoaded,
      currentAmount,
      currentBalanceValue,
      currentSpentValue,
      // currentDate,
      currentTransactions,
      currentCategory,
      // currentPayee,
      // currentType,
      // typeViewBounceValue,
      slideViewBounceValue,
      enableCategoryPills,
      currentTransaction,
      isTableEnabled
    } = this.state;

    // console.log(currentTransactions)

    let view = <View />;
    if (fontsAreLoaded) {
      view = (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

          <BalanceView
            currentBalanceValue={currentBalanceValue}
            currentSpentValue={currentSpentValue}
            // currentBalanceBtnPressed={() => alert()}
            // currentSpentBtnPressed={() => alert()}
          />
          {/*
          <DateLabelView date={currentDate} />
          */}
          {/*
          <TransactionsView
            deleteBtnPressed={this.deleteBtnPressed}
            transactions={currentTransactions}
            onPress={this.transactionBtnPressed}
            currentTransaction={currentTransaction}
            isEnabled={isTableEnabled}
            tableTop="65%"

          />
          */}

          <MyStickyTable
            transactions={currentTransactions}
            tableTop="25%"
            key={currentTransactions}
            onPress={this.transactionBtnPressed}
            currentTransaction={currentTransaction}
            isEnabled={isTableEnabled}
            deleteBtnPressed={this.deleteBtnPressed}
          />

          {/*
          <TypeView
            onPress={this.typeBtnPressed}
            currentType={currentType}
            toggleView={this.toggleTypeView}
            typeViewBounceValue={typeViewBounceValue}
          />
          */}

          <ScrollingPillCategoriesView
            onPress={this.categoryBtnPressed}
            currentCategory={currentCategory}
            isEnabled={enableCategoryPills}
            topPosition="57%"
            shadowOffset={{
              width: 1,
              height: 1
            }}
            shadowRadius={26}
            shadowOpacity={1}
          />

          <AmountInputView
            isEditable={false}
            value={currentAmount}
            handleChange={this.handleChange}
          />

          <KeypadView handlePress={this.handlePress} />

          <SlideUp
            toggleSlideView={() => this.toggleSlideView()}
            slideViewBounceValue={slideViewBounceValue}
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

export default Home;
