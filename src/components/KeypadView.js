'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

// ui colors
import colors from '../../colors';

class KeypadView extends Component {
  render() {
    return (
      <View style={{
          flex: Platform.OS === 'ios' ? 0.35 : 0.21,

          top: 460,


          width: '100%',
          height:  Platform.OS === 'ios' ? '30%' : '18%',//252,
          backgroundColor: colors.darkTwo,

          borderWidth: 1,
          borderColor: 'white',
          borderStyle: 'solid',


      }}/>
    );
  }
}

const styles = StyleSheet.create({

});


export default KeypadView;