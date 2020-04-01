/*
FILENAME:  ItemAmount.js
PURPOSE:   transaction amount for budget x app
AUTHOR:    Eric Phung
CREATED:   12/04/2019 07:15 PM
UPDATED:   12/04/2019 07:15 PM
*/

import React from 'react';

import { View, Text } from 'react-native';

// ui colors
import colors from '../../../../colors';

import getCurrencySymbol from '../../../functions/getCurrencySymbol';

function ItemAmount(props) {
  const { item } = props;

  let amount = {item}

  if (item.type !== 'EXPENSE')
    amount = amount * 1

  return (
    <Text  style={
      {
        paddingRight: 10,
      }
    }>
      <Text style={{
        // width: '100%',
        // height: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
        fontSize: 17,
        // fontWeight: 'normal',
        // fontStyle: 'normal',
        // letterSpacing: 0.29,
        textAlign: 'right',
        color: colors.offWhite,
      }}
      >
        {`${getCurrencySymbol(item.amount)}`}
      </Text>

      <Text style={{
        // width: '100%',
        // height: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
        fontSize: 17,
        // fontWeight: 'normal',
        // fontStyle: 'normal',
        // letterSpacing: 0.29,

        color: colors.white,
      }}
      >
        {`${Math.abs(item.amount).toFixed(2)}`}

      </Text>
    </Text>
  );
}

export default ItemAmount;
