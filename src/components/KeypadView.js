import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

// ui colors
import colors from '../../colors';

import KeypadButton from './KeypadButton';

class KeypadView extends Component {
  constructor(props) {
    super(props);

    // send value to Home view
    const { handlePress } = this.props;

    this.handlePress = handlePress;
  }

  render() {
    return (

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
          <KeypadButton value={1} onPress={() => this.handlePress(1)} />
          <KeypadButton value={2} onPress={() => this.handlePress(2)} />
          <KeypadButton value={3} onPress={() => this.handlePress(3)} />
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
          <KeypadButton value={4} onPress={() => this.handlePress(4)} />
          <KeypadButton value={5} onPress={() => this.handlePress(5)} />
          <KeypadButton value={6} onPress={() => this.handlePress(6)} />
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
          <KeypadButton value={7} onPress={() => this.handlePress(7)} />
          <KeypadButton value={8} onPress={() => this.handlePress(8)} />
          <KeypadButton value={9} onPress={() => this.handlePress(9)} />
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
          <KeypadButton value="Add" onPress={() => this.handlePress('Add')} />
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
