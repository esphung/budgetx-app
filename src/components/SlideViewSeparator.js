import React from 'react';

import { View } from 'react-native';

// ui colors
import colors from '../../colors';

export default function SlideViewSeparator() {
  return (
    <View
      style={
        {
          alignSelf: 'center',
          width: '35%', // 134,
          height: '3%', // 5,

          margin: 13,

          borderRadius: 100,
          backgroundColor: colors.white,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    />
  );
}
