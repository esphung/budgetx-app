import React from 'react';
import { Text } from 'react-native';

const ItemCategory = (props) => {
  const { item } = props;
  return (
    <Text style={
      {
        flex: 1,

        // width: 'auto',
        fontFamily: 'SFProDisplay-Regular',
        fontSize: 17,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.13,

        paddingHorizontal: 10,

        color: '#ffffff7f', // 'rgba(255, 255, 255, 0.5)',

        // backgroundColor: colors.darkTwo,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dotted',
      }
    }
    >

      { item.category.name }

    </Text>
  );
};

export default ItemCategory;
