/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
            04/11/2019 03:57 AM
            06/11/2019 06:54 PM (ESLinter)
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

import Transaction from '../models/Transaction';

import getUSDFormattedString from '../functions/getUSDFormattedString';

// ui colors
import colors from '../../colors';

const SFProDisplayRegularFont = require('../../assets/fonts/SF-Pro-Display-Regular.otf');

const SFProDisplaySemiboldFont = require('../../assets/fonts/SF-Pro-Display-Semibold.otf');


class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    // get user name and email from props
    const props = navigation.getScreenProps('props');

    const { name, email } = props.user;

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
      user: {},
      data: {},
      currentAmount: null,
      currentDate: null,
      currentCategory: null,
      currentTransactions: null,
    };

    this.handlePress = this.handlePress.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.categoryBtnPressed = this.categoryBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': SFProDisplayRegularFont,
      'SFProDisplay-Semibold': SFProDisplaySemiboldFont
    });

    await this.setState({ fontsAreLoaded: true });

    // user and data
    const { screenProps } = this.props;

    const { user, data } = screenProps;

    await this.setState({
      user,
      data,
      currentTransactions: data.transactions
    });
    // console.log(this.state);
  }

  addBtnPressed = () => {
    const {
      currentTransactions,
      currentAmount,
      currentDate,
      currentCategory
    } = this.state;

    if (currentCategory) {
      const transaction = new Transaction(
        currentTransactions.length + 1,
        currentDate,
        getUSDFormattedString(currentAmount),
        'Eric Phung',
        currentCategory
      );

      const list = [];

      list.push(transaction);

      this.setState({ currentTransactions: list });

      console.log('Current Transactions:', list.length);
    } else {

      alert('Please choose a category');
    }
  }

  numberBtnPressed(number) {
    const { currentAmount } = this.state;
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    this.handleChange(newValue);
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

  categoryBtnPressed(category){
    this.setState({ currentCategory: category })
    // alert(category.name);
  }

  render() {
    // const { screenProps } = this.props;

    const { user, data } = this.state;

    const { fontsAreLoaded, currentAmount, currentDate, currentTransactions } = this.state;

    let view = <View />;
    if ((fontsAreLoaded) && (data)) {
      view = (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

          <BalanceView
            currentBalanceValue={data.currentBalanceValue}
            currentSpentValue={data.currentSpentValue}
          />

          <DateLabelView date={currentDate} />

          <TransactionsView transactions={currentTransactions} />

          <ScrollingPillCategoriesView
            categories={data.categories}
            onPress={this.categoryBtnPressed}
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
