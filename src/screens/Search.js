/*
FILENAME:   Search.js
PURPOSE:    search screen for budget x app
AUTHOR:     eric phung
UPDATED:    11/13/2019 05:26 AM
*/
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  // ActivityIndicator,
  // ScrollView,
  Animated,
  // Keyboard,
  // TouchableWithoutFeedback,
  // AsyncStorage
} from 'react-native';

import * as Font from 'expo-font';

// components
import SpinnerMask from '../components/SpinnerMask';
// import DateLabelView from '../components/DateLabel/DateLabelView';
// import TransactionsView from '../components/TransactionsView/TransactionsView';
import MyStickyTable from '../components/TransactionsView/MyStickyTable';
import ScrollingPillCategoriesView from '../components/CategoryPills/ScrollingPillCategoriesView';
import SlideUp from '../components/SlideUp/SlideUp';

// transactions
import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

// models
// import Transaction from '../models/Transaction';

// ui colors
import colors from '../../colors';

// date operators
// import { dates } from '../functions/dates';
function searchByID(idKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    if (myArray[i].id === idKey) {
      obj = myArray[i];
    }
  }
  return obj;
}

// const headerRight = (
//   <View style={{
//     flex: 1,
//     width: 45,
//     height: '100%', // 19.9,
//     backgroundColor: colors.darkTwo,

//     shadowColor: '#0000002e.68f5c28f5c28',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowRadius: 4,
//     shadowOpacity: 1,

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dotted',
//   }}
//   />
// );

class Search extends Component {
  static navigationOptions = () => {
    const header = {
      headerTransparent: {},
      headerTintColor: colors.white,
      title: 'Filter by Category',
      // headerRight,
    };
    return header;
  }

