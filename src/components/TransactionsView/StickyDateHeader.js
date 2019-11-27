import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

function getFormattedDate(date) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    var day  = dayNames[date.getDay()];
    var dd   = date.getDate();
    var mm   = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minutes<10){ minutes='0'+minutes }

    //return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    return day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10)
}

function StickyDateHeader(props) {
  const { date } = props;
  const dateString = getFormattedDate(new Date(date));

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
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',

    width: '100%', // 375,
    height: 31,
    opacity: 0.9, // 0.5
    backgroundColor: colors.dark,

    // position: 'absolute',

    // top: '25.5%', // 206,

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

export default StickyDateHeader;