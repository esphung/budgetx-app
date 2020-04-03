import React from 'react';

import {
  Text,
} from 'react-native';

// ui colors
import colors from '../../../colors';

const VersionCredit = () => {
  const view = (
    <Text
      style={
        {
          
          opacity: 0.5,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 15,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.1,
          textAlign: 'center',
          color: colors.white, // '#ffffff'
        }
    }
    >
      { `Version ${global.appVersion}` }
    </Text>
  );
  return view;
};

export default VersionCredit;
