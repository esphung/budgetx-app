
import React, { useState, useEffect } from 'react';

import {
  View,
  Text
} from 'react-native';

// import * as Font from 'expo-font';

import SpinnerMask from '../SpinnerMask';

// ui colors
import colors from '../../../colors';

import { getCurrencySymbol, getFormattedDateString } from '../functions';

const SlideUpTransactionRect = (props) => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [textLabel, setTextLabel] = useState('');

  const [amount, setAmount] = useState(0.00);

  const [date, setDate] = useState(null);

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // console.log('Mount');
    retrieveData();

    if (transaction) {
      // console.log('transaction');

      setAmount(transaction.amount);

      setDate(transaction.date);

      setTextLabel(`${getFormattedDateString(date)}`); // "Amount Spent on"
    }
    // return () => {
    //   // effect
    //   // console.log('clean up');
    // };
  });

  const retrieveData = async () => {
    // load fonts
    // await Font.loadAsync({
    //   'SFProDisplay-Regular': global.SFProDisplayRegularFont,
    //   'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    // });
    setTransaction(props.transaction);

    setDataIsLoaded(true);
  };

  let view = <SpinnerMask />;

  if (dataIsLoaded && transaction) {
    view = (
      <View style={rectangle2}>

        <Text style={copy9}>{ textLabel }</Text>
        <Text style={copy}>
          <Text style={{ color: colors.offWhite }}>
            {`${getCurrencySymbol(amount)}`}
          </Text>
          {`${Math.abs(amount).toFixed(2)}`}
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
