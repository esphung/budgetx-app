import React, { Component } from 'react';

import StackNavigator from './StackNavigator'

class Router extends Component {
  render() {
    console.log('Rendered Router')
    return (
      <StackNavigator />
    );
  }
}

// RootStack defined here 
export default Router;