
import React, { Component, useState, useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';

// ui colors
import colors from '../../../../colors';

import styles from '../../../../styles';

import uuidv4 from '../../../functions/uuidv4';

export default function PizzaTranslator(props) {
  let { transaction, updateTransactionPayee, isNameInputEnabled } = props;

  console.log('transaction: ', transaction);

  const [text, setText] = useState('');

  if (!transaction.payee) {
    transaction.payee = {
      id: uuidv4(),
      name: '',
      owner: global.storageKey,
      version: 0,
    }
  }

  useEffect(() => {
    // updateTransactionPayee(transaction, text);
    // console.log('text: ', text);
    return () => {
      // effect
    };
  }, [text]);
  return (
    <View style={{  maxWidth: 135, flexGrow: 1, justifyContent: 'center',}}>
      <TextInput
        style={styles.payeeInputText}
        placeholder={transaction.note}
        onChangeText={text => setText(text)}

        onSubmitEditing={() => updateTransactionPayee(transaction, text)}
        defaultValue=""

        keyboardAppearance="dark" // ios

        editable={false}

        returnKeyType="done"

        autoCorrect

        autoCompleteType="name"

        spellCheck

        autoCapitalize="words" // "words"

        maxLength={24}

        clearButtonMode="while-editing"

        clearOnTextFocus
      />
     {/* <Text style={{padding: 10, fontSize: 20}}>
        { text.split(' ').map((word) => word && '🍕').join(' ') }
      </Text>*/}
    </View>
  );
}



// import React, { Component } from 'react';

// import PropTypes from 'prop-types';

// import {
//   TextInput,
//   // View,
//   // Platform,
//   Alert,
// } from 'react-native';

// // import Auth from '@aws-amplify/auth';

// // ui colors
// import colors from '../../../../colors';

// import styles from '../../../../styles';

// import {
//   loadSettingsStorage,
//   saveSettingsStorage,
// } from '../../../storage/SettingsStorage';

// import {
//   loadPayees,
//   savePayees
// } from '../../../storage/PayeesStorage';

// import Payee from '../../../models/Payee';

// import searchByName from '../../../functions/searchByName';

// // import searchByID from '../../../functions/searchByID';

// class ItemNameInput extends Component {
//   constructor(props) {
//     super(props);

//     const { payee, isNameInputEnabled } = props.item;

//     let name = '';

//     if (payee) {
//       name = payee.name
//     }



//     this.state = {
//       text: '',
//       payee: name,
//       // storageKey: null,
//     };

//     this.handleTextChange = this.handleTextChange.bind(this);

//     this.submitBtnPressed = this.submitBtnPressed.bind(this);

//     // this.endEditing = this.endEditing.bind(this);
//   }


//   async componentDidMount() {
//     const { payee } = this.props.item;

//     let name;
//     if (payee) {
//       name = payee.name
//     }
//     await this.setState({ text: name });

//     // if (this.props.item.payee.name) {
//     //   await this.setState({ text: this.props.item.payee.name })
//     // }

//     // Auth.currentAuthenticatedUser()
//     //   .then((cognito) => {
//     //     // setStorageKey(cognito.username);
//     //     this.setState({ storageKey: cognito.username });
//     //   })
//     //   .catch((err) => {
//     //     // console.log(err);
//     //     Alert.alert(err);
//     //   });
//   }

//   // async componentWillUnmount() {
//   //   const { payee } = this.state;
//   //   await this.setState({ text: payee });
//   // }

//   handleTextChange(text) {
//     // // console.log('this.props: ', this.props);
//     // this.props.item.payee = new Payee(text);
//     // this.setState({ text: this.props.item.payee.name });
//     // // console.log(text);

//     this.submitBtnPressed(text)
//   }

//   async submitBtnPressed(text) {
//     // console.log(text);
//     const { item } = this.props; // current transaction item

//     // load default payees
//     const payeesObject = await loadPayees();

//     const { payees } = payeesObject;
//     // console.log(payees);

//     // check if previous payee exists
//     const previousPayee = searchByName(text, payees);

//     if (previousPayee) {
//       // const { storageKey } = this.state;
//       // load stored user
//       const userObject = await loadSettingsStorage(this.state.storageKey); // load storage object


//       // find current transaction fromm user transactions list
//       let i = userObject.transactions.length - 1;
//       for (i; i >= 0; i -= 1) {
//         if (userObject.transactions[i].id === item.id) {
//           // set user transaction payee
//           userObject.transactions[i].payee = previousPayee;

//           // console.log(transactions[i]);

//           // save transactions list
//           // saveUserObject(userObject);
//           saveSettingsStorage(this.state.storageKey, userObject);

//           // return from here
//           return;
//         }
//       }
//     } else {
//       // clean scrub name

//       //  create new payee
//       const payee = new Payee(text);

//       // add payee to list
//       payees.push(payee);
//       // console.log(payees);

//       // save new list of payees
//       savePayees(payeesObject);

//       // load user saved transactions
//       const userObject = await loadSettingsStorage(this.state.storageKey);

//       // // find current transaction from list
//       let i = userObject.transactions.length - 1;
//       for (i; i >= 0; i -= 1) {
//         if (userObject.transactions[i].id === item.id) {
//           // set transaction payee
//           userObject.transactions[i].payee = payee;

//           // console.log(transactions[i]);

//           // save transactions list
//           // saveUserObject(userObject);
//           saveSettingsStorage(this.state.storageKey, userObject);

//           // return from here
//           // return;
//         }
//       }
//     }
//     this.setState({ text });
//     // console.log('Submit:', text);
//   }

//   // submitBtnPressed(text, transaction) {
//   //   // console.log(text);
//   //   this.props.handlePayeeNameChange(text, transaction);
//   // }

//   render() {
//     const placeholderText = '';

//     const { text } = this.state;

//     const color = colors.white;

//     let opacity = 0.1;

//     let isClearButtonModeEnabled = 'never';

 

//     // item has payee
//     if (text && text !== placeholderText) {
//       opacity = 1;
//       isClearButtonModeEnabled = 'while-editing';
//     }

//     return (
      
//         <TextInput
//           style={
//             [
//               // {
//               //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
//               //   fontSize: 15,
//               //   fontStyle: 'normal',
//               //   letterSpacing: 0.1,
//               //   // color: '#ffffff',

//               //   // color: item.category.color +  '7f',
//               //   color: colors.white,
//               //   // backgroundColor: colors.darkTwo,

//               // },

//               styles.payeeInputText,
//               {
//                 // color: '#ffffff',
//                 color,
//                 opacity,
//               }
//             ]
//           }

//           placeholder={placeholderText}

//           placeholderTextColor="#ffffff7f"

//           keyboardAppearance="dark" // ios

//           // textContentType="name" // ios

//           // keyboardType="name-phone-pad"

//           returnKeyType="done"

//           autoCorrect

//           autoCapitalize="sentences" // "words"

//           maxLength={24}

//           // onSubmitEditing={(event) => this.submitBtnPressed(event.nativeEvent.text, this.props.item)}

//           // onSubmitEditing={this.props.updateTransactionPayee}
          
//           // onChangeText={this.handleTextChange}
//           onChangeText={this.props.updateTransactionPayee}

//           value={this.props.currentPayeeName} // this.props.item.payee.name

//           clearButtonMode={isClearButtonModeEnabled}

//           editable={this.props.isNameInputEnabled}

//           // onFocus={() => {
//           //   if (!text) {
//           //     // transaction has no existing payee name, clear placeholder

//           //   }
//           // }}

//           // onEndEditing={() => this.setState({ text: payee.name })}
//         />
//     );
//   }
// }

// // ItemNameInput.propTypes = {
// //   item: PropTypes.object.isRequired,
// // };


// export default ItemNameInput;
