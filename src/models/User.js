/*
FILENAME:  User.js
PURPOSE:   User
AUTHOR:    Eric Phung
CREATED:   12/01/2019 12:35 AM
UPDATED:
*/

import defaultCategories from '../data/categories';

// User function with multiple constructors
function User(email) {
  const currentDate = new Date();
  this.id = `${Date.now(currentDate)}`;
  this.username = '';
  this.phoneNumber = '';
  this.password = '';
  this.email = email;
  this.transactions = [];
  this.created = currentDate;
  this.given = ''; // first name
  this.surname = '';

  this.profileImage = global.avatar;

  this.categories = defaultCategories;

} // end user function def

// null prototype (no properties)
User.prototype = {
  id: Date.now(),
  username: null,
  password: null,
  // email: null,
  // transactions: [],
  created: new Date()
}; // end user prototype def

// create user from some properties
User.fromComponents = function(foo, bar) {
    var username = `${foo} ${bar}` ;
    return new User(username);
};

// create user from login
User.fromCognitoUser = function(cognito) {
  // const _id = `${Date.now()}`;
  // const message = `User created from attributes: ${_id}
  // username: ${username}
  // email: ${email}`;
  // console.log(message)

  // console.log(cognito.username);

  const user = new User(cognito.attributes.email);
  user.username = cognito.username;
  user.phoneNumber = cognito.attributes.phoneNumber;

  // console.log(user);
  return user;
}; // end create user from login creds definition


module.exports = User;



// // user function testing

// var empty = User.prototype;
// console.log(empty);

// var foo = new User('John');
// console.log(foo);
// console.log(foo.getFullName())

// var bar = User.fromLoginCredentials('Jane', 'qZ8/p"X8E]*c8aH9');
// console.log(bar);

// var comps = User.fromComponents('Eric', 'Phung');
// console.log(comps);









// User class version defintion ============================
// class User {
//  constructor(email, username, password, transactions) {
//    // properties
//     this._id = `${Date.now()}`;
//     this.email = (email) ? email : '';
//     this.username = (username) ? username : '';
//     this.password = (password) ? password : '';
//     this.transactions = (transactions) ? transactions : [];
//  }

//  // methods
// }

// // testing user class
// const empty = new User();
// console.log(empty);

// const user = new User('hello@gmail.com', '');
// console.log(user)




