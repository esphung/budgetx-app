// FILENAME:  StackNavigator.js
// PURPOSE:   app navigation | budget x
// AUTHOR:    Eric Phung
// CREATED:   11/11/2019 11:23 PM
// UPDATED:   11/27/2019 12:40 AM


// function truncateString(str, num) {
//   if (str.length <= num) {
//     return str
//   }
//   return str.slice(0, num)
// }

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Search from './src/screens/Search';

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  // Search: {
  //   screen: Search,
  // },
  // initialRouteName: 'Home',
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
