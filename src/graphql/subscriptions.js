/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransaction = `subscription OnCreateTransaction(
  $id: String
  $date: AWSDate
  $amount: String
  $payee: AWSJSON
  $category: AWSJSON
) {
  onCreateTransaction(
    id: $id
    date: $date
    amount: $amount
    payee: $payee
    category: $category
  ) {
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
export const onUpdateTransaction = `subscription OnUpdateTransaction(
  $id: String
  $date: AWSDate
  $amount: String
  $payee: AWSJSON
  $category: AWSJSON
) {
  onUpdateTransaction(
    id: $id
    date: $date
    amount: $amount
    payee: $payee
    category: $category
  ) {
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
export const onDeleteTransaction = `subscription OnDeleteTransaction(
  $id: String
  $date: AWSDate
  $amount: String
  $payee: AWSJSON
  $category: AWSJSON
) {
  onDeleteTransaction(
    id: $id
    date: $date
    amount: $amount
    payee: $payee
    category: $category
  ) {
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
