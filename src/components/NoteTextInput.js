import React, { useState, useEffect } from 'react';

import { TextInput, View, Alert } from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth';

// ui colors
import colors from '../../colors';

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
          {
            height: 45,
            // flex: 1,
            // borderColor: 'gray',
            // borderWidth: 1,

            backgroundColor: colors.dark,

            // height: '100%',
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 17,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.13,
            textAlign: 'left',
            color: colors.white,

            paddingLeft: 10,
          }
        }
        placeholder="Enter a note"
        placeholderTextColor={colors.offWhite}
        onChangeText={(text) => setNote(text)}
        value={note}
        keyboardAppearance="dark"
        returnKeyType="done"
        onSubmitEditing={() => props.updateStoredTransactionNote(note)}
      />
    );
  }
  return <View />;
}

