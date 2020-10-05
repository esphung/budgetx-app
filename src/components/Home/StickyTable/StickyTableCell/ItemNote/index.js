import React from 'react';

import { Text } from 'react-native';

import styles from 'src/styles/StickyTable';

const ItemNote = ({ note }) => {
  const view = (
    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemNoteText}>
      { note }
    </Text>
  );
  return view;
};

export default ItemNote;
