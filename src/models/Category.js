/*
FILENAME:  Category.js
PURPOSE:   Category model for budget x app
AUTHOR:    Eric Phung
CREATED:   12/11/2019 10:09 PM
UPDATED:   12/11/2019 10:09 PM
*/

import colors from 'main/colors';

function checkColor(color) {
  return color !== 'dark' && color !== 'darkTwo'  && color !== 'darkGreyBlue'
  
}

const randomProperty = (obj) => {
  const keys = Object.keys(obj);

  // console.log(keys.filter(checkColor))

  return obj[keys.filter(checkColor)[Math.floor(Math.random() * keys.length)]];
};

function Category(name, color) {
  this.id = Date.now();
  this.created = new Date();
  this.name = name;
  this.color = color; // randomProperty(colors);
}

// var category = new Category('Insurance', '#fff');
// console.log(category);

export default Category;
