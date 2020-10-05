/*
FILENAME:  ItemSymbol.js
PURPOSE:   ItemSymbol
AUTHOR:    Eric Phung
CREATED:   01/29/2020 11:22 PM
UPDATED:   01/29/2020 11:22 PM
*/

import React from 'react';

import { Entypo } from '@expo/vector-icons';

import { View } from 'react-native';

import styles from 'src/styles/StickyTable';

function ItemSymbol({ color }) {
  const view = (
    <View style={styles.itemSymbolStyle}>
      <Entypo name="circle" size={styles.itemSymbolStyle.fontSize} color={color} />
    </View>
  );
  return view;
}

export default ItemSymbol;
