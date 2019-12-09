import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import colors from 'main/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark, // '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: colors.white,
  },
});

function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>Say something</Text>
    </View>
  );
}


ForgotPasswordScreen.navigationOptions = () => {
  return {
    headerTransparent: {},
    headerTintColor: colors.white,
  }
};

export default ForgotPasswordScreen;