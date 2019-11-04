'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

// ui colors
import colors from '../../colors';

// import global variables
require('../../globals')


class ScrollingPillCategoriesView extends Component {
  render() {
    console.log('Categories Loaded:',this.props.categories.length)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal= {true}
          showsHorizontalScrollIndicator={false}
          // decelerationRate={0}
          // snapToInterval={200} //your element width
          // snapToAlignment={'center'}
          style={styles.scrollView}>

          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[0].name}</Text></TouchableOpacity>
          {/*<View style = { styles.separator }/>*/}
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[1].name}</Text></TouchableOpacity>
          {/*<View style = { styles.separator }/>*/}
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[2].name}</Text></TouchableOpacity>
          {/*<View style = { styles.separator }/>*/}
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[3].name}</Text></TouchableOpacity>
          {/*<View style = { styles.separator }/>*/}
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[4].name}</Text></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

    //position: 'absolute',
    //left: ,//this.state.x,
    top: 462,//global.screenHeight * 0.435, //350,//this.state.y

  },

  scrollView: {
    //backgroundColor: 'pink',
    marginHorizontal: 15,
  },

  pill: {
    height: 32,
    justifyContent: 'center',

    marginHorizontal: 4,
    marginVertical: 10,

    borderRadius: 17,
    borderWidth: 1,
    borderStyle: 'solid',

    borderColor: 'white',
  },

  text:{
    paddingHorizontal: 15,
    fontFamily: "SFProDisplay-Regular",
    fontSize: 17,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.12,

    borderWidth: global.borderWidth,
    color: 'white',

  },

  separator: {
    width: 2,
    marginVertical: 10,
    backgroundColor: 'white'//'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;