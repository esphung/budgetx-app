import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

import { SwipeListView } from 'react-native-swipe-list-view';

// ui colors
import colors from 'main/colors';

import { getShortDate } from './functions';

import Header from './Header';

import CustomSwipeCell from './TransactionCell/CustomSwipeCell';

import StickyDateHeader from './StickyDateHeader';

import TransactionItem from './TransactionCell/TransactionItem';

import SwipeDelete from '../SwipeDelete';

import SwipeEdit from '../SwipeEdit';

import EmptyListMessage from 'main/storybook/stories/EmptyListMessage';

// import SpinnerMask from '../SpinnerMask';

import styles from 'main/styles';

const ROW_HEIGHT = 44;

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

  // console.log(list)

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

    // console.log(transactions[i].getInfo());
  }
  // console.log(list)
  // console.log('Sorted Data List')
  return list; // .sort((a, b) => (a.date.getTime < b.date.getTime) ? 1 : -1)
}

// const styles = StyleSheet.create({
//   // FlatList_Item: {
//   //   // padding: 10,
//   //   // fontSize: 18,
//   //   height: ROW_HEIGHT, // 44,
//   // },

//   // headerBody: {
//   //   marginRight: 80,
//   //   // width: '100%',
//   //   // height: 40,
//   //   // // backgroundColor: '#00BCD4',
//   //   // // alignItems: 'center',
//   //   // justifyContent: 'center',

//   //   // borderWidth: 1,
//   //   // borderColor: 'gray',
//   //   // borderStyle: 'dotted',
//   // },

//   // rowFront: {
//   //   backgroundColor: colors.darkTwo,

//   // },
//   // rowBack: {
//   //   flex: 1,
//   //   flexDirection: 'row-reverse',
//   //   alignItems: 'center',

//   //   width: '50%',
//   //   // left: '500%',
//   //   height: 37,

//   //   backgroundColor: colors.pinkRed,

//   //   // borderWidth: 1,
//   //   // borderColor: 'white',
//   //   // borderStyle: 'dotted',
//   // },

//   // text: {
//   //   opacity: 0.6,
//   //   fontFamily: 'SFProDisplay-Regular',
//   //   fontSize: 22,
//   //   fontWeight: 'normal',
//   //   fontStyle: 'normal',
//   //   lineHeight: 28,
//   //   letterSpacing: 0.17,
//   //   textAlign: 'center',
//   //   color: 'rgba(255, 255, 255, 0.5)', // 'rgba(255, 255, 255, 0.5)',
//   // },
// });

