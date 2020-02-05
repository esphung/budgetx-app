import React from 'react';

import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Ionicons } from 'expo-vector-icons';

import PropTypes from 'prop-types';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

function BlueButton(props) {
  const { onPress, title } = props;
  const view = (
    <View
      style={
        {
          width: '38%', // 133,
          height: 46,
          // backgroundColor: 'transparent',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    >
      <TouchableOpacity
        onPress={onPress}
        style={
          {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: colors.azure,
            borderRadius: 23,
          }
        }
      >
        <Text
          style={styles.buttonText}
        >
          { title }
        </Text>
      </TouchableOpacity>

    </View>
  );
  return view;
}

BlueButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default BlueButton;
