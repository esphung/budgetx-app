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

  constructor(props) {
    super(props);
  
    this.state = {};

    // send value to Home view
    this.handlePress  = this.props.handlePress
  }

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
          <KeypadButton value={1} onPress={() => this.handlePress(1)} />
          <KeypadButton value={2} onPress={() => this.handlePress(2)} />
          <KeypadButton value={3} onPress={() => this.handlePress(3)} />
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
          <KeypadButton value={4} onPress={() => this.handlePress(4)} />
          <KeypadButton value={5} onPress={() => this.handlePress(5)} />
          <KeypadButton value={6} onPress={() => this.handlePress(6)} />
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
          <KeypadButton value={7} onPress={() => this.handlePress(7)} />
          <KeypadButton value={8} onPress={() => this.handlePress(8)} />
          <KeypadButton value={9} onPress={() => this.handlePress(9)} />
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
          <KeypadButton value={'Add'} onPress={() => this.handlePress('Add')} />
          <KeypadButton value={0} onPress={() => this.handlePress(0)} />
          <KeypadButton value={'<'} onPress={() => this.handlePress('<')} />

        </View>




      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    top: '69%',//460,

    //paddingBottom: 16,

    width: '100%',

    height: '29%',//252,
    
    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

  }// container

});


export default KeypadView;