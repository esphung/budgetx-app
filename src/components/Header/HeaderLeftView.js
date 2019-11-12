/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
*/


import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  SafeAreaView
} from 'react-native';

import * as Font from 'expo-font';

// ui colors
import colors from '../../../colors';

// import isValidEmail from '../../functions/isValidEmail';

class HeaderLeftView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      fontsAreLoaded: false
    };

    this.boldMessage = (props.boldMessage) ? props.boldMessage : 'Get cross-device sync';

    this.normalMessage = (props.normalMessage) ? props.normalMessage : 'Enter your email';

    this.isInputEnabled = props.isInputEnabled;

    // // validate email and turn off email input
    // if (isValidEmail(this.normalMessage)) {
    //   console.log(this.normalMessage)
    //   this.isInputEnabled = false;
    // }

    // console.log(this.isInputEnabled)


    this.handleTextChange = this.handleTextChange.bind(this);

    this.submitBtnPressed = this.submitBtnPressed.bind(this);
  }

  async componentWillMount() {
    // load sf pro fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });

    this.setState({ fontsAreLoaded: true });
  }

  getView() {
    const { fontsAreLoaded, text } = this.state;

    let view = (
      <View style={{ marginLeft: 15, marginTop: 20, backgroundColor: colors.darkTwo }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    if (fontsAreLoaded) {
      view = (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.userImageMaskView}>
            <Image
              resizeMode="contain"
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
                fontWeight: '600',
              }

            }
            >

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
                }
              }

              placeholder={this.normalMessage}

              placeholderTextColor="#ffffff"

              autoCompleteType="email" // android

              keyboardAppearance="dark" // ios

              textContentType="emailAddress" // ios

              keyboardType="email-address"

              returnKeyType="next"

              autoCorrect={false}

              autoCapitalize="none"

              maxLength={22}

              onSubmitEditing={this.submitBtnPressed}

              onChangeText={() => this.handleTextChange(text)}

              editable={this.isInputEnabled}

              value={text}
            />

          </View>

        </SafeAreaView>

      );
    }
    return view;
  }

  handleTextChange(text) {
    this.setState({ text });
    // console.log(text);
  }

  submitBtnPressed(text) {
    this.setState({ text });
    // console.log(text);
  }


  render() {
    // console.log('Rendered HeaderLeftView Fonts Are Loaded:', this.state.fontsAreLoaded)
    return (
      this.getView()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 20,

    marginLeft: 15,

    width: '100%',

    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  userImageMaskView: {
    flex: 0.1,
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,

    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    // width: 27,// if user image available???
    // height: 27,// if user image available???
    opacity: 0.2, // if no image available
    // backgroundColor: '#ffffff'
  },

  userMessageView: {
    flex: 1,
    // flexDirection: 'column',
    // height: '100%', // 36,
    // left: 12,
    // justifyContent: 'center',
    marginLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});


export default HeaderLeftView;