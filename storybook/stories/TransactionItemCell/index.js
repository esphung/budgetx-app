import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  // StyleSheet,
  View,
  // Text,
  // ScrollView,
  // TouchableOpacity,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

// import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from 'main/colors';

import ItemSymbol from '../ItemSymbol';
import CategoryLabel from '../CategoryLabel';
// import ItemPayee from './ItemPayee';
// import ItemNameInput from './ItemNameInput';
// import ItemDate from './ItemDate';
// import ItemAmount from './ItemAmount';

function TransactionItemCell(props) {
  const {
    item,
    // onPress,
    // currentTransaction
  } = props;

  // console.log(item);

  // if (!item.category) {
  //   item.category = {
  //     name: 'Category',
  //     color: colors.white,
  //   }
  // }

  // category color
  const [categoryColor, setCategoryColor] = useState(colors.offWhite);

  // setCategoryColor(colors.offWhite) // 'rgba(255, 255, 255, 0.5)';

  let categoryName = 'No Category';
  if (item.category) {
    categoryName = item.category.name;
    // categoryColor = item.category.color;
  }

  const toggleCategoryColor = () => {
    if (categoryColor === colors.offWhite) {
      // categoryColor = item.category.color;
      setCategoryColor(item.category.color);
    } else {
      // categoryColor = colors.offWhite;
      setCategoryColor(colors.offWhite);
    }
    // console.log(categoryColor);
  };

  // if (currentTransaction === item) {
  //   categoryColor = `${item.category.color}`; // item.category.color + '0f';
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        // onPress()
        toggleCategoryColor();
      }}
      style={
        {
          // flex: 1,
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',

          // width: 300,

          borderWidth: 1,
          borderColor: colors.white,
          borderStyle: 'dashed',

          // marginHorizontal: 5,

          // paddingVertical: 8,

          // paddingHorizontal: 4,

          // backgroundColor
        }
      }
    >

      <View style={{
        // flex: 0.25,
        // justifyContent: 'center',
        // alignItems: 'center',

        padding: 4,


        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
      }}
      >
        <ItemSymbol color={item.category.color} />
      </View>

      <View style={{
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',

        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
      }}
      >
        <CategoryLabel
          name={categoryName}
          textColor={categoryColor}
        />
      </View>

      <View
        style={
          {
            // flex: 1, // 1
            // justifyContent: 'center',
            // alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >

        {/*<ItemNameInput item={item} />*/}

        {/* <ItemDate item={item} /> */}

        {/*<ItemAmount item={item} />*/}

      </View>


    </TouchableOpacity>
  );
}

TransactionItemCell.propTypes = {
  item: PropTypes.object.isRequired,
  // onPress: PropTypes.func.isRequired,
};


export default TransactionItemCell;

