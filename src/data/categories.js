// FILENAME:  categories.js
// PURPOSE:   default categories
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:07 PM

import Category from 'models/Category';

import uuidv4 from 'functions/uuidv4';

const categories = () => {
  return [
  new Category({
    id: uuidv4(),
    name: 'Income',
    color: '#00e157',
    type: 'INCOME',
    owner: global.storageKey,
    version: 0,
  }),
  new Category({
    id: uuidv4(),
    name: 'Home', color: '#ff6300', type: 'EXPENSE', owner: global.storageKey, version: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Transport & Travel', color: '#e05ceb', type: 'EXPENSE', owner: global.storageKey, version: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Bills', color: '#008aff', type: 'EXPENSE', owner: global.storageKey, version: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Food', color: '#ff9200', type: 'EXPENSE', owner: global.storageKey, version: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Health', color: '#f26363', type: 'EXPENSE', owner: global.storageKey, version: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Entertainment', color: '#8400ff', type: 'EXPENSE', owner: global.storageKey, verson: 0, }),
  new Category({
    id: uuidv4(),
    name: 'Other Income', color: '#94e100', type: 'INCOME', owner: global.storageKey, version: 0, }),
  ];
}


export default categories;
