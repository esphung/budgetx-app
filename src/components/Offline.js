import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  View,
  Text,
  // StyleSheet,
  // SafeAreaView,
  Image,
} from 'react-native';

import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

import InfoBox from './InfoBox';

import colors from 'main/colors';

// import { NetworkConsumer } from 'react-native-offline';

// import { Container, Header, Content, Button, Text } from 'native-base';

// import { TouchableOpacity } from 'react-native-gesture-handler';

require('main/globals');

const title = 'It appears you are offline!';

const message = `
Internet is not required to use ${global.appName}.\nIt is, however, required to sign in, sign up or retrieve a forgotten password.
Thank you for downloading ${global.appName}! Version ${global.appVersion}
`;

import offlineWifiSymbolImage from 'main/assets/no-wifi-image.png';
// import video2 from './assets/videos/2.mp4';

const Offline = (props) => {
  const [isReady, setIsReady] = useState(false);

  async function _cacheResourcesAsync() {
    const images = [require('main/assets/no-wifi-image.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    setIsReady(true);
    return Promise.all(cacheImages);
  }

  async function retrieveImages() {
    await Asset.loadAsync([
      offlineWifiSymbolImage,
      // video2,
      // ...
    ]);
   // this.setState({ ready: true });
   setIsReady(true);
  }

  useEffect(() => {
    _cacheResourcesAsync()
    // retrieveImages();
    return () => {
      // effect
    };
  }, []);

  const view = (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'stretch',
        // alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: 'transparent',

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

            // width: '100%',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',
          }
        }
      >
        <Image
          style={{
            height: '50%',
            width: '50%',
            opacity: 0.7,
            // borderRadius: 12,
            // backgroundColor: 'pink',

            // borderWidth: 1,
            // borderColor: 'white',
          }}
          resizeMode="contain"
          source={global.noWifiImage}
          // source={global.wifiSymbolHighResolution}
        />

      </View>


      <View
        style={
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

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
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            // width: '100%',
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
          fontSize: 21,
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

  if (isReady) {
    return view;  
  } else {
    return <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />;
  }
  
};

export default Offline;
