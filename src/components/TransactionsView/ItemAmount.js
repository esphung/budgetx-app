import React from 'react';

import { View, Text } from 'react-native';

// ui colors
import colors from '../../../colors';

import { getCurrencySymbol } from '../functions';

function ItemAmount(props) {
  const { item } = props;
  return (
    <View style={{
      flex: 1,

      flexDirection: 'row',

      justifyContent: 'flex-end',

      alignItems: 'center',

      // width: '100%',

      marginRight: 4,

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
    }}
    >

      <Text>

        <Text style={{
          width: '100%',
          height: 20,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.29,
          color: colors.offWhite,
        }}
        >
          {`${getCurrencySymbol(item.amount)}`}

        </Text>

        <Text style={{
          width: '100%',
          height: 20,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.29,

          color: colors.white,

        }}
        >
          {`${Math.abs(item.amount).toFixed(2)}`}

        </Text>
      </Text>

    </View>
  );
}

export default ItemAmount;
