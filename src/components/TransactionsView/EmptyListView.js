import React from 'react';

import {
  View,
  Text
} from 'react-native';

const EmptyListView = () => {
  const view = (
    <View style={
      {
        position: 'absolute',
        // left: 84,
        top: '32%', // 256,

        width: '60%', // 220,
        height: '10%', // 84,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dashed',

      }
    }
    >
      <Text style={{
        opacity: 0.6,
        fontFamily: 'SFProDisplay-Semibold',
        fontSize: 22,
        // fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 28,
        letterSpacing: 0.17,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
      }}
      >
        No transactions yet.
      </Text>

      <Text style={{
        opacity: 0.6,
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 22,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 28,
        letterSpacing: 0.17,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
      }}
      >
        Choose category and enter amount below
      </Text>

    </View>
  );
  return view;
};

export default EmptyListView;
