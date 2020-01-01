/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransaction = `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    id
    date
    amount
    payee {
      id
      name
    }
    category {
      id
      name
      color
      type
    }
    type
    note
  }
}
`;
export const listTransactions = `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      amount
      payee {
        id
        name
      }
      category {
        id
        name
        color
        type
      }
      type
      note
    }
    nextToken
  }
}
`;
export const getPayee = `query GetPayee($id: ID!) {
  getPayee(id: $id) {
    id
    name
  }
}
`;
export const listPayees = `query ListPayees(
  $filter: ModelPayeeFilterInput
  $limit: Int
  $nextToken: String
) {
  listPayees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    color
    type
  }
}
`;
export const listCategorys = `query ListCategorys(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      color
      type
    }
    nextToken
  }
}
`;
