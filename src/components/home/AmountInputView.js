// FILENAME:  AmountInputView.js
// PURPOSE:   view. for amount label, input, and currency symbol
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:36 PM
import React, { Component } from 'react';

import {
  // StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import CurrencyInput from './CurrencyInput';

export default function AmountInputView(props) {
  const { handleChange, value, isEditable, amountLabelText } = props;

  function handleValueChange(value) {

    handleChange(value);
  }

  return (
    <View style={styles.amountInputView}>
      <View
        style={
          {
            flex: 0.7,
            // flexDirection: 'row-reverse',
          }
        }
      >
        <Text style={[styles.amountInputLabel, {
          marginTop: 11
        }]}>
        {
        amountLabelText
      }
        </Text>
      </View>

      <View
        style={
          {
            flex: 1,
            // flexDirection: 'row-reverse',

            // paddingRight: ((!amountLabelText) ? 125 : 0),
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >
      <CurrencyInput
        onValueChange={handleValueChange}
        value={value}
        isEditable={isEditable}
        style={
        styles.amountInputCurrency
      }
      />
      </View>

      <View
        style={
          {
            flex: 0.2,
            // flexDirection: 'row-reverse',
          }
        }
      >
        {
          // amountLabelText &&
          <Text style={styles.amountInputSymbol}>$</Text>}
      </View>

    </View>
  );
}

// class AmountInputView extends Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   value: this.props.value,
//     //   isEditable: this.props.isEditable
//     // };

//     // this.state = this.props.state

//     this.handleValueChange = this.handleValueChange.bind(this);
//   }

//   handleValueChange(value) {
//     // this.setState({ value });

//     const { handleChange } = this.props;
//     handleChange(value);
//   }

//   render() {
//     const { value, isEditable } = this.props;
//     return (
//       <View style={styles.amountInput}>
//         <Text style={styles.label}>Amount Spent:</Text>

//         <CurrencyInput
//           onValueChange={this.handleValueChange}
//           value={value}
//           isEditable={isEditable}
//           style={
//           styles.input
//         }
//         />

//         <Text style={styles.symbol}>$</Text>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   amountInput: {
//     // flex: 1,
//     // width: 375,
//     height: 46,
//     justifyContent: 'center',
//     alignItems: 'center',

//     // position: 'absolute',
//     flexDirection: 'row',
//     // width: '100%',
//     // height: '100%',
//     backgroundColor: colors.dark,

    

//     // top: '62.5%', // 460,

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dashed',
//   },

//   label: {
//     // flex: 0.9,
//     flex: 1,


//     // width: '100%',
//     // height: '70%', // 30,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 19,
//     // fontWeight: 'normal',
//     // fontStyle: 'normal',
//     // letterSpacing: 0.13,
//     color: colors.offWhite,

//     // marginVertical: 8,
//     marginLeft: 12,

//     // paddingTop: 5,
//     // paddingLeft: 3,

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dotted',

//   },
//   input: {
//     width: 200,
//     // height: '70%', // 30,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 25,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     // letterSpacing: 0.29,
//     textAlign: 'right',
//     color: '#ffffff',

//     // marginVertical: 8,
//     paddingRight: 6,

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dotted',

//   },

//   symbol: {
//     flex: 0.1,
//     width: '100%',
//     // height: '70%', // 30,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 25,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     // letterSpacing: 0.29,
//     textAlign: 'right',
//     color: colors.offWhite,

//     // marginVertical: 8,
//     marginRight: 12,

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dotted',
//   }
// });

// import { Dimensions } from 'react-native'
// const screenWidth = Math.round(Dimensions.get('window').width);

// console.log(screenWidth * 0.55)


// export default AmountInputView;
