'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

// top rectangle
const balanceView = {
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
}

// current balance
const currentBalanceTitle = {
  //width: 113,
  width: '100%',
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
}

// current spent
const currentSpentTitle = {
  //width: 113,
  width: '100%',
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
}

class BalanceView extends Component {
  render() {
    return (
      <View style={balanceView}>
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
                              }}>
                                <Text style={currentBalanceTitle}>
                                  Current Balance
                                </Text>
                              </View>

                              <View style={{
                                width: '50%',
                                height: '50%',
                                alignItems: 'center',
                              }}>
                                <Text style={currentSpentTitle}>
                                  Spent This Month
                                </Text>
                              </View>

                            </View>
                          </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default BalanceView;