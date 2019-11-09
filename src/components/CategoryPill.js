import React from 'react';

import {
  TouchableOpacity,
  Text
} from 'react-native';

// arbitrary size limits
const MAX_PILL_WIDTH = 156;
const MIN_PILL_WIDTH = 73;
const MAX_PILL_HEIGHT = 32;


export default function CategoryPill(props) {
  const {
    // item,
    // id,
    color,
    name,
    textColor,
    // onPress
    isSelected
  } = props;
  // console.log(id)

  this.textColor = color

  this.backgroundColor = 'transparent';

  if (isSelected) {
    this.textColor = 'white';
    this.backgroundColor = color;
  }

  function onPress(){
    const { onPress } = props;

    onPress();
  }

  return (
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

          borderColor: color,

          backgroundColor: this.backgroundColor,
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

          color: this.textColor,
        }
      }
      >

        {name}
      </Text>
    </TouchableOpacity>
  );
}
