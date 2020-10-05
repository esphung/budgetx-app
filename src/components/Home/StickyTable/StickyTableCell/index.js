import React from 'react';

import {
  // StyleSheet,
  View,
  // Text,
  // ScrollView,
  // TouchableOpacity, // better for not opening slide view
  // ActivityIndicator,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

// import CustomSwipeCell from './CustomSwipeCell';

// ui colors
// import colors from 'src/colors';

import styles from 'styles/StickyTable';

// import uuidv4 from 'functions/uuidv4';

import CategoryLabel from './CategoryLabel';

import ItemSymbol from './ItemSymbol';

import ItemNote from './ItemNote';

import ItemAmount from './ItemAmount';

function StickyTableCell({
  item,
  onPress,
  onLongPress,
  currentTransaction,
}) {
  // console.log('item: ', item);
  const view = (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={styles.stickyTableCell}>
      <View style={styles.stickyTableRow}>
      <View style={styles.stickyTableRowIcon}>
          <ItemSymbol color={item.category.color} />
        </View>
        
        <View style={styles.stickyTableRowCategory}>
          <CategoryLabel category={item.category} selected={(currentTransaction === item)} />
        </View>
        <View style={styles.stickyTableRowNote}>
          <ItemNote note={item.note} />
        </View>
        <View style={styles.stickyTableRowAmount}>
          <ItemAmount amount={item.amount} type={item.type} />
        </View>
      </View>
    </TouchableOpacity>
  );
  return view;
}

export default StickyTableCell;
