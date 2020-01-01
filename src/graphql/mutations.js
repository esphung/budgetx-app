/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTransaction = `mutation CreateTransaction(
  $input: CreateTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = `mutation UpdateTransaction(
  $input: UpdateTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = `mutation DeleteTransaction(
  $input: DeleteTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  deleteTransaction(input: $input, condition: $condition) {
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
export const createPayee = `mutation CreatePayee(
  $input: CreatePayeeInput!
  $condition: ModelPayeeConditionInput
) {
  createPayee(input: $input, condition: $condition) {
    id
    name
  }
}
`;
export const updatePayee = `mutation UpdatePayee(
  $input: UpdatePayeeInput!
  $condition: ModelPayeeConditionInput
) {
  updatePayee(input: $input, condition: $condition) {
    id
    name
  }
}
`;
export const deletePayee = `mutation DeletePayee(
  $input: DeletePayeeInput!
  $condition: ModelPayeeConditionInput
) {
  deletePayee(input: $input, condition: $condition) {
    id
    name
  }
}
`;
export const createCategory = `mutation CreateCategory(
  $input: CreateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  createCategory(input: $input, condition: $condition) {
    id
    name
    color
    type
  }
}
`;
export const updateCategory = `mutation UpdateCategory(
  $input: UpdateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  updateCategory(input: $input, condition: $condition) {
    id
    name
    color
    type
  }
}
`;
export const deleteCategory = `mutation DeleteCategory(
  $input: DeleteCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  deleteCategory(input: $input, condition: $condition) {
    id
    name
    color
    type
  }
}
`;
