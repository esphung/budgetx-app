// Transaction handling functions
export default incrementVersion = (transaction) => {
  transaction.version += 1;
  return transaction;
};
