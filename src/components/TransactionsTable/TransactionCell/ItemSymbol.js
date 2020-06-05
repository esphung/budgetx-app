/*
FILENAME:  ItemSymbol.js
PURPOSE:   ItemSymbol
AUTHOR:    Eric Phung
CREATED:   01/29/2020 11:22 PM
UPDATED:   01/29/2020 11:22 PM
*/

import React from 'react';

import PropTypes from 'prop-types';

import { Text } from 'react-native';

import styles from '../../../../styles';

function ItemSymbol(props) {
  const {
    color,
  } = props;

  return (
    <Text
      style={
        [
          styles.itemSymbolStyle,
          {
            // flex: 1,
            paddingTop: 2,
            color: color,
            borderWidth: global.debugMode ? 1 : 0,
            borderColor: 'white',
            borderStyle: 'solid',
          }
        ]
    }
    >
      o
    </Text>
  );
}

ItemSymbol.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ItemSymbol;
