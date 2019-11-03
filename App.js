/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/
// test data
data = {
  user: {
    email: null,
    name: null
  }
}

// import global app variables
require('./globals')

// // ui colors
// import colors from './colors';

import React from 'react'
import {
  StyleSheet,
} from 'react-native';

// app navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

// header components
import HeaderLeftView from './src/components/HeaderLeftView'
import HeaderRightView from './src/components/HeaderRightView'

leftHeaderView = function(){
  if (data.username && data.user.email) {
    // user has name and email
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
          />
  }
}

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return {
        title: '',

        headerStyle: styles.container,

        headerLeft: leftHeaderView,
        
        headerRight: <HeaderRightView />,

        headerTintColor: 'white',

      }

    }

  },

  Settings: {
    screen: Settings,
    navigationOptions : ({ navigation }) => {
      return {
        title: 'Settings',
        headerStyle: styles.container,
        headerLeft: 
          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            style={{marginLeft: 20, borderWidth: global.borderWidth }}
          >
          <Text style={{color: 'white'}}>Home</Text>
          </TouchableOpacity>,

        headerTintColor: 'white',

      }

    }

  },

})

const styles = StyleSheet.create({
  container: {
    height:  global.screenHeight * 0.08,
    backgroundColor: global.backgroundColor,
    borderBottomWidth: global.borderWidth,
  },
});


const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;








