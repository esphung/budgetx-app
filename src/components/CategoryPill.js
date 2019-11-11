import React from 'react';

import {
  TouchableOpacity,
  Text
} from 'react-native';

// arbitrary size limits
const MAX_PILL_WIDTH = 156;
const MIN_PILL_WIDTH = 73;
// const MAX_PILL_HEIGHT = 32;


export default function CategoryPill(props) {
  const {
    color,
    name,
    isSelected,
    onPress,
  } = props;

  // let { isEnabled } = props;

  let textColor = color;

  let backgroundColor = 'transparent';

  if (isSelected) {
    textColor = 'white';
    backgroundColor = color;
    // isEnabled = !isEnabled;
  }

  return (
    <TouchableOpacity
      // disabled={isEnabled}
      style={
        {
          // maxHeight: MAX_PILL_HEIGHT,
          minWidth: MIN_PILL_WIDTH,
          maxWidth: MAX_PILL_WIDTH,

          height: '60%', // 37,

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

      // key={id}

      onPress={onPress}
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

          color: textColor,
        }
      }
      >

        { name }
      </Text>
    </TouchableOpacity>
  );
}
