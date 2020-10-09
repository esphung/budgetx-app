/*
query ListCategories {
  listCategorys (limit: 1000000000) {
    items {
      id
      name
      color
      type
      owner
      version
    }
    # nextToken
  }
}
mutation UpdateCategory {
  updateCategory(input: {
    id: "1234456789"
    name: "Cookies and Ice Cream"
    color: "#fff"
    type: "EXPENSE"
    owner: "ebb408c7-b2e7-46ab-bb4b-7020ce248568"
    version: 1
  }) {
    id
    name
    color
    type
    owner
    version
  }
}
mutation AddCategory {
  createCategory(input: {
    id: "1234456789"
    name: "Cookies and Ice Cream"
    color: "#000"
    type: "EXPENSE"
    owner: "ebb408c7-b2e7-46ab-bb4b-7020ce248568"
    version: 0
  }) {
    id
    name
    color
    type
    owner
    version
  }
}
*/

// import gql from 'graphql-tag';

import API, { graphqlOperation } from '@aws-amplify/api';

import colorLog from 'functions/colorLog';

import {
  deleteCategory,
} from 'graphql/mutations';

import {
  getCategory,
} from 'graphql/queries';

// const listCategorysGQL = gql`
// query ListCategorys {
//   listCategorys (limit: 1000000000) {
//     items {
//       id
//       name
//       color
//       type
//       owner
//       version
//       transactions {
//         nextToken
//       }
//     }
//     # nextToken
//   }
// }
// `;

// export const ListCategories = async () => {
//   try {
//     const graphqldata = await API.graphql(graphqlOperation(listCategorysGQL));
//     // console.log('graphqldata: ', graphqldata);
//     return graphqldata.data.listCategorys.items;
//     // console.log('online categories list.length: ', list.length);
//   } catch (err) {
//     console.log('error fetching user categories from online: ', err);
//     // throw err;
//     return err;
//   }
// };


export const ListCategories = async () => {
    const listCategorys = `
query ListCategories {
  listCategorys(limit: 1000000) {
    items {
      id
      owner
      type
      color
      version
      transactions {
        items {
          id
        }
      }
    }
  }
}

`;
  const graphqldata = await API.graphql(graphqlOperation(listCategorys))
    .then((response) => {
      // console.log('response.data.listCategorys: ', response.data.listCategorys);
      // colorLog({ message: `global.storageKey: ${global.storageKey}`, color: 'blue', })
      return response.data.listCategorys.items;
    })
    .catch((err) => {
      // colorLog({ message: `ListCategories err: ${err}`, color: 'red', })
      return [];
    });
    // console.log('graphqldata: ', graphqldata);
  return graphqldata;
  // console.log('online categories list.length: ', list.length);
};

export const GetCategory = async (category) => {
  // try {
  let response = await API.graphql(graphqlOperation(getCategory, { id: category.id }));
  // console.log('response: ', response);
  return response.data.getCategory;
  // } catch (e) {
  //   // statements
  //   console.log('error getting category: ', e);
  //   throw e;
  //   // console.log(e);
  // }
};


export const AddCategory = async (category) => {
const query = `mutation AddCategory {
  createCategory(input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    owner: ${'"'+category.owner+'"'}
    version: ${0}
  }) {
    id
    name
    color
    type
    owner
    version
  }
}`
  // try {
    const result = await API.graphql(graphqlOperation(query))
    .then((response) => response.data.createCategory)
    .catch((err) => err.data.createCategory);
    
  // } catch (err) {
    // console.log('err: ', err);
    // console.log('query: ', query);
    // const { message } = err;
    // return err;
    // if (err.data.errors[0].errorType === 'DynamoDB:ConditionalCheckFailedException') {
    //   colorLog({ message: err.data.errors[0].errorType, color: 'yellow' });
    // }
  // }
  return result;
};

export const UpdateCategory = async (category) => {
const query = `mutation UpdateCategory {
  updateCategory(input: {
    id: ${'"'+category.id+'"'}
    name: ${'"'+category.name+'"'}
    color: ${'"'+category.color+'"'}
    type: ${'"'+category.type+'"'}
    owner: ${'"'+category.owner+'"'}
    version: ${category.version += 1}
  }) {
    id
    name
    color
    type
    owner
    version
  }
}`
  
  const result = await API.graphql(graphqlOperation(query))
  .then((response) => {
    // console.log('response: ', response);
    return response.data.updateCategory
  })
  .catch((err) => err.data.updateCategory);

  return result;
};

export const DeleteCategory = async (category) => {
  // alert('message?: DOMString')
  // console.log('category: ', category);
  const result = await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }))
    .then((response) => {
      // alert('message?: DOMString')
      return response.data.deleteCategory})
    .catch((err) => {
      // alert('message?: DOMString')
      return err.data.deleteCategory
    });
  return result;
};

