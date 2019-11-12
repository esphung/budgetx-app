import React from 'react';
import { Text, View } from 'react-native';

// ui colors
import colors from '../../colors';

const ItemPayee = (props) => {
  const { item } = props;

  return (
    <View style={{
      flex: 1,

      // flexDirection: 'row',

      justifyContent: 'center',


      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'dotted',
    }}
    >
      <Text style={
        {
          // width: 'auto',
          fontFamily: 'SFProDisplay-Semibold',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,

          // marginHorizontal: 10,
          // paddingRight: 10,

          // color: item.category.color +  '7f',

          color: colors.white,

          // backgroundColor: colors.darkTwo,


        }
      }
      >

        { item.payee.name }

      </Text>
    </View>
  );
};

export default ItemPayee;
