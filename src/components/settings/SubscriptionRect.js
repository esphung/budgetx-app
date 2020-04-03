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

// text style
const copy3 = {
  // width: 215,
  width: '80%',
  // height: 40,
  fontFamily: 'SFProDisplay-Semibold',
  fontSize: 17,
  fontWeight: '600',
  fontStyle: 'normal',
  letterSpacing: 0.13,
  color: colors.shamrockGreen,

  textAlign: 'center',

  paddingHorizontal: 6,
};

// oval bank icon
const oval2 = {
  width: '100%',
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
  let text = `Download ${global.appName} on any device to access your account.`;

  if (!isUserLoggedIn) {
    text = `Tap here to sign up and access features.`;
    // return <InfoBox title='Tap here to sign up and access features.' />
  } else if (!isUserOnline) {
    text = 'You are currently offline or have unstable connectivity.';
  }

  const view = (
    <View
      style={{
        flex: 1,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <TouchableOpacity
      // disabled={isUserLoggedIn}
      onPress={onPress} style={mask}>
        <View>
          <View>
            <Image
              resizeMode="contain"
              style={oval2}
              source={global.bankImageGreen}
            />
          </View>
        </View>
        <View style={
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }

        }
        >
          <Text numberOfLines={2} style={copy3}>{ text }</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default SubscriptionRect;
