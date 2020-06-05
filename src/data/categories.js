// FILENAME:  categories.js
// PURPOSE:   default categories
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:07 PM

import Category from '../../src/models/Category';

import uuidv4 from '../functions/uuidv4';



const categories = () => {
  return [
  // {
  //   id: 0,
  //   name: 'Income',
  //   color: '#00e157',
  //   type: 'INCOME',
  // },
  new Category(uuidv4(), 'Income', '#00e157', 'INCOME', global.storageKey, 0),
  // {
  //   id: 1,
  //   name: 'Home',
  //   color: '#ff6300',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Home', '#ff6300', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 2,
  //   name: 'Transport & Travel',
  //   color: '#e05ceb',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Transport & Travel', '#e05ceb', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 3,
  //   name: 'Bills',
  //   color: '#008aff',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Bills', '#008aff', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 4,
  //   name: 'Food',
  //   color: '#ff9200',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Food', '#ff9200', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 5,
  //   name: 'Health',
  //   color: '#f26363',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Health', '#f26363', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 6,
  //   name: 'Entertainment',
  //   color: '#8400ff',
  //   type: 'EXPENSE',
  // },
  new Category(uuidv4(), 'Entertainment', '#8400ff', 'EXPENSE', global.storageKey, 0),
  // {
  //   id: 7,
  //   name: 'Other Income',
  //   color: '#94e100',
  //   type: 'INCOME',
  // },
  new Category(uuidv4(), 'Other Income', '#94e100', 'INCOME', global.storageKey, 0)
];
}


export default categories;
