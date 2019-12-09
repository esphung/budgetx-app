import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ScreenName() {
  return (
    <View style={styles.container}>
      <Text>Say something</Text>
    </View>
  );
}
