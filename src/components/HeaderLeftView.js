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

import headers from '../styles/headers';

const userMessageInfo =   'Enter your email'

class HeaderLeftView extends Component {
  render() {
    return (
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
        <TouchableOpacity style={styles.userImageMaskView}>
          <Image
            resizeMode={'contain'}
            style={
              styles.userImage,
              headers.userImage
            }
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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  userImageMaskView: {
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,

    borderRadius: 50,
    marginLeft: global.screenWidth * 0.025,
    borderWidth:  global.borderWidth,
  },
  userImage: {
    width: 27,
    height: 27,
    opacity: 0.2,
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