'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

// import global variables
require('../../globals')

class BalanceView extends Component {

  render() {
    return (
      <View style={styles.balanceView}>
        <View style={styles.container}>
          <View style={{
            width: '50%',
            //height: '50%',
            alignItems: 'center',
          }}>

            <Text style={styles.currentBalanceTitle}>
              Current Balance
            </Text>

            <Text style={styles.currentBalanceValue}>
              <Text style={{ color: "rgba(255, 255, 255, 0.5)", }}>$</Text>
              <Text>{ this.props.currentBalanceValue }</Text>
            </Text>
          
          </View>

          <View style={{
            width: '50%',
            //height: '50%',
            alignItems: 'center',
          }}>
            <Text style={styles.currentSpentTitle}>
              Spent This Month
            </Text>

            <Text style={styles.currentSpentValue}>
              <Text style={{ color: "rgba(255, 255, 255, 0.5)", }}>$</Text>
              <Text>{ this.props.currentSpentValue }</Text>
            </Text>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: global.borderWidth,
    borderColor: 'white',
    borderStyle: 'solid',
  },

  balanceView: {
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

    position: 'absolute',
    //left: ,//this.state.x,
    top: 110,//global.screenHeight * 0.01, //350,//this.state.y
  },

  currentBalanceTitle: {
    //width: 113,
    width: '100%',
    height: 20,
    
    fontFamily: 'SFProDisplay-Regular',
    
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
  },

  currentSpentTitle: {
    //width: 113,
    width: '100%',
    height: 20,
    
    fontFamily: 'SFProDisplay-Regular',
    
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: colors.pinkRed,

    borderWidth: global.borderWidth,
    borderColor: 'white',
    borderStyle: 'solid',
  },

  currentBalanceValue: {
    //width: 37,
    width: '100%',
    height: 30,
    
    fontFamily: 'SFProDisplay-Regular',
    
    fontSize: 25,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.29,
    textAlign: "center",
    color: "#ffffff",

    borderWidth: global.borderWidth,
    borderColor: 'white',
    borderStyle: 'solid',
  },

  currentSpentValue: {
    //width: 37,
    width: '100%',
    height: 30,
    
    fontFamily: 'SFProDisplay-Regular',
    
    fontSize: 25,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.29,
    textAlign: "center",
    color: "#ffffff",

    borderWidth: global.borderWidth,
    borderColor: 'white',
    borderStyle: 'solid',
  }
});


export default BalanceView;