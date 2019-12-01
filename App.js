/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
*/
import React from 'react';

import StackNavigator from './navigation';

import './globals'; // global values

import User from './src/models/User';

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
const user = new User();

function App() {
  return (
    <StackNavigator screenProps={ user } />
  );
}

export default App;