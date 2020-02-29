import React from 'react';

import {
  // StyleSheet,
  View,
  // Text,
  // ScrollView,
  TouchableOpacity, // better for not opening slide view
} from 'react-native';

// import {
//   TouchableOpacity,
// } from 'react-native-gesture-handler';

// import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../../../colors';

import CategoryLabel from '../../../../storybook/stories/CategoryLabel';

import ItemSymbol from './ItemSymbol';

// import ItemPayee from './ItemPayee';
import ItemNameInput from './ItemNameInput';
// import ItemDate from './ItemDate';
import ItemAmount from './ItemAmount';

function TransactionItem(props) {
  const {
    item,
    onPress,
    currentTransaction,
    isNameInputEnabled,
  } = props;

  // console.log('item: ', item);

  let { category } = item;

  let name = '';

  if (category) {
    name = category.name;
  }

  let textColor = colors.offWhite; // 'rgba(255, 255, 255, 0.5)';

  if (currentTransaction === item) {
    textColor = `${category.color}`; // item.category.color + '0f';
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        {
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',

          // borderWidth: 1,
          // borderColor: '#ffffff',
          // borderStyle: 'solid',

          // marginHorizontal: 5,

          paddingVertical: 8,

          paddingHorizontal: 4,

          // backgroundColor
        }
      }
    >
      <View style={{
        flex: 1,
        flexDirection: 'row',

      }}
      >

        <View style={{
          flex: 0.25,
          justifyContent: 'center',
          alignItems: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
        >
          <ItemSymbol color={category.color} />
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
        >
          <CategoryLabel
            // item={item}
            // name={category.name}
            // name="Hello"
            name={name}
            textColor={textColor}
          />
        </View>

        <View
          style={
            {
              flex: 1, // 1
              justifyContent: 'center',
              // alignItems: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <ItemNameInput isNameInputEnabled={isNameInputEnabled} item={item} handlePayeeNameChange={props.handlePayeeNameChange} />
        </View>

        {/* <ItemDate item={item} /> */}

        <ItemAmount item={item} />
      </View>
    </TouchableOpacity>
  );
}


export default TransactionItem;
