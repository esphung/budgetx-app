export default function sortArrayDesc(array, key) {
  return array.sort(function (a,b) {
    // console.info(b.id)
    return b.id > a.id ? -1
         : b.id < a.id ? 1
         : 0
  })
}