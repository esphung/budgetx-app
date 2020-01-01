import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from 'main/colors';

import ItemSymbol from './ItemSymbol';
import ItemCategory from './ItemCategory';
// import ItemPayee from './ItemPayee';
import ItemNameInput from './ItemNameInput';
// import ItemDate from './ItemDate';
import ItemAmount from './ItemAmount';

function TransactionItem(props) {
    const {
      item,
      onPress,
      currentTransaction
    } = props;

    if (!item.category) {
      item.category = {
        name: 'Category',
        color: colors.white,
      }
    }

    let textColor = colors.offWhite // 'rgba(255, 255, 255, 0.5)';

    if (currentTransaction === item) {
      textColor = `${item.category.color}`; // item.category.color + '0f';
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={
          {
            // borderWidth: borderWidth,
            // borderColor: '#ffffff0f',
            // borderStyle: 'solid',

            // backgroundColor
          }
        }
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',

          paddingVertical: 8,

          marginHorizontal: 12,
        }}
        >

          <ItemSymbol color={item.category.color} />

          <ItemCategory
            item={item}
            textColor={textColor}
          />

          <ItemNameInput item={item} />

          {/* <ItemDate item={item} /> */}

          <ItemAmount item={item} />


        </View>
      </TouchableOpacity>
    );
}


export default TransactionItem;

