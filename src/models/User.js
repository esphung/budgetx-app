/*
FILENAME:  User.js
PURPOSE:   User
AUTHOR:    Eric Phung
CREATED:   12/01/2019 12:35 AM
UPDATED:
*/

// type User @model {
//   id: ID!
//   name: String!
//   avatar: String
//   # friends: [User] @connection(name: "friends")
// }

// var ID = function () {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return Math.random().toString(36).substr(2, 9);
// };

// import defaultCategories from '../data/categories';

import uuidv4 from '../functions/uuidv4';

// User function with multiple constructors
export default function User(id) {
  // const currentDate = new Date();
  // this.id = `${Date.now(currentDate)}`;
  return {
    // id: `${Date.now(currentDate)}`,
    id: id,
    username: '', // username, // User's Storage Key
    email: '', // '' // email;
    full_name: '',
    image_url: 'https://profilepicturesbucketbudgetxbudgetxenv-budgetxenv.s3.amazonaws.com/public/avatar.png', // 'https://reactnative.dev/img/tiny_logo.png',
  }
  // this.phoneNumber = '';
  // this.password = '';
  
  // this.transactions = [];

  // this.created = currentDate;
  // this.given = ''; // first name
  // this.surname = '';

  // this.profileImage = global.avatar;

  // this.categories = defaultCategories;

} // end user function def

// // null prototype (no properties)
// User.prototype = {
//   id: Date.now(),
//   username: null,
//   password: null,
//   email: null,
//   // transactions: [],
//   // created: new Date(),
// }; // end user prototype def

// create user from some properties
User.fromFacebook = function(id, name) {
    // var user = `${foo} ${bar}` ;
    let user = new User(id);
    user.name = name
    return user
};

// // create user from login
// User.fromCognitoUser = function(cognito) {
//   // const _id = `${Date.now()}`;
//   // const message = `User created from attributes: ${_id}
//   // username: ${username}
//   // email: ${email}`;
//   // console.log(message)

//   // console.log(cognito.username);

//   const user = new User(cognito.attributes.email);
//   user.username = cognito.username;
//   user.phoneNumber = cognito.attributes.phoneNumber;

//   // console.log(user);
//   return user;
// }; // end create user from login creds definition


// module.exports = User;



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




