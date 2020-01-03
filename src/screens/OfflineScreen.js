import React from 'react';

import {
  // TouchableOpacity,
  TouchableWithoutFeedback,
  // StyleSheet,
  // Text,
  // SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  // Alert,
  // Modal,
  // FlatList,
  // Animated,
  // TextInput,
  // NetInfo,
} from 'react-native';

// import NetInfo from '@react-native-community/netinfo';

import { NetworkConsumer } from 'react-native-offline';

import {
  Container,
  // Item,
  // Input,
} from 'native-base';

import colors from '../../colors';

import Offline from '../components/Offline';

import styles from './styles';

// import { NavigationEvents } from 'react-navigation';

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
            <Container style={styles.infoContainer}>
              <View style={styles.container}>

                <Offline />

              </View>
            </Container>
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
