// FOR SIGNIN WELCOME SCREEN
import React from 'react';
import {
  Text,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../../styles';

function MyButton({ title, onPress }) {
  // console.log(props);
  const view = (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonText}>{ title.toLowerCase() }</Text>
    </TouchableOpacity>
  );
  return view;
}

export default MyButton;
