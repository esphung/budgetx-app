/*
FILENAME:  StickyTable.js
PURPOSE:   StickyTable
AUTHOR:    Eric Phung
CREATED:   03/10/2020 11:49 AM
*/
import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Platform,
  RefreshControl,
  FlatList,
  // Button,
  // ScrollView,
  Dimensions,
} from 'react-native';

import { SwipeRow } from 'react-native-swipe-list-view';

import colors from 'src/colors';

import styles from 'styles/StickyTable';

import { sortItemsByDate } from 'functions/sortItemsByDate';

import uuidv4 from 'functions/uuidv4';

import Category from  'models/Category';

import Header from './Header';

import StickyDateHeader from './StickyDateHeader';

import StickyTableCell from './StickyTableCell';

import SwipeDelete from './StickyTableCell/SwipeDelete';

import SwipeEdit from './StickyTableCell/SwipeEdit';

import EmptyListMessage from './EmptyListMessage';

const screen = Dimensions.get('screen');

const TableHeaderItem = ({ item }) => {
  const { date } = item;
  const view = (
    <SwipeRow disableRightSwipe disableLeftSwipe>
      <View style={styles.rowBack} />
      <View style={styles.rowFront}>
        <StickyDateHeader date={date} />
      </View>
    </SwipeRow>
  );
  return view;
};

