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


const makeTooltipContent = (text) => (
  <View style={styles.tooltipView}>
    <Text style={styles.tooltipText}>{ text }</Text>
  </View>
);

export default [
  {
    id: 'category-scroller',
    content: makeTooltipContent('pick a category'),
  },
  // {
  //   id: 'profile-name',
  //   content: makeTooltipContent("Here is the user's name"),
  //   placement: 'bottom',
  //   triggerEvent: 'profile-focus',
  // },
];

