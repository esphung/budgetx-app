const filterTransactionsByCategory = (arr, category) => {
  const b = arr.filter((item) => item.category.name === category.name);
  return b;
};

export default filterTransactionsByCategory;
