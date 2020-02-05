import React from 'react';

import {
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';

// import colors from '../../../colors';

import styles from '../../../styles';


const InfoBox = (props) => {
  const view = (
    <View
      // onPress={props.onPress}
      // disabled
      style={styles.infoBoxStyle}
    >
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
