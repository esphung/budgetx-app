import React from 'react';

import {
  Text,
} from 'react-native';

// ui colors
import colors from 'main/colors';

const DesignerCredit = () => {
  const view = (
    <Text
      style={
        {
          // height: 40,
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
      {`Designed by ${global.appDesigner}`}
    </Text>
  );
  return view;
};

export default DesignerCredit;
