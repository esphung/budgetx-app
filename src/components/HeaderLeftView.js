/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput
} from 'react-native';

// ui colors
import colors from '../../colors';

class HeaderLeftView extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      text: ''
    };

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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.userImageMaskView}>
          <Image
            resizeMode={'contain'}
            style={styles.userImage}
            source={global.placeholder500x500}
          />
        </TouchableOpacity>

      {/* User Messages (Bold/Normal) */}
        <View style={styles.userMessageView}>
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
            {this.props.boldMessage}
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

            placeholder={this.props.normalMessage}//{userMessageInfo}

            placeholderTextColor = {global.basicTextColor}

            autoCompleteType={'email'}//android

            keyboardAppearance={'dark'}//ios

            //clearButtonMode={'while-editing'}//ios

            textContentType={'emailAddress'}//ios

            keyboardType={'email-address'}

            returnKeyType={'next'}

            autoCorrect={false}

            autoCapitalize={'none'}

            maxLength={22}

            onSubmitEditing={this.submitBtnPressed}

            onChangeText={(text) => this.handleTextChange(text)}

            editable={this.props.isInputEnabled}  

            //value={this.state.text}
          >
          </TextInput>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 3,
    borderWidth: global.borderWidth,
  },

  userImageMaskView: {
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,

    borderRadius: 50,
    marginLeft: global.screenWidth * 0.025,
    borderWidth:  global.borderWidth,
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    // width: 27,// if user image available???
    // height: 27,// if user image available???
    opacity: 0.2,// if no image available
    backgroundColor: "#ffffff"
  },
  userMessageView: {
    //width: 151,
    flex: 1,
    flexDirection: 'column',
    height: 36,
    justifyContent: 'center',
    marginLeft: global.screenWidth * 0.02,
    borderWidth: global.borderWidth
  }
});


export default HeaderLeftView;