// // dimensions
// import { Dimensions } from 'react-native';

import {
  // View,
  // Platform,
  // StyleSheet,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import app from './app.json';

/* testing and debug variables */
global.testOfflineMode;

/* s3 storage variables (aws amplify storage) */
global.bucketName = 'profilepicturesbucketbudgetxbudgetxenv-budgetxenv/';


/* Variables */

global.isConfirmSent = false;

global.debugMode = true;

global.isUserLoggedIn = false;

global.screenWidth = Math.round(Dimensions.get('window').width);

global.displayName = 'Get cross-device sync';

global.facebookAppId = app.expo.facebookAppId;

global.isBackedUp = false;

global.isDeviceSyncOn = false;

global.isDeviceSynced = false;

global.hasRatedUs = false;

global.isStorybookModeOn = false;

global.storageKey = ''; // 'CURRENT_USER'

global.isUserAuthenticated = false;

global.isLoginEnabled = false;

global.amountInputMaxLength = 7;

global.emailAddressInput = '';

global.maxEmailLength = 26;

global.MAX_PILL_WIDTH = 176;

global.MIN_PILL_WIDTH = 54;

// max min lengths
global.maxAuthCodeLength = 6;

global.maxUsernameLength = 24;

global.minUsernameLength = 6;

global.minPasswordLength = 8;

global.SFProDisplayRegularFont = require('./assets/fonts/SF-Pro-Display-Regular.otf');

global.SFProDisplaySemiboldFont = require('./assets/fonts/SF-Pro-Display-Semibold.otf');

// global.searchIcon = require('./assets/search-icon.png');

global.settingsIcon = require('./assets/settings-icon.png');

global.xIconWhite = require('./assets/x-icon-white.png');

global.walletIcon = require('./assets/wallet-filled-money-tool.png');

global.avatar = require('./assets/avatar.png');

global.appIcon = require('./assets/icon.png');

global.backspaceKeyIcon = require('./assets/backspace-clear-delete-key-remove-text-icon-_512-512.png');

global.bankImageGreen = require('./assets/bank-image-green.png');

global.appVersion = app.expo.version;

global.adminEmailAddress = 'esphung@gmail.com';

global.appName = app.expo.name; // 'Financely'

global.appDeveloper = 'Eric Phung';

global.appDesigner = 'Andrey Nasanov';

global.showGlobalValues = () => {
  console.log(
    [
      `global.isBackedUp: ${global.isBackedUp}`,
      `global.isDeviceSyncOn: ${global.isDeviceSyncOn}`,
      `global.isDeviceSynced: ${global.isDeviceSynced}`,
      `global.hasRatedUs: ${global.hasRatedUs}`,
      `global.storageKey: ${global.storageKey}`,
      `global.isUserAuthenticated: ${global.isUserAuthenticated}`,
      `global.isLoginEnabled: ${global.isLoginEnabled}`,
      `global.emailAddressInput: ${global.emailAddressInput}`,
      `global.email: ${global.email}`,
      `global.avatar: ${global.avatar}`,
      `global.displayName: ${global.displayName}`,
      `global.isStorybookModeOn: ${global.isStorybookModeOn}`,
      `global.screenWidth: ${global.screenWidth}`,
      `global.debugMode: ${global.debugMode}`,
      `global.authenticated: ${global.authenticated}`,
      `global.isConnected: ${global.isConnected}`,
      `global.isUserLoggedIn: ${global.isUserLoggedIn}`,
      `global.isConfirmSent: ${global.isConfirmSent}`,

    ],
  );
};

/* Methods */
export const setIsDeviceSyncOn = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isDeviceSyncOn', JSON.stringify(bool));
  global.isDeviceSyncOn = bool;
};

export const getIsDeviceSyncOn = async () => {
  // Retrieves from storage as boolean
  const value = await AsyncStorage.getItem('isDeviceSyncOn');

  global.isDeviceSyncOn = value;
  return value; // boolean false
};

export const setIsBackedUp = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isBackedUp', JSON.stringify(bool));
  global.isBackedUp = bool;
};

export const getIsBackedUp = async () => {
  // Retrieves from storage as boolean
  const value = await AsyncStorage.getItem('isBackedUp');

  global.isBackedUp = value;
  return value; // boolean false
};

export const setHasRatedUs = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('hasRatedUs', JSON.stringify(bool));
  global.hasRatedUs = bool;
};

export const getHasRatedUs = async () => {
  // Retrieves from storage as boolean
  const value = await AsyncStorage.getItem('hasRatedUs');

  global.hasRatedUs = value;
  return JSON.parse(value); // boolean false
};

export const setIsDeviceSynced = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isDeviceSynced', JSON.stringify(bool));
  global.isDeviceSynced = bool;
};

export const getIsDeviceSynced = async () => {
  // Retrieves from storage as boolean
  const value = await AsyncStorage.getItem('isDeviceSynced');

  global.isDeviceSynced = value;
  return JSON.parse(value); // boolean false
};

export const setAuthenticated = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('authenticated', JSON.stringify(bool));
  global.authenticated = bool;
};

export const getAuthenticated = async () => {
  // Retrieves from storage as boolean
  const value = await AsyncStorage.getItem('authenticated');

  global.authenticated = value;
  return JSON.parse(value); // boolean false
};


global.showGlobalValues();

// module.exports = {
//   getIsDeviceSynced,
//   setIsDeviceSynced,
//   getIsBackedUp,
//   getHasRatedUs,
//   setIsBackedUp,
//   setHasRatedUs,
//   getIsDeviceSyncOn,
//   setIsDeviceSyncOn,
// }
