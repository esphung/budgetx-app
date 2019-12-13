import React from 'react';

import { NetworkProvider } from 'react-native-offline';

import SwitchNavigator from './SwitchNavigator';

import ImageViewer from  './ImageViewer';

const Root = () => (
  <NetworkProvider>
    <ImageViewer />
  </NetworkProvider>
);

export default Root;