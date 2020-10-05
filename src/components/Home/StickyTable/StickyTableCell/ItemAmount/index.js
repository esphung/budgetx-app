/*
FILENAME:  ItemAmount.js
PURPOSE:   transaction amount for budget x app
AUTHOR:    Eric Phung
CREATED:   12/04/2019 07:15 PM
*/

import React from 'react';

import { Text, View } from 'react-native';

import colors from 'src/colors';

import styles from 'styles/StickyTable';

function ItemAmount({ amount, type }) {
  if (isNaN(amount)) {
    amount = 0;
  }
  const view = (
    <View
      style={styles.itemAmountRow}
    >
      <Text
        style={
          [
            styles.itemAmountText,
            {
              color: colors.offWhite,
            },
          ]
        }
      >
        {`${(type === 'EXPENSE' ? '-' : '')}`}
        {' '}
      </Text>
      <Text style={styles.itemAmountText}>
        {`${Math.abs(amount).toFixed(2)}`}
      </Text>
      <Text
        style={[
          styles.itemAmountText,
          {
            color: colors.offWhite,
          },
        ]}
      >
        {' '}
        {`${'$'}`}
      </Text>
    </View>
  );
  return view;
}

export default ItemAmount;
