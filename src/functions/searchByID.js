
// find previous obj if exists
export default function searchByID(key, myArray) {
  // console.log(nameKey);
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    // console.log(myArray[i].id, nameKey);
    if (myArray[i].id === key) {
      obj = myArray[i];
    }
  }
  return obj;
}
