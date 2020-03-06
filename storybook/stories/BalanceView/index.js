import React from 'react';

import {
  // StyleSheet,
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import getCurrencySymbol from '../../../src/functions/getCurrencySymbol';

function BalanceView(props) {
  // const currentBalanceBtnPressed = () => {
  //   // console.log('Current Balance:', currentBalanceValue);
  // };

  // const currentSpentValueBtnPressed = () => {
  //   // console.log('Current Spent:', currentSpentValue);
  // };

  const { currentBalanceValue, currentSpentValue } = props;

  return (
    <View style={styles.balanceView}>
      <View style={{
        width: '50%',
        alignItems: 'center',
      }}
      >

        <Text style={styles.currentBalanceTitle}>
          Current Balance
        </Text>
        <Text style={styles.currentBalanceValue}>
          <Text style={{ color: colors.offWhite }}>{`${getCurrencySymbol(currentBalanceValue)}`}</Text>
          <Text>{`${Math.abs(currentBalanceValue).toFixed(2)}`}</Text>
        </Text>
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

        <Text style={styles.currentSpentValue}>
          <Text style={{ color: colors.offWhite }}>{`${getCurrencySymbol(currentSpentValue)}`}</Text>
          <Text>{ `${Math.abs(currentSpentValue).toFixed(2)}` }</Text>
        </Text>

      </View>

    </View>

  );
}

// const styles = StyleSheet.create({
//   balanceView: {
//     width: 346,
//     height: 74,
//     borderRadius: 9,
//     backgroundColor: colors.dark,
//     shadowColor: '#0f1725',
//     shadowOffset: {
//       width: 5,
//       height: 5
//     },
//     shadowRadius: 16,
//     shadowOpacity: 1,

//     top: '14%', // 110,
//     position: 'absolute',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dotted',
//   },

//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dotted',
//   },

//   separator: {
//     width: 1,
//     height: '70%',
//     marginVertical: 10,
//     backgroundColor: 'white', // 'rgba(0,0,0,0.5)',
//     opacity: 0.1,
//   },

//   currentBalanceTitle: {
//     // width: 113,
//     width: '100%',
//     height: 20,

//     fontFamily: 'SFProDisplay-Regular',

//     fontSize: 15,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'center',
//     textAlignVertical: 'top',
//     color: colors.shamrockGreen,

//     // borderWidth: global.borderWidth,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },

//   currentSpentTitle: {
//     // width: 113,
//     width: '100%',
//     height: 20,

//     fontFamily: 'SFProDisplay-Regular',

//     fontSize: 15,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'center',
//     color: colors.pinkRed,

//     // borderWidth: global.borderWidth,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },

//   currentBalanceValue: {
//     // width: 37,
//     width: '100%',
//     height: 30,

//     fontFamily: 'SFProDisplay-Regular',

//     fontSize: 25,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'center',
//     color: '#ffffff',

//     // borderWidth: global.borderWidth,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },

//   currentSpentValue: {
//     // width: 37,
//     width: '100%',
//     height: 30,

//     fontFamily: 'SFProDisplay-Regular',

//     fontSize: 25,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'center',
//     color: '#ffffff',

//     // borderWidth: global.borderWidth,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   }
// });

BalanceView.propTypes = {
  currentBalanceValue: PropTypes.number.isRequired,
  currentSpentValue: PropTypes.number.isRequired,
};


export default BalanceView;
