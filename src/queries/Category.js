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

import {
  deleteCategory,
} from '../graphql/mutations';

import {
  getCategory,
} from '../graphql/queries';

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
  listCategorys (limit: 1000) {
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
`;
  try {
    const graphqldata = await API.graphql(graphqlOperation(listCategorys));
    // console.log('graphqldata: ', graphqldata);
    return graphqldata.data.listCategorys.items;
    // console.log('online categories list.length: ', list.length);
  } catch (err) {
    const { message } = err;
    console.log('error fetching category list:', message);
    return err;
  }
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
  try {
    const response = await API.graphql(graphqlOperation(query));
    // console.log('category successfully added:', category);
    return response.data.createCategory;
  } catch (err) {
    console.log('err: ', err);
    // console.log('query: ', query);
    const { message } = err;
    return err;
  }
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
  // try {
    const response = await API.graphql(graphqlOperation(query));
    // console.log('category successfully updated:', category);
    return response.data.updateCategory;
  // } catch (err) {
  //   console.log('category: ', category);
  //   // const { message } = err;
  //   // console.log('error updating category:', message);
  //   // return err.message;
  // }
};

export const DeleteCategory = async (category) => {
  try {
    await API.graphql(graphqlOperation(deleteCategory, { input: { id: category.id } }));
    // console.log('category successfully deleted.', category.id);
  } catch (err) {
    console.log('error deleting category...', err);
  }
};

