import React, {
  useState,
  // useEffect
} from 'react';

import {
  StyleSheet,
  View,
  // Text,
} from 'react-native';

// import {
//   ListItem,
//   Left,
//   Body,
//   Right
// } from 'native-base';

// import '../../../globals'; // global values

// import Transaction from '../../models/Transaction';

import { SwipeListView } from 'react-native-swipe-list-view';

import CustomSwipeCell from './CustomSwipeCell';

import StickyDateHeader from './StickyDateHeader';

// ui colors
import colors from '../../../colors';

import TransactionItem from './TransactionItem';

const ROW_HEIGHT = 44;

function Header(date) {
  const timeStamp = `${Date.now()}`;
  this.id = timeStamp;
  this.header = true;
  this.date = date;

  // console.log('Created new header')
  // console.log(this)

  this.getShortDate = () => {
    // short human readable date
    let str = '';
    if (this.date) {
      const dateObj = new Date(this.date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yyyy = dateObj.getFullYear();

      // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
      str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
    }
    return str;
  };

  this.getTitle = () => {
    const str = `${this.getShortDate()}`;
    // ${this.payee} ${this.category}`;
    return str;
  };
}// end header definition

function getShortDate(item) {
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
}

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

const MyStickyTable = (props) => {
  // get passed props
  const {
    tableTop,
    onPress,
    isEnabled,
    deleteBtnPressed
  } = props;

  let {
    transactions,
    currentTransaction
  } = props;


  // get use hooks
  [
    transactions,
    // setTransactions
  ] = useState(transactions);

  [
    currentTransaction,
    // setCurrentTransaction
  ] = useState(currentTransaction);

  const [
    data,
    // setData
  ] = useState(sortByHeadersDateDescending(transactions));

  // const [stickyHeaderIndices, setStickyHeaderIndices] = useState(getStickyIndices(data));


  // // effect hooks: Similar to componentDidMount and componentDidUpdate
  // useEffect(() => {
  //   console.log('Using Effect Hooks');
  //   console.log('Transactions:', transactions.length);
  //   console.log('Data:', data.length);
  //   console.log('Current Transaction:', currentTransaction);
  //   console.log('StickyHeaderIndices:', stickyHeaderIndices);
  //   // console.log(this.getStickyIndices(data));
  // });

  // // testing
  // console.log('Done:',data)

  function getStickyIndices() {
    // const { data } = this.state;
    const indices = [];
    let i = 0;
    for (i; i <= data.length - 1; i += 1) {
      if (data[i].header === true) {
        indices.push(i);
      }
    }
    return indices;
  }


  function renderItem({ item, index }) {
    if (item.header) {
      return (
        <StickyDateHeader date={item.date} />
        /*
        <ListItem
          // noBorder={true}
          itemDivider
        >
          <Left />
          <Body style={styles.headerBody}>
            <Text
              style={{ fontWeight: 'bold' }}
            >
              { item.getTitle() }
            </Text>
          </Body>
          <Right />
        </ListItem>
        */
      );
    }
    // else if (!item.header) {
    // console.log(item)
    return (
      <View style={styles.rowFront}>
        <TransactionItem
          key={index} // {data[index]} // () => console.log(index)
          item={item}
          onPress={onPress} // console.log(data[index])
          currentTransaction={currentTransaction}
          isEnabled={isEnabled}
        />
      </View>
    );
    /*
      return (
        <ListItem
          noBorder={true}
          style={styles.FlatList_Item}
          onPress={() => alert(item)}
        >

          <Body>
            <Text style={{
              color: 'white'
            }}>{ item.id }</Text>
          </Body>
        </ListItem>
      );
    */
    // }
  }

  function renderHiddenItem({ item }) {
    let view = <View />;
    if (!item.header) {
      view = (
        <View style={{ flexDirection: 'row', }}>
          <View style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }}
          />
          <View style={styles.rowBack}>
            <CustomSwipeCell
              onDeleteBtnPress={() => deleteBtnPressed(item)}
            />
          </View>
        </View>
      );
    }

    return view;
  }


  return (
    <SwipeListView
      style={{
        width: '100%',

        top: tableTop, // '30%', // 240,



        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dashed',

        // backgroundColor: 'pink',
      }}

      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(index)}
      stickyHeaderIndices={getStickyIndices()}

      renderHiddenItem={renderHiddenItem}

      leftOpenValue={0}
      rightOpenValue={-75}

      // ItemSeparatorComponent={this.FlatListItemSeparator}
      // ListHeaderComponent={this.Render_FlatList_Sticky_header}
      // ListEmptyComponent={this.Render_Empty_Component}
    />
  );
};

const styles = StyleSheet.create({
  FlatList_Item: {
    // padding: 10,
    // fontSize: 18,
    height: ROW_HEIGHT, // 44,
  },

  headerBody: {
    marginRight: 80,
    // width: '100%',
    // height: 40,
    // // backgroundColor: '#00BCD4',
    // // alignItems: 'center',
    // justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'gray',
    // borderStyle: 'dotted',
  },

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

  // header: {
  //   opacity: 0.6,
  //   fontFamily: 'SFProDisplay-Semibold',
  //   fontSize: 22,
  //   // fontWeight: '600',
  //   fontStyle: 'normal',
  //   lineHeight: 28,
  //   letterSpacing: 0.17,
  //   textAlign: 'center',
  //   color: 'rgba(255, 255, 255, 0.5)',
  // },

  text: {
    opacity: 0.6,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)', // 'rgba(255, 255, 255, 0.5)',
  }
});

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
