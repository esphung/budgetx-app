import React from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// ui colors
import colors from 'main/colors';

import getFormattedDateString from '../../functions/getFormattedDateString';

function StickyDateHeader(props) {
  const view = (
    <View style={styles.container}>
      <Text style={styles.dateLabelText}>
        {`${getFormattedDateString(props.date)}`}
      </Text>
    </View>
  );
  return view;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    width: '100%', // 375,
    height: 31,
    opacity: 0.9, // 0.5
    backgroundColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  dateLabelText: {
    width: '100%', // 131,
    height: 20,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)'
  }
});

export default StickyDateHeader;
