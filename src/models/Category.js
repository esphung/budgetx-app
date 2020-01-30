/*
FILENAME:   Category.js
PURPOSE:    Category model for budget x app
AUTHOR:     Eric Phung
CREATED:    12/11/2019 10:09 PM
UPDATED:    12/11/2019 10:09 PM
            01/29/2020 06:41 PM
*/

// var ID = function () {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return Math.random().toString(36).substr(2, 9);
// };

import { ID } from 'main/src/functions/ID';

// import colors from 'main/colors';

export const Category = (name, color, type) => {
  // const currentDate = new Date();
  const obj = {
    // id: `${Date.now(currentDate)}`,
    id: ID(),
    name,
    color,
    type
  };
  return obj;
}; // end Color definition

module.exports = Category;

// class Category(name, color, type) {
//   const currentDate = new Date();
//   this.id = `${Date.now(currentDate)}`;
//   this.created = currentDate;
//   this.name = (name) ? name : '';
//   this.color = color ? color : colors.white; // randomProperty(colors);
//   this.type = (name) ? name : 'expense';
// }

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

// export default Category;
