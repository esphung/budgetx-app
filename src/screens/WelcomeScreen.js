import React from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {
  Container,
} from 'native-base';


import colors from 'main/colors';

import styles from './styles';

function WelcomeScreen(props) {
  const handleRoute = async (destination) => {
    await props.navigation.navigate(destination);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {/* App Logo */}
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => handleRoute('SignUp')}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRoute('SignIn')}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRoute('ForgetPassword')}
                  // style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Forget password ?</Text>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

WelcomeScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
