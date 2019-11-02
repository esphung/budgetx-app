/*
FILENAME:   App.js
PURPOSE:    entry point for app
AUTHOR:     eric phung
DATE:       Fri Nov  1 13:20:51 2019
*/

// import global app variables
require('./globals')

import React from 'react'
import { Button, TouchableOpacity, Image, Text, View } from 'react-native'

// app navigation
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'


import Home from './src/screens/Home'
import Settings from './src/screens/Settings'

import headers from './src/styles/headers'

//placeholder500x500.png

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return {
        title: '',

        // header styling
        headerStyle: headers.headerBody,

        // left header button
        headerLeft:
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          marginLeft: global.screenWidth * 0.015,
          borderWidth: global.borderWidth,
        }}>
          <TouchableOpacity style={headers.userImageTouchableOpacity}>
            <Image
              resizeMode={'contain'}
              style={headers.userImage}
              source={global.placeholder500x500}
            />
          </TouchableOpacity>

          <View style={
            {
              flex: 1,
            }
          }>
            <View style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              //height: global.screenHeight * 0.04,
              //paddingLeft: 8,
              marginLeft: global.screenWidth * 0.02,
              marginRight:  6,
              backgroundColor: global.backgroundColor,
              borderWidth: global.borderWidth,
            }}>
              <Text style={
                {
                  //flex: 0.3,
                  lineHeight: 18,
                  fontSize: global.basicTextFontSize,
                  fontWeight:  '600',
                  //textAlign: 'left',
                  //textAlignVertical : 'top',
                  color: global.basicTextColor,
                  backgroundColor: global.backgroundColor,
                  borderWidth: global.borderWidth,
                }
              }>
                Get cross-device sync
              </Text>

              <Text style={
                {
                  //flex: 0.3,
                  lineHeight: 18,
                  //textAlign: 'left',
                  //textAlignVertical : 'top',
                  fontSize: global.basicTextFontSize,
                  color: global.basicTextColor,
                  backgroundColor: global.backgroundColor,
                  borderWidth: global.borderWidth,
                }
              }>Enter your email</Text>
            </View>
          </View>

        </View>,

        // right header buttons
        headerRight: 
          <View style={
            {
              //flex: 1,
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
                resizeMode={'center'}
                style={headers.settingsImage}
                source={global.settingsIcon}
              />

            </TouchableOpacity>

          </View>,
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


const AppContainer = createAppContainer(StackNavigator)

export default AppContainer








