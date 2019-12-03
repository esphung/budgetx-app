import React, {
  useState,
  useEffect
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
    tableHeight,
    tablePosition,
    onPress,
    isEnabled,
    deleteBtnPressed
  } = props;

  const [data,setData] = useState([]); // sortByHeadersDateDescending(props.transactions)

  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    setData(sortByHeadersDateDescending(props.transactions));
    setCurrentTransaction(props.currentTransaction);
    return () => {
      // effect
    };
  }, [])

  // const [stickyHeaderIndices, setStickyHeaderIndices] = useState(getStickyIndices(data));

  function Render_Empty_Component() {
    return <EmptyListView />
  }

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
        <View style={styles.rowFront}>
          <StickyDateHeader date={item.date} />
        </View>
      );
    }

    return (
      <View style={styles.rowFront}>
        <TransactionItem
          // keyExtractor={() => String(index)} // {data[index]} // () => console.log(index)
          item={item}
          isSelected={false}
          onPress={() => props.onPress(item)} //{onPress} // console.log(data[index])
          currentTransaction={currentTransaction}
          // isEnabled={isEnabled}
        />
      </View>
    );
  }

  function renderHiddenItem({ item }) {
    let view = <View />;
    if (item.header) {
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
    } else if (!item.header) {
      view = (
        <View style={{ flexDirection: 'row', flex: 1, }}>
          <View style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
            // backgroundColor: colors.dark,
          }}
          />
          <View style={styles.rowBack}>
            <CustomSwipeCell
              // keyExtractor={() => String(index)}
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
      style={
        {
          width: '100%',
          height: tableHeight, // '32%',
          position: tablePosition, // 'absolute'
          top: tableTop, // '30%', // 240,

          // borderWidth: 2,
          // borderColor: 'white',
          // borderStyle: 'dashed',

          // backgroundColor: 'pink',
        }
      }

      data={data}
      // extraData={setData}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(index)}
      stickyHeaderIndices={getStickyIndices()}
      renderHiddenItem={renderHiddenItem}

      leftOpenValue={0}
      rightOpenValue={-75}

      // ItemSeparatorComponent={this.FlatListItemSeparator}
      // ListHeaderComponent={this.Render_FlatList_Sticky_header}
      // ListEmptyComponent={this.Render_Empty_Component}

      showsVerticalScrollIndicator={false}

      // optimization
      initialNumToRender={24}
      // windowSize={12} // {21}
      // removeClippedSubviews={true}
      // maxToRenderPerBatch={2}
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
