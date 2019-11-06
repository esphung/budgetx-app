/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
            04/11/2019 03:57 AM
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import * as Font from 'expo-font';

import BalanceView from '../components/BalanceView';

import DateLabelView from  '../components/DateLabelView';

import TransactionsView from '../components/TransactionsView';

import ScrollingPillCategoriesView from '../components/ScrollingPillCategoriesView';

import AmountInputView from '../components/AmountInputView'

import KeypadView from '../components/KeypadView'

// ui colors
import colors from '../../colors';

class Home extends Component {
  static navigationOptions = () => {
    return {
      headerTransparent: {},
      headerLeft: leftHeaderView,
      headerRight: rightHeaderView,
    }
  }

  async componentWillMount() {
    //load sf pro fonts
    await Font.loadAsync(
    {
      'SFProDisplay-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SFProDisplay-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf')
    })

    this.setState({ fontsAreLoaded: true })
  }

  constructor(props) {
    super(props);
  
    this.state = {
      fontsAreLoaded: false,
      value: null//data.amount
    }

    this._handlePress = this._handlePress.bind(this)

    this.handleChange = this.handleChange.bind(this)

  }

  // button events
  _handlePress(value){
    if (typeof(value) == 'number')
      this._numberBtnPressed(value)
    else if (value === 'Add')
      this._addBtnPressed()
    else if (value === '<')
      this._backspaceBtnPressed()
    else
      console.log('Pressed:', value)
      //throw new Error('Button pressed is not a digit')
  }

  _numberBtnPressed(value){
    // truncate single AND leading zeros; concatenate old + new values
    value = String(Math.trunc(Math.abs(this.state.value))) + String(value)
    this.handleChange(value)
  }

  _addBtnPressed(){
    console.log('Pressed Add Btn')
  }

  _backspaceBtnPressed(){
    //check for null, NaN, undefined, ''
    if (this.state.value) {
      var strValue = String(this.state.value)

      // pop last char from string value
      var newStr = strValue.substring(0, strValue.length - 1);
      this.handleChange(newStr)
    }
  }

  // value changes
  handleChange(value){
    // check for limit of 11 digits
    if (String(value).length > 10)
      return
    else
      this.setState({value: value})
      this.state.value = value
      console.log('Value:', this.state.value)
  }


  getView(){
    if (this.state.fontsAreLoaded) {
      return (
        <ScrollView 
          scrollEnabled={false}
          contentContainerStyle={styles.container}>

          <BalanceView
            currentBalanceValue={data.currentBalanceValue}
            currentSpentValue={data.currentSpentValue} />
          
          <DateLabelView date={data.date}/>  
          
          <TransactionsView transactions={data.transactions}/>
          
          <ScrollingPillCategoriesView categories={data.categories}/>
          
          <AmountInputView
            isEditable={false}
            value={this.state.value}
            handleChange={this.handleChange} />

          <KeypadView handlePress={this._handlePress} />

        </ScrollView>
       
      )
    }
    else {
      return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: colors.darkTwo}}>
          <ActivityIndicator size='large' color='#FFFFFF' />
        </View>
      )
    }
  }

  render() {
    return this.getView()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: colors.darkTwo,//global.backgroundColor,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});

export default Home









