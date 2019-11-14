/*
FILENAME:   Search.js
PURPOSE:    search screen for budget x app
AUTHOR:     eric phung
UPDATED:    11/13/2019 05:26 AM
*/

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

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import * as Font from 'expo-font';

// components
import SpinnerMask from '../components/SpinnerMask';
import DateLabelView from '../components/DateLabel/DateLabelView';
import ScrollingPillCategoriesView from '../components/CategoryPills/ScrollingPillCategoriesView';
import SlideUp from '../components/SlideUp/SlideUp';

// transactions
import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

// models
import Transaction from '../models/Transaction';

// ui colors
import colors from '../../colors';

// date operators
import { dates } from '../functions/dates';

const headerRight = (
  <View style={{
    flex: 1,
    width: 45,
    height: '100%', // 19.9,
    backgroundColor: colors.darkTwo,

    shadowColor: '#0000002e.68f5c28f5c28',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,

    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'dotted',
  }}
  />
);

class Search extends Component {
  static navigationOptions = () => {
    const header = {
      headerTransparent: {},
      headerTintColor: colors.white,
      title: 'Filter by Category',
      headerRight,
    };
    return header;
  }

  constructor(props) {
    super(props);
  
    this.state = {
      fontsAreLoaded: false,
      currentDate: new Date(),
      currentCategory: null,
      currentTransactions: [],
      isSlideViewHidden: true,
      enableCategoryPills: true,
      slideViewBounceValue: new Animated.Value(300), // initial position of the slide view
      currentTransaction: null,
      isTableEnabled: true,

      currentCategories: []
    };

    this.transactionBtnPressed = this.transactionBtnPressed.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load default transactions
    const transactionsObject = loadTransactionsObject();
    // console.log(transactions);

    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });

    // set fonts  are loaded
    this.setState({ fontsAreLoaded: true });

    let { transactions } = await transactionsObject;
    
    // =========================== TEST TRANSACTIONS
    // this.clearStorageSync();
    if (global.debugModeOn) {
      transactions = testTransactions;
    }

    // set transactions
    this.setState({ currentTransactions: transactions });
  }

  transactionBtnPressed = (transaction) => {
    // console.log(transaction);
    const { currentTransaction, isSlideViewHidden } = this.state;

    if (currentTransaction !== transaction) {
      // set transaction as current transaction
      this.setState({ currentTransaction: transaction });
    }
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
    const previous = search(transaction.id, transactions);
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
      enableCategoryPills
    } = this.state;

    // font loading spinner
    const spinnerView = (
      <View style={styles.container}>
        <SpinnerMask />
      </View>
    )

    // page body view
    let view = (
      <View style={styles.container}>

        {/* scrolling pills */}
        <ScrollingPillCategoriesView
          onPress={this.categoryBtnPressed}
          currentCategory={currentCategory}
          isEnabled={enableCategoryPills}
          topPosition="11%"
        />


        {/* date input | resetDateBtn */}

        {/* transaction table with section headers */}

      </View>
    )

    // which page to show; loading vs body
    if (!fontsAreLoaded) {
      view = spinnerView;
    }
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

export default Search;
