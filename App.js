/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
*/
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import StackNavigator from './navigation';

import './globals'; // global values

// ui colors
import colors from './colors';

import SpinnerMask from './src/components/SpinnerMask';

import User from './src/models/User';

import {
  loadUserObject,
  saveUserObject
} from './src/storage/UserStorage';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from './src/storage/TransactionsStorage';

// user function testing

// var empty = User.prototype;
// console.log(empty);

// var foo = new User('John');
// console.log(foo);
// console.log(foo.getFullName())

// var bar = User.fromLoginCredentials('Jane', 'qZ8/p"X8E]*c8aH9');
// console.log(bar);

// LOAD STORED USER HERE!!!

// const user = new User('esphung@gmail.com');
// console.log(user)
// const user = new User();

function App() {
  const [user, setUser] = useState(null);

  const [transactions, setTransactions] = useState(null);

  const retrieveUser = async () => {
    // load stored user
    try {
      const userObject = await loadUserObject();

      setUser(userObject.user);
      
    } catch (e) {
      // statements
      console.log(e);
    }
  }

  // const retrieveTransactions = async () => {
  //   // load stored transactions
  //   try {
  //     const transactionsObject = await loadTransactionsObject();
  //     // console.log(transactions);

  //     // set transactions
  //     setTransactions(transactionsObject.transactions);

  //   } catch (e) {
  //     // statements
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    retrieveUser();

    // retrieveTransactions(); // load transactions
    
    return () => {
      // effect
      console.log('User clean up')
    };
  }, []);

  // return component view
  if (user) {
    user.transactions = transactions //  temporary separate storage
    // console.log(user)
    return <StackNavigator screenProps={ user } />;
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

export default App;