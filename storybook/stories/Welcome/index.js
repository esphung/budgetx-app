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

import colors from '../../../colors';

import styles from '../../../styles';

import Button from '../Button';

import TouchableText from '../TouchableText';

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

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',

                  justifyContent: 'space-around',

                  padding: 6,

                  // borderWidth: 1,
                  // borderColor: 'white',
                  // borderStyle: 'solid',
                }}>
                <TouchableText title="Forgot Password?" onPress={() => handleRoute('ForgetPassword')} />


                </View>
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
