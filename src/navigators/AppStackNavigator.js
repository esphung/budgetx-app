/*
FILENAME:   StackNavigator.js
PURPOSE:    app navigation | budget x
AUTHOR:     Eric Phung
CREATED:    11/11/2019 11:23 PM
*/

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import Home from 'src/screens/Home';

import Settings from 'src/screens/Settings';

import CustomizeCategoriesScreen from 'src/screens/CustomizeCategoriesScreen';

import ChangePasswordScreen from 'src/screens/ChangePasswordScreen';

import WelcomeScreen from 'src/screens/WelcomeScreen';

import SignInScreen from 'src/screens/SignInScreen';

import SignUpScreen from 'src/screens/SignUpScreen';

import SignOutScreen from 'src/screens/SignOutScreen';

import ForgetPasswordScreen from 'src/screens/ForgetPasswordScreen';

import MyAppIntroSlider from 'src/screens/MyAppIntroSlider';

import colors from 'src/colors';

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: '',
      // headerBackTitle: '',
      // headerTransparent: {},
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.darkTwo,
      },
      headerBackTitleVisible: false,

      // headerStyle: {},
      // headerTitleStyle: {},
      // cardStyle: styles.defaultCardStyle,
      // headerTitle: null,
      // headerTintColor: colors.black,
      // headerLeft: null,
      // headerTransparent: {},
    }),
  },
  Settings: {
    screen: Settings, // ApolloProviderHOC(Settings),
    navigationOptions: () => ({
      title: 'Settings',
      headerStyle: {
        backgroundColor: colors.dark,
      },
      headerTintColor: colors.white,
    }),
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: () => ({
      title: '',
        headerTransparent: {},
        headerTintColor: colors.white,
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
