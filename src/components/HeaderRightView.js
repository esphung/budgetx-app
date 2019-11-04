/*
FILENAME:   HeaderRightView.js
PURPOSE:    right sid e of header. with setttings and search btns
AUTHOR:     eric phung 
DATE:       Sun Nov  3 14:25:49 2019
*/

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { withNavigation } from 'react-navigation';

class HeaderRightView extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};

    this.searchBtnPressed = this.searchBtnPressed.bind(this)

    this.settingsBtnPressed = this.settingsBtnPressed.bind(this)
  }

  searchBtnPressed(){
    console.log('Search Button Pressed!')
  }

  settingsBtnPressed(){
    this.props.navigation.navigate('Settings')
  }

  render() {
    return (
      <View style={
            {
              //flex: 1,
              flexDirection: 'row',
              //alignItems: 'center',

              //justifyContent: 'center',
              //height: '100%',//global.screenHeight * 0.05,
              width: global.screenWidth * 0.25,

              position: 'relative',
              //left: 0,
              right: 3,
              top: 8,


              //marginRight: global.screenWidth * 0.01,
              borderWidth: global.borderWidth,
            }
          }>
            {/* Search Button */}
            <TouchableOpacity onPress={this.searchBtnPressed}
              style={styles.searchBtnTouchableOpacity}>

            <Image
              resizeMode={'contain'}
              style={styles.searchImage}
              source={global.searchIcon}
            /> 

            </TouchableOpacity>
      
          {/* Settings Button */}
            <TouchableOpacity
              onPress={this.settingsBtnPressed}
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