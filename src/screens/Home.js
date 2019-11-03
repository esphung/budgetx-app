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

// test data
data = {
  date: null,
  transactions: null
}

class Home extends Component {
  componentDidMount() {
    // check for date
    if (data.date)
          //show selected date
          this.setState({dateLabelView: <DateLabelView date={data.date} />})
    else
      // use today's date as default
      this.setState({dateLabelView: <DateLabelView />})

    // check for transactions
    if (data.transactions)
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
        { this.state.dateLabelView }
        { this.state.transactionsView }
      </View>
    );
  }
}


export default Home









