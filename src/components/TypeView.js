// FILENAME:  TypesView.js
// PURPOSE:   Prompt view for transaction type input
// AUTHOR:    Eric Phung
// CREATED:   date
import React from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

import colors from '../../colors'; // ui colors

import TypePill from './TypePill';

const types = [
  {
    id: 0,
    name: 'income',
    color: colors.offWhite,
  },
  {
    id: 1,
    name: 'expense',
    color: colors.offWhite,
  }
];

export default function PayeePill(props) {
  const {
    incomeBtnPressed,
    expenseBtnPressed,
    currentType,
    //isCurrentType
  } = props;

  // console.log(incomeBtnPressed)

  typeBtnPressed = (type) => {
    const { onPress } = props;
    onPress(type);
  }

  isCurrentType = (type) => {
    const { currentType } = props;
    if (!currentType) {
      return false;
    }
    if (currentType === type) {
      return true;
    }
    return false;
  }

  getTypePill = (items, index) => {
    let view = <View />;

    if (items) {
      view = items.map((item) => (
        <TypePill
        key={item.id}
        // item={item}
        color={item.color}
        name={item.name}
        onPress={() => this.typeBtnPressed(item)}
        isSelected={this.isCurrentType(item.name)}
        />
      ))
    }

    return view;
  }

  // isCurrentType = (type) => {
  //   //const { currentType } = this.props;
  //   if (!currentType) {
  //     return false;
  //   }
  //   if (currentType === type) {
  //     return true;
  //   }
  //   return false;
  // }


  return (
    <SafeAreaView style={styles.container}>
       <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        // snapToInterval={MIN_PILL_WIDTH}
        snapToAlignment="center"

        style={styles.scrollView}
      >
        {
          this.getTypePill(types)
        }

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
    top: '51%', // '57%', // 462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});
