import { dates } from './dates';


export function calculateBalance(array) {
  let balance = 0.00;
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    balance += array[i].amount;
  }
  return Number(balance.toFixed(2));
}

export function calculateSpent(array) {
  //  get date 30 days ago
  const date = new Date();
  date.setDate(date.getDate() - 30);

  let balance = 0.00;
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    if (dates.compare(array[i].date, date) > 0) {
      if (array[i].type === 'expense') {
        balance += array[i].amount;
      }
    }
  }
  return Number(balance.toFixed(2));
}