/*
FILENAME:  ItemCategory.js
PURPOSE:   category label for transaction item
AUTHOR:    Eric Phung
CREATED:   12/04/2019 06:53 PM
UPDATED:   12/04/2019 06:53 PM
*/

import React from 'react';

import { Text, View } from 'react-native';

import styles from 'main/styles';

function ItemCategory(props) {
  const {
    item,
    textColor
  } = props;

  let name = item.category.name;

  if (name.length > 10) {
    name = item.category.name.replace(/^(.{6}[^\s]*).*/, '$1');
  }

  return (

      <Text style={
        [
          styles.textStyle,
          {
            // fontFamily: 'SFProDisplay-Regular',
            // fontSize: 17,
            // fontWeight: 'normal',
            // fontStyle: 'normal',
            // letterSpacing: 0.13,
            color: textColor, // 'rgba(255, 255, 255, 0.5)',
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        ]
      }
      >

        {
          name
        }

      </Text>

  );
}

export default ItemCategory;
