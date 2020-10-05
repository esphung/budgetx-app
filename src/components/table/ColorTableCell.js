import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from 'src/colors';

import styles from '../../../styles';

import capitalizeFLetter from 'functions/capitalizeFLetter';

// arbitrary size limits
const MAX_PILL_WIDTH = 176;
const MIN_PILL_WIDTH = 54;
const MAX_PILL_HEIGHT = 50;

export default function ColorTableCell({ currentColor, item, onPress, name, color, opacity }) {
  // console.log('item: ', item);
  /* remove colors that are too dark or dont work with the UI */
  if (
    name.toLowerCase() === 'darkgreyblue' ||
    name.toLowerCase() === 'dark' ||
    name.toLowerCase() === 'offwhite' ||
    name.toLowerCase() === 'black' ||
    name.toLowerCase() === 'darktwo' ||
    name.toLowerCase() === 'white'
  ) {
    return null;
  }
  /* Clean up diplayed title */
  let title = capitalizeFLetter(name);
  title = title.split(' ')

  let suffix = ''
  if (title[1]) {
    // title = title[0] + ' ' + title[1]
    title[1] = capitalizeFLetter(title[1]);
  }

  title = title[0] + ' ' + title[1];
  title = title.replace(' undefined', '');

  /* Scrolling color pills */
  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 2,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={(Object.keys(colors).includes(name) !== true && !global.authenticated)}
        style={
          [
            {
              maxHeight: MAX_PILL_HEIGHT,
              minWidth: MIN_PILL_WIDTH,
              maxWidth: MAX_PILL_WIDTH + 50,
              height: '60%', // 37,
              maxHeight: 50,

              marginHorizontal: 4,
              marginVertical: 11,
              paddingHorizontal: 10,
              // paddingTop: 1,
              borderRadius: 17,
              borderWidth: 1,
              borderColor: color,
              backgroundColor: currentColor === color ? currentColor : 'transparent',
              opacity: (Object.keys(colors).includes(name) || global.authenticated) ? 1.0 : 0.4,
              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          ]
        }
      >

     <Text style={[
        styles.listItemTitleStyle,
          {
            // textAlignVertical: 'center', 
          // color: currentColor === color ? colors.offWhite : colors.white,
          color: currentColor === color ? colors.offWhite : color,
          
        }
        ]}
      >
      {   
       title
      }
      <Text style={[
          styles.listItemTitleStyle,
          {
          color: currentColor === color ? colors.white  : colors.offWhite,
          textAlign: 'right',
          // alignItems: 'flex-end',

        }]}>
          {
            ` ${color}`
          }
        </Text>
      </Text>
    </TouchableOpacity>
    </View>
  );
}

