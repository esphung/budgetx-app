/*
FILENAME:  AmountInput.js
PURPOSE:   view. for amount label, input, and currency symbol
AUTHOR:    Eric Phung
CREATED:   10/11/2019 02:36 PM
*/
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
} from 'react-native';

import colors from 'src/colors';

import styles from 'styles/AmountInput';

import formatMoney from 'functions/formatMoney';

import CurrencyInput from './CurrencyInput';

const AmountInput = ({
  handleAmountInputChange,
  currentAmount,
  setCurrentAmount,
  updateTransactionAmount,
  refField,

}) => {
  const [displayValue, setDisplayValue] = useState(Number(currentAmount).toFixed(2));
  // console.log('value: ', value);
  // const onFocus = () => fullSlideView();

  const onChangeText = (text) => {
    if (isNaN(text)) {
      return;
    }
    else {
      setDisplayValue(text);
      setCurrentAmount(text);
      // console.log('Number(text).toFixed(2): ', Number(text).toFixed(2));
    }
  };
  const onEndEditing = (value) => {

    updateTransactionAmount(value.nativeEvent.text.trim())
  };
  React.useEffect(() => {
    refField.current.focus();
    return () => {
      // effect
    };
  }, [])

  const view = (
    <View style={styles.amountInputView}>
      <View
        style={
          {
            flex: 1,
          }
        }
      >
        <Text style={styles.amountInputLabel}>Amount Spent:</Text>
      </View>
      <TextInput
        isEditable={true}
        ref={refField}
        placeholder={String(Math.abs(displayValue).toFixed(2))}
        // placeholderTextColor={colors.offWhite}
        // clearTextOnFocus
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={String(displayValue)}
        style={styles.amountInputCurrency}
        onEndEditing={onEndEditing}
        keyboardAppearance="dark"
        returnKeyType="done"

      />
      <View>
        <Text style={styles.amountInputSymbol}>$</Text>
      </View>
    </View>
  );
  return view;
};

export default AmountInput;
