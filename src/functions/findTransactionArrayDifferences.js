const findTransactionArrayDifferences = (otherArray) => {
  const arr = (current) => otherArray.filter((other) => other.id === current.id).length === 0;
  return arr;
};

export default findTransactionArrayDifferences;
