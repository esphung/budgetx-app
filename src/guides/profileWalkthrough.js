import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tooltipView: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tooltipText: {
    color: 'black',
    fontSize: 18,
  },
});

const makeTooltipContent = text => (
  <View style={styles.tooltipView}>
    <Text style={styles.tooltipText}>{text}</Text>
  </View>
);

export default [
  // {
  //   id: 'profile-button',
  //   content: makeTooltipContent('Tap here to view a profile'),
  // },
  {
    id: 'profile-name',
    content: makeTooltipContent("Here is the user's name"),
    placement: 'bottom',
    triggerEvent: 'profile-focus',
  },
];