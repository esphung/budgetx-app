import React from 'react';

import {
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';

// import colors from '../../../colors';

import styles from '../../../styles';


const InfoBox = (props) => {
  const { icon } = props;
  const view = (
    <View
      // onPress={props.onPress}
      // disabled
      style={styles.infoBoxStyle}
    >
    {
        icon
      }
      <Text
        style={styles.infoBoxGreenTextStyle}
      >
      

        { props.title }
      </Text>
    </View>
  );
  return view;
};

export default InfoBox;
