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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import BalanceView from '../components/BalanceView';

import DateLabelView from  '../components/DateLabelView';

import NoTransactionsView from '../components/NoTransactionsView';

// ui colors
import colors from '../../colors';

// import global variables
require('../../globals')

// test data
data = {
  date:           null,
  transactions:   null
}

class Home extends Component {
  componentDidMount() {
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

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <BalanceView />
          { this.state.dateLabelView }
          { this.state.transactionsView }
        </View>
      </TouchableWithoutFeedback>
    );
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









