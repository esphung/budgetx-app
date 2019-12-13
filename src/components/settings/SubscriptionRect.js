import React, { useState } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from '../../../colors';

// text style
const copy3 = {
  width: 215,
  // height: 40,
  fontFamily: 'SFProDisplay-Semibold',
  fontSize: 17,
  fontWeight: '600',
  fontStyle: 'normal',
  letterSpacing: 0.13,
  color: colors.shamrockGreen,

  paddingHorizontal: 6,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// oval bank icon
const oval2 = {
  width: '100%',
  height: '100%',
  // width: 84,
  // height: 74,
  // borderRadius: 9,
  // backgroundColor: colors.shamrockGreen,
};

// view rectangle
const mask = {
  flexDirection: 'row',
  width: '93%',
  height: '100%',
  borderRadius: 9,
  backgroundColor: colors.dark,
  shadowColor: '#0f1725',
  shadowOffset: {
    width: 5,
    height: 5,
  },
  shadowRadius: 16,
  shadowOpacity: 1,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};


function SubscriptionRect() {
  const [message, setMessage] = useState(`Thank you for using ${global.appName} version ${global.appVersion}!`);
  const view = (
    <SafeAreaView
      style={
        {
          flex: 0.35,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    >

      <View
        style={{
          flex: 0.2,
          width: '100%',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      />

      <View
        style={{
          flex: 1,
          width: '100%',

          alignItems: 'center',
          justifyContent: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      >

        <TouchableOpacity disabled style={mask}>
          <View
            style={
              {
                flex: 0.25,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }

            }
          >
            <View>
              <Image resizeMode="cover" style={oval2} source={global.appIcon} />
            </View>
          </View>
          <View style={
            {
              flex: 0.75,
              alignItems: 'center',
              justifyContent: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }

          }
          >
            <Text style={copy3}>
              { message }
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      <View
        style={{
          flex: 0.2,
          width: '100%',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      />


    </SafeAreaView>
  );
  return view;
}

export default SubscriptionRect;
