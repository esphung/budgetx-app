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
*/

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import * as Font from 'expo-font';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

// import my custom view components
import HeaderLeftView from '../components/Header/HeaderLeftView';
import HeaderRightView from '../components/Header/HeaderRightView';
import BalanceView from '../components/Balances/BalanceView';
import MyStickyTable from '../components/TransactionsView/MyStickyTable';
import ScrollingPillCategoriesView from '../components/CategoryPills/ScrollingPillCategoriesView';
import AmountInputView from '../components/AmountInput/AmountInputView';
import KeypadView from '../components/Keypad/KeypadView';
// import SlideUp from '../components/SlideUp/SlideUp';
import SpinnerMask from '../components/SpinnerMask';

import Transaction from '../models/Transaction';
// const Transaction = require('../models/Transaction');

// ui colors
import colors from '../../colors';

import { dates } from '../functions/dates';

function Home({ screenProps }) {
  // hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [currentBalance, setCurrentBalance] = useState(0);

  const [currentSpent, setCurrentSpent] = useState(null);

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentType, setCurrentType] = useState(null);

  const [currentAmount, setCurrentAmount] = useState(null);

  const [user, setUser] = useState(screenProps);

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  useEffect(() => {
    retrieveFonts();// loaded Fonts

    retrieveTransactions(); // loaded transactions

    // console.log('Home Mounted');
    // return () => {
    //   console.log('Cleaned up fonts');
    // };
  }, []);

  useEffect(() => {
    // calculate balance
    const balance = (calculateBalance(transactions));
    setCurrentBalance(balance);

    // calculate spent
    const spent = (calculateMonthSpent(transactions));
    setCurrentSpent(spent);

    // console.log('Transactions Mounted');
    // return () => {
    //   // effect
    //   // console.log('Cleaned up transactions');
    // };
  }, [transactions])

  const retrieveFonts = async () => {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });
    setFontsAreLoaded(true);
  };

  const retrieveTransactions = async () => {
    // load stored transactions
    try {
      const transactionsObject = await loadTransactionsObject();
      // console.log(transactions);

      // set transactions
      setTransactions(transactionsObject.transactions);

      // // get transactions from user
      // console.log('User transactions:', user.transactions.length)
      // setTransactions(user.transactions)

    } catch (e) {
      // statements
      // console.log('retrieveTransactions:', e);
    }
  };

  const calculateBalance = (array) => {
    let balance = 0.00;
    if (array) {
      let i = array.length - 1;
      for (i; i >= 0; i -= 1) {
        if (array[i].amount) {
          // console.log(array[i].amount);
          balance = balance + array[i].amount;       
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
            balance = balance + array[i].amount;
          }
        }
      }
    }
    return balance.toFixed(2);
  };

  // actions
  const transactionBtnPressed = (transaction) => {
    // console.log(transaction);
    setCurrentBalance(0.00)
  };

  const deleteBtnPressed = (transaction) => {
    removeTransaction(transaction);
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
    // this.setState({ currentAmount: value });
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
        currentType // type
      );
      // console.log(transaction);
    }
    return transaction;
  };

  const addTransactionBtnPressed = () => {
    const transaction = createNewTransaction();
    if (transaction) {
      storeNewTransaction(transaction); // add new transaction to existing storage
    }
    // console.log(transaction);
  };

  const storeNewTransaction = async (transaction) => {
    const storageObject = await loadTransactionsObject(); // load storage object

    storageObject.transactions.unshift(transaction); // add new transaction to transactions

    saveTransactionsObject(storageObject); // save updated storage object

    clearState();
  };

  const removeTransaction = async (transaction) => {
    const storageObject = await loadTransactionsObject();

    // remove transaction by id
    const array = storageObject.transactions;

    // loop thru stored transactions and splice transaction from it
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].id === transaction.id) {
        array.splice(i, 1);
      }
    }

    saveTransactionsObject(storageObject);

    clearState();
  };

  const clearState = () => {
    retrieveTransactions(); // loaded transactions

    setCurrentAmount(0.00);

    setCurrentCategory(null);

    setCurrentTransaction(null);

    setCurrentType(null);
  };

  // return component
  let view = <View />;
  if (fontsAreLoaded) {
    view = (
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

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
        />

        <AmountInputView
          isEditable={false}
          value={currentAmount}
          handleChange={handleChange}
        />

        <KeypadView handlePress={handlePress} />

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
    headerLeft: <HeaderLeftView user={screenProps} />,
    headerRight: <HeaderRightView />,
  };
  return header;
};


