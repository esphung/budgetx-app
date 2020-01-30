import React from 'react';

// import PropTypes from 'prop-types';

import {
  View,
  // Text,
  // TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import colors from 'main/colors';

import styles from 'main/styles';

import Button from 'main/storybook/stories/Button';

import TouchableText from 'main/storybook/stories/TouchableText';

function WelcomeScreen(props) {
  const handleRoute = async (destination) => {
    try {
      // statements
      await props.navigation.navigate(destination);
    } catch(e) {
      // statements
      console.log(e);
    }
  };

  const welcome = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <View style={styles.container}>

                <Button title="Sign Up" onPress={() => handleRoute('SignUp')} />

                <Button title="Sign In" onPress={() => handleRoute('SignIn')} />

                <TouchableText title="Forgot Password?" onPress={() => handleRoute('ForgetPassword')} />

              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  return welcome;
}

WelcomeScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

// Welcome.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default WelcomeScreen;