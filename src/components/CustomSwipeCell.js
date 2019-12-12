import React, { Component } from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

class CustomSwipeCell extends Component {
  render() {
    const { onDeleteBtnPress } = this.props;
    const cellView = (

      <TouchableOpacity onPress={onDeleteBtnPress}>
        <Text style={{
          width: '100%',
          // width: 47,
          height: 20,
          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.13,
          color: '#ffffff',

          marginRight: 12,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    );
    return cellView;
  }
}


export default CustomSwipeCell;
