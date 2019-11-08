import React, { Component } from 'react';

import {
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

class KeypadButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.btnTextColor
    // this.btnBorderWidth
    // this.btnBorderColor

    const { value } = this.props;

    if (value === 'Add') {
      // console.log(this.props.value)
      this.btnTextColor = colors.shamrockGreen;
      this.btnBorderWidth = 1;
      this.btnBorderColor = colors.shamrockGreen;
    } else {
      this.btnTextColor = '#ffffff';
      this.btnBorderWidth = 0;
      this.btnBorderColor = '#ffffff';
    }
  }

  render() {
    const { onPress, value } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={
          {
            justifyContent: 'center',
            alignItems: 'center',

            width: '30%', // 117,
            // height: 46,
            height: '100%',
            borderRadius: 5,
            backgroundColor: colors.dark,
            shadowColor: '#0c1422',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowRadius: 0,
            shadowOpacity: 1,

            borderWidth: this.btnBorderWidth,
            borderColor: this.btnBorderColor,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',

          }

        }
      >
        <Text
          style={{

            width: '100%', // 117,
            height: 30,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: Platform.OS === 'ios' ? 25 : 20,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,
            textAlign: 'center',
            color: this.btnTextColor,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

          }}
        >
          {value}
        </Text>

      </TouchableOpacity>


    );
  }
}

export default KeypadButton;
