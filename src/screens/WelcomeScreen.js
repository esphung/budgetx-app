import React from 'react';

// import PropTypes from 'prop-types';

// import { NavigationEvents } from 'react-navigation';

import { NetworkConsumer } from 'react-native-offline';

// import { NetworkConsumer } from 'react-native-offline';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  // NetInfo,
  Image,
} from 'react-native';

// import NetInfo from '@react-native-community/netinfo';

// import {
//   Container,
// } from 'native-base';

import colors from '../../colors';

import styles from './styles';

function WelcomeScreen(props) {
  // const [connectionType, setConnectionType] = useState(null);

  const handleRoute = async (destination) => {
    await props.navigation.navigate(destination); // original single code line
  };

  // function handleFirstConnectivityChange(connectionInfo) {
  //   console.log(
  //     'Connection changed to type: ' +
  //       connectionInfo.type
  //       // +
  //       // ', effectiveType: ' +
  //       // connectionInfo.effectiveType,
  //   );
  // }


  // const clearState = () => {
  //   // NetInfo.getConnectionInfo().then((connectionInfo) => {
  //   //   setConnectionType(connectionInfo.type);
  //   //   // console.log(
  //   //   //   'Initial, type: ' +
  //   //   //     connectionInfo.type,
  //   //   // );
  //   // });
  //   // NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);

  //   // NetInfo.fetch().then((state) => {
  //   //   console.log("Connection type", state.type);
  //   //   console.log("Is connected?", state.isConnected);
  //   // });

  // };

  // useEffect(() => {
  //   clearState();

  //   // NetInfo.getConnectionInfo().then((connectionInfo) => {
  //   //   setConnectionType(connectionInfo.type);
  //   //   // console.log(
  //   //   //   'Initial, type: ' +
  //   //   //     connectionInfo.type,
  //   //   // );
  //   // });
  //   // NetInfo.addEventListener(handleFirstConnectivityChange);

  // }, []);

  // useEffect(() => {
  //   if (connectionType) {
  //     if (connectionType === 'none') {
  //       handleRoute('WelcomeScreen');
  //     }
  //   }
  //   return () => {
  //     // effect
  //     NetInfo.removeEventListener(
  //       'connectionChange',
  //       handleFirstConnectivityChange,
  //     );
  //   };
  // }, [connectionType]);

  const welcome = (
    <SafeAreaView style={styles.container}>
      {/*
      <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          // onWillFocus={clearState} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />
      */}
      <StatusBar />
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {/* App Logo */}
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
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
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // const offline = <OfflineScreen />;

  // const view = (
  //   <NetworkConsumer>
  //     {
  //       ({ isConnected }) => (isConnected ? welcome : offline)
  //     }
  //   </NetworkConsumer>
  // );

  // return view;

  return welcome;
}

WelcomeScreen.navigationOptions = () => {
  const headerRight = (
    <NetworkConsumer>
      {
        ({ isConnected }) => (isConnected ? <Image style={{ width: 50 }} source={global.wifiImage} resizeMode="contain" /> : <Image style={{ width: 50 }} source={global.noWifiImage} resizeMode="contain" />)
      }
    </NetworkConsumer>
  );
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
    headerRight: (
      <View style={
        {
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      >
        { headerRight }
      </View>
    ),
  };
  return navbar;
};

// WelcomeScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default WelcomeScreen;
