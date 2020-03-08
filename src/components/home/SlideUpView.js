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
    // clearState,
    dismiss,
    updateTransactionCategory
  } = props;

  // console.log(transaction);

  // const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(true);

  const [top, setTop] = useState('58%');

  function setWindowHeight(value) {
    // console.log(value);
    setTop(value);
  }

  const keyboardAvoidingView = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      // enabled={isKeyboardAvoidEnabled}
      // enabled
      style={{
        // flex: 1,
        width: '100%',
        // height: '90%',
        // bottom: '0%',
        

        // top: '58%',

        // top: '38%', // WITH CALENDAR PICKER!!

        // top: top,

        // top: 480,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dashed',

        // zIndex: -1,

        // backgroundColor: colors.darkTwo,
        // backgroundColor: 'transparent',


      }}
    >
      <SafeAreaView
        style={
          {
            flex: 1,
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
                dismiss={dismiss}
                updateTransactionNote={updateTransactionNote}
                transaction={transaction}
                onDateChange={props.onDateChange}
                // setWindowHeight={setWindowHeight}
                updateTransactionCategory={updateTransactionCategory}
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
