import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import WelcomeScreen from './src/screens/WelcomeScreen';

import SignUpScreen from './src/screens/SignUpScreen';

import SignInScreen from './src/screens/SignInScreen';

import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

import OfflineScreen from './src/screens/OfflineScreen';

// import OnboardingPages from './src/screens/OnboardingPages';

// import SignOutScreen from './src/screens/SignOutScreen';

import colors from './colors';

// Auth stack
const AuthStackNavigator = createStackNavigator({
  // OnboardingPages: {
  //   screen: OnboardingPages,
  //   navigationOptions: () => ({
  //     title: `${global.appName} ${global.appVersion}`, // ScreenName, // for the header screen // `Welcome to this App`
  //     headerBackTitle: null,
  //   }),
  // },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to ${global.appName} ${global.appVersion}`, // ScreenName, // for the header screen // `Welcome to this App`
      headerBackTitle: null,
    }),
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: 'Create a New Account',
      headerBackTitle: null,
    }),
  },
  SignInScreen: {
    screen: SignInScreen,
    initialParams:{ itemId: 42 },
    navigationOptions: () => ({
      title: 'Log In to Your Account',
      headerBackTitle: null,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: 'Create a New Password',
      headerBackTitle: null,
    }),
  },
  // SignOutScreen: {
  //   screen: SignOutScreen,
  //   navigationOptions: () => ({
  //     title: 'Device Offline',
  //     headerBackTitle: null,
  //   }),
  // },

  OfflineScreen: {
    screen: OfflineScreen,
    navigationOptions: () => ({
      title: 'Device Offline',
      headerBackTitle: null,
    }),
  },
},
{
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: colors.darkTwo,
  },
});

const AppContainer = createAppContainer(AuthStackNavigator);

export default AppContainer;
