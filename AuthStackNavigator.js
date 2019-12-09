import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

import ScreenName from './src/components/ScreenName';

// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to ${global.appName}`, // ScreenName, // for the header screen // `Welcome to this App`
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
});

const AppContainer = createAppContainer(AuthStackNavigator);

export default AppContainer;
