export default function getMinusSymbol(item) {
  let symbol = '$ ';
  if (item.type === 'expense') {
    symbol = '- $ ';
  }
  return symbol;
}