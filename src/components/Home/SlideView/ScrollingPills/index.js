/*
FILENAME:  ScrollingPillCategoriesView.js
PURPOSE:   Scrolling Pills
AUTHOR:    Eric Phung
CREATED:   03/11/2019 10:43 PM
*/

import React from 'react';

import {
  ScrollView,
  View,
  FlatList,
} from 'react-native';

import CategoryPill from './CategoryPill';

import styles from 'styles/ScrollingPills';

const ScrollingPillCategoriesView = ({
  categoryBtnPressed,
  currentCategories,
  currentCategory,
  // isCurrentCategory,

  updateTransactionCategory,
}) => {
  const getCategoryPill = ({ item }) => {
    // console.log('item: ', item);
    // const onPress = (item) => {
    //   console.log('item: ', item);
    // }
    const view = (
      <CategoryPill
        item={item}
        id={item.id}
        name={item.name}
        color={item.color}
        textColor={item.color}
        key={item.id}
        categoryBtnPressed={categoryBtnPressed}
        // updateTransactionCategory={updateTransactionCategory}
        currentCategory={currentCategory}
        // isCurrentCategory={isCurrentCategory}
        isEnabled
      />
    );
    return view;
  };
  const view = (
      <FlatList
        data={currentCategories}
        renderItem={getCategoryPill}
        contentContainerStyle={styles.scrollingPills}
        horizontal
        showsHorizontalScrollIndicator={false}
        currentCategory={currentCategory}
      />
  );
  return view;
};

export default ScrollingPillCategoriesView;
