
// import React, { Component } from 'react';
// import {
//   TextInput,
//   View,
// } from 'react-native';

// export default class NewMessageForm extends Component {
//   render() {
//     return (
//       <View>
//         <TextInput
//           testID="messageText"
//         />
//       </View>
//     );
//   }
// }

/*
FILENAME:   App.js
PURPOSE:    Entry point for budget x app
AUTHOR:     Eric Phung
CREATED:    Fri Nov 1 2019
UPDATED:    Fri Nov  1 13:20:51 2019
            11/12/2019 02:22 PM
            11/27/2019 12:39 AM
            12/02/2019 12:58 AM | switched to user storage, iphone still has data
            12/05/2019 11:41 PM | added user.isLoggedIn to App.js entry
            12/09/2019 12:56 PM | added AuthLoadingScreen, SwitchNavigator, AUthStackNavigator
            12/10/2019 06:02 AM | Stuck at AWS suspension
            12/10/2019 01:58 PM | AWS authentication set up
            12/11/2019 02:55 PM |
            12/12/2019 09:43 AM | Pushed to App Store version 1.0.0
                                  Initialized version 1.0.1
            12/14/2019 02:14 AM | Fixed photos permission, passcode enable
            12/30/2019 07:46 AM | AWS Appsync
            01/02/2020 12:47 PM | Uploaded buggy 1.0.36, no user image on load
            01/07/2020 06:49 PM | set AppLoading onFinish to call setIsReady
                                  started app.json version 1.1.5
                                  Removed all Network stuff
                                  Added routes.js
            01/08/2020 05:47 PM | Added transaction item cell Stories
            02/04/2020 04:34 PM | Released version 2.0.0
            02/04/2020 09:00 PM | Added AWS Analytics
            03/05/2020 09:12 AM | Released version 2.0.8
            03/29/2020 11:24 AM | Added device record analytics
            04/04/2020 02:15 PM | Cross device sync finished
            04/04/2020 05:48 PM | facebook app developer integration
            04/28/2020 08:11 PM | starting version 4.1.x
            04/30/2020 07:42 PM | Added working email change with AWS
*/


// import DisplayImageExample from './DisplayImageExample';

import './globals'; // global values

// import {
//   getIsBackedUp,
//   getIsDeviceSynced,
//   getHasRatedUs,
//   getIsDeviceSyncOn,
//   setIsDeviceSynced,
//   getAuthenticated,
// } from './globals';

import React, { useState } from 'react';

import {
  View,
  // Platform,
  // StyleSheet,
  // AsyncStorage
} from 'react-native';

// import the Analytics category
// import Analytics from '@aws-amplify/analytics';

// import Auth from '@aws-amplify/auth';

import * as Font from 'expo-font';

import { NetworkProvider } from 'react-native-offline';

import { AppLoading } from 'expo';

/* Temporary fix fo Analytics errors! */
import Amplify from 'aws-amplify';

import FlashMessage from 'react-native-flash-message';

import colors from './colors';

import SwitchNavigator from './SwitchNavigator';

// import Storybook from './storybook';

import amplify from './aws-exports';

Amplify.configure({
  ...amplify,
  Analytics: {
    // disabled: true,
  },
});

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:f1677c4d-8148-4c3e-97e0-d81ffd75c15a',
});


// const getAuthentication = async () => {
//   global.authenticated = false;
//   await Auth.currentAuthenticatedUser()
//     .then((cognito) => {
//       // console.log('cognito: ', cognito);
//       global.authenticated = (cognito) ? true : false;
//     }).catch((err) => {
//       console.log('err: ', err);
//     });
//   return global.authenticated;
// };

export default function App() {
  // state hooks
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  let view;

  async function loadApplicationResources() {
    // global.isBackedUp = await getIsBackedUp();

    // getAuthenticatedSettings()

    // load stored fonts
    try {
      await Font.loadAsync({
        'SFProDisplay-Regular': global.SFProDisplayRegularFont, // require('./assets/fonts/SF-Pro-Display-Regular.otf');
        'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
      });
      // stored fonts have been loaded
      setFontsAreLoaded(true);
    } catch (err) {
      // console.log('Error loading stored fonts: ', err);
      throw new Error('Error loading stored fonts: ', err);
    }

    // global.isDeviceSynced = await getIsDeviceSynced();

    // global.authenticated = await getAuthentication();

    // global.hasRatedUs = await getHasRatedUs();

    // global.isDeviceSyncOn = await getIsDeviceSyncOn();


  }

  // /* redirect user to storybook view if debugging */
  // if (global.isStorybookModeOn && fontsAreLoaded) {
  //   // return storybook;
  //   return <NetworkProvider><Storybook /></NetworkProvider>;
  // }

  if (!fontsAreLoaded) {
    loadApplicationResources();
    view = <AppLoading />;
  } else {
    view = (
      <NetworkProvider>
        
        {/*<DisplayImageExample uri={global.image_url} />*/}
          <SwitchNavigator />
          {/* Global Flash Message */}
          <FlashMessage
            style={
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.dark,
                opacity: 0.9,
                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
            position="top"
          />
          {/* <--- flash message is here as last component */}
        
      </NetworkProvider>
    ); // has login
  }
  return view;
}
