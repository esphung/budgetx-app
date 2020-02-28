/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
UPDATED:    12/04/2019 05:07 PM   | commented out Font loader
            12/05/2019 11:22 PM   | fixed  bold, norrmal messages,
            image to show updated user image
            12/11/2019 03:07 AM | added cognito user
            02/28/2020 02:36 PM | Disabled TextInput
*/


import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  // TextInput,
  // ActivityIndicator,
  Platform,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

// import { NetworkConsumer } from 'react-native-offline';

// import { Asset } from 'expo-asset';

import { AppLoading } from 'expo';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

const HeaderLeftView = (props) => {
  const { onUsernameSubmit, boldMessage, normalMessage } = props;

  // console.log('props: ', props);
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [normalMessage, setNormalMessage] = useState('Enter your email');
  // const [boldMessage, setBoldMessage] = useState('Get cross-device sync');
  // const [normalMessage, setNormalMessage] = useState('Enter your username');
  const [image, setImage] = useState(global.avatar);
  const [isReady, setIsReady] = useState(false);


  const [value, onChangeText] = React.useState(normalMessage);

  // useEffect(() => {
  //   console.log('value: ', value);
  //   return () => {
  //     // effect
  //   };
  // }, [value]);

  function _cacheResourcesAsync() {
    // // console.log('loading');
    // Auth.currentAuthenticatedUser()
    //   .then((cognito) => {
    //     // setUserToken(user.signInUserSession.accessToken.jwtToken);
    //     // console.log('username:', cognitoUser.username);
    //     // setStorageKey(cognito.username);

    //     // setNormalMessage(`${cognito.attributes.email}`);
    //     setNormalMessage(`${cognito.username}`);

    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     // Alert.alert(err);
    //   });

  }

  // useEffect(() => {
  //   if (storageKey) {
  //     // load user storage
  //     retrieveStoredSettingsImage(storageKey);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [storageKey])

  const imageView = (
    <TouchableOpacity
    disabled={true}
    style={styles.userImageMaskView}
  >
    <Image
      resizeMode="contain"
      style={styles.userImage}
      source={image} // {global.placeholder500x500}
    />
  </TouchableOpacity>
  )

  return (
      <View style={
        styles.headerLeft
        // {
        //   flexDirection: 'row',
        //   marginTop: 20,
        //   marginLeft: 15,

        //   alignItems: 'center',

        //   borderWidth: 1,
        //   borderColor: 'white',
        //   borderStyle: 'solid',
        // }
      }
      >
        {
          imageView
        }

        <View style={styles.userMessageView}>
          <Text style={styles.boldMessage}>
            {
              boldMessage
            }

          </Text>

          <TextInput
            placeholder={normalMessage}
            style={styles.normalMessage}
            editable={false}
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={() => onUsernameSubmit(value)}
            value={value}
            clearButtonMode="while-editing"
            clearTextOnFocus
            autoCorrect={false}
            autoCapitalize="none"
            enablesReturnKeyAutomatically
          >
            {
              // normalMessage
            }
          </TextInput>

        </View>

      </View>
    );
};

export default HeaderLeftView;