import React from 'react';

import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

// ui colors
import colors from '../../../../colors';

import styles from '../../../../styles';

export default function ItemNote(props) {
  const { note } = props;

  return (
    <View
      style={
        {
          // borderWidth: global.debugMode ? 1 : 0,
          // borderColor: global.debugMode ? 'white' : null,
        }
      }
    >
      <Text
        numberOfLines={1}
        style={
          [
            styles.textStyle,
            {
              color: colors.offWhite,
            },
          ]
        }
      >
        { note }
      </Text>
    </View>
  );
}

ItemNote.propTypes = {
  note: PropTypes.string,
};

ItemNote.defaultProps = {
  note: PropTypes.string,
};
