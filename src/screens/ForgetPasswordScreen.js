import React, {
  useState,
  // useEffect,
  useRef,
} from 'react';

import { Ionicons } from 'expo-vector-icons';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  // StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  // Alert,
  // Animated,
} from 'react-native';

import {
  Container,
  Item,
  Input,
} from 'native-base';

import colors from 'main/colors';

import styles from './styles';

function ForgotPasswordScreen() {
  // input refs
  const newPasswordInputRef = useRef(null);

  const authCodeInputRef = useRef(null);

  // state hooks
  const [username, setUsername] = useState(null);

  const [authCode, setAuthCode] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  // input handlers
  function onChangeText(key, value) {
    console.log('key:', key);
    console.log('value:', value);

    if (key === 'username') {
      setUsername(value);
    } else if (key === 'authCode') {
      setAuthCode(value);
    } else if (key === 'newPassword') {
      setNewPassword(value);
    }
  }

  function handleUsernameInputSubmit() {
    newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleNewPasswordInputSubmit() {
    authCodeInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleAuthCodeInputSubmit() {
    // emailInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={23}
      >
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Infos */}
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                {/* Username */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-person" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#adb4bc"
                    keyboardType="email-address"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => handleUsernameInputSubmit()}
                    onChangeText={(value) => onChangeText('username', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Send code
                  </Text>
                </TouchableOpacity>
                {/* the New password section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="New password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={newPasswordInputRef}
                    onSubmitEditing={() => handleNewPasswordInputSubmit()}

                    onChangeText={(value) => onChangeText('newPassword', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                {/* Code confirmation section  */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-apps" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Confirmation code"
                    placeholderTextColor="#adb4bc"
                    keyboardType="numeric"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref={authCodeInputRef}
                    onSubmitEditing={() => handleAuthCodeInputSubmit()}
                    onChangeText={(value) => onChangeText('authCode', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Confirm the new password
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  return view;
}


ForgotPasswordScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
  };
  return navbar;
};

export default ForgotPasswordScreen;
