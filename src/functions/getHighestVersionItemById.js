const getHighestVersionItemById = ({ arr, filter, }) => {
  // find all items of same id
  let same_ids = arr.filter((key) => ((key["id"]) !== undefined) && (key["id"]) === (filter["id"]));
  // return the one with the highest version
  let highest_version = same_ids.filter((key) => ((key["id"]) && (key["version"] > filter.version)));

  return highest_version.length > 0 ? highest_version : filter;
// });
};

// const result = filterNewestOfEachId({
//   arr: test_data,
//   filter: userFilter,
// })

// console.log(`\x1b[36m result: ${JSON.stringify(result, null, 1)}\x1B[36m`);
// console.log('\x1b[36m Hello \x1b[34m Colored \x1b[35m World!');



export default getHighestVersionItemById;



