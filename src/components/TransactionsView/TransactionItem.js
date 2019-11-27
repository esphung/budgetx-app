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
      isEnabled
    } = props;

    // find current transaction
    let isCurrentTransaction = false;
    if (currentTransaction === item) {
      isCurrentTransaction = true;
    }

    // find headers
    // let isHeader = item.isHeader;

    //  item css
    // let borderWidth = 0;
    const backgroundColor = 'transparent';

    // if (isCurrentTransaction) {
    //   // borderWidth = 1;
    //   backgroundColor = `${item.category.color}${'0f'}`; // item.category.color + '0f';
    // }

    return (
      <TouchableOpacity
        disabled={!isEnabled}
        onPress={() => onPress(item)}
        style={
          {
            // borderWidth: borderWidth,
            // borderColor: '#ffffff0f',
            // borderStyle: 'solid',

            backgroundColor
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
            item={item}
            isCurrentTransaction={isCurrentTransaction} />

          <ItemNameInput item={item} />

          {/* <ItemDate item={item} /> */}

          <ItemAmount item={item} />


        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

});

export default TransactionItem;

