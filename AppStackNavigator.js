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

import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

// import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
// import Search from './src/screens/Search';
import Terms from './src/screens/Terms';

import CustomizeCategoriesScreen from './src/screens/CustomizeCategoriesScreen'

import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

//Import HOC component that instantiates the connection to the AppSync API
import ApolloProviderHOC from './src/components/ApolloProviderHOC';

const StackNavigator = createStackNavigator({
  // Login: {
  //   screen: Login,
  // },
  Home: {
    screen: Home, // ApolloProviderHOC(Home),
    navigationOptions: () => ({
      title: '',
      headerBackTitle: null,
    }),
  },
  Settings: {
    screen: Settings, // ApolloProviderHOC(Settings),
    navigationOptions: () => ({
      title: 'Settings',
      headerBackTitle: null,
    }),
  },
  Terms: {
    screen: Terms,
    navigationOptions: () => ({
      title: 'Terms of Service',
      headerBackTitle: '',
    }),
  },

  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
  },
  CustomizeCategoriesScreen: {
    screen: CustomizeCategoriesScreen, // ApolloProviderHOC(CustomizeCategoriesScreen),
    navigationOptions: () => ({
      title: 'Customize Categories',
      headerBackTitle: '',
    }),
  },

  // Search: {
  //   screen: Search,
  // },
  // initialRouteName: 'Home',
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
