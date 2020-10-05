import API, { graphqlOperation } from '@aws-amplify/api';

import gql from 'graphql-tag';

import {
  deletePayee,
} from '../graphql/mutations';

/*
query ListPayees {
  listPayees (
    limit: 1000000000,)  {
    items
    {
      id
      name
      owner
      version
      transaction {
        id
      }
    }
  }
}

mutation DeletePayee {
  deletePayee(input: {
    id: "1234456789"
  }) {
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
      }
      category {
        id
      }
      type
      note
      version
      
    }
  }
}


mutation AddPayee {
  createPayee(input: {
    id: "1234456789"
    name: "Meijer's"
    owner: "ebb408c7-b2e7-46ab-bb4b-7020ce248568"
    version: 0
    payeeTransactionId: "987654321"
  }) {
    id
    name
    owner
    version
    transaction {
      id
    }
  }
}


*/

export const AddPayee = async (payee) => {
  const addPayee = `
  mutation AddPayee {
    createPayee(input: {
      id: ${'"'+payee.id+'"'}
      name: ${'"'+payee.name+'"'}
      owner: ${'"'+payee.owner+'"'}
      version: ${0}
    }) {
      id
      name
      owner
      version
      transaction {
        id
      }
    }
  }
`;
  try {
    const response = await API.graphql(graphqlOperation(addPayee));
    // console.log('payee successfully added:', payee);
    return response.data.updatePayee;
  } catch (err) {
    console.log('error adding new payee:', err.message);
    throw err;
  }
};

export const UpdatePayee = async (payee) => {
  const updatePayee = `
  mutation UpdatePayee {
    updatePayee(input:{
      id: ${'"'+payee.id+'"'}
      name: ${'"'+payee.name+'"'}
      owner: ${'"'+payee.owner+'"'}
      version: ${(payee.version += 1)}
    }) {
      id
      name
      owner
      version
    }
  }
`;
  try {
    const response = await API.graphql(graphqlOperation(updatePayee));
    // console.log('payee successfully updated:', payee);
    return response.data.updatePayee;
  } catch (err) {
    console.log('error updating payee:', err.message);
    throw err;
  }
};

export const DeletePayee = async (payee) => {
  try {
    await API.graphql(graphqlOperation(deletePayee, { input: { id: payee.id } }));
    console.log('payee successfully deleted.', payee.id);
  } catch (err) {
    console.log('error deleting payee...', err);
  }
};
