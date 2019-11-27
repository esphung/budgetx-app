// FILENAME:  StackNavigator.js
// PURPOSE:   app navigation | budget x
// AUTHOR:    Eric Phung
// CREATED:   11/11/2019 11:23 PM
// UPDATED:   11/27/2019 12:40 AM

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

  Search: {
    screen: Search,
  }
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
