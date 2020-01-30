/*
FILENAME:  ItemSymbol.js
PURPOSE:   ItemSymbol
AUTHOR:    Eric Phung
CREATED:   01/29/2020 11:22 PM
UPDATED:   01/29/2020 11:22 PM
*/

import React from 'react';

import PropTypes from 'prop-types';

import {
  Text,
} from 'react-native';

import styles from 'main/styles';

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
            color: `${color}`,
            // fontFamily: 'SFProDisplay-Semibold',
            // fontSize: 17,
            // fontWeight: 'normal',
            // fontStyle: 'normal',
            // letterSpacing: 0.13,
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