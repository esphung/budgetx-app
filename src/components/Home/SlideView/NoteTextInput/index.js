import React, { useEffect } from 'react';

import { TextInput } from 'react-native';

// AWS Amplify
// import Auth from '@aws-amplify/auth';

// ui colors
import colors from 'src/colors';

import styles from 'styles/SlideView';

export default function NoteTextInput({
  updateTransactionNote,
  currentNote,
  // fullSlideView,
  // resetSlideView,
  refField,
  setCurrentNote,
  focusOnAmountInput,
  isFocusedNoteInput,
  setIsFocusedNoteInput,
}) {
  // const [value, setValue] = useState(currentNote);

  const onEndEditing = (val) => {
    // console.log('val.nativeEvent.text: ', val.nativeEvent.text);
    // setValue(val.nativeEvent.text.trim());
    // setCurrentNote(val.nativeEvent.text.trim());
    updateTransactionNote(val.nativeEvent.text.trim());
  };
  const onSubmitEditing = (val) => {
    // console.log('val.nativeEvent.text: ', val.nativeEvent.text);
    // setValue(value.trim());
    // setCurrentNote(val.nativeEvent.text.trim());
    updateTransactionNote(val.nativeEvent.text.trim());

    // focusOnAmountInput();
  };
  const onChangeText = (text) => {
    // setValue(text);
    setCurrentNote(text);
  };
  // useEffect(() => {
  //   // inputFocus(refField);
  //   return () => {
  //     // effect
  //   };
  // }, [])
  const view = (
    <TextInput
      ref={refField}
      style={styles.noteTextInputText}
      // autoCorrect={false}
      autoFocus
      placeholder="Add a note or change category"
      placeholderTextColor={colors.offWhite}
      onChangeText={onChangeText}
      value={currentNote}
      keyboardAppearance="dark"
      returnKeyType="done"
      onEndEditing={onEndEditing}
      onSubmitEditing={onSubmitEditing}
      autoCompleteType="off"
      onFocus={() => setIsFocusedNoteInput(true)}
      onBlur={() => setIsFocusedNoteInput(false)}


      // onFocus={fullSlideView}
      // onBlur={resetSlideView}

      clearButtonMode="while-editing"

      maxLength={42}

      // onBlur={resetSlideView}
    />
  );
  return view;
}

