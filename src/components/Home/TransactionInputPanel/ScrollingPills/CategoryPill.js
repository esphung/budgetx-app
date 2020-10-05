import React from 'react';

import {
  // TouchableOpacity,
  Text,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import colors from 'src/colors';

import styles from 'styles/ScrollingPills';

// arbitrary size limits
const MAX_PILL_WIDTH = 176;
const MIN_PILL_WIDTH = 54;
const MAX_PILL_HEIGHT = 32;

const CategoryPill = (props) => {
  const {
    item,
    color,
    name,
    // currentCategory,
    isCurrentCategory,
    categoryBtnPressed,
    isEnabled,
  } = props;

  let textColor = color;

  let backgroundColor = 'transparent';

  if (isCurrentCategory(item)) {
    backgroundColor = color;

    textColor = 'white';

    if (backgroundColor == colors.white) {
      textColor = colors.dark;
    }
  }

  const onPressPill = () => categoryBtnPressed(item);

  const view = (
    <TouchableOpacity
      // disabled={!isEnabled}
      style={
        {
          marginTop: 10,
          maxHeight: MAX_PILL_HEIGHT,
          minWidth: MIN_PILL_WIDTH,
          maxWidth: MAX_PILL_WIDTH,

          height: '80%', // 37,
          // maxHeight: 37,

          alignItems: 'center',
          justifyContent: 'center',

          marginHorizontal: 4,
          // marginVertical: 10,

          borderRadius: 17,
          borderWidth: 1,
          borderStyle: 'solid',

          borderColor: color,
          backgroundColor,
        }
      }

      key={item.id}

      onPress={onPressPill}
    >

      <Text
      style={[
        styles.pillItemText,
        {
          color: textColor,
        }
      ]}
      // style={
      //   {
      //     paddingHorizontal: 12,
      //     paddingBottom: 1,

      //     fontFamily: 'SFProDisplay-Regular',
      //     fontSize: 17,
      //     fontWeight: 'normal',
      //     fontStyle: 'normal',
      //     letterSpacing: 0.12,

      //     color: textColor,
      //   }
      // }
      >

        { name }
      </Text>

      
    </TouchableOpacity>
  );

  return view;
};

export default CategoryPill;
