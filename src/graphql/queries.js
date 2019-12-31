/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransaction = `query GetTransaction($id: String!) {
  getTransaction(id: $id) {
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
export const listTransactions = `query ListTransactions(
  $filter: TableTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      amount
      payee
      category
      type
      note
      created
    }
    nextToken
  }
}
`;


