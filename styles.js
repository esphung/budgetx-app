import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import colors from 'src/colors';

// fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  // not  HOME
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',

    // opacity: 0.1,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  headerLeft: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 15,
    width: '100%',
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  // normalMessage: {
  //   // width: 'auto',
  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 15,
  //   // fontStyle: 'normal',
  //   letterSpacing: 0.13,
  //   color: colors.white,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'dashed',
  // },
  // boldMessage: {
  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
  //   fontSize: 15,
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.13,
  //   color: colors.white,
  //   fontWeight: '600',
  // },
  // /* Balance View */
  // balanceViewRectangle: {
  //   width: '100%',
  //   // alignItems: 'center',
  //   // top: 70, // 70

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'dotted',
  // },
  // balanceView: {
  //   position: Platform.OS === 'ios' ? 'relative' : 'absolute',
  //   width: '90%', // 346,
  //   minWidth: 346,
  //   // height: 74,
  //   maxHeight: '95%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderRadius: 9,
  //   backgroundColor: colors.dark,
  //   shadowColor: '#0f1725',
  //   shadowOffset: {
  //     width: 5,
  //     height: 5,
  //   },
  //   shadowRadius: 16,
  //   shadowOpacity: 1,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // separator: {
  //   width: 1,
  //   // height: '70%',
  //   height: 50,
  //   marginVertical: 10,
  //   backgroundColor: colors.white, // 'rgba(0,0,0,0.5)',
  //   opacity: 0.1,
  // },
  // currentBalanceTitle: {
  //   // width: 113,
  //   width: '100%',
  //   // height: 20,

  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 15,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.12,
  //   textAlign: 'center',
  //   // textAlignVertical: 'top',
  //   color: colors.shamrockGreen,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // currentSpentTitle: {
  //   // width: 113,
  //   width: '100%',
  //   // height: 20,

  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 15,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.12,
  //   textAlign: 'center',
  //   color: colors.pinkRed,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // currentBalanceValue: {
  //   // width: 37,
  //   width: '100%',
  //   height: 30,

  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 25,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.13,
  //   textAlign: 'center',
  //   color: colors.white,

  //   // borderWidth: global.borderWidth,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // currentSpentValue: {
  //   // width: 37,
  //   width: '100%',
  //   height: 30,

  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 25,
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // letterSpacing: 0.13,
  //   textAlign: 'center',
  //   color: colors.white,

  //   // borderWidth: global.borderWidth,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },

  // /* Transactions Table */
  // emptyTableTitleStyle: {
  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontWeight: '600',
  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  // emptyTableMessageStyle: {
  //   // width: 225,
  //   // height: 84,
  //   opacity: 0.65,
  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontSize: 22,
  //   textAlign: 'center',
  //   color: colors.offWhite,

  //   padding: 4,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  numberBtnText: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    color: 'white',
  },
  addKeyView: {
    width: '100%', // 117,
    height: '100%',
    justifyContent: 'center',

    backgroundColor: colors.darkTwo,

    shadowColor: '#0c1422',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 0,
    shadowOpacity: 1,

    borderWidth: 1,
    borderColor: colors.shamrockGreen,

    borderRadius: 5,
  },
  addKeyTitle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.29,
    textAlign: 'center',
    color: colors.shamrockGreen,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  userImageMaskView: {
    flex: 0.1,
    width: 33,
    height: 33,
    // backgroundColor: colors.darkGreyBlue,
    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,

    // width: 27,// if user image available???
    // height: 27,// if user image available???
    // opacity: 0.2, // if no image available
    // backgroundColor: '#ffffff'
  },

  userMessageView: {
    flex: 1,
    // flexDirection: 'column',
    height: 36,
    left: 12,
    // justifyContent: 'center',
    // marginLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  settingsBtnTouchableOpacityMask: {
    // flex: 1,
    width: 40,
    height: 40,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  settingsImage: {
    width: '100%',
    height: '100%',
  },
  // itemSymbolStyle: {
  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
  //   fontSize: 17,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
  input: {
    // alignItems: 'center',
    fontSize: 17,
    // fontWeight: '600',
    color: colors.white, // '#5a52a5',

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.17,
    // textAlign: 'left',

    // fontWeight: 'normal',
    // fontStyle: 'normal',

    // letterSpacing: 0.13,

    // borderWidth: 1,
    // borderColor: 'orange',
    // borderStyle: 'solid',
  },
  infoContainer: {
    // position: 'absolute',
    left: 0,
    right: 0,
    // height: '100%', // 200,
    // top: '5%',
    // bottom: '0%', // '5%', // 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'transparent', // '#aa73b7',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  itemStyle: {
    marginBottom: 20,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // backgroundColor: colors.dark,
  },
  iconStyle: {
    // flex: 0.1,
    // alignItems: 'center',
    // justifyContent: 'center',
    color: colors.white, // '#5a52a5',
    fontSize: 17,
    marginLeft: 25,
    marginRight: 10,
    // marginTop: 2,
    // borderWidth: 1,
    // borderColor: 'pink',
    // borderStyle: 'solid',
  },
  buttonStyle: {
    backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
    padding: 14,
    marginBottom: 20,
    borderRadius: 27, // 24,

    minWidth: '80%',

    // borderWidth: 1,
    // borderColor: colors.white,
    // borderStyle: 'solid',
  },
  // buttonStyleEnabled: {
  //   alignItems: 'center',
  //   backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
  //   padding: 14,
  //   marginBottom: 20,
  //   borderRadius: 26, // 24,

  //   // borderWidth: 1,
  //   // borderColor: colors.white,
  //   // borderStyle: 'solid',
  // },
  // buttonStyleDisabled: {
  //   alignItems: 'center',
  //   backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
  //   padding: 14,
  //   marginBottom: 20,
  //   borderRadius: 26, // 24,
  //   opacity: 0.4,

  //   // borderWidth: 1,
  //   // borderColor: colors.white,
  //   // borderStyle: 'solid',
  // },
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    // fontSize: 17,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
    fontWeight: '600',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.13,
    textAlign: 'center',
  },
  listItemTitleStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    // paddingLeft: 5,

    padding: 5,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  innerSlide: {
    justifyContent: 'flex-end',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // lineHeight: 28,
    // lineHeight: 26,
    // letterSpacing: 0.13,
    // textAlign: 'center',

    fontSize: 17,
    color: colors.white, // '#ffffff',

    padding: 5,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  // pillItemText: {
  //   paddingHorizontal: 12,

  //   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
  //   fontWeight: 'normal',
  //   fontStyle: 'normal',
  //   // lineHeight: 28,
  //   // lineHeight: 26,
  //   letterSpacing: 0.12,
  //   // textAlign: 'center',

  //   fontSize: 17,
  //   color: colors.white, // '#ffffff',

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  calendarTextStyle: {
    // fontWeight: '600',
    // color: colors.white, // '#fff',
    // // opacity: 0.6,
    // fontSize: 17,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    // lineHeight: 28,
    // lineHeight: 24,
    letterSpacing: 0.13,
    // textAlign: 'center',

    // fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 15,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',

  },
  payeeInputText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 15,
    color: colors.white,
  },
  slideView: {
    // flex: 1,
    width: '100%',
    // height: '100%',
    // backgroundColor: colors.darkTwo,

    // justifyContent: 'center',
    // alignItems: 'center',

    // position: 'absolute',

    // top: '10%',

    // borderWidth: 1,
    // borderColor: 'blue',
    // borderStyle: 'dashed',

    // shadowColor: '#0a101b',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowRadius: 26,
    // shadowOpacity: 1,
  },
  slideUpTransactionRect: {
    // flex: 1,
    // height: '100%',
    height: 250,
    // width: 'auto',
    // width: 1000,

    // alignItems: 'center',

    // alignSelf: 'center',

    // borderRadius: 9,

    // borderTopWidth: 1,
    // borderTopColor: colors.dark,
    // borderTopColor: 'transparent',

    // borderLeftWidth: 1,
    // borderLeftColor: colors.dark,
    // // borderLeftColor: 'transparent',

    // borderRightWidth: 1,
    // borderRightColor: colors.dark,
    // borderRightColor: 'transparent',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

    backgroundColor: colors.darkTwo,
    // backgroundColor: 'transparent',

    // shadowColor: '#0a101b',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowRadius: 26,
    // shadowOpacity: 1,
  },
  dateAmountRectangle: {
    // position: 'absolute',

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 346,
    width: '95%',
    height: 74,


    marginBottom: 6,
    marginHorizontal: 6,

    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: Platform.OS === 'android' ? null : '#0f1725',
    shadowOffset: Platform.OS === 'android' ? null : {
      width: 5,
      height: 5,
    },
    shadowRadius: Platform.OS === 'android' ? null : 16,
    shadowOpacity: Platform.OS === 'android' ? null : 1,

    // borderWidth: 2,
    // borderColor: 'white',
    // borderStyle: 'dashed',
    padding: 3,
  },
  helpMessageText: {
    // fontWeight: '600',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    fontSize: 17,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.13,
    textAlign: 'center',
  },
  rowBackLeft: {
    flex: 1,
    backgroundColor: colors.azure,
  },
  rowBackLeftEmpty: {
    flex: 1,
    // backgroundColor: colors.azure,
  },
  rowBackRight: {
    flex: 1,
    backgroundColor: colors.pinkRed,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  rowFront: {
    backgroundColor: colors.darkTwo,
    // backgroundColor: 'transparent',

    // borderWidth: 1,
    // borderColor: 'orange',
    // borderStyle: 'solid',
  },
  swipeDeleteOpacity: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',

    paddingHorizontal: 12,
    // backgroundColor: colors.pinkRed,

    // borderWidth: 1,
    // borderColor: 'pink',
    // borderStyle: 'solid',
  },

  swipeEditOpacity: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',

    paddingHorizontal: 12,
    // backgroundColor: colors.pinkRed,

    // borderWidth: 1,
    // borderColor: 'orange',
    // borderStyle: 'solid',
  },
  tableItemStyle: {
    /* category  table items */
    paddingVertical: 14,
    paddingHorizontal: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  arrow: {
    // table item right side icon
    // flex: 0.05,
    // flexDirection: 'row-reverse',
    alignSelf: 'center',

    // textAlign: 'center',
    // width: 8,
    // height: 13,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 17,
    opacity: 0.5,
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    // paddingRight: 12,

    // backgroundColor: '#ffffff',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  infoBoxStyle: {
    flexDirection: 'row',
    // Offline message box
    alignSelf: 'center',

    justifyContent: 'center',
    alignItems: 'center',

    // padding: 14,
    // marginBottom: 20,
    // minWidth: 346,
    width: '90%',
    // maxWidth: '95%',
    minHeight: 74,

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
    // borderColor: colors.white,
    // borderStyle: 'solid',
  },
  infoBoxGreenTextStyle: {
    // width: 215,
    // alignSelf: 'center',

    // height: 40,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: colors.shamrockGreen,

    paddingHorizontal: 6,
    textAlign: 'center',
  },
  // dateLabelText: {
  //   color: 'red',
  // },
});
