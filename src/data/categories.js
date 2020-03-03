// FILENAME:  categories.js
// PURPOSE:   default categories
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:07 PM

import Category from '../../src/models/Category';

const categories = [
  // {
  //   id: 0,
  //   name: 'Income',
  //   color: '#00e157',
  //   type: 'INCOME',
  // },
  new Category('Income', '#00e157', 'INCOME'),
  // {
  //   id: 1,
  //   name: 'Home',
  //   color: '#ff6300',
  //   type: 'EXPENSE',
  // },
  new Category('Home', '#ff6300', 'EXPENSE'),
  // {
  //   id: 2,
  //   name: 'Transport & Travel',
  //   color: '#e05ceb',
  //   type: 'EXPENSE',
  // },
  new Category('Transport & Travel', '#e05ceb', 'EXPENSE'),
  // {
  //   id: 3,
  //   name: 'Bills',
  //   color: '#008aff',
  //   type: 'EXPENSE',
  // },
  new Category('Bills', '#008aff', 'EXPENSE'),
  // {
  //   id: 4,
  //   name: 'Food',
  //   color: '#ff9200',
  //   type: 'EXPENSE',
  // },
  new Category('Food', '#ff9200', 'EXPENSE'),
  // {
  //   id: 5,
  //   name: 'Health',
  //   color: '#f26363',
  //   type: 'EXPENSE',
  // },
  new Category('Health', '#f26363', 'EXPENSE'),
  // {
  //   id: 6,
  //   name: 'Entertainment',
  //   color: '#8400ff',
  //   type: 'EXPENSE',
  // },
  new Category('Entertainment', '#8400ff', 'EXPENSE'),
  // {
  //   id: 7,
  //   name: 'Other Income',
  //   color: '#94e100',
  //   type: 'INCOME',
  // },
  new Category('Other Income', '#94e100', 'INCOME')
];


export default categories;
