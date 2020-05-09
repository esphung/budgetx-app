import { dates } from './dates';

import checkIfLeapYear from './checkIfLeapYear';

Date.prototype.addDays = (days) => {
  if (this) {
    const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
  }
  
};

export default function calculateMonthSpent(array) {
  let balance = 0.00;
  if (array) {
    //  get last 30 days
    const currentDate = new Date(); // TESTING: new Date(2018, 11, 24); // new Date();
    // console.log(currentDate);

    const currentMonth = currentDate.getMonth(); // month - 1, january is 0
    // console.log(currentMonth);

    currentDate.setDate(0); // .addDays(30))
    // console.log(date);

    // first date of current month
    const firstDate = currentDate;
    // console.log('First Date:',firstDate);

    // feb 28 days

    // months with 31
    const months31days = [0, 2, 4, 6, 7, 9, 11];

    // // months with 30
    const months30days = [3, 5, 8, 10];

    const currentYear = currentDate.getFullYear();

    let daysInMonth = 28;
    if (checkIfLeapYear(currentYear)) {
      daysInMonth = 29;
    }

    // set days in month (if not feb or leap year)
    if (months31days.includes(currentMonth)) {
      daysInMonth = 31;
    } else if (months30days.includes(currentMonth)) {
      daysInMonth = 29;
    }

    const lastDate = firstDate.addDays(daysInMonth);
    // console.log('Last Date:',lastDate);

    // console.log('First Date:',firstDate);
    // console.log('Last Date:',lastDate);

    // const currentMonthDates = getDates(firstDate, lastDate);
    // console.log(currentMonthDates);

    // calculate expense for current month (days)
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (dates.compare(array[i].date, firstDate) >= 0) {
        // console.log(dates.compare(array[i].date, lastDate));
        if (array[i].amount <= 0.00) {
          // console.log(array[i].amount);
          balance += array[i].amount;
        }
      }
    }
  }
  // return balance.toFixed(2);
  return balance;
}
