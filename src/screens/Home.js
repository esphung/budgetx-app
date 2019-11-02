/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
DATE:       Thu Oct 31 23:17:49 2019
*/


'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui styles
import styles from '../styles/styles';

// ui colors
import colors from '../../colors';

// top rectangle
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
  shadowOpacity: 1,

  borderWidth: global.borderWidth,
};

//  current balance
const currentBalanceTitleCopy9 = {
  width: 113,
  //width: '100%',
  height: 20,
  fontFamily: "SFProDisplay",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.1,
  textAlign: "center",
  textAlignVertical: 'top',
  color: colors.shamrockGreen,

  borderWidth: global.borderWidth,
  borderColor: 'white',
  borderStyle: 'solid',
};

// current spent
const currentSpentTitleCopy10 = {
  width: 113,
  //width: '100%',
  height: 20,
  fontFamily: "SFProDisplay",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0.1,
  textAlign: "center",
  color: colors.pinkRed,

  borderWidth: global.borderWidth,
  borderColor: 'white',
  borderStyle: 'solid',
};

class Home extends Component {
  render() {
    const balancesView =  <View style={rectangle2}>
                            <View style={
                              {
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',

                                borderWidth: global.borderWidth,
                                borderColor: 'white',
                                borderStyle: 'solid',
                              }
                            }>
                              <View style={{
                                width: '50%',
                                height: '50%',
                                alignItems: 'center',
                              }}><Text style={currentBalanceTitleCopy9}>Current Balance</Text></View>

                              <View style={{
                                width: '50%',
                                height: '50%',
                                alignItems: 'center',
                              }}><Text style={currentSpentTitleCopy10}>Spent This Month</Text></View>

                            </View>
                          </View>
    return (
      <View style={styles.body}>
        { balancesView }
      </View>
    );
  }
}


export default Home;









