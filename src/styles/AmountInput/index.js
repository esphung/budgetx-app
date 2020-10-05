import { StyleSheet, Dimensions } from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

module.exports = StyleSheet.create({
  amountInputView: {
    flex: 1,
    // height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.dark,
    paddingRight: 12,

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'dashed',
  },
  amountInputLabel: {
    // flex: 0.9,
    // flex: 1,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    color: colors.offWhite,

    marginVertical: 8,
    marginLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  amountInputCurrency: {
    width: screen.width / 2,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 23,
    textAlign: 'right',
    color: colors.white,
    paddingRight: 6,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  amountInputSymbol: {
    // width: '100%',
    // height: '70%', // 30,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.29,
    textAlign: 'center',
    color: colors.offWhite,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
});