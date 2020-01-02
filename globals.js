// // dimensions
// import { Dimensions } from 'react-native';

// global.screenWidth = Math.round(Dimensions.get('window').width);

import app from 'main/app.json';

global.SFProDisplayRegularFont = require('./assets/fonts/SF-Pro-Display-Regular.otf');

global.SFProDisplaySemiboldFont = require('./assets/fonts/SF-Pro-Display-Semibold.otf');

// placeholder images
global.placeholderUserImage = require('./assets/user-placeholder-200x250.png');

global.placeholder500x500 = require('./assets/placeholder500x500.png');

global.searchIcon = require('./assets/search-icon.png');

global.settingsIcon = require('./assets/settings-icon.png');

global.xIconWhite = require('./assets/x-icon-white.png');

global.walletFilledMoneyToolIcon = require('./assets/wallet-filled-money-tool.png'); // 261 × 252

global.avatar = require('./assets/avatar.png');

// global.clickSound = require('./assets/sounds/test.mp3');

global.appIcon = require('./assets/icon.png');

global.wifiSymbol = require('./assets/wifi-symbol-high-resolution.png');

global.wifiImage = require('./assets/wifi-image.png');

global.noWifiImage = require('./assets/no-wifi-image.png');

global.maxAmountLength = 9;

global.appVersion = app.expo.version;

global.adminEmailAddress = 'esphung@gmail.com';

global.appName = app.expo.name; // 'Financely';

global.appDeveloper = 'Eric Phung';

global.appDesigner = 'Andrey Nasanov';

global.privacyLink = 'www.google.com';

global.latestReleaseDate = '12/12/2019 02:09 AM';

// local storage keys
global.isPasscodeEnabledKey = 'isPasscodeEnabled';

global.isLocallyAuthenticatedKey = 'isLocallyAuthenticatedKey';

global.isColorChangedPurchased  = false;

// validation
// var usernameRegex = /^[a-zA-Z0-9]+$/;
// global.usernameRegex = /^[a-zA-Z0-9]+$/;
