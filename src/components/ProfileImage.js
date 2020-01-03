import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import colors from '../../colors';

function ProfileImage(props) {
  const {
    image
  } = props;

  console.log(image)

  return (
    <TouchableOpacity
      disabled
      style={styles.userImageMaskView}
    >
      <Image
        resizeMode="contain"
        style={styles.userImage}
        source={image} // {global.placeholder500x500}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userImageMaskView: {
    flex: 0.1,
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,
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
});


export default ProfileImage;
