/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
DATE:       Thu Oct 31 23:17:49 2019
*/
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from '../styles/styles'

// ui colors
import colors from '../../colors'

const rectangle2 = {
  width: 346,
  height: 74,
  borderRadius: 9,
  backgroundColor: colors.dark,
  shadowColor: "#0f1725",
  shadowOffset: {
    width: 5,
    height: 5
  },
  shadowRadius: 16,
  shadowOpacity: 1
};

const dateView = {
  width: 375,
  height: 31,
  opacity: 0.5,
  backgroundColor: colors.dark
};

const dateText = {
  width: 131,
  height: 20,
  fontFamily: "SFProDisplay",
  fontSize: 17,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.13,
  textAlign: "center",
  color: "rgba(255, 255, 255, 0.5)"
};

export default function Home() {
  return (
    <View style={styles.body}>
      <View style={rectangle2} />
{/*      <View style={dateView}>
        <Text  style={dateText}>{String(new Date())}</Text>
      </View>*/}
    </View>
  );
}

