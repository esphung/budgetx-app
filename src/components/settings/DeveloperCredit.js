import React from 'react';

import {
  Text,
} from 'react-native';

// ui colors
import colors from 'main/colors';

const DeveloperCredit = () => {
  const view = (
    <Text
      style={
        {
          opacity: 0.5,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,
          textAlign: 'center',
          color: colors.white,
        }
      }
    >
      {`Developed by ${global.appDeveloper}`}
    </Text>
  );
  return view;
};

export default DeveloperCredit;
