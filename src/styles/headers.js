/*
FILENAME:   headers.js
PURPOSE:    header styles for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:21:17 2019
*/
import { StyleSheet } from 'react-native'

// import global variables
require('../../globals')

const headers = StyleSheet.create({
  userImageTouchableOpacity: {
    width: 27,
    height: 27,
    opacity: 0.2,
    borderWidth:  global.borderWidth,
}
});

export default headers