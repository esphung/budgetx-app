'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native';

// ui colors
import colors from '../../colors';

// import global variables
require('../../globals')

class ScrollingPillCategoriesView extends Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal= {true}
        // decelerationRate={0}
        // snapToInterval={200} //your element width
        // snapToAlignment={'center'}

        style={styles.scrollView}
      >

        <Text style = { styles.item }>Afghanistan</Text>
        <View style = { styles.separator }/>
        <Text style = { styles.item }>Bangladesh</Text>
        <View style = { styles.separator }/>
        <Text style = { styles.item }>Canada</Text>
        <View style = { styles.separator }/>
        <Text style = { styles.item }>Denmark</Text>
        <View style = { styles.separator }/>
        <Text style = { styles.item }>Egypt</Text>

      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //width: 375,
    width: '100%',
    height: 53,
    backgroundColor: colors.darkTwo,
    shadowColor: "#0a101b",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    borderWidth: global.borderWidth,//1,
    borderColor: 'white',
    borderStyle: 'solid',

    position: 'absolute',
    //left: ,//this.state.x,
    top: global.screenHeight * 0.435, //350,//this.state.y

  },

  scrollView: {
    //backgroundColor: 'pink',
    //marginHorizontal: 20,
  },

  item:{
    padding: 15,
    color: 'black',
    fontSize: 18,

    color: 'white',

  },

  separator: {
    width: global.borderWidth,//2,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;