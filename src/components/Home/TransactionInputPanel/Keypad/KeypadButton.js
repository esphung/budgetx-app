import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// import PropTypes from 'prop-types';

import {
  // TouchableOpacity,
  // Platform,
  Text,
  // Image,
  // View,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

// ui colors
import colors from 'src/colors';

// import styles from '../../../../styles';
import styles from 'styles/Keypad';

const NumberButton = ({ value, onPress }) => {
  const btnStyle = [styles.keypadBtn];
  const btnTextStyle = [styles.keypadBtnText];
  let label = value;
  if (label === 'Add') {
    btnStyle.push(styles.addKeyBtnStyle);
    btnTextStyle.push(styles.addKeyBtnText);
  }
  if (label === '<') {
    label = <MaterialCommunityIcons name="backspace-outline" size={25} color={colors.white} />;
  }
  // console.log('btnTextStyle: ', btnTextStyle);
  // if (value === '<') btnStyle.push(extraBtnTextStyle);
  const view = (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      <Text style={btnTextStyle}>
        { label }
      </Text>
    </TouchableOpacity>
  );
  return view;
};

export default function KeypadButton({ onPress, value }) {
  const handlePress = () => onPress(value);
  const view = (
    <NumberButton
      value={value}
      onPress={handlePress}
      extraBtnStyle={styles.addKeyBtnStyle}
      // extraBtnTextStyle={styles}
    />
  );
  return view;
}

// KeypadButton.propTypes = {
//   onPress: PropTypes.func,
//   value: PropTypes.string
// }
