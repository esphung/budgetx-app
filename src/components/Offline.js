import React from 'react';

import {
  ScrollView,
  View,
  Text,
  // StyleSheet,
  // SafeAreaView,
} from 'react-native';

import colors from 'main/colors';

// import { NetworkConsumer } from 'react-native-offline';

// import { Container, Header, Content, Button, Text } from 'native-base';

// import { TouchableOpacity } from 'react-native-gesture-handler';

import InfoBox from './InfoBox';

require('main/globals');

const title = `
Uh oh! It appears you are offline.
`;

const message = `
While internet is not required to use ${global.appName}, it is however, required for first-time user sign up.
Thank you for downloading ${global.appName}!
`;

const Offline = () => {
  const view = (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


        // backgroundColor: colors.darkTwo,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}
    >

      <View
        style={
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            // height: '50%',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',
          }
        }
      >

        <InfoBox title={title} />

      </View>

      <View
        style={
          {
            flex: 1.2,
            alignItems: 'center',
            // justifyContent: 'center',

            width: '100%',
            // height: '50%',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',
          }
        }
      >

        <Text style={{
          // height: 40,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 15,
          fontWeight: '600',
          fontStyle: 'normal',
          letterSpacing: 0.13,
          color: colors.white,

          // paddingHorizontal: 14,
          textAlign: 'center',
        }}
        >
          { message }
        </Text>

      </View>
    </ScrollView>
  );
  return view;
};

export default Offline;
