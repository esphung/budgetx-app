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

import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../colors';

import ItemSymbol from './ItemSymbol';
import ItemCategory from './ItemCategory';
import ItemPayee from './ItemPayee';
import ItemDate from './ItemDate';
import ItemAmount from './ItemAmount';

function getEmptyTransactionsView() {
  const emptyView = (
    <View style={
          {
            position: 'absolute',
            // left: 84,
            top: '32%', // 256,

            width: '60%', // 220,
            height: '10%', // 84,

            // borderWidth: 1,
            // borderColor: 'white',
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

const TABLE_HEIGHT = '30%';

class TransactionsView extends Component {
  getItemText = (item) => {
    const view = (

      <View style={{
        flex: 1,
        flexDirection: 'row',

        paddingVertical: 8,

        marginHorizontal: 12,
      }}
      >

        <ItemSymbol item={item} />

        <ItemCategory item={item} />

        <ItemPayee item={item} />

        <ItemDate item={item} />

        <ItemAmount item={item} />


      </View>

    );
    return view;
  }

  getItemView(item) {
    const { onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
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

  deleteBtnPressed(transaction) {
    const { deleteBtnPressed } = this.props;
    deleteBtnPressed(transaction);
  }

  render() {
    const { transactions } = this.props;

    let view = (
      <ScrollView
        style={
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
            <View style={styles.rowFront}>
              {
                this.getItemView(item)
              }
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View style={{ flexDirection: 'row', }}>
              <View style={{
                flex: 1,
                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }}
              />
              <View style={styles.rowBack}>
                <CustomSwipeCell onDeleteBtnPress={() => this.deleteBtnPressed(item)} />
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
        />


      </ScrollView>
    );
    // console.log('Rendered transactions:', transactions);
    if (transactions.length < 1) {
      view = getEmptyTransactionsView();
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
