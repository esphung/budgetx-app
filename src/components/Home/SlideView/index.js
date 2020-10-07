// Slide View Layout

import React, { useRef, useEffect, useState } from 'react';

import {
  View,
  Text,
  // ScrollView,
  SafeAreaView,
  // TouchableOpacity,
  // Dimensions,
} from 'react-native';

import colors from 'colors';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import GestureRecognizer from 'react-native-swipe-gestures';

import styles from 'styles/SlideView';

import getFormattedDateString from 'functions/getFormattedDateString';

import SlideViewSeparator from './SlideViewSeparator';

import TransactionAmountLabel from './TransactionAmountLabel';

import ScrollingPills from './ScrollingPills';

import NoteTextInput from './NoteTextInput';

import AmountInput from './AmountInput';

import Calender from './Calender';

// const screen = Dimensions.get('screen');

const SlideView = ({
  currentCategory,
  currentNote,
  setCurrentNote,
  updateTransactionCategory,
  currentTransaction,
  categoryBtnPressed,
  currentCategories,
  isCurrentCategory,
  updateTransactionNote,
  handleAmountInputChange,
  currentAmount,
  setCurrentAmount,
  currentType,
  updateTransactionAmount,
  updateTransactionDate,
}) => {
  const amountInputRef = useRef(null);

  const noteTextInputRef = useRef(null);

  const focusOnNoteInput = () => {
    inputFocus(noteTextInputRef);
  };
  const focusOnAmountInput = () => {
    inputFocus(amountInputRef);
  };

  const inputFocus = (ref) => {
    ref.current.focus();
  };
  // useEffect(() => {
  //   // console.log('amountInputRef: ', amountInputRef);
  //   // if (amountInputRef) inputFocus(amountInputRef)
  //   focusOnNoteInput()
  //   return () => {
  //     // effect
  //   };
  // }, []);

  const [isFocusedNoteInput, setIsFocusedNoteInput] = useState(false);

  const view = (
    <SafeAreaView
      style={{
        backgroundColor: colors.darkTwo,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        // borderTopColor: colors.darkTwo,
        // borderTopWidth: 1,
      }}
    >
      <SlideViewSeparator />
      <TouchableOpacity
        disabled
        style={styles.dateLabel}
      >
        <View style={styles.dateAmountRectangle}>
          <Text style={styles.dateLabelText}>
            { getFormattedDateString(currentTransaction.date) }
          </Text>
          <TransactionAmountLabel
            amount={Number(currentAmount).toFixed(2)}
            type={currentType}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.card}>
        {
          isFocusedNoteInput &&
          <View style={styles.scrollingPillsFlatlist}>
          <ScrollingPills
            categoryBtnPressed={categoryBtnPressed}
            currentCategories={currentCategories}
            isCurrentCategory={isCurrentCategory}
            currentCategory={currentCategory}
            updateTransactionCategory={updateTransactionCategory}
          />
        </View>
      }
        <View style={styles.noteTextInput}>
          <NoteTextInput
            refField={noteTextInputRef}
            inputFocus={inputFocus}
            currentNote={currentNote}
            updateTransactionNote={updateTransactionNote}
            setCurrentNote={setCurrentNote}
            focusOnAmountInput={focusOnAmountInput}
            setIsFocusedNoteInput={setIsFocusedNoteInput}
            isFocusedNoteInput={isFocusedNoteInput}
          />
        </View>
        <View style={styles.amountInput}>
          <AmountInput
            refField={amountInputRef}
            inputFocus={inputFocus}
            handleAmountInputChange={handleAmountInputChange}
            currentAmount={currentAmount}
            setCurrentAmount={setCurrentAmount}
            updateTransactionAmount={updateTransactionAmount}
            focusOnNoteInput={focusOnNoteInput}
          />
        </View>
        <View>
          <Calender updateTransactionDate={updateTransactionDate} />
        </View>
      </View>
    </SafeAreaView>
  );
  return view;
};

export default SlideView;