const MyStickyTable = (props) => {
  // get passed props
  const {
    tableTop,
    tableHeight,
    tablePosition,
    onPress,
    deleteBtnPressed,
    currentTransaction,
    transactions,
    // isCurrentTransaction,
  } = props;

  const [data, setData] = useState(null);

  const [stickyHeaderIndices, setStickyHeaderIndices] = useState(null);

  const [loading, setLoading] = useState(false);

  function getStickyIndices(array) {
    // const { data } = this.state;
    const indices = [];
    let i = 0;
    for (i; i <= array.length - 1; i += 1) {
      if (array[i].header === true) {
        indices.push(i);
      }
    }
    // console.log(indices);
    return indices;
  }

  const Render_Empty_Component = () => {
    // console.log('Rendering Empty Component');
    const view = (
      <ScrollView contentContainerStyle={{
        flex: 1,

        // borderWidth: 3,
        // borderColor: 'white',
        // borderStyle: 'dashed',
      }}>
      <View style={styles.rowFront}>
          <StickyDateHeader date={new Date()} />
        </View>
        <View style={{
          // width: '100%',
          // height: tableHeight, // '32%',
          // position: tablePosition, // 'absolute'
          // top: tableTop, // '30%', // 240,

          flex: 1,
          
          alignItems: 'center',
          // justifyContent: 'center',

          paddingTop: 12,

          // backgroundColor: 'pink',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',

        }}
        >

          <EmptyListMessage />

        </View>
      </ScrollView>
    );
    return view;
  }

  function renderItem({ item }) {
    const { header, date } = item;
    if (header) {
      return (
        <View style={styles.rowFront}>
          <StickyDateHeader date={date} />
        </View>
      );
    }

    return (
      <View style={styles.rowFront}>
        <TransactionItem
          // keyExtractor={() => String(index)} // {data[index]} // () => console.log(index)
          item={item}
          isSelected={false}
          onPress={() => onPress(item)} // {onPress} // console.log(data[index])
          currentTransaction={currentTransaction}
        />
      </View>
    );
  }

  function renderHiddenItem({ item }) {
    const { header } = item;
    let view = <View />;
    if (header) {
      view = (
        <View style={{
          flex: 1,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
          backgroundColor: colors.dark,
        }}
        />
      );
    } else if (!header) {
      view = (
      <View style={styles.rowBack}>

        <View style={styles.rowBackLeftEmpty}>
{/*          <SwipeEdit
            keyExtractor={item.id}
            onPress={() => {
              // setCurrentCategory(searchByID(item.id, data));
              // setShouldShowColorBox(true);
              // console.log('Edited', item);

              // SHOW TRANSACTION BOX
            }}
          />*/}
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
      );
    }

    return view;
  }

  useEffect(() => {
    setLoading(true);
    if (transactions) {
      setData(sortByHeadersDateDescending(transactions));
      setLoading(false);
    }
    // return () => {
    //   // effect
    // };
  }, [transactions]);

  useEffect(() => {
    setLoading(true);
    if (data) {
      setStickyHeaderIndices(getStickyIndices(sortByHeadersDateDescending(transactions)));
      setLoading(false);
    }
    // return () => {
    //   // effect
    // };
  }, [data, transactions]);

  const spinnerView = (
    <View
      style={
        {
          // width: '100%',

          // // height: tableHeight, // '32%',
          // // position: tablePosition, // 'absolute'
          // top: tableTop, // '30%', // 240,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: colors.darkTwo,

          // opacity: 0.3,

          // borderWidth: 2,
          // borderColor: 'white',
          // borderStyle: 'dashed',
        }
      }
    >
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  let view = spinnerView;

  if (!loading) {
    view = (
      <SwipeListView
        data={data}
        // extraData={setData}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        stickyHeaderIndices={stickyHeaderIndices}
        renderHiddenItem={renderHiddenItem}

        leftOpenValue={0}
        // leftOpenValue={55}
        rightOpenValue={-75}

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
  }

  if (transactions.length <= 0) {
    view = Render_Empty_Component();
  }

  return (
    <View style={
      {
        // flex: 1,
        width: '100%',
        // height: tableHeight, // '32%',


        height: '32.5%',
        position: tablePosition, // 'absolute'
        top: tableTop, // '30%', // 240,

      
        zIndex: -1,

        // paddingBottom: 30,
        marginBottom: 20,

        // borderWidth: 2,
        // borderColor: 'white',
        // borderStyle: 'dashed',

        // backgroundColor: 'pink',
      }
    }
    >
      { view }
    </View>
  );
}

// tableTop,
// tableHeight,
// tablePosition,
// onPress,
// deleteBtnPressed,
// currentTransaction,
// transactions,
// isCurrentTransaction,

MyStickyTable.propTypes = {
  tableTop: PropTypes.string.isRequired,
  tableHeight: PropTypes.string.isRequired,
  tablePosition: PropTypes.string.isRequired,

  onPress: PropTypes.func.isRequired,
  deleteBtnPressed: PropTypes.func.isRequired,

  // currentTransaction: PropTypes.object.isRequired,
  // transactions: PropTypes.array.isRequired,
  // isCurrentTransaction: PropTypes.bool.isRequired,

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
//   const { data } = this.state;
//   let title =
// (data.length === 1) ? `${ data.length } Transaction` : `${ data.length } Transactions`;

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
