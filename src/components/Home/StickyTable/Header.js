export default function Header(date) {
  const timeStamp = `${Date.now()}`;
  this.id = timeStamp;
  this.header = true;
  this.date = date;

  // console.log('Created new header')
  // console.log(this)

  this.shortDate = () => {
    // short human readable date
    let str = '';
    if (this.date) {
      const dateObj = new Date(this.date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yyyy = dateObj.getFullYear();

      // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
      str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
    }
    return str;
  };

  this.getTitle = () => {
    const str = `${this.getShortDate()}`;
    // ${this.payee} ${this.category}`;
    return str;
  };
}// end header definition