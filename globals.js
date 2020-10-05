import {
  Dimensions,
} from 'react-native';

import app from './app.json';
/**
|--------------------------------------------------
| storage variables
|--------------------------------------------------
*/
global.bucketName = 'profilepicturesbucketbudgetxbudgetxenv-budgetxenv/';

global.storageKey = 'CURRENT_USER';

global.screenWidth = Math.round(Dimensions.get('screen').width);

global.screenHeight = Math.round(Dimensions.get('screen').height);

/**
|--------------------------------------------------
| Input values (app-wide)
|--------------------------------------------------
*/
global.amountInputMaxLength = 9;

global.emailAddressInput = '';

global.maxEmailLength = 26;

global.MAX_PILL_WIDTH = 176;

global.MIN_PILL_WIDTH = 54;

global.maxAuthCodeLength = 6;

global.maxUsernameLength = 24;

global.minUsernameLength = 6;

global.minPasswordLength = 8;

/**
|--------------------------------------------------
| Fonts
|--------------------------------------------------
*/
global.SFProDisplayRegularFont = require('./assets/fonts/SF-Pro-Display-Regular.otf');

global.SFProDisplaySemiboldFont = require('./assets/fonts/SF-Pro-Display-Semibold.otf');

/**
|--------------------------------------------------
| Images
|--------------------------------------------------
*/
global.appIconImage243x260 = require('./assets/appIconImage243x260.png');

global.settingsIcon = require('./assets/settings-icon.png');

global.xIconWhite = require('./assets/x-icon-white.png');

global.walletIcon = require('./assets/wallet-filled-money-tool.png');

global.avatar = require('./assets/avatar.png');

global.defaultAvatar = require('./assets/avatar.png');

global.appIcon = require('./assets/icon.png');

global.bankImageGreen = require('./assets/bank-image-green.png');

/**
|--------------------------------------------------
| App details
|--------------------------------------------------
*/

global.appVersion = app.expo.version;

global.adminEmailAddress = 'esphung@gmail.com';

global.appName = app.expo.name; // 'Financely'

global.appDeveloper = 'Eric Phung';

global.appDesigner = 'Andrey Nasanov';
