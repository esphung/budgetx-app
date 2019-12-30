import React, { useEffect, useState } from 'react';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  // StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  // Modal,
  // FlatList,
  // Animated,
  // TextInput,
  NetInfo,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

import colors from 'main/colors';

import Offline from '../components/Offline';

import styles from './styles';

// import { NavigationEvents } from 'react-navigation';

const OfflineScreen = (props) => {

  const [connectionType, setConnectionType] = useState(null);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [previousConnectionType, setPreviousConnectionType] = useState(null);

  // const handleRoute = async (destination) => {
  //   if (destination === 'SignUp') {
  //     // check for connection and reroute to OfflineScreen
  //     if (connectionType !== 'none' && connectionType !== 'unknown') {
  //       props.navigation.navigate(destination);
  //     } else {
  //       props.navigation.navigate('OfflineScreen');
  //     }
  //   }
  //   // await props.navigation.navigate(destination); // original single code line
  // };

  function handleFirstConnectivityChange(connectionInfo) {
    // setConnectionType(connectionInfo.type);

    if (connectionInfo.type !== 'none') {
      console.log('connectionType: ', connectionType);
      if (connectionType !== previousConnectionType) {
        props.navigation.navigate('AuthLoading')
      }
    }

    // console.log(
    //   'Connection changed to type: ' +
    //     connectionInfo.type
    //     // +
    //     // ', effectiveType: ' +
    //     // connectionInfo.effectiveType,
    // );


    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange,
    );
  }

  const retrieveConnectionType = () => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log(
        'Initial, type: ' +
          connectionInfo.type
          // +
          // ', effectiveType: ' +
          // connectionInfo.effectiveType,
      );
      setConnectionType(connectionInfo.type);
    });
    NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);
    // return () => {
    //   NetInfo.removeEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange,
    //   );
    // }
  }

  const clearState = () => {
    setConnectionType(null);
    setIsKeyboardAvoidEnabled(false);

    retrieveConnectionType();
  };

  useEffect(() => {
    clearState();
    // NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);

    return () => {
      // effect
      NetInfo.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange,
      );
    };

  }, []);

  useEffect(() => {
    if (connectionType) {

    }
    // return () => {
    //   // effect
    //   NetInfo.removeEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange,
    //   );
    // };
  }, [connectionType]);


    const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={isKeyboardAvoidEnabled}
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
    </SafeAreaView>
  );
  return view;
};

OfflineScreen.navigationOptions = () => ({
  headerTransparent: {},
  // headerLeft: null,
  headerTintColor: colors.white,
})

export default OfflineScreen;
