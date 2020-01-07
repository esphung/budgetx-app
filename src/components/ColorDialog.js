import React from 'react';

import { Text, View } from 'react-native';

import Dialog from "react-native-dialog";

export default function ColorDialog() {
  return (
    <View>
      <Dialog.Container visible={true}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => console.log('')} />
        <Dialog.Button label="Delete" onPress={() => console.log('')} />
      </Dialog.Container>
    </View>
  );
}
