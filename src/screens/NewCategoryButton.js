import React from 'react';

import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Ionicons } from 'expo-vector-icons';

// ui colors
import colors from '../../colors';

import styles from './styles';

function NewCategorryButton(props) {
  const { onPress } = props;
  const view = (
    <View
      style={
        {
          width: '38%', // 133,
          backgroundColor: 'transparent',

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
            height: 46,
            justifyContent: 'center',
            backgroundColor: colors.azure,
            borderRadius: 23,
          }
        }
      >
        <Text
          style={styles.buttonText}
        >
          Add New
        </Text>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default NewCategorryButton;
