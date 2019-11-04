// FILENAME:  ScrollingPillCategoriesView.js
// PURPOSE:   Scrolling Pills
// AUTHOR:    Eric Phung
// CREATED:   03/11/2019 10:43 PM

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

// default user categories
import categories from '../../categories'

// size limits
const pillMaxWidth = 156
const pillMinWidth = 73

class ScrollingPillCategoriesView extends Component {
  alertItemName = (item) => {
    alert(item.name)
  }

  getListItems = (items) => {
    if (!items)
      items = categories
    return items.map((item, index) => (
      <TouchableOpacity
        style={
          {
            maxHeight: 32,
            minWidth: pillMinWidth,
            maxWidth: pillMaxWidth,
            alignItems: 'center',
            justifyContent: 'center',

            marginHorizontal: 4,
            marginVertical: 10,

            borderRadius: 17,
            borderWidth: 1,
            borderStyle: 'solid',

            borderColor: item.color,
          }
        }
        
        key = {item.id}

        onPress={() => this.alertItemName(item)}>

        <Text style={
          {
            paddingHorizontal: 12,
            paddingBottom: 1,

            fontFamily: "SFProDisplay-Regular",
            fontSize: 17,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0.12,

            color: item.color,
          }
        }>

          {item.name}
        </Text>
      </TouchableOpacity>
    ))
  }

  render() {
    const categories = this.props.categories
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal= {true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={pillMinWidth} //your element width
          snapToAlignment={'center'}

          style={styles.scrollView}>
          { this.getListItems(categories) }

{/*
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[0].name}</Text></TouchableOpacity>
          <View style = { styles.separator }/>
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[1].name}</Text></TouchableOpacity>
          <View style = { styles.separator }/>
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[2].name}</Text></TouchableOpacity>
          <View style = { styles.separator }/>
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[3].name}</Text></TouchableOpacity>
          <View style = { styles.separator }/>
          <TouchableOpacity style={styles.pill}><Text style = { styles.text }>{this.props.categories[4].name}</Text></TouchableOpacity>
*/}

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
    marginHorizontal: 12,
  },

  separator: {
    width: 2,
    marginVertical: 10,
    backgroundColor: 'white'//'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;