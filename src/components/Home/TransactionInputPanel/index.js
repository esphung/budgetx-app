// Transaction Input Layout
import React from 'react';

import {
  ScrollView,
  // Text,
  View,
  // StyleSheet,
  // Dimensions,
} from 'react-native';

// import Constants from 'expo-constants';

import styles from 'styles/TransactionInputPanel';

import ScrollingPillCategoriesView from './ScrollingPills';

import AmountInput from './AmountInput';

import KeypadView from './Keypad';

const TransactionInputPanel = ({
  // Scrolling pills
  categoryBtnPressed,
  currentCategories,
  isCurrentCategory,

  // AmountInput
  isAmountInputEditable,
  inputAmountValue,
  handleAmountInputChange,

  // Keypad
  numberBtnPressed,
  addBtnPressed,
  backspaceBtnPressed,
}) => {
  const scrollingPills = (
    <ScrollingPillCategoriesView
      categoryBtnPressed={categoryBtnPressed}
      categories={currentCategories}
      isCurrentCategory={isCurrentCategory}
    />
  );
  const amountInput = (
    <AmountInput
      isAmountInputEditable={isAmountInputEditable}
      inputAmountValue={inputAmountValue}
      handleAmountInputChange={handleAmountInputChange}
    />
  );
  const keypad = (
    <KeypadView
      numberBtnPressed={numberBtnPressed}
      addBtnPressed={addBtnPressed}
      backspaceBtnPressed={backspaceBtnPressed}
    />
  );
  const view = (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.scrollingPills}>
        { scrollingPills }
      </View>
      <View style={styles.amountInput}>
        { amountInput }
      </View>
      <View style={styles.keypadInput}>
        { keypad }
      </View>
    </ScrollView>
  );
  return view;
};

export default TransactionInputPanel;
