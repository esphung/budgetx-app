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

  },

  userImageTouchableOpacity: {
    backgroundColor: global.backgroundColor,
    borderRadius: 50,
    marginLeft: global.screenWidth * 0.045,
    borderWidth:  global.borderWidth,
  },
  userImage: {
    //alignItems: 'center',
    width: 30,
    height: 30,
    //opacity: 0.2,


  },

});

export default headers