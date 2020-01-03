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
*/

import React, { useState, useEffect, useCallback } from 'react';

import {
  StyleSheet,
  View,
  // ScrollView,
  Animated,
  Alert,
} from 'react-native';

import { AppLoading } from 'expo';

import API, { graphqlOperation } from '@aws-amplify/api'; // AppSync Query GraphQL

// // Amplify imports and config
// import Amplify from 'aws-amplify'; // '@aws-amplify/core';
// import awsConfig from 'main/aws-exports';

// import ApolloClient from 'apollo-boost';

// // import {Rehydrated} from 'aws-appsync-react'
// import { ApolloProvider } from 'react-apollo'
// import Client from 'aws-appsync'
// // import AppSyncConfig from 'main/AppSync'

// const client = new ApolloClient({
//   // uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   uri: awsConfig.aws_appsync_graphqlEndpoint,
//   // region: awsConfig.aws_appsync_region,
//   // auth: {
//   //   type: awsConfig.aws_appsync_authenticationType,
//   //   jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
//   // }
// });

// console.log(client)

// import { gql } from 'apollo-boost'; // or you can use `import gql from 'graphql-tag';` instead

// // client
// //   .query({
// //     query: gql`
// //       {
// //         rates(currency: "USD") {
// //           currency
// //         }
// //       }
// //     `
// //   })
// //   .then(result => console.log(result.length));

// // AWS Amplify
// // import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

// // import * as queries from 'main/src/graphql/queries';
// // import * as mutations from 'main/src/graphql/mutations';
// // import * as subscriptions from 'main/src/graphql/subscriptions';

// Amplify.configure(awsConfig);


// Auth.currentAuthenticatedUser()
//   .then((cognitoUser) => {
//     // setUserToken(user.signInUserSession.accessToken.jwtToken);
//     console.log('username:', cognitoUser.username);


//     // setUser(cognitoUser);

//     // console.log(cognitoUser.username);
//     // console.log(cognitoUser.transactions)
//     jwtToken = cognitoUser.attributes.jwtToken
//   })
//   .catch((err) => {
//     // console.log(err);
//     Alert.alert(err);
//   });


import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from '../../colors';

import {
  loadUserObject,
  saveUserObject,
} from '../storage/UserStorage';

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

async function storeUserTransaction(transaction) {
  const userObject = await loadUserObject(); // load user object
  userObject.user.transactions.unshift(transaction);
  saveUserObject(userObject);
}

async function removeUserTransaction(transaction) {
  const userObject = await loadUserObject();

  // loop thru stored transactions and splice transaction from it
  let i = userObject.user.transactions.length - 1;

  for (i; i >= 0; i -= 1) {
    if (userObject.user.transactions[i].id === transaction.id) {
      userObject.user.transactions.splice(i, 1);
    }
  }
  saveUserObject(userObject);
}


const initialState = {
  currentDate: new Date(),
  currentAmount: 0.00,
  currentCategory: null,
  transactions: [],
  slideViewBounceValue: new Animated.Value(300),
  currentBalance: 0.00,
  currentSpent: 0.00,
  currentPayee: null,
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
  // const [isCurrentTransaction, setIsCurrentTransaction] = useState(initialState.isCurrentTransaction);
  const [isReady, setIsReady] = useState(initialState.isReady);

  async function retrieveStoredTransactions() {
    // setIsReady(false);
    try {
      const userObject = await loadUserObject();
      // set stored user's transactions
      await setTransactions(userObject.user.transactions);
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

  async function retrieveCognitoTransactions() {
    try {
      const items = await API.graphql(graphqlOperation(ListTransactions));
      console.log('items: ', items.data.listTransactions.items);
      // this.setState({ items: items.data.listBooks.items });
      setTransactions(items.data.listTransactions.items);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  const clearState = () => {
    setCurrentDate(initialState.currentDate);
    setCurrentAmount(initialState.currentAmount);
    setCurrentCategory(initialState.currentCategory);
    setCurrentTransaction(initialState.currentTransaction);
    setCurrentType(initialState.currentType);
    setSlideViewBounceValue(initialState.slideViewBounceValue); // (new Animated.Value(300));
    setIsSlideViewHidden(initialState.isSlideViewHidden);
    // setIsCurrentTransaction(initialState.isCurrentTransaction);

    retrieveStoredTransactions(); // load stored user
  };

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

    await storeUserTransaction(transaction);
    clearState();
  };
  const showSlideView = useCallback(
    () => {
      Animated.spring(
        slideViewBounceValue,
        {
          toValue: 0,
          velocity: 30,
          tension: 2,
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
          toValue: 300,
          velocity: 30,
          tension: 2,
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

  // current transaction updates
  useEffect(() => {
    // calculate balances
    const balance = (calculateBalance(transactions));
    setCurrentBalance(balance);

    // calculate spent
    const spent = (calculateMonthSpent(transactions));
    setCurrentSpent(spent);
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
    // toggle slideup view
    if (currentTransaction) {
      showSlideView();

      // setCurrentAmount(Math.abs(currentTransaction.amount * 100));
      // setCurrentCategory(currentTransaction.category);

      // categoryBtnPressed(currentTransaction.category);
      // console.log(currentCategory)
    }
    return () => {
      // effect
      hideSlideView();

      // setCurrentAmount(initialState.currentAmount);
      // setCurrentCategory(initialState.currentCategory);
    };
  }, [currentTransaction, hideSlideView, showSlideView]);

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
    clearState();
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
        // isCurrentTransaction={isCurrentTransaction}
      />

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
      />

      <AmountInputView
        isEditable={false}
        value={currentAmount}
        handleChange={handleChange}
      />

      <KeypadView handlePress={handlePress} />

      <SlideUpView
        slideViewBounceValue={slideViewBounceValue}
        transaction={currentTransaction}
      />

    </View>

  );

  const appLoading = (
    <AppLoading
      startAsync={clearState}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );

  if (!isReady) {
    return appLoading;
  } else {
    return view;
  }
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
