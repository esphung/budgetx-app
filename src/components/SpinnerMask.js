/*
FILENAME:  SpinnerMask.js
PURPOSE:   full screen Spinner for budget x app
AUTHOR:    Eric Phung
CREATED:   12/10/2019 12:54 AM
UPDATED:   12/10/2019 12:54 AM
*/

import React from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import colors from 'main/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    opacity: 0.975, // 0.1

    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});

function SpinnerMask() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff7f" />
    </View>
  );
}

export default SpinnerMask;
