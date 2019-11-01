// import global app variables
require('./globals')

import React from 'react'
import { Button, TouchableOpacity } from 'react-native'

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
        title: 'Home',
        // right header button
        headerRight: 
          <Button
            title={'Settings'}
            onPress={() => navigation.navigate('Settings')}
          />,
        // left header button
        headerLeft:
        <TouchableOpacity style={headers.userImageTouchableOpacity}>
        </TouchableOpacity>

      }

    }

  },
  Settings: {
    screen: Settings,
    navigationOptions : ({ navigation }) => {
      return {
        title: 'Settings',
        // left header Home button
        headerLeft: 
        <Button
          title={'Home'}
          onPress={() => navigation.goBack(null)}
        />,

      }
    }
  }
})


const AppContainer = createAppContainer(StackNavigator)

export default AppContainer








