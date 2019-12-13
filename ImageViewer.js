import React from 'react';
import { Image, Button, Text, View } from 'react-native';
import { NetworkConsumer } from 'react-native-offline';

const ImageViewer = (props) => {

  const downloadImage = () => {
    // return global.walletFilledMoneyToolIcon;
  }

  console.log(props)

  return (
    <View>
      <Image source={global.avatar} />
      <NetworkConsumer>
        {({ isConnected }) => (
          isConnected ? (
            <Button title="Download image" onPress={downloadImage} />
          ) : (
            <Text>Downloading images is disabled since you are offline</Text>
          )
        )}
      </NetworkConsumer>
    </View>
  )
};

export default ImageViewer;