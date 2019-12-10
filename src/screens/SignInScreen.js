import React, { useState, useEffect, useRef } from 'react';

import { Ionicons } from 'expo-vector-icons';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  // Alert,
  // Animated,
} from 'react-native';

import PropTypes from 'prop-types';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';


import colors from 'main/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkTwo, // '#aa73b7',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    fontSize: 17,
    // fontWeight: 'bold',
    color: colors.white, // '#5a52a5',

    fontFamily: 'SFProDisplay-Semibold',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'left',
  },
  // textStyle: {
  //   fontSize: 18,
  //   padding: 10,
  //   color: colors.white,

  //   fontFamily: 'SFProDisplay-Regular',
  //   fontWeight: 'normal',
  //   fontStyle: 'normal',
  //   lineHeight: 28,
  //   letterSpacing: 0.17,
  //   textAlign: 'center',
  // },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%', // 200,
    bottom: '0%', // '5%', // 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'transparent', // '#aa73b7',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: colors.white, // '#5a52a5',
    fontSize: 28,
    marginLeft: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.offWhite, // '#667292',
    padding: 14,
    marginBottom: 20,
    borderRadius: 26, // 24,
  },
  buttonText: {
    // fontSize: 18,
    // fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    fontSize: 22,

    fontFamily: 'SFProDisplay-Semibold',
    // fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'center',
  },
  logoContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
  },
});

function SignInScreen(props) {
  // state hooks
  const passwordInputRef = useRef(null);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  // methods
  const signIn = async () => {
    const userTokenValue = '123456789';
    await AsyncStorage.setItem('userToken', userTokenValue);
    // console.log('userToken set:', userTokenValue);
    props.navigation.navigate('AuthLoading');
  };

  // user input handlers
  function handleUsernameInputSubmit() {
    passwordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function onChangeText(key, value) {
    // console.log('key:', key);
    // console.log('value:', value);

    if (key === 'username') {
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    }
    // this.setState({[key]: value})
  }

  useEffect(() => {
    console.log('username:', username);
    console.log('password:', password);
    return () => {
      // effect
    };
  }, [username, password]);

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => handleUsernameInputSubmit()}
                    onChangeText={(value) => onChangeText('username', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.offWhite} // "#adb4bc"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={passwordInputRef}
                    onChangeText={(value) => onChangeText('password', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity
                  onPress={() => signIn()}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

SignInScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default SignInScreen;
