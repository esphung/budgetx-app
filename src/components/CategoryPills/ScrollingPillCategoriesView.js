// FILENAME:  ScrollingPillCategoriesView.js
// PURPOSE:   Scrolling Pills
// AUTHOR:    Eric Phung
// CREATED:   03/11/2019 10:43 PM
// UPDATED:   08/11/2019 03:00 AM
//            11/12/2019 09:12 PM
import React, { Component } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

// ui colors
import colors from '../../../colors';

import CategoryPill from './CategoryPill';

import {
  loadCategories,
  // saveCategories
} from '../../storage/CategoriesStorage';

// const MIN_PILL_WIDTH = 73;

class ScrollingPillCategoriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };

    // this.categoryBtnPressed = this.categoryBtnPressed.bind(this);
  }

  async componentDidMount() {
    // load default settings
    const storage = await loadCategories();
    const { categories } = storage;
    await this.setState({ categories });
    // console.log('State Categories Set:', categories.length);
  }

  getCategoryPill(items) {
    const { isEnabled } = this.props;
    // console.log(isEnabled)
    let view = <View />;
    if (items) {
      view = items.map((item) => (
        <CategoryPill
          item={item}
          id={item.id}
          name={item.name}
          color={item.color}
          textColor={item.color}
          key={item.id}
          onPress={() => this.categoryBtnPressed(item)}
          isSelected={this.isCurrentCategory(item)}
          isEnabled={isEnabled}
        />
      ));
    }
    return view;
  }

  isCurrentCategory(category) {
    const { currentCategory } = this.props;
    if (!currentCategory) {
      return false;
    }
    if (currentCategory === category) {
      return true;
    }
    return false;
  }

  categoryBtnPressed(item) {
    const { onPress } = this.props;
    onPress(item);
  }

  render() {
    const { categories } = this.state;
    const {
      isEnabled,
      topPosition,
      shadowOffset,
      shadowRadius,
      shadowOpacity,
      zIndex
    } = this.props;
    // console.log(categories)
    return (
      <SafeAreaView style={
        {
          width: '100%',
          height: '6%', // 53,

          backgroundColor: colors.darkTwo,

          shadowColor: '#0a101b',

          shadowOffset: shadowOffset,
          // shadowOffset: {
          //   width: 1,
          //   height: 1
          // },
          shadowRadius: shadowRadius,
          shadowOpacity: shadowOpacity,

          position: 'absolute',

          top: topPosition, // '57%', // 462,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dashed',

          zIndex: zIndex, // display ontop of datepickerbox
        }
      }
      >
        <ScrollView
          scrollEnabled={isEnabled}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          // snapToInterval={MIN_PILL_WIDTH} // your element width
          snapToAlignment="center"

          style={styles.scrollView}
        >
          { this.getCategoryPill(categories) }

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%', // 53,
    backgroundColor: colors.darkTwo,
    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    position: 'absolute',
    top: '57%', // '57%', // 462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  separator: {
    width: 2,
    marginVertical: 10,
    backgroundColor: 'white' // 'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;
