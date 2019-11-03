/*
FILENAME:   HeaderRightView.js
PURPOSE:    right sid e of header. with setttings and search btns
AUTHOR:     eric phung 
DATE:       Sun Nov  3 14:25:49 2019
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { withNavigation } from 'react-navigation';

class HeaderRightView extends Component {
  render() {
    return (
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
              style={styles.searchBtnTouchableOpacity}>

            <Image
              resizeMode={'contain'}
              style={styles.searchImage}
              source={global.searchIcon}
            /> 

            </TouchableOpacity>
      
          {/* Settings Button */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}
              style={styles.settingsBtnTouchableOpacity}>

              <Image
                resizeMode={'cover'}
                style={styles.settingsImage}
                source={global.settingsIcon}
              />

            </TouchableOpacity>

          </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBtnTouchableOpacity: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 3,
    width: 30,
    height: 30,
    borderWidth: global.borderWidth,
    backgroundColor: global.backgroundColor,
  },

  searchImage: {
    flex: 1,
    width: '60%',
    height: '60%',
    borderWidth:  global.borderWidth,
  },

  settingsBtnTouchableOpacity: {
    flex: 1,
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: global.borderWidth,
    backgroundColor:global.backgroundColor,
  },

  settingsImage: {
    flex: 1,
    width: '90%',
    height: '90%',
    borderWidth:  global.borderWidth,
    backgroundColor: global.backgroundColor,
  },
});


export default withNavigation(HeaderRightView);