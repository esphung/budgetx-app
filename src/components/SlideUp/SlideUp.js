import React from 'react';

import {
  StyleSheet,
  Animated,
  // Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

function SlideUpViews(props) {
  const {
    slideViewBounceValue,
    // toggleSlideView
    // currentType,
    // onPress
  } = props;

  const view = (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
    </Animated.View>
  );

  return view;
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
