/*
FILENAME:  getFakeTransactions.js
PURPOSE:   getFakeTransactions
AUTHOR:    Eric Phung
CREATED:   05/30/2020 03:15 PM
UPDATED:
*/
/* generate fake transaction items for testing */

import Transaction from '../models/Transaction';
// function Transaction(id, date, amount, owner, payee, category, type, note, version)

import { randomName } from './generateRandomName';

import uuidv4 from './uuidv4';

import { randomDate } from './randomDate';

import { randomAmount } from './randomAmount';

import Category from '../models/Category';
// function Category(id, name, color, type, owner, version)

import colors from '../../colors';
let colorsArray = Object.values(colors);
// console.log('colorsArray: ', colorsArray);

// console.log('Math.random(0,10).toFixed(0): ', Math.random(0,10).toFixed(0))

/*
FILENAME:   getFakeTransactions.js
PURPOSE:    UI transaction table testing for Financely
AUTHOR:     Eric Phung
CREATED:    06/03/2020 08:47 PM
*/

import { crayola, getCrayolaColors } from '../data/crayola';
// console.log('Object.values(getCrayolaColors()): ', Object.values(getCrayolaColors()));
const crayolaColorsArray = Object.values(getCrayolaColors());

colorsArray = colorsArray = crayolaColorsArray;

export function getFakeTransactions(limit) {
  let transactions = [];

  for (var i = limit - 1; i >= 0; i--) {
    // console.log('i: ', i);
    // console.log('uuidv4(): ', uuidv4());

    let amount = Number(randomAmount());

    let date = randomDate(new Date(2020, 4, 5), new Date(2020, new Date().getMonth(), 30));

    let color = colorsArray[(Math.random(0, colorsArray.length) * 10).toFixed(0)]

    // console.log('color: ', color);
    // console.log('(Math.random(0, colorsArray.length) * 10).toFixed(0): ', (Math.random(0, colorsArray.length) * 10).toFixed(0));

    let owner = global.storageKey;

    let note = (randomName() + ' ' + randomName()).toLowerCase()

    let category  = new Category(
      uuidv4(), // id
      randomName() + ' ' +  randomName(), // name
      color, // '#FFFFFFF', // colors.dark, // color
      ((amount >= 0) ? 'INCOME' : 'EXPENSE'),
      owner, // owner
      Number((Math.random(0, 100) * 100).toFixed(0)),
    );

    let transaction = new Transaction(
      uuidv4(), // id
      date, // date
      amount, // amount
      owner, // current owner
      {}, // payee
      category, // category
      category.type,
      note,
      Number((Math.random(0, 100) * 100).toFixed(0)), // version

    );
    transactions.push(transaction);
  }
  return transactions;
}

// testing

// getFakeTransactions(4).forEach((item,  index) => {
//   console.log('item', index, ':', Object.values(item));
// }, console.log('Creating fake transactions ...'))

// getFakeTransactions(4).forEach((item,  index) => {
//   console.log('item', index, ':', (item));
// }, console.log('Creating fake transactions ...'))

// console.log('fake transactions => getFakeTransactions(4): ', getFakeTransactions(4));





