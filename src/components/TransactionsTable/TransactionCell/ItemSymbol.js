import React from 'react';

import PropTypes from 'prop-types';

import {
  Text,
  View,
} from 'react-native';

function ItemSymbol(props) {
  const {
    color,
  } = props;
  return (
    // <View style={{
    //   flex: 0.3,
    //   justifyContent: 'center',
    //   alignItems: 'center',

    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'dotted',
    // }}
    // >
      <Text style={{
        color: `${color}`,
        fontFamily: 'SFProDisplay-Semibold',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,
      }}
      >
        o
      </Text>
    // </View>
  );
}

ItemSymbol.propTypes = {
  color: PropTypes.string.isRequired,
};


export default ItemSymbol;
