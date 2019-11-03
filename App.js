/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/
// test data
data = {
  user: null
}

// import global app variables
require('./globals')

// // ui colors
// import colors from './colors';

import React from 'react'
import {
  Button,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';

// app navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

// components
import HeaderLeftView from './src/components/HeaderLeftView'

import headers from './src/styles/headers';

// check for user data
if (data.user) {
  userMessageHeaderString = data.user.name
                      
  console.log(data.user)
}
else
  userMessageHeaderString = 'Get cross-device sync'

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return {
        title: '',
        // header styling
        headerStyle: headers.headerBody,
        // left header button
        headerLeft: <HeaderLeftView normalMessage={'Enter your email'} />,

        // right header buttons
        headerRight: 
          <View style={
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

              justifyContent: 'center',
              height: '100%',//global.screenHeight * 0.05,
              width: global.screenWidth * 0.25,
              marginRight: global.screenWidth * 0.01,
              borderWidth: global.borderWidth,
            }
          }>
            {/* Search Button */}
            <TouchableOpacity onPress={''}
              style={headers.searchBtnTouchableOpacity}>

            <Image
              resizeMode={'contain'}
              style={headers.searchImage}
              source={global.searchIcon}
            /> 

            </TouchableOpacity>
      
          {/* Settings Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={headers.settingsBtnTouchableOpacity}>

              <Image
                resizeMode={'cover'}
                style={headers.settingsImage}
                source={global.settingsIcon}
              />

            </TouchableOpacity>

          </View>,

        headerTintColor: global.basicTextColor,

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
        headerStyle: headers.headerBody,
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


const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;








