/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard
} from 'react-native';

import BalanceView from '../components/BalanceView';

import DateLabelView from  '../components/DateLabelView';

import NoTransactionsView from '../components/NoTransactionsView';

import ScrollingPillCategoriesView from '../components/ScrollingPillCategoriesView';

// ui colors
import colors from '../../colors';

// import global variables
require('../../globals')

import * as Font from 'expo-font';

// home screen test data
var data = {
  date:                 null,
  transactions:         null,
  currentBalanceValue:  0,
  currentSpentValue:    0,
  categories: []
}

class Home extends Component {
  async componentWillMount() {

  }

  async componentDidMount() {
    // load sf pro fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SFProDisplay-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf')
    });
    this.setState({ fontsAreLoaded: true })

    // DateLabelView
    if (data.date)
      // use selected date
      this.setState({dateLabelView: <DateLabelView date={data.date} />})
    else
      // use today's date (default)
      data.date = new Date()
      this.setState({dateLabelView: <DateLabelView date={data.date} />})

    // TransactionsView
    if (data.transactions)
      console.log(data.transactions)
    else
      this.setState({transactionsView: <NoTransactionsView />})

  }

  state = {
    fontsAreLoaded: false
  }

  getView(){
    if (this.state.fontsAreLoaded) {
      return <View style={styles.container}>
        <BalanceView 
          currentBalanceValue=  {data.currentBalanceValue}
          currentSpentValue=    {data.currentSpentValue}
        />
{/*        { this.state.dateLabelView }
        
        { this.state.transactionsView }*/}

        <ScrollingPillCategoriesView categories={data.categories} />

      </View>
    }
    else {
      return <View />
    }
  }

  render() {
    console.log(data)

    return this.getView() 
      
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: global.backgroundColor,
    borderWidth: global.borderWidth,
  }
});

export default Home









