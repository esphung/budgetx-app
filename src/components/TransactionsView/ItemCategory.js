import React from 'react';
import { Text, View } from 'react-native';

const ItemCategory = (props) => {
  const { item, isCurrentTransaction } = props;

  let textColor = '#ffffff7f';

  if (isCurrentTransaction) {
    textColor = item.category.color;
  }
  return (
    <View style={{
      flex: 1,

      // alignItems: 'flex-start',

      justifyContent: 'flex-start',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
    }}
    >
      <Text style={
        {
          // width: 'auto',
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,

          // marginLeft: 10,

          color: textColor, // 'rgba(255, 255, 255, 0.5)',

          // backgroundColor: colors.darkTwo,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'dotted',
        }
      }
      >

        { 
          item.category.name//.replace(/^(.{1}[^\s]*).*/, '$1')
        }

      </Text>
    </View>
  );
};

export default ItemCategory;
