import React from 'react';

import { Text, View } from 'react-native';

import styles from '../screens/styles';

export default function HelpMessage(props) {
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
            styles.textStyle,
            {
              opacity: 0.3,
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
