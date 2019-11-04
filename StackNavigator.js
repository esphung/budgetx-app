import React from 'react'

// app navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

// header components
import HeaderLeftView from './src/components/HeaderLeftView'
import HeaderRightView from './src/components/HeaderRightView'

// dimensions
import { Dimensions } from "react-native";

global.screenWidth = Math.round(Dimensions.get('window').width);

// placeholder images
global.placeholderUserImage = require('./assets/user-placeholder-200x250.png')

global.placeholder500x500 = require('./assets/placeholder500x500.png')

global.searchIcon  = require('./assets/search-icon.png')

global.settingsIcon  = require('./assets/settings-icon.png')

leftHeaderView = function() {
  if (data.user.email) {
    // user has email
    return <HeaderLeftView 
              boldMessage={data.user.name}
              normalMessage={data.user.email} 
              isInputEnabled={false}

          />
  }
  else {
    // unknown user information
    return <HeaderLeftView 
              boldMessage={'Get cross-device sync'}
              normalMessage={'Enter your email'} 
              isInputEnabled={true}
              fontsAreLoaded={true}
          />
  }

}

rightHeaderView = function() {
  return <HeaderRightView />
}

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return { 
        headerBackTitle: null
      }
    }
  },

  Settings: {
    screen: (Settings),
  },

})

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;








