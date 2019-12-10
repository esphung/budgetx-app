import {
  loadUserObject,
  saveUserObject,
} from './src/storage/UserStorage';

// global app storage functions
global.getIsStoredUserLoggedIn = async () => {
  // return whether user is currently logged in
  let bool = false;
  // load stored user
  try {
    const userObject = await loadUserObject();
    bool = userObject.user.isLoggedIn;
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
  return bool;
};

global.setIsStoredUserLoggedIn = async (bool) => {
  // load stored user
  try {
    const userObject = await loadUserObject();
    userObject.user.isLoggedIn = bool;
    saveUserObject(userObject);
  } catch (e) {
    // statements
    // console.log('Could not load stored user');
  }
};