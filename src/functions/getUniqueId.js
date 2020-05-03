const getUniqueId = (arr) => {
  const unique = arr.map(e => {
    // return (String(e['id']).toLowerCase()).trim()
    return e['id'];
  })
  // store the keys of
  // the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the dead keys
  // & store unique objects
  .filter(e => arr[e])
  .map(e => arr[e]);

  return unique;
};

export default getUniqueId;
