/*
FILENAME:   headers.js
PURPOSE:    header styles for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:21:17 2019
*/
import { StyleSheet } from 'react-native'

import { Dimensions } from "react-native";

global.screenWidth = Math.round(Dimensions.get('window').width);
global.screenHeight = Math.round(Dimensions.get('window').height);

// import global variables
require('../../globals')

const headers = StyleSheet.create({

  headerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:  global.screenHeight * 0.08,
    backgroundColor: global.backgroundColor,
    borderBottomWidth: global.borderWidth,
  },

  userImageTouchableOpacity: {
    flex: 1,
    width: 35,
    height: 35,
    //borderRadius: 50,
    backgroundColor: global.backgroundColor,
    marginLeft: global.screenWidth * 0.025,
    borderWidth:  global.borderWidth,
  },

  userImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 17,
    borderWidth:  global.borderWidth,
  },

  searchBtnTouchableOpacity: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 3,
    width: 30,
    height: 30,
    borderWidth: global.borderWidth,
    backgroundColor: global.backgroundColor,
  },

  searchImage: {
    flex: 1,
    width: '60%',
    height: '60%',
    borderWidth:  global.borderWidth,
  },

  settingsBtnTouchableOpacity: {
    flex: 1,
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: global.borderWidth,
    backgroundColor:global.backgroundColor,
  },

  settingsImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth:  global.borderWidth, 
  }

});

export default headers