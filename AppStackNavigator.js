/*
FILENAME:   StackNavigator.js
PURPOSE:    app navigation | budget x
AUTHOR:     Eric Phung
CREATED:    11/11/2019 11:23 PM
UPDATED:    11/27/2019 12:40 AM
            12/09/2019 01:10 PM
            12/11/2019 05:34 PM | added Customize Categories Screen
*/

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';

import Settings from './src/screens/Settings';

import CustomizeCategoriesScreen from './src/screens/CustomizeCategoriesScreen';

import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

import WelcomeScreen from './src/screens/WelcomeScreen';

import SignInScreen from './src/screens/SignInScreen';

import SignUpScreen from './src/screens/SignUpScreen';

import SignOutScreen from './src/screens/SignOutScreen';

import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

import MetricsScreen from './src/screens/MetricsScreen';

import MyAppIntroSlider from './src/screens/MyAppIntroSlider';

import colors from './colors';

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home, // ApolloProviderHOC(Home),
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: '',
    }),
  },
  Settings: {
    screen: Settings, // ApolloProviderHOC(Settings),
    navigationOptions: () => ({
      title: 'Settings',
      // headerBackTitle: '',
    }),
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: null,
    }),
  },
  CustomizeCategoriesScreen: {
    screen: CustomizeCategoriesScreen, // ApolloProviderHOC(CustomizeCategoriesScreen),
    navigationOptions: () => ({
      title: 'Customize Categories',
      // headerBackTitle: '',
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: null,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      // title: 'Log in to your account',
      title: '',
      // headerBackTitle: null,
      // headerBackTitle: null,
    }),
  },
  SignOutScreen: {
    screen: SignOutScreen,
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: null,
    }),
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: null,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      // title: 'Create a New Password',
      title: '',
      // headerBackTitle: null,
    }),
  },
  MetricsScreen: {
    screen: MetricsScreen, // ApolloProviderHOC(Home),
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: null,
    }),
  },
  MyAppIntroSlider: {
    screen: MyAppIntroSlider,
    navigationOptions: () => ({
      title: '',
    }),
  },
},
{
  defaultNavigationOptions: {
    cardStyle: {
      backgroundColor: colors.darkTwo,
    },
    headerBackTitleVisible: false,
  },
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
