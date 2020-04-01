/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      date
      amount
      owner
      payee {
        id
        name
        owner
        version
        transaction {
          id
          date
          amount
          owner
          type
          note
          version
        }
      }
      category {
        id
        name
        color
        type
        owner
        version
        transactions {
          nextToken
        }
      }
      type
      note
      version
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        amount
        owner
        payee {
          id
          name
          owner
          version
        }
        category {
          id
          name
          color
          type
          owner
          version
        }
        type
        note
        version
      }
      nextToken
    }
  }
`;
export const getPayee = /* GraphQL */ `
  query GetPayee($id: ID!) {
    getPayee(id: $id) {
      id
      name
      owner
      version
      transaction {
        id
        date
        amount
        owner
        payee {
          id
          name
          owner
          version
        }
        category {
          id
          name
          color
          type
          owner
          version
        }
        type
        note
        version
      }
    }
  }
`;
export const listPayees = /* GraphQL */ `
  query ListPayees(
    $filter: ModelPayeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        version
        transaction {
          id
          date
          amount
          owner
          type
          note
          version
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      color
      type
      owner
      version
      transactions {
        items {
          id
          date
          amount
          owner
          type
          note
          version
        }
        nextToken
      }
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
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
        owner
        version
        transactions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
