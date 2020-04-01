/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction($owner: String!) {
    onCreateTransaction(owner: $owner) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($owner: String!) {
    onUpdateTransaction(owner: $owner) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction($owner: String!) {
    onDeleteTransaction(owner: $owner) {
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
export const onCreatePayee = /* GraphQL */ `
  subscription OnCreatePayee($owner: String!) {
    onCreatePayee(owner: $owner) {
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
export const onUpdatePayee = /* GraphQL */ `
  subscription OnUpdatePayee($owner: String!) {
    onUpdatePayee(owner: $owner) {
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
export const onDeletePayee = /* GraphQL */ `
  subscription OnDeletePayee($owner: String!) {
    onDeletePayee(owner: $owner) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String!) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String!) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String!) {
    onDeleteCategory(owner: $owner) {
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
