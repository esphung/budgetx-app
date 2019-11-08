/*
FILENAME:   TransactionsView.js
PURPOSE:    shows if app has no transaction data
AUTHOR:     eric phung
DATE:       Sun Nov  3 05:41:17 2019
*/
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

// ui colors
import colors from '../../colors';

function getMinusSymbol(item) {
  let symbol = '$ ';
  if (item.category.type.includes('expense')) {
    symbol = '- $ ';
  }
  return symbol;
}

const TABLE_HEIGHT = '30%';

class TransactionsView extends Component {
  getEmptyTransactionsView = () => {
    const emptyView = (
      <View style={
            {
              position: 'absolute',
              // left: 84,
              top: 256,

              width: 220,
              height: 84,

              // borderWidth: 1,
              // borderColor: '1',
              // borderStyle: 'dashed',

            }
          }
      >
        <Text style={styles.header}>
            No transactions yet.
        </Text>

        <Text style={styles.text}>
          Choose category and enter amount below
        </Text>

      </View>
    );

    return emptyView;
  }

  getItemSymbol = (item) => {
    const view = (
      <Text style={{
        flex: 0.05,

        color: item.category.color,

        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
      }}
      >
        o
      </Text>
    );
    return view;
  }

  getItemCategory = (item) => {
    const textView = (
      <Text style={
        {
          flex: 1,

          // width: 'auto',
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,

          marginHorizontal: 10,

          color: '#ffffff7f', // 'rgba(255, 255, 255, 0.5)',

          // backgroundColor: colors.darkTwo,

          // borderWidth: 1,
          // borderColor: 'black',
          // borderStyle: 'solid',
        }
      }
      >

        {item.category.name}

      </Text>
    );
    return textView;
  }

  getItemPayee = (item) => {
    const textView = (
      <Text style={
          {
            flex: 1,
            // width: 'auto',
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.13,

            marginHorizontal: 10,

            // color: 'rgba(255, 255, 255, 0.5)',

            // backgroundColor: colors.darkTwo,

            // borderWidth: 1,
            // borderColor: 'black',
            // borderStyle: 'solid',
          }
        }
      >

        {item.payee}

      </Text>
    );
    return textView;
  }

  getItemAmount = (item) => {
    const view = (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // width: '100%',

        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
      }}
      >

        <Text>

          <Text style={{
            flex: 1,

            // textAlignVertical: 'center',
            width: '100%',
            height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,
            color: '#ffffff7f',
          }}
          >
            {getMinusSymbol(item)}
          </Text>

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

          }}
          >
            {item.amount}
          </Text>


          {/*
          <Text style={{
            flex: 0.1,
            // textAlignVertical: 'center',
            width: '100%',
            height: 20,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.29,

            color: '#ffffff7f',

            marginVertical: 8,
            paddingRight: 12,
          }}
          >
            $
          </Text>
          */}

        </Text>

      </View>
    );
    return view;
  }

  getItemText = (item) => {
    const view = (

      <View style={{
        flex: 1,
        flexDirection: 'row',

        paddingVertical: 8,

        marginHorizontal: 12,


      }}
      >

        {/* item Symbol */}
        {this.getItemSymbol(item)}


        {/* Category Name */}
        { this.getItemCategory(item) }

        {/* item payee */}
        {
          // this.getItemPayee(item)
        }


        {/* amount */}
        {this.getItemAmount(item)}


      </View>

    );
    return view;
  }

  getItemView(item) {
    return (
      <TouchableOpacity
        onPress={() => console.log(item)}
        style={
          {
            height: 37,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >
        { this.getItemText(item) }
      </TouchableOpacity>
    );
  }

  getListView(transactions) {
    // make a list view for transactions
    return (

      <ScrollView style={
        {
          // flex: 1,
          position: 'absolute',
          top: '30%', // 240,

          width: '100%', // 220,
          height: TABLE_HEIGHT, // 84,

          // backgroundColor: 'lightblue',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }
      }
      >

        <SwipeListView
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.rowFront}>{this.getItemView(item)}</View>
          )}
          renderHiddenItem={() => (
            <View style={{ flexDirection: 'row', }}>
              <View style={{
                flex: 1,
                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }}
              />
              <View style={styles.rowBack}>

                <TouchableOpacity>
                  <Text style={{
                    width: '100%',
                    // width: 47,
                    height: 20,
                    fontFamily: 'SFProDisplay-Regular',
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0.13,
                    color: '#ffffff',

                    marginRight: 12,

                    // borderWidth: 1,
                    // borderColor: 'white',
                    // borderStyle: 'solid',
                  }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
        />


      </ScrollView>
    );
  }

  render() {
    const { transactions } = this.props;

    let view = <View />;
    // console.log('Rendered transactions:', transactions);
    if (transactions) {
      if (transactions.length > 0) {
        view = this.getListView(transactions);
      } else {
        view = this.getEmptyTransactionsView();
      }
    }
    return view;
  }
}

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: colors.darkTwo,

  },
  rowBack: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',

    width: '50%',
    // left: '500%',
    height: 37,

    backgroundColor: colors.pinkRed,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  header: {
    opacity: 0.6,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 22,
    // fontWeight: '600',
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
