import { StyleSheet, Dimensions } from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

module.exports = StyleSheet.create({
  /* keypad styles */
  container: {
    flex: 1,
    backgroundColor: colors.darkTwo,
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  keypadBtn: {
    flex: 1,
    width: screen.width / 3.3,
    height: '100%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 5,

    // width: '30%', // 117,
    // height: 46,

    borderRadius: 5,
    backgroundColor: colors.dark,

    // // borderWidth: 1,
    // // borderColor: 'white',
    // // borderStyle: 'solid',

  },
  keypadBtnText: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
    // fontSize: Platform.OS === 'ios' ? 25 : 20,
    fontSize: 25,
    color: colors.white,
  },
  addKeyBtnStyle: {
    borderWidth: 1,
    borderColor: colors.shamrockGreen,
    borderRadius: 5,
    color: colors.shamrockGreen,
  },
  addKeyBtnText: {
    color: colors.shamrockGreen,
  },
});
