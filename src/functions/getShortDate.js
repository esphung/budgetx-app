export default function getShortDate(date) {
  const dateObj = new Date(date);
  // const dayNames =
  // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // const monthNames =
  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'];
  // const day  = dayNames[dateObj.getDay()];
  const dd = dateObj.getDate();
  const mm = dateObj.getMonth() + 1; // January is 0!
  // var yyyy = dateObj.getFullYear();
  // var hours = dateObj.getHours();
  // var minutes = dateObj.getMinutes();

  // if(dd<10)  { dd='0'+dd }
  // if(mm<10)  { mm='0'+mm }
  // if(minutes<10){ minutes='0'+minutes }

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  return `${mm}/${parseInt(dd, 10)}`;
}
