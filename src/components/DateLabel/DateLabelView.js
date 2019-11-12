/*
FILENAME:   DateLabelView.js
PURPOSE:    shows date to user
AUTHOR:     eric phung
DATE:       Sun Nov  3 05:41:52 2019
*/
import React from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

// date formatting
import { getFormattedDate } from '../../functions/getFormattedDate';

const DateLabelView = (props) => {
  const { date } = props;
  let dateString = getFormattedDate(new Date());

  // check for null
  if (date) {
    dateString = getFormattedDate(date);
  }

  const view = (
    <View style={styles.container}>
      <Text
        style={styles.date}
      >
        { dateString }
      </Text>
    </View>
  );
  return view;
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',

    width: '100%', // 375,
    height: 31,
    opacity: 0.5,
    backgroundColor: colors.dark,

    position: 'absolute',

    top: '25.5%', // 206,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  date: {
    width: '100%', // 131,
    height: 20,
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
