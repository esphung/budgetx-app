/*
FILENAME:   TransactionsView.js
PURPOSE:    shows if app has no transaction data
AUTHOR:     eric phung
DATE:       Sun Nov  3 05:41:17 2019
            11/12/2019 09:12 PM
*/
import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../../colors';

import { dates } from '../../functions/dates';

import EmptyListView from './EmptyListView';

import TransactionItem from './TransactionItem';

function separateTransactionsByDate (array) {
  // separate array into lists by date
  console.log(array)

  // insert header for date label view
}


function TransactionsView(props) {
  const {
    tableHeight,
    transactions,
    deleteBtnPressed,
    onPress,
    currentTransaction,
    isEnabled
  } = props;

  if (transactions.length < 1) {
    return <EmptyListView />;
  }

  // separate into lists by date
  const transactionLists = separateTransactionsByDate(transactions);
  console.log(transactionLists);


  const view = (
    <ScrollView
      // pagingEnabled={true}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      // stickyHeaderIndices={[0]}
      
      style={
        {
          position: 'absolute',

          top: '30%', // 240,

          width: '100%', // 220,

          height: tableHeight, // 84,

          // backgroundColor: 'lightblue',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
    >

      <SwipeListView
        // initialNumToRender={17}

        data={transactions}
        keyExtractor={(item) => item.id}
        // ListEmptyComponent={<EmptyListView />}
        renderItem={({ item }) => (
          <View style={styles.rowFront}>
            <TransactionItem
              item={item}
              onPress={onPress}
              currentTransaction={currentTransaction}
              isEnabled={isEnabled}
            />
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
              <CustomSwipeCell onDeleteBtnPress={() => deleteBtnPressed(item)} />
            </View>
          </View>
        )}

        leftOpenValue={0}

        rightOpenValue={-75}
      />

    </ScrollView>
  );
  return view;
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
  }
});


export default TransactionsView;
