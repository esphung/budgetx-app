import React, { useState, useEffect } from 'react';

import { TextInput, View, Alert } from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth';

// ui colors
import colors from 'main/colors';

import styles from 'main/styles';

// import {
//   loadSettingsStorage,
//   saveSettingsStorage,
// } from '../storage/SettingsStorage';

export default function NoteTextInput(props) {
  const [note, setNote] = useState('');

  const [isReady, setIsReady] = useState(false);

  const [storageKey, setStorageKey] = useState(null);

  const [transaction, setTransaction] = useState(null);

  function reset() {
    setTransaction(props.transaction);
  }


  useEffect(() => {
    reset();
    return () => {
      // effect
    };
  }, []);

  useEffect(() => {
    if (note) {
      setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [note]);

  useEffect(() => {
    reset();
    return () => {
      // effect
    };
  });

  useEffect(() => {
    if (transaction) {
      // console.log(transaction);
      setNote(transaction.note);
       setIsReady(true);
    }
    // else {
    //   setNote('');
    // }
    return () => {
      // effect
    };
  }, [transaction]);

  if (isReady) {
    return (
      <TextInput
        style={
          [
            // styles.listItemTitleStyle,
            styles.textStyle,
          {
            height: 50,
            // width: '100%',
            // flex: 1,

            paddingLeft: 12,

            backgroundColor: colors.darkTwo,

            // borderWidth: 1,
            // borderColor: 'gray',
            // borderStyle: 'solid',
          }]
        }
        placeholder="Add note"
        placeholderTextColor={colors.offWhite}
        onChangeText={(text) => setNote(text)}
        value={note}
        keyboardAppearance="dark"
        returnKeyType="done"
        onEndEditing={() => props.updateStoredTransactionNote(note)}
        onSubmitEditing={() => props.updateStoredTransactionNote(note)}
        autoCompleteType="off"
        autoCorrect={false}

        clearButtonMode="while-editing"

        maxLength={42}
      />
      
    );
  }
  return <View />;
}

