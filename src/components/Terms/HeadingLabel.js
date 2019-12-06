import React from 'react';

import PropTypes from 'prop-types';

import {
  Text,
} from 'react-native';

import colors from 'main/colors';

function HeadingLabel(props) {
  const { message } = props;
  return (
    <Text style={
      {

        fontFamily: 'SFProDisplay-Regular',
        fontSize: 25,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.29,
        textAlign: 'center',
        color: colors.white,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }
    >
      { message }
    </Text>
  );
}

HeadingLabel.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HeadingLabel;
