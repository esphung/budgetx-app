import React from 'react';
import {
  Image,
  View,
} from 'react-native';

const ImageViewer = () => {
  const downloadImage = () => {
    const image = global.avatar;

    // do stuff online
    return image;
  };

  // console.log(props);

  return (
    <View>
      <Image source={downloadImage} />
    </View>
  );
};

export default ImageViewer;
