export default function calculateBalance(array) {
  let balance = 0.00;
  if (array) {
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      const { amount } = array[i];
      if (array[i].type === 'EXPENSE') {
        balance -= Math.abs(amount);
      } else {
        balance += Math.abs(amount);
      }
      // balance += amount;
      
    }
  }
  // return balance.toFixed(2);
  return balance;
}
