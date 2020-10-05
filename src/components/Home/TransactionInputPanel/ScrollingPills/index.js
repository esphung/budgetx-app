/*
FILENAME:  ScrollingPillCategoriesView.js
PURPOSE:   Scrolling Pills
AUTHOR:    Eric Phung
CREATED:   03/11/2019 10:43 PM
*/

import React from 'react';

import {
  FlatList,
  View,
} from 'react-native';

import CategoryPill from './CategoryPill';

import styles from 'styles/ScrollingPills';

const ScrollingPillCategoriesView = ({
  categoryBtnPressed,
  categories,
  currentCategory,
  isCurrentCategory,
  shouldRefresh,
}) => {
  const GetCategoryPill = ({ rowData }) => {
    const { item } = rowData;
    // console.log('item: ', item);
    // const onPress = (item) => {
    //   console.log('item: ', item);
    // }
    const view =  (
      <CategoryPill
        item={item}
        id={item.id}
        name={item.name}
        color={item.color}
        textColor={item.color}
        key={item.id}
        categoryBtnPressed={categoryBtnPressed}
        currentCategory={currentCategory}
        isCurrentCategory={isCurrentCategory}
        isEnabled
      />
    );
    return view;
  };
  const view = (
    <View style={styles.scrollingPillsContainer}>
      <FlatList
        data={categories}
        shouldRefresh={shouldRefresh}
        contentContainerStyle={styles.scrollingPills}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(category) => {
          return <GetCategoryPill rowData={category} />
        }}
      >
      
      </FlatList>
    </View>
  );
  return view;
};

export default ScrollingPillCategoriesView;
