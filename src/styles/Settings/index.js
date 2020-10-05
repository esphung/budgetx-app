import {
  StyleSheet,
  // Platform,
  Dimensions,
} from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  // Settings Screen
  container: {
    flex: 1,
  },

  topPanel: {
    flex: 0.3,
  },

  rectangle5: {
    flex: 0.05,
  },

  userOptionsPanel: {
    flex: 0.5,
    alignItems: 'center',
  },
  creditsView: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 4,
  },
  creditsText: {
    opacity: 0.5,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 17,
    textAlign: 'center',
    color: colors.offWhite,
  },
   footer: {
    flex: 1,
  },
  subPanel:  {
    flex: 1,
    padding: 6,
  },
  resetDataDialogBox: {
    // flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 25,

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  subscriptionPanel: {
    flex: 0.3,
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  subscriptionRect: {
    flex: 1,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    // paddingLeft: 4,
    // paddingHorizontal: 4,

    alignItems: 'center',

    borderRadius: 9,
    backgroundColor: colors.dark,
    shadowColor: '#0f1725',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    width: screen.width * 0.95,
    height: screen.height / 12,
    maxWidth: screen.width * 0.9,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  subscriptionRectRowView: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    alignItems: 'center',
    flex: 1,
    // padding: 20,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  bankIcon: {
    flexDirection: 'row',
    // marginLeft: 14,
  },
  toggleSwitchOrIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  subscriptionRectGreenText: {

    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 17,
    color: colors.shamrockGreen,
    // textAlign: 'center',
    // paddingHorizontal: 6,
    padding: 5,
  },

  textStyle: {
    fontFamily: 'SFProDisplay-Regular',
    // fontWeight: 'bold',
    // fontStyle: 'normal',
    // lineHeight: 28,
    // lineHeight: 26,
    // letterSpacing: 0.13,
    // textAlign: 'center',

    fontSize: 17,
    // padding: 5,
    color: colors.white, // '#ffffff',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  dialogContainer: {
    // backgroundColor: 'transparent',
  },
  dialogTitleText: {
    fontFamily: 'SFProDisplay-Regular',
    // fontWeight: 'bold',
    fontSize: 17,
  },
  // RESET DIALOG BOX
  dialogDescriptionText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    // padding: 5,
    color: colors.white, // colors.text, // '#ffffff',
  },
  dialogInputStyle: {
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.white,
    borderStyle: 'solid',
    borderRadius: 19,

    color: colors.white,
  },
  buttonText: {
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.white, // colors.pinkRed,
  },
});
