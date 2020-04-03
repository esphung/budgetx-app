import React from 'react'

import {
  View,
  ActivityIndicator
} from 'react-native'

export const spinner = (
  <View
    style={
      {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        opacity: 0.1,
        zIndex: 1,
      }
    }
  >
    <ActivityIndicator size="large" color="#ff7dsff" />
  </View>
);
