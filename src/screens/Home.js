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
  TouchableWithoutFeedback
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

  state = {
    fontsAreLoaded: false
  }
  getView(){
    if (this.state.fontsAreLoaded) {
      return (
        
        <View style={styles.container}>

          <BalanceView
            currentBalanceValue={data.currentBalanceValue}
            currentSpentValue={data.currentSpentValue}/>
          
          <DateLabelView date={data.date}/>  
          
          <TransactionsView transactions={data.transactions}/>
          
          <ScrollingPillCategoriesView categories={data.categories}/>
          
          <AmountInputView
            amount={data.amount}
            isTextInputEnabled={false}/>

          <KeypadView />

        </View>
       
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









