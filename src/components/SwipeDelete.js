import React, { Component } from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

import colors from 'main/colors';

import styles from 'main/styles';

class SwipeDelete extends Component {
  render() {
    const { onDeleteBtnPress } = this.props;
    const cellView = (

      <TouchableOpacity style={{
        flex: 1,
        flexDirection: 'row-reverse',
        // alignSelf: 'stretch',
        justifyContent: 'flex-start',
        margin: 10,
        alignItems: 'center',

        // backgroundColor: colors.pinkRed,

        // borderWidth: 1,
        // borderColor: 'pink',
        // borderStyle: 'solid',
      }} onPress={onDeleteBtnPress}>

        <Text style={styles.buttonText}
        >
          Delete
        </Text>
      </TouchableOpacity>
    );
    return cellView;
  }
}


export default SwipeDelete;
