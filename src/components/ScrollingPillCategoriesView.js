// FILENAME:  ScrollingPillCategoriesView.js
// PURPOSE:   Scrolling Pills
// AUTHOR:    Eric Phung
// CREATED:   03/11/2019 10:43 PM
// UPDATED:   08/11/2019 03:00 AM
import React, { Component } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// ui colors
import colors from '../../colors';

import {
  loadCategories,
  // saveCategories
} from '../storage/CategoriesStorage';

// arbitrary size limits
const MAX_PILL_WIDTH = 156;
const MIN_PILL_WIDTH = 73;
const MAX_PILL_HEIGHT = 32;

class ScrollingPillCategoriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  async componentDidMount() {
    // load default settings
    const storage = await loadCategories();
    const { categories } = storage;
    await this.setState({ categories });
    // console.log('State Categories Set:', categories.length);
  }

  getItemCells(items) {
    let view = <View />;
    if (items) {
      view = items.map((item) => (
        <TouchableOpacity
          style={
            {
              maxHeight: MAX_PILL_HEIGHT,
              minWidth: MIN_PILL_WIDTH,
              maxWidth: MAX_PILL_WIDTH,

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

          key={item.id}

          onPress={() => this.categoryBtnPressed(item)}
        >

          <Text style={
            {
              paddingHorizontal: 12,
              paddingBottom: 1,

              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.12,

              color: item.color,
            }
          }
          >

            {item.name}
          </Text>
        </TouchableOpacity>
      ));
    }
    return view;
  }

  categoryBtnPressed(item) {
    const { onPress } = this.props;
    onPress(item);
  }

  render() {
    const { categories } = this.state;
    // console.log(categories)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={MIN_PILL_WIDTH} // your element width
          snapToAlignment="center"

          style={styles.scrollView}
        >
          { this.getItemCells(categories) }

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6.5%', // 53,
    backgroundColor: colors.darkTwo,
    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    position: 'absolute',
    top: '57%', // 462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  scrollView: {
    marginHorizontal: 12,
  },

  separator: {
    width: 2,
    marginVertical: 10,
    backgroundColor: 'white' // 'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;
