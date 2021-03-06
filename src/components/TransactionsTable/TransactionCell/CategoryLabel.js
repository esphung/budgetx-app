/*
FILENAME:   CategoryLabel.js
PURPOSE:    category label for transaction item cell (used to be ItemCategory)
AUTHOR:     Eric Phung
CREATED:    12/04/2019 06:53 PM
UPDATED:    12/04/2019 06:53 PM
            01/29/2020 11:11 PM
            01/29/2020 11:37 PM  | Added prop types
*/

import React from 'react';

// import PropTypes from 'prop-types';

import {
  Text,
} from 'react-native';

import colors from '../../../../colors';

import styles from '../../../../styles';

function CategoryLabel(props) {
  let {
    // item,
    name,
  } = props;

  if (!name) return (
    <Text style={
      [
        styles.textStyle,
        // styles.listItemTitleStyle,
        {
          color: colors.white, // 'rgba(255, 255, 255, 0.5)',
          // fontFamily: 'SFProDisplay-Regular',
          // fontSize: 17,
          // fontWeight: 'normal',
          // fontStyle: 'normal',
          // letterSpacing: 0.13,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dotted',
        }
      ]
    }
    >

      Category

    </Text>
    )

  const { textColor } = props;

  if (name.length > 10) {
    name = name.replace(/^(.{6}[^\s]*).*/, '$1');
  }

  return (
    <Text style={
      [
        styles.textStyle,
        // styles.listItemTitleStyle,
        {
          color: textColor, // 'rgba(255, 255, 255, 0.5)',
          // fontFamily: 'SFProDisplay-Regular',
          // fontSize: 17,
          // fontWeight: 'normal',
          // fontStyle: 'normal',
          // letterSpacing: 0.13,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dotted',
        }
      ]
    }
    >

      { name }

    </Text>

  );
}

// CategoryLabel.propTypes = {
//   name: PropTypes.string.isRequired,
//   textColor: PropTypes.string.isRequired,
// };

export default CategoryLabel;
