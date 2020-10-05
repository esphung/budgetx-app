/*
FILENAME:     ImageController.js
PURPOSE:      ImageController for handling profile images
AUTHOR:       Eric Phung
CREATED:      09/03/2020 02:43 AM
*/
import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    // handleImagePicked(result);
    return result;
  }
  return null;
};


// export const getPermissionAsync = async () => {
//   if (Constants.platform.ios) {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status !== 'granted') {
//       setIsPermissionDialogVisible(true);
//     } else {
//       const result = await pickImage();
//       handleImagePicked(result);
//     }
//   }
// };

export const getPermissionAsync = async () => {
  
  // if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== 'granted') {
    //   // setIsPermissionDialogVisible(true);
    //   // return status;
    // }
    // else {
    //   // result = await pickImage();
    //   // handleImagePicked(result);
    //   // result = 'denied';
    // }
    return status;
  // }
  
};
