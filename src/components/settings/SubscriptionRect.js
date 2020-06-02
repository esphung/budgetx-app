import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  Switch,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TouchableOpacity, } from 'react-native-gesture-handler';

// import { NetworkConsumer } from 'react-native-offline';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

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



// const message = `Thank you for using ${global.appName} version ${global.appVersion}!`;

function SubscriptionRect(props) {
  const { onPress, isUserLoggedIn, isUserOnline } = props;

  const [value, setValue] = useState(isUserLoggedIn);

  const toggleSwitch = (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Switch
        value={value}
        disabled
        onValueChange={v => {
          setValue(v);
        }}
      />
    </View>
  );

  const bankIcon = <MaterialCommunityIcons name="bank-outline" size={36} color={colors.white} />;

  let text = `Download us on any device and sync it to access your account :D`;

  if (global.authenticated) {
    text = `Device sync is ${(value) ? 'enabled' : 'disabled'}`
  }

  else if (!global.authenticated) {
    text = `Tap here to sign up`;
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
        onPress={onPress} style={{
          flex: 1,
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

        }}>



        

        {/* Toggle Switch or Icon */}
        <View
        style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
        >
      {
        isUserLoggedIn && toggleSwitch || bankIcon
      }
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
          <Text numberOfLines={3} style={[
            styles.infoBoxGreenTextStyle,
            {

            }
          ]}>{ text }</Text>
                    <Text numberOfLines={1} style={[
            styles.infoBoxGreenTextStyle,
            {
              color: colors.offWhite
            }
          ]}>Access your data from anywhere</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  return view;
}

export default SubscriptionRect;
