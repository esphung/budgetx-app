import React, { Component } from 'react';

import {
  TextInput,
  View,
  Platform,
  Alert,
} from 'react-native';

import Auth from '@aws-amplify/auth';

// ui colors
import colors from 'main/colors';

// import {
//   loadTransactionsObject,
//   saveTransactionsObject
// } from '../../storage/TransactionsStorage';

// import {
//   loadUserObject,
//   saveUserObject
// } from '../../../storage/UserStorage';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../../storage/SettingsStorage';


import {
  loadPayees,
  savePayees
} from '../../../storage/PayeesStorage';

import Payee from '../../../models/Payee';

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

    const { payee } = props.item;

    this.state = {
      text: '',
      payee: payee,
      storageKey: null,
    };

    this.handleTextChange = this.handleTextChange.bind(this);

    this.submitBtnPressed = this.submitBtnPressed.bind(this);

    // this.endEditing = this.endEditing.bind(this);
  }


  async componentDidMount() {
    const { payee } = this.state;
    if (payee) {
      this.setState({ text: payee.name });
    }

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

  // endEditing() {
  //   const { payee } = this.state; // current transaction item
  //   this.setState({ text: payee.name })
  // }

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

          autoCorrect

          autoCapitalize="sentences" // "words"

          maxLength={24}

          onSubmitEditing={(event) => this.submitBtnPressed(event.nativeEvent.text)}

          onChangeText={this.handleTextChange}

          editable={this.isInputEnabled}

          value={text}

          // onEndEditing={() => this.setState({ text: payee.name })}
        />
      </View>
    );
  }
}

export default ItemNameInput;
