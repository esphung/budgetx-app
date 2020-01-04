/*
FILENAME:  SpinnerMask.js
PURPOSE:   full screen Spinner for budget x app
AUTHOR:    Eric Phung
CREATED:    12/10/2019 12:54 AM
UPDATED:    12/10/2019 12:54 AM
            12/30/2019 12:47 PM
*/

import React from 'react';

import {
  View,
  ActivityIndicator,
} from 'react-native';

import colors from 'main/colors';

function SpinnerMask() {
  const spinnerView = (
    <View
      style={
        {
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkTwo,
        }
      }
    >
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );
  return spinnerView;
}

export default SpinnerMask;
