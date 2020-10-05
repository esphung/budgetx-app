import { StyleSheet, Platform } from 'react-native';

import colors from 'colors';

// const screen = Dimensions.get('screen');

module.exports = StyleSheet.create({
  scrollingPillsContainer: {
    alignItems: 'center',
    flex: 1,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',

    borderTopWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: colors.dark,
    // borderStyle: 'solid',

    backgroundColor: colors.darkTwo,
  },
  scrollingPills: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 8,

    // borderWidth: 1,
    // borderColor: 'blue',
    // borderStyle: 'solid',
  },

  pillItemText: {
    paddingHorizontal: 12,
    fontFamily: 'SFProDisplay-Regular',
    textAlign: 'center',
    fontSize: 17,
    color: colors.white, // '#ffffff',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});
