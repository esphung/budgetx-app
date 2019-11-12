import React from 'react';

import {
  StyleSheet,
  Animated
} from 'react-native';

// ui colors
import colors from '../../../colors';

import TypeView from '../TypeView';

function SlideUpViews(props) {
  const {
    bounceValue,
    // currentType,
    // onPress
  } = props;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: bounceValue }] }]}
    >
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.darkTwo,
    // height: '100%',

    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    top: '69%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

  }
});


export default SlideUpViews;
