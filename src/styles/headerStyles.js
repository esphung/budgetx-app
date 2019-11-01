import { StyleSheet } from 'react-native'

// import global variables
require('../../globals')

const headerStyles = StyleSheet.create({
  userImageTouchableOpacity: {
    width: 27,
    height: 27,
    opacity: 0.2,
    borderWidth:  global.borderWidth,
}
});

export default headerStyles