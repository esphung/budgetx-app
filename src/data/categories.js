// FILENAME:  categories.js
// PURPOSE:   default categories
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:07 PM

import Category from 'main/src/models/Category';

const categories = [
  // {
  //   id: 0,
  //   name: 'Income',
  //   color: '#00e157',
  //   type: 'income',
  // },
  new Category('Income', '#00e157', 'income'),
  // {
  //   id: 1,
  //   name: 'Home',
  //   color: '#ff6300',
  //   type: 'expense',
  // },
  new Category('Home', '#ff6300', 'expense'),
  // {
  //   id: 2,
  //   name: 'Transport & Travel',
  //   color: '#e05ceb',
  //   type: 'expense',
  // },
  new Category('Transport & Travel', '#e05ceb', 'expense'),
  // {
  //   id: 3,
  //   name: 'Bills',
  //   color: '#008aff',
  //   type: 'expense',
  // },
  new Category('Bills', '#008aff', 'expense'),
  // {
  //   id: 4,
  //   name: 'Food',
  //   color: '#ff9200',
  //   type: 'expense',
  // },
  new Category('Food', '#ff9200', 'expense'),
  // {
  //   id: 5,
  //   name: 'Health',
  //   color: '#f26363',
  //   type: 'expense',
  // },
  new Category('Health', '#f26363', 'expense'),
  // {
  //   id: 6,
  //   name: 'Entertainment',
  //   color: '#8400ff',
  //   type: 'expense',
  // },
  new Category('Entertainment', '#8400ff', 'expense'),
  // {
  //   id: 7,
  //   name: 'Other Income',
  //   color: '#94e100',
  //   type: 'income',
  // },
  new Category('Other Income', '#94e100', 'income')
];


export default categories;
