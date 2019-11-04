/*
FILENAME:   NoTransactionsView.js
PURPOSE:    shows if app has no transaction data
AUTHOR:     eric phung 
DATE:       Sun Nov  3 05:41:17 2019
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// import global variables
require('../../globals')

class NoTransactionsView extends Component {
  render() {
    return (
      <View style={
        {
          position: 'absolute',
          left: 84,
          top: 256,

          width: 220,
          height: 84,

          borderWidth: global.borderWidth,
          borderColor: 'white',
          borderStyle: 'solid',
        }
      }>

        <Text style={styles.header}>
          No transactions yet.
        </Text>

        <Text style={styles.text}>
          Choose category and enter amount below
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    opacity: 0.6,
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 22,
    //fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",
  },

  text: {
    opacity: 0.6,
    fontFamily: "SFProDisplay-Regular",
    fontSize: 22,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",
  }
});


export default NoTransactionsView;