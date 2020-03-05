import React from 'react';

import {
  // TouchableOpacity,
  Text,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import colors from '../../../colors';

import styles from '../../../styles';

// arbitrary size limits
const MAX_PILL_WIDTH = 176;
const MIN_PILL_WIDTH = 54;
// const MAX_PILL_HEIGHT = 32;


const CategoryPill = (props) => {
  const {
    item,
    color,
    name,
    currentCategory,
    isSelected,
    onPress,
    isEnabled
  } = props;


  let textColor = color;

  let backgroundColor = 'transparent';

  if (isSelected) {
    backgroundColor = color;
    textColor = 'white';
    if (backgroundColor == colors.white) {
      textColor = colors.dark;
    }
    
    // isEnabled = !isEnabled;  // disable current category pill
  }

  const view = (
    <TouchableOpacity
      disabled={!isEnabled}
      style={
        {
          // maxHeight: MAX_PILL_HEIGHT,
          minWidth: MIN_PILL_WIDTH,
          maxWidth: MAX_PILL_WIDTH,

          height: '60%', // 37,
          maxHeight: 37,

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

      onPress={onPress}
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
