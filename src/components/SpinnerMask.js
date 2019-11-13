import React from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

const SpinnerMask = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff7f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    opacity: 0.1
}
});

export default SpinnerMask;