/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransaction = `subscription OnCreateTransaction {
  onCreateTransaction {
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
export const onUpdateTransaction = `subscription OnUpdateTransaction {
  onUpdateTransaction {
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
export const onDeleteTransaction = `subscription OnDeleteTransaction {
  onDeleteTransaction {
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
export const onCreatePayee = `subscription OnCreatePayee {
  onCreatePayee {
    id
    name
  }
}
`;
export const onUpdatePayee = `subscription OnUpdatePayee {
  onUpdatePayee {
    id
    name
  }
}
`;
export const onDeletePayee = `subscription OnDeletePayee {
  onDeletePayee {
    id
    name
  }
}
`;
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
    id
    name
    color
    type
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
    id
    name
    color
    type
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
    id
    name
    color
    type
  }
}
`;
