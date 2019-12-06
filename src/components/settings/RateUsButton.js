import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

// ui colors
import colors from 'main/colors';

function RateUsButton(props) {
  const { onPress } = props;
  const view = (
    <View
      style={
        {
          width: '38%', // 133,
          height: 46,
          borderRadius: 23,
          backgroundColor: colors.azure,
        }
      }
    >
      <TouchableOpacity
        onPress={onPress}
        style={
          {
            width: '100%',
            height:
            '100%',
            justifyContent: 'center',
          }
        }
      >
        <Text
          style={
            {
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              textAlign: 'center',
              color: '#ffffff',

              alignSelf: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          Rate Us
        </Text>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default RateUsButton;
