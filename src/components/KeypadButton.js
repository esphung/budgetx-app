import React from 'react';

import {
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

export default function KeypadButton(props) {
  const { onPress, value } = props;

  let btnTextColor = '#ffffff';
  let btnBorderWidth = 0;
  let btnBorderColor = '#ffffff';

  if (value === 'Add') {
    // console.log(this.props.value)
    btnTextColor = colors.shamrockGreen;
    btnBorderWidth = 1;
    btnBorderColor = colors.shamrockGreen;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        {
          justifyContent: 'center',
          alignItems: 'center',

          width: '30%', // 117,
          // height: 46,
          height: '100%',
          borderRadius: 5,
          backgroundColor: colors.dark,
          shadowColor: '#0c1422',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 0,
          shadowOpacity: 1,

          borderWidth: btnBorderWidth,
          borderColor: btnBorderColor,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',

        }

      }
    >
      <Text
        style={{

          width: '100%', // 117,
          height: 30,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.29,
          textAlign: 'center',
          color: btnTextColor,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }}
      >
        {value}
      </Text>

    </TouchableOpacity>


  );
}
