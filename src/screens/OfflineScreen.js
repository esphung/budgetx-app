import React from 'react';

import {
  TouchableWithoutFeedback,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from 'react-native';

import { NetworkConsumer } from 'react-native-offline';

import colors from 'main/colors';

import styles from 'main/styles';

import InfoBox from 'main/storybook/stories/InfoBox';

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
            <InfoBox title="It appears you are offline!" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );

  const view = (
    <NetworkConsumer>
      {
        ({ isConnected }) => (isConnected ? <View /> : page)
      }
    </NetworkConsumer>
  );


  return view;
};

OfflineScreen.navigationOptions = () => ({
  headerTransparent: {},
  // headerLeft: null,
  headerTintColor: colors.white,
});

export default OfflineScreen;
