
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { ListItem, Left, Body, Icon, Right, Title } from 'native-base';

// import '../../../globals'; // global values

// import Transaction from '../../models/Transaction';

import StickyDateHeader from './StickyDateHeader';

import { SwipeListView } from 'react-native-swipe-list-view';

import CustomSwipeCell from './CustomSwipeCell';

// ui colors
import colors from '../../../colors';

import TransactionItem from './TransactionItem';


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
};


const ROW_HEIGHT = 44;

class MyStickyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stickyHeaderIndices: []
    };

    this.onPress = this.props.onPress.bind(this)

    // this.Render_FlatList_Sticky_header =  this.Render_FlatList_Sticky_header.bind(this);
  }

  componentDidMount() {
    // get list of transactions as passed prop
    const {
      transactions,
      tableHeight,
      // deleteBtnPressed,
      // onPress,
      currentTransaction,
      // isEnabled
    } = this.props;

    // console.log('Table Transactions :', transactions);

    //  sort  by  descending date
    this.sortItemsByDateDesc(transactions);

    // push first header with a date
    let header = new StickyDateHeader();

    // create new list and sentry variable
    const list = [];

    let i = 0;

    // set first current transaction
    let currentItem = transactions[i];

    if (currentItem) {
      // (from first transaction)
      header.date = currentItem.date
    } else {
      header.date = new Date();
    }

    list.push(header)

    // console.log(list)

    // if list, compare header date to next item  dates
    for (i; i <= transactions.length - 1; i += 1) {
      currentItem = transactions[i];

      // compare current short date with header short date
      if (header.getShortDate() !== getShortDate(currentItem)) {
        // add header for new date
        header = new StickyDateHeader(currentItem.date);//String(Date.now())
        list.push(header)
      }
      // add current item to list
      list.push(currentItem)

      // console.log(transactions[i].getInfo());
    }

    // console.log(this.getStickyIndices())
    const stickyHeaderIndices = this.getStickyIndices(list);

    this.setState({ data: list });

    this.setState({ stickyHeaderIndices: stickyHeaderIndices });

    this.setState({tableHeight: tableHeight})
  }

  componentWillMount() {
    // console.log('Will Mount')
    var arr = [];
    this.state.data.map(obj => {
      if (obj.header) {
        arr.push(this.state.data.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr
    });
  }

  sortItemsByDateDesc(items) {
    items.sort((a, b) => (a.date.getTime < b.date.getTime) ? 1 : -1)
  }

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
  //   let title = (data.length === 1) ? `${ data.length } Transaction` : `${ data.length } Transactions`;

  //   var Sticky_header_View = (
  //   <View style={styles.headerBody}>
 
  //     <Text style={
  //       {
  //         textAlign: 'center',
  //         // color: '#fff',
  //         fontSize: 15
  //       }
  //     }> { title } </Text>
 
  //   </View>
  //   );
  //   return Sticky_header_View;
  // }

  // Render_Empty_Component() {
  //   return <EmptyListView />
  // }

  onPress(item) {
    alert(item)
  }

  renderItem({ item, index }) {
    if (item.header) {
    {/* return header item component */}
      return (
        <ListItem
          noBorder={true}
          itemDivider
        >
          <Left />
          <Body style={styles.headerBody}>
            <Text
              // style={{ fontWeight: 'bold' }}
            >
              { item.getTitle() }
            </Text>
          </Body>
          <Right />
        </ListItem>
      );
    } else if (!item.header) {
      // console.log(item)
      {/* return transaction item component */}
      return (
        <View style={styles.rowFront}>
          <TransactionItem
            item={item}
            onPress={() => console.log(this.data[index])}
            // currentTransaction={() => currentTransaction}
            isEnabled={true}
          />
        </View>
        )
/*      return (
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
      );*/
    }
  };

  getStickyIndices(items) {
    const { data } = this.state;
    let indices = [];
    for (var i = 0; i <= data.length - 1; i++) {
      if (data[i].header == true) {
        indices.push(i)
      }
    }
    return indices;
  }

  render() {
    const {
      data,
      // stickyHeaderIndices,
      tableHeight
    } = this.state;

    // const {
    //   // transactions,
    //   tableHeight
    // } =  this.props;

    // // check for empty list
    // // if (transactions.length <= 0) {
    // //   return (
    // //     this.Render_Empty_Component()
    // //   );
    // // } else {
    //   // show list of data
    //   console.log(data.length)


      return (
        <SwipeListView
          style={{
            width: '100%',

            top: tableHeight, // '30%', // 240,

            borderWidth: 1,
            borderColor: 'white',
            borderStyle: 'dashed',

            // backgroundColor: 'pink',
          }}
          
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderItem}
          stickyHeaderIndices={this.getStickyIndices()}

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
                <CustomSwipeCell
                  // onDeleteBtnPress={() => deleteBtnPressed(item)}
                />
              </View>
            </View>
          )}

          leftOpenValue={0}
          rightOpenValue={-75}

          // ItemSeparatorComponent={this.FlatListItemSeparator}
          // ListHeaderComponent={this.Render_FlatList_Sticky_header}
          // ListEmptyComponent={this.Render_Empty_Component}
        />
      );
    }
  //}
}

const styles = StyleSheet.create({
  FlatList_Item: {
    // padding: 10,
    // fontSize: 18,
    height: ROW_HEIGHT, // 44,
  },
   
  headerBody:{
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
    color: 'rgba(255, 255, 255, 0.5)',
  }
});

export default MyStickyTable;



