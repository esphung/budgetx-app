// FILENAME:  StackNavigator.js
// PURPOSE:   StackNavigator handles navigatoin and navbar header
// AUTHOR:    Eric Phung
// CREATED:   date

'use strict';

import React from 'react'

// app navigation
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

// // header components
// import HeaderLeftView from './src/components/HeaderLeftView'
// import HeaderRightView from './src/components/HeaderRightView'

// global.leftHeaderView = function() {
//   if (data.user.email) {
//     // user has email already
//     return <HeaderLeftView 
//               boldMessage={data.user.name}
//               normalMessage={data.user.email} 
//               isInputEnabled={false}

//           />
//   }
//   else {
//     // unknown user information
//     return <HeaderLeftView 
//               boldMessage={'Get cross-device sync'}
//               normalMessage={'Enter your email'} 
//               isInputEnabled={true}
//               fontsAreLoaded={true}
//           />
//   }

// }

// global.rightHeaderView = function() {
//   return <HeaderRightView />
// }

const StackNavigator = createStackNavigator({
  Home:  {
    screen: Home,
    navigationOptions : ({ navigation }) => {
      return { 
        headerBackTitle: null
      }
    }
  },

  Settings: {
    screen: (Settings),
  },

})

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;








