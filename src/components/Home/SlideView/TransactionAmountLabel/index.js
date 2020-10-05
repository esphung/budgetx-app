/*
FILENAME:  ItemAmount.js
PURPOSE:   transaction amount for budget x app
AUTHOR:    Eric Phung
CREATED:   12/04/2019 07:15 PM
*/

import React from 'react';

import { Text, View } from 'react-native';

import styles from 'styles/SlideView';

function ItemAmount({ amount }) {
  const view = (
    <View style={styles.itemAmountRow}>
      <Text style={styles.itemAmountText}>
        <Text style={{ color: 'grey' }}>
          $
          {' '}
        </Text>
        {
          `${(Number(amount).toFixed(2) >= 0) ? Number(amount).toFixed(2) : Number(amount).toFixed(2) * -1}`
        }
      </Text>
    </View>
  );
  return view;
}

export default ItemAmount;
