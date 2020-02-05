import colors from '../../colors';

export default function getButtonStyle(bool) {
  // console.log(bool);
  if (bool === true) {
    return {
      alignItems: 'center',
      backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
      padding: 14,
      marginBottom: 20,
      borderRadius: 26, // 24,

      // borderWidth: 1,
      // borderColor: colors.white,
      // borderStyle: 'solid',   
    }
  }
  else if (bool === false) {
    return {
      alignItems: 'center',
      backgroundColor: colors.dark, // backgroundColor: colors.offWhite, // '#667292',
      padding: 14,
      marginBottom: 20,
      borderRadius: 26, // 24,
      opacity: 0.4,

      // borderWidth: 1,
      // borderColor: colors.white,
      // borderStyle: 'solid',   
    }
  }
}