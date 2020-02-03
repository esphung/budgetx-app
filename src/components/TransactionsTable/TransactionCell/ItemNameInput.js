import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  TextInput,
  // View,
  // Platform,
  Alert,
} from 'react-native';

import Auth from '@aws-amplify/auth';

// ui colors
import colors from 'main/colors';

import styles from 'main/styles';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../../storage/SettingsStorage';

import {
  loadPayees,
  savePayees
} from '../../../storage/PayeesStorage';

import Payee from '../../../models/Payee';

import searchByName from '../../../functions/searchByName';

class ItemNameInput extends Component {
  constructor(props) {
    super(props);

    const { payee, isNameInputEnabled } = props.item;

    this.state = {
      text: '',
      payee,
      storageKey: null,
    };

    this.handleTextChange = this.handleTextChange.bind(this);

    this.submitBtnPressed = this.submitBtnPressed.bind(this);

    // this.endEditing = this.endEditing.bind(this);
  }


  async componentDidMount() {
    const { payee } = this.state;
    this.setState({ text: payee.name });

    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        // setStorageKey(cognito.username);
        this.setState({ storageKey: cognito.username });
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
      });
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
    const previousPayee = searchByName(text, payees);

    if (previousPayee) {
      // const { storageKey } = this.state;
      // load stored user
      const userObject = await loadSettingsStorage(this.state.storageKey); // load storage object


      // find current transaction fromm user transactions list
      let i = userObject.transactions.length - 1;
      for (i; i >= 0; i -= 1) {
        if (userObject.transactions[i].id === item.id) {
          // set user transaction payee
          userObject.transactions[i].payee = previousPayee;

          // console.log(transactions[i]);

          // save transactions list
          // saveUserObject(userObject);
          saveSettingsStorage(this.state.storageKey, userObject);

          // return from here
          return;
        }
      }
    } else {
      // clean scrub name

      //  create new payee
      const payee = new Payee(text);

      // add payee to list
      payees.push(payee);
      // console.log(payees);

      // save new list of payees
      savePayees(payeesObject);

      // load user saved transactions
      const userObject = await loadSettingsStorage(this.state.storageKey);

      // // find current transaction from list
      let i = userObject.transactions.length - 1;
      for (i; i >= 0; i -= 1) {
        if (userObject.transactions[i].id === item.id) {
          // set transaction payee
          userObject.transactions[i].payee = payee;

          // console.log(transactions[i]);

          // save transactions list
          // saveUserObject(userObject);
          saveSettingsStorage(this.state.storageKey, userObject);

          // return from here
          return;
        }
      }
    }
    this.setState({ text });
    // console.log('Submit:', text);
  }

  render() {
    const placeholderText = 'Enter name';

    const { text } = this.state;

    const color = colors.white;

    let opacity = 0.1;

    let isClearButtonModeEnabled = 'never';

 

    // item has payee
    if (text && text !== placeholderText) {
      opacity = 1;
      isClearButtonModeEnabled = 'while-editing';
    }

    return (
      
        <TextInput
          style={
            [
              // {
              //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
              //   fontSize: 15,
              //   fontStyle: 'normal',
              //   letterSpacing: 0.1,
              //   // color: '#ffffff',

              //   // color: item.category.color +  '7f',
              //   color: colors.white,
              //   // backgroundColor: colors.darkTwo,

              // },

              styles.payeeInputText,
              {
                // color: '#ffffff',
                color,
                opacity,
              }
            ]
          }

          placeholder={placeholderText}

          placeholderTextColor="#ffffff7f"

          keyboardAppearance="dark" // ios

          // textContentType="name" // ios

          // keyboardType="name-phone-pad"

          returnKeyType="done"

          autoCorrect

          autoCapitalize="sentences" // "words"

          maxLength={24}

          onSubmitEditing={(event) => this.submitBtnPressed(event.nativeEvent.text)}

          onChangeText={this.handleTextChange}

          editable={this.isInputEnabled}

          value={text}

          clearButtonMode={isClearButtonModeEnabled}

          editable={this.props.isNameInputEnabled}

          // onFocus={() => {
          //   if (!text) {
          //     // transaction has no existing payee name, clear placeholder

          //   }
          // }}

          // onEndEditing={() => this.setState({ text: payee.name })}
        />
    );
  }
}

ItemNameInput.propTypes = {
  item: PropTypes.object.isRequired,
};


export default ItemNameInput;
