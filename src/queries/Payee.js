import API, { graphqlOperation } from '@aws-amplify/api';

// import gql from 'graphql-tag';

import colorLog from 'functions/colorLog';

import {
  deletePayee,
} from '../graphql/mutations';

// import {
//   listPayees,
// } from '../graphql/queries';

export const ListPayees = async () => {
    const listPayees = `
query ListPayees {
  listPayees (limit: 1000000) {
    items {
      id
      name
      owner
      version
    }
    # nextToken
  }
}
`;
  try {
    const graphqldata = await API.graphql(graphqlOperation(listPayees));
    // console.log('graphqldata: ', graphqldata);
    return graphqldata.data.listPayees.items;
    console.log('online categories list.length: ', list.length);
  } catch (err) {
    const { message } = err;
    console.log('error fetching category list:', message);
    return err;
  }
};


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
  // console.log('payee: ', payee);
  const query = `
  mutation AddPayee {
    createPayee(input: {
      id: ${'"'+payee.id+'"'}
      name: ${'"'+payee.name+'"'}
      owner: ${'"'+payee.owner+'"'}
      version: ${payee.version}
    }) {
      id
      name
      owner
      version
    }
  }
`;
  try {
    const response = await API.graphql(graphqlOperation(query));
    // console.log('payee successfully added:', payee);
    colorLog({ message: 'payee successfully added:' + payee.id, color: 'yellow' });
    // return response.data.updatePayee;
    return payee;
  } catch (err) {
    // console.log('error adding new payee:', err);
    // throw err;
  }
};

export const UpdatePayee = async (payee) => {
  const query = `
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
    const response = await API.graphql(graphqlOperation(query));
    console.log('payee successfully updated:', payee);
    return response.data.updatePayee;
  } catch (err) {
    colorLog({ message: 'error updating payee...' + payee.id, color: 'red' });
    // throw err;
  }
};

export const DeletePayee = async (payee) => {
  try {
    await API.graphql(graphqlOperation(deletePayee, { input: { id: payee.id } }));
    // console.log('payee successfully deleted.', payee.id);
    // colorLog({ message: 'payee successfully deleted:' + payee.id, color: 'green' });
  } catch (err) {
    colorLog({ message: 'error deleting payee...' + payee.id, color: 'red' });
  }
};
