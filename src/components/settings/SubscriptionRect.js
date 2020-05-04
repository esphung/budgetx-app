import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import { TouchableOpacity, } from 'react-native-gesture-handler';

// import { NetworkConsumer } from 'react-native-offline';

// ui colors
import colors from '../../../colors';

// import InfoBox from '../../../storybook/stories/InfoBox';

// import { isDeviceOnline } from '../../../network-functions';

// text style
const copy3 = {
  // width: 215,
  // width: '80%',
  // height: 40,
  fontFamily: 'SFProDisplay-Semibold',
  fontSize: 17,
  // fontWeight: '600',
  // fontStyle: 'normal',
  // letterSpacing: 0.13,
  color: colors.shamrockGreen,

  textAlign: 'center',

  paddingHorizontal: 6,
};

// oval bank icon
const oval2 = {
  justifyContent: 'center',
  // width: '100%',
  height: '100%',
};

// view rectangle
const mask = {
  // flex: 1,
  flexDirection: 'row',
  width: '93%',
  // height: '100%',
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

// const message = `Thank you for using ${global.appName} version ${global.appVersion}!`;

function SubscriptionRect(props) {
  const { onPress, isUserLoggedIn, isUserOnline } = props;

  let text = `Download us on any device and sync it to access your account :D`;

  if (global.authenticated) {
    text = 'Device sync is enabled. Access your data anywhere from any device'
  }

  else if (!global.authenticated) {
    text = `Tap here to sign up and access more cool features like cross-device sync and cloud data :D`;
    // return <InfoBox title='Tap here to sign up and access features.' />
  }
  // else {
  //   text = `Thank you for using ${global.appName} version ${global.appVersion}! More stuff coming...`
  // }

  const view = (
    <View
      style={{
        // flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        disabled={global.authenticated}
        onPress={onPress} style={mask}>
        <View style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>
          <View style={oval2}>
            <Image
              resizeMode="contain"
              style={{
                height: 33,
                width: 33,
              }}
              source={global.walletIcon}
            />
          </View>
        </View>
        <View style={
          {
            flex: 0.8,
            // alignItems: 'center',
            justifyContent: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }

        }
        >
          <Text numberOfLines={3} style={copy3}>{ text }</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default SubscriptionRect;
