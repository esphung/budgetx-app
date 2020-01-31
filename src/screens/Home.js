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
*/

import React, { useState, useEffect, useCallback } from 'react';

import {
  StyleSheet,
  View,
  // ScrollView,
  Animated,
  Alert,
} from 'react-native';

import Auth from '@aws-amplify/auth';

import { AppLoading } from 'expo';

// import API, { graphqlOperation } from '@aws-amplify/api'; // AppSync Query GraphQL

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from 'main/colors';

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

// import Payee from '../models/Payee';

// import Category from '../models/Category';

import { calculateBalance, calculateMonthSpent } from './functions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkTwo,
  },
});


const AddTransaction = `
mutation ($amount: Float! $date: String! $note: String $type: String) {
  createTransaction(input: {
    amount: $amount
    date: $date
    note: $note
    type: $type
  }) {
    id amount date note type
  }
}
`;

const ListTransactions = `
query {
  listTransactions {
    items {
      id
      date
      amount
      payee {
        id
        name
      }
      category {
        id
        name
        color
        type
      }
      note
    }
  }
}
`;

const initialState = {
  currentDate: new Date(),
  currentAmount: 0.00,
  currentCategory: null,
  transactions: [],
  slideViewBounceValue: new Animated.Value(300),
  currentBalance: 0.00,
  currentSpent: 0.00,
  currentPayee: '',
  currentTransaction: null,
  currentNote: '',
  isReady: false,
  currentType: '',
  isSlideViewHidden: true,
  isCurrentTransaction: false,
};

