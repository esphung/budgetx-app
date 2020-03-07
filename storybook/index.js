// import { AppRegistry } from 'react-native';
// import { AsyncStorage } from 'react-native'; // testing
import { getStorybookUI, configure } from '@storybook/react-native';

// import './rn-addons';

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
// const StorybookUIRoot = getStorybookUI({});
const StorybookUIRoot = getStorybookUI({
  // asyncStorage: AsyncStorage, // testing
  port: 7007,
  host: "0.0.0.0",
  onDeviceUI: true, // showing tab menu
  resetStorybook: false,
  disableWebsockets: false
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
// AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
