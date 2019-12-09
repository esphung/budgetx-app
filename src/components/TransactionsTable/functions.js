/*
FILENAME:  functions.js
PURPOSE:   transaction table functions
AUTHOR:    Eric Phung
CREATED:   12/09/2019 11:58 AM
UPDATED:   
*/

export function getShortDate(item) {
  let str = '';
  if (item) {
    const dateObj = new Date(item.date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1; // January is 0!
    const yyyy = dateObj.getFullYear();

    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
  }
  return str;
}
