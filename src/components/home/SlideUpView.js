import React from 'react';

import {
  StyleSheet,
  Animated,
} from 'react-native';

// ui colors
import colors from '../../../colors';

import SlideUpTransactionRect from './SlideUpTransactionRect';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '30%',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: colors.darkTwo,
    // height: '100%',

    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    top: '69%', // '69%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});

function SlideUpView(props) {
  const {
    slideViewBounceValue,
    transaction,
  } = props;
  // console.log(transaction)
  const view = (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
      <SlideUpTransactionRect transaction={transaction} />
    </Animated.View>
  );

  return view;
}

export default SlideUpView;
