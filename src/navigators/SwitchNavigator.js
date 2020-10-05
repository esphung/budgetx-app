/*
FILENAME:  SwitchNavigator.js
PURPOSE:   SwitchNavigator for budget x app
AUTHOR:    Eric Phung
CREATED:   12/09/2019 01:12 PM
UPDATED:   03/03/2020 01:33 PM | Login moved to settings page
*/

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import AppStackNavigator from './AppStackNavigator';

const SwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStackNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
