import {
  StyleSheet,
} from 'react-native';

import colors from 'main/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    backgroundColor: colors.darkTwo, // '#aa73b7',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    alignItems: 'center',
    fontSize: 17,
    // fontWeight: 'bold',
    color: colors.white, // '#5a52a5',

    fontFamily: 'SFProDisplay-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'left',


    // borderWidth: 1,
    // borderColor: 'orange',
    // borderStyle: 'solid',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%', // 200,
    top: '5%',
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
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
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
    alignItems: 'center',
    backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
    padding: 14,
    marginBottom: 20,
    borderRadius: 26, // 24,

    borderWidth: 1,
    borderColor: colors.white,
    borderStyle: 'solid',    
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
    // fontSize: 18,
    // fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    fontSize: 17,

    fontFamily: 'SFProDisplay-Semibold',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'center',
  },
  textStyle: {
    // fontSize: 18,
    // fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    fontSize: 15,

    fontFamily: 'SFProDisplay-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'left',
  },
  logoContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});
