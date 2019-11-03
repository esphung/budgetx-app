/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
DATE:       Thu Oct 31 23:17:49 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui styles
import styles from '../styles/styles';

// // ui colors
// import colors from '../../colors';

import BalanceView from '../components/BalanceView';

import DateLabelView from  '../components/DateLabelView';

import NoTransactionsView from '../components/NoTransactionsView';

class Home extends Component {
  componentDidMount() {
    if (global.data.transactions)
      console.log(data.transactions)
    else
      this.setState({transactionsView: <NoTransactionsView />})
  }

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    return (
      <View style={styles.body}>
        <BalanceView />
        <DateLabelView />
        { this.state.transactionsView }
      </View>
    );
  }
}


export default Home;