const getShortHeaderDate = (item) => {
  let str = '';
  if (item) {
    const dateObj = new Date(item.date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1; // January is 0!
    const yyyy = dateObj.getFullYear();

    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
  }
  return str;
};

const sortByHeadersDateDescending = (items) => {
  // var dates = items.map(function(i, index, elements) {
  //   return (i.date);
  // });
  // push first header with a date
  let header = new Header();

  // // create new list and sentry variable
  const list = [];

  let i = 0;

  // header.date = new Date();

  // // set first current transaction
  let item = items[i];
  if (item) header.date = item.date;

  list.push(header);
  // if list, compare header date to next item  dates
  for (i; i <= items.length - 1; i += 1) {
    item = items[i];
    // compare current short date with header short date
    if (header.shortDate() !== getShortHeaderDate(item)) {
      // add header for new date
      header = new Header(item.date); // String(Date.now())
      list.push(header);
    }
    // add current item to list
    list.push(item);
  }
  return list;
};
const getStickyIndices = (array) => {
  const indices = [];
  let i = 0;
  for (i; i <= array.length - 1; i += 1) {
    if (array[i].header === true) {
      indices.push(i);
    }
  }
  return indices;
};

const ROW_HEIGHT = (screen.height / 23); // 40;
// console.log('(screen.height / 23): ', (screen.height / 23));

const ROW_LENGTH = screen.width;

const StickyTable = ({
  transactionBtnPressed,
  deleteBtnPressed,
  currentTransaction,
  currentTransactions,
  currentTableHeight,
  isSyncing,
  onPullRefresh,
  shouldRefresh,
}) => {
  /**
  |--------------------------------------------------
  | Data Methods
  |--------------------------------------------------
  */
  const getTableData = (transactions) => {
    let data = [];
    const sortedTransactions = sortItemsByDate(transactions);
    data = sortByHeadersDateDescending(sortedTransactions);
    return data;
  };
  const getTableIndices = (transactions) => {
    const tableDataWithHeaders = sortByHeadersDateDescending(transactions);
    const indices = (getStickyIndices(tableDataWithHeaders));
    return indices;
  };
  /**
  |--------------------------------------------------
  | Table State Data
  |--------------------------------------------------
  */
  const [
    flatlistData,
    setFlatlistData,
  ] = useState(getTableData(currentTransactions));

  const [
    stickyHeaderIndices,
    setStickyHeaderIndices,
  ] = useState(getTableIndices(currentTransactions));

  /**
  |--------------------------------------------------
  | Table Refs
  |--------------------------------------------------
  */
  let flatlistRef = useRef(null);

  /**
  |--------------------------------------------------
  | Scrolling Methods
  |--------------------------------------------------
  */
  const getItemLayout = (data, index) => {
    const layout = { length: ROW_LENGTH, offset: (ROW_HEIGHT * index) - (ROW_HEIGHT), index };
    return layout;
  };
  const scrollToTop = () => {
    flatlistRef.scrollToIndex({
      animated: true,
      index: 0,
    });
  };
  const scrollToBottom = () => {
    flatlistRef.scrollToIndex({
      animated: true,
      index: (flatlistData.length - 1),
    });
  };
  const scrollToIndex = (pos) => {
    flatlistRef.scrollToIndex({
      animated: true,
      index: pos, // (pos -  1 >= 0)  ? pos - 1 : pos, // randomIndex
    });
  };
  const scrollToItem = (item) => {
    const pos = flatlistData.indexOf(item) - 1;
    // console.log('pos: ', pos);
    // console.log('currentTransactions.length: ', currentTransactions.length);
    // console.log('pos: ', pos);
    // let randomIndex = Math.floor(Math.random(Date.now()) * flatlistData.length);
    if (pos + 2 === currentTransactions.length) {
      flatlistRef.scrollToIndex({
        animated: true,
        index: (flatlistData.length - 1),
      });
    }
    else {
      flatlistRef.scrollToIndex({
        animated: true,
        index: pos, // "" + randomIndex
      });
    }
  };
  /**
  |--------------------------------------------------
  | ConponentDidMount
  |--------------------------------------------------
  */
  function Render_Empty_Component() {
    const view = (
      <View
        style={
          [
            styles.emptyTableView,
            {
              height: currentTableHeight,
            },
          ]
        }
      >
        <View style={styles.rowFront}>
          <StickyDateHeader date={new Date()} />
        </View>
        <View
          style={styles.emptyListMessageContainer}
        >
          <EmptyListMessage />

        </View>
      </View>
    );
    return view;
  }
  const renderItem = ({ item }) => {
    // console.log('item: ', item);
    let cell = (
      <SwipeRow
        closeOnRowPress
        disableRightSwipe
        // leftOpenValue={55}
        rightOpenValue={-75}
      >
        <View style={styles.rowBack}>
          <View style={styles.rowBackLeft}>
            <SwipeEdit
              keyExtractor={item.id}
              onPress={() => {}}
            />
          </View>
          <View style={styles.rowBackRight}>
            <SwipeDelete
              keyExtractor={item.id}
              onDeleteBtnPress={() => deleteBtnPressed(item)}
            />
          </View>
        </View>
        <View style={styles.rowFront}>
          <StickyTableCell
            keyExtractor={(transaction) => transaction.id}
            item={item}
            onPress={() =>  scrollToItem(item)}
            onLongPress={() => transactionBtnPressed(item)}
            currentTransaction={currentTransaction}
          />
        </View>
      </SwipeRow>
    );
    if (item.header) {
      // table header item
      const { date } = item;
      cell = <TableHeaderItem item={item} />
    }
    return cell;
  };
  const refreshControl = (
    <RefreshControl
      refreshing={shouldRefresh}
      onRefresh={onPullRefresh}
      title="Device Syncing"
      tintColor={colors.shamrockGreen}
      titleColor={colors.shamrockGreen}
    />
  );
  useEffect(() => {
    if (currentTransactions) {
      const sortedTransactions = sortItemsByDate(currentTransactions);
      setFlatlistData(sortByHeadersDateDescending(sortedTransactions));
    }
  }, [currentTransactions]);
  useEffect(() => {
    const headeredTableData = sortByHeadersDateDescending(currentTransactions);
    setStickyHeaderIndices(getStickyIndices(headeredTableData));
  }, [flatlistData, currentTransactions]);

  // const onEndReached = () => alert('Load next transactions');
  // console.log('currentTableHeight: ', currentTableHeight);
  /* Working  ios version of table */
  const ios_table = (
    <View
      style={
        [
          // styles.table,
          {
            height: currentTableHeight,
            // paddingBottom: (currentTableHeight >= 300) ? (screen.height / 6) : 0,

            // borderWidth: 1,
            // borderColor: 'red',
            // borderStyle: 'solid',
          },
        ]
      }
    >
      <FlatList
        extraData={shouldRefresh}
        data={flatlistData}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        stickyHeaderIndices={stickyHeaderIndices}
        showsVerticalScrollIndicator={false}
        ref={(ref) => { flatlistRef = ref; }}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        refreshing={isSyncing}
        refreshControl={refreshControl}

        // onEndReached={onEndReached}

        // optimization
        // // initialNumToRender={24}
        // windowSize={12} // {21}
        // removeClippedSubviews={true}
        // maxToRenderPerBatch={2}
        // onRefresh={() => alert('message?: DOMString')}
        // onRefresh={onRefreshList}
      />
    </View>
  );

  /* android table */
  const android_table = (
    <View
      style={{
        height: currentTableHeight,
        // paddingBottom: (currentTableHeight) - (screen.height), // ? (screen.height / 6) : 0,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}
    >
      <FlatList
        extraData={shouldRefresh} // ???
        data={flatlistData}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id)}
        showsVerticalScrollIndicator={false}
        ref={(ref) => { flatlistRef = ref; }}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        refreshing={isSyncing}
        refreshControl={refreshControl}

        // initialNumToRender={2}
        // onEndReached={onEndReached}

        // optimization
        // initialNumToRender={24}
        // windowSize={12} // {21}
        // removeClippedSubviews={true}
        // maxToRenderPerBatch={2}
        // onRefresh={() => alert('message?: DOMString')}
        // onRefresh={onRefreshList}
      />
    </View>
  );

  if (!currentTransactions || currentTransactions.length <= 0) {
    return Render_Empty_Component();
  }

  if (Platform.OS === 'ios') {
    return ios_table;
  }
  return android_table;

  // return null
};

export default StickyTable;
