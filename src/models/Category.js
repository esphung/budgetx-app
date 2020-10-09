/*
FILENAME:   Category.js
PURPOSE:    Category model for budget x app
AUTHOR:     Eric Phung
CREATED:    12/11/2019 10:09 PM
UPDATED:    12/11/2019 10:09 PM
            01/29/2020 06:41 PM
            03/28/2020 02:18 PM | GraphQL Model/Schema
*/

import uuidv4 from 'functions/uuidv4';

function Category({
  id = uuidv4(),
  name = 'Empty',
  color = '#ffffff',
  type = 'EXPENSE',
  owner = global.storageKey,
  version = 0,
  }) {
  const obj = {
    id: id, // (id) ? id : uuidv4(),
    name: name, // (name) ? name : 'None',
    color: color, // (color) ? color : '#ffffff',
    type: type, // (type) ? type : 'EXPENSE',
    owner: owner, // (owner)  ? owner : global.storageKey,
    version: version, // (version) ? version : 0,
  };
  return obj;
}

// new Category(uuidv4(), 'TEST CATEGORY', '#000000', 'EXPENSE', currentOwner, 0)

// console.log('Category: ', Category('Test Category', '#FFFFFFF', 'EXPENSE'));
// console.log('Category: ', Category());

export default Category;


// /*
// FILENAME:   Category.js
// PURPOSE:    Category model for budget x app
// AUTHOR:     Eric Phung
// CREATED:    12/11/2019 10:09 PM
// UPDATED:    12/11/2019 10:09 PM
//             01/29/2020 06:41 PM
// */

// // var ID = function () {
// //   // Math.random should be unique because of its seeding algorithm.
// //   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
// //   // after the decimal.
// //   return Math.random().toString(36).substr(2, 9);
// // };

// import uuidv4 from '../functions/uuidv4';

// export default function Category(name, color, type) {
//   const obj = {
//     id: uuidv4(),
//     name,
//     color,
//     type
//   };
//   return obj;
// }
