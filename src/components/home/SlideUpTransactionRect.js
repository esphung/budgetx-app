
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

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

      setTextLabel(`${getFormattedDateString(date)}`); // 'Amount Spent on'
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
      <View style={styles.container}>
      <View style={styles.rectangle2}>

        <Text style={copy9}>{ textLabel }</Text>
        <Text style={copy}>
          <Text style={{ color: colors.offWhite }}>
            {`${getCurrencySymbol(amount)}`}
          </Text>
          {`${Math.abs(amount).toFixed(2)}`}
        </Text>

        {/*

        <TouchableOpacity style={
          {

            top: '35%',
            
            width: '100%',
            // // height: 46,
            height: '100%',
            backgroundColor: colors.dark,

            // borderWidth: 2,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }>
        
          <View style={
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

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

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',

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
    flex: 1,
    alignItems: 'center',
    width: '100%', // 346,
    
    // borderWidth: 2,
    // borderColor: 'white',
    // borderStyle: 'dashed',  
  },
  rectangle2: {
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
  }
});

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
