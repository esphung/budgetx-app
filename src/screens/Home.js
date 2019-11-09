/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
            04/11/2019 03:57 AM
            06/11/2019 06:54 PM (ESLinter)
            08/11/2019 03:01 AM (AsyncStorage -> Transactions, Categories)
*/
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import * as Font from 'expo-font';

// header components
import HeaderLeftView from '../components/HeaderLeftView';
import HeaderRightView from '../components/HeaderRightView';
import BalanceView from '../components/BalanceView';
import DateLabelView from '../components/DateLabelView';
import TransactionsView from '../components/TransactionsView';
import ScrollingPillCategoriesView from '../components/ScrollingPillCategoriesView';
import AmountInputView from '../components/AmountInputView';
import KeypadView from '../components/KeypadView';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

import Transaction from '../models/Transaction';

// import sortArrayDesc from '../functions/sortArrayDesc';

import getUSDFormattedString from '../functions/getUSDFormattedString';

// ui colors
import colors from '../../colors';

const SFProDisplayRegularFont = require('../../assets/fonts/SF-Pro-Display-Regular.otf');

const SFProDisplaySemiboldFont = require('../../assets/fonts/SF-Pro-Display-Semibold.otf');


class Home extends Component {
  static navigationOptions = ({ screenProps }) => {
    // get user name and email from props
    // console.log(screenProps);

    const { name, email } = screenProps.user;

    return {
      headerTransparent: {},

      headerLeft: <HeaderLeftView boldMessage={name} normalMessage={email} />,

      headerRight: <HeaderRightView />,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      fontsAreLoaded: false,
      // user: {},
      // data: {},
      currentAmount: null,
      currentDate: new Date(),
      currentCategory: null,
      currentTransactions: [],
      // currentPayee: null
    };

    this.handlePress = this.handlePress.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

    this.deleteBtnPressed = this.deleteBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': SFProDisplayRegularFont,
      'SFProDisplay-Semibold': SFProDisplaySemiboldFont
    });

    await this.setState({ fontsAreLoaded: true });

    // load default settings
    const object = await loadTransactionsObject();
    const { transactions } = object;
    // console.log(transactions);

    // set transactions
    await this.setState({ currentTransactions: transactions });
  }

  addBtnPressed = () => {
    const {
      currentTransactions,
      currentAmount,
      currentDate,
      currentCategory
    } = this.state;

    // check if category is select and amount is given
    if ((currentCategory) && (currentAmount > 0)) {
      const transaction = new Transaction(
        currentTransactions.length,
        currentDate,
        getUSDFormattedString(currentAmount),
        'Eric Phung',
        currentCategory
      );

      this.storeNewTransaction(transaction); // add new transaction to existing storage

      // clear input values
      this.clearCurrentInputs();
    }
  }

  clearCurrentInputs() {
    this.setState({ currentAmount: 0 });
    this.setState({ currentCategory: null });
  }

  async storeNewTransaction(transaction) {
    const storageObj = await loadTransactionsObject(); // load storage object

    const { transactions } = storageObj; // get transactions from storage object

    transactions.unshift(transaction); // add new transaction to transactions

    // console.log(storageObj); // debug console

    saveTransactionsObject(storageObj); // save updated storage object

    // update current transactions list view with storage object
    await this.setState({ currentTransactions: transactions });
  }

  numberBtnPressed(number) {
    const { currentAmount } = this.state;
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    this.handleChange(newValue);
  }

  categoryBtnPressed(category) {
    // toggle current category selected
    const { currentCategory } = this.state;
    if (currentCategory === category) {
      this.setState({ currentCategory: null });
    } else {
      // set as current category
      this.setState({ currentCategory: category });
    }
  }

  deleteBtnPressed(transaction) {
    this.removeTransaction(transaction);
  }

  async removeTransaction(transaction) {
    const storageObject = await loadTransactionsObject();

    const { transactions } = storageObject;

    // console.log(transactions)

    // remove transaction by id
    const array = transactions;
    // console.log(array.length)

    let i = array.length - 1;
    for (i; i >= 0; i -= 1) {
      if (array[i].id === transaction.id) {
        array.splice(i, 1);
      }
    }
    // array = [2, 9]
    // console.log(storageObject.transactions.length);

    await saveTransactionsObject(storageObject);

    await this.setState({ currentTransactions: transactions });
  }

  handlePress(value) {
    if (typeof (value) === 'number') {
      this.numberBtnPressed(value);
    } else if (value === 'Add') {
      this.addBtnPressed();
    } else if (value === '<') {
      this.backspaceBtnPressed();
    } else {
      throw new Error('Pressed:', value);
    }
  }

  backspaceBtnPressed() {
    const { currentAmount } = this.state;
    // check for null, NaN, undefined, ''
    if (currentAmount) {
      const strValue = String(currentAmount);

      // pop last char from string value
      const newStr = strValue.substring(0, strValue.length - 1);

      this.handleChange(newStr);
    }
  }

  // value changes
  handleChange(value) {
    // check for limit of 11 digits
    if (String(value).length > 10) {
      return;
    }

    this.setState({ currentAmount: value });
  }

  render() {
    const {
      fontsAreLoaded,
      currentAmount,
      currentBalanceValue,
      currentSpentValue,
      currentDate,
      currentTransactions,
      currentCategory
    } = this.state;

    let view = <View />;
    if (fontsAreLoaded) {
      view = (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

          <BalanceView
            currentBalanceValue={currentBalanceValue}
            currentSpentValue={currentSpentValue}
          />

          <DateLabelView date={currentDate} />

          <TransactionsView
            deleteBtnPressed={this.deleteBtnPressed}
            transactions={currentTransactions}
          />

          <ScrollingPillCategoriesView
            onPress={this.categoryBtnPressed}
            currentCategory={currentCategory}
          />

          <AmountInputView
            isEditable={false}
            value={currentAmount}
            handleChange={this.handleChange}
          />

          <KeypadView handlePress={this.handlePress} />

        </ScrollView>

      );
    } else {
      view = (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.darkTwo }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
    }
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: colors.darkTwo,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});

export default Home;
