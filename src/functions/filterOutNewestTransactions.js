export default filterOutNewestTransactions = (local, online) => {
  let users = local.concat(online);
  let keys = ['id', 'version'];
  let list = [];
  for (var i in users) {
    var filter = {
      id: users[i].id,
    };
    var filteredById = users.filter((item) => {
     for (var key in filter) {
      if (item[key] === undefined || item[key] !== filter[key])
        return false
     }
      return true;
    });

    // testing
    // find all with same id
    // if (filteredById) {
      // find highest version of same id

      // console.log(filteredById);
      // return item with highest value version
      let highestVersion = Math.max.apply(Math, 
        filteredById.map((o) => {
          return o.version
        }))

      let result = filteredById.filter(obj => {
        return obj.version === highestVersion
      })
    // console.log(result);
    list.push(result[0])
    // }
    
  } // end for loop
  // return list;

  let arr = list;

   const unique = arr
       .map((e) => {
         if (!e) {
          return
         }
         return e['id']
       })
  // store the keys of
  // the unique objects
  .map((e, i, final) => 
       {
  return final.indexOf(e) === i && i})
  
  // eliminate the dead keys
  // & store unique objects
  .filter(e => {
    return arr[e]
  })
  .map(e => arr[e]);

  return unique;
};
