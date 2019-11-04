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
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';

// import { ListItem } from 'react-native-elements'

// date formatting
import { getFormattedDate } from '../functions/getFormattedDate'

// ui colors
import colors from '../../colors';


function getMinusSymbol(item){
  if(item.category.type.includes('expense'))
    return '-'
}

class TransactionsView extends Component {
  getEmptyTransactionsView(){
    return (
      <View style={
        {
          position: 'absolute',
          //left: 84,
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

  getItemSymbol(item){
    return (
      <Text style={{
        flex: 0.05,

        color: item.category.color,

        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
      }}>
        o
      </Text>
      )
  }

  getItemCategory(item){
    return (
      <Text style={
        {
          flex: 1,

          //width: 'auto',
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,

          marginHorizontal: 10,

          color: '#ffffff7f',//'rgba(255, 255, 255, 0.5)',



          //backgroundColor: colors.darkTwo,

          // borderWidth: 1,
          // borderColor: 'black',
          // borderStyle: 'solid',
        }
      }>

        {item.category.name}

      </Text>
      )
    }

    getItemPayee(item){
      return (
        <Text style={
          {
            flex: 1,
            //width: 'auto',
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.13,

            marginHorizontal: 10,

            //color: 'rgba(255, 255, 255, 0.5)',



            //backgroundColor: colors.darkTwo,

            // borderWidth: 1,
            // borderColor: 'black',
            // borderStyle: 'solid',
          }
        }>

        {item.payee}

        </Text>
      )
    }

  getItemAmount(item){
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //width: '100%',



        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
      }}>

      <Text>

          <Text style={{
            flex: 1,
            //textAlignVertical: 'center',
            width: '100%',
            height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,
   
            color: '#ffffff7f',
          }}>{getMinusSymbol(item)}</Text>

          <Text style={{
            flex: 1,

            width: '100%',
            height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,

            color: '#ffffff',

          }}>{item.amount}</Text>
          

          <Text style={{
                flex: 0.1,
                //textAlignVertical: 'center',
                width: '100%',
                height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.29,
             
                color: '#ffffff7f',

                marginVertical: 8,
                paddingRight:  12,
          }}>$
          </Text>

        </Text>

      </View>
    )

  }

  getItemText(item){
    return (

      <View style={{
        flex: 1,
        flexDirection: 'row',

        paddingVertical: 8,

        marginHorizontal: 12,

      }}>

        {/*. item Symbol*/}
        {this.getItemSymbol(item)}


        {/* Category Name */}
        { this.getItemCategory(item) }

        {/* item payee */}
        {
          //this.getItemPayee(item)
        }


        {/* amount */}
        {this.getItemAmount(item)}


        </View>

    )
  }

  getItemView(item){
    return (
      <TouchableOpacity
      onPress={() => alert(item.amount)}
      style={
        {
          height: 37,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
      }}>
       { this.getItemText(item) }
      </TouchableOpacity>
    )

  }

  getListView(transactions){
    // make a list view for transactions
    return (
      <ScrollView style={
        {
          position: 'absolute',
          top: 240,



          width: '100%',//220,
          height: '100%',//84,

          //backgroundColor: 'lightblue',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }
      }>



        <FlatList
          data={
            // [
            //   {key: 'Devin'},
            //   {key: 'Dan'},
            //   {key: 'Dominic'},
            //   {key: 'Jackson'},
            //   {key: 'James'},
            //   {key: 'Joel'},
            //   {key: 'John'},
            //   {key: 'Jillian'},
            //   {key: 'Jimmy'},
            //   {key: 'Julie'},
            // ]
            transactions
        }

          keyExtractor={(item, index) => item.id}

          renderItem={({item}) => this.getItemView(item)}

        />

      </ScrollView>
    )
  }

  render() {
    const { transactions } = this.props
    //console.log('Rendered transactions:', transactions)
    if (transactions) {
      return this.getListView(transactions)
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