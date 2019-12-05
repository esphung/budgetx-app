import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  // Platform,
  // ActivityIndicator
} from 'react-native';

// import SpinnerMask from '../SpinnerMask'

// ui colors
import colors from '../../../colors';

import KeypadButton from './KeypadButton';

// import { Audio } from 'expo-av';

// const soundObject = new Audio.Sound();

class KeypadView extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isSoundLoaded: false
  //   };
  // }

  // async playClickSound() {
  //   try {
  //     await soundObject.loadAsync(global.clickSound);
  //     // console.log(soundObject)
  //     await soundObject.playAsync();
  //     // Your sound is playing!
  //   } catch (error) {
  //     // An error occurred!
  //     // console.log('Could not play sound for', Platform.OS);
  //   }
  // }

  btnPressed(value) {
    const { handlePress } = this.props;
    // console.log(value);
    // this.playClickSound();
    handlePress(value);
  }

  render() {
    // const spinnerView = <SpinnerMask />

    const keypadView = (
      <View style={styles.container}>
        <View style={
          {
            // flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        >
          <KeypadButton value={1} onPress={() => this.btnPressed(1)} />
          <KeypadButton value={2} onPress={() => this.btnPressed(2)} />
          <KeypadButton value={3} onPress={() => this.btnPressed(3)} />
        </View>

        <View style={
          {
            // flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        >
          <KeypadButton value={4} onPress={() => this.btnPressed(4)} />
          <KeypadButton value={5} onPress={() => this.btnPressed(5)} />
          <KeypadButton value={6} onPress={() => this.btnPressed(6)} />
        </View>

        <View style={
          {
            // flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        >
          <KeypadButton value={7} onPress={() => this.btnPressed(7)} />
          <KeypadButton value={8} onPress={() => this.btnPressed(8)} />
          <KeypadButton value={9} onPress={() => this.btnPressed(9)} />
        </View>

        <View style={
          {
            // flex: Platform.OS === 'ios' ? 0.3 : 0.3,
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',

            margin: 4,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        >
          <KeypadButton value="Add" onPress={() => this.btnPressed('Add')} />
          <KeypadButton value={0} onPress={() => this.btnPressed(0)} />
          <KeypadButton value={'<'} onPress={() => this.btnPressed('<')} />

        </View>
      </View>
    );

    // let view = spinnerView;

    const view = keypadView;

    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    top: '69%', // 460,

    paddingTop: 4,

    width: '100%',

    height: '26%', // 252,

    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

  }// container

});


export default KeypadView;
