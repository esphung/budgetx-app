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
  //Keyboard
  ActivityIndicator,
} from 'react-native';

import * as Font from 'expo-font';

import BalanceView from '../components/BalanceView';

import DateLabelView from  '../components/DateLabelView';

import NoTransactionsView from '../components/NoTransactionsView';

import ScrollingPillCategoriesView from '../components/ScrollingPillCategoriesView';

// ui colors
import colors from '../../colors';

class Home extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
        headerTransparent: {
          //position: 'absolute',
          //backgroundColor: 'transparent',
        },

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
      fontsAreLoaded: false
    }
  }

  getView(){
    if (this.state.fontsAreLoaded) {

      return (
        <View style={styles.container}>

          <BalanceView 
            currentBalanceValue=  {data.currentBalanceValue}
            currentSpentValue=    {data.currentSpentValue}
          />
  
          <DateLabelView date={data.date} />
          
          <NoTransactionsView />
  
          <ScrollingPillCategoriesView categories={data.categories} />
  
        </View>
      )
    
    }
    else {
      return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: colors.darkTwo}}>
          <ActivityIndicator size='large' color='#FFFFFF' />
        </View>)
    }
  }

  render() {
    console.log('Rendered Home Screen')
    return this.getView()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkTwo,//global.backgroundColor,
  }
});

export default Home









