import React from 'react';
import { Text } from 'react-native';

// ui colors
import colors from '../../colors';

const ItemPayee = (props) => {
  const { item } = props;
  return (
    <Text style={
      {
        flex: 0.5,
        // width: 'auto',
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,

        // marginHorizontal: 10,
        paddingRight: 10,

        textAlign: 'right',

        // color: item.category.color +  '7f',

        color: colors.white,

        // backgroundColor: colors.darkTwo,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dotted',
      }
    }
    >

      {item.payee.name}

    </Text>
  );
};

export default ItemPayee;
