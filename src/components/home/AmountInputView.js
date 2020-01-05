// FILENAME:  AmountInputView.js
// PURPOSE:   view. for amount label, input, and currency symbol
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 02:36 PM
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

import CurrencyInput from './CurrencyInput';

class AmountInputView extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   value: this.props.value,
    //   isEditable: this.props.isEditable
    // };

    // this.state = this.props.state

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(value) {
    // this.setState({ value });

    const { handleChange } = this.props;
    handleChange(value);
  }

  render() {
    const { value, isEditable } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Amount Spent:</Text>

        <CurrencyInput
          onValueChange={this.handleValueChange}
          value={value}
          isEditable={isEditable}
          style={
          styles.input
          

        }
        />

        <Text style={styles.symbol}>$</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '6%', // 46,
    backgroundColor: colors.dark,

    top: '63%', // 460,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

  },

  label: {
    // flex: 0.9,
    flex: 1,


    width: '100%',
    // height: '70%', // 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: '#ffffff7f',

    // marginVertical: 8,
    marginLeft: 12,

    paddingTop: 5,
    // paddingLeft: 3,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  },

  input: {
    width: 200,
    // height: '70%', // 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'right',
    color: '#ffffff',

    // marginVertical: 8,
    paddingRight: 6,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  },

  symbol: {
    flex: 0.1,
    width: '100%',
    // height: '70%', // 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'right',
    color: '#ffffff7f',

    // marginVertical: 8,
    marginRight: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  }
});

// import { Dimensions } from 'react-native'
// const screenWidth = Math.round(Dimensions.get('window').width);

// console.log(screenWidth * 0.55)


export default AmountInputView;
