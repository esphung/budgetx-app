/*
FILENAME:   CategoryLabel.js
PURPOSE:    category label for transaction item cell (used to be ItemCategory)
AUTHOR:     Eric Phung
CREATED:    12/04/2019 06:53 PM
UPDATED:    12/04/2019 06:53 PM
*/

import React from 'react';

import { Text } from 'react-native';

import colors from 'src/colors';

import styles from 'styles/StickyTable';

function CategoryLabel({ category, selected }) {
  const view = (
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[
        styles.categoryLabelText,
        {
          color: (selected) ? category.color : colors.white,
        },
      ]}
    >
      { category.name }
    </Text>

  );
  return view;
}

export default CategoryLabel;
