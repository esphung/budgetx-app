import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
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

function SignInScreen(props) {
  const signIn = async () => {
    const userTokenValue = '123456789';
    await AsyncStorage.setItem('userToken', userTokenValue);
    // console.log('userToken set:', userTokenValue);
    props.navigation.navigate('AuthLoading');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={signIn}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Complete sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

SignInScreen.navigationOptions = () => {
  return {
    headerTransparent: {},
    headerTintColor: colors.white,
  }
};

export default SignInScreen;

