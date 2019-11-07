import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// ui colors
import colors from '../../colors';

import getUSDFormattedString from '../functions/getUSDFormattedString';

// import global variables
// require('../../globals')

// // maximum number of digits displayed for balances
// const maximumAmountOfDigits = 6

// function truncateString(str, num) {
//   if (str.length <= num) {
//     return str
//   }
//   return str.slice(0, num) + '...'
// }

class BalanceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '$'
    };

    this.currentBalanceBtnPressed = this.currentBalanceBtnPressed.bind(this);

    this.currentSpentValueBtnPressed = this.currentSpentValueBtnPressed.bind(this);
  }

  getCurrencySymbol() {
    const { symbol } = this.state;
    return `${symbol} `;
  }

  currentBalanceBtnPressed = () => {
    // console.log('Current Balance:', this.props.currentBalanceValue)
  }

  currentSpentValueBtnPressed = () => {
    // console.log('Current Spent:', this.props.currentSpentValue)
  }

  render() {
    let { currentBalanceValue, currentSpentValue } = this.props;

    if (!currentBalanceValue) {
      currentBalanceValue = 0;
    }

    if (!currentSpentValue) {
      currentSpentValue = 0;
    }

    return (
      <View style={styles.balanceView}>
        <View style={styles.container}>

          <View style={{
            width: '50%',
            alignItems: 'center',
          }}
          >

            <Text style={styles.currentBalanceTitle}>
              Current Balance
            </Text>

            <TouchableOpacity onPress={this.currentBalanceBtnPressed}>
              <Text
                style={styles.currentBalanceValue}
              >
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', }}>{ this.getCurrencySymbol() }</Text>
                <Text>{ getUSDFormattedString(currentBalanceValue) }</Text>
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.separator} />

          <View style={{
            width: '50%',
            // height: '50%',
            alignItems: 'center',
          }}
          >
            <Text style={styles.currentSpentTitle}>
              Spent This Month
            </Text>

            <TouchableOpacity onPress={this.currentSpentValueBtnPressed}>
              <Text style={styles.currentSpentValue}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', }}>{ this.getCurrencySymbol() }</Text>
                <Text>{ getUSDFormattedString(currentSpentValue) }</Text>
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balanceView: {
    width: 346,
    height: 74,
    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: '#0f1725',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 16,
    shadowOpacity: 1,

    top: '14%', // 110,
    position: 'absolute',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },

  separator: {
    width: 1,
    height: '70%',
    marginVertical: 10,
    backgroundColor: 'white', // 'rgba(0,0,0,0.5)',
    opacity: 0.1,
  },

  currentBalanceTitle: {
    // width: 113,
    width: '100%',
    height: 20,

    fontFamily: 'SFProDisplay-Regular',

    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.1,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: colors.shamrockGreen,

    // borderWidth: global.borderWidth,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  currentSpentTitle: {
    // width: 113,
    width: '100%',
    height: 20,

    fontFamily: 'SFProDisplay-Regular',

    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.1,
    textAlign: 'center',
    color: colors.pinkRed,

    // borderWidth: global.borderWidth,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  currentBalanceValue: {
    // width: 37,
    width: '100%',
    height: 30,

    fontFamily: 'SFProDisplay-Regular',

    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'center',
    color: '#ffffff',

    // borderWidth: global.borderWidth,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  currentSpentValue: {
    // width: 37,
    width: '100%',
    height: 30,

    fontFamily: 'SFProDisplay-Regular',

    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'center',
    color: '#ffffff',

    // borderWidth: global.borderWidth,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});


export default BalanceView;
