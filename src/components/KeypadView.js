'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

// ui colors
import colors from '../../colors';

import KeypadButton from './KeypadButton'

class KeypadView extends Component {
  render() {
    return (

      <View style={styles.container}>
        
        {/* 1,2,3*/}
        <View style={
          {
            //flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }>
          <KeypadButton value={1} />
          <KeypadButton value={2} />
          <KeypadButton value={3} />
        </View>

        {/*4,5,6*/}
        <View style={
          {
            //flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }>
          <KeypadButton value={4} />
          <KeypadButton value={5} />
          <KeypadButton value={6} />
        </View>

        {/*7,8,9*/}
        <View style={
          {
            //flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }>
          <KeypadButton value={7} />
          <KeypadButton value={8} />
          <KeypadButton value={9} />
        </View>

        {/*Add,0,[<]*/}
        <View style={
          {
            //flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }>
          <KeypadButton value={'Add'} />
          <KeypadButton value={0} />
          <KeypadButton value={'<'} />

        </View>




      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === 'ios' ? 0.3 : 0.2,

    top: 460,

    paddingTop: 4,

    width: '100%',
    //height:  Platform.OS === 'ios' ? '30%' : '18%',//252,
    
    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',

  }// container

});


export default KeypadView;