import React from 'react';

import {
  Text,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from 'src/colors';

import styles from '../../../styles';

export default function CellItem({
  item,
  selected,
  onPress,
}) {
  const view = (
    <TouchableOpacity
      // activeOpacity={0.1}
      style={[
        styles.tableItemStyle,
        {
          // flex: 1,
          // alignItems: 'flex-start',
          backgroundColor: selected ? colors.darkGreyBlue : colors.dark,
        },
      ]}
      selected={selected}
      onPress={onPress}
    >

      <Text
        style={
          [
            styles.listItemTitleStyle,
            {
              color: item.color,
            },
          ]
        }
      >
        { item.name }
      </Text>
    </TouchableOpacity>
  );
  return view;
}
