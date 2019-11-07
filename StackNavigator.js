// FILENAME:  StackNavigator.js
// PURPOSE:   app navigation
// AUTHOR:    Eric Phung
// CREATED:   date

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    // navigationOptions : ({ navigation }) => {
    //   return {
    //     headerBackTitle: null,
    //   }
    // }
  },

  Settings: {
    screen: Settings,
  },
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
