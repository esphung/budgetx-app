/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTransaction = `mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id
    date
    amount
    payee
    category
    type
    note
    created
  }
}
`;
export const updateTransaction = `mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    id
    date
    amount
    payee
    category
    type
    note
    created
  }
}
`;
export const deleteTransaction = `mutation DeleteTransaction($input: DeleteTransactionInput!) {
  deleteTransaction(input: $input) {
    id
    date
    amount
    payee
    category
    type
    note
    created
  }
}
`;
