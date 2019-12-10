import React, { useEffect } from 'react';

import {
  StyleSheet,
  View,
  // Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import colors from 'main/colors';

// AWS Amplify
import Auth from '@aws-amplify/auth';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.dark, // '#aa73b7',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import styles from './styles';

export default function AuthLoadingScreen(props) {
  const loadApp = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    // console.log('Mount');
    loadApp();
  }, []);

  const view = (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
  return view;
}
