/*
FILENAME:  AmountInput.js
PURPOSE:   view. for amount label, input, and currency symbol
AUTHOR:    Eric Phung
CREATED:   10/11/2019 02:36 PM
*/
import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import styles from 'styles/AmountInput';

import CurrencyInput from './CurrencyInput';

const AmountInput = ({
  handleAmountInputChange,
  inputAmountValue,
  isAmountInputEditable,
}) => {
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
      <CurrencyInput
        onValueChange={handleAmountInputChange}
        value={inputAmountValue}
        isAmountInputEditable={isAmountInputEditable}
        style={styles.amountInputCurrency}
      />
      <View>
        <Text style={styles.amountInputSymbol}>$</Text>
      </View>
    </View>
  );
  return view;
};

export default AmountInput;
