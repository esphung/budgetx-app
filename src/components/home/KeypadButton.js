import React from 'react';

// import PropTypes from 'prop-types';

import {
  TouchableOpacity,
  Platform,
  Text,
  Image,
  View,
} from 'react-native';

// import {
//  // TouchableNativeFeedback,
//  // TouchableHighlight,
//  TouchableOpacity,
//  // TouchableWithoutFeedback
// } from 'react-native-gesture-handler'

// ui colors
import colors from '../../../colors';

export default function KeypadButton(props) {
  const { onPress, value } = props;

  function handlePress() {
    onPress(value);
  }

  let btnTextColor = colors.white;

  let btnBorderWidth = 0;

  let btnBorderColor = colors.white;

  let label = null;

  function numberKey(num) {
    let view = null;
    view = (
      <Text
        style={{

          // width: '100%', // 117,
          // height: 30,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.29,
          textAlign: 'center',
          shadowColor: '#0c1422',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 0,
          shadowOpacity: 1,
          color: btnTextColor,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }}
      >
        {
          num
        }
      </Text>
    );
    return view;
  }


  function addKey() {
    let view = null;
    view = (
      <Text
        style={{

          // width: '100%', // 117,
          // height: 30,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.29,
          textAlign: 'center',

          shadowColor: '#0c1422',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 0,
          shadowOpacity: 1,

          color: btnTextColor,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      >
        Add
      </Text>
    );
    return view;
  }

  function backspaceKey() {
    let view = null;
    // view = (
    //   <Text
    //     style={{

    //       width: '100%', // 117,
    //       height: 30,
    //       fontFamily: 'SFProDisplay-Regular',
    //       fontSize: Platform.OS === 'ios' ? 25 : 20,
    //       fontWeight: 'normal',
    //       fontStyle: 'normal',
    //       letterSpacing: 0.29,
    //       textAlign: 'center',

    //       color: btnTextColor,

    //       // borderWidth: 1,
    //       // borderColor: 'white',
    //       // borderStyle: 'solid',

    //     }}
    //   >
    //     Back
    //   </Text>
    // );

    view = (
      <View style={
        {
          alignItems: 'center',
          justifyContent: 'center',

          width: '100%',
          height: '100%',
          backgroundColor: colors.darkTwo,
        }
      }>
      <Image
        resizeMode="contain"
        style={
          {
            width: '50%',
            height: '50%',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        source={global.backspaceKeyIcon}
      />
      </View>
    );
    return view;
  }

  if (Number.isInteger(value)) {
    label = numberKey(value);
    // console.log(value);
  }
  else if (value === 'Add') {
    // console.log(this.props.value)
    btnTextColor = colors.shamrockGreen;
    btnBorderWidth = 1;
    btnBorderColor = colors.shamrockGreen;

    label = addKey();
  }
  else if (value === '<') {
    label = backspaceKey();
    // console.log('<');
  }

  // let label = (
  //   <Text
  //     style={{

  //       width: '100%', // 117,
  //       height: 30,
  //       fontFamily: 'SFProDisplay-Regular',
  //       fontSize: Platform.OS === 'ios' ? 25 : 20,
  //       fontWeight: 'normal',
  //       fontStyle: 'normal',
  //       letterSpacing: 0.29,
  //       textAlign: 'center',

  //       color: btnTextColor,

  //       // borderWidth: 1,
  //       // borderColor: 'white',
  //       // borderStyle: 'solid',

  //     }}
  //   >
  //     {
  //       value
  //     }
  //   </Text>
  // );
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          margin: 5,

          // width: '30%', // 117,
          // height: 46,
          height: '100%',


          borderRadius: 5,
          backgroundColor: colors.dark,


          borderWidth: btnBorderWidth,
          borderColor: btnBorderColor,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',

        }

      }
    >
      {
        label
      }

    </TouchableOpacity>


  );
}

// KeypadButton.propTypes = {
//   onPress: PropTypes.func,
//   value: PropTypes.string
// }
