// // dimensions
// import { Dimensions } from 'react-native';

// global.screenWidth = Math.round(Dimensions.get('window').width);

import {
  // View,
  // Platform,
  // StyleSheet,
  AsyncStorage,
} from 'react-native';

import app from './app.json';

global.showGlobalValues = () => {
  console.log(
    [
    `global.isBackedUp: ${global.isBackedUp}`,
    `global.isDeviceSyncOn: ${global.isDeviceSyncOn}`,
    `global.hasRatedUs: ${global.hasRatedUs}`,
    `global.storageKey: ${global.storageKey}`,
    `global.isUserAuthenticated: ${global.isUserAuthenticated}`,
    `global.isLoginEnabled: ${global.isLoginEnabled}`,
    `global.emailAddressInput: ${global.emailAddressInput}`,
    `global.email: ${global.email}`,
    `global.avatar: ${global.avatar}`,
    `global.displayName: ${global.displayName}`,

    ]
  );
};

global.displayName = 'Get cross-device sync'

global.facebookAppId = app.expo.facebookAppId;

global.isBackedUp = false;

global.isDeviceSyncOn = false;

global.hasRatedUs = false;

// global.isStorybookModeOn = true;

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

// global.clickSound = require('./assets/sounds/test.mp3');

global.appIcon = require('./assets/icon.png');

// global.wifiSymbol = require('./assets/wifi-symbol-high-resolution.png');

// global.wifiImage = require('./assets/wifi-image.png');

// global.noWifiImage = require('./assets/no-wifi-image.png');

global.backspaceKeyIcon = require('./assets/backspace-clear-delete-key-remove-text-icon-_512-512.png')

global.bankImageGreen = require('./assets/bank-image-green.png');

global.appVersion = app.expo.version;

global.adminEmailAddress = 'esphung@gmail.com';

global.appName = app.expo.name; // 'Financely';

global.appDeveloper = 'Eric Phung';

global.appDesigner = 'Andrey Nasanov';

// global.privacyLink = 'www.google.com';

// global.latestReleaseDate = '12/12/2019 02:09 AM';


// global.clickSound = require('main/assets/clickSound.mp3');

// local storage keys
// global.isPasscodeEnabledKey = 'isPasscodeEnabled';

// global.isLocallyAuthenticatedKey = 'isLocallyAuthenticatedKey';

// global.isColorChangedPurchased  = false;

// validation
// var usernameRegex = /^[a-zA-Z0-9]+$/;
// global.usernameRegex = /^[a-zA-Z0-9]+$/;


// const getIsBackedUp = async () => {
//   // Retrieves from storage as boolean
//   let value = await AsyncStorage.getItem('isBackedUp')

//   global.isBackedUp = value
//   return value // boolean false
// };

// const getHasRatedUs = async () => {
//   // Retrieves from storage as boolean
//   let value = await AsyncStorage.getItem('hasRatedUs');

//   global.hasRatedUs = value
//   return value // boolean false
// };

export const setIsDeviceSyncOn = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isDeviceSyncOn', JSON.stringify(bool));
  global.isDeviceSyncOn = bool
}

export const getIsDeviceSyncOn = async () => {
  // Retrieves from storage as boolean
  let value = await AsyncStorage.getItem('isDeviceSyncOn')

  global.isDeviceSyncOn = value
  return value // boolean false
};

export const setIsBackedUp = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isBackedUp', JSON.stringify(bool));
  global.isBackedUp = bool
}

export const getIsBackedUp = async () => {
  // Retrieves from storage as boolean
  let value = await AsyncStorage.getItem('isBackedUp')

  global.isBackedUp = value
  return value // boolean false
};

export const setHasRatedUs = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('hasRatedUs', JSON.stringify(bool));
  global.hasRatedUs = bool;
}

export const getHasRatedUs = async () => {
  // Retrieves from storage as boolean
  let value = await AsyncStorage.getItem('hasRatedUs');

  global.hasRatedUs = value;
  return value // boolean false
};

global.isDeviceSynced = false;

export const setIsDeviceSynced = (bool) => {
  // Saves to storage as a JSON-string
  AsyncStorage.setItem('isDeviceSynced', JSON.stringify(bool));
  global.isDeviceSynced = bool
}

export const getIsDeviceSynced = async () => {
  // Retrieves from storage as boolean
  let value = await AsyncStorage.getItem('isDeviceSynced')

  global.isDeviceSynced = value
  return value // boolean false
};



// global.showGlobalValues()


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




