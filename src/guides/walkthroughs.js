import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import colors from '../../colors';


// import styles from '../../styles';

const styles = StyleSheet.create({
  tooltipView: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tooltipText: {
    color: colors.black,
    fontSize: 18,
  },
});


// let tooltipView = {
//     paddingHorizontal: 24,
//     paddingVertical: 8,
// }

// let tooltipText = {
//     color: 'black',
//     fontSize: 18,
// }

const makeTooltipContent = (text) => (
  <View style={styles.tooltipView}>
    <Text style={
      [
        // styles.tooltipText,
        {
          textAlign: 'center',
        }
      ]
    }>{ text }</Text>
  </View>
);

// export const addTransactionWalkthrough = [
//   // {
//   //   id: 'start-button',
//   //   content: makeTooltipContent('Hello'),
//   // },
//   {
//     id: 'category-scroller',
//     content: makeTooltipContent('select a category'),
//   },
//   {
//     id: 'keypad-amount',
//     content: makeTooltipContent('enter an amount'),
//   },

//   {
//     id: 'add-button',
//     content: makeTooltipContent('press the add button'),
//   },
//   // {
//   //   id: 'balance-view',
//   //   content: makeTooltipContent('This is shows you the balance'),
//   // },
//   // {
//   //   id: 'transaction-table',
//   //   content: makeTooltipContent('This is where all of your previous transactions are displayed'),
//   // },
//   // {
//   //   id: 'profile-name',
//   //   content: makeTooltipContent("Here is the user's name"),
//   //   placement: 'bottom',
//   //   triggerEvent: 'profile-focus',
//   // },
// ];

export const addTransactionCategoryWalkthrough = [
  {
    id: 'category-scroller',
    content: makeTooltipContent('please select a category'),
  },
];

export const addAmountWalkthrough = [
  {
    id: 'keypad-amount',
    content: makeTooltipContent('enter an amount for your transaction'),
  },
];

export const pressAddBtnWalkthrough = [
  {
    id: 'add-button',
    content: makeTooltipContent('press the add button'),
  },
];

export const createCategoryWalkthrough = [
  {
    id: 'add-new-category-button',
    content: makeTooltipContent('click here to\nmake a new category'),
  },
];


// module.exports = {
//   addTransactionCategoryWalkthrough,
//   addTransactionWalkthrough,
// }
