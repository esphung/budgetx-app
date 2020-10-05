import { StyleSheet, Dimensions } from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screen.width,
    // bottom: 0,
    // paddingBottom: 20,

    // borderWidth: 1,
    // borderColor: 'purple',
    // borderStyle: 'solid',

    // backgroundColor: 'salmon',
  },
  scrollingPills: {
    // flex: 0.25,
    // backgroundColor: 'salmon',
    // backgroundColor: colors.darkTwo,
    height: (screen.height / 2) * 0.12,
  },
  amountInput: {
    // flex: 0.25,
    // backgroundColor: 'steelblue',
    // backgroundColor: colors.darkTwo,
    height: (screen.height / 2) * 0.12,
  },
  keypadInput: {
    // flex: 1,
    // backgroundColor: 'skyblue',
    // backgroundColor: colors.darkTwo,
    height: (screen.height / 3) * 0.8,
  },
});
