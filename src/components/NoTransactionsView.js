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

class NoTransactionsView extends Component {
  render() {
    return (
      <View style={
        {
          marginTop: 21,

          width: 225,
          height: 84,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
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
    fontFamily: "SFProDisplay",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",
  },

  text: {
    opacity: 0.6,
    fontFamily: "SFProDisplay",
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