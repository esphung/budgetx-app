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
  ScrollView,
  Text
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../../colors';

import { dates } from '../../functions/dates';

import EmptyListView from './EmptyListView';

import TransactionItem from './TransactionItem';

function create2DArrayByDate(list) {
  const differentDates = getDifferentDates(list);
  console.log('Different Dates:', differentDates);

  // Create one dimensional array 
  var array = new Array(list.length); 

  // Loop to create 2D array using 1D array
  // (a new list for each item)
  console.log("Creating 2D array"); 
  let i = 0;
  for (i; i < array.length; i += 1) {
    array[i] = [];
  }

  var h = 0;

  var s = list; 
    
  // Loop to initilize 2D array elements. 
  for (var b = 0; b < differentDates; b++) { 
    for (var j = 0; j < array.length; j++) {
      
      if (s[h]) {
        let previousDate = getShortDate(s[j].date);
        // console.log(previousDate)
        
        if (s[h + 1]) {
          // next date exists
          let nextDate = getShortDate(s[h + 1].date)
          //  compare next date to previous
          // console.log(nextDate + ' === ' + previousDate)
          // console.log(nextDate === previousDate)

          if (nextDate !== previousDate) {
            // add then go to next list
            array[b][j] = s[h++];
            break
          } else {
            // add to list
            array[b][j] = s[h++];
          }
        }
      }
    } 
  }

  // // Loop to display the elements of 2D array.
  // for (var g = 0; g < array.length; g++) {
  //   console.log("<ItemListHeader />");
  //   for (var h = 0; h < array.length; h++) {
  //     if (array[g][h]) {
  //       console.log(
  //         '$ ' + array[g][h].amount + ' | ' +
  //         getShortDate(array[g][h].date)
  //       );
  //     }
  //   }
  // }
  return array;
}


function getShortDate(date) {
  const dateObj = new Date(date);

  const dd = dateObj.getDate();
  const mm = dateObj.getMonth() + 1; // January is 0!
  const yyyy = dateObj.getFullYear();

  // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
  return `${mm}/${parseInt(dd, 10)}/${yyyy}`;
}

function getDifferentDates(argument) {
  let count = 0;
  for (var i = argument.length - 1; i >= 0; i--) {
    let previous = getShortDate(argument[i].date)
    // console.log(previous)
    let j = i + 1;
    if ((j) <= (argument.length - 1)) {
      if (previous !== getShortDate(argument[j].date)) {
        count += 1;
        // console.log(j, argument[j].date);
       //  console.log(count)
      }
      
    }
  }
  if (count == 0) {
    return 1
  }
  return count;
}

const Render_FlatList_Sticky_header = () => {

    var Sticky_header_View = (

    <View style={styles.header_style}>

      <Text style={{textAlign: 'center', color: '#fff', fontSize: 22}}> FlatList Sticky Header </Text>

    </View>

    );

    return Sticky_header_View;

  };


  function getListView(list,  props) {
    const {
      onPress,
      currentTransaction,
      isEnabled
    } = props;
     return (<SwipeListView
              // initialNumToRender={17}
      
              data={list}
      
              ListHeaderComponent={Render_FlatList_Sticky_header}
              
              stickyHeaderIndices={[0]}
      
              keyExtractor={(item) => item.id}
              // ListEmptyComponent={<EmptyListView />}
              renderItem={({ item }) => {
                      if (item.id) {
                      return (
                        <View style={styles.rowFront}>
                          <TransactionItem
                            item={item}
                            onPress={onPress}
                            currentTransaction={currentTransaction}
                            isEnabled={isEnabled}
                          />
                        </View>
                      )
                    } else  {
      
                      return Render_FlatList_Sticky_header()
                    }
                  }
            }
      
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
      )
  }

function TransactionsView(props) {
  const {
    tableHeight,
    deleteBtnPressed,
    onPress,
    currentTransaction,
    isEnabled
  } = props;

  let { transactions } = props;

  if (transactions.length < 1) {
    return <EmptyListView />;
  }

  // console.log(create2DArrayByDate(transactions))

  if (global.debugModeOn) {
    transactions = create2DArrayByDate(transactions);
  }

  console.log(transactions)

  // function getStickyHeaders(transactions) {
  //   let count = getDifferentDates(transactions);
  //   let list = []
  //   for (var i = 0; i < transactions.length; i += 1) {
  //     list.push(i);
  //     console.log(i)
  //   }
  //   return list;
  // }

  // console.log(getStickyHeaders(transactions))

  const view = (
    <ScrollView
      // pagingEnabled={true}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}

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

    { getListView(transactions[0], props) }
    {  getListView(transactions[1], props) }
    { getListView(transactions[2], props) }


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
