
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  // SafeAreaView,
} from 'react-native';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import SpinnerMask from '../SpinnerMask';

import SlideViewSeparator from '../SlideViewSeparator';

// ui colors
import colors from 'main/colors';

import { getCurrencySymbol, getFormattedDateString } from '../functions';

const SlideUpTransactionRect = (props) => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [textLabel, setTextLabel] = useState('');

  const [amount, setAmount] = useState(0.00);

  const [date, setDate] = useState(null);

  const [transaction, setTransaction] = useState(null);


  useEffect(() => {
    // console.log('Mount');
    setTransaction(props.transaction);

    if (transaction) {
      // console.log('transaction');

      setAmount(transaction.amount);

      setDate(transaction.date);

      setTextLabel(`${getFormattedDateString(date)}`); // 'Amount Spent on'

      
    }
    // return () => {
    //   // effect
    //   // console.log('clean up');
    // };
  });

  useEffect(() => {
    if (amount, date, transaction) {
      setDataIsLoaded(true);
    }
    return () => {
      // effect
    };
  }, [amount, date, transaction])

  // let view = <SpinnerMask />;
  let view = <View />;

  if (dataIsLoaded && transaction) {
    view = (
      <View style={styles.container}>

        <View style={styles.dateAmountRectangle}>

          <Text style={dateLabel}>{ textLabel }</Text>

          <Text style={amountLabel}>
            <Text style={{ color: colors.offWhite }}>
              {`${getCurrencySymbol(amount)}`}
            </Text>
            {`${Math.abs(amount).toFixed(2)}`}
          </Text>

          {/*
          <TouchableOpacity style={
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: colors.dark,

              // borderWidth: 2,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }>
            <View style={
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

                flexDirection: 'row',

                marginTop:10,

                // paddingVertical: 2,
              }
            }>
            <Text style={
              {
                flex: 1,
                // width: 67,
                // height: 20,
                height: '100%',
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                color: '#ffffff',

                borderWidth: 1,
                borderColor: 'white',
                borderStyle: 'solid',

              }
            }>
              Category
            </Text>

            <Text style={
              {
                flex: 1,
                height: '100%',
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                textAlign: 'right',
                color: colors.offWhite,

                borderWidth: 1,
                borderColor: 'white',
                borderStyle: 'solid',
              }
            }>
              { `${transaction.category.name} >` }
            </Text>

            </View>

          </TouchableOpacity>
          */}
        </View>
      </View>
    );
  }
  return view;
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'pink',
    // borderStyle: 'dashed',
  },

  dateAmountRectangle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%', // 346,
    // height: '50%', // 74,

    // marginTop: '2%',

    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: '#0f1725',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 16,
    shadowOpacity: 1,

    // borderWidth: 2,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});

// test label
const dateLabel = {
  // width: 242,
  // height: 18,

  // flex: 1,


  // width: '100%',
  // height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 15,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.1,
  textAlign: 'center',
  color: colors.tangerine,

  // paddingTop: 8,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// amountlabel style
const amountLabel = {
  // width: 66,
  // height: 30,

  // flex: 1,


  // width: '100%',
  // height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 25,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.29,
  textAlign: 'center',
  color: colors.white,

  // paddingBottom: 10,
  // paddingTop: 6,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

export default SlideUpTransactionRect;
