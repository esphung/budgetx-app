/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
*/

// import React, { useState, useEffect } from 'react';
import React from 'react';

// import {
//   View,
//   // Text,
// } from 'react-native';

import StackNavigator from './navigation';

import './globals'; // global values

// import colors from './colors';

import {
  loadUserObject,
  saveUserObject,
} from './src/storage/UserStorage';

// import Login from './src/screens/Login';

// import SpinnerMask from './src/components/SpinnerMask';

// global app storage functions
global.getIsStoredUserLoggedIn = async () => {
  // return whether user is currently logged in
  let bool = false;
  // load stored user
  try {
    const userObject = await loadUserObject();
    bool = userObject.user.isLoggedIn;
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
  return bool;
};

global.setIsStoredUserLoggedIn = async (bool) => {
  // load stored user
  try {
    const userObject = await loadUserObject();
    userObject.user.isLoggedIn = bool;
    saveUserObject(userObject);
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
};

function App() {
  // // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [doesStoredUserExist, setDoesStoredUserExist] = useState(false);

  // const [user, setUser] = useState(null);

  // async function retrieveStoredUser() {
  //   // load stored user
  //   try {
  //     const userObject = await loadUserObject();

  //     // // // TESTING: set user as logged in
  //     // userObject.user.isLoggedIn = false;
  //     // console.log('user logged in:', userObject.user.isLoggedIn);

  //     // // TESTING: save stored user as logged in
  //     // saveUserObject(userObject);

  //     // set bool to let user in
  //     // setIsLoggedIn(userObject.user.isLoggedIn);
  //     setUser(userObject.user);
  //   } catch (e) {
  //     // statements
  //     // console.log('Could not load stored user');
  //   }
  // }

  // useEffect(() => {
  //   retrieveStoredUser();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user);
  //     setDoesStoredUserExist(true);
  //   }
  // }, [user]);

  // // return component view
  // let view = (
  //   <View
  //     style={
  //       {
  //         flex: 1,
  //         alignItems: 'center',
  //         justifyContent: 'center',

  //         backgroundColor: colors.darkTwo,
  //       }
  //     }
  //   >
  //     <SpinnerMask />
  //   </View>
  // );

  // if (doesStoredUserExist) {
  const view = (
    <StackNavigator />
  );
  // }
  return view;
}

export default App;
