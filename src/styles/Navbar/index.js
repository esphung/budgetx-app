import { StyleSheet, Dimensions, Platform } from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  navbar: {
    height: screen.height * 0.07, // 60,
    marginTop: Platform.OS === 'android' ? 0 : 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    // alignItems: 'flex-end',
    // alignItems: 'center',
    // justifyContent: 'flex-start',

    // backgroundColor:  'steelblue',

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  headerLeftView: {
    // maxHeight: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 10,
    // paddingLeft: 4,

    // borderWidth: 1,
    // borderColor: 'blue',
    // borderStyle: 'solid',
  },
  imageViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    // marginTop: 20,
    // marginLeft: 15,
    // width: '100%',
    // height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  userImageMaskView: {
    width: (screen.width) / (8),
    maxHeight: 50,
    padding: 10,

    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: colors.white,
    // borderStyle: 'solid',
  },
  userImage: {
    // width: '100%',
    // height: '100%',
    width: 33,
    height: 33,
    // backgroundColor: colors.darkGreyBlue,
    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: colors.white,
    // borderStyle: 'solid',

    // width: 27,// if user image available???
    // height: 27,// if user image available???
    // opacity: 0.2, // if no image available
    backgroundColor: 'transparent',
  },
  // textStyle: {
  //   fontFamily: 'SFProDisplay-Regular',
  //   // fontWeight: 'normal',
  //   // fontStyle: 'normal',
  //   // lineHeight: 28,
  //   // lineHeight: 26,
  //   // letterSpacing: 0.13,
  //   // textAlign: 'center',

  //   fontSize: 17,
  //   color: 'salmon', // colors.white, // '#ffffff',
  //   padding: 5,

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  labelsContainer: {
    maxHeight: 50,
    justifyContent: 'center',
    padding: 2,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  boldMessage: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 15,
    color: colors.white,
  },
  normalMessage: {
    width: (screen.width) / (1.4),
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 15,
    color: colors.white,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  headerRightView: {
    // flex: 0.5,
    // height: 50,
    // maxHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // justifyContent: 'flex-end',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  settingsIcon: {
    // flex: 1,
    width: (screen.width) / (8),

    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});
