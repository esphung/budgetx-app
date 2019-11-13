/*
FILENAME:   Search.js
PURPOSE:    search screen for budget x app
AUTHOR:     eric phung
UPDATED:    11/13/2019 05:26 AM
*/
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

// ui colors
import colors from '../../colors';

const headerRight = (
  <View style={{
    flex: 1,
    width: 45,
    height: '100%', // 19.9,
    backgroundColor: colors.darkTwo,

    shadowColor: '#0000002e.68f5c28f5c28',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,

    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'dotted',
  }}
  />
);

class Search extends Component {
  static navigationOptions = () => {
    const header = {
      headerTransparent: {},
      
      headerTintColor: 'white',

      title: 'Filter by Category',

      headerRight,
    };
    return header;
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  }
});

export default Search;
