
import React, { useState, useEffect } from 'react';

import {
  // StyleSheet,
  View,
  Text
} from 'react-native';

import * as Font from 'expo-font';

// ui colors
import colors from '../../../colors';

import SpinnerMask from '../SpinnerMask';

import MyComponent from "components/MyComponent";

function getCurrencySymbol(amount) {
  let symbol = '$';
  if (amount < 0) {
    symbol = '- $';
  }
  return symbol;
}

function getFormattedDateString(date) {
  const transactionDate = new Date(date);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let day = dayNames[transactionDate.getDay()];
  let dd = transactionDate.getDate();
  let mm = transactionDate.getMonth() + 1; // January is 0!
  const yyyy = transactionDate.getFullYear();
  const hours = transactionDate.getHours();
  let minutes = transactionDate.getMinutes();

  if(dd<10) { dd='0'+dd } 
  if(mm<10)  { mm='0'+mm } 
  if(minutes<10){ minutes='0'+minutes }

  // set 'today' label
  const todaysDate = new Date();
  if ((transactionDate.getDay() === todaysDate.getDay()) && (transactionDate.getMonth() === todaysDate.getMonth()) && (transactionDate.getFullYear() === todaysDate.getFullYear())) {
    day = 'Today';
  }

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  let string = day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10);

  // if different year, show the year
  if (todaysDate.getFullYear() !== yyyy) {
    string = day + ', ' + monthNames[mm - 1] + ' ' + parseInt(dd, 10) + ', ' + yyyy;
  }
  return string;
};


const SlideUpTransactionRect = (props) => {
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [textLabel, setTextLabel] = useState('');

  const [amount, setAmount] = useState(0.00);

  const [date, setDate] = useState(null);

  const [transaction, setTransaction] = useState(null);


  useEffect(() => {
    // console.log('Mounts')
    retrieveFonts();

    if (props.transaction) {
      setTransaction(props.transaction);
      // console.log(transaction)

      setAmount(props.transaction.amount);

      // console.log(props.transaction.date);

      setDate(props.transaction.date);

      setTextLabel(`${getFormattedDateString(date)}`); // Amount Spent on 
    }

    // return () => {
    //   // effect
    //   // console.log('clean up')
    // };
  });

  const retrieveFonts = async () => {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });
    setFontsAreLoaded(true);
  };

  let view = <SpinnerMask />;

  if (fontsAreLoaded) {
    view = (
      <View style={rectangle2}>

        <Text style={copy9}>{ textLabel }</Text>
        <Text style={copy}>
          <Text style={{ color: colors.offWhite }}>
            { getCurrencySymbol(amount) }
          </Text>
          { Math.abs(amount).toFixed(2) }
        </Text>
      </View>
    );
  }
  return view;
};
// view box
const rectangle2 = {

  width: '93%', // 346,
  height: '30%', // 74,


  top: '18%',

  borderRadius: 9,
  backgroundColor: colors.dark,
  shadowColor: '#0f1725',
  shadowOffset: {
    width: 5,
    height: 5
  },
  shadowRadius: 16,
  shadowOpacity: 1,

  // borderWidth: 2,
  // borderColor: 'white',
  // borderStyle: 'dashed',
};

// test label
const copy9 = {
  // width: 242,
  // height: 18,

  width: '100%',
  height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 15,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.1,
  textAlign: 'center',
  color: colors.tangerine,

  paddingVertical: 8,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// amountlabel style
const copy = {
  // width: 66,
  // height: 30,

  width: '100%',
  height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 25,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.29,
  textAlign: 'center',
  color: '#ffffff',

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

export default SlideUpTransactionRect;