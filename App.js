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

// ui colors
import colors from './colors';

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

import headers from './src/styles/headers';

const userMessageView = {
  //width: 151,
  flex: 1,
  flexDirection: 'column',
  height: 36,
  justifyContent: 'center',
  marginLeft: global.screenWidth * 0.02,
  borderWidth: global.borderWidth,
};

const mask = {
  width: 33,
  height: 33,
  backgroundColor: colors.darkGreyBlue,

  borderRadius: 50,
  marginLeft: global.screenWidth * 0.025,
  borderWidth:  global.borderWidth,
};

const userEmailInfoView = {
  width: 27,
  height: 27,
  opacity: 0.2,
  backgroundColor: "#ffffff"
};


const userMessageInfo =   'Enter your email'

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
        headerLeft:
        <View style={
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: global.screenWidth * 0.7,
            marginLeft: global.screenWidth * 0.015,
            paddingBottom: global.screenHeight * 0.005,//4,
            borderWidth: global.borderWidth,
          }
        }>
          <TouchableOpacity style={mask}>
            <Image
              resizeMode={'contain'}
              style={
                userEmailInfoView,
                headers.userImage
              }
              source={global.placeholder500x500}
            />
          </TouchableOpacity>

            <View style={userMessageView}>
              <Text style={
                {
                  flex: 1,
                  height: '100%',
                  width: '100%',

                  fontFamily: "SFProDisplay",
                  fontSize: global.smallTextFontSize,//15,
                  fontStyle: "normal",
                  letterSpacing: 0.12,
                  color: global.basicTextColor,
                  borderWidth: global.borderWidth,
                  fontWeight: "600",
                }

              }>
                { userMessageHeaderString }
              </Text>

              <TextInput 
                style={
                  {
                    flex: 1,
                    height: '100%',
                    width: '100%',

                    fontFamily: "SFProDisplay",
                    fontSize: global.smallTextFontSize,//15,
                    fontStyle: "normal",
                    letterSpacing: 0.12,
                    color: global.basicTextColor,
                    backgroundColor: global.backgroundColor,
                    borderWidth: global.borderWidth,
                  }
                }

                placeholder={userMessageInfo}

                placeholderTextColor = {global.basicTextColor}

                autoCompleteType={'email'}//android

                keyboardAppearance={'dark'}// ios

                clearButtonMode={'while-editing'}//ios

                //clearTextOnFocus={true}//ios

                keyboardType={'email-address'}

                autoCorrect={false}

                autoCapitalize={'none'}

                maxLength={22}

                //onChangeText={(text) => this.setState({textInput})}
                //value={this.state.textInput}
              >
              </TextInput>

            </View>

          </View>,

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