export default Home;

// Home original class component ========================================

// import React, { Component } from 'react';

// import {
//   StyleSheet,
//   View,
//   // ActivityIndicator,
//   ScrollView,
//   // Animated,
//   // Keyboard,
//   // TouchableWithoutFeedback,
//   // AsyncStorage
// } from 'react-native';

// import * as Font from 'expo-font';

// // import my custom view components
// import HeaderLeftView from '../components/Header/HeaderLeftView';
// import HeaderRightView from '../components/Header/HeaderRightView';
// import BalanceView from '../components/Balances/BalanceView';
// import MyStickyTable from '../components/TransactionsView/MyStickyTable';
// import AmountInputView from '../components/AmountInput/AmountInputView';
// import KeypadView from '../components/Keypad/KeypadView';
// import SpinnerMask from '../components/SpinnerMask';

// import {
//   loadTransactionsObject,
//   saveTransactionsObject
// } from '../storage/TransactionsStorage';

// import Transaction from '../models/Transaction';
// // const Transaction = require('../models/Transaction');

// // ui colors
// import colors from '../../colors';

// // function search(nameKey, myArray) {
// //   let obj = null;
// //   let i = 0;
// //   for (i; i < myArray.length; i += 1) {
// //     if (myArray[i].name === nameKey) {
// //       obj = myArray[i];
// //     }
// //   }
// //   return obj;
// // }

// import { dates } from '../functions/dates';

// // function clearStorageSync() {
// //   const asyncStorageKeys = AsyncStorage.getAllKeys();
// //   if (asyncStorageKeys.length > 0) {
// //     AsyncStorage.clear();
// //   }
// // }

// class Home extends Component {
//   static navigationOptions = () => {
//     const name = 'Eric Phung';
//     const email = 'esphung@gmail.com';

//     const header = {
//       headerTransparent: {},
//       headerLeft: <HeaderLeftView boldMessage={name} normalMessage={email} />,
//       headerRight: <HeaderRightView />,
//     };
//     return header;
//   }

//   constructor() {
//     super();
//     // console.log(this.props.screenProps)

//     this.state = {
//       fontsAreLoaded: false,
//       currentAmount: null,
//       currentDate: new Date(),
//       currentCategory: null,
//       currentTransactions: [],
//       currentPayee: null,
//       currentType: null,
//       currentBalanceValue: 0.00,
//       currentSpentValue: 0.00,
//       isSlideViewHidden: true,
//       enableCategoryPills: true,
//       currentTransaction: null,
//       isTableEnabled: true
//     };

//     this.handlePress = this.handlePress.bind(this);

//     this.handleChange = this.handleChange.bind(this);

//     this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

//     this.deleteBtnPressed = this.deleteBtnPressed.bind(this);

//     this.transactionBtnPressed = this.transactionBtnPressed.bind(this);
//   }

//   async componentDidMount() {
//     // load default transactions
//     const transactionsObject = loadTransactionsObject();

//     // load fonts
//     await Font.loadAsync({
//       'SFProDisplay-Regular': global.SFProDisplayRegularFont,
//       'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
//     });

//     // set fonts  are loaded
//     this.setState({ fontsAreLoaded: true });

//     const { transactions } = await transactionsObject;
//     // =========================================== TEST
//     // this.clearStorageSync();

//     // set transactions
//     this.setState({ currentTransactions: transactions });

//     // update current balance
//     const balance = this.calculateBalance(transactions);
//     this.setState({ currentBalanceValue: balance });

