/*
FILENAME:  Category.js
PURPOSE:   Category model for budget x app
AUTHOR:    Eric Phung
CREATED:   12/11/2019 10:09 PM
UPDATED:   12/11/2019 10:09 PM
*/

import colors from 'main/colors';

function Category(name, color, type) {
  const currentDate = new Date();
  this.id = `${Date.now(currentDate)}`;
  this.created = currentDate;
  this.name = (name) ? name : '';
  this.color = color ? color : colors.white; // randomProperty(colors);
  this.type = (name.toLowerCase() === 'income') ? 'income' : 'expense';
}

// // create user from some properties
// Category.fromColor = function(color) {
//   const category = new Category('New Category');
//   category.color = color;
//   return category;
// };

// function checkColor(color) {
//   return color !== 'dark' && color !== 'darkTwo'  && color !== 'darkGreyBlue'

// }

// const randomProperty = (obj) => {
//   const keys = Object.keys(obj);

//   // console.log(keys.filter(checkColor))

//   return obj[keys.filter(checkColor)[Math.floor(Math.random() * keys.length)]];
// };


// var category = new Category('Insurance', '#fff');
// console.log(category);

export default Category;
