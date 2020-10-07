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
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import colors from 'src/colors';

import styles from 'styles/AmountInput';

import formatMoney from 'functions/formatMoney';

import CurrencyInput from './CurrencyInput';

const screen = Dimensions.get('screen');

const AmountInput = ({
  handleAmountInputChange,
  currentAmount,
  setCurrentAmount,
  updateTransactionAmount,
  refField,
  focusOnNoteInput,
}) => {
  const [displayValue, setDisplayValue] = useState(Number(currentAmount).toFixed(2));
  // console.log('value: ', value);
  // const onFocus = () => fullSlideView();
  const [showingModal, setshowingModal] = React.useState(false);


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
    updateTransactionAmount(value.nativeEvent.text.trim());
  };
   const onSubmitEditing = (val) => {
    // console.log('val.nativeEvent.text: ', val.nativeEvent.text);
    // setValue(value.trim());
    // setCurrentNote(val.nativeEvent.text.trim());
    updateTransactionAmount(val.nativeEvent.text.trim());

    setshowingModal(false);

    focusOnNoteInput();
  };
  // React.useEffect(() => {
  //   // refField.current.focus();
  //   setshowingModal(true)
  //   return () => {
  //     // effect
  //   };
  // }, []);
  const view = (
    <TouchableOpacity onPress={() => {
      setshowingModal(!showingModal)
      // refField.current.focus()
    }} style={[styles.amountInputView, {
      flex: 1,
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      // backgroundColor: 'green',
    }]}>
    
      

        <View
        style={
          {
            flex: 1,
            // backgroundColor: 'red',
          }
        }
      >
        <Text style={styles.amountInputLabel}>Amount Spent:</Text>
      </View>

      <View>
      <Modal
        visible={showingModal}
        transparent
        onRequestClose={() => setshowingModal(false)}>
        <View style={{ flex: 1, marginTop: 50 }}>
        <View style={{
          flex: 1,
          top: screen.height, // / 2,
          height: 300,
          backgroundColor: 'green',
        }}>

        <TextInput

        autoFocus={true}
        // selectionColor="white"
        selectionColor="transparent"
        selectTextOnFocus
        isEditable={true}
        ref={refField}
        placeholder={String(Math.abs(displayValue).toFixed(2))}
        // placeholderTextColor={colors.offWhite}
        // clearTextOnFocus
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={String(displayValue)}
        // style={styles.amountInputCurrency}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        style={
          {
            color: 'transparent',
            flex: 1,
          }
        }
        keyboardAppearance="dark"
        returnKeyType="done"

      />

          {/*<Button title={'hide modal'} onPress={() => setshowingModal(false)} />*/}
        </View>

        </View>
      </Modal>

      <TouchableOpacity onPress={() => setshowingModal(!showingModal)}>
      <Text
        // onFocus={() => setshowingModal(true)}
        // editable={false}
        // ref={refField}
        // onSubmitEditing={onSubmitEditing}
        style={[
          styles.amountInputCurrency,
          // {
          //   color:' white',
          //   fontSize: 26,
          //   fontFamily: 'OpenSans-Regular',

          //   borderWidth: 1,
          //   borderColor: 'white',
          //   borderStyle: 'solid',
          // }
         ]}
        >{String(displayValue)}</Text>
        </TouchableOpacity>
      {/*<Button title={'Show modal'} onPress={() => setshowingModal(true)} />*/}
    </View>
      <View>
        <Text style={styles.amountInputSymbol}>$</Text>
      </View>

      </TouchableOpacity>
  );
  return view;
};

export default AmountInput;
