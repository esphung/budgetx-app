const findTransactionArrayDifferences = (values) => {
  const lookup = values.reduce((a, e) => {
    a[e.id] = ++a[e.id] || 0;
    return a;
  });
  let result = values.filter(e => lookup[e.id]);

  // var peaks = result

  // const lowestVersion = peaks.reduce((p, c) => p.version <= c.version ? p : c);

  return result // JSON.stringify(highestVersion, ['id', 'version'], 1)
  // return JSON.stringify(result, ['id', 'version'], 1)
};

// console.log('findTransactionArrayDifferences(data): ', findTransactionArrayDifferences(data));

export default findTransactionArrayDifferences;

