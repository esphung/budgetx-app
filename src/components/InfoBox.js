import React from 'react';

import {
  View,
  Text,
  // TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors, { originalTheme } from 'src/colors';

import styles from '../../styles';

const InfoBox = ({ message, title, icon }) => {
  const view = (
    <View style={[
      // styles.infoBoxStyle,
      {
      height: global.screenHeight * 0.2,
    }]}>
    
      <Text style={styles.infoBoxGreenTextStyle}>
        { title }
        {'\n'}
        <MaterialCommunityIcons
          name="access-point-network-off"
          size={32} // {styles.iconStyle.fontSize}
          color={originalTheme.inputIconColor}
        />
        {'\n'}
        <Text style={styles.textStyle}>
          { message }
        </Text>
      </Text>
    
    </View>
  );
  return view;
};

export default InfoBox;
