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

function getFormattedDate(today) 
{
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var day  = week[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu }

    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    //return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
    return day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10)

}

class DateLabelView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.date)
  
    this.state = {};
  }
  render() {
    const dateString = getFormattedDate(this.props.date)
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{ dateString }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,

    width: '100%',//375,
    height: 31,
    opacity: 0.5,
    backgroundColor: colors.dark
  },

  date: {
    width: '100%',//131,
    height: 20,
    fontFamily: "SFProDisplay",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.13,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)"
  }

});


export default DateLabelView;