import React from 'react';

import {
  // View,
  Text,
} from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Ionicons } from 'expo-vector-icons';

// import PropTypes from 'prop-types';

// import colors from '../../../colors';

import styles from '../../../styles';

const title = 'No transactions yet.';

const message = `
Choose category
and enter amount below`;

function EmptyListMessage() {
  const view = (
    <Text style={styles.emptyTableMessageStyle}>
      <Text style={styles.emptyTableTitleStyle}>{ title }</Text>
      <Text>{ message }</Text>
    </Text>
  );
  return view;
}

// EmptyListMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   // onPress: PropTypes.func.isRequired,
// };

export default EmptyListMessage;
