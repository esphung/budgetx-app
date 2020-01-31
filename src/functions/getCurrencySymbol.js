export default function getCurrencySymbol(amount) {
  let symbol = '$';
  if (amount < 0) {
    symbol = '- $';
  }
  return symbol;
}

