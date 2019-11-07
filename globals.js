// dimensions
import { Dimensions } from 'react-native';

global.screenWidth = Math.round(Dimensions.get('window').width);

// placeholder images
global.placeholderUserImage = require('./assets/user-placeholder-200x250.png');

global.placeholder500x500 = require('./assets/placeholder500x500.png');

global.searchIcon = require('./assets/search-icon.png');

global.settingsIcon = require('./assets/settings-icon.png');
