/*
filename:  globals.js
purpose:   file for app variables
author:    eric phung
date:      Thu Oct 31 14:32:40 2019
*/

// app debug mode
//global.isDebugModeOn = true

// ui colors
import colors from './colors'

// dimensions
import { Dimensions } from "react-native";

global.screenWidth = Math.round(Dimensions.get('window').width);
global.screenHeight = Math.round(Dimensions.get('window').height);

// Basic Text
global.basicTextFontSize = 17

// Small Text
global.smallTextFontSize = 15

// debug borders
global.borderWidth = 1

if (global.isDebugModeOn != true) {
  // screen background
  global.backgroundColor = colors.darkTwo

  // no debug borders
  global.borderWidth = 0

  // text colors
  global.basicTextColor = 'white'

}

// placeholder images
global.placeholderUserImage = require('./assets/user-placeholder-200x250.png')

global.placeholder500x500 = require('./assets/placeholder500x500.png')

global.searchIcon  = require('./assets/search-icon.png')

global.settingsIcon  = require('./assets/settings-icon.png')
