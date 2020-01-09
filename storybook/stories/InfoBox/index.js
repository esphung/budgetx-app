import React from 'react';

import {
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';

// import colors from 'main/colors';

import styles from 'main/styles';

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
