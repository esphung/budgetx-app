// FILENAME:  functions.js
// PURPOSE:   functions for budget x screens
// AUTHOR:    Eric Phung
// CREATED:   12/04/2019 05:33 PM
// UPDATED:   12/04/2019 05:33 PM

import { dates } from '../functions/dates';

import colors from 'main/colors';

export function isValidPhoneNumber(phoneNumber) {
  phoneNumber.replace('-', '');
  var phoneno = /^([+])?([0-9]{1,5})?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneNumber.match(phoneno)) {
    return true;
  } else {

    return false;
  }
}

export function getButtonStyle(bool) {
  // console.log(bool);
  if (bool) {
    return {
      alignItems: 'center',
      backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
      padding: 14,
      marginBottom: 20,
      borderRadius: 26, // 24,

      borderWidth: 1,
      borderColor: colors.white,
      borderStyle: 'solid',   
    }
  }
  else  {
    return {
      alignItems: 'center',
      backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
      padding: 14,
      marginBottom: 20,
      borderRadius: 26, // 24,
      opacity: 0.4,

      borderWidth: 1,
      borderColor: colors.white,
      borderStyle: 'solid',   
    }
  }
}

export const isValidUsername = (name) => {
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  if (name.match(usernameRegex)) {
    return true;
  } else {
    return false;
  }
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};

export function getCurrencySymbol(amount) {
  let symbol = '$';
  if (amount < 0) {
    symbol = `- $`;
  }
  return symbol;
}


Date.prototype.addDays = (days) => {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// function getDates(startDate, stopDate) {
//   var dateArray = new Array();
//   var currentDate = startDate;
//   while (currentDate <= stopDate) {
//       dateArray.push(new Date (currentDate));
//       currentDate = currentDate.addDays(1);
//   }
//   return dateArray;
// }

function leapYear(year) {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export function getShortDate(date) {
  // short human readable date
  let str = '';
  if (date) {
    const dateObj = new Date(date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1; // January is 0!
    const yyyy = dateObj.getFullYear();

    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
  }
  return str;
}

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
    if (leapYear(currentYear)) {
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
  return balance.toFixed(2);
};
