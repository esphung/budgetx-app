/*
FILENAME:   TransactionsView.js
PURPOSE:    shows if app has no transaction data
AUTHOR:     eric phung 
DATE:       Sun Nov  3 05:41:17 2019
*/
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import { ListItem } from 'react-native-elements'

// date formatting
import { getFormattedDate } from '../functions/getFormattedDate'

// ui colors
import colors from '../../colors';

// import global variables
//require('../../globals')

// (
//       <View style={
//         {
//           position: 'absolute',
//           left: 84,
//           top: 256,

//           width: 220,
//           height: 84,

//           borderWidth: global.borderWidth,
//           borderColor: 'white',
//           borderStyle: 'solid',
//         }
//       }>

//         <Text style={styles.header}>
//           No transactions yet.
//         </Text>

//         <Text style={styles.text}>
//           Choose category and enter amount below
//         </Text>

//       </View>
//     )



class TransactionsView extends Component {

  getEmptyTransactionsView(){
    return (
      <View style={
        {
          position: 'absolute',
          left: 84,
          top: 256,

          width: 220,
          height: 84,

        }
      }>

        <Text style={styles.header}>
          No transactions yet.
        </Text>

        <Text style={styles.text}>
          Choose category and enter amount below
        </Text>

      </View>
    )
  }



  getTransactionsListView(transactions){
    // make a list view for transactions
    return (
      <ScrollView style={
        {
          position: 'absolute',
          top: 250,

          width: '100%',//220,
          height: '100%',//84,

        }
      }>
        {
          transactions.map((l, i) => (
            <ListItem
              containerStyle={{
                bottom: 14,
                left: 2,
                backgroundColor: colors.darkTwo,
              }}
              
              onPress={() => alert(l.dateCreated)}
              
              key={i}
              
              //leftAvatar={{ source: l.iconImage }}
              
              title={
                <Text style={
                {
                  width: '100%',
                  fontFamily: 'SFProDisplay-Regular',
                  fontSize: 17,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0.13,

                  color: 'rgba(255, 255, 255, 0.5)',

                  backgroundColor: colors.darkTwo
                }
              
              }>{l.payeeName}</Text>}


              //subtitle={<Text style={{color: 'white', fontSize: 17, backgroundColor: colors.darkTwo}}>{getFormattedDate(l.dateCreated)}</Text>}
              
              //bottomDivider
            />
          ))
        }
      </ScrollView>
    )
  }

  render() {
    const { transactions } = this.props
    console.log('Rendered transactions:', transactions)
    if (transactions) {
      return this.getTransactionsListView(transactions)
    }
    else {
      return this.getEmptyTransactionsView()
    }
  }
}

const styles = StyleSheet.create({
  header: {
    opacity: 0.6,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 22,
    //fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  },

  text: {
    opacity: 0.6,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  }
});


export default TransactionsView;