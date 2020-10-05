import { StyleSheet, Dimensions } from 'react-native';

// import Constants from 'expo-constants';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    // flex: 1,

    // height: 1000,

    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: 100,

    // borderWidth: 2,
    // borderColor: 'white',
    // borderStyle: 'dashed',

    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,


    backgroundColor: colors.darkTwo,
    // backgroundColor: 'darkseagreen',
  },
  gestureContainer: {
    // backgroundColor: 'red',
    // height: screen.height / 2, // 820, // screen.height,
  },
  slideView: {
    // borderTopRightRadius: 12,
    // borderTopLeftRadius: 12,

    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // // // top: screen.height * 0.7,
    // // height: screen.height,
    // // flex: 1,

    // shadowColor: '#0a101b',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowRadius: 26,
    // shadowOpacity: 1,







    // backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',

    backgroundColor: 'transparent',
    // backgroundColor: 'salmon',
  },
  slideViewShadows: {
    // shadowColor: '#0a101b',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowRadius: 26,
    // shadowOpacity: 1,
  },
  centerView: {
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  card: {
    // paddingTop: 12,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  /* Date Label */
  dateAmountRectangle: {
    alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    width: screen.width, // 346,
    maxWidth: '90%',
    height: 74,

    // marginVertical: 6,
    // marginHorizontal: 6,

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
    // padding: 3,
  },
  dateLabel: {
    height: screen.height / 10,
    // justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  dateLabelText: {
    paddingTop: 14,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.tangerine,
  },
  /* Amount lLabel */
  itemAmountRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  itemAmountText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 23,
    color: colors.white,
    textAlign: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  calendarPicker: {
    // borderWidth: 1,
    // height: 300,
    backgroundColor: 'lightblue',
  },
  scrollingPillsFlatlist: {
    // borderWidth: 1,
    height: screen.height / 12, // 60,
    // backgroundColor: 'skyblue',
  },
  amountInput: {
    // borderWidth: 1,
    height: screen.height / 12, // 60,
    // backgroundColor: 'darkseagreen',
  },
  noteTextInput: {
    // borderWidth: 1,
    // height: screen.height / 12, // 60,
    // backgroundColor: colors.dark, // 'steelblue',
    // backgroundColor: colors.darkTwo,

    // paddingLeft: 12,

    height: screen.height / 12, // 50,
    alignSelf: 'center',

    width: screen.width,

    justifyContent: 'center',

    padding: 6,

    borderTopWidth: 1,

    borderTopColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  noteTextInputText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    color: colors.white, // '#ffffff',
    padding: 5,
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  southPanel: {
    height: screen.height / 3,
    // backgroundColor: 'salmon',
  },
});
