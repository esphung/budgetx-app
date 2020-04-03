// find previous obj if exists
export default function searchByName(nameKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    console.log(myArray[i].name, nameKey);
    if (myArray[i].name === nameKey) {
      obj = myArray[i];
    }
  }
  return obj;
}

// console.log('searchByName("eric"): ', searchByName('eric', [{name:'bob'}, {name:'james'}, {name:'eric'}]));
