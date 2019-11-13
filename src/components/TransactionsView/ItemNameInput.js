import React, { Component } from 'react';
import {
  TextInput,
  View,
  Platform
} from 'react-native';

// ui colors
import colors from '../../../colors';

import {
  loadTransactionsObject,
  saveTransactionsObject
} from '../../storage/TransactionsStorage';

import {
  loadPayees,
  savePayees
} from '../../storage/PayeesStorage';

import Payee from '../../models/Payee';

// find previous obj if exists
function search(nameKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    // console.log(myArray[i].name, nameKey);
    if (myArray[i].name === nameKey) {
      obj = myArray[i];
    }
  }
  return obj;
}

class ItemNameInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);

    this.submitBtnPressed = this.submitBtnPressed.bind(this);
  }

  componentDidMount() {
    const { item } = this.props;
    const { name } = item.payee;

    if (name) {
      this.setState({ text: name });
    }
  }

  handleTextChange(text) {
    this.setState({ text });
    // console.log(text);
  }

  async submitBtnPressed(text) {
    const { item } = this.props; // current transaction item

    // load default payees
    const payeesObject = await loadPayees();

    const { payees } = payeesObject;
    // console.log(payees);

    // check if previous payee exists
    const previousPayee = search(text, payees);

    if (previousPayee) {
      // console.log('PREVIOUS:',previousObj);
      // save payee to item (transaction)
      // load saved transactions
      const transactionsObj = await loadTransactionsObject(); // load storage object

      const { transactions } = transactionsObj; // get transactions from storage object

      // // find current transaction from list
      let i = transactions.length - 1;
      for (i; i >= 0; i -= 1) {
        if (transactions[i].id === item.id) {
          // set transaction payee
          transactions[i].payee = previousPayee;

          // console.log(transactions[i]);

          // save transactions list
          saveTransactionsObject(transactionsObj);

          // return from here
          return;
        }
      }
    } else {
      // clean scrub name

      //  create new payee
      const payee = new Payee(payees.length, text);

      // add payee to list
      payees.push(payee);
      // console.log(payees);

      // save new list of payees
      savePayees(payeesObject);

      // load saved transactions
      const transactionsObj = await loadTransactionsObject(); // load storage object

      const { transactions } = transactionsObj; // get transactions from storage object

      // // find current transaction from list
      let i = transactions.length - 1;
      for (i; i >= 0; i -= 1) {
        if (transactions[i].id === item.id) {
          // set transaction payee
          transactions[i].payee = payee;

          // console.log(transactions[i]);

          // save transactions list
          saveTransactionsObject(transactionsObj);

          // return from here
          return;
        }
      }
    }
    this.setState({ text });
    // console.log('Submit:', text);
  }

  render() {
    // const { item } = this.props;

    const { text } = this.state;
    return (
      <View
        style={
          {
            flex: 1,

            // flexDirection: 'row',

            justifyContent: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
      >
        <TextInput
          style={
            {
              fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
              fontSize: 15,
              fontStyle: 'normal',
              letterSpacing: 0.1,
              // color: '#ffffff',

              // color: item.category.color +  '7f',
              color: colors.white,
              // backgroundColor: colors.darkTwo,
            }
          }

          placeholder=""

          placeholderTextColor="#ffffff7f"

          keyboardAppearance="dark" // ios

          // textContentType="name" // ios

          // keyboardType="name-phone-pad"

          returnKeyType="done"

          autoCorrect={false}

          autoCapitalize="words"

          maxLength={12}

          onSubmitEditing={() => this.submitBtnPressed(text)}

          onChangeText={this.handleTextChange}

          editable={this.isInputEnabled}

          value={text}

          // onEndEditing={() => {}}
        />
      </View>
    );
  }
}

export default ItemNameInput;
