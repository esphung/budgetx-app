import React from 'react';

import {
  StyleSheet,
  View,
  Text,
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

function WelcomeScreen(props) {
  const handleRoute = async (destination) => {
    await props.navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleRoute('SignUp')}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRoute('SignIn')}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRoute('ForgetPassword')}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Forget password ?</Text>
      </TouchableOpacity>
    </View>
  );
}

WelcomeScreen.navigationOptions = () => {
  return {
    headerTransparent: {},
    headerTintColor: colors.white,
  }
};

export default WelcomeScreen;
