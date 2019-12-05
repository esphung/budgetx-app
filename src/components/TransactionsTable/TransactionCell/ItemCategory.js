/*
FILENAME:  ItemCategory.js
PURPOSE:   category label for transaction item
AUTHOR:    Eric Phung
CREATED:   12/04/2019 06:53 PM
UPDATED:   12/04/2019 06:53 PM
*/

import React from 'react';

import { Text, View } from 'react-native';

function ItemCategory(props) {
  const {
    item,
    textColor
  } = props;

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
    }}
    >
      <Text style={
        {
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,
          color: textColor, // 'rgba(255, 255, 255, 0.5)',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dotted',
        }
      }
      >

        {
          item.category.name.replace(/^(.{1}[^\s]*).*/, '$1')
        }

      </Text>
    </View>
  );
}

export default ItemCategory;
