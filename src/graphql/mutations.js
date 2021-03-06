/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createPayee = /* GraphQL */ `
  mutation CreatePayee(
    $input: CreatePayeeInput!
    $condition: ModelPayeeConditionInput
  ) {
    createPayee(input: $input, condition: $condition) {
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
export const updatePayee = /* GraphQL */ `
  mutation UpdatePayee(
    $input: UpdatePayeeInput!
    $condition: ModelPayeeConditionInput
  ) {
    updatePayee(input: $input, condition: $condition) {
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
export const deletePayee = /* GraphQL */ `
  mutation DeletePayee(
    $input: DeletePayeeInput!
    $condition: ModelPayeeConditionInput
  ) {
    deletePayee(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
