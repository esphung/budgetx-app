import React from 'react';

import { Text, View } from 'react-native';

// ui colors
import colors from '../../../colors';

function ItemPayee(props) {
  const { item } = props;

  return (
    <View style={
      {
        flex: 1,
        justifyContent: 'center',

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dotted',
      }
    }
    >
      <Text style={
        {
          fontFamily: 'SFProDisplay-Semibold',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,
          color: colors.white,
        }
      }
      >
        {`${item.payee.name}`}

      </Text>
    </View>
  );
};

export default ItemPayee;
