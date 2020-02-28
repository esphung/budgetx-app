import React from 'react';

import {
  // StyleSheet,
  // TouchableOpacity,
  Text,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

// import colors from '../../../colors';

import styles from '../../../styles';

function TouchableText(props) {
  const { onPress, title } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.buttonText, props.style]}>{ title }</Text>
    </TouchableOpacity>
  );
}

TouchableText.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};


export default TouchableText;
