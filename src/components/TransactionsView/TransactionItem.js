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
import colors from '../../../colors';

import ItemSymbol from './ItemSymbol';
import ItemCategory from './ItemCategory';
// import ItemPayee from './ItemPayee';
import ItemNameInput from './ItemNameInput';
// import ItemDate from './ItemDate';
import ItemAmount from './ItemAmount';

const TransactionItem = (props) => {
    const {
      item,
      onPress,
      currentTransaction,
      // isEnabled,
      isSelected
    } = props;


    // find headers
    // let isHeader = item.isHeader;

    //  item css
    // let borderWidth = 0;
    let textColor = 'rgba(255, 255, 255, 0.5)';

    if (isSelected) {
      // borderWidth = 1;
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

          <ItemSymbol item={item} />

          <ItemCategory
            // item={item}
            // isCurrentTransaction={isCurrentTransaction}
            item={item}
 
            color={textColor}
          />

          <ItemNameInput item={item} />

          {/* <ItemDate item={item} /> */}

          <ItemAmount item={item} />


        </View>
      </TouchableOpacity>
    );
}


export default TransactionItem;

