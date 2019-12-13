/*
FILENAME:  SwitchNavigator.js
PURPOSE:   SwitchNavigator for budget x app
AUTHOR:    Eric Phung
CREATED:   12/09/2019 01:12 PM
UPDATED:
*/

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

import AuthStackNavigator from './AuthStackNavigator';

import AppStackNavigator from './AppStackNavigator';

import Offline from './src/components/Offline';


const SwitchNavigator = createSwitchNavigator({
  // screen: name
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator, // Auth stack
  App: AppStackNavigator, // the App stack

  Offline: Offline,
});

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
