/*
FILENAME:   styles.js
PURPOSE:    app styling
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:21:42 2019
*/
import { StyleSheet } from 'react-native'

// import global variables
require('../../globals')

// ui colors
import colors from '../../colors';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: global.backgroundColor,
    borderWidth: global.borderWidth,
  },

  basicText: {
    fontSize:   global.basicTextFontSize,
    color:      global.basicTextColor,
    borderWidth: global.borderWidth,
  }

});

export default styles;