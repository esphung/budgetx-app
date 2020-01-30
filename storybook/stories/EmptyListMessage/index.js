import React from 'react';

import { View, Text } from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Ionicons } from 'expo-vector-icons';

// import PropTypes from 'prop-types';

// ui colors
// import colors from 'main/colors';

import styles from 'main/styles';

const message = `No transactions yet.
Choose category
and enter amount below`;

function EmptyListMessage() {
  const view = (
    <View>
      <Text style={styles.emptyMessageTextStyle}>{ message }</Text>
    </View>
  );
  return view;
}


// EmptyListMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   // onPress: PropTypes.func.isRequired,
// };

export default EmptyListMessage;
