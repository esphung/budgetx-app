import React from 'react';
import { Text, View } from 'react-native';

const ItemSymbol = (props) => {
  const { item } = props;
  return (
    <View style={{
      flex: 0.3,

      justifyContent: 'center',

      alignItems: 'center',

      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'dotted',
    }}
    >
      <Text style={{
        // flex: 0.1,
        color: item.category.color,

        fontFamily: 'SFProDisplay-Semibold',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,

        // paddingRight: 10,
      }}
      >
        o
      </Text>
    </View>
  );
};

export default ItemSymbol;
