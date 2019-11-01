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

  body: {
    height:  global.screenHeight * 0.08,
    backgroundColor: global.backgroundColor,

    borderBottomWidth: global.borderWidth,

  },

  userImageTouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 50,

    backgroundColor: global.backgroundColor,
    marginLeft: global.screenWidth * 0.04,
    borderWidth:  global.borderWidth,

    //opacity: 0.2,
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,

    borderWidth:  global.borderWidth,

  },

});

export default headers