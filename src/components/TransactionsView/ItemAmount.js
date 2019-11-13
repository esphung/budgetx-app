import React from 'react';
import { View, Text } from 'react-native';

import getMinusSymbol from '../../functions/getMinusSymbol';

// ui colors
import colors from '../../../colors';

const ItemAmount = (props) => {
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
          // flex: 1,

          // textAlignVertical: 'center',
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
          { getMinusSymbol(item) }

        </Text>

        <Text style={{
          // flex: 1,

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
          { Math.abs(item.amount) }

        </Text>
      </Text>

    </View>
  );
};

export default ItemAmount;