//     // update current spent
//     const spent = this.calculateMonthSpent(transactions);
//     this.setState({ currentSpentValue: spent });
//   }

//   calculateBalance = (array) => {
//     let balance = 0.00;
//     let i = array.length - 1;
//     for (i; i >= 0; i -= 1) {
//       // console.log(array[i].amount)
//       balance += array[i].amount;
//     }
//     return balance.toFixed(2);
//   }

//   calculateMonthSpent = (array) => {
//     //  get date 30 days ago
//     const date = new Date();
//     date.setDate(date.getDate() - 30);

//     let balance = 0.00;
//     let i = array.length - 1;
//     for (i; i >= 0; i -= 1) {
//       if (dates.compare(array[i].date, date) > 0) {
//         if (array[i].type === 'expense') {
//           balance += array[i].amount;
//         }
//       }
//     }
//     return balance.toFixed(2);
//   }

//   transactionBtnPressed = (transaction) => {
//     // console.log(transaction);
//     const { currentTransaction } = this.state;

//     if (currentTransaction === transaction) {
//       // empty transaction
//       this.setState({ currentTransaction: null });
//     } else if (currentTransaction !== transaction) {
//       // not same transaction
//       this.setState({ currentTransaction: transaction });
//     } else {
//       // set current transaction
//       this.setState({ currentTransaction: transaction });
//     }
//   }

//   numberBtnPressed(number) {
//     const { currentAmount } = this.state;
//     // truncate single AND leading zeros; concatenate old + new values
//     const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
//     this.handleChange(newValue);
//   }

//   categoryBtnPressed(category) {
//     // toggle current category selected
//     const { currentCategory } = this.state;
//     if (currentCategory === category) {
//       this.setState({ currentCategory: null });
//     } else if (currentCategory !== category) {
//       this.setState({ currentCategory: category });
//     } else {
//       // set new current category
//       this.setState({ currentCategory: category });
//     }

//     if (category.type) {
//       this.setState({ currentType: category.type });
//     }
//   }

//   async storeNewTransaction(transaction) {
//     const storageObj = await loadTransactionsObject(); // load storage object

//     const { transactions } = storageObj; // get transactions from storage object

//     transactions.unshift(transaction); // add new transaction to transactions

//     saveTransactionsObject(storageObj); // save updated storage object

//     // update current transactions list view with storage object
//     await this.setState({ currentTransactions: transactions });

//     const { currentTransactions } = this.state;

//     // update current balance
//     const balance = this.calculateBalance(currentTransactions);
//     this.setState({ currentBalanceValue: balance });

//     // update current spent this month
//     const spent = this.calculateMonthSpent(currentTransactions);
//     this.setState({ currentSpentValue: spent });
//   }

//   clearCurrentInputs() {
//     this.setState({ currentAmount: 0.00 });
//     this.setState({ currentCategory: null });
//     this.setState({ currentPayee: null });
//     this.setState({ currentType: null });

//     const {
//       // isTypeViewHidden,
//       enableCategoryPills,
//       isSlideViewHidden
//     } = this.state;

//     // if (isTypeViewHidden === false) {
//     //   this.toggleTypeView();
//     // }

//     if (isSlideViewHidden === false) {
//       this.toggleSlideView();
//     }

//     if (enableCategoryPills !== true) {
//       this.setState({ enableCategoryPills: true });
//     }
//   }

//   deleteBtnPressed(transaction) {
//     this.removeTransaction(transaction);
//   }

//   async removeTransaction(transaction) {
//     const storageObject = await loadTransactionsObject();

//     const { transactions } = storageObject;

//     // console.log(transactions)

//     // remove transaction by id
//     const array = transactions;
//     // console.log(array.length)

//     let i = array.length - 1;
//     for (i; i >= 0; i -= 1) {
//       if (array[i].id === transaction.id) {
//         array.splice(i, 1);
//       }
//     }

//     saveTransactionsObject(storageObject);

//     this.setState({ currentTransactions: transactions });

//     const { currentTransactions } = this.state;

