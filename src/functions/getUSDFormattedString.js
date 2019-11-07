export default function getUSDFormattedString(integer) {
  const valueDisplay = ((integer / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
  .replace('$','');

  return valueDisplay
}
