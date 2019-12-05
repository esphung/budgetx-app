import React from 'react';

import {
  // StyleSheet,
  View,
  // Button,
  // TouchableOpacity,
  Text,
  // Image,
  TextInput
} from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

import ProfileUserImage from './ProfileUserImage';

import UserNameEmailInput from './UserNameEmailInput';

// ui colors
import colors from '../../../colors';

function ProfileRectangle() {
  let view = <View />;
  view = (
    <View style={userProfileRectangle}>
      <View style={
          {
            flex: 0.3,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

            // backgroundColor: 'pink',
          }
      }
      >
        <ProfileUserImage />
      </View>

      <UserNameEmailInput />
    </View>
  );

  return view;
}

// user profile rectangle
const userProfileRectangle = {
  flex: 0.25,
  flexDirection: 'row',
  // width: 375,
  // width: '100%',
  // height: 92,
  // height: '11%',

  backgroundColor: colors.dark,

  top: '6%',

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

export default ProfileRectangle;
