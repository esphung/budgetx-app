import React from 'react';

import { TextInput } from 'react-native';

// AWS Amplify
// import Auth from '@aws-amplify/auth';

// ui colors
import colors from 'src/colors';

import styles from 'styles/SlideView';

export default function NoteTextInput({
  updateTransactionNote,
  currentNote,
  fullSlideView,
  resetSlideView,
  refField,
  setCurrentNote,
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
  };
  const onChangeText = (text) => {
    // setValue(text);
    setCurrentNote(text);
  };
  const view = (
    <TextInput
      ref={refField}
      style={styles.noteTextInputText}
      autoCorrect={false}
      placeholder="Add a note"
      placeholderTextColor={colors.offWhite}
      onChangeText={onChangeText}
      value={currentNote}
      keyboardAppearance="dark"
      returnKeyType="done"
      onEndEditing={onEndEditing}
      onSubmitEditing={onSubmitEditing}
      autoCompleteType="off"

      onFocus={fullSlideView}
      onBlur={resetSlideView}

      clearButtonMode="while-editing"

      maxLength={42}

      // onBlur={resetSlideView}
    />
  );
  return view;
}

