/*
FILENAME:   DateLabelView.js
PURPOSE:    shows date to user
AUTHOR:     eric phung
DATE:       Sun Nov  3 05:41:52 2019
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

// date formatting
import { getFormattedDate } from '../functions/getFormattedDate'

class DateLabelView extends Component {
  render() {
    const dateString = getFormattedDate(this.props.date)
    console.log('Rendering Date Label Props:', this.props.date)

    return (
      <View style={styles.container}>
        <Text
          //letterSpacing={0.13}
          style={styles.date}>{ dateString }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    width: '100%',//375,
    height: 31,
    opacity: 0.5,
    backgroundColor: colors.dark,

    position: 'absolute',
    left: 0,
    top: 206,
  },

  date: {
    width: '100%',//131,
    //height: 20,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)'
  }

});


export default DateLabelView;