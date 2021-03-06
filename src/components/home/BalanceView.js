/*
FILENAME:   BalanceView.js
PURPOSE:    Rectangle with current spent/current balance
AUTHOR:     Eric Phung
CREATED:
UPDATED:    03/07/2020 01:56 AM
            06/03/2020 08:46 PM Removed acctivy indicators
*/
import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import getCurrencySymbol from '../../functions/getCurrencySymbol';

function BalanceView(props) {
  const {
    currentBalanceValue,
    currentSpentValue,
  } = props;

  const view = (
    <View style={styles.balanceView}>
      <View style={{ width: '50%', alignItems: 'center' }}>
        <Text style={styles.currentBalanceTitle}>Current Balance</Text>
        <Text style={styles.currentBalanceValue}>
          <Text style={{ color: colors.offWhite }}>{`${getCurrencySymbol(currentBalanceValue)}`}</Text>
          <Text>{` ${Math.abs(currentBalanceValue).toFixed(2)}`}</Text>
        </Text>
      </View>

      <View style={styles.separator} />
      <View style={{ width: '50%', alignItems: 'center' }}>
        <Text style={styles.currentSpentTitle}>Spent This Month</Text>
        <Text style={styles.currentSpentValue}>
          <Text style={{ color: colors.offWhite }}>{`${getCurrencySymbol(currentSpentValue)}`}</Text>
          <Text>{ ` ${Math.abs(currentSpentValue).toFixed(2)}` }</Text>
        </Text>
      </View>
    </View>
  );
  return view;
}

BalanceView.propTypes = {
  currentBalanceValue: PropTypes.number.isRequired,
  currentSpentValue: PropTypes.number.isRequired,
};

export default BalanceView;
