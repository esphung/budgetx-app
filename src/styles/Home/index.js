import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 20 : 0,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  northPanel: {
    height: screen.height / 9,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',

    // backgroundColor: 'steelblue',
  },
  centerPanel: {
    marginTop: 10,
  },
  southPanelWithShadows: {
    flex: 1,

    // borderWidth: 1,
    // borderColor: 'salmon',
    // borderStyle: 'solid',

    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    backgroundColor: colors.darkTwo,

    // backgroundColor: 'darkseagreen',
  },
  // // cross device syncing
  // deviceSyncingIndicator: {
  //   top: Platform.OS === 'android' ? 40 : 0,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: 30,
  // },
  // deviceSyncingText: {
  //   fontSize: 14,
  //   color: colors.shamrockGreen,
  //   opacity: 0.5,
  // },
  // displayIndicator: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // width: '100%',
  //   maxHeight: 40,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // transaction input view
  // transactionInputPanelShadows: {
  //   shadowColor: '#0f1725',
  //   shadowOffset: {
  //     width: 5,
  //     height: 5,
  //   },
  //   shadowRadius: 16,
  //   shadowOpacity: 1,

  //   // padding: 1,
  //   // flex: 1,
  //   // bottom: 0,
  //   // width: screen.width,
  //   // position: 'absolute',
  //   // top: screen.height / 1.75,

  //   // borderWidth: 1,
  //   // borderColor: 'red',
  //   // borderStyle: 'solid',

  //   backgroundColor: 'pink',

  //   // backgroundColor: 'transparent',
  // },
  // /* Amount Input */
  // amountInputView: {
  //   flex: 0.9,
  //   // height: 46,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: colors.dark,

  //   paddingRight: 12,

  //   borderWidth: 1,
  //   borderColor: 'red',
  //   borderStyle: 'dashed',
  // },
  // amountInputLabel: {
  //   // flex: 0.9,
  //   // flex: 1,
  //   fontFamily: 'SFProDisplay-Regular',
  //   fontSize: 17,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.13,
  //   color: colors.offWhite,

  //   marginVertical: 8,
  //   marginLeft: 12,

  //   // paddingTop: 5,
  //   // paddingLeft: 3,

  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderStyle: 'dotted',
  // },
  // amountInputCurrency: {
  //   fontFamily: 'SFProDisplay-Regular',
  //   fontSize: 23,
  //   textAlign: 'right',
  //   color: colors.white,
  //   paddingRight: 6,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'dotted',
  // },
  // amountInputSymbol: {
  //   // width: '100%',
  //   // height: '70%', // 30,
  //   fontFamily: 'SFProDisplay-Regular',
  //   fontSize: 22,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.29,
  //   textAlign: 'center',
  //   color: colors.offWhite,

  //   // marginVertical: 8,
  //   // marginRight: 12,

  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderStyle: 'dotted',
  // },
});
