import getShortDate from './getShortDate';

export default function getFormattedDateString(date) {
  const transactionDate = new Date(date);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];

  let day = dayNames[transactionDate.getDay()];
  let dd = transactionDate.getDate();
  let mm = transactionDate.getMonth() + 1; // January is 0!
  const yyyy = transactionDate.getFullYear();
  // const hours = transactionDate.getHours();
  let minutes = transactionDate.getMinutes();

  if (dd < 10) { dd = `0${dd}`; }
  if (mm < 10) { mm = `0${mm}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }

  // set "today" word in transaction date label
  const todaysDate = new Date();

  // console.log(getShortDate(transactionDate));
  // console.log(getShortDate(todaysDate));
  // console.log('transactionDate.getDate(): ', transactionDate.getDate());
  // console.log('todaysDate.getDate() - 1: ', todaysDate.getDate() - 1);
  if (getShortDate(transactionDate) === getShortDate(todaysDate) && transactionDate.getMonth()=== todaysDate.getMonth() && transactionDate.getFullYear() === todaysDate.getFullYear()) {
    day = 'Today';
  } else if (transactionDate.getDate() === (todaysDate.getDate() - 1) && transactionDate.getMonth()=== todaysDate.getMonth() && transactionDate.getFullYear() === todaysDate.getFullYear()) {
    day = 'Yesterday';
  }

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  let string = `${day}, ${monthNames[mm - 1]} ${parseInt(dd, 10)}`;

  // if different year, show the year
  if (todaysDate.getFullYear() !== yyyy) {
    string = `${day}, ${monthNames[mm - 1]} ${parseInt(dd, 10)}, ${yyyy}`;
  }
  return string;
}
