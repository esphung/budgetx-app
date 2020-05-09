import { dates } from './dates';

import checkIfLeapYear from './checkIfLeapYear';

Date.prototype.addDays = (days) => {
  if (this) {
    const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
  }
  
};

export function calculateEachMonthTotalSpent(array, date) {
  let balance = 0.00;
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    if (array[i].type === 'EXPENSE') {
      let transactionMonth = new Date(array[i].date).getMonth()
      let dateMonth = new Date(date).getMonth()
      // console.log(transactionMonth, dateMonth);
      // console.log(dates.compare(array[i].date, lastDate));
      if (transactionMonth === dateMonth) {
        // console.log(array[i].amount);
        balance += array[i].amount;
      }
    }
  }
  return Math.abs(balance);
}

export function calculateEachMonthTotalEarned(array, date) {
  let balance = 0.00;
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    if (array[i].type === 'INCOME') {
      let transactionMonth = new Date(array[i].date).getMonth()
      let dateMonth = new Date(date).getMonth()
      // console.log(transactionMonth, dateMonth);
      // console.log(dates.compare(array[i].date, lastDate));
      if (transactionMonth === dateMonth) {
        // console.log(array[i].amount);
        balance += array[i].amount;
      }
    }
  }
  return Math.abs(balance);
}
