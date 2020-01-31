export default function calculateBalance(array) {
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
  // return balance.toFixed(2);
  return balance;
}
