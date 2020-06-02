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
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  
  backgroundColor: colors.dark,
  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

function ProfileRectangle(props) {
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
        }>
          <ProfileUserImage style={
            {
              width: 58,
              height: 58,

            }} isUserLoggedIn={global.authenticated} />
        </View>
      </View>

      <UserNameEmailInput isUserLoggedIn={global.authenticated} />
    </View>
  );
  return view;
}

export default ProfileRectangle;
