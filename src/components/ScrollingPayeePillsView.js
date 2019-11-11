// FILENAME:  ScrollingPayeePillsView.js
// PURPOSE:   shows payee pills
// AUTHOR:    Eric Phung
// CREATED:   10/11/2019 01:07 PM
import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View
} from 'react-native';

import colors from '../../colors'; // ui colors

import PayeePill from './PayeePill';

import {
  loadPayees,
  // savePayees
} from '../storage/PayeesStorage';

class ScrollingPayeePillsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payees: []
    };
  }

  async componentDidMount() {
    // load default settings
    const storage = await loadPayees();
    const { payees } = storage;
    await this.setState({ payees });
    // console.log('State Payees Set:', payees.length);
  }

  getPayeePill(items) {
    let view = <View />;
    if (items) {
      view = items.map((item) => (
        <PayeePill
          item={item}
          id={item.id}
          name={item.name}
          color={item.color}
          textColor={item.color}
          key={item.id}
          onPress={() => this.payeeBtnPressed(item)}
          isSelected={this.isCurrentPayee(item)}
        />
      ));
    }
    return view;
  }


  isCurrentPayee(payee) {
    const { currentPayee } = this.props;
    if (!currentPayee) {
      return false;
    }
    if (currentPayee === payee) {
      return true;
    }
    return false;
  }


  payeeBtnPressed(payee) {
    const { onPress } = this.props;
    onPress(payee);
  }

  render() {
    const { payees } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          // snapToInterval={MIN_PILL_WIDTH} // your element width
          snapToAlignment="center"

          style={styles.scrollView}
        >
          {
            this.getPayeePill(payees)
          }

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%', // 53,
    backgroundColor: colors.darkTwo,
    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    position: 'absolute',
    top: '45%', // '57%', // 462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});


export default ScrollingPayeePillsView;
