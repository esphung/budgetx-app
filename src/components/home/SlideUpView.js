import React from 'react';

import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';

// ui colors
import colors from '../../../colors';

import SlideUpTransactionRect from './SlideUpTransactionRect';

import NoteTextInput from '../NoteTextInput';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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

    // top: '69%', // '69%',
    bottom: '0%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});

function SlideUpView(props) {
  const {
    slideViewBounceValue,
    transaction,
    updateStoredTransactionNote,
  } = props;

  // console.log(transaction);

  const view = (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
        <View
          style={
            {
              flex: 1,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <SlideUpTransactionRect transaction={transaction} />
        </View>

        <View
          style={
            {
              flex: 1,
              // alignItems: 'center',
              // alignSelf: 'stretch',
              // justifyContent: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >

          <NoteTextInput
            transaction={transaction}
            // handleNoteChange={handleNoteChange}
            updateStoredTransactionNote={updateStoredTransactionNote}
          />

        </View>
    </Animated.View>
  );

  return view;
}

export default SlideUpView;
