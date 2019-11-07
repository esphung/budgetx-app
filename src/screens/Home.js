/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
            Sun Nov  3 05:40:29 2019
            04/11/2019 03:57 AM
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

// ui colors
import colors from '../../colors';

const SFProDisplayRegularFont = require('../../assets/fonts/SF-Pro-Display-Regular.otf');

const SFProDisplaySemiboldFont = require('../../assets/fonts/SF-Pro-Display-Semibold.otf');

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    // set up user email and user name
    const props = navigation.getScreenProps('props');

    return {
      headerTransparent: {},

      headerLeft: <HeaderLeftView boldMessage={props.user.name} normalMessage={props.user.email} />,

      headerRight: <HeaderRightView />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false,
      value: null,
    };

    this.handlePress = this.handlePress.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // load sf pro fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': SFProDisplayRegularFont,
      'SFProDisplay-Semibold': SFProDisplaySemiboldFont
    });

    this.setState({ fontsAreLoaded: true });

    const { navigation } = this.props;

    this.setState({ data: navigation.getScreenProps('data') });
  }

  getView(fontsAreLoaded, data, value) {
    let view = null;
    if (fontsAreLoaded) {
      view = (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>

          <BalanceView
            currentBalanceValue={data.currentBalanceValue}
            currentSpentValue={data.currentSpentValue}
          />

          <DateLabelView date={data.date} />

          <TransactionsView transactions={data.transactions} />

          <ScrollingPillCategoriesView categories={data.categories} />

          <AmountInputView
            isEditable={false}
            value={value}
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

  addBtnPressed = () => {
  }

  numberBtnPressed(number) {
    const { value } = this.state;
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(value))) + String(number);
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
    const { value } = this.state;
    // check for null, NaN, undefined, ''
    if (value) {
      const strValue = String(value);

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

    this.setState({ value });
  }

  render() {
    const { data } = this.state;// this.props.navigation.getScreenProps();
    const { fontsAreLoaded, value } = this.state;

    let view = <View />;

    if (data) {
      view = this.getView(fontsAreLoaded, data, value);
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
