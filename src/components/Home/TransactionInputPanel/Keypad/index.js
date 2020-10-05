import React from 'react';

import { View } from 'react-native';

import styles from 'styles/Keypad';

import KeypadButton from './KeypadButton';

const KeypadView = ({ numberBtnPressed, addBtnPressed, backspaceBtnPressed }) => {
  const view = (
    <View style={styles.container}>
      <View style={styles.keypadRow}>
        <KeypadButton value={1} onPress={numberBtnPressed} />
        <KeypadButton value={2} onPress={numberBtnPressed} />
        <KeypadButton value={3} onPress={numberBtnPressed} />
      </View>

      <View style={styles.keypadRow}>
        <KeypadButton value={4} onPress={numberBtnPressed} />
        <KeypadButton value={5} onPress={numberBtnPressed} />
        <KeypadButton value={6} onPress={numberBtnPressed} />
      </View>

      <View style={styles.keypadRow}>
        <KeypadButton value={7} onPress={numberBtnPressed} />
        <KeypadButton value={8} onPress={numberBtnPressed} />
        <KeypadButton value={9} onPress={numberBtnPressed} />
      </View>

      <View style={styles.keypadRow}>
        <KeypadButton value="Add" onPress={addBtnPressed} />
        <KeypadButton value={0} onPress={numberBtnPressed} />
        <KeypadButton value="<" onPress={backspaceBtnPressed} />
      </View>
    </View>
  );
  return view;
};

export default KeypadView;
