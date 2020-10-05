import React from 'react';

import { View } from 'react-native';

// ui colors
import colors from 'src/colors';

export default function SlideViewSeparator() {
  return (
    <View
      style={
        {
          alignSelf: 'center',
          width: 134,
          height: 5,

          margin: 13,

          borderRadius: 100,
          backgroundColor: colors.white,

          borderWidth: 1,
          borderColor: 'white',
          borderStyle: 'solid',
        }
      }
    />
  );
}
