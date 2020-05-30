import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

// ui colors
import colors from '../../../colors';

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
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    // width: '100%', // 375,
    height: 31,
    // opacity: 0.9, // 0.5
    backgroundColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  dateLabelText: {
    // width: '100%', // 131,
    padding: 5,
    // height: 17,
    // height: 31,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 17,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    // textAlign: 'center',
    color: colors.offWhite, // 'rgba(255, 255, 255, 0.5)'
  }
});

export default StickyDateHeader;
