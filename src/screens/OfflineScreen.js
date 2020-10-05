import React from 'react';

import {
  TouchableWithoutFeedback,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// import { NetworkConsumer } from 'react-native-offline';

import colors, { originalTheme } from 'src/colors';

import styles from '../../styles';

import InfoBox from 'components/InfoBox';

// import AnimatedOffline from '../components/AnimatedOffline';

const OfflineScreen = () => {
  const page = (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={false}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <InfoBox
                title="It appears you are offline!"
                message="Or have a weak internet connection ..."
              />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );

  // const view = (
  //   <NetworkConsumer>
  //     {
  //       ({ isConnected }) => (isConnected ? page)
  //     }
  //   </NetworkConsumer>
  // );


  // return view;
  return page;
  // return <AnimatedOffline />
};

OfflineScreen.navigationOptions = () => ({
  headerTransparent: {},
  // headerLeft: null,
  headerTintColor: colors.white,
});

export default OfflineScreen;
