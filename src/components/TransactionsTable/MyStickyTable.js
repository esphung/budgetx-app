/*
FILENAME:  MyStickyTable.js
PURPOSE:   MyStickyTable
AUTHOR:    Eric Phung
CREATED:   ...
UPDATED:   03/10/2020 11:49 AM | 2.1.6 wasn't working on  Android
*/
import React, { useState, useEffect } from 'react';

import {
  // StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import Header from './Header';

// import CustomSwipeCell from './TransactionCell/CustomSwipeCell';

import StickyDateHeader from './StickyDateHeader';

import TransactionItem from './TransactionCell/TransactionItem';

import SwipeDelete from '../SwipeDelete';

import SwipeEdit from '../SwipeEdit';

import EmptyListMessage from '../table/EmptyListMessage';

import { getShortDate } from './functions';

import { sortItemsByDate } from '../../functions/sortItemsByDate'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function sortByHeadersDateDescending(items) {
  // push first header with a date
  let header = new Header();

  // create new list and sentry variable
  const list = [];

  let i = 0;

  // set first current transaction
  let currentItem = items[i];

  if (currentItem) {
    // (from first transaction)
    header.date = currentItem.date;
  } else {
    header.date = new Date();
  }

  list.push(header);

  // if list, compare header date to next item  dates
  for (i; i <= items.length - 1; i += 1) {
    currentItem = items[i];

    // compare current short date with header short date
    if (header.getShortDate() !== getShortDate(currentItem)) {
      // add header for new date
      header = new Header(currentItem.date); // String(Date.now())
      list.push(header);
    }
    // add current item to list
    list.push(currentItem);
  }
  return list; // .sort((a, b) => (a.date.getTime < b.date.getTime) ? 1 : -1)
}

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}


let cellOpacity = 1.0; // 0.2;

