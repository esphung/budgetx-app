'use strict';

import React, { Component } from 'react';

// ui colors
import colors from '../../colors';

import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

class AmountInputView extends Component {

  componentDidMount() {
    if (this.props.isTextInputEnabled)
      this.setState({isTextInputEnabled: this.props.isTextInputEnabled})
    if (this.props.amount)
      this.setState({amount: this.props.amount})
  }

  constructor(props) {
    super(props);
  
    this.state = {
      amount: '',
      isTextInputEnabled: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Amount Spent:</Text>
        
        <TextInput
          editable={this.state.isTextInputEnabled}
          placeholder={ String(this.state.amount) }
          placeholderTextColor={'white'}
          keyboardType={'decimal-pad'}
          style={styles.input}>
        
        </TextInput>

        <Text style={styles.symbol}>$</Text>
        
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    flexDirection: 'row',
    width: '100%',
    height: 46,
    backgroundColor: colors.dark,

    top: 460,

  },

  label: {
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
    paddingLeft: 3,

  },

  input: {
    flex: 1,
    
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

  },

  symbol:  {
    flex: 0.1,
    //textAlignVertical: 'center',
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
    paddingRight:  12,

  }
});


export default AmountInputView;