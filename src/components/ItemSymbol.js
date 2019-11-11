import React from 'react';
import { Text } from 'react-native';

const ItemSymbol = (props) => {
  const { item } = props;
  return (
    <Text style={{
      flex: 0.1,
      color: item.category.color,

      paddingRight: 10,

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'dotted',
    }}
    >
      o
    </Text>
  );
};

export default ItemSymbol;
