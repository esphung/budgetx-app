import React from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

// import colors from 'main/colors';

import styles from 'main/styles';

const SwipeEdit = (props) => {
  const { onPress } = props;
  const cellView = (

    <TouchableOpacity
      style={
        [
          styles.swipeEditOpacity,
          // {
          //   flex: 1,
          //   flexDirection: 'row',
          //   // alignSelf: 'stretch',
          //   justifyContent: 'flex-start',
          //   margin: 10,

          //   alignItems: 'center',

          //   // borderWidth: 1,
          //   // borderColor: 'pink',
          //   // borderStyle: 'solid',
          // },
          {}
        ]
      }
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
  );
  return cellView;
};


export default SwipeEdit;
