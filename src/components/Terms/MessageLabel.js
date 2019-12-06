import React from 'react';

import PropTypes from 'prop-types';

import {
  Text,
} from 'react-native';

import colors from 'main/colors';

function MessageLabel(props) {
  const { message } = props;
  return (
    <Text style={
      {

        fontFamily: 'SFProDisplay-Regular',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,
        color: colors.offWhite,

        paddingHorizontal: '6%',

        paddingTop: '2%',

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

MessageLabel.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MessageLabel;
