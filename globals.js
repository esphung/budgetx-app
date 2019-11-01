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

// Basic Text
global.basicTextFontSize = 17

// Small Text
global.smallTextFontSize = 15

// debug borders
global.borderWidth = 1

if (global.isDebugModeOn != true) {
  // screen background
  global.backgroundColor = colors.darkGreyBlue

  // no debug borders
  global.borderWidth = 0

  // text colors
  global.basicTextColor = 'white'

}


// placeholder images
global.placeholderUserImage = require('./assets/user-placeholder-200x250.png')
