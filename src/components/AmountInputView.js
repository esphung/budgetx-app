'use strict';

function removeDollarSymbolFromString(string) {
  if (string) 
    var mystring = String(string);
  else
    throw new Error('removeDollarSymbolFromString: Given Empty Value')
  mystring = mystring.replace('$','');
  mystring = mystring.replace(' ','');
  return mystring
}


import React, { Component } from 'react';

// ui colors
import colors from '../../colors';

import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

import CurrencyInput from './CurrencyInput'

class AmountInputView extends Component {

  componentDidMount() {
    if (this.props.isEditable)
      this.setState({isEditable: this.props.isEditable})
    if (this.props.amount)
      this.setState({amount: this.props.amount})
  }

  constructor(props) {
    super(props);
  
    this.state = {
      amount: '',
      isEditable: false
    };
  }

  handleValueChange(value){
    console.log(value)
    this.setState({amount: value})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Amount Spent:</Text>





        <CurrencyInput 
          onValueChange={(value) => this.handleValueChange(value)}
          value={this.state.amount}
          isEditable={true}//this.state.isEditable}
          style={
          {

            width: '100%',
            height: 30,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 25,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,
            textAlign: 'right',
            color: '#ffffff',

            marginVertical: 8,
            //paddingRight: 6,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',

          }

        } />










        {/* original text input */}
{/*        <TextInput
          editable={this.state.isEditable}
          placeholder={ String(this.state.amount) }
          placeholderTextColor={'white'}
          keyboardType={'decimal-pad'}
          style={styles.input}>
        </TextInput>*/}

        <Text style={styles.symbol}>$</Text>
        
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '7%',//46,
    backgroundColor: colors.dark,

    top: '63%',//460,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

  },

  label: {
    //flex: 0.9,
    flex: 1,

    width: '100%',
    height: 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: '#ffffff7f',

    marginVertical: 8,
    marginLeft:  12,

    paddingTop: 5,
    //paddingLeft: 3,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  },

  input: {
    flex: 0.9,
    
    width: '100%',
    height: 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'right',
    color: '#ffffff',

    marginVertical: 8,
    paddingRight: 6,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  },

  symbol:  {
    flex: 0.1,
    width: '100%',
    height: 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.29,
    textAlign: 'right',
    color: '#ffffff7f',

    marginVertical: 8,
    marginRight:  12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',

  }
});


export default AmountInputView;