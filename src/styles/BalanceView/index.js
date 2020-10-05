import { StyleSheet } from 'react-native';

import colors from 'src/colors';

module.exports = StyleSheet.create({
  balanceView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // 346,
    minWidth: 346,
    height: 74,
    maxHeight: '95%',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 9,
    backgroundColor: colors.dark,

    // shadowColor: '#0f1725',

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  balanceViewShadowStyle: {
    width: '90%', // 346,
    minWidth: 346,
    height: 74,
    maxHeight: '95%',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: '#0f1725',

    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 16,
    shadowOpacity: 1,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  separator: {
    width: 1,
    maxHeight: '60%',
    height: 50,
    marginVertical: 10,
    backgroundColor: colors.white, // 'rgba(0,0,0,0.5)',
    opacity: 0.1,
  },
  currentBalanceTitle: {
    // width: 113,
    width: '100%',
    // height: 20,

    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.12,
    textAlign: 'center',
    // textAlignVertical: 'top',
    color: colors.shamrockGreen,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  currentSpentTitle: {
    // width: 113,
    width: '100%',
    // height: 20,

    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.12,
    textAlign: 'center',
    color: colors.pinkRed,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  currentBalanceValue: {
    // width: 37,
    width: '100%',
    height: 30,

    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    textAlign: 'center',
    color: colors.white,

    // borderWidth: global.borderWidth,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  currentSpentValue: {
    // width: 37,
    width: '100%',
    height: 30,

    fontFamily: 'SFProDisplay-Regular',
    fontSize: 23,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    textAlign: 'center',
    color: colors.white,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});