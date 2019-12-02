/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
*/
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import StackNavigator from './navigation';

import './globals'; // global values

import colors from './colors'; // ui colors

import SpinnerMask from './src/components/SpinnerMask';

// import User from './src/models/User';

import {
  loadUserObject,
  // saveUserObject
} from './src/storage/UserStorage';

// import {
//   loadTransactionsObject,
//   saveTransactionsObject
// } from './src/storage/TransactionsStorage';

function App() {
  const [user, setUser] = useState(null);

  const [isStoredUserLoaded, setIsStoredUserLoaded] = useState(false);

  const retrieveStoredUser = async () => {
    // load stored user
    try {
      const userObject = await loadUserObject();

      // set user with stored user object
      setUser(userObject.user);

      // console.log('User transactions:', user.transactions.length)

      setIsStoredUserLoaded(true);
    } catch (e) {
      // statements
      // console.log('Could not retrieve stored user.');
    }
  };

  // const retrieveStoredTransactions = async () => {
  //   // load stored transactions
  //   try {
  //     const transactionsObject = await loadTransactionsObject();
  //     const userObject = await loadUserObject();

  //     userObject.user.transactions = transactionsObject.transactions
  //     saveUserObject(userObject);
  //     console.log(userObject);

  //     setIsStoredUserLoaded(true);
  //   } catch (e) {
  //     // statements
  //     console.log('Could not retrieve stored transactions.');
  //   }
  // };

  // component did mount
  useEffect(() => {
    retrieveStoredUser();// load stored user
    // retrieveStoredTransactions(); // loaded transactions
  }, []);

  // return component view
  let view = (
    <View style={styles.container}>
      <SpinnerMask />
    </View>
  );
  if (isStoredUserLoaded) {
    // console.log(user)
    view = (<StackNavigator screenProps={user} />);
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
