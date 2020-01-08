import React from 'react';

import {
  // StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from 'main/styles';

function TouchableText(props) {
  return (
  <TouchableOpacity
    onPress={props.onPress}
  >
    <Text style={styles.buttonText}>{ props.title }</Text>
  </TouchableOpacity>
  );
}

TouchableText.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};


export default TouchableText;
