import React, { FC, useCallback, useState } from 'react';
import { View, LayoutChangeEvent, StyleProp, StyleSheet, Text, TextStyle, TextInput } from 'react-native';

const VALID = /^[1-9]{1}[0-9]*$/;

interface Props {
  max?: number;
  onValueChange: (value: number) => void;
  style?: StyleProp<TextStyle>;
  value: number;
  isEditable: bool;
}

const CurrencyInput: FC<Props> = ({
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = { marginBottom: 0 },
  value,
  isEditable
}) => {

  const valueAbsTrunc = Math.trunc(Math.abs(value));

  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error(`invalid value property`);

  }

  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    console.log('Value:', value)
    //throw new Error(`invalid value property`);

  }
  
  const [inputHeight, setInputHeight] = useState(0);
  
  const [inputWidth, setInputWidth] = useState(0);
  
  const handleChangeText = useCallback((text: string) => {
    if (text === '') {
      onValueChange(0)
      return
    }
    if (!VALID.test(text)) {
      return
    }
    const nextValue = parseInt(text, 10);
    if (nextValue > max) {
      return
    }
    onValueChange(nextValue);
  }, []);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setInputHeight(height);
    setInputWidth(width);
  }, []);

  const valueInput = value === 0 ? '' : String(value);
  
  const valueDisplay = ((value / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
  .replace('$','');
  
  const { marginBottom } = StyleSheet.flatten(style);

  return (
    <View>
      <Text onLayout={handleLayout} style={[style, styles.text]}>
        {valueDisplay}
      </Text>
      <TextInput
        editable={isEditable}
        contextMenuHidden
        keyboardType="numeric"
        onChangeText={handleChangeText}
        value={valueInput}
        style={[
          styles.input,
          {
            height: inputHeight,
            marginBottom,
            marginTop: -1 * inputHeight,
            width: inputWidth
          }
        ]}

        // custom
        keyboardAppearance={'dark'}

      />
    </View>
  );
};


const styles = StyleSheet.create({
  input: {
    opacity: 0,
  },
  text: {
    marginBottom: 0,
  },
});

export default CurrencyInput;

