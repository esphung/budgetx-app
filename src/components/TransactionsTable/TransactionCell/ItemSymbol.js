import React from 'react';

import { Text, View } from 'react-native';

function ItemSymbol(props) {
  const { item } = props;
  return (
    <View style={{
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'dotted',
    }}
    >
      <Text style={{
        color: `${item.category.color}`,
        fontFamily: 'SFProDisplay-Semibold',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,
      }}
      >
        o
      </Text>
    </View>
  );
}

export default ItemSymbol;
