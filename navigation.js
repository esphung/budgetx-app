// FILENAME:  StackNavigator.js
// PURPOSE:   app navigation | budget x
// AUTHOR:    Eric Phung
// CREATED:   11/11/2019 11:23 PM

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
