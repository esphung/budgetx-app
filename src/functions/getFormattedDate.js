export function getFormattedDate(date) 
{
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    var day  = dayNames[date.getDay()];
    var dd   = date.getDate();
    var mm   = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minutes<10){ minutes='0'+minutes }

    //return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    return day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10)
}
