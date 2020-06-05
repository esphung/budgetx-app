import React from 'react';

import {
  // StyleSheet,
  View,
  // Text,
  // ScrollView,
  // TouchableOpacity, // better for not opening slide view
  ActivityIndicator
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

// import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../../../colors';

import styles from '../../../../styles';

import CategoryLabel from './CategoryLabel';

import ItemSymbol from './ItemSymbol';

import ItemNote from './ItemNote';

import ItemAmount from './ItemAmount';

import uuidv4 from '../../../functions/uuidv4';

function TransactionItem(props, index) {
  const {
    item,
    onPress,
    currentTransaction,
    isNameInputEnabled,
    isUpdatingTransaction,
    updateStoredTransaction,
  } = props;

  if (item.category === null) {
    // console.log('item.category: ', item.category);
    item.category = {
      id: uuidv4(),
      name: 'None',
      color: '#ddd',
      owner: global.storageKey,
      type: 'INCOME',
      version: 0,
    }
  }

  

  // console.log('item: ', item);

  let { category } = item;



  let name = '';

  if (category) {
    name = category.name;
  }

  let textColor = colors.white; // 'rgba(255, 255, 255, 0.5)';

  if (currentTransaction === item) {
    textColor = `${category.color}`; // item.category.color + '0f';
  }

  // if (!category.color) return <View />;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        {
          paddingLeft: 10,

          borderWidth: global.debugMode ? 1 : 0,
          borderColor: global.debugMode ? 'red' : null,
        }
      }
    >
{/*    {
      isUpdatingTransaction && currentTransaction && (currentTransaction.id === item.id) &&
      <View style={
        [
          {
            backgroundColor: colors.dark,
            opacity:  0.4,
          },
          styles.loading
          ]
        }
      >
        <ActivityIndicator size='small' />
      </View>
    }*/}

      <View style={{
        alignItems: 'center',
        flexDirection: 'row',

      }}
      >

        <View style={{
          // flex: 0.2,
          // justifyContent: 'center',
          // alignItems: 'center',

          paddingBottom: 4,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
        >
          <ItemSymbol color={category.color} />
        </View>

        <View style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',

          borderWidth: global.debugMode ? 1 : 0,
          borderColor: 'white',
          borderStyle: 'solid',
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
              flex: 1,
              justifyContent: 'center',
              // alignItems: 'center',
              // alignSelf: 'flex-start',
              paddingLeft: 4,

              borderWidth: global.debugMode ? 1 : 0,
              borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
         <ItemNote note={item.note} />
        </View>

        {/* <ItemDate item={item} /> */}

       <View  style={
        {
          justifyContent: 'center',
        }
       }>
       <View
          style={
            {
              
              flex: 1,
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              
              borderWidth: global.debugMode ? 1 : 0,
              borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <ItemAmount item={item} />
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}


export default TransactionItem;
