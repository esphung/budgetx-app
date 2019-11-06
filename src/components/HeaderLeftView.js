/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
*/

function isValidEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    //alert("You have entered an invalid email address!")
    return (false)
}

'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  Platform
} from 'react-native';

import * as Font from 'expo-font';

// ui colors
import colors from '../../colors';

class HeaderLeftView extends Component {

  async componentWillMount() {
    if (Platform.OS === 'android') {
      // load sf pro fonts
      await Font.loadAsync({
        'SFProDisplay-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SFProDisplay-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf')
      });
    }
    
    this.setState({ fontsAreLoaded: true })

  }

  constructor(props) {
    super(props);
  
    this.state = {
      text: '',
      fontsAreLoaded: false
    }

    this.boldMessage = (this.props.boldMessage) ? this.props.boldMessage : 'Get cross-device sync'

    this.normalMessage = (this.props.normalMessage) ? this.props.normalMessage : 'Enter your email'

    // validate email and turn off email input
    if (isValidEmail(this.normalMessage))
      this.isInputEnabled = false


    this.handleTextChange = this.handleTextChange.bind(this)

    this.submitBtnPressed  = this.submitBtnPressed.bind(this)
  }

  handleTextChange(text){
    this.setState({text})
    console.log(text)
  }

  submitBtnPressed(text){
    console.log(this.state)
  }

  getView(){
    if (this.state.fontsAreLoaded) {
      return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.userImageMaskView}>
                <Image
                  resizeMode={'contain'}
                  style={styles.userImage}
                  source={global.placeholder500x500}
                />
              </TouchableOpacity>

              <View style={styles.userMessageView}>
                <Text style={
                  {
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
                    fontSize: 15,
                    fontStyle: 'normal',
                    letterSpacing: 0.12,
                    color: '#ffffff',
                    //borderWidth: global.borderWidth,
                    fontWeight: '600',
                  }
      
      
                }>

                  { this.boldMessage }

                </Text>
      
                <TextInput
                  style={
                    {
                      fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
                      fontSize: 15,
                      fontStyle: 'normal',
                      letterSpacing: 0.1,
                      color: '#ffffff',
                      //backgroundColor: global.backgroundColor,
                      //borderWidth: global.borderWidth,
                    }
                  }
      
                  placeholder={this.normalMessage}//{userMessageInfo}
      
                  placeholderTextColor = {'#ffffff'}
      
                  autoCompleteType={'email'}//android
      
                  keyboardAppearance={'dark'}//ios
      
                  textContentType={'emailAddress'}//ios
      
                  keyboardType={'email-address'}
      
                  returnKeyType={'next'}
      
                  autoCorrect={false}
      
                  autoCapitalize={'none'}
      
                  autoCompleteType={'email'}
      
                  maxLength={22}
      
                  onSubmitEditing={this.submitBtnPressed}
      
                  onChangeText={(text) => this.handleTextChange(text)}
      
                  editable={this.isInputEnabled}  
      
                  value={this.state.text}>
      
                </TextInput>
      
              </View>
      
            </View>

      )

    }
    else {
      return (
        <View style={{ marginLeft: 15, marginTop: 15, backgroundColor: colors.darkTwo}}>
          <ActivityIndicator size='large' color='#ffffff' />
        </View>
      )
    }
  }

  render() {
    
    //console.log('Rendered HeaderLeftView Fonts Are Loaded:', this.state.fontsAreLoaded)
    return (
      this.getView()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    //marginLeft: 3,

    //position: 'relative',
    left: 14,
    top: 9,
    borderWidth: global.borderWidth,
  },

  userImageMaskView: {
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,

    borderRadius: 50,
    //marginLeft: global.screenWidth * 0.025,
    borderWidth:  global.borderWidth,
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    // width: 27,// if user image available???
    // height: 27,// if user image available???
    opacity: 0.2,// if no image available
    backgroundColor: '#ffffff'
  },

  userMessageView: {
    // flex: 1,
    // flexDirection: 'column',
    height: 36,
    left: 12,
    // justifyContent: 'center',
    // marginLeft: global.screenWidth * 0.02,
    borderWidth: global.borderWidth
  }
});


export default HeaderLeftView;