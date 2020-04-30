import React, { useState } from 'react';

import {
  // StyleSheet,
  Animated,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  // Text,
  SafeAreaView,
  // TextInput,
  // Button,
  // FlatList,
  Platform,
} from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
// import colors from 'main/colors';

import styles from '../../../styles';

import colors from '../../../colors';

// import SlideViewSeparator from '../SlideViewSeparator';

import SlideUpTransactionRect from './SlideUpTransactionRect';

// import NoteTextInput from '../NoteTextInput';

function SlideUpView(props) {
  const {
    slideViewBounceValue,
    transaction,
    updateTransactionNote,
    updateTransactionCategory,
    top,
    updateTransactionDate,
    shouldShowCalendarPicker,
    setShouldShowCalendarPicker,
    setTop,
    isUpdatingTransaction,
  } = props;

  const keyboardAvoidingView = (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : null}
      // behavior={Platform.OS === 'ios' ? 'position' : null}
      behavior="position"
      // enabled={isKeyboardAvoidEnabled}
      // enabled
      style={{
        width: '100%',
        top: -140,
        // borderWidth: 1,
        // borderColor: 'white',
        // // borderStyle: 'dashed',

        // zIndex: 1,
      }}
    >
      <SafeAreaView
        style={
          {
            flex: Platform.OS === 'ios' ? 1: 0,
          }
        }
      >
        <Animated.View
          style={
            [
              styles.slideView,
              {
                transform:
                [
                  {
                    translateY: slideViewBounceValue,
                  },
                ]
              }
            ]
          }
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerSlide}>
              <SlideUpTransactionRect
                // handleTransactionChange={props.handleTransactionChange}
                // dismiss={dismiss}
                updateTransactionNote={updateTransactionNote}
                transaction={transaction}
                updateTransactionDate={updateTransactionDate}
                updateTransactionCategory={updateTransactionCategory}
                shouldShowCalendarPicker={shouldShowCalendarPicker}
                setShouldShowCalendarPicker={setShouldShowCalendarPicker}
                setTop={setTop}
                isUpdatingTransaction={isUpdatingTransaction}
 
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );

  return keyboardAvoidingView;
}

export default SlideUpView;
