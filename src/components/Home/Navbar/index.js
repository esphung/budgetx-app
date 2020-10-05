import React from 'react';

import { View } from 'react-native';

import styles from '../../../styles/Navbar';

import HeaderLeftView from './HeaderLeftView';

import HeaderRightView from './HeaderRightView';

const Navbar = ({
  boldMessage,
  normalMessage,
  avatarImage,
  navigation,
  settingsBtnPressed,
  isUserLoggedIn,
}) => {
  const navbar = (
    <View style={styles.navbar}>
      <HeaderLeftView
        boldMessage={boldMessage}
        normalMessage={normalMessage}
        avatarImage={avatarImage}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
      />
      <HeaderRightView settingsBtnPressed={settingsBtnPressed} />
    </View>
  );
  return navbar;
};

export default Navbar;
