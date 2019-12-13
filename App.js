/*
FILENAME:   App.js
PURPOSE:    Entry point for budget x app
AUTHOR:     Eric Phung
CREATED:    Fri Nov 1 2019
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
            12/09/2019 12:56 PM | added AuthLoadingScreen, SwitchNavigator, AUthStackNavigator
            12/10/2019 06:02 AM | Stuck at AWS suspension
            12/10/2019 01:58 PM | AWS authentication set up
            12/11/2019 02:55 PM |
            12/12/2019 09:43 AM | Pushed to App Store version 1.0.0
                                  Initialized version 1.0.1
*/

import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Button,
  // Image,
  Platform,
  AsyncStorage,
  NetInfo,
} from 'react-native';

// import { NetInfo } from 'react-native';

import Constants from 'expo-constants';

import * as LocalAuthentication from 'expo-local-authentication';

import * as Font from 'expo-font';

// Amplify imports and config
import Amplify from 'aws-amplify'; // '@aws-amplify/core';
import config from './aws-exports';

import SpinnerMask from './src/components/SpinnerMask';

// import Root from './Root';

import SwitchNavigator from './SwitchNavigator';

// import Offline from './src/components/Offline';

import './globals'; // global values

// import LocalAuthentication from './src/screens/LocalAuthentication';

import { NetworkProvider } from 'react-native-offline';

Amplify.configure(config);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  modal: {
    flex: 1,
    marginTop: '90%',
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    marginTop: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 22,
    paddingTop: 20,
  },
});

function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [authenticated, setAuthenticated] = useState(false);

  // const [modalVisible, setModalVisible] = useState(false);

  // const [failedCount, setFailedCount] = useState(0);

  // const [isOnline, setIsOnline] = useState(false);

  async function retrieveStoredFonts() {
    setLoading(true);
    // load stored fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
    });
    // stored fonts have been loaded
    setFontsAreLoaded(true);
  }

  function clearState() {
    setAuthenticated(false);
    setFailedCount(0);
  }

  // const scanFingerPrint = async () => {
  //   try {
  //     const results = await LocalAuthentication.authenticateAsync();
  //     if (results.success) {
  //       setModalVisible(false);
  //       setAuthenticated(true);
  //       setFailedCount(0);
  //     } else {
  //       setFailedCount(failedCount + 1);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const storeAuthenticated = async (bool) => {
  //   try {
  //     await AsyncStorage.setItem('@MySuperStore:authenticated', bool);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // const retrieveAuthenticated = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@MySuperStore:authenticated');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  // const handleConnectionChange = (connectionInfo) => {
  //   console.log('connection info: ', connectionInfo);
  //   NetInfo.isConnected.fetch().then((isConnected) => {
  //     setIsOnline(isConnected);
  //   });
  // };

  // component did mount
  useEffect(() => {
    // console.log('Mount');
    retrieveStoredFonts();

    // local authentication
    // set authenticated


    // return () => {
    //   // effect
    //   // console.log('unmount');
    // };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     // effect
  //     console.log('clean up connectionChange');
  //     NetInfo.isConnected.removeEventListener(
  //       'connectionChange',
  //       handleConnectionChange
  //     );
  //   };
  // }, [handleConnectionChange])

  // useEffect(() => {
  //   console.log('isOnline:', isOnline);
  //   return () => {
  //     // isOnline side effect
  //   };
  // }, [isOnline])

  useEffect(() => {
    // // check if user online
    // NetInfo.addEventListener('connectionChange', handleConnectionChange);
    return () => {
      // // side effect of fonts loaded
      // // console.log('clean up fonts');
      // NetInfo.isConnected.removeEventListener(
      //   'connectionChange',
      //   handleConnectionChange,
      // );
      setLoading(false);
    };
  }, [fontsAreLoaded]);

  let view = <SpinnerMask />;

  if (fontsAreLoaded) {
    // if (true) { // (!isOnline) {
    //   // user is offline, show offline page
    //   view = <Offline />
    // }


    // else {
    //   // finally, direct user to app
      view = (
        <NetworkProvider>
        <SwitchNavigator />
        </NetworkProvider>
      );
    // }
  }



  // view = (
  //   <View
  //     style={[
  //       styles.container,
  //       modalVisible
  //         ? { backgroundColor: '#b7b7b7' }
  //         : { backgroundColor: 'white' },
  //     ]}
  //   >
  //     <Button
  //       title={
  //         authenticated
  //           ? 'Reset and begin Authentication again'
  //           : 'Begin Authentication'
  //       }
  //       onPress={() => {
  //         clearState();
  //         if (Platform.OS === 'android') {
  //           setModalVisible(modalVisible);
  //         } else {
  //           scanFingerPrint();
  //         }
  //       }}
  //     />

  //     {authenticated && (
  //       <Text style={styles.text}>Authentication Successful!</Text>
  //     )}

  //     <Modal
  //       animationType="slide"
  //       transparent
  //       visible={modalVisible}
  //       onShow={scanFingerPrint}
  //     >
  //       <View style={styles.modal}>
  //         <View style={styles.innerContainer}>
  //           <Text>Sign in with fingerprint</Text>

  //           {failedCount > 0 && (
  //             <Text style={{ color: 'red', fontSize: 14 }}>
  //               Failed to authenticate, press cancel and try again.
  //             </Text>
  //           )}
  //           <TouchableHighlight
  //             onPress={async () => {
  //               LocalAuthentication.cancelAuthenticate();
  //               setModalVisible(modalVisible);
  //             }}
  //           >
  //             <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );

  return view;
}

export default App;
