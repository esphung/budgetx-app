import { dates } from './dates';

import checkIfLeapYear from './checkIfLeapYear';

Date.prototype.addDays = (days) => {
  const date = new Date()
  date.setDate(date.getDate() + days);
  return date;
};

// var date = new Date();

// alert(date.addDays(5));

// console.log('new Date().addDays(30): ', new Date().addDays(30));

// // Returns if a value is really a number
// function isNumber (value) {
//   return typeof value === 'number' && isFinite(value);
// }

export default async function calculateMonthSpent(array) {
  // console.log('array: ', array);
  let balance = 0;
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
    // console.log('First Date:', firstDate);

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
      daysInMonth = 30;
    }

    const lastDate = firstDate.addDays(daysInMonth);


    // console.log('lastDate: ', lastDate);
    // try {
    //   const lastDate = await firstDate.addDays(daysInMonth);

      if (!lastDate) {
        balance = Number(0).toFixed(2);
        return balance;
      } else {

      array.forEach((element) => {
        // statements
        if (new Date(element.date).getMonth() === new Date(firstDate).getMonth() + 1) {
          // console.log(dates.compare(element.date, lastDate));
          // console.log('new Date(element.date).getMonth(), new Date(firstDate).getMonth() + 1: ', new Date(element.date).getMonth(), new Date(firstDate).getMonth() + 1);
          // if ((element.type) === 'EXPENSE') {
            // console.log(element.amount);
            // console.log('element.amount: ', Number(element.amount).toFixed(2));
            balance += Math.abs(element.amount);
          // }
        }
      });
        
      }
    //   // console.log('Last Date:', lastDate);

    //   array.forEach((element) => {
    //     // statements
    //     if (dates.compare(element.date, firstDate) >= 0) {
    //       // console.log(dates.compare(element.date, lastDate));
    //       if ((element.type) === 'EXPENSE') {
    //         // console.log(element.amount);
    //         // console.log('element.amount: ', Number(element.amount).toFixed(2));
    //         balance += Math.abs(element.amount);
    //       }
    //     }
    //   });
    // } catch (e) {
    //   // statements
    //   // console.log(e);
    //   console.log('Error calculating month\'s spent balance:', e);
    // }
  }
  // return balance.toFixed(2);
  return balance;
}
