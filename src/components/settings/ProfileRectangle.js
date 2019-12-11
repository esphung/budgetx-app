import React from 'react';

import {
  View,
} from 'react-native';

import ProfileUserImage from './ProfileUserImage';

import UserNameEmailInput from './UserNameEmailInput';

// ui colors
import colors from '../../../colors';

// user profile rectangle
const userProfileRectangle = {
  flex: 0.25,
  flexDirection: 'row',
  backgroundColor: colors.dark,
  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

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
          }
      }
      >
        <View style={
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'orange',
            // borderStyle: 'solid',
          }
        }><ProfileUserImage /></View>
      </View>

      <UserNameEmailInput />
    </View>
  );
  return view;
}

export default ProfileRectangle;
