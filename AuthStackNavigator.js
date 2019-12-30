import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import WelcomeScreen from './src/screens/WelcomeScreen';

import SignUpScreen from './src/screens/SignUpScreen';

import SignInScreen from './src/screens/SignInScreen';

import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

import OfflineScreen from './src/screens/OfflineScreen';

// import ScreenName from './src/components/ScreenName';

// import LocalAuthentication from './src/screens/LocalAuthentication';

// Auth stack
const AuthStackNavigator = createStackNavigator({
  // LocalAuthentication: {
  //   screen: LocalAuthentication,
  // },

  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to ${global.appName} ${global.appVersion}`, // ScreenName, // for the header screen // `Welcome to this App`
      headerBackTitle: 'Back',
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: 'Create a New Account',
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: 'Log In to Your Account',
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: 'Create a New Password',
    }),
  },

  OfflineScreen: {
    screen: OfflineScreen,
    navigationOptions: () => ({
      title: 'Device Offline',
    }),
  },

});

const AppContainer = createAppContainer(AuthStackNavigator);

export default AppContainer;
