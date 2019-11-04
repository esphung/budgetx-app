/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/

// default categories
import categories from './categories'

import Router from './Router'

// test data
data = {
  user: {
    email: '',//'esphung@gmail.com',//null,
    name: '',//'eric phung',//null
  },
  date:                 new Date(),
  transactions:         null,
  currentBalanceValue:  0,
  currentSpentValue:    0,
  categories:           categories
}

export default Router
