import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from '../../../colors';

function StickyDateHeader(props) {
  const { date } = props;

  // hooks
  const [currentDate] = useState(new Date(date));

  const [formattedDateString, setFormattedDateString] = useState('');

  const [todaysDate] = useState(new Date());

  useEffect(() => {
    // console.log('mount and update');
    setFormattedDateString(getFormattedDate());
    return () => {
      // console.log('will unmount');
      // console.log('currentDate:', currentDate)
      // console.log(formattedDateString);
    };
  }, []);

  const getFormattedDate = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = dayNames[currentDate.getDay()];
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1; //January is 0!
    let yyyy = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minutes<10){ minutes='0'+minutes }

    // set 'today' label
    if (currentDate.getDay() === todaysDate.getDay()) {
      day = 'Today';
    }

    //return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    return day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10)
  }

  const view = (
    <View style={styles.container}>
      <Text style={styles.dateLabelText}>
        { formattedDateString }
      </Text>
    </View>
  );
  return view;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    width: '100%', // 375,
    height: 31,
    opacity: 0.9, // 0.5
    backgroundColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  dateLabelText: {
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