const MyStickyTable = (props) => {
  // get passed props
  const {
    // tableTop,
    // tableHeight,
    // tablePosition,
    onPress,
    deleteBtnPressed,
    currentTransaction,
    transactions,
    // isCurrentTransaction,
    isUpdatingTransaction
  } = props;

  const [tableData, setTableData] = useState(null);

  const [stickyHeaderIndices, setStickyHeaderIndices] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  const getStickyIndices = (array) => {
    const indices = [];
    let i = 0;
    for (i; i <= array.length - 1; i += 1) {
      if (array[i].header === true) {
        indices.push(i);
      }
    }
    return indices;
  }

  function Render_Empty_Component() {
    // console.log('Rendering Empty Component');
    const view = (
      <ScrollView
      scrollEnabled={false}
        contentContainerStyle={{
          flex: 1,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',
        }}
      >
        <View style={styles.rowFront}>
          <StickyDateHeader date={new Date()} />
        </View>
        <View style={
          {
            margin: 12,
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }>
          <EmptyListMessage />

        </View>
      </ScrollView>
    );
    return view;
  }

  function renderItem({ item }) {
    const { header, date } = item;

    let cell = (header) ? (
      // cell is a table header item
      <SwipeRow
        disableRightSwipe
        disableLeftSwipe
        // leftOpenValue={20 + parseInt(index) * 5}
        // rightOpenValue={-150}
      >
        <View style={styles.rowBack} />
        <View style={styles.rowFront}>
          <StickyDateHeader date={date} />
        </View>
      </SwipeRow>
    ) : (
      // cell is a transaction item
      <SwipeRow
        // disableRightSwipe
        // disableLeftSwipe
        // leftOpenValue={20 + parseInt(index) * 5}
        // rightOpenValue={-150}
        leftOpenValue={55}
        rightOpenValue={-75}

      >
        <View style={styles.rowBack}>

          <View style={styles.rowBackLeft}>
            <SwipeEdit
              keyExtractor={item.id}
              onPress={() => props.swipeEditBtnPressed(item)}
            />
          </View>
          <View style={styles.rowBackRight}>
            <SwipeDelete
              keyExtractor={item.id}
              onDeleteBtnPress={() => deleteBtnPressed(item)}
            />

            {/*
             <CustomSwipeCell
                // keyExtractor={() => String(index)}
                onDeleteBtnPress={() => deleteBtnPressed(item)}
              />
            */}
          </View>
        </View>
        <View style={styles.rowFront}>
          <TransactionItem
            isUpdatingTransaction={isUpdatingTransaction}

            keyExtractor={(item) => item.id} // {tableData[index]} // () => console.log(index)
            item={item}
            isSelected={false}
            onPress={() => onPress(item)} // {onPress} // console.log(tableData[index])
            currentTransaction={currentTransaction}
            isNameInputEnabled={props.isNameInputEnabled}
            handlePayeeNameChange={props.handlePayeeNameChange}
          />
        </View>
      </SwipeRow>
    );
    let view = (
      <View
        style={
          {
            // flex: 1,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dashed',

            opacity: cellOpacity,
          }
        }
        >{ cell }</View>
    )
    return view
  }
  // const clearState = async () => {
  //   setTableData(null);
  // };

  useEffect(() => {
    // component did mount
    console.log('tableData: ', tableData);
    console.log('Mounted table');
    return () => {
      // effect
    };
  }, []);

  useEffect(() => {
    if (transactions) {
      const sortedTransactions = sortItemsByDate(transactions);
      setTableData(sortByHeadersDateDescending(sortedTransactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (tableData) {
      const headeredTableData = sortByHeadersDateDescending(transactions);
      setStickyHeaderIndices(getStickyIndices(headeredTableData));
    }
  }, [tableData, transactions]);

  // const spinnerView = (
  //   <View>
  //     <ActivityIndicator size="large" color={colors.offWhite} />
  //   </View>
  // );

  // let view; // = spinnerView;

  /* Working  ios vversion of table */
  const ios_table = (
    <FlatList
      data={tableData}
      // extraData={setTableData}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(index)}
      stickyHeaderIndices={stickyHeaderIndices}
      // renderHiddenItem={renderHiddenItem}

      // // leftOpenVaslue={0}
      // leftOpenValue={55}
      // rightOpenValue={-75}
      // // disableRightSwipe={false}
      // //  disableLeftSwipe

      // ItemSeparatorComponent={this.FlatListItemSeparator}
      // ListHeaderComponent={this.Render_FlatList_Sticky_header}
      // ListEmptyComponent={Render_Empty_Component}

      showsVerticalScrollIndicator={false}

      // optimization
      // initialNumToRender={24}
      // windowSize={12} // {21}
      // removeClippedSubviews={true}
      // maxToRenderPerBatch={2}
    />
  );

  /* android table */

  const android_table = (
        <SafeAreaView style={{
          // // flex: 1,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>
      <SwipeListView
        scrollEnabled
        // data={DATA}
        // renderItem={({ item }) => (
        //   <Item
        //     id={item.id}
        //     title={item.title}
        //     selected={!!selected.get(item.id)}
        //     onSelect={onSelect}
        //   />
        // )}
        // keyExtractor={item => item.id}
        // extraData={selected}

      data={tableData}
      extraData={selected}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // stickyHeaderIndices={stickyHeaderIndices}
      showsVerticalScrollIndicator={false}


  //     keyExtractor={(item, index) => String(index)}
  //     key={(item) => String(item.id)} // android ??
  //     stickyHeaderIndices={stickyHeaderIndices}
  //     // renderHiddenItem={renderHiddenItem}

  //     // // leftOpenVaslue={0}
  //     // leftOpenValue={55}
  //     // rightOpenValue={-75}
  //     // // disableRightSwipe={false}
  //     // //  disableLeftSwipe

  //     // ItemSeparatorComponent={this.FlatListItemSeparator}
  //     // ListHeaderComponent={this.Render_FlatList_Sticky_header}
  //     // ListEmptyComponent={Render_Empty_Component}

  //     showsVerticalScrollIndicator={false}

  //     // optimization
  //     // initialNumToRender={24}
  //     // windowSize={12} // {21}
  //     // removeClippedSubviews={true}
  //     // maxToRenderPerBatch={2}
      />
        </SafeAreaView>
  );

  // view = (
  //   <View>
  //   {
  //     // transactions &&
  //     // tableData &&
  //     // table

  //     Platform.OS === 'ios' && ios_table
  //   }
  //   </View>
  // )

  if (transactions.length <= 0) {
    return Render_Empty_Component();
  } else if (Platform.OS === 'ios') {
    return ios_table;
  } else {
    return android_table;
  }
};

MyStickyTable.propTypes = {
  onPress: PropTypes.func.isRequired,
  deleteBtnPressed: PropTypes.func.isRequired,
  // currentTransaction: PropTypes.object,
  // transactions: PropTypes.array.isRequired,
  // isCurrentTransaction: PropTypes.bool.isRequired,
  swipeEditBtnPressed: PropTypes.func.isRequired,
  isNameInputEnabled: PropTypes.bool.isRequired,

};

export default MyStickyTable;

// FlatListItemSeparator() {
//   return (
//     <View
//       style={{
//         height: 1,
//         width: '100%',
//         backgroundColor: '#607D8B',
//       }}
//     />
//   );
// }

// Render_FlatList_Sticky_header() {
//   const { tableData } = this.state;
//   let title =
// (tableData.length === 1) ? `${ tableData.length } Transaction` : `${ tableData.length } Transactions`;

//   var Sticky_header_View = (
//   <View style={styles.headerBody}>

//   //     <Text style={
//   //       {
//   //         textAlign: 'center',
//   //         // color: '#fff',
//   //         fontSize: 15
//   //       }
//   //     }> { title } </Text>

//   //   </View>
//   //   );
//   //   return Sticky_header_View;
//   // }

//   // Render_Empty_Component() {
//   //   return <EmptyListView />
//   // }

//   onPress(item) {
//     alert(item)
//   }
