export function sortItemsByDate(items) {
  let sorted = items.sort((a, b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1);
  // console.log('Items sorted');
  return sorted;
}
