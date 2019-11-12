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
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import * as Font from 'expo-font';

// import my custom view components
import HeaderLeftView from '../components/Header/HeaderLeftView';
import HeaderRightView from '../components/Header/HeaderRightView';
import BalanceView from '../components/BalanceView';
import DateLabelView from '../components/DateLabelView';
import TransactionsView from '../components/TransactionsView';
import ScrollingPillCategoriesView from '../components/ScrollingPillCategoriesView';
import AmountInputView from '../components/AmountInputView';
import KeypadView from '../components/KeypadView';
import ScrollingPayeePillsView from '../components/ScrollingPayeePillsView';
import TypeView from '../components/TypeView';
import SlideUp from '../components/SlideUp/SlideUp';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../storage/TransactionsStorage';

import {
  loadPayees,
  savePayees
} from '../storage/PayeesStorage';

import Transaction from '../models/Transaction';

import Payee from '../models/Payee';

// import sortArrayDesc from '../functions/sortArrayDesc';

// ui colors
import colors from '../../colors';

function search(nameKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    if (myArray[i].name === nameKey) {
      obj = myArray[i];
    }
  }
  return obj;
}


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
      currentAmount: null,
      currentDate: new Date(),
      currentCategory: null,
      currentTransactions: [],
      currentPayee: null,
      currentType: null,
      currentBalanceValue: 0.00,
      currentSpentValue: 0.00,
      isSlideUpHidden: true,
      // enableCategoryPills: true,
      bounceValue: new Animated.Value(300), // This is the initial position of the subview
    };

    this.handlePress = this.handlePress.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

    this.deleteBtnPressed = this.deleteBtnPressed.bind(this);

    this.payeeBtnPressed = this.payeeBtnPressed.bind(this);

    this.typeBtnPressed = this.typeBtnPressed.bind(this);

    this.toggleSlideView = this.toggleSlideView.bind(this);
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

    const { transactions } = await transactionsObject;

    // set transactions
    this.setState({ currentTransactions: transactions });
  }

  addTransactionBtnPressed() {
    const {
      currentTransactions,
      currentAmount,
      currentDate,
      currentCategory,
      currentPayee,
      currentType
    } = this.state;

    // check if category is select and amount is given
    if ((currentCategory) && (currentAmount > 0) && (currentType)) {
      const transaction = new Transaction(
        currentTransactions.length,
        currentDate,
        currentAmount,
        currentPayee,
        currentCategory,
        currentType
      );

      this.storeNewTransaction(transaction); // add new transaction to existing storage

      this.clearCurrentInputs(); // clear input values

      console.log(transaction);
      // colorConsole(JSON.stringify(transaction));
    }
  }

  clearCurrentInputs() {
    this.setState({ currentAmount: 0.00 });
    this.setState({ currentCategory: null });
    this.setState({ currentPayee: null });
    this.setState({ currentType: null });
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
      // set new current category
      this.setState({ currentCategory: category });
    }

    // toggle slide view
    // this.toggleSlideView();
  }

  toggleSlideView() {
    let { isSlideUpHidden } = this.state;
    const { bounceValue } = this.state;

    let toValue = 300;

    if (isSlideUpHidden) {
      toValue = 0;
    }

    // This will animate the translateY of the subview between 0 & 300
    // depending on its current state
    // 300 comes from the style below, which is the height of the subview.
    Animated.spring(
      bounceValue,
      {
        toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isSlideUpHidden = !isSlideUpHidden;

    this.setState({ isSlideUpHidden });

    // console.log(isSlideUpHidden);
  }

  deleteBtnPressed(transaction) {
    this.removeTransaction(transaction);
  }

  // async removeItemValue(key) {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     return true;
  //   }
  //   catch(exception) {
  //     return false;
  //   }
  // }

  async addNewPayee() {
    // add new payee to currentPayees (with textinput)
    const storage = await loadPayees();

    const { payees } = storage;

    const payee = new Payee(payees.length, 'New', colors.white);

    const resultObject = search(payee.name, payees);

    console.log(resultObject);

    if (!resultObject) {
      payees.unshift(payee);

      savePayees(storage);

      this.setState({ currentPayee: payee });

      // console.log(sortArrayDesc(payees));
    }
  }

  payeeBtnPressed(payee) {
    if (payee.name === '+') {
      this.addNewPayee();
      return;
    }
    // toggle current payee selected
    const { currentPayee } = this.state;

    if (currentPayee === payee) {
      this.setState({ currentPayee: null });
    } else {
      // set new current payee
      this.setState({ currentPayee: payee });
    }

    // console.log(payee);
  }

  typeBtnPressed(type) {
    const { currentType } = this.state;
    if (currentType === type.name) {
      this.setState({ currentType: null });
    } else {
      this.setState({ currentType: type.name });
    }
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

    await saveTransactionsObject(storageObject);

    await this.setState({ currentTransactions: transactions });
  }

  handlePress(value) {
    if (typeof (value) === 'number') {
      this.numberBtnPressed(value);
    } else if (value === 'Add') {
      this.addTransactionBtnPressed();
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

  // incomeBtnPressed() {
  //   this.setState({ currentType: 'income' });
  // }

  // expenseBtnPressed() {
  //   this.setState({ currentType: 'expense' });
  // }

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
      currentCategory,
      currentPayee,
      currentType,
      bounceValue,
      // isSlideUpHidden,
      // enableCategoryPills
    } = this.state;

    let view = <View />;
    if (fontsAreLoaded) {
      view = (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

            <BalanceView
              currentBalanceValue={currentBalanceValue}
              currentSpentValue={currentSpentValue}
              // currentBalanceBtnPressed={() => alert()}
              // currentSpentBtnPressed={() => alert()}
            />

            <DateLabelView date={currentDate} />

            <TransactionsView
              deleteBtnPressed={this.deleteBtnPressed}
              transactions={currentTransactions}
            />

            <TypeView
              onPress={this.typeBtnPressed}
              currentType={currentType}
            />

            <ScrollingPayeePillsView
              onPress={this.payeeBtnPressed}
              currentPayee={currentPayee}
            />

            <ScrollingPillCategoriesView
              onPress={this.categoryBtnPressed}
              currentCategory={currentCategory}
              // isEnabled={enableCategoryPills}
            />

            <AmountInputView
              isEditable={false}
              value={currentAmount}
              handleChange={this.handleChange}
            />

            <KeypadView handlePress={this.handlePress} />

            <SlideUp
              toggleSlideView={this.toggleSlideView}
              bounceValue={bounceValue}
              // onPress={this.typeBtnPressed}
              // currentType={currentType}
            />

          </ScrollView>
        </TouchableWithoutFeedback>

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