function Home() {
  // hooks
  const [transactions, setTransactions] = useState(initialState.transactions);
  const [currentBalance, setCurrentBalance] = useState(initialState.currentBalance);
  const [currentSpent, setCurrentSpent] = useState(initialState.currentSpent);
  const [currentTransaction, setCurrentTransaction] = useState(initialState.currentTransaction);
  const [currentCategory, setCurrentCategory] = useState(initialState.currentCategory);
  const [currentType, setCurrentType] = useState(initialState.currentType);
  const [currentAmount, setCurrentAmount] = useState(initialState.currentAmount);
  const [currentDate, setCurrentDate] = useState(initialState.currentDate);
  const [currentPayee, setCurrentPayee] = useState(initialState.currentPayee);
  const [currentNote, setCurrentNote] = useState(initialState.currentNote);
  const [slideViewBounceValue, setSlideViewBounceValue] = useState(initialState.slideViewBounceValue);
  const [isSlideViewHidden, setIsSlideViewHidden] = useState(initialState.isSlideViewHidden);
  const [isCurrentTransaction, setIsCurrentTransaction] = useState(initialState.isCurrentTransaction);
  const [isReady, setIsReady] = useState(false);

  const [storageKey, setStorageKey] = useState(null);


  const [shouldShowScrollingPills, setShouldShowScrollingPills] = useState(true);
  const [shouldShowAmountInput, setShouldShowAmountInput] = useState(true);
  const [shouldShowKeypad, setShouldShowKeypad] = useState(true);

  const [isNameInputEnabled, setIsNameInputEnabled] = useState(true);

  // find previous obj if exists
  function searchByID(key, myArray) {
    // console.log(nameKey);
    let obj = null;
    let i = 0;
    for (i; i < myArray.length; i += 1) {
      // console.log(myArray[i].id, nameKey);
      if (myArray[i].id === key) {
        obj = myArray[i];
      }
    }
    return obj;
  }

  const handleTransactionChange = async (transactions, updated) => {
    // console.log(transactions);
    try {
      const storageObj = await loadSettingsStorage(storageKey);

      const list = transactions;

      storageObj.transactions = list

      saveSettingsStorage(storageKey, storageObj);

      setTransactions(storageObj.transactions);

      setCurrentTransaction(updated);
      
    } catch(e) {
      // statements
      console.log(e);
    }
    
  };


  const updateStoredTransactionNote = async (string) => {
    // console.log(string);

    // console.log(currentTransaction.id);

    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(storageKey);
      // console.log(transaction);
      const list = storageObj.transactions;

      const found = searchByID(currentTransaction.id, list);


      // set stored user image
      // console.log('stored user settings image:', storageObj.image);
      if (found) {
        // found stored image
        // setImage(storageObj.image);
        // found.note = note;
        // console.log('previous note:', found.note);

        found.note = string;
        // console.log('new note:', found.note);

        const pos = list.indexOf(found);

        list[pos] = found;

        storageObj.transactions = list;

        saveSettingsStorage(storageKey, storageObj);

        setTransactions(list);

        // setCurrentPayee(null);
        // setCurrentNote(null);
        // setCurrentAmount(initialState.currentAmount);
        // setCurrentCategory(initialState.currentCategory);
        setCurrentTransaction(list[pos]);
        // setCurrentType(initialState.currentType);

        // return from here
        // return;


        // let i = storageObj.transactions.length - 1;
        // for (i; i >= 0; i -= 1) {
        //   if (storageObj.transactions[i].id === found.id) {
        //     // set user transaction payee
        //     storageObj.transactions[i] = found;

        //     // console.log(storageObj.transactions[i]);

        //     // save transactions list
        //     // saveUserObject(userObject);
        //     // saveSettingsStorage(this.state.storageKey, userObject);

        //     saveSettingsStorage(storageKey, storageObj);

        //     setTransactions(storageObj.transactions);

        //     // setCurrentPayee(null);
        //     // setCurrentNote(null);
        //     // setCurrentAmount(initialState.currentAmount);
        //     // setCurrentCategory(initialState.currentCategory);
        //     setCurrentTransaction(storageObj.transactions[i]);
        //     // setCurrentType(initialState.currentType);

        //     // return from here
        //     // return;
        //   }
        // }
      }
    } catch (e) {
      // statements
      // Alert.alert('Could not load settings');
      // console.log(e);
    }
  };

  async function clearState() {
    setIsReady(false);
    hideSlideView();

    // add/remove transactions
    setTransactions([]);
    setCurrentBalance(0.00);
    setCurrentSpent(0.00);
    setCurrentPayee(null);
    setCurrentNote(null);
    setCurrentDate(initialState.currentDate);
    setCurrentAmount(initialState.currentAmount);
    setCurrentCategory(initialState.currentCategory);
    setCurrentTransaction(initialState.currentTransaction);
    setCurrentType(initialState.currentType);
    setIsNameInputEnabled(true);


    setSlideViewBounceValue(initialState.slideViewBounceValue); // (new Animated.Value(300));
    setIsSlideViewHidden(initialState.isSlideViewHidden);
    setIsCurrentTransaction(initialState.isCurrentTransaction);

    setStorageKey(null);
    // retrieveStoredTransactions(); // load stored user
    cacheResourcesAsync();
    // console.log('Cleared');
  }

  async function cacheResourcesAsync() {
    // console.log('loading');
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // setUserToken(user.signInUserSession.accessToken.jwtToken);
        // console.log('username:', cognitoUser.username);
        setStorageKey(cognito.username);
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
      });
  }

  async function storeUserTransaction(transaction) {
    // setIsReady(false);
    const userObject = await loadSettingsStorage(storageKey); // load user object
    userObject.transactions.unshift(transaction);
    // saveUserObject(userObject);
    saveSettingsStorage(storageKey, userObject);

    setTransactions(userObject.transactions);

    setCurrentPayee(null);
    setCurrentNote(null);
    setCurrentAmount(initialState.currentAmount);
    setCurrentCategory(initialState.currentCategory);
    setCurrentTransaction(initialState.currentTransaction);
    setCurrentType(initialState.currentType);

    // setStorageKey(null);
    // setIsReady(true);

    // retrieveStoredTransactions(); // load stored user
    // cacheResourcesAsync();

    // clearState();
  }

  async function removeUserTransaction(transaction) {
    const userObject = await loadSettingsStorage(storageKey);

    const list = userObject.transactions;

    const found = searchByID(transaction.id, list);

    // console.log(found);

    if (found) {
      const pos = list.indexOf(found);
      list.splice(pos, 1);

      setTransactions(list);

      userObject.transactions = list;

      saveSettingsStorage(storageKey, userObject);

      setCurrentPayee(null);
      setCurrentNote(null);
      setCurrentAmount(initialState.currentAmount);
      setCurrentCategory(initialState.currentCategory);
      setCurrentTransaction(initialState.currentTransaction);
      setCurrentType(initialState.currentType);
    }
  }

  async function retrieveStoredTransactions() {
    // setIsReady(false);
    try {
      const userObject = await loadSettingsStorage(storageKey)
      // set stored user's transactions
      await setTransactions(userObject.transactions);
      // console.log(userObject.transactions)
      // setIsReady(true);
    } catch (e) {
      // statements
      Alert.alert('Could not load stored transactions');
    }

    // try {
    //   const items = await API.graphql(graphqlOperation(ListTransactions));
    //   console.log('items: ', items.data.listTransactions.items);
    //   // this.setState({ items: items.data.listBooks.items });
    //   setTransactions(items.data.listTransactions.items);
    // } catch (err) {
    //   console.log('error: ', err);
    // }


    // setIsReady(true);
  }

  const addTransaction = async () => {
    if (!currentAmount || !currentCategory) return;
    // const transaction = { amount: currentAmount, category: currentCategory };
    const transaction = new Transaction(
      currentDate, // date
      Number(currentAmount).toFixed(2) / 100, // amount
      currentPayee, // payee
      currentCategory, // category
      currentType, // type
      currentNote, // note
    );
    // console.log(transaction);

    // try {
    //   const list = [transaction, ...transactions];
    //   // console.log(list);
    //   setTransactions(list);
    //   setCurrentAmount(0.00);
    //   setCurrentCategory(null);
    //   setCurrentDate(new Date());

    //   await API.graphql(graphqlOperation(AddTransaction, transaction));
    //   console.log('Success!');
    // } catch (err) {
    //   console.log('error: ', err);
    // }

    storeUserTransaction(transaction);
    // clearState();
  };
  const showSlideView = useCallback(
    () => {
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 0,
          velocity: 100,
          tension: 32,
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
          toValue: 600,
          velocity: 100,
          tension: 32,
          friction: 8,
        },
      ).start();
      setIsSlideViewHidden(true);
    },
    [slideViewBounceValue],
  );

  // value changes
  const handleChange = (value) => {
    // check for limit of 11 digits
    if (String(value).length > global.maxAmountLength) {
      return;
    }
    setCurrentAmount(value);
  };

  const numberBtnPressed = (number) => {
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    handleChange(newValue);
  };

  // const createNewTransaction = () => {
  //   let transaction = null;

  //   // check if category is selected and amount is provided by user
  //   if ((currentCategory) && (currentAmount > 0) && currentType) {
  //     // do date stuff here

  //     // convert amount to money format
  //     let amount = currentAmount / 100;
  //     amount = (currentType === 'income') ? amount : amount * -1; // income/expense

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

  const addTransactionBtnPressed = () => {
    addTransaction();
  };

  const backspaceBtnPressed = () => {
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

  async function retrieveStoredSettingsTransactions(key) {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(key);

      // set stored user transactions
      if (storageObj) {
        // console.log('stored user settings transactions:', storageObj.transactions);
        if (storageObj.transactions) {
          // found stored image
          // console.log(storageObj.transactions);
          setTransactions(storageObj.transactions);
        }
      }
    } catch (e) {
      // statements
      // Alert.alert('Could not load settings');
      // console.log(e);
    }
  }

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  // component did mount
  // useEffect(() => {
  //   // console.log('mount Home');
  //   // retrieveStoredTransactions();

  //   // return () => {
  //   //   // console.log('Clean up Home');
  //   // };
  // }, []);

  useEffect(() => {
    if (storageKey) {
      // load user storage
      retrieveStoredSettingsTransactions(storageKey);
    }
  }, [storageKey]);

  // current transaction updates
  useEffect(() => {
    if (transactions) {
      // calculate balances
      const balance = (calculateBalance(transactions));
      setCurrentBalance(balance);

      // calculate spent
      const spent = (calculateMonthSpent(transactions));
      setCurrentSpent(spent);

      // setIsReady(true);
    }
  }, [transactions]);

  useEffect(() => {
    if (currentCategory) {
      setCurrentType(currentCategory.type);
    }
    // return () => {
    //   //
    //   console.log('clean up');
    //   setCurrentType(initialState.currentType);
    // }
  }, [currentCategory]);

  useEffect(() => {
    if (!isSlideViewHidden) {
      setShouldShowScrollingPills(false);
      setShouldShowAmountInput(false);
      setShouldShowKeypad(false);
    } else {
      setShouldShowScrollingPills(true);
      setShouldShowAmountInput(true);
      setShouldShowKeypad(true);
    }

    if (currentTransaction && !isSlideViewHidden) {
      setIsNameInputEnabled(false);
    } else {
      setIsNameInputEnabled(true);
    }

    
    return () => {
      // effect
    };
  }, [isSlideViewHidden, currentTransaction]);

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
  //       setTransactions(items.data.listBooks.items);
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
    // // set current type from category
    // if (category.type) {
    //   setCurrentType(category.type);
    // }
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
      onPress={(category) => categoryBtnPressed(category)}
      currentCategory={currentCategory}
      topPosition="57%"
      shadowOffset={{
        width: 1,
        height: 1,
      }}
      shadowRadius={26}
      shadowOpacity={1}

      currentCategories={[]}

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

  let keypad = <KeypadView handlePress={handlePress} />;

  if (!shouldShowScrollingPills) {
    scrollingPills = null;
  }

  if (!shouldShowAmountInput) {
    amountInput = null;
  }

  if (!shouldShowKeypad) {
    keypad = null;
  }

  const view = (
    <View
      // scrollEnabled={false}
      // contentContainerStyle={styles.container}>
      style={styles.container}
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
        transactions={transactions}
        currentTransaction={currentTransaction}
        key={transactions}

        tableTop="25.5%"
        tableHeight="32%"
        tablePosition="absolute"

        onPress={(transaction) => transactionBtnPressed(transaction)}
        deleteBtnPressed={(transaction) => deleteBtnPressed(transaction)}
        // isCurrentTransaction={isCurrentTransaction}

        swipeEditBtnPressed={swipeEditBtnPressed}

        isNameInputEnabled={isNameInputEnabled}
      />

      { scrollingPills }

      { amountInput }

      { keypad }

      <SlideUpView
        slideViewBounceValue={slideViewBounceValue}
        transaction={currentTransaction}
        handleTransactionChange={handleTransactionChange}
        // handleNoteChange={handleNoteChange}
        dismiss={() => {
          setCurrentTransaction(initialState.currentTransaction);
        }}
        updateStoredTransactionNote={updateStoredTransactionNote}

        // updateStoredTransactionCategory={() => {
        //   console.log(currentTransaction)
        // }}
      />

    </View>

  );

  const appLoading = (
    <AppLoading
      startAsync={clearState}
      onFinish={() => setIsReady(true)}
      // onFinish={() => {}}
      onError={console.warn}
    />
  );

  if (!isReady) {
    return appLoading;
  }
  return view;
}

Home.navigationOptions = ({ navigation }) => {
  // get user name and email from passed props
  const header = {
    headerTransparent: {},
    headerLeft: <HeaderLeftView navigation={navigation} />,
    headerRight: <HeaderRightView />,
  };
  return header;
};

// const TransactionsList = compose(
//     // GraphQL.operations.FetchTransactions
// )(Home);

export default Home; // TransactionsList; // Home;
