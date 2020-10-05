/*
FILENAME:   App.js
PURPOSE:    Entry point for budget x app
AUTHOR:     Eric Phung
CREATED:    Fri Nov 1 2019
*/
import './globals'; // global values

import React, { useState } from 'react';

import { useFonts } from 'expo-font';

import { NetworkProvider } from 'react-native-offline';

import { Image } from 'react-native';

import { AppLoading } from 'expo';

import { Asset } from 'expo-asset';

import FlashMessage from 'react-native-flash-message';

import { NavigationContainer } from '@react-navigation/native';

import SwitchNavigator from 'navigators/SwitchNavigator';

const cacheImages = (images) => {
  const cache = images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
  return cache;
};

export default function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  let view = (
    <NetworkProvider>
      <NavigationContainer>
        <SwitchNavigator />
        {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
        <FlashMessage position="top" />
      </NavigationContainer>
    </NetworkProvider>
  );
  // Load Fonts
  const [fontsLoaded] = useFonts({
    'SFProDisplay-Regular': global.SFProDisplayRegularFont,
    'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont,
  });

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      global.settingsIcon,
      global.xIconWhite,
      global.walletIcon,
      global.avatar,
      global.defaultAvatar,
      global.appIcon,
      global.bankImageGreen,
    ]);
    await Promise.all([...imageAssets]);
  };
  if (!fontsLoaded || !imagesLoaded) {
    view = (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setImagesLoaded(true)}
        // onError={console.warn}
      />
    );
  }
  return view;
}