//     // update current balance
//     const balance = this.calculateBalance(currentTransactions);
//     this.setState({ currentBalanceValue: balance });

//     // update current spent this month
//     const spent = this.calculateMonthSpent(currentTransactions);
//     this.setState({ currentSpentValue: spent });
//   }

//   handlePress(value) {
//     if (typeof (value) === 'number') {
//       this.numberBtnPressed(value);
//     } else if (value === 'Add') {
//       this.addTransactionBtnPressed();
//     } else if (value === '<') {
//       this.backspaceBtnPressed();
//     } else {
//       throw new Error('Pressed:', value);
//     }
//   }

//   backspaceBtnPressed() {
//     const { currentAmount } = this.state;
//     // check for null, NaN, undefined, ''
//     if (currentAmount) {
//       const strValue = String(currentAmount);
//       // pop last char from string value
//       const newStr = strValue.substring(0, strValue.length - 1);

//       this.handleChange(newStr);
//     }
//   }

//   // value changes
//   handleChange(value) {
//     // check for limit of 11 digits
//     if (String(value).length > global.maxAmountLength) {
//       return;
//     }
//     this.setState({ currentAmount: value });
//   }

//   createNewTransaction() {
//     const {
//       currentDate,
//       currentAmount,
//       currentPayee,
//       currentCategory,
//       currentType
//     } = this.state;

//     let transaction = null;

//     // check if category is selected and amount is provided by user
//     if ((currentCategory) && (currentAmount > 0) && currentType) {
//       // do date stuff here

//       // convert amount to money format
//       let amount = currentAmount / 100;
//       amount = (currentType === 'income') ? amount : amount * -1; // income/expense

//       // do payee stuff here

//       transaction = new Transaction(
//         // currentTransactions.length, // id
//         currentDate, // current date
//         amount, // current camount
//         currentPayee, // payee obj
//         currentCategory, // category object
//         currentType // type
//       );
//       // console.log(transaction);
//     }
//     return transaction;
//   }

//   addTransactionBtnPressed() {
//     const transaction = this.createNewTransaction();

//     if (transaction) {
//       this.storeNewTransaction(transaction); // add new transaction to existing storage
//       this.clearCurrentInputs(); // clear input values
//     }
//     // console.log(transaction);
//   }

//   render() {
//     // this.clearStorageSync()
//     const {
//       fontsAreLoaded,
//       currentAmount,
//       currentBalanceValue,
//       currentSpentValue,
//       currentTransactions,
//       currentCategory,
//       enableCategoryPills,
//       currentTransaction,
//       isTableEnabled
//     } = this.state;

//     let view = <View />;
//     if (fontsAreLoaded) {
//       view = (
//         <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
//           <BalanceView
//             currentBalanceValue={currentBalanceValue}
//             currentSpentValue={currentSpentValue}
//           />

//           <MyStickyTable
//             transactions={currentTransactions}
//             tableTop="25.5%"
//             tableHeight="32%"
//             tablePosition="absolute"
//             key={currentTransactions}
//             onPress={this.transactionBtnPressed}
//             currentTransaction={currentTransaction}
//             isEnabled={isTableEnabled}
//             deleteBtnPressed={this.deleteBtnPressed}
//           />

//           <ScrollingPillCategoriesView
//             onPress={this.categoryBtnPressed}
//             currentCategory={currentCategory}
//             isEnabled={enableCategoryPills}
//             topPosition="57%"
//             shadowOffset={{
//               width: 1,
//               height: 1
//             }}
//             shadowRadius={26}
//             shadowOpacity={1}
//           />

//           <AmountInputView
//             isEditable={false}
//             value={currentAmount}
//             handleChange={this.handleChange}
//           />

//           <KeypadView handlePress={this.handlePress} />
//         </ScrollView>
//       );
//     } else {
//       view = (
//         <View style={styles.container}>
//           <SpinnerMask />
//         </View>
//       );
//     }
//     return view;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: colors.darkTwo,

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   }
// });

// export default Home;
