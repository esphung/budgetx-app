'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

class KeypadButton extends Component {
  componentDidMount() {
    console.log('Set up keypad:', this.props.value)
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => alert(this.props.value)}
        style={
        {
          justifyContent: 'center',
          alignItems: 'center',

          width: '30%',//117,
          //height: 46,
          height: '100%',
          borderRadius: 5,
          backgroundColor: colors.dark,
          shadowColor: "#0c1422",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 0,
          shadowOpacity: 1,
          
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',

        }
      }>
        <Text 
        
        style={{

          width: '100%',//117,
          height: 30,
          fontFamily: "SFProDisplay-Regular",
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0.29,
          textAlign: "center",
          color: "#ffffff",

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }}>
          {this.props.value}
        </Text>

      </TouchableOpacity>


    );
  }
}

const styles = StyleSheet.create({

});


export default KeypadButton;