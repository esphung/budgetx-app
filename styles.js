import {
  StyleSheet,
  Platform,
} from 'react-native';

import colors from './colors';

// fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    

    // backgroundColor: colors.darkTwo, // '#aa73b7',
    // flexDirection: 'column',
    // marginTop: 15, // '5%',
    // marginBottom: 5,
  },

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',

  //   // backgroundColor: colors.darkTwo, // '#aa73b7',
  //   // flexDirection: 'column',
  //   // marginTop: 15, // '5%',
  //   // marginBottom: 5,
  // },
  settingsBtnTouchableOpacityMask: {
    // flex: 1,
    width: 35,
    height: 35,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  settingsImage: {
    width: '100%',
    height: '100%'
  },

  itemSymbolStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
  },
  input: {
    alignItems: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: colors.white, // '#5a52a5',

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    // fontWeight: 'normal',
    fontStyle: 'normal',
    // letterSpacing: 0.17,
    textAlign: 'left',

    letterSpacing: 0.13,

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
    color: colors.white, // '#5a52a5',
    fontSize: 17,
    marginLeft: 15,

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
  emptyMessageTextStyle: {
    // width: 225,
    // height: 84,
    opacity: 0.6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.13,
    textAlign: 'center',
    color: colors.offWhite,
  },

  buttonText: {
    // fontSize: 18,
    fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    fontSize: 17,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
    fontWeight: '600',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.13,
    textAlign: 'center',
  },
  listItemTitleStyle: {
    // flex: 1,
    // width: 67,
    // height: 20,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    // paddingLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  innerSlide: {
    // padding: 24,
    // flex: 1,
    justifyContent: 'flex-end',
    
  },
  textStyle: {
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

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

  },
  payeeInputText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    fontSize: 15,
    // fontStyle: 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',

    letterSpacing: 0.13,

    // color: 'pink',

    // color: item.category.color +  '7f',
    // color: colors.white,
    // backgroundColor: colors.darkTwo,

    // textAlignVertical: 'center',

  },
  slideView: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // backgroundColor: colors.darkTwo,

    // position: 'absolute',

    // top: '10%',

    // borderWidth: 2,
    // borderColor: 'blue',
    // borderStyle: 'dashed',



    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 26,
    shadowOpacity: 1,
  },
  slideUpTransactionRect: {
    // height: '100%',
    height: 210,
    width: 'auto',

    alignItems: 'center',

    borderRadius: 9,



    // borderWidth: 3,
    // borderColor: 'white',
    // borderStyle: 'dashed',

    backgroundColor: colors.darkTwo,
    // backgroundColor: 'blue',

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
    
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 346,
    height: 74,

    marginBottom: 6,

    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: '#0f1725',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 16,
    shadowOpacity: 1,

    // borderWidth: 2,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  helpMessageText: {
    fontWeight: '600',
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
});