  constructor(props) {
    super(props);

    this.state = {
      fontsAreLoaded: false,
      currentCategory: null,
      currentTransactions: [],
      isSlideViewHidden: true,
      enableCategoryPills: true,
      slideViewBounceValue: new Animated.Value(300), // initial position of the slide view
      currentTransaction: null,
      isTableEnabled: true,

      currentCategories: []
    };

    // this.transactionBtnPressed = this.transactionBtnPressed.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

    this.deleteBtnPressed = this.deleteBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load default transactions
    const transactionsObject = loadTransactionsObject();

    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });

    // set fonts  are loaded
    this.setState({ fontsAreLoaded: true });

    const { transactions } = await transactionsObject;
    // =========================================== TEST
    // this.clearStorageSync();

    // set transactions
    this.setState({ currentTransactions: transactions });
  }



  showTransactionSlideView = (transaction) => {
    // console.log(transaction);
    if (this.state.currentTransaction === transaction) {
      // empty transaction
      if (this.state.isSlideViewHidden !== true) {
        // hide slide view
        this.toggleSlideView();
      }
    } else if (this.state.currentTransaction !== transaction) {
      // not same transaction
      this.setState({ currentTransaction: transaction });
      // this.setState({ enableCategoryPills: true });
      if (this.state.isSlideViewHidden === true) {
        this.toggleSlideView();
        // this.setState({ enableCategoryPills: !isSlideViewHidden });
      }
    } else {
      // set current transaction
      this.setState({ currentTransaction: transaction });
      if (this.state.isSlideViewHidden === true) {
        // show slide view
        this.toggleSlideView();
        // this.setState({ enableCategoryPills: !isSlideViewHidden });
      }
    }
  }

  transactionBtnPressed = (transaction) => {
    // console.log(transaction);
    this.showTransactionSlideView(transaction);
    // const {
    //   currentTransaction,
    //   isSlideViewHidden
    // } = this.state;

    // if (currentTransaction === transaction) {
    //   // empty transaction
    //   this.setState({ currentTransaction: null });
    //   if (isSlideViewHidden !== true) {
    //     // hide slide view
    //     this.toggleSlideView();
    //     // this.setState({ enableCategoryPills: !isSlideViewHidden });
    //   }
    // } else if (currentTransaction !== transaction) {
    //   // not same transaction
    //   this.setState({ currentTransaction: transaction });
    //   // this.setState({ enableCategoryPills: true });
    //   if (isSlideViewHidden === true) {
    //     this.toggleSlideView();
    //     // this.setState({ enableCategoryPills: !isSlideViewHidden });
    //   }
    // } else {
    //   // set current transaction
    //   this.setState({ currentTransaction: transaction });
    //   if (isSlideViewHidden === true) {
    //     // show slide view
    //     this.toggleSlideView();
    //     // this.setState({ enableCategoryPills: !isSlideViewHidden });
    //   }
    // }
  }

  categoryBtnPressed(category) {
    // toggle current category selected
    const {
      currentCategory,
      currentCategories
    } = this.state;

    // set or unset current category
    if (currentCategory === category) {
      // item is current category already, unset it
      this.setState({ currentCategory: null });
    } else if (currentCategory !== category) {
      // item is a new category, set as current
      this.setState({ currentCategory: category });
    }
    // else {
    //   // set new current category
    //   this.setState({ currentCategory: category });
    // }

    // set category to current categories list
    if (currentCategories.includes(category)) {
      // item already exists, remove from list
      // get item id from array
      const itemPos = currentCategories.indexOf(category);
      // remove item from array by index
      currentCategories.splice(itemPos, 1); // starting at itemPos, remove 1 element
    } else {
      // current  categories does not contain item already
      // set item to list
      currentCategories.unshift(category);
    }
  }

  async storeNewTransaction(transaction) {
    const storageObj = await loadTransactionsObject(); // load storage object

    const { transactions } = storageObj; // get transactions from storage object

    // check if transaction already exists
    const previous = searchByID(transaction.id, transactions);
    if (previous) {
      return;
    }

    // add transaction
    transactions.unshift(transaction); // add new transaction to transactions

    // console.log(storageObj); // debug console

    saveTransactionsObject(storageObj); // save updated storage object

    // update current transactions list view with storage object
    await this.setState({ currentTransactions: transactions });
  }

  clearCurrentInputs() {
    this.setState({ currentCategory: null });
    this.setState({ currentCategories: [] });

    const {
      enableCategoryPills,
      isSlideViewHidden
    } = this.state;

    if (isSlideViewHidden === false) {
      this.toggleSlideView();
    }

    if (enableCategoryPills !== true) {
      this.setState({ enableCategoryPills: true });
    }
  }

  toggleSlideView() {
    let { isSlideViewHidden } = this.state;
    const { slideViewBounceValue } = this.state;

    let toValue = 300;

    if (isSlideViewHidden) {
      toValue = 0;
    }

    // This will animate the translateY of the subview between 0 & 300
    // depending on its current state
    // 300 comes from the style below, which is the height of the subview.
    Animated.spring(
      slideViewBounceValue,
      {
        toValue,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();

    isSlideViewHidden = !isSlideViewHidden;

    this.setState({ isSlideViewHidden });

    // console.log(isSlideViewHidden);
  }

  deleteBtnPressed(transaction) {
    this.removeTransaction(transaction);
  }

  async removeTransaction(transaction) {
    // pull storage object
    const storageObject = await loadTransactionsObject();
    // get transactions list from object
    const { transactions } = storageObject;
    // console.log(transactions)

    // remove transaction by id
    const array = transactions;
    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].id === transaction.id) {
        array.splice(i, 1);
      }
    }

    // save new transactions list
    saveTransactionsObject(storageObject);

    this.setState({ currentTransactions: transactions });
  }

  render() {
    const {
      fontsAreLoaded,
      currentCategory,
      enableCategoryPills,
      currentTransactions,
      currentTransaction,
      isTableEnabled
    } = this.state;

    // font loading spinner
    const spinnerView = (
      <View style={styles.container}>
        <SpinnerMask />
      </View>
    );

    let view = spinnerView;;

    if (fontsAreLoaded) {
      // page body view
      view = (
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={styles.container}
        >

          {/* scrolling pills */}
          <ScrollingPillCategoriesView
            onPress={this.categoryBtnPressed}
            currentCategory={currentCategory}
            isEnabled={enableCategoryPills}
            topPosition="12%"
            zIndex={1}
          />

          {/* separator line */}
          <View style={line} />

          {/* Date Picker Box */}
          <View style={datePickerBox} />

        <MyStickyTable
          transactions={currentTransactions}
          currentTransaction={currentTransaction}
          key={currentTransactions}

          tableTop="25.5%"
          tableHeight="65%"
          tablePosition="absolute"

          onPress={(transaction) => this.transactionBtnPressed(transaction)}
          deleteBtnPressed={(transaction) => this.deleteBtnPressed(transaction)}
        />

          <SlideUp
            toggleSlideView={() => this.toggleSlideView()}
            slideViewBounceValue={this.state.slideViewBounceValue}
          />
        </ScrollView>
      );    
    }


    // // which page to show; loading vs body
    // if (!fontsAreLoaded) {
    //   view = spinnerView;
    // }
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  }
});

// separator line style
const line = {
  width: '100%',
  height: 0.1,
  opacity: 0.1,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: colors.white,

  top: '19%',

  zIndex: 1, // display ontop of datepickerbox
};

const datePickerBox = {
  width: '100%',
  height: '24%', // 196,
  backgroundColor: colors.darkTwo,
  shadowColor: '#0a101b',
  shadowOffset: {
    width: 1,
    height: 1
  },
  shadowRadius: 26,
  shadowOpacity: 1
};

export default Search;