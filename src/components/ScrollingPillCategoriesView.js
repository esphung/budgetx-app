// FILENAME:  ScrollingPillCategoriesView.js
// PURPOSE:   Scrolling Pills
// AUTHOR:    Eric Phung
// CREATED:   03/11/2019 10:43 PM
import React, { Component } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

// ui colors
import colors from '../../colors';

// default user categories
import categories from '../data/categories';

// arbitrary size limits
const pillMaxWidth = 156;
const pillMinWidth = 73;

class ScrollingPillCategoriesView extends Component {
  categoryBtnPressed(item) {
    this.props.onPress(item)
  }

  getListItems = (items) => {
    return categories.map((item, index) => (
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

        onPress={() => this.categoryBtnPressed(item)}>

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
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6.5%',//53,
    backgroundColor: colors.darkTwo,
    shadowColor: "#0a101b",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    position: 'absolute',
    top: '57%',//462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',

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