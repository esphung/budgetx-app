// FILENAME:  functions.js
// PURPOSE:   functions for budget x screens
// AUTHOR:    Eric Phung
// CREATED:   12/04/2019 05:33 PM
// UPDATED:   12/04/2019 05:33 PM

import { dates } from '../functions/dates';

export const calculateBalance = (array) => {
  let balance = 0.00;
  if (array) {
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].amount) {
        // console.log(array[i].amount);
        balance += array[i].amount;
      }
    }
  }
  return balance.toFixed(2);
};

export const calculateMonthSpent = (array) => {
  let balance = 0.00;
  if (array) {
    //  get date 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);

    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (dates.compare(array[i].date, date) > 0) {
        if (array[i].amount <= 0.00) {
          // console.log(array[i].amount);
          balance += array[i].amount;
        }
      }
    }
  }
  return balance.toFixed(2);
};
