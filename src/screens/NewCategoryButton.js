import React from 'react';

import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Ionicons } from 'expo-vector-icons';

// ui colors
import colors from 'main/colors';

function NewCategorryButton(props) {
  const { onPress } = props;
  const view = (
    <View
      style={
        {
          width: '38%', // 133,
          height: 46,
          borderRadius: 23,
          backgroundColor: colors.azure,
        }
      }
    >
      <TouchableOpacity
        onPress={onPress}
        style={
          {
            width: '100%',
            height:
            '100%',
            justifyContent: 'center',
          }
        }
      >
        <Text
          style={
            {
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              textAlign: 'center',
              color: '#ffffff',

              alignSelf: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          Add New
        </Text>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default NewCategorryButton;
