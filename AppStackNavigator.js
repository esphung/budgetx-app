/*
FILENAME:   StackNavigator.js
PURPOSE:    app navigation | budget x
AUTHOR:     Eric Phung
CREATED:    11/11/2019 11:23 PM
UPDATED:    11/27/2019 12:40 AM
            12/09/2019 01:10 PM
            12/11/2019 05:34 PM | added Customize Categories Screen
*/

// function truncateString(str, num) {
//   if (str.length <= num) {
//     return str
//   }
//   return str.slice(0, num)
// }

import React from 'react';

import {
  Image,
} from 'react-native'

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer, NavigationContainer } from 'react-navigation';

// import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
// import Search from './src/screens/Search';
// import Terms from './src/screens/Terms';

import CustomizeCategoriesScreen from './src/screens/CustomizeCategoriesScreen';

import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

import WelcomeScreen from './src/screens/WelcomeScreen';

import SignInScreen from './src/screens/SignInScreen';

import SignUpScreen from './src/screens/SignUpScreen';

import SignOutScreen from './src/screens/SignOutScreen';

import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';

// import ExampleScreen from './src/screens/ExampleScreen';

import MetricsScreen from './src/screens/MetricsScreen';

// import OnboardingPages from './src/screens/OnboardingPages';

import MyAppIntroSlider from './src/screens/MyAppIntroSlider';

import colors from './colors';

const StackNavigator = createStackNavigator({
  // OnboardingPages: {
  //   screen: OnboardingPages,
  //   navigationOptions: () => ({
  //     title: `${global.appName} ${global.appVersion}`, // ScreenName, // for the header screen // `Welcome to this App`
  //     headerBackTitle: null,
  //   }),
  // },

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
      // title: `Welcome to ${global.appName} ${global.appVersion}`, // ScreenName, // for the header screen // `Welcome to this App`
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
  // ExampleScreen: {
  //   screen: ExampleScreen, // ApolloProviderHOC(Home),
  //   navigationOptions: () => ({
  //     title: '',
  //     headerBackTitle: null,
  //   }),
  // },
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
      // title: `${global.appName}`, // ScreenName, // for the header screen // `Welcome to this App`
      // headerBackTitle: '',
      title: '',

      // headerStyle: {
      //   backgroundColor: 'transparent'
      // },
      // headerLeft: null,

      // headerTransparent: {}
    }),
  },
},
{
  // initialRouteName: 'Calendar',
  defaultNavigationOptions: {
    // headerMode: 'screen',
    cardStyle: {
      backgroundColor: colors.darkTwo,
      // opacity: 1,
    },
    // headerBackImage: () => {return <Image />},
    headerBackTitleVisible: false,



    // headerStyle: {
    //     backgroundColor: '#28F1A6',
    //     elevation: 0,
    //     shadowOpacity: 0
    // },
      // headerTintColor: '#333333',
      // headerTitleStyle: {
      //     fontWeight: 'bold',
      //     color: '#ffffff'
      // }
  }

},
// {
//   mode: 'modal',
//     headerMode: 'none',
// }


);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
