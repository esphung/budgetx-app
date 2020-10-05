const filterCategories = (local, online) => {
  const items = local.concat(online);
  const list = [];

  items.map((i) => {
    const filter = {
      id: i.id,
      name: i.name,
      type: i.type,
    };
    const filteredById = items.filter((item) => {
      let key;
      for (key in filter) {
        if ((item.name !== filter.name) || (item.type !== filter.type)) return false;
      }
      return true;
    });
    const highestVersion = Math.max(...filteredById.map((o) => o.version));
    const result = filteredById.filter((obj) => obj.version === highestVersion);
    list.push(result[0]);
    return list;
  });
  const arr = list;

  const unique = arr.map((e) => e.id).map((e, j, final) => final.indexOf(e) === j && j)
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
};

export default filterCategories;
