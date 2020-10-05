import User from './User';

import uuidv4 from '../functions/uuidv4';

import defaultCategories from '../data/categories';

export default (key) => {
  const settings = {
    id: uuidv4(),
    user: new User(key),
    transactions: [],
    categories: defaultCategories(),
    payees: [],
    // avatar: global.defaultAvatar,
    owner: key,
    version: 0,
    isDeviceSyncEnabled: false,

    // future props
    theme: 'dark',

    // Methods
    json: () => {
      return JSON.stringify(this, null, 2);
    },
  };
  return settings;
};

// console.log('new Settings("334242"): ', new Settings("334242"));