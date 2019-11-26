
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

import { Text, ListItem, Left, Body, Icon, Right, Title } from 'native-base';

import EmptyListView from './EmptyListView';

// import '../../../globals'; // global values

const ROW_HEIGHT = 44;

function Header(date) {
  const timeStamp = `${Date.now()}`;
  this.id = timeStamp;
  this.header = true;
  this.date = date;

  // console.log('Created new header')
  // console.log(this)

  this.getShortDate = function() {
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
  }

  this.getTitle = function() {
    const str = `${this.getShortDate()}`;
    //${this.payee} ${this.category}`;
    return str;    
  }
}// end header definition

class MyStickyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stickyHeaderIndices: []
    };

    this.Render_FlatList_Sticky_header =  this.Render_FlatList_Sticky_header.bind(this);
  }

  componentDidMount() {
    // get list of transactions as passed prop
    const {
      transactions,
      tableHeight
    } = this.props;

    console.log('Table Transactions :', transactions);

    //  sort  by  descending date
    this.sortItemsByDateDesc(transactions);

    // push first header with a date
    let header = new Header();

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

    console.log(list)

    // if list, compare header date to next item  dates
    for (i; i <= transactions.length - 1; i += 1) {
      currentItem = transactions[i];

      // compare current short date with header short date
      if (header.getShortDate() !== currentItem.getShortDate()) {
        // add header for new date
        header = new Header(currentItem.date);//String(Date.now())
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
    items.forEach( function(item, index) {
      // console.log(item.getTitle())
    });
    items.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1)
  }

  FlatListItemSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  }

  Render_FlatList_Sticky_header() {
    const { data } = this.state;
    let title = (data.length === 1) ? `${ data.length } Transaction` : `${ data.length } Transactions`;

    var Sticky_header_View = (
    <View style={styles.headerBody}>
 
      <Text style={
        {
          textAlign: 'center',
          // color: '#fff',
          fontSize: 15
        }
      }> { title } </Text>
 
    </View>
    );
    return Sticky_header_View;
  }

  Render_Empty_Component() {
    return <EmptyListView />
  }

  renderItem({ item }) {
    if (item.header) {
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
      return (
        <ListItem
          noBorder={true}
          style={styles.FlatList_Item}
          onPress={() => alert(item)}
        >
          <Body>
            <Text>{ item.getTitle() }</Text>
          </Body>
        </ListItem>
      );
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
      stickyHeaderIndices,
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
        <FlatList
          style={{
            width: '100%',

            top: tableHeight, // '30%', // 240,

            borderWidth: 1,
            borderColor: 'white',
            borderStyle: 'dashed',

            // backgroundColor: 'pink',
          }}
          
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          stickyHeaderIndices={stickyHeaderIndices}

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
  }
});

export default MyStickyTable;
