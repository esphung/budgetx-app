import React from 'react';

import {
  View,
  Image
} from 'react-native';

import SpinnerMask from  '../SpinnerMask';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from '../../../colors';

function ProfileUserImage() {
  let view = <SpinnerMask />;
  view = (
    <TouchableOpacity style={
      {
        alignItems: 'center',
        justifyContent: 'center',

        width: '100%',
        height: '100%',
      }
    }
    >
      <Image
        source={global.placeholderUserImage}
        style={
          {
            width: '68%',
            height: '68%',
            backgroundColor: colors.darkGreyBlue,
            borderRadius: 29,
          }
        }
      />
    </TouchableOpacity>
  );
  return view;
}

export default ProfileUserImage;
