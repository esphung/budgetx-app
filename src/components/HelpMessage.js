import React from 'react';

import { Text, View } from 'react-native';

// import colors from '../../../colors';

import styles from '../../styles';


import PropTypes from 'prop-types';

function HelpMessage(props) {
  const { message } = props;
  return (
    <View style={
        {
          // flex: 0.12,
          // position: 'absolute',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    >
      <Text
        style={
          [
            styles.helpMessageText,
            {
              // opacity: 0.3,
              // color: 'white',
            }
          ]
        }
      >
        { message }
      </Text>
    </View>
  );
}

HelpMessage.propTypes = {
  message : PropTypes.string,
};

export default HelpMessage;
