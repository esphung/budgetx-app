import React from 'react';
import {
  Text,
} from 'react-native';

// import Amplify, { Analytics } from '@aws-amplify/core';
// // Analytics.record({ name: String!, attributes: Object, metrics: Object })

import { TouchableOpacity } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import styles from '../../../styles';

function Button(props) {
  // console.log(props);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonText}>{ props.title }</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;