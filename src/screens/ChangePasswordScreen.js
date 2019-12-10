import React, { useState, useRef } from 'react';

import { Ionicons } from 'expo-vector-icons';

import {
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  // Alert,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';

import colors from 'main/colors';

import styles from './styles';

// AWS Amplify
import Auth from '@aws-amplify/auth';

function ChangePasswordScreen(props) {
  // hooks
  const [oldPassword, setOldPassword] = useState(null);

  const [newPassword, setNewPassword] = useState(null);

  // input refs
  const newPasswordInputRef = useRef(null);

  function onChangeText(key, value) {
    // console.log(key, value);
    // this.setState({[key]: value})
    if (key === 'oldPassword') {
      setOldPassword(value);
    } else if (key === 'newPassword') {
      setNewPassword(value);
    }
  }

  function handleOldPasswordInputSubmit() {
    newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  function handleNewPasswordInputSubmit() {
    // newPasswordInputRef.current._root.focus();
    // console.log(passwordInputRef.current._root.focus());
  }

  async function signOut() {
    // await AsyncStorage.clear()
    await AsyncStorage.removeItem('userToken');
    props.navigation.navigate('AuthLoading');
  }

  const view = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Info */}
            <Container style={styles.infoContainer}>
              <View style={styles.container}>
                <View
                  style={
                    [styles.buttonStyle, { borderRadius: 4, marginBottom: 20 }]
                  }
                >
                  <Text style={styles.buttonText}>Change password</Text>
                </View>
                {/* Old password */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="Old password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    onSubmitEditing={() => handleOldPasswordInputSubmit()}
                    onChangeText={(value) => onChangeText('oldPassword', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                {/* New password */}
                <Item rounded style={styles.itemStyle}>
                  <Ionicons active name="md-lock" style={styles.iconStyle} />
                  <Input
                    style={styles.input}
                    placeholder="New password"
                    placeholderTextColor="#adb4bc"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    ref={newPasswordInputRef}

                    onSubmitEditing={() => handleNewPasswordInputSubmit()}
                    onChangeText={(value) => onChangeText('newPassword', value)}

                    keyboardAppearance="dark"
                  />
                </Item>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>
                    Submit
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingBottom: 100,
                    }
                  }
                />
                <TouchableOpacity
                  style={
                    [styles.buttonStyle,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center',
                      },
                    ]
                  }
                  onPress={signOut}
                >
                  <Ionicons active name="md-power" style={{ color: '#fff', paddingRight: 10 }} />
                  <Text style={styles.buttonText}>
                    Sign out
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

ChangePasswordScreen.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
    // headerLeft: null,

  };
  return navbar;
};

export default ChangePasswordScreen;