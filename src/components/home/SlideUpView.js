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

          isEditable,
      value,
      handleChange,
  } = props;

  const keyboardAvoidingView = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      // behavior={Platform.OS === 'ios' ? 'position' : null}
      // behavior="position"
      // enabled={isKeyboardAvoidEnabled}
      // enabled
      style={{
        width: '100%',
        top: (shouldShowCalendarPicker) ? -150 : 0,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dashed',

        borderRadius: 9,
        // backgroundColor: colors.dark,
        shadowColor: '#0f1725',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowRadius: 16,
        shadowOpacity: 1,


        // zIndex: 1,
      }}
    >
      <SafeAreaView
        style={
          {
            // flex: Platform.OS === 'ios' ? 1: 0,
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
                isEditable={true}
                value={value}
                handleChange={handleChange}
 
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
