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

import DateLabel from  '../components/DateLabel';

class Home extends Component {
  render() {
    return (
      <View style={styles.body}>
        <BalanceView />
        <DateLabel />
      </View>
    );
  }
}


export default Home;









