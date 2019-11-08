export default function sortArrayDesc(array, key) {
  return array.sort(function (a,b) {
    console.info(b.date)
    return b.date < a.date ? -1
         : b.date > a.date ? 1
         : 0
  })
}