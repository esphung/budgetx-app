import React, { useEffect } from 'react';

import {
  StyleSheet,
  View,
  // Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import colors from 'main/colors';

// import {
//   loadUserObject,
//   // saveUserObject,
// } from '../storage/UserStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark, // '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function AuthLoadingScreen(props) {
  const loadApp = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    // console.log('Mount');
    loadApp();

    return async () => {
      // effect
      // console.log('Clean up');
    };
  }, []);

  const view = (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
  return view;
}
