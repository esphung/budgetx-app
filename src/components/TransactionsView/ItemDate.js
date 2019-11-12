import React from 'react';
import { View, Text } from 'react-native';

// ui colors
import colors from '../../../colors';

import getShortDate from '../../functions/getShortDate';

const ItemDate = (props) => {
  const { item } = props;

  let { date } = item;
  if (new Date(date).getDate() === (new Date()).getDate()) {
    date = '';
  } else {
    date = getShortDate(date);
  }

  return (
    <View style={{
      flex: 1,

      // flexDirection: 'row',

      justifyContent: 'center',

      // alignItems: 'center',

      // width: '100%',

      // paddingHorizontal: 4,

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
    }}
    >

      <Text style={
        {
          // flex: 1,
          // width: 'auto',
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,

          // textAlign: 'right',

          // color: item.category.color,

          color: colors.offWhite,

          // backgroundColor: colors.darkTwo,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dotted',
        }
      }
      >

        {

          date
        }

      </Text>
    </View>
  );
};

export default ItemDate;
