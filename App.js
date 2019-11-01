// import global app variables
require('./globals')

import React from 'react'
import { Button, TouchableOpacity, Image, Text } from 'react-native'

// app navigation
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/

import Home from './src/screens/Home'
import Settings from './src/screens/Settings'

import headers from './src/styles/headers'

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return {
        title: '',
        // header styling
        headerStyle: headers.body,
        // right header button
        headerRight: 
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{marginRight: 20, borderWidth: global.borderWidth }}
          >
          <Text  style={{color: 'white'}}>Settings</Text>
          </TouchableOpacity>,
        // left header button
        headerLeft:
        <TouchableOpacity 
          style={headers.userImageTouchableOpacity}
        >
        <Image
          resizeMode={'stretch'}
          style={headers.userImage}
          source={global.placeholderUserImage}
        />
        </TouchableOpacity>,

        headerTintColor: 'white',

      }

    }

  },

  Settings: {
    screen: Settings,
    navigationOptions : ({ navigation }) => {
      return {
        title: 'Settings',
        // left header Home button
        // header styling
        headerStyle: headers.body,
        //  left side of  header
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


const AppContainer = createAppContainer(StackNavigator)

export default AppContainer








