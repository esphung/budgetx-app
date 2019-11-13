import React from 'react';
import { View, Text } from 'react-native';

// ui colors
import colors from '../../../colors';

import getShortDate from '../../functions/getShortDate';

const ItemDate = (props) => {
  const { item } = props;

  return (
    <View style={{
      flex: 0.5,

      // flexDirection: 'row',

      justifyContent: 'center',

      // alignItems: 'center',

      // width: '100%',

      // marginRight: 1,

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

          textAlign: 'right',

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

          getShortDate(item.date)
        }

      </Text>
    </View>
  );
};

export default ItemDate;