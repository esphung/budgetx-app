import React, { useState, useEffect } from 'react';

import { TextInput, View, Alert } from 'react-native';

// AWS Amplify
// import Auth from '@aws-amplify/auth';

// ui colors
import colors from '../../colors';

import styles from '../../styles';

// import {
//   loadSettingsStorage,
//   saveSettingsStorage,
// } from '../storage/SettingsStorage';

export default function NoteTextInput(props) {
  const { updateTransactionNote, transaction } = props;
  // console.log('props: ', props);
  const [note, setNote] = useState('');

  // const [isReady, setIsReady] = useState(false);

  // const [storageKey, setStorageKey] = useState(null);

  // const [transaction, setTransaction] = useState(null);

  // function reset() {
  //   setTransaction(transaction);
  // }


  // useEffect(() => {
  //   reset();
  //   return () => {
  //     // effect
  //   };
  // }, []);

  // useEffect(() => {
  //   if (note) {
  //     setIsReady(true);
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [note]);

  // useEffect(() => {
  //   reset();
  //   return () => {
  //     // effect
  //   };
  // });

  useEffect(() => {
    if (transaction) {
      // console.log(transaction);
      setNote(transaction.note);
    }
    // else {
    //   setNote('');
    // }
    return () => {
      // effect
    };
  }, [transaction]);

  // if (isReady) {
    return (
      <TextInput
        style={
          [
            // styles.listItemTitleStyle,
            styles.textStyle,
          {
            height: 50,

            paddingLeft: 12,

            margin: 4,

            // marginTop: 3,

            // backgroundColor: colors.dark,

            borderTopWidth: 1,
            borderTopColor: colors.dark,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }]
        }
        placeholder="Add note"
        placeholderTextColor={colors.offWhite}
        onChangeText={(text) => setNote(text)}
        value={note}
        keyboardAppearance="dark"
        returnKeyType="done"
        onEndEditing={() => updateTransactionNote(note)}
        // onSubmitEditing={() => props.updateTransactionNote(note)}
        autoCompleteType="off"
        // autoCorrect={false}

        clearButtonMode="while-editing"

        maxLength={42}
      />
      
    );
  // }
  return <View />;
}

